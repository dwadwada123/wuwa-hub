import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RESONATORS, ELEMENT_ICONS, ELEMENT_ICONS_FALLBACK } from './data/resonators';
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
  Zap, 
  Search, 
  Calendar, 
  Shield, 
  Flame, 
  Activity, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

const STORAGE_KEY_OWNED = 'wuwa_owned_resonators';
const STORAGE_KEY_ACTIVE_TAB = 'wuwa_active_tab';
const STORAGE_KEY_ELEMENT_FILTER = 'wuwa_element_filter';

// Danh sách mặc định ban đầu nếu người dùng mở web lần đầu tiên
const DEFAULT_OWNED = [
  'hsin', 'camellya', 'shorekeeper', 'jinhsi', 'changli', 
  'xiangli_yao', 'yinlin', 'zhezhi', 'verina', 'sanhua', 'mortefi', 'yuanwu'
];

export default function App() {
  // Navigation Tabs: 'builder' | 'toa' | 'pity' | 'stamina'
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_TAB);
      if (saved) return saved;
    } catch (e) {}
    return 'builder';
  });

  // Kho nhân vật sở hữu (Tải tức thì từ LocalStorage để 0ms hiển thị)
  const [ownedIds, setOwnedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OWNED);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage owned error:', e);
    }
    return DEFAULT_OWNED;
  });

  // Selected Team để mở Rotation Modal
  const [selectedTeamForRotation, setSelectedTeamForRotation] = useState(null);

  // Filter nguyên tố (All, Spectro, Havoc, Fusion, Aero, Electro, Glacio) & tìm kiếm
  const [elementFilter, setElementFilter] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ELEMENT_FILTER);
      if (saved) return saved;
    } catch (e) {}
    return 'All';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Hàm trợ giúp đồng bộ ngầm an toàn lên Supabase Cloud
  const syncCloudState = useCallback(async (key, value) => {
    try {
      await supabase.from('user_state').upsert({
        key,
        value,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      // Chạy ngầm, không spam log
    }
  }, []);

  // Lưu tab đang chọn vào LocalStorage và Supabase Cloud
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, tabId);
    } catch (e) {}
    syncCloudState('active_tab', tabId);
  }, [syncCloudState]);

  // Lưu bộ lọc hệ nguyên tố vào LocalStorage và Supabase Cloud
  const handleElementFilterChange = useCallback((filter) => {
    setElementFilter(filter);
    try {
      localStorage.setItem(STORAGE_KEY_ELEMENT_FILTER, filter);
    } catch (e) {}
    syncCloudState('element_filter', filter);
  }, [syncCloudState]);

  // Tải cấu hình từ Supabase Cloud khi mở trang
  useEffect(() => {
    async function loadCloudState() {
      try {
        const { data } = await supabase
          .from('user_state')
          .select('key, value');

        if (data && Array.isArray(data)) {
          data.forEach(item => {
            if (item.key === 'owned_characters' && Array.isArray(item.value)) {
              setOwnedIds(item.value);
              try { localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(item.value)); } catch (e) {}
            }
            if (item.key === 'active_tab' && typeof item.value === 'string') {
              setActiveTab(item.value);
              try { localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, item.value); } catch (e) {}
            }
            if (item.key === 'element_filter' && typeof item.value === 'string') {
              setElementFilter(item.value);
              try { localStorage.setItem(STORAGE_KEY_ELEMENT_FILTER, item.value); } catch (e) {}
            }
          });
        }
      } catch (e) {}
    }
    loadCloudState();
  }, []);

  // Lưu danh sách nhân vật vào cả LocalStorage và Supabase Cloud
  const persistOwned = useCallback((list) => {
    setOwnedIds(list);
    try {
      localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(list));
    } catch (e) {}
    syncCloudState('owned_characters', list);
  }, [syncCloudState]);

  // Toggle sở hữu nhân vật
  const toggleCharacterOwnership = useCallback((id) => {
    setOwnedIds(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id];
      
      try {
        localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(updated));
      } catch (e) {}

      syncCloudState('owned_characters', updated);
      return updated;
    });
  }, [syncCloudState]);

  // Thao tác chọn nhanh
  const selectAllResonators = () => {
    const allIds = RESONATORS.map(r => r.id);
    persistOwned(allIds);
  };

  const selectOnly5StarResonators = () => {
    const fiveStarIds = RESONATORS.filter(r => r.rarity === 5).map(r => r.id);
    persistOwned(fiveStarIds);
  };

  const clearAllSelections = () => {
    persistOwned([]);
  };

  // Lọc danh sách nhân vật theo Hệ và Tìm Kiếm
  const filteredResonators = useMemo(() => {
    return RESONATORS.filter(r => {
      const matchElement = elementFilter === 'All' || r.element.toLowerCase() === elementFilter.toLowerCase();
      const matchSearch = searchQuery === '' || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.weaponType?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchElement && matchSearch;
    });
  }, [elementFilter, searchQuery]);

  const [selectedDpsFilter, setSelectedDpsFilter] = useState('all');

  // Sinh đội hình tối ưu chỉ từ các đề xuất Meta chuẩn
  const optimalTeams = useMemo(() => {
    return generateOptimalTeams(ownedIds);
  }, [ownedIds]);

  // Gom nhóm các đội hình dựa trên nhân vật Chủ Lực (Main DPS Slot 1)
  const teamsByDps = useMemo(() => {
    const groups = new Map();
    for (const team of optimalTeams) {
      const dpsChar = team.characters?.[0] || RESONATORS.find(r => r.id === team.core) || { id: team.core, name: 'Chủ Lực' };
      const dpsId = dpsChar.id || team.core;
      if (!groups.has(dpsId)) {
        groups.set(dpsId, {
          dpsId,
          dps: dpsChar,
          teams: []
        });
      }
      groups.get(dpsId).teams.push(team);
    }
    return Array.from(groups.values());
  }, [optimalTeams]);

  // Lọc nhóm theo DPS được chọn nếu có
  const displayedDpsGroups = useMemo(() => {
    if (selectedDpsFilter === 'all') return teamsByDps;
    return teamsByDps.filter(g => g.dpsId === selectedDpsFilter);
  }, [teamsByDps, selectedDpsFilter]);

  useEffect(() => {
    if (selectedDpsFilter !== 'all' && !teamsByDps.some(g => g.dpsId === selectedDpsFilter)) {
      setSelectedDpsFilter('all');
    }
  }, [teamsByDps, selectedDpsFilter]);

  // Phân bổ ToA 3 tháp (Tháp giữa 2 team riêng biệt cho Tầng 1-2 & Tầng 3-4, tuyệt đối không trùng nhân vật)
  const toaSolution = useMemo(() => {
    return solveTowerOfAdversity(ownedIds);
  }, [ownedIds]);

  return (
    <div style={{
      maxWidth: '1380px',
      margin: '0 auto',
      padding: '24px 20px 80px 20px',
      minHeight: '100vh',
      color: 'var(--text-primary)'
    }}>
      {/* Top Header • Kuro Games WuWa Tactical HUD */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '22px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '26px',
        flexWrap: 'wrap',
        gap: '16px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo Badge with Tactical Glow */}
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 28px rgba(250, 204, 21, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            position: 'relative'
          }}>
            <Swords size={28} color="#05080f" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 900, 
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1.5px', 
                background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                WUWA HUB
              </h1>
              <span style={{
                fontSize: '0.74rem',
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                fontWeight: 800,
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-tactical)'
              }}>
                SOLARIS-3 TACTICAL
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Đề Xuất Đội Hình Meta</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Chuỗi Combo Thực Chiến</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Tower of Adversity Mùa 3.7</span>
            </p>
          </div>
        </div>

        {/* Ambient Signal Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            boxShadow: '0 0 10px var(--accent-gold)'
          }} className="pulse-glow" />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.5px', fontFamily: 'var(--font-tactical)' }}>
            RESONANCE ONLINE
          </span>
        </div>
      </header>

      {/* Main Tabs Navigation (Không chứa text trong ngoặc) */}
      <nav style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '28px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'builder', label: 'Tự Động Xếp Đội', icon: <Swords size={18} /> },
          { id: 'toa', label: 'Tower of Adversity', icon: <Layers size={18} /> },
          { id: 'pity', label: 'Pity Tracker', icon: <Compass size={18} /> },
          { id: 'stamina', label: 'Waveplate', icon: <Zap size={18} /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                background: isActive ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#05080f' : 'var(--text-secondary)',
                border: isActive ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                boxShadow: isActive ? '0 4px 20px rgba(245, 158, 11, 0.38)' : 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* TAB 1: AUTO TEAM BUILDER */}
      {activeTab === 'builder' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} className="animate-fade-in-up">
          {/* Panel Chọn Nhân Vật • Tactical Console */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={20} color="var(--accent-gold)" />
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                    Kho Nhân Vật Resonator
                  </h2>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    background: 'rgba(250, 204, 21, 0.15)',
                    color: 'var(--accent-gold)',
                    fontWeight: 800
                  }}>
                    {ownedIds.length} / {RESONATORS.length}
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Tick chọn các nhân vật bạn sở hữu để hệ thống đối chiếu và đề xuất những đội hình Meta tốt nhất.
                </p>
              </div>

              {/* Quick Select Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={selectAllResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                >
                  Chọn Tất Cả 60
                </button>
                <button
                  onClick={selectOnly5StarResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(250, 204, 21, 0.1)',
                    border: '1px solid rgba(250, 204, 21, 0.25)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--accent-gold)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.1)'; }}
                >
                  Chỉ 5 Sao
                </button>
                <button
                  onClick={clearAllSelections}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#f87171'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)'; }}
                >
                  Bỏ Chọn Hết
                </button>
              </div>
            </div>

            {/* Toolbar: Search & Dynamic Colored Element Filters */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              padding: '12px 16px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {/* Search Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '6px 12px',
                flex: '1 1 240px',
                maxWidth: '360px'
              }}>
                <Search size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên nhân vật, vũ khí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                />
              </div>

              {/* Dynamic Colored Element Filter Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                {['All', 'Spectro', 'Havoc', 'Fusion', 'Aero', 'Electro', 'Glacio'].map((ele) => {
                  const isActive = elementFilter.toLowerCase() === ele.toLowerCase();
                  const eleClass = `element-filter-btn active-${ele.toLowerCase()}`;
                  return (
                    <button
                      key={ele}
                      className={isActive ? eleClass : 'element-filter-btn'}
                      onClick={() => handleElementFilterChange(ele)}
                    >
                      {ELEMENT_ICONS[ele] && (
                        <img 
                          src={ELEMENT_ICONS[ele]} 
                          alt={ele} 
                          style={{ width: '18px', height: '18px', objectFit: 'contain' }} 
                          onError={(e) => {
                            if (ELEMENT_ICONS_FALLBACK && ELEMENT_ICONS_FALLBACK[ele] && e.currentTarget.src !== ELEMENT_ICONS_FALLBACK[ele]) {
                              e.currentTarget.src = ELEMENT_ICONS_FALLBACK[ele];
                            }
                          }}
                        />
                      )}
                      <span>{ele}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Resonator Roster Grid (Sorted by Release Version Descending) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px'
            }}>
              {filteredResonators.map((r) => {
                const isSelected = ownedIds.includes(r.id);
                const is5Star = r.rarity === 5;

                return (
                  <div
                    key={r.id}
                    onClick={() => toggleCharacterOwnership(r.id)}
                    className={`resonator-card ${isSelected ? 'selected' : 'unselected'}`}
                    style={{
                      padding: '8px',
                      position: 'relative'
                    }}
                  >
                    {/* Star Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      zIndex: 2,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 800
                    }} className={is5Star ? 'star-badge-5' : 'star-badge-4'}>
                      {r.rarity}★
                    </div>

                    {/* Element Icon Badge (Round Colored Official Badge) */}
                    {ELEMENT_ICONS[r.element] && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        zIndex: 2,
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                      }}>
                        <img 
                          src={ELEMENT_ICONS[r.element]} 
                          alt={r.element} 
                          style={{ width: '16px', height: '16px', objectFit: 'contain' }} 
                          onError={(e) => {
                            if (ELEMENT_ICONS_FALLBACK && ELEMENT_ICONS_FALLBACK[r.element] && e.currentTarget.src !== ELEMENT_ICONS_FALLBACK[r.element]) {
                              e.currentTarget.src = ELEMENT_ICONS_FALLBACK[r.element];
                            }
                          }}
                        />
                      </div>
                    )}

                    {/* Character Avatar Container */}
                    <div style={{
                      width: '100%',
                      paddingTop: '100%',
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: 'rgba(0, 0, 0, 0.5)',
                      marginBottom: '8px'
                    }}>
                      {r.avatar ? (
                        <img
                          src={r.avatar}
                          alt={r.name}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 900
                        }}>
                          {r.name[0]}
                        </div>
                      )}

                      {/* Selected Overlay Checkmark */}
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          bottom: '4px',
                          right: '4px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--accent-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)'
                        }}>
                          <CheckCircle2 size={15} color="#000" />
                        </div>
                      )}
                    </div>

                    {/* Character Name & Role Preview */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: isSelected ? '#fff' : 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {r.name}
                      </div>
                      <div style={{
                        fontSize: '0.68rem',
                        color: is5Star ? 'var(--accent-gold)' : 'var(--accent-purple)',
                        marginTop: '2px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        <span>{r.weaponType}</span>
                        {r.releaseVersion && (
                          <span style={{
                            fontSize: '0.62rem',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: '#94a3b8',
                            fontWeight: 700
                          }}>
                            v{r.releaseVersion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Đội Hình Đề Xuất Tối Ưu • Gom Nhóm Theo Nhân Vật Chủ Lực */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Swords size={22} color="var(--accent-gold)" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                  Đội Hình Đề Xuất Tối Ưu • {optimalTeams.length} Đội Khuyến Nghị
                </h2>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Gom nhóm theo nhân vật Chủ Lực • Cấu trúc chuẩn <strong>Slot 1 Main DPS + Slot 2 Buffer + Slot 3 Sustain</strong>
              </span>
            </div>

            {optimalTeams.length === 0 ? (
              <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Users size={48} style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  Chưa đủ nhân vật để ghép thành 1 đội hình khuyến nghị!
                </p>
                <p style={{ fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
                  Hãy tick chọn thêm các nhân vật bạn sở hữu ở bảng trên để nhận danh sách đề xuất đội hình chuẩn Meta.
                </p>
              </div>
            ) : (
              <div>
                {/* Thanh Lọc Nhanh Theo Từng Nhân Vật Chủ Lực (Quick DPS Filter Chips) */}
                {teamsByDps.length > 1 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '12px',
                    marginBottom: '20px'
                  }}>
                    <button
                      className={`dps-filter-chip ${selectedDpsFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedDpsFilter('all')}
                    >
                      <Sparkles size={14} color={selectedDpsFilter === 'all' ? 'var(--accent-gold)' : 'currentColor'} />
                      <span>Tất Cả ({optimalTeams.length})</span>
                    </button>
                    {teamsByDps.map((group) => {
                      const isAct = selectedDpsFilter === group.dpsId;
                      return (
                        <button
                          key={group.dpsId}
                          className={`dps-filter-chip ${isAct ? 'active' : ''}`}
                          onClick={() => setSelectedDpsFilter(isAct ? 'all' : group.dpsId)}
                        >
                          {group.dps?.avatar && (
                            <img
                              src={group.dps.avatar}
                              alt={group.dps.name}
                              style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          )}
                          <span>{group.dps?.name}</span>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '1px 6px',
                            borderRadius: '10px',
                            background: isAct ? 'rgba(250, 204, 21, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                            color: isAct ? 'var(--accent-gold)' : 'var(--text-secondary)'
                          }}>
                            {group.teams.length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Danh Sách Các Nhóm Đội Hình Theo Main DPS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {displayedDpsGroups.map((group) => {
                    const dps = group.dps;
                    return (
                      <div key={group.dpsId} className="dps-group-section">
                        {/* Header của từng Nhóm Chủ Lực */}
                        <div className="dps-group-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              position: 'relative',
                              background: dps?.iconColor || '#38bdf8',
                              border: '2px solid var(--accent-gold)',
                              boxShadow: '0 0 14px rgba(250, 204, 21, 0.3)',
                              flexShrink: 0
                            }}>
                              {dps?.avatar ? (
                                <img
                                  src={dps.avatar}
                                  alt={dps.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              ) : (
                                <span style={{ fontWeight: 'bold', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                  {dps?.name?.[0]}
                                </span>
                              )}
                            </div>

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                                  {dps?.name}
                                </h3>
                                {dps?.element && ELEMENT_ICONS[dps.element] && (
                                  <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.74rem',
                                    fontWeight: 800,
                                    padding: '2px 8px',
                                    borderRadius: '20px',
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.12)'
                                  }}>
                                    <img src={ELEMENT_ICONS[dps.element]} alt={dps.element} style={{ width: '14px', height: '14px' }} />
                                    {dps.element}
                                  </span>
                                )}
                                {dps?.weapon && (
                                  <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    background: 'rgba(56, 189, 248, 0.12)',
                                    color: 'var(--accent-cyan)',
                                    border: '1px solid rgba(56, 189, 248, 0.25)'
                                  }}>
                                    {dps.weapon}
                                  </span>
                                )}
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  background: 'rgba(250, 204, 21, 0.15)',
                                  color: 'var(--accent-gold)',
                                  border: '1px solid rgba(250, 204, 21, 0.3)'
                                }}>
                                  Chủ Lực • Main DPS
                                </span>
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                                {dps?.overview || `Tập hợp các đội hình tối ưu nhất xoay quanh ${dps?.name}.`}
                              </p>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              color: '#fff',
                              border: '1px solid rgba(255, 255, 255, 0.15)'
                            }}>
                              {group.teams.length} Đội Hình Khuyến Nghị
                            </span>
                          </div>
                        </div>

                        {/* Lưới Thẻ Đội Hình Thu Nhỏ (Compact Cards Grid) */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                          gap: '14px'
                        }}>
                          {group.teams.map((team, tIdx) => (
                            <div
                              key={team.id || tIdx}
                              className="compact-team-card"
                              onClick={() => setSelectedTeamForRotation(team)}
                            >
                              {/* Dòng Tiêu Đề Thẻ: Tên Đội + Tier & Kiểu */}
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                  <div style={{
                                    fontSize: '0.94rem',
                                    fontWeight: 800,
                                    color: '#fff',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }} title={team.name}>
                                    {team.name}
                                  </div>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    {team.type}
                                  </div>
                                </div>
                                <span style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 900,
                                  padding: '2px 7px',
                                  borderRadius: '4px',
                                  background: team.tier === 'T0' ? 'rgba(250, 204, 21, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                                  color: team.tier === 'T0' ? 'var(--accent-gold)' : 'var(--accent-cyan)',
                                  border: `1px solid ${team.tier === 'T0' ? 'rgba(250, 204, 21, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`,
                                  flexShrink: 0
                                }}>
                                  {team.tier}
                                </span>
                              </div>

                              {/* 3 Thành Viên Trong Đội (Roster Thu Nhỏ) */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 10px',
                                background: 'rgba(0, 0, 0, 0.25)',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                gap: '6px'
                              }}>
                                {team.characters.map((char, cIdx) => (
                                  <React.Fragment key={cIdx}>
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      minWidth: 0,
                                      flex: 1
                                    }}>
                                      <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        flexShrink: 0,
                                        background: char?.iconColor || '#38bdf8',
                                        border: `1.5px solid ${cIdx === 0 ? 'var(--accent-gold)' : cIdx === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)'}`
                                      }}>
                                        {char?.avatar ? (
                                          <img
                                            src={char.avatar}
                                            alt={char.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                          />
                                        ) : (
                                          <span style={{ fontWeight: 'bold', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '0.8rem' }}>
                                            {char?.name?.[0]}
                                          </span>
                                        )}
                                      </div>
                                      <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{
                                          fontSize: '0.82rem',
                                          fontWeight: 800,
                                          color: '#fff',
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis'
                                        }}>
                                          {char?.name}
                                        </div>
                                        <div style={{
                                          fontSize: '0.68rem',
                                          fontWeight: 700,
                                          color: cIdx === 0 ? 'var(--accent-gold)' : cIdx === 1 ? 'var(--accent-cyan)' : 'var(--accent-green)',
                                          whiteSpace: 'nowrap'
                                        }}>
                                          {cIdx === 0 ? 'Slot 1' : cIdx === 1 ? 'Slot 2' : 'Slot 3'}
                                        </div>
                                      </div>
                                    </div>
                                    {cIdx < 2 && (
                                      <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '0.75rem', flexShrink: 0 }}>➔</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>

                              {/* Footer Thẻ: Mô tả rút gọn & Nút xem Combo */}
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '2px',
                                gap: '8px'
                              }}>
                                <span style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--text-muted)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  flex: 1
                                }}>
                                  {team.description}
                                </span>

                                <button
                                  type="button"
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    background: 'rgba(250, 204, 21, 0.12)',
                                    border: '1px solid rgba(250, 204, 21, 0.35)',
                                    color: 'var(--accent-gold)',
                                    fontWeight: 800,
                                    fontSize: '0.76rem',
                                    flexShrink: 0,
                                    cursor: 'pointer'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTeamForRotation(team);
                                  }}
                                >
                                  <Swords size={13} />
                                  <span>Combo</span>
                                  <ChevronRight size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TOWER OF ADVERSITY SOLVER • 100% KHÔNG TRÙNG NHÂN VẬT */}
      {activeTab === 'toa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }} className="animate-fade-in-up">
          {/* Header ToA */}
          <div className="glass-panel" style={{
            padding: '20px 24px',
            border: '1px solid rgba(243, 186, 47, 0.35)',
            background: 'linear-gradient(135deg, rgba(243, 186, 47, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(243, 186, 47, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(243, 186, 47, 0.4)'
              }}>
                <Layers size={22} color="var(--accent-gold)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                  Tower of Adversity • {toaSolution?.seasonName || 'Mùa 3.7'}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '2px' }}>
                  <Calendar size={14} color="var(--accent-gold)" />
                  <span>Thời gian mùa: <strong>{toaSolution?.seasonPeriod || '01/10/2026 - 31/10/2026'}</strong></span>
                </div>
              </div>
            </div>

            <div style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(56, 189, 248, 0.12)',
              color: 'var(--accent-cyan)',
              fontWeight: 700,
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              Phân Phối 10 Thể Lực Mỗi Nhân Vật • Không Trùng Lặp
            </div>
          </div>

          {!toaSolution ? (
            <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Layers size={44} style={{ margin: '0 auto 16px auto', opacity: 0.4, color: 'var(--accent-gold)' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Cần tối thiểu 6 nhân vật đã chọn để phân bổ vào các tháp!
              </p>
              <p style={{ fontSize: '0.86rem', maxWidth: '500px', margin: '0 auto' }}>
                Hãy quay lại tab Tự Động Xếp Đội và tick thêm nhân vật để giải bài toán Tower of Adversity.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* 1. THÁP GIỮA (Hazard Tower) */}
              <div className="glass-panel" style={{
                padding: '24px',
                borderLeft: '5px solid #ef4444',
                background: 'linear-gradient(145deg, rgba(24, 14, 20, 0.9) 0%, rgba(10, 8, 14, 0.98) 100%)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '16px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Flame size={22} color="#ef4444" />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff' }}>
                        Hazard Tower
                      </h3>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.4)'
                      }}>
                        4 Tầng • Tiêu Hao 5 Thể Lực Mỗi Tầng
                      </span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      ⚡ <strong>Buff Tháp Giữa:</strong> {toaSolution.hazardTower.towerBuff}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '18px' }}>
                  {/* Card 1: Team Tầng 3-4 Boss */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: '#f87171',
                        background: 'rgba(239, 68, 68, 0.15)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        TẦNG 3 VÀ 4 BOSS
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                        10/10 Thể Lực
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      🎯 <strong>{toaSolution.hazardTower.bossFloors.priorityStrategy}</strong>
                    </div>

                    {/* Team Members */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {toaSolution.hazardTower.bossFloors.assignedTeam?.characters.map((m, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: m?.iconColor || '#38bdf8',
                            flexShrink: 0
                          }}>
                            {m?.avatar && <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{m?.name}</div>
                            <div style={{ fontSize: '0.72rem', color: idx === 0 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                              {idx === 0 ? 'Main DPS' : idx === 1 ? 'Buffer' : 'Sustain'} • {m?.element}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedTeamForRotation(toaSolution.hazardTower.bossFloors.assignedTeam)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.35)',
                        color: '#f87171',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Swords size={14} /> Xem Rotation Tầng 3 - 4
                    </button>
                  </div>

                  {/* Card 2: Team Tầng 1-2 Khởi Đầu */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.45)',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        color: 'var(--accent-gold)',
                        background: 'rgba(250, 204, 21, 0.12)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}>
                        TẦNG 1 VÀ 2 KHỞI ĐẦU
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                        10/10 Thể Lực
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      🎯 <strong>{toaSolution.hazardTower.earlyFloors.priorityStrategy}</strong>
                    </div>

                    {/* Team Members */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                      {toaSolution.hazardTower.earlyFloors.assignedTeam?.characters.map((m, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: m?.iconColor || '#38bdf8',
                            flexShrink: 0
                          }}>
                            {m?.avatar && <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>{m?.name}</div>
                            <div style={{ fontSize: '0.72rem', color: idx === 0 ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                              {idx === 0 ? 'Main DPS' : idx === 1 ? 'Buffer' : 'Sustain'} • {m?.element}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedTeamForRotation(toaSolution.hazardTower.earlyFloors.assignedTeam)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: 'var(--text-primary)',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Swords size={14} /> Xem Rotation Tầng 1 - 2
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. HAI THÁP BÊN (THÁP TRÁI & THÁP PHẢI) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '22px' }}>
                
                {/* 2A. Resonant Tower */}
                <div className="glass-panel" style={{
                  padding: '22px',
                  borderLeft: '5px solid #f43f5e',
                  background: 'linear-gradient(145deg, rgba(18, 14, 24, 0.9) 0%, rgba(8, 10, 16, 0.98) 100%)'
                }}>
                  <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Shield size={20} color="#f43f5e" />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                        Resonant Tower
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      ⚡ <strong>Buff:</strong> {toaSolution.resonantTower.towerBuff}
                    </div>
                  </div>

                  {/* Team Phân Bổ */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '14px', borderRadius: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                        Đội Hình Chủ Lực Tháp Trái: {toaSolution.resonantTower.bossFloor.assignedTeam?.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Tầng 4 • 4 Thể Lực | Tầng 1-3 • 6 Thể Lực
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {toaSolution.resonantTower.bossFloor.assignedTeam?.characters.map((m, idx) => (
                        <div key={idx} style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '8px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 6px auto', overflow: 'hidden', background: m?.iconColor || '#38bdf8' }}>
                            {m?.avatar && <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                          </div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m?.name}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{idx === 0 ? 'Main DPS' : idx === 1 ? 'Buffer' : 'Sustain'}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTeamForRotation(toaSolution.resonantTower.bossFloor.assignedTeam)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                      color: '#f43f5e',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Swords size={14} /> Xem Rotation Tháp Trái
                  </button>
                </div>

                {/* 2B. Echoing Tower */}
                <div className="glass-panel" style={{
                  padding: '22px',
                  borderLeft: '5px solid #facc15',
                  background: 'linear-gradient(145deg, rgba(22, 20, 14, 0.9) 0%, rgba(8, 10, 16, 0.98) 100%)'
                }}>
                  <div style={{ marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={20} color="#facc15" />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                        Echoing Tower
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      ⚡ <strong>Buff:</strong> {toaSolution.echoingTower.towerBuff}
                    </div>
                  </div>

                  {/* Team Phân Bổ */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '14px', borderRadius: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                        Đội Hình Chủ Lực Tháp Phải: {toaSolution.echoingTower.bossFloor.assignedTeam?.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Tầng 4 • 4 Thể Lực | Tầng 1-3 • 6 Thể Lực
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {toaSolution.echoingTower.bossFloor.assignedTeam?.characters.map((m, idx) => (
                        <div key={idx} style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '8px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 6px auto', overflow: 'hidden', background: m?.iconColor || '#38bdf8' }}>
                            {m?.avatar && <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
                          </div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m?.name}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{idx === 0 ? 'Main DPS' : idx === 1 ? 'Buffer' : 'Sustain'}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTeamForRotation(toaSolution.echoingTower.bossFloor.assignedTeam)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      background: 'rgba(250, 204, 21, 0.15)',
                      border: '1px solid rgba(250, 204, 21, 0.35)',
                      color: 'var(--accent-gold)',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Swords size={14} /> Xem Rotation Tháp Phải
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PITY TRACKER */}
      {activeTab === 'pity' && (
        <div className="animate-fade-in-up">
          <PityTracker />
        </div>
      )}

      {/* TAB 4: WAVEPLATE TRACKER */}
      {activeTab === 'stamina' && (
        <div className="animate-fade-in-up">
          <WaveplateTracker />
        </div>
      )}

      {/* Rotation Modal Popup */}
      {selectedTeamForRotation && (
        <RotationModal
          team={selectedTeamForRotation}
          onClose={() => setSelectedTeamForRotation(null)}
        />
      )}
    </div>
  );
}
