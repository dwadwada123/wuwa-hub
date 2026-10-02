import React, { useState, useEffect } from 'react';
import { Clock, BatteryCharging, CheckSquare, Calendar, AlertCircle } from 'lucide-react';

export default function WaveplateTracker() {
  const [currentStamina, setCurrentStamina] = useState(160);
  const maxStamina = 240;
  const regenMinutesPerPoint = 6;

  const pointsNeeded = Math.max(0, maxStamina - currentStamina);
  const minutesNeeded = pointsNeeded * regenMinutesPerPoint;

  const getFullTime = () => {
    if (pointsNeeded === 0) return 'Đã đầy!';
    const fullDate = new Date(Date.now() + minutesNeeded * 60 * 1000);
    return `${fullDate.getHours().toString().padStart(2, '0')}:${fullDate.getMinutes().toString().padStart(2, '0')} (${Math.floor(minutesNeeded / 60)}h ${minutesNeeded % 60}m nữa)`;
  };

  const [weeklyBosses, setWeeklyBosses] = useState({
    boss1: true,
    boss2: false,
    boss3: false
  });

  const toggleBoss = (key) => {
    setWeeklyBosses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px'
    }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BatteryCharging size={22} color="var(--accent-cyan)" />
            Theo Dõi Waveplate (Thể lực)
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hồi 1 điểm / 6 phút</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '3rem', fontWeight: 800, color: currentStamina >= maxStamina ? 'var(--accent-orange)' : 'var(--accent-cyan)' }}>
            {currentStamina}
          </span>
          <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>/ {maxStamina}</span>
        </div>

        <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '5px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{
            width: `${(currentStamina / maxStamina) * 100}%`,
            height: '100%',
            background: currentStamina >= 200 ? 'linear-gradient(90deg, #f97316, #ef4444)' : 'linear-gradient(90deg, #38bdf8, #0284c7)',
            transition: 'width 0.3s ease'
          }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <input
            type="range"
            min="0"
            max="240"
            value={currentStamina}
            onChange={(e) => setCurrentStamina(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 14px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} /> Dự kiến đầy lúc:
          </span>
          <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
            {getFullTime()}
          </span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={22} color="var(--accent-purple)" />
          Weekly Bosses (3/3 Claim)
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Đánh dấu số lần nhận thưởng Boss Tuần (Jué, Bell-Borne, Scar, Threnodian...) trước khi reset vào Thứ 2:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'boss1', label: 'Lần nhận thưởng 1 (Jué / Hạc / Chuông)' },
            { id: 'boss2', label: 'Lần nhận thưởng 2' },
            { id: 'boss3', label: 'Lần nhận thưởng 3' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => toggleBoss(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: weeklyBosses[item.id] ? 'rgba(52, 211, 153, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${weeklyBosses[item.id] ? 'rgba(52, 211, 153, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                border: '2px solid',
                borderColor: weeklyBosses[item.id] ? 'var(--accent-green)' : 'var(--text-muted)',
                background: weeklyBosses[item.id] ? 'var(--accent-green)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {weeklyBosses[item.id] && <span style={{ color: '#000', fontSize: '12px', fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{
                fontSize: '0.9rem',
                color: weeklyBosses[item.id] ? '#fff' : 'var(--text-secondary)',
                textDecoration: weeklyBosses[item.id] ? 'line-through' : 'none'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
