import React, { useState, useEffect } from 'react';
import { RESONATORS } from './data/resonators';
import { generateOptimalTeams, solveTowerOfAdversity } from './utils/teamBuilder';
import { supabase } from './supabaseClient';
import RotationModal from './components/RotationModal';
import PityTracker from './components/PityTracker';
import WaveplateTracker from './components/WaveplateTracker';
import { 
  Users, 
  Swords, 
  Sparkles, 
  Layers, 
  Compass, 
  Check, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  Search,
  Star,
  RotateCcw
} from 'lucide-react';

export default function App() {
  // Navigation Tabs: 'builder' | 'toa' | 'pity' | 'stamina'
  const [activeTab, setActiveTab] = useState('builder');

  // Kho nhân vật sở hữu (Default tick sẵn một số con meta để trải nghiệm tức thì)
  const [ownedIds, setOwnedIds] = useState([
    'hsin', 'camellya', 'shorekeeper', 'jinhsi', 'changli', 
    'xiangli_yao', 'yinlin', 'zhezhi', 'verina', 'sanhua', 'mortefi', 'yuanwu'
  ]);

  // Selected Team để mở Rotation Modal Game8
  const [selectedTeamForRotation, setSelectedTeamForRotation] = useState(null);

  // Filter nguyên tố & tìm kiếm ở kho nhân vật
  const [elementFilter, setElementFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Lịch sử quay giả lập / load từ Supabase
  const [conveneRecords, setConveneRecords] = useState([
    { card_pool_type: 'character_event', resource_name: 'Hsin', quality_level: 5, time: '2026-10-01' },
    { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: '2026-10-01' }
  ]);

  // Đồng bộ lên Supabase
  const [isCloudSynced, setIsCloudSynced] = useState(true);

  // Tải danh sách sở hữu từ Supabase Cloud khi mở trang
  useEffect(() => {
    async function loadOwnedFromCloud() {
      try {
        const { data, error } = await supabase
          .from('user_state')
          .select('value')
          .eq('key', 'owned_characters')
          .single();
        if (data && Array.isArray(data.value) && data.value.length > 0) {
          setOwnedIds(data.value);
        }
      } catch (e) {
        console.log('Chưa có cấu hình cloud trước đó, dùng mặc định:', e);
      }
    }
    loadOwnedFromCloud();
  }, []);

  // Lưu danh sách nhân vật vào Supabase
  const saveToSupabase = async (list) => {
    setIsCloudSynced(false);
    try {
      await supabase.from('user_state').upsert({
        key: 'owned_characters',
        value: list,
        updated_at: new Date().toISOString()
      });
      setIsCloudSynced(true);
    } catch (err) {
      console.log('Supabase sync note:', err);
    }
  };

  // Toggle sở hữu nhân vật
  const toggleCharacterOwnership = async (id) => {
    const updated = ownedIds.includes(id) 
      ? ownedIds.filter(item => item !== id)
      : [...ownedIds, id];
    
    setOwnedIds(updated);
    saveToSupabase(updated);
  };

  // Chọn toàn bộ 36 nhân vật
  const selectAllResonators = () => {
    const allIds = RESONATORS.map(r => r.id);
    setOwnedIds(allIds);
    saveToSupabase(allIds);
  };

  // Chỉ chọn các nhân vật 5 sao
  const selectOnly5StarResonators = () => {
    const fiveStarIds = RESONATORS.filter(r => r.rarity === 5).map(r => r.id);
    setOwnedIds(fiveStarIds);
    saveToSupabase(fiveStarIds);
  };

  // Bỏ chọn tất cả
  const clearAllResonators = () => {
    setOwnedIds([]);
    saveToSupabase([]);
  };

  // Tính toán các team khả dụng
  const suggestedTeams = generateOptimalTeams(ownedIds);
  const toaSolution = solveTowerOfAdversity(ownedIds);

  const elements = ['All', 'Spectro', 'Havoc', 'Fusion', 'Aero', 'Electro', 'Glacio'];
  const filteredResonators = RESONATORS.filter(r => {
    const matchesElement = elementFilter === 'All' || r.element === elementFilter;
    const matchesQuery = searchQuery === '' || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.weaponType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesElement && matchesQuery;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px 80px 16px' }}>
      {/* Top Navigation Bar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #facc15, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
          }}>
            <Swords size={24} color="#000" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
                WUWA HUB
              </h1>
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(168, 85, 247, 0.2)',
                color: 'var(--accent-purple)',
                fontWeight: 700
              }}>
                v3.7 HSIN
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Trợ lý Xếp đội & Rotation Wuthering Waves Cá nhân
            </p>
          </div>
        </div>

        {/* Supabase Status Pill & Nav Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.2)',
            fontSize: '0.75rem',
            color: 'var(--accent-green)'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
            Supabase Cloud Connected
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'builder', label: 'Tự Động Xếp Đội', icon: <Swords size={18} /> },
          { id: 'toa', label: 'Tower of Adversity (3 Teams)', icon: <Layers size={18} /> },
          { id: 'pity', label: 'Pity Tracker (Lịch Sử Roll)', icon: <Compass size={18} /> },
          { id: 'stamina', label: 'Waveplate & Boss Tuần', icon: <Zap size={18} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: activeTab === tab.id ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-color)',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: AUTO TEAM BUILDER */}
      {activeTab === 'builder' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Section: Kho Nhân Vật (Roster Selection) */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={20} color="var(--accent-cyan)" />
                  Kho Nhân Vật Của Bạn ({ownedIds.length}/{RESONATORS.length})
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Bấm để chọn những nhân vật bạn đang sở hữu. Hệ thống sẽ tự động ghép các đội hình tối ưu nhất.
                </p>
              </div>

              {/* Search & Element Filter Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Search Input */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '4px 10px'
                  }}>
                    <Search size={14} color="var(--text-muted)" />
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm nhân vật / vũ khí..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.75rem',
                        outline: 'none',
                        width: '170px'
                      }}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px' }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Element Filter Buttons */}
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {elements.map(el => (
                      <button
                        key={el}
                        onClick={() => setElementFilter(el)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: elementFilter === el ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                          color: elementFilter === el ? '#fff' : 'var(--text-muted)',
                          border: '1px solid',
                          borderColor: elementFilter === el ? 'rgba(255, 255, 255, 0.3)' : 'transparent'
                        }}
                      >
                        {el}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bulk Actions */}
                <div style={{ display: 'flex', gap: '6px', fontSize: '0.75rem' }}>
                  <button 
                    onClick={selectAllResonators}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    Chọn tất cả ({RESONATORS.length})
                  </button>
                  <button 
                    onClick={selectOnly5StarResonators}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(250, 204, 21, 0.1)',
                      border: '1px solid rgba(250, 204, 21, 0.3)',
                      color: 'var(--accent-gold)',
                      cursor: 'pointer'
                    }}
                  >
                    Chỉ chọn 5★
                  </button>
                  <button 
                    onClick={clearAllResonators}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      cursor: 'pointer'
                    }}
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>
            </div>

            {/* Character Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(115px, 1fr))',
              gap: '12px'
            }}>
              {filteredResonators.map((char) => {
                const isOwned = ownedIds.includes(char.id);
                return (
                  <div
                    key={char.id}
                    onClick={() => toggleCharacterOwnership(char.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '12px 8px 10px 8px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      background: isOwned ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.35)',
                      border: `1px solid ${isOwned ? 'rgba(250, 204, 21, 0.45)' : 'rgba(255, 255, 255, 0.04)'}`,
                      opacity: isOwned ? 1 : 0.42
                    }}
                  >
                    {/* Checkmark badge */}
                    {isOwned && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'var(--accent-gold)',
                        color: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 900
                      }}>
                        ✓
                      </div>
                    )}

                    {/* Rarity Star Pill */}
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: char.rarity === 5 ? '#facc15' : '#c084fc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1px'
                    }}>
                      <Star size={10} fill={char.rarity === 5 ? '#facc15' : '#c084fc'} color="none" />
                      {char.rarity}★
                    </div>

                    {/* Avatar Initials / Color Circle */}
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: char.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      color: '#000',
                      fontSize: '1.15rem',
                      marginTop: '4px',
                      marginBottom: '8px',
                      boxShadow: isOwned ? `0 0 14px ${char.iconColor}88` : 'none'
                    }}>
                      {char.name[0]}
                    </div>

                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>
                      {char.name}
                    </span>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        {char.element}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                        {char.weaponType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Đề xuất Đội Hình (Suggested Teams) */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="var(--accent-gold)" />
                  Đội Hình Đề Xuất Tối Ưu ({suggestedTeams.length} đội khả thi)
                </h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Bấm vào bất kỳ đội hình nào để xem <strong>Hướng dẫn Combo từng bước (Game8 format)</strong>
                </p>
              </div>
            </div>

            {suggestedTeams.length === 0 ? (
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Chưa tìm thấy đội hình phù hợp. Hãy chọn thêm nhân vật trong kho của bạn!
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '16px'
              }}>
                {suggestedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="glass-panel glass-panel-hover"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: `4px solid ${team.matchScore >= 90 ? 'var(--accent-gold)' : 'var(--accent-cyan)'}`
                    }}
                  >
                    <div>
                      {/* Team Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                            {team.name}
                          </h3>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', color: 'var(--accent-gold)' }}>
                              {team.type}
                            </span>
                            {team.tags?.map((t, idx) => (
                              <span key={idx} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)' }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                          {team.matchScore}% Match
                        </span>
                      </div>

                      {/* 3 Members Display */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        marginBottom: '16px',
                        background: 'rgba(0, 0, 0, 0.25)',
                        padding: '10px',
                        borderRadius: '8px'
                      }}>
                        {team.characters.map((m, idx) => (
                          <div key={idx} style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '8px',
                              background: m?.iconColor || '#38bdf8',
                              margin: '0 auto 6px auto',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              color: '#000',
                              fontSize: '1.1rem'
                            }}>
                              {m?.name?.[0]}
                            </div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{m?.name}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub/Buffer' : 'Sustain'}</div>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.4 }}>
                        {team.description}
                      </p>
                    </div>

                    {/* View Rotation Action Button */}
                    <button
                      onClick={() => setSelectedTeamForRotation(team)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(250, 204, 21, 0.12)',
                        border: '1px solid rgba(250, 204, 21, 0.3)',
                        color: 'var(--accent-gold)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Swords size={16} /> Xem Hướng Dẫn Combo (Game8)
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: TOWER OF ADVERSITY SOLVER */}
      {activeTab === 'toa' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={22} color="var(--accent-purple)" />
              Phân Bổ 3 Đội Hình Tower of Adversity (Không Trùng Nhân Vật)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Tự động tính toán chia kho nhân vật của bạn thành 3 đội hình mạnh nhất cho 3 nhánh tháp (Hazard, Resonant, Echoing) mà không bị xung đột tài nguyên.
            </p>
          </div>

          {!toaSolution ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Bạn cần ít nhất 9 nhân vật đã được tick chọn (gồm đủ DPS, Buffer, Healer) để thuật toán xếp đủ 3 team độc lập!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              {/* Tower 1 */}
              <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #ef4444' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Tháp 1: Hazard Tower (Tầng 4 Boss khó nhất)
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{toaSolution.tower1_Hazard.name}</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  {toaSolution.tower1_Hazard.characters.map((m, idx) => (
                    <div key={idx} style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: m.iconColor, margin: '0 auto 6px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        {m.name[0]}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.name}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedTeamForRotation(toaSolution.tower1_Hazard)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  Xem Combo
                </button>
              </div>

              {/* Tower 2 */}
              <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #38bdf8' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Tháp 2: Resonant Tower
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{toaSolution.tower2_Resonant.name}</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  {toaSolution.tower2_Resonant.characters.map((m, idx) => (
                    <div key={idx} style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: m.iconColor, margin: '0 auto 6px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        {m.name[0]}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.name}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedTeamForRotation(toaSolution.tower2_Resonant)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  Xem Combo
                </button>
              </div>

              {/* Tower 3 */}
              <div className="glass-panel" style={{ padding: '20px', borderTop: '4px solid #a855f7' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Tháp 3: Echoing Tower
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{toaSolution.tower3_Echoing.name}</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  {toaSolution.tower3_Echoing.characters.map((m, idx) => (
                    <div key={idx} style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: m.iconColor, margin: '0 auto 6px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                        {m.name[0]}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.name}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedTeamForRotation(toaSolution.tower3_Echoing)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.08)', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  Xem Combo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PITY TRACKER */}
      {activeTab === 'pity' && (
        <PityTracker
          conveneRecords={conveneRecords}
          onImportSuccess={(newRecords) => setConveneRecords([...conveneRecords, ...newRecords])}
        />
      )}

      {/* TAB 4: WAVEPLATE TRACKER */}
      {activeTab === 'stamina' && (
        <WaveplateTracker />
      )}

      {/* Rotation Modal Game8 (Popup) */}
      {selectedTeamForRotation && (
        <RotationModal
          team={selectedTeamForRotation}
          onClose={() => setSelectedTeamForRotation(null)}
        />
      )}
    </div>
  );
}
