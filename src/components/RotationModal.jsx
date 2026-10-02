import React, { useState } from 'react';
import { X, Sparkles, Swords, RefreshCw, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

export default function RotationModal({ team, onClose }) {
  if (!team) return null;

  // Lấy danh sách nhân vật đầy đủ từ team
  const characters = team.characters || [];
  const coreResonator = characters.find(c => c.id === team.core) || characters[0];

  // Kiểm tra xem có hướng dẫn quickswap không
  const hasQuickswap = Boolean(team.customRotations?.quickswap || characters.some(c => c?.rotations?.quickswap));
  const [activeTab, setActiveTab] = useState(hasQuickswap ? 'quickswap' : 'standard');

  // Lấy các bước rotation
  let rotationSteps = [];
  if (activeTab === 'quickswap') {
    if (team.customRotations?.quickswap) {
      rotationSteps = team.customRotations.quickswap;
    } else {
      const qsChar = characters.find(c => c?.rotations?.quickswap);
      rotationSteps = qsChar?.rotations?.quickswap || [];
    }
  } else {
    if (team.customRotations?.standard) {
      rotationSteps = team.customRotations.standard;
    } else {
      rotationSteps = coreResonator?.rotations?.standard || [];
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#131824',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Swords size={20} color="var(--accent-gold)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{team.name}</h2>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(250, 204, 21, 0.15)',
                color: 'var(--accent-gold)',
                fontWeight: 600
              }}>
                {team.type}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{team.description}</p>
          </div>

          <button onClick={onClose} style={{
            padding: '8px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--text-secondary)'
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Members Roster View */}
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid var(--border-color)',
          overflowX: 'auto'
        }}>
          {characters.map((char, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              minWidth: '200px'
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: char.iconColor || '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#000',
                fontSize: '1rem'
              }}>
                {char.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{char.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{char.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Selection: Standard vs Quickswap */}
        <div style={{
          padding: '16px 24px 0 24px',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={() => setActiveTab('standard')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: activeTab === 'standard' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'standard' ? '#fff' : 'var(--text-muted)',
              borderBottom: activeTab === 'standard' ? '2px solid var(--accent-gold)' : 'none'
            }}
          >
            <RefreshCw size={16} /> Standard Rotation (Concerto)
          </button>

          {hasQuickswap && (
            <button
              onClick={() => setActiveTab('quickswap')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px 8px 0 0',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: activeTab === 'quickswap' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                color: activeTab === 'quickswap' ? '#fff' : 'var(--text-muted)',
                borderBottom: activeTab === 'quickswap' ? '2px solid var(--accent-purple)' : 'none'
              }}
            >
              <Zap size={16} /> Quickswap Rotation (Animation Cancel)
            </button>
          )}
        </div>

        {/* Step-by-Step Rotation Instruction List (Game8 Style) */}
        <div style={{ padding: '20px 24px', flex: 1 }}>
          <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Vòng lặp xuất chiêu chi tiết (Thứ tự từ Bước 1 ➔ Bước cuối)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rotationSteps.map((s, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '16px',
                padding: '14px 16px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '70px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: activeTab === 'quickswap' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                    color: activeTab === 'quickswap' ? 'var(--accent-purple)' : 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    marginBottom: '6px'
                  }}>
                    {s.step || idx + 1}
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', textAlign: 'center' }}>
                    {s.char}
                  </span>
                </div>

                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)'
                }}>
                  {s.action}
                </div>
              </div>
            ))}
          </div>

          {/* Trang bị & Khuyên dùng Echo */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem' }}>
              <ShieldCheck size={16} /> Gợi ý Echo & Trang bị cho Core {coreResonator?.name}:
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              • <strong>Vũ khí tốt nhất:</strong> {coreResonator?.bestWeapon || 'Signature'} <br />
              • <strong>Sonata Echo Set:</strong> {coreResonator?.bestEchoSet} <br />
              • <strong>Phân bổ chỉ số chính:</strong> {coreResonator?.echoMainStats}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(0, 0, 0, 0.3)'
        }}>
          <button onClick={onClose} style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: 'var(--border-color)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
