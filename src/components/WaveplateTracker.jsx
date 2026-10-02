import React, { useState, useEffect, useRef } from 'react';
import { Clock, BatteryCharging, Calendar, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_waveplate_state';
const MAX_STAMINA = 240;
const REGEN_MINUTES_PER_POINT = 6;

export default function WaveplateTracker() {
  // Khởi tạo state từ localStorage để hiển thị tức thì 0ms, không bị reset mock
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

  const [weeklyBosses, setWeeklyBosses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.weeklyBosses) return parsed.weeklyBosses;
      }
    } catch (e) {}
    return { boss1: false, boss2: false, boss3: false };
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
          if (cloud.weeklyBosses) {
            setWeeklyBosses(cloud.weeklyBosses);
          }
        }
      } catch (err) {
        // Dùng local state hiện tại nếu chưa có cloud
      }
    }
    fetchCloudState();
  }, []);

  // Hàm lưu đồng thời LocalStorage và Supabase Cloud
  const persistState = (stamina, bosses) => {
    const payload = {
      currentStamina: stamina,
      weeklyBosses: bosses,
      lastSavedTimestamp: Date.now()
    };

    // 1. Lưu LocalStorage ngay lập tức
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}

    // 2. Debounce lưu Supabase Cloud (tránh gọi API quá dồn dập khi kéo slider)
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
        setSyncStatus('saved'); // Local đã lưu an toàn
      }
    }, 600);
  };

  const handleStaminaChange = (newValue) => {
    const val = Math.max(0, Math.min(MAX_STAMINA, newValue));
    setCurrentStamina(val);
    persistState(val, weeklyBosses);
  };

  const toggleBoss = (key) => {
    const updatedBosses = { ...weeklyBosses, [key]: !weeklyBosses[key] };
    setWeeklyBosses(updatedBosses);
    persistState(currentStamina, updatedBosses);
  };

  // Tính toán thời gian đầy thể lực
  const pointsNeeded = Math.max(0, MAX_STAMINA - currentStamina);
  const minutesNeeded = pointsNeeded * REGEN_MINUTES_PER_POINT;

  const getFullTime = () => {
    if (pointsNeeded === 0) return 'Đã đầy tối đa!';
    const fullDate = new Date(Date.now() + minutesNeeded * 60 * 1000);
    const hours = fullDate.getHours().toString().padStart(2, '0');
    const mins = fullDate.getMinutes().toString().padStart(2, '0');
    const remainH = Math.floor(minutesNeeded / 60);
    const remainM = minutesNeeded % 60;
    return `${hours}:${mins} (khoảng ${remainH}h ${remainM}m nữa)`;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px'
    }}>
      {/* Waveplate Real-time Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(8, 12, 20, 0.85) 100%)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc' }}>
            <BatteryCharging size={22} color="var(--accent-cyan)" />
            Theo Dõi Waveplate (Thể Lực)
          </h3>
          <span style={{ 
            fontSize: '0.75rem', 
            padding: '3px 8px', 
            borderRadius: '4px', 
            background: syncStatus === 'saving' ? 'rgba(243, 186, 47, 0.15)' : 'rgba(56, 189, 248, 0.12)', 
            color: syncStatus === 'saving' ? 'var(--accent-gold)' : 'var(--accent-cyan)', 
            fontWeight: 600 
          }}>
            {syncStatus === 'saving' ? 'Đang lưu Cloud...' : 'Tự động tính giờ trôi qua'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{
            fontSize: '3.2rem',
            fontWeight: 900,
            color: currentStamina >= MAX_STAMINA ? 'var(--accent-orange)' : 'var(--accent-cyan)',
            fontFamily: 'monospace',
            letterSpacing: '-1px'
          }}>
            {currentStamina}
          </span>
          <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 600 }}>/ {MAX_STAMINA}</span>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', height: '10px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{
            width: `${(currentStamina / MAX_STAMINA) * 100}%`,
            height: '100%',
            background: currentStamina >= 200 
              ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
              : 'linear-gradient(90deg, #00e5ff, #0284c7)',
            transition: 'width 0.3s ease',
            boxShadow: currentStamina >= 200 ? '0 0 10px rgba(239, 68, 68, 0.5)' : '0 0 10px rgba(0, 229, 255, 0.5)'
          }} />
        </div>

        {/* Slider & Quick Adjust */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="range"
            min="0"
            max="240"
            value={currentStamina}
            onChange={(e) => handleStaminaChange(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)', cursor: 'pointer' }}
          />
        </div>

        {/* Quick action buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[
            { label: '-40 (Echo)', val: currentStamina - 40 },
            { label: '-60 (Boss)', val: currentStamina - 60 },
            { label: '+60 (Solvent)', val: currentStamina + 60 },
            { label: 'Đầy (240)', val: 240 },
            { label: 'Cạn (0)', val: 0 }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleStaminaChange(btn.val)}
              style={{
                flex: '1 1 auto',
                padding: '6px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Predicted Full Time */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 14px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '8px',
          fontSize: '0.85rem',
          border: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="var(--accent-gold)" /> Dự kiến đầy lúc:
          </span>
          <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
            {getFullTime()}
          </span>
        </div>
      </div>

      {/* Weekly Bosses & Daily Reset Tracker */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid rgba(192, 132, 252, 0.25)',
        background: 'linear-gradient(145deg, rgba(20, 15, 30, 0.7) 0%, rgba(10, 8, 18, 0.85) 100%)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc' }}>
            <Calendar size={22} color="var(--accent-purple)" />
            Weekly Bosses (3/3 Lượt Giảm Giá)
          </h3>
          <span style={{
            fontSize: '0.75rem',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'rgba(192, 132, 252, 0.15)',
            color: 'var(--accent-purple)',
            fontWeight: 700
          }}>
            {Object.values(weeklyBosses).filter(Boolean).length}/3 Đã Nhận
          </span>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
          Mỗi tuần bạn có <strong>3 lượt giảm 50% Waveplate (còn 30 thể lực)</strong> khi diệt Boss tuần (Jué, Bell-Borne Geochelone, Scar, Threnodian...). Đánh dấu để không bỏ lỡ:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {[
            { key: 'boss1', label: 'Lượt 1: Boss Tuần (30 Waveplate)', desc: 'Nguyên liệu nâng cấp kỹ năng cấp cao' },
            { key: 'boss2', label: 'Lượt 2: Boss Tuần (30 Waveplate)', desc: 'Phôi vũ khí 4 sao & Echo Vàng' },
            { key: 'boss3', label: 'Lượt 3: Boss Tuần (30 Waveplate)', desc: 'Tín vật nâng cấp Forte Resonator' }
          ].map((item) => {
            const isChecked = !!weeklyBosses[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleBoss(item.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: isChecked ? 'rgba(192, 132, 252, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                  border: `1px solid ${isChecked ? 'rgba(192, 132, 252, 0.35)' : 'rgba(255, 255, 255, 0.05)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  border: `2px solid ${isChecked ? 'var(--accent-purple)' : 'var(--text-muted)'}`,
                  background: isChecked ? 'var(--accent-purple)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '12px',
                  flexShrink: 0
                }}>
                  {isChecked && '✓'}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isChecked ? '#fff' : 'var(--text-secondary)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} color="var(--accent-gold)" />
          Reset định kỳ vào 04:00 sáng Thứ Hai hàng tuần (giờ server). Dữ liệu được lưu an toàn tự động.
        </div>
      </div>
    </div>
  );
}
