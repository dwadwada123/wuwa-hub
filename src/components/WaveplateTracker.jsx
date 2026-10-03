import React, { useState, useEffect, useRef } from 'react';
import { Clock, BatteryCharging, Zap, Info } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_waveplate_state';
const MAX_STAMINA = 240;
const REGEN_MINUTES_PER_POINT = 6;

export default function WaveplateTracker() {
  const [currentStamina, setCurrentStamina] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentStamina === 'number' && parsed.lastSavedTimestamp) {
          const elapsedMins = Math.floor((Date.now() - parsed.lastSavedTimestamp) / (60 * 1000));
          const regenPoints = Math.floor(elapsedMins / REGEN_MINUTES_PER_POINT);
          return Math.min(MAX_STAMINA, parsed.currentStamina + regenPoints);
        }
      }
    } catch (e) {
      console.warn('Local waveplate error:', e);
    }
    return 180;
  });

  const [syncStatus, setSyncStatus] = useState('saved');
  const saveTimeoutRef = useRef(null);

  // Tải dữ liệu từ Supabase Cloud khi mở trang
  useEffect(() => {
    async function fetchCloudState() {
      try {
        const { data } = await supabase
          .from('user_state')
          .select('value')
          .eq('key', 'waveplate_state')
          .single();

        if (data && data.value) {
          const cloud = data.value;
          if (cloud.lastSavedTimestamp) {
            const elapsedMins = Math.floor((Date.now() - cloud.lastSavedTimestamp) / (60 * 1000));
            const regenPoints = Math.floor(elapsedMins / REGEN_MINUTES_PER_POINT);
            const calculatedStamina = Math.min(MAX_STAMINA, (cloud.currentStamina || 0) + regenPoints);
            setCurrentStamina(calculatedStamina);
          }
        }
      } catch (err) {}
    }
    fetchCloudState();
  }, []);

  // Timer cập nhật tự động mỗi 1 phút nếu web đang mở
  useEffect(() => {
    const timer = setInterval(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.currentStamina === 'number' && parsed.lastSavedTimestamp) {
            const elapsedMins = Math.floor((Date.now() - parsed.lastSavedTimestamp) / (60 * 1000));
            const regenPoints = Math.floor(elapsedMins / REGEN_MINUTES_PER_POINT);
            const newStamina = Math.min(MAX_STAMINA, parsed.currentStamina + regenPoints);
            setCurrentStamina(newStamina);
          }
        }
      } catch (e) {}
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Lưu trạng thái vào LocalStorage và Supabase Cloud
  const persistState = (stamina) => {
    const payload = {
      currentStamina: stamina,
      lastSavedTimestamp: Date.now()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    setSyncStatus('saving');

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await supabase.from('user_state').upsert({
          key: 'waveplate_state',
          value: payload,
          updated_at: new Date().toISOString()
        });
        setSyncStatus('saved');
      } catch (err) {
        setSyncStatus('saved');
      }
    }, 600);
  };

  const handleStaminaChange = (newValue) => {
    const val = Math.max(0, Math.min(MAX_STAMINA, newValue));
    setCurrentStamina(val);
    persistState(val);
  };

  // Tính toán thời gian đầy thể lực
  const pointsNeeded = Math.max(0, MAX_STAMINA - currentStamina);
  const minutesNeeded = pointsNeeded * REGEN_MINUTES_PER_POINT;

  const getFullTime = () => {
    if (pointsNeeded === 0) return 'Đã đầy 240/240 tối đa';
    const fullDate = new Date(Date.now() + minutesNeeded * 60 * 1000);
    const hours = fullDate.getHours().toString().padStart(2, '0');
    const mins = fullDate.getMinutes().toString().padStart(2, '0');
    const remainH = Math.floor(minutesNeeded / 60);
    const remainM = minutesNeeded % 60;
    return `${hours}:${mins} • khoảng ${remainH} giờ ${remainM} phút nữa`;
  };

  const percentFull = Math.round((currentStamina / MAX_STAMINA) * 100);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className="glass-panel" style={{
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 12, 20, 0.95) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BatteryCharging size={22} color="var(--accent-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                Theo Dõi Thể Lực Waveplate
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Tự động tính toán điểm hồi phục theo thời gian thực • 6 phút 1 điểm
              </p>
            </div>
          </div>

          <span style={{ 
            fontSize: '0.76rem', 
            padding: '4px 12px', 
            borderRadius: '6px', 
            background: syncStatus === 'saving' ? 'rgba(243, 186, 47, 0.15)' : 'rgba(56, 189, 248, 0.12)', 
            color: syncStatus === 'saving' ? 'var(--accent-gold)' : 'var(--accent-cyan)', 
            fontWeight: 800,
            border: `1px solid ${syncStatus === 'saving' ? 'rgba(243, 186, 47, 0.3)' : 'rgba(56, 189, 248, 0.25)'}`
          }}>
            {syncStatus === 'saving' ? 'Đang lưu Cloud...' : 'Đã Đồng Bộ'}
          </span>
        </div>

        {/* Đồng hồ số lượng thể lực */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{
              fontSize: '3.8rem',
              fontWeight: 900,
              color: currentStamina >= MAX_STAMINA ? '#ef4444' : currentStamina >= 200 ? 'var(--accent-gold)' : 'var(--accent-cyan)',
              fontFamily: 'monospace',
              letterSpacing: '-1px',
              lineHeight: 1
            }}>
              {currentStamina}
            </span>
            <span style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: 700 }}>/ {MAX_STAMINA}</span>
          </div>

          <div style={{
            fontSize: '0.92rem',
            fontWeight: 800,
            color: percentFull >= 100 ? '#ef4444' : percentFull >= 80 ? 'var(--accent-gold)' : 'var(--accent-cyan)',
            padding: '5px 14px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {percentFull}% Thể Lực
          </div>
        </div>

        {/* Thanh tiến trình phát sáng */}
        <div style={{ width: '100%', height: '14px', background: 'rgba(0, 0, 0, 0.55)', borderRadius: '8px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{
            width: `${(currentStamina / MAX_STAMINA) * 100}%`,
            height: '100%',
            background: currentStamina >= 220 
              ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
              : currentStamina >= 160
              ? 'linear-gradient(90deg, #06b6d4, #f59e0b)'
              : 'linear-gradient(90deg, #00e5ff, #0284c7)',
            transition: 'width 0.3s ease',
            boxShadow: currentStamina >= 220 ? '0 0 14px rgba(239, 68, 68, 0.7)' : '0 0 14px rgba(0, 229, 255, 0.6)'
          }} />
        </div>

        {/* Thanh trượt tinh chỉnh */}
        <div style={{ marginBottom: '22px' }}>
          <input
            type="range"
            min="0"
            max="240"
            value={currentStamina}
            onChange={(e) => handleStaminaChange(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-cyan)',
              cursor: 'pointer',
              height: '8px'
            }}
          />
        </div>

        {/* Các nút thao tác nhanh: -60, -40, -120, +60, Đầy, Cạn */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {[
            { label: '-60', val: currentStamina - 60, color: 'var(--accent-cyan)' },
            { label: '-40', val: currentStamina - 40, color: 'var(--accent-cyan)' },
            { label: '-120', val: currentStamina - 120, color: 'var(--accent-gold)' },
            { label: '+60', val: currentStamina + 60, color: '#10b981' },
            { label: 'Đầy', val: MAX_STAMINA, color: '#f8fafc' },
            { label: 'Cạn', val: 0, color: '#f8fafc' }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleStaminaChange(btn.val)}
              style={{
                padding: '12px 10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: btn.color,
                fontSize: '1rem',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'; 
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; 
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Lưới thông tin dự báo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px'
        }}>
          {/* Card 1: Dự kiến đầy lúc */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Clock size={14} color="var(--accent-gold)" /> Dự kiến đầy lúc
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              {getFullTime()}
            </div>
          </div>

          {/* Card 2: Cần hồi phục */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Zap size={14} color="var(--accent-cyan)" /> Cần hồi phục
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>
              {pointsNeeded === 0 ? 'Đã tối đa' : `${pointsNeeded} Waveplate nữa`}
            </div>
          </div>

          {/* Card 3: Tốc độ hồi phục */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Info size={14} color="#a78bfa" /> Tốc độ hồi phục
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#e2e8f0' }}>
              1 điểm mỗi 6 phút • 10 điểm mỗi giờ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
