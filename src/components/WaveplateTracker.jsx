import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  BatteryCharging, 
  Zap, 
  Info, 
  Sparkles, 
  Layers, 
  RefreshCw, 
  Flame, 
  Shield, 
  Swords, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_waveplate_state';
const MAX_STAMINA = 240;
const REGEN_MINUTES_PER_POINT = 6;

export default function WaveplateTracker() {
  // Trạng thái Thể Lực Waveplate
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

  // Chế độ nhận thưởng x2 tiêu hao kép (Double Claim Fast Farm)
  const [isDoubleClaim, setIsDoubleClaim] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isDoubleClaim === 'boolean') return parsed.isDoubleClaim;
      }
    } catch (e) {}
    return false;
  });

  // Số lượt sự kiện x2 Vực Tacet trong ngày (Tối đa 3 lần mỗi ngày)
  const [dailyDoubleEchoLeft, setDailyDoubleEchoLeft] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.dailyDoubleEchoLeft === 'number') return parsed.dailyDoubleEchoLeft;
      }
    } catch (e) {}
    return 3;
  });

  // Số lượt tăng tỉ lệ rơi Echo 4-Cost từ Boss Tuần (Data Bank 15 lần mỗi tuần)
  const [weeklyEnhancedEchoLeft, setWeeklyEnhancedEchoLeft] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.weeklyEnhancedEchoLeft === 'number') return parsed.weeklyEnhancedEchoLeft;
      }
    } catch (e) {}
    return 15;
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
          if (typeof cloud.isDoubleClaim === 'boolean') setIsDoubleClaim(cloud.isDoubleClaim);
          if (typeof cloud.dailyDoubleEchoLeft === 'number') setDailyDoubleEchoLeft(cloud.dailyDoubleEchoLeft);
          if (typeof cloud.weeklyEnhancedEchoLeft === 'number') setWeeklyEnhancedEchoLeft(cloud.weeklyEnhancedEchoLeft);
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

  // Hàm lưu trạng thái đồng thời LocalStorage và Supabase Cloud
  const persistState = (stamina, doubleClaim, dailyDouble, weeklyEnhanced) => {
    const payload = {
      currentStamina: stamina,
      isDoubleClaim: doubleClaim,
      dailyDoubleEchoLeft: dailyDouble,
      weeklyEnhancedEchoLeft: weeklyEnhanced,
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
    persistState(val, isDoubleClaim, dailyDoubleEchoLeft, weeklyEnhancedEchoLeft);
  };

  const handleToggleDoubleClaim = () => {
    const nextVal = !isDoubleClaim;
    setIsDoubleClaim(nextVal);
    persistState(currentStamina, nextVal, dailyDoubleEchoLeft, weeklyEnhancedEchoLeft);
  };

  const handleConsumeDailyDoubleEcho = () => {
    if (dailyDoubleEchoLeft <= 0) return;
    const cost = 60;
    const newStamina = Math.max(0, currentStamina - cost);
    const newLeft = dailyDoubleEchoLeft - 1;
    setCurrentStamina(newStamina);
    setDailyDoubleEchoLeft(newLeft);
    persistState(newStamina, isDoubleClaim, newLeft, weeklyEnhancedEchoLeft);
  };

  const handleResetDailyDoubleEcho = () => {
    setDailyDoubleEchoLeft(3);
    persistState(currentStamina, isDoubleClaim, 3, weeklyEnhancedEchoLeft);
  };

  const handleConsumeWeeklyEnhanced = () => {
    if (weeklyEnhancedEchoLeft <= 0) return;
    const newLeft = weeklyEnhancedEchoLeft - 1;
    setWeeklyEnhancedEchoLeft(newLeft);
    persistState(currentStamina, isDoubleClaim, dailyDoubleEchoLeft, newLeft);
  };

  const handleResetWeeklyEnhanced = () => {
    setWeeklyEnhancedEchoLeft(15);
    persistState(currentStamina, isDoubleClaim, dailyDoubleEchoLeft, 15);
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

  // Chi phí hoạt động chuẩn xác theo Wuthering Waves
  // Vực Tacet (Farm Echo & Tuner): 60 chuẩn, x2 là 120
  // Boss Thế Giới: 60 chuẩn, x2 là 120
  // Rèn Đúc & Giả Lập: 40 chuẩn, x2 là 80
  const costTacetField = isDoubleClaim ? 120 : 60;
  const costWorldBoss = isDoubleClaim ? 120 : 60;
  const costForgery = isDoubleClaim ? 80 : 40;
  const costSimulation = isDoubleClaim ? 80 : 40;

  // Số lượt có thể hoàn thành với lượng Waveplate hiện có
  const runsTacetField = Math.floor(currentStamina / costTacetField);
  const runsWorldBoss = Math.floor(currentStamina / costWorldBoss);
  const runsForgery = Math.floor(currentStamina / costForgery);
  const runsSimulation = Math.floor(currentStamina / costSimulation);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Panel 1: Đồng Hồ Waveplate & Bộ Chỉnh Thể Lực */}
      <div className="glass-panel" style={{
        padding: '26px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 12, 20, 0.95) 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Header Panel */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
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
                Chuẩn xác tốc độ hồi phục 6 phút 1 điểm • 10 điểm mỗi giờ • Tối đa 240 điểm
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
        <div style={{ marginBottom: '20px' }}>
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

        {/* Chế độ Nhận Thưởng x2 Tiêu Hao Kép (Double Claim Fast Farm) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderRadius: '10px',
          background: isDoubleClaim ? 'rgba(250, 204, 21, 0.12)' : 'rgba(255, 255, 255, 0.03)',
          border: isDoubleClaim ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '10px',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color={isDoubleClaim ? 'var(--accent-gold)' : 'var(--text-muted)'} />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: isDoubleClaim ? 'var(--accent-gold)' : '#fff' }}>
                Cơ Chế Nhận Thưởng x2 Tiêu Hao Kép
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Tự động nhân đôi chi phí Waveplate cho mỗi lần dọn phó bản để nhận gấp đôi phần thưởng Echo và nguyên liệu
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleDoubleClaim}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              background: isDoubleClaim ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.08)',
              color: isDoubleClaim ? '#05080f' : 'var(--text-secondary)',
              border: isDoubleClaim ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            {isDoubleClaim ? 'Đang Bật x2' : 'Đang Tắt x2'}
          </button>
        </div>

        {/* Nút Thao Tác Trừ / Nạp Nhanh Chuẩn Xác */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
          {[
            { 
              label: isDoubleClaim ? '-120 Vực Tacet x2' : '-60 Vực Tacet Echo', 
              val: currentStamina - costTacetField,
              highlight: true 
            },
            { 
              label: isDoubleClaim ? '-120 Boss Thế Giới x2' : '-60 Boss Thế Giới', 
              val: currentStamina - costWorldBoss 
            },
            { 
              label: isDoubleClaim ? '-80 Rèn Đúc x2' : '-40 Rèn Đúc Vũ Khí', 
              val: currentStamina - costForgery 
            },
            { 
              label: '+60 Khối Dung Môi', 
              val: currentStamina + 60 
            },
            { 
              label: 'Đầy 240', 
              val: 240 
            },
            { 
              label: 'Cạn 0', 
              val: 0 
            }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleStaminaChange(btn.val)}
              style={{
                flex: '1 1 auto',
                padding: '9px 12px',
                borderRadius: '8px',
                background: btn.highlight ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255, 255, 255, 0.04)',
                border: btn.highlight ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.09)',
                color: btn.highlight ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.22)'; 
                e.currentTarget.style.color = '#fff'; 
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)'; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = btn.highlight ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255, 255, 255, 0.04)'; 
                e.currentTarget.style.color = btn.highlight ? 'var(--accent-cyan)' : 'var(--text-secondary)'; 
                e.currentTarget.style.borderColor = btn.highlight ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.09)'; 
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Lưới Thông Tin Trạng Thái Hồi Phục */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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

      {/* Panel 2: Bộ Lập Kế Hoạch Tiêu Hao Thể Lực (Waveplate Spending Planner) */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(145deg, rgba(16, 24, 40, 0.8) 0%, rgba(10, 15, 26, 0.95) 100%)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Kế Hoạch Tiêu Thụ Thể Lực Khả Dụng
            </h4>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Tính theo {currentStamina} Waveplate hiện có {isDoubleClaim ? '• Chế độ x2 đang BẬT' : '• Chế độ x1 tiêu chuẩn'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {/* Hoạt động 1: Vực Tacet (Farm Echo & Tuner) */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>Vực Tacet • Farm Echo</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                {costTacetField} điểm / lượt
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>
              {runsTacetField} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>lượt hoàn thành</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Còn dư {currentStamina % costTacetField} Waveplate
            </div>
          </div>

          {/* Hoạt động 2: Boss Thế Giới (Nguyên liệu Đột phá) */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(250, 204, 21, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>Boss Thế Giới</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                {costWorldBoss} điểm / lượt
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
              {runsWorldBoss} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>lượt hoàn thành</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Còn dư {currentStamina % costWorldBoss} Waveplate
            </div>
          </div>

          {/* Hoạt động 3: Rèn Đúc (Vũ khí & Kỹ năng) */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>Khiêu Chiến Rèn Đúc</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
                {costForgery} điểm / lượt
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-purple)' }}>
              {runsForgery} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>lượt hoàn thành</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Còn dư {currentStamina % costForgery} Waveplate
            </div>
          </div>

          {/* Hoạt động 4: Giả Lập (EXP & Shell Credits) */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff' }}>Khiêu Chiến Giả Lập</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                {costSimulation} điểm / lượt
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent-green)' }}>
              {runsSimulation} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>lượt hoàn thành</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Còn dư {currentStamina % costSimulation} Waveplate
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3: Bộ Đếm Cơ Chế x2 Hàng Ngày & Tăng Tỉ Lệ Rơi Echo Tuần */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
        
        {/* Card 3A: Sự Kiện x2 Tẩy Rửa Âm Vực (Chord Cleansing Event) */}
        <div className="glass-panel" style={{
          padding: '22px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          background: 'linear-gradient(145deg, rgba(14, 22, 38, 0.85) 0%, rgba(8, 12, 20, 0.95) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
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
                <Sparkles size={18} color="var(--accent-cyan)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Sự Kiện x2 Tẩy Rửa Âm Vực
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                  Nhận gấp đôi Echo và Tuner tại Vực Tacet • 3 lần mỗi ngày
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetDailyDoubleEcho}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem'
              }}
              title="Đặt lại 3 lần"
            >
              <RefreshCw size={12} /> Làm mới
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', background: 'rgba(0, 0, 0, 0.35)', padding: '12px 14px', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Lượt x2 hôm nay còn lại</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: dailyDoubleEchoLeft > 0 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                {dailyDoubleEchoLeft} / 3 <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>lượt</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Cần tiêu tốn</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
                {dailyDoubleEchoLeft * 60} Waveplate
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConsumeDailyDoubleEcho}
            disabled={dailyDoubleEchoLeft <= 0 || currentStamina < 60}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: '8px',
              background: dailyDoubleEchoLeft > 0 && currentStamina >= 60 ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.04)',
              border: dailyDoubleEchoLeft > 0 && currentStamina >= 60 ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: dailyDoubleEchoLeft > 0 && currentStamina >= 60 ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: dailyDoubleEchoLeft > 0 && currentStamina >= 60 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <CheckCircle2 size={14} /> Dùng 1 Lượt x2 Echo • Trừ 60 Waveplate
          </button>
        </div>

        {/* Card 3B: Tăng Tỉ Lệ Rơi Echo Tuần (Data Bank 15 Lượt) */}
        <div className="glass-panel" style={{
          padding: '22px',
          border: '1px solid rgba(250, 204, 21, 0.2)',
          background: 'linear-gradient(145deg, rgba(28, 20, 14, 0.85) 0%, rgba(12, 10, 8, 0.95) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(250, 204, 21, 0.15)',
                border: '1px solid rgba(250, 204, 21, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={18} color="var(--accent-gold)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Tăng Tỉ Lệ Rơi Echo Boss Tuần
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                  Data Bank tăng cơ hội rơi Echo 4-Cost từ Boss • 15 lần mỗi tuần
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetWeeklyEnhanced}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.72rem'
              }}
              title="Đặt lại 15 lần"
            >
              <RefreshCw size={12} /> Làm mới
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', background: 'rgba(0, 0, 0, 0.35)', padding: '12px 14px', borderRadius: '8px' }}>
            <div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Lượt tăng tỉ lệ còn lại trong tuần</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: weeklyEnhancedEchoLeft > 0 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                {weeklyEnhancedEchoLeft} / 15 <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>lượt</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Làm mới vào</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>
                Thứ Hai hàng tuần
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConsumeWeeklyEnhanced}
            disabled={weeklyEnhancedEchoLeft <= 0}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: '8px',
              background: weeklyEnhancedEchoLeft > 0 ? 'rgba(250, 204, 21, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: weeklyEnhancedEchoLeft > 0 ? '1px solid rgba(250, 204, 21, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: weeklyEnhancedEchoLeft > 0 ? 'var(--accent-gold)' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: weeklyEnhancedEchoLeft > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <CheckCircle2 size={14} /> Ghi Nhận Đã Dùng 1 Lượt Boss
          </button>
        </div>

      </div>

    </div>
  );
}
