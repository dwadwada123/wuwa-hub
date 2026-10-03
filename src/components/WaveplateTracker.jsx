import React, { useState, useEffect, useRef } from 'react';
import { Clock, BatteryCharging, Zap, Info } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_waveplate_state';
const MAX_STAMINA = 240;
const REGEN_MINUTES_PER_POINT = 6;

export default function WaveplateTracker() {
  // Khởi tạo state từ localStorage để hiển thị tức thì 0ms, không bị gián đoạn
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

  const [syncStatus, setSyncStatus] = useState('saved'); // 'saving' | 'saved' | 'error'
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
      } catch (err) {
        // Dùng local state hiện tại nếu chưa có cloud
      }
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

  // Hàm lưu đồng thời LocalStorage và Supabase Cloud
  const persistState = (stamina) => {
    const payload = {
      currentStamina: stamina,
      lastSavedTimestamp: Date.now()
    };

    // 1. Lưu LocalStorage ngay lập tức
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}

    // 2. Debounce lưu Supabase Cloud (tránh gọi API dồn dập khi kéo slider)
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
        console.warn('Supabase waveplate sync note:', err);
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
    if (pointsNeeded === 0) return 'Đã đầy 240/240 tối đa!';
    const fullDate = new Date(Date.now() + minutesNeeded * 60 * 1000);
    const hours = fullDate.getHours().toString().padStart(2, '0');
    const mins = fullDate.getMinutes().toString().padStart(2, '0');
    const remainH = Math.floor(minutesNeeded / 60);
    const remainM = minutesNeeded % 60;
    return `${hours}:${mins} • khoảng ${remainH}h ${remainM}m nữa`;
  };

  const percentFull = Math.round((currentStamina / MAX_STAMINA) * 100);

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', width: '100%' }}>
      {/* Waveplate Real-time Card */}
      <div className="glass-panel" style={{
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.75) 0%, rgba(8, 12, 20, 0.9) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BatteryCharging size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc', margin: 0 }}>
                Theo Dõi Thể Lực Waveplate
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                Tự động tính toán điểm hồi phục theo thời gian thực • 6 phút / 1 điểm
              </p>
            </div>
          </div>

          <span style={{ 
            fontSize: '0.75rem', 
            padding: '4px 10px', 
            borderRadius: '6px', 
            background: syncStatus === 'saving' ? 'rgba(243, 186, 47, 0.15)' : 'rgba(56, 189, 248, 0.12)', 
            color: syncStatus === 'saving' ? 'var(--accent-gold)' : 'var(--accent-cyan)', 
            fontWeight: 700,
            border: `1px solid ${syncStatus === 'saving' ? 'rgba(243, 186, 47, 0.3)' : 'rgba(56, 189, 248, 0.25)'}`
          }}>
            {syncStatus === 'saving' ? 'Đang lưu Cloud...' : 'Đã Đồng Bộ'}
          </span>
        </div>

        {/* Primary Stamina Counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{
              fontSize: '3.6rem',
              fontWeight: 900,
              color: currentStamina >= MAX_STAMINA ? 'var(--accent-orange)' : 'var(--accent-cyan)',
              fontFamily: 'monospace',
              letterSpacing: '-1px',
              lineHeight: 1
            }}>
              {currentStamina}
            </span>
            <span style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: 700 }}>/ {MAX_STAMINA}</span>
          </div>

          <div style={{
            fontSize: '0.9rem',
            fontWeight: 800,
            color: percentFull >= 100 ? 'var(--accent-orange)' : percentFull >= 80 ? 'var(--accent-gold)' : 'var(--accent-cyan)',
            padding: '4px 12px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {percentFull}% Thể Lực
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: '12px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{
            width: `${(currentStamina / MAX_STAMINA) * 100}%`,
            height: '100%',
            background: currentStamina >= 200 
              ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
              : 'linear-gradient(90deg, #00e5ff, #0284c7)',
            transition: 'width 0.3s ease',
            boxShadow: currentStamina >= 200 ? '0 0 12px rgba(239, 68, 68, 0.6)' : '0 0 12px rgba(0, 229, 255, 0.6)'
          }} />
        </div>

        {/* Slider */}
        <div style={{ marginBottom: '18px' }}>
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
              height: '6px'
            }}
          />
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
          {[
            { label: '-40 Echo Boss', val: currentStamina - 40 },
            { label: '-60 Boss Thế Giới', val: currentStamina - 60 },
            { label: '+60 Khối Dung Môi', val: currentStamina + 60 },
            { label: 'Đầy 240', val: 240 },
            { label: 'Cạn 0', val: 0 }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleStaminaChange(btn.val)}
              style={{
                flex: '1 1 auto',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Stat Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px'
        }}>
          {/* Card 1: Full Time */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Clock size={14} color="var(--accent-gold)" /> Dự kiến đầy lúc
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              {getFullTime()}
            </div>
          </div>

          {/* Card 2: Needed points */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Zap size={14} color="var(--accent-cyan)" /> Cần hồi phục
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
              {pointsNeeded === 0 ? 'Đã tối đa' : `${pointsNeeded} Waveplate nữa`}
            </div>
          </div>

          {/* Card 3: Regeneration rate */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Info size={14} color="#a78bfa" /> Tốc độ hồi phục
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#e2e8f0' }}>
              1 điểm / 6 phút • 10 điểm mỗi giờ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
