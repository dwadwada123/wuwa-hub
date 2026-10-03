import React, { useState } from 'react';
import { X, Swords, RefreshCw, Zap, Shield, Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';

export default function RotationModal({ team, onClose }) {
  const characters = team?.characters || [];
  const coreResonator = characters.find(c => c?.id === team?.core) || characters[0];
  
  // Chỉ hiển thị tab Quickswap nếu đội hình THỰC SỰ có cơ chế Quickswap hợp lệ
  const hasQuickswap = Boolean(team?.hasQuickswap && team?.customRotations?.quickswap);

  const [activeTab, setActiveTab] = useState('standard');

  if (!team) return null;

  // Lấy các bước rotation tương ứng với tab được chọn
  let rotationSteps = [];
  if (activeTab === 'quickswap' && hasQuickswap) {
    rotationSteps = team.customRotations.quickswap;
  } else {
    rotationSteps = team.customRotations?.standard || coreResonator?.rotations?.standard || [];
  }

  // Hàm render badge hành động đẹp mắt chuẩn phong cách game
  const renderActionBadge = (token, idx) => {
    let bg = 'rgba(56, 189, 248, 0.15)';
    let color = '#38bdf8';
    let border = 'rgba(56, 189, 248, 0.35)';

    if (token.includes('BA')) {
      bg = 'rgba(148, 163, 184, 0.15)';
      color = '#e2e8f0';
      border = 'rgba(148, 163, 184, 0.35)';
    } else if (token.includes('E')) {
      bg = 'rgba(0, 229, 255, 0.18)';
      color = '#00e5ff';
      border = 'rgba(0, 229, 255, 0.45)';
    } else if (token.includes('HA') || token.includes('Trọng')) {
      bg = 'rgba(251, 146, 60, 0.18)';
      color = '#fb923c';
      border = 'rgba(251, 146, 60, 0.45)';
    } else if (token.includes('R') || token.includes('Nộ')) {
      bg = 'rgba(192, 132, 252, 0.22)';
      color = '#c084fc';
      border = 'rgba(192, 132, 252, 0.5)';
    } else if (token.includes('Echo')) {
      bg = 'rgba(52, 211, 153, 0.18)';
      color = '#34d399';
      border = 'rgba(52, 211, 153, 0.45)';
    } else if (token.includes('Intro') || token.includes('Outro')) {
      bg = 'rgba(243, 186, 47, 0.2)';
      color = '#f3ba2f';
      border = 'rgba(243, 186, 47, 0.5)';
    } else if (token.includes('SWAP')) {
      bg = 'linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(243, 186, 47, 0.25) 100%)';
      color = '#fde047';
      border = 'rgba(250, 204, 21, 0.6)';
    }

    return (
      <span
        key={idx}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.74rem',
          fontWeight: 800,
          background: bg,
          color: color,
          border: `1px solid ${border}`,
          letterSpacing: '0.5px',
          boxShadow: token.includes('SWAP') ? '0 0 10px rgba(250, 204, 21, 0.2)' : 'none'
        }}
      >
        {token}
      </span>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(3, 6, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '820px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        background: 'linear-gradient(165deg, #090e18 0%, #05080f 100%)',
        border: '1px solid rgba(243, 186, 47, 0.35)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(243, 186, 47, 0.15)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px'
      }}>
        {/* Tactical Scanline Accent Top */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #f3ba2f 30%, #00e5ff 70%, transparent 100%)',
          width: '100%'
        }} />

        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.015)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(243, 186, 47, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(243, 186, 47, 0.35)'
              }}>
                <Swords size={18} color="var(--accent-gold)" />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', letterSpacing: '0.5px' }}>
                {team.name}
              </h2>
              <span style={{
                fontSize: '0.74rem',
                padding: '3px 10px',
                borderRadius: '4px',
                background: hasQuickswap ? 'rgba(192, 132, 252, 0.15)' : 'rgba(250, 204, 21, 0.15)',
                color: hasQuickswap ? 'var(--accent-purple)' : 'var(--accent-gold)',
                border: `1px solid ${hasQuickswap ? 'rgba(192, 132, 252, 0.35)' : 'rgba(250, 204, 21, 0.35)'}`,
                fontWeight: 800
              }}>
                {team.type}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{team.description}</p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Members Roster View with Real Avatars & Accurate Roles */}
        <div style={{
          padding: '16px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {characters.map((char, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: `1px solid ${idx === 0 ? 'rgba(243, 186, 47, 0.3)' : 'rgba(255, 255, 255, 0.07)'}`
            }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: char?.iconColor || '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {char?.avatar ? (
                  <img
                    src={char.avatar}
                    alt={char.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <span style={{ fontWeight: 'bold', color: '#000' }}>{char?.name?.[0]}</span>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {char?.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: idx === 0 ? 'var(--accent-gold)' : idx === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)', fontWeight: 700 }}>
                  {idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub-DPS / Buffer' : 'Sustain / Healer'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Selection: Standard vs Quickswap (Chỉ hiện Quickswap khi đội hình có Quickswap thật) */}
        <div style={{
          padding: '16px 24px 0 24px',
          display: 'flex',
          gap: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('standard')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 800,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'standard' ? 'rgba(250, 204, 21, 0.12)' : 'transparent',
              color: activeTab === 'standard' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: activeTab === 'standard' ? '3px solid var(--accent-gold)' : '3px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={16} /> Chuỗi Tiêu Chuẩn (Concerto Rotation)
          </button>

          {hasQuickswap && (
            <button
              onClick={() => setActiveTab('quickswap')}
              style={{
                padding: '10px 18px',
                borderRadius: '8px 8px 0 0',
                fontWeight: 800,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: activeTab === 'quickswap' ? 'rgba(192, 132, 252, 0.15)' : 'transparent',
                color: activeTab === 'quickswap' ? 'var(--accent-purple)' : 'var(--text-muted)',
                borderBottom: activeTab === 'quickswap' ? '3px solid var(--accent-purple)' : '3px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <Zap size={16} /> Chuỗi Quickswap (Hủy Hoạt Ảnh Đỉnh Cao)
            </button>
          )}
        </div>

        {/* Step-by-Step Rotation Display */}
        <div style={{ padding: '22px 24px', flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 800
            }}>
              {activeTab === 'quickswap' 
                ? '⚡ Thứ tự luân chuyển Quickswap từng chiêu thức & thời điểm hủy hoạt ảnh'
                : '🔄 Vòng lặp xuất chiêu tiêu chuẩn (Outro Buffer ➔ Main Carry)'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rotationSteps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px 18px',
                  background: 'rgba(255, 255, 255, 0.025)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  position: 'relative'
                }}
              >
                {/* Step Number Badge */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '80px',
                  flexShrink: 0
                }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: activeTab === 'quickswap' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                    color: activeTab === 'quickswap' ? 'var(--accent-purple)' : 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    marginBottom: '6px',
                    border: `1px solid ${activeTab === 'quickswap' ? 'rgba(192, 132, 252, 0.4)' : 'rgba(250, 204, 21, 0.4)'}`
                  }}>
                    {s.step || idx + 1}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff', textAlign: 'center' }}>
                    {s.char}
                  </span>
                </div>

                {/* Step Action Content */}
                <div style={{ flex: 1 }}>
                  {/* Action Badges if available */}
                  {s.actionTokens && s.actionTokens.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                      {s.actionTokens.map((token, tIdx) => renderActionBadge(token, tIdx))}
                    </div>
                  )}

                  {/* Main Action Text */}
                  <div style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: 'var(--text-primary)',
                    fontWeight: 500
                  }}>
                    {s.actionText || s.action}
                  </div>

                  {/* Quickswap Timing Cue */}
                  {s.swapCue && (
                    <div style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(243, 186, 47, 0.08)',
                      border: '1px solid rgba(243, 186, 47, 0.25)',
                      fontSize: '0.78rem',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontWeight: 700
                    }}>
                      <CornerDownRight size={14} />
                      <span>{s.swapCue}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quickswap Pro-Tip Box */}
          {activeTab === 'quickswap' && (
            <div style={{
              marginTop: '20px',
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(192, 132, 252, 0.06)',
              border: '1px solid rgba(192, 132, 252, 0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Zap size={20} color="var(--accent-purple)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-purple)', marginBottom: '4px' }}>
                  Bí kíp thực chiến Quickswap:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Đổi nhân vật ngay trong khung hình xuất chiêu (Animation Frame). Nhân vật vừa rời sân sẽ tiếp tục hoàn thành chiêu thức trong lúc nhân vật mới vào sân gây sát thương đồng thời, giúp nhân đôi DPS toàn đội.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
