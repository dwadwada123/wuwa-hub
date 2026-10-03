import React, { useState } from 'react';
import { X, Swords, RefreshCw, BarChart3, ShieldCheck, Sparkles, ChevronRight, Zap, Award, Target, Flame } from 'lucide-react';
import { getResonatorBuildGuide } from '../utils/teamBuilder';

export default function RotationModal({ team, onClose }) {
  const characters = team?.characters || [];
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [viewMode, setViewMode] = useState('rotation'); // 'rotation' | 'build'

  if (!team) return null;

  const activeChar = characters[selectedCharIndex] || characters[0];
  const buildGuide = getResonatorBuildGuide(activeChar);
  const rotationSteps = team.customRotations?.standard || [];

  const handleSelectChar = (idx) => {
    setSelectedCharIndex(idx);
    setViewMode('build'); // Tự động mở bảng chỉ số chuẩn khi bấm vào nhân vật
  };

  // Render Action Badges (Intro, E, R, Echo, Outro, Forte)
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
    } else if (token.includes('R') || token.includes('Liberation') || token.includes('Nuke')) {
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
    } else if (token.includes('Forte')) {
      bg = 'rgba(244, 63, 94, 0.2)';
      color = '#fb7185';
      border = 'rgba(244, 63, 94, 0.45)';
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
          letterSpacing: '0.5px'
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
        maxWidth: '850px',
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
        {/* Top Gold Accent Line */}
        <div style={{
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, #f3ba2f 30%, #00e5ff 70%, transparent 100%)',
          width: '100%'
        }} />

        {/* Modal Header */}
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
                background: 'rgba(250, 204, 21, 0.15)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
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

        {/* Interactive Character Selector Header (Clickable!) */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--accent-gold)',
            marginBottom: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} />
            <span>NHẤN VÀO NHÂN VẬT ĐỂ XEM CHỈ SỐ CHUẨN & BỘ ECHO KHUYÊN DÙNG:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px'
          }}>
            {characters.map((char, idx) => {
              const isSelected = selectedCharIndex === idx;
              return (
                <button
                  key={idx}
                  id={`modal-char-tab-${idx}`}
                  onClick={() => handleSelectChar(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    background: isSelected ? 'rgba(243, 186, 47, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: `2px solid ${isSelected ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.07)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isSelected ? '0 0 16px rgba(243, 186, 47, 0.25)' : 'none',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
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
                    border: `1px solid ${isSelected ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.2)'}`
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
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: isSelected ? 'var(--accent-gold)' : '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {char?.name}
                    </div>
                    <div style={{
                      fontSize: '0.74rem',
                      color: idx === 0 ? 'var(--accent-gold)' : idx === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)',
                      fontWeight: 700
                    }}>
                      {idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub-DPS / Buffer' : 'Sustain / Healer'}
                    </div>
                  </div>
                  {isSelected && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, flexShrink: 0 }}>
                      ✓ Đang xem
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Tabs: Chuỗi Xuất Chiêu Tiêu Chuẩn vs Chỉ Số Chuẩn & Build */}
        <div style={{
          padding: '16px 24px 0 24px',
          display: 'flex',
          gap: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setViewMode('rotation')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: viewMode === 'rotation' ? 'rgba(250, 204, 21, 0.12)' : 'transparent',
              color: viewMode === 'rotation' ? 'var(--accent-gold)' : 'var(--text-muted)',
              borderBottom: viewMode === 'rotation' ? '3px solid var(--accent-gold)' : '3px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={16} /> Chuỗi Tiêu Chuẩn
          </button>

          <button
            onClick={() => setViewMode('build')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: viewMode === 'build' ? 'rgba(0, 229, 255, 0.12)' : 'transparent',
              color: viewMode === 'build' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              borderBottom: viewMode === 'build' ? '3px solid var(--accent-cyan)' : '3px solid transparent',
              transition: 'all 0.2s ease'
            }}
          >
            <BarChart3 size={16} /> Chỉ Số Chuẩn & Bộ Echo ({activeChar.name})
          </button>
        </div>

        {/* VIEW 1: CHUỖI XUẤT CHIÊU TIÊU CHUẨN ĐẦY ĐỦ VÀ CHÍNH XÁC */}
        {viewMode === 'rotation' && (
          <div style={{ padding: '22px 24px', flex: 1 }}>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 800,
              marginBottom: '16px'
            }}>
              🔄 VÒNG LẶP COMBO CHUẨN XÁC THEO THỨ TỰ (SUSTAIN ➔ BUFFER ➔ MAIN CARRY)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {rotationSteps.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px 18px',
                    background: 'rgba(255, 255, 255, 0.025)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  {/* Step Index Badge */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '85px',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(250, 204, 21, 0.2)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      marginBottom: '6px',
                      border: '1px solid rgba(250, 204, 21, 0.4)'
                    }}>
                      {s.step || idx + 1}
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', textAlign: 'center' }}>
                      {s.char}
                    </span>
                  </div>

                  {/* Step Action Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.82rem',
                      color: 'var(--accent-gold)',
                      fontWeight: 800,
                      marginBottom: '6px'
                    }}>
                      {s.roleTitle || `Bước ${s.step}: ${s.char}`}
                    </div>

                    {/* Action Chips */}
                    {s.tokens && s.tokens.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                        {s.tokens.map((token, tIdx) => renderActionBadge(token, tIdx))}
                      </div>
                    )}

                    <div style={{
                      fontSize: '0.88rem',
                      lineHeight: 1.65,
                      color: 'var(--text-primary)',
                      fontWeight: 500
                    }}>
                      {s.actionText || s.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: CHỈ SỐ CHUẨN & HƯỚNG DẪN BUILD ECHO (CHO NHÂN VẬT ĐƯỢC CHỌN) */}
        {viewMode === 'build' && buildGuide && (
          <div style={{ padding: '22px 24px', flex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '18px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Target size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                  Thông Số Chuẩn & Khuyến Nghị Build • {activeChar.name}
                </h3>
              </div>
              <span style={{
                fontSize: '0.76rem',
                padding: '3px 10px',
                borderRadius: '4px',
                background: 'rgba(0, 229, 255, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                fontWeight: 800
              }}>
                {buildGuide.statType}
              </span>
            </div>

            {/* 4 Chỉ Số Chuẩn Khuyến Nghị (Target Benchmark Stats) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '22px'
            }}>
              {/* Primary Stat (ATK / HP / DEF) */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {buildGuide.targetStats.primaryLabel}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', marginTop: '4px' }}>
                  {buildGuide.targetStats.primaryValue}
                </div>
              </div>

              {/* Crit Rate */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid rgba(250, 204, 21, 0.2)'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Tỉ Lệ Bạo Kích
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '4px' }}>
                  {buildGuide.targetStats.critRate}
                </div>
              </div>

              {/* Crit DMG */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid rgba(192, 132, 252, 0.2)'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-purple)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Sát Thương Bạo Kích
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-purple)', marginTop: '4px' }}>
                  {buildGuide.targetStats.critDmg}
                </div>
              </div>

              {/* Energy Regen */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid rgba(0, 229, 255, 0.2)'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Hiệu Quả Nạp Năng Lượng
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-cyan)', marginTop: '4px' }}>
                  {buildGuide.targetStats.energyRegen}
                </div>
              </div>
            </div>

            {/* Bộ Echo Khuyên Dùng & Phân Bổ Chỉ Số */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.45)',
              padding: '18px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}>
              <div style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid rgba(243, 186, 47, 0.25)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {buildGuide.sonataIcon ? (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: 'rgba(243, 186, 47, 0.12)',
                      border: '1px solid rgba(243, 186, 47, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <img
                        src={buildGuide.sonataIcon}
                        alt={buildGuide.bestEchoSet}
                        style={{ width: '26px', height: '26px', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <Award size={18} color="var(--accent-gold)" />
                  )}
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase' }}>
                      Bộ Echo Khuyên Dùng:
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '2px' }}>
                      {buildGuide.bestEchoSet}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#fff',
                  fontWeight: 800,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {buildGuide.costStructure || '4 - 3 - 3 - 1 - 1'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(243, 186, 47, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {buildGuide.echoImage && (
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--accent-gold)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      flexShrink: 0,
                      boxShadow: '0 0 10px rgba(243, 186, 47, 0.2)'
                    }}>
                      <img
                        src={buildGuide.echoImage}
                        alt={buildGuide.mainEcho4Cost}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 800 }}>Echo Chủ Lực (Cost 4):</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{buildGuide.mainEcho4Cost}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Dòng chính: {buildGuide.mainStats.cost4}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>Echo Tầm Trung (Cost 3 x2):</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{buildGuide.mainStats.cost3}</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--accent-green)', fontWeight: 800 }}>Echo Cơ Bản (Cost 1 x2):</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>{buildGuide.mainStats.cost1}</div>
                </div>
              </div>

              {/* Sub-stats Priority */}
              <div>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Thứ Tự Ưu Tiên Dòng Phụ:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {buildGuide.subStatsPriority.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: sIdx === 0 ? 'var(--accent-gold)' : 'var(--text-primary)'
                      }}
                    >
                      {sIdx + 1}. {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vũ Khí Khuyên Dùng */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                ⚔️ Lựa Chọn Vũ Khí Tối Ưu:
              </div>
              <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                {buildGuide.recommendedWeapons.map((w, wIdx) => (
                  <li key={wIdx}>
                    <strong style={{ color: wIdx === 0 ? 'var(--accent-gold)' : '#fff' }}>{w}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
