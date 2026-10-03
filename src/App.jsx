import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RESONATORS, ELEMENT_ICONS } from './data/resonators';
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
  Star, 
  LayoutGrid,
  Calendar, 
  Award
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

  // Selected Team để mở Rotation Modal Game8
  const [selectedTeamForRotation, setSelectedTeamForRotation] = useState(null);

  // Filter nguyên tố (Tiếng Anh nguyên bản: All, Spectro, Havoc, Fusion, Aero, Electro, Glacio) & tìm kiếm
  const [elementFilter, setElementFilter] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ELEMENT_FILTER);
      if (saved) return saved;
    } catch (e) {}
    return 'All';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [cloudSyncStatus, setCloudSyncStatus] = useState('synced'); // 'syncing' | 'synced' | 'error'

  // Hàm trợ giúp đồng bộ an toàn lên Supabase Cloud (không bao giờ gây crash giao diện)
  const syncCloudState = useCallback(async (key, value) => {
    try {
      await supabase.from('user_state').upsert({
        key,
        value,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn(`Supabase cloud sync warning for ${key}:`, err);
    }
  }, []);

  // Lưu tab đang chọn vào LocalStorage và Supabase Cloud
  const handleTabChange = useCallback((newTab) => {
    setActiveTab(newTab);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_TAB, newTab);
    } catch (e) {}
    syncCloudState('active_tab', newTab);
  }, [syncCloudState]);

  // Lưu bộ lọc hệ nguyên tố vào LocalStorage và Supabase Cloud
  const handleElementFilterChange = useCallback((filter) => {
    setElementFilter(filter);
    try {
      localStorage.setItem(STORAGE_KEY_ELEMENT_FILTER, filter);
    } catch (e) {}
    syncCloudState('element_filter', filter);
  }, [syncCloudState]);

  // Tải toàn bộ cấu hình từ Supabase Cloud khi mở trang (chạy ngầm cập nhật)
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
      } catch (e) {
        console.warn('Cloud state load error:', e);
      }
    }
    loadCloudState();
  }, []);

  // Lưu danh sách nhân vật vào cả LocalStorage và Supabase Cloud
  const persistOwned = useCallback(async (list) => {
    setOwnedIds(list);
    setCloudSyncStatus('syncing');
    try {
      localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(list));
    } catch (e) {}

    try {
      await supabase.from('user_state').upsert({
        key: 'owned_characters',
        value: list,
        updated_at: new Date().toISOString()
      });
      setCloudSyncStatus('synced');
    } catch (err) {
      console.warn('Cloud sync error:', err);
      setCloudSyncStatus('error');
    }
  }, []);

  // Toggle sở hữu nhân vật (Phản hồi tức thì 60 FPS, an toàn tuyệt đối không bao giờ crash màn hình đen)
  const toggleCharacterOwnership = useCallback((id) => {
    setOwnedIds(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id];
      
      try {
        localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(updated));
      } catch (e) {}

      // Đồng bộ cloud bất đồng bộ bên ngoài render loop của React
      syncCloudState('owned_characters', updated);

      return updated;
    });
  }, [syncCloudState]);

  // Các thao tác chọn nhanh
  const selectAllResonators = () => {
    const allIds = RESONATORS.map(r => r.id);
    persistOwned(allIds);
  };

  const selectOnly5StarResonators = () => {
    const fiveStarIds = RESONATORS.filter(r => r.rarity === 5).map(r => r.id);
    persistOwned(fiveStarIds);
  };

  const selectOnly4StarResonators = () => {
    const fourStarIds = RESONATORS.filter(r => r.rarity === 4).map(r => r.id);
    persistOwned(fourStarIds);
  };

  const clearAllResonators = () => {
    persistOwned([]);
  };

  // Đề xuất các đội hình tối ưu hoàn toàn không trùng lặp nhân vật
  const suggestedTeams = useMemo(() => {
    try {
      return generateOptimalTeams(ownedIds);
    } catch (e) {
      console.error('Error generating optimal teams:', e);
      return [];
    }
  }, [ownedIds]);

  // Phân bổ ToA 3 tháp 12 tầng dựa trên các đội hình tối ưu
  const toaSolution = useMemo(() => {
    try {
      return solveTowerOfAdversity(ownedIds);
    } catch (e) {
      console.error('Error solving ToA:', e);
      return null;
    }
  }, [ownedIds]);

  // Bộ lọc danh sách nhân vật
  const filteredResonators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RESONATORS.filter(r => {
      const matchesElement = elementFilter === 'All' || r.element === elementFilter;
      const matchesQuery = q === '' || 
        r.name.toLowerCase().includes(q) ||
        r.weaponType.toLowerCase().includes(q) ||
        r.tags?.some(t => t.toLowerCase().includes(q));
      return matchesElement && matchesQuery;
    });
  }, [elementFilter, searchQuery]);

  // Danh sách các hệ nguyên tố WuWa chính thống (GIỮ NGUYÊN TIẾNG ANH THEO YÊU CẦU)
  const elementList = [
    { id: 'All', name: 'All Elements', icon: null },
    { id: 'Spectro', name: 'Spectro', icon: ELEMENT_ICONS.Spectro, color: '#facc15' },
    { id: 'Havoc', name: 'Havoc', icon: ELEMENT_ICONS.Havoc, color: '#f43f5e' },
    { id: 'Fusion', name: 'Fusion', icon: ELEMENT_ICONS.Fusion, color: '#f97316' },
    { id: 'Aero', name: 'Aero', icon: ELEMENT_ICONS.Aero, color: '#10b981' },
    { id: 'Electro', name: 'Electro', icon: ELEMENT_ICONS.Electro, color: '#a855f7' },
    { id: 'Glacio', name: 'Glacio', icon: ELEMENT_ICONS.Glacio, color: '#38bdf8' }
  ];

  return (
    <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '24px 20px 80px 20px' }}>
      {/* Top Header Bar - Mang phong cách Tacet Field WuWa Cao Cấp */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '26px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(250, 204, 21, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.4)'
          }}>
            <Swords size={26} color="#000" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ 
                fontSize: '1.65rem', 
                fontWeight: 900, 
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px', 
                background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                WUWA HUB
              </h1>
              <span style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '6px',
                background: 'rgba(243, 186, 47, 0.12)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(243, 186, 47, 0.35)',
                fontWeight: 800,
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-tactical)'
              }}>
                TACTICAL ASSISTANT
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Đề Xuất Đội Hình Không Trùng Lặp • Combo Rotations Game8 • Tháp ToA 12 Tầng
            </p>
          </div>
        </div>

        {/* Cloud Sync Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.76rem',
          color: cloudSyncStatus === 'synced' ? 'var(--accent-green)' : 'var(--accent-gold)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: cloudSyncStatus === 'synced' ? 'var(--accent-green)' : 'var(--accent-gold)',
            boxShadow: cloudSyncStatus === 'synced' ? '0 0 8px rgba(52, 211, 153, 0.6)' : 'none'
          }} />
          <span>{cloudSyncStatus === 'synced' ? 'Supabase Sync Active' : 'Đang đồng bộ...'}</span>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <nav style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '28px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'builder', label: 'Tự Động Xếp Đội', icon: <Swords size={18} /> },
          { id: 'toa', label: 'Tower of Adversity (ToA)', icon: <Layers size={18} /> },
          { id: 'pity', label: 'Pity Tracker (Lịch Sử Roll)', icon: <Compass size={18} /> },
          { id: 'stamina', label: 'Waveplate & Boss Tuần', icon: <Zap size={18} /> }
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
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                background: isActive ? 'linear-gradient(135deg, #f3ba2f 0%, #d97706 100%)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#05080f' : 'var(--text-secondary)',
                border: isActive ? '1px solid #f3ba2f' : '1px solid var(--border-color)',
                boxShadow: isActive ? '0 4px 20px rgba(243, 186, 47, 0.35)' : 'none',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Section: Kho Nhân Vật (Roster Selection) */}
          <section className="glass-panel" style={{ padding: '26px' }}>
            {/* Header kho nhân vật */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                  <Users size={22} color="var(--accent-cyan)" />
                  Kho Nhân Vật Sở Hữu ({ownedIds.length}/{RESONATORS.length})
                </h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Đã tự động lưu vào tài khoản Supabase của bạn
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Nhấn chọn các Resonator bạn đang có. Hệ thống sẽ lọc và ghép các đội hình mạnh nhất, <strong>đảm bảo không trùng bất kỳ nhân vật nào</strong> giữa các đội gợi ý.
              </p>
            </div>

            {/* Toolbar: Tìm kiếm & Thao tác nhanh */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '18px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              {/* Search Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.45)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 14px',
                minWidth: '260px'
              }}>
                <Search size={16} color="var(--accent-gold)" />
                <input 
                  type="text" 
                  placeholder="Tìm tên, vũ khí, vai trò..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Bulk Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={selectAllResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Chọn tất cả ({RESONATORS.length})
                </button>
                <button 
                  onClick={selectOnly5StarResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(250, 204, 21, 0.12)',
                    border: '1px solid rgba(250, 204, 21, 0.35)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Star size={13} fill="var(--accent-gold)" /> Chỉ chọn 5★
                </button>
                <button 
                  onClick={selectOnly4StarResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(192, 132, 252, 0.12)',
                    border: '1px solid rgba(192, 132, 252, 0.35)',
                    color: 'var(--accent-purple)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Chỉ chọn 4★
                </button>
                <button 
                  onClick={clearAllResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Bỏ chọn tất cả
                </button>
              </div>
            </div>

            {/* Element Filter Tabs (Giữ nguyên tên tiếng Anh) */}
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              marginBottom: '20px'
            }}>
              {elementList.map(el => {
                const isActive = elementFilter === el.id;
                return (
                  <button
                    key={el.id}
                    onClick={() => handleElementFilterChange(el.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      background: isActive 
                        ? (el.id === 'All' ? 'rgba(255, 255, 255, 0.16)' : `${el.color}25`)
                        : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      border: '1px solid',
                      borderColor: isActive 
                        ? (el.id === 'All' ? 'rgba(255, 255, 255, 0.4)' : el.color) 
                        : 'rgba(255, 255, 255, 0.06)',
                      boxShadow: isActive && el.id !== 'All' ? `0 0 12px ${el.color}40` : 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.18s ease'
                    }}
                  >
                    {el.icon ? (
                      <img 
                        src={el.icon} 
                        alt={el.name} 
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }} 
                      />
                    ) : (
                      <LayoutGrid size={18} />
                    )}
                    <span>{el.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Resonator Roster Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px'
            }}>
              {filteredResonators.map((char) => {
                const isOwned = ownedIds.includes(char.id);
                const elementIconUrl = ELEMENT_ICONS[char.element];

                return (
                  <div
                    key={char.id}
                    onClick={() => toggleCharacterOwnership(char.id)}
                    className={`resonator-card ${isOwned ? 'selected' : 'unselected'}`}
                    style={{
                      padding: '8px',
                      height: '185px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* Top Row: Rarity Star Badge & Element Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                      <span className={char.rarity === 5 ? 'star-badge-5' : 'star-badge-4'} style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}>
                        <Star size={9} fill="currentColor" color="none" />
                        {char.rarity}★
                      </span>

                      {/* Element Icon PNG */}
                      {elementIconUrl && (
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(0, 0, 0, 0.65)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}>
                          <img 
                            src={elementIconUrl} 
                            alt={char.element} 
                            style={{ width: '16px', height: '16px', objectFit: 'contain' }} 
                          />
                        </div>
                      )}
                    </div>

                    {/* Character Real Portrait Artwork */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '92px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: '6px',
                      margin: '4px 0'
                    }}>
                      {char.avatar ? (
                        <img
                          src={char.avatar}
                          alt={char.name}
                          loading="lazy"
                          style={{
                            width: '84px',
                            height: '84px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: `2px solid ${isOwned ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.15)'}`,
                            filter: isOwned ? 'none' : 'grayscale(30%)',
                            boxShadow: isOwned ? '0 0 12px rgba(243, 186, 47, 0.3)' : 'none'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          background: char.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '1.4rem',
                          color: '#000'
                        }}>
                          {char.name[0]}
                        </div>
                      )}

                      {/* Checkmark Tag */}
                      {isOwned && (
                        <div style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '12px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--accent-gold)',
                          color: '#000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 900,
                          boxShadow: '0 0 8px rgba(0, 0, 0, 0.8)'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>

                    {/* Character Name & Class */}
                    <div style={{ textAlign: 'center', zIndex: 2 }}>
                      <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isOwned ? '#fff' : 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {char.name}
                      </div>
                      <div style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        marginTop: '2px'
                      }}>
                        {char.weaponType}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Đề Xuất Đội Hình Tối Ưu (KHÔNG TRÙNG LẶP NHÂN VẬT) */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                  <Sparkles size={22} color="var(--accent-gold)" />
                  Đội Hình Đề Xuất Tối Ưu ({suggestedTeams.length} đội - Hoàn toàn không trùng nhân vật)
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Mỗi nhân vật chỉ thuộc về 1 đội hình duy nhất. Bấm vào thẻ để xem <strong>Hướng dẫn Combo Rotation (Game8)</strong>.
                </p>
              </div>

              {suggestedTeams.length > 0 && (
                <span style={{
                  fontSize: '0.78rem',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(52, 211, 153, 0.12)',
                  color: 'var(--accent-green)',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  fontWeight: 700
                }}>
                  Đã khóa {suggestedTeams.length * 3} nhân vật tối ưu
                </span>
              )}
            </div>

            {suggestedTeams.length === 0 ? (
              <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Chưa đủ nhân vật để ghép thành 1 đội hình 3 người hoàn chỉnh. Hãy tick chọn thêm nhân vật ở kho bên trên!
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '20px'
              }}>
                {suggestedTeams.map((team, tIdx) => {
                  const safeCharacters = Array.isArray(team?.characters) && team.characters.length > 0
                    ? team.characters
                    : (team?.members || []).map(id => RESONATORS.find(r => r.id === id)).filter(Boolean);

                  return (
                    <div
                      key={team?.id || tIdx}
                      className="glass-panel glass-panel-hover"
                      style={{
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderLeft: `4px solid ${team.matchScore >= 95 ? 'var(--accent-gold)' : 'var(--accent-cyan)'}`,
                        background: 'linear-gradient(145deg, rgba(16, 22, 33, 0.85) 0%, rgba(10, 14, 22, 0.95) 100%)'
                      }}
                    >
                      <div>
                        {/* Team Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: 'var(--accent-gold)'
                              }}>
                                #{tIdx + 1}
                              </span>
                              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                                {team?.name || 'Đội Hình Đề Xuất'}
                              </h3>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                              <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.12)', color: 'var(--accent-gold)', fontWeight: 700 }}>
                                {team?.type || 'Hypercarry'}
                              </span>
                              {team?.tier && (
                                <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontWeight: 800 }}>
                                  {team.tier} Meta
                                </span>
                              )}
                            </div>
                          </div>

                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-green)', padding: '4px 10px', borderRadius: '6px', background: 'rgba(52, 211, 153, 0.12)' }}>
                            {team?.matchScore || 85}% Meta Score
                          </span>
                        </div>

                        {/* 3 Members Display with Real Avatars */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '10px',
                          marginBottom: '16px',
                          background: 'rgba(0, 0, 0, 0.35)',
                          padding: '14px 10px',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                          {safeCharacters.map((m, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                              <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                margin: '0 auto 6px auto',
                                overflow: 'hidden',
                                border: `2px solid ${idx === 0 ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.2)'}`,
                                background: m?.iconColor || '#38bdf8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                {m?.avatar ? (
                                  <img
                                    src={m.avatar}
                                    alt={m.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                  />
                                ) : (
                                  <span style={{ fontWeight: 'bold', color: '#000' }}>{m?.name?.[0]}</span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {m?.name}
                              </div>
                              <div style={{ fontSize: '0.68rem', color: idx === 0 ? 'var(--accent-gold)' : 'var(--text-muted)', fontWeight: 600 }}>
                                {idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub-DPS/Buffer' : 'Sustain/Healer'}
                              </div>
                            </div>
                          ))}
                        </div>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
                          {team?.description}
                        </p>
                      </div>

                      {/* View Rotation Action Button */}
                      <button
                        onClick={() => setSelectedTeamForRotation({ ...team, characters: safeCharacters })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          background: 'rgba(250, 204, 21, 0.12)',
                          border: '1px solid rgba(250, 204, 21, 0.35)',
                          color: 'var(--accent-gold)',
                          fontWeight: 800,
                          fontSize: '0.88rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.2)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(250, 204, 21, 0.12)'; }}
                      >
                        <Swords size={18} /> Xem Hướng Dẫn Combo (Game8)
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: TOWER OF ADVERSITY (TOA) SOLVER - ĐẦY ĐỦ 12 TẦNG (4 TẦNG X 3 THÁP) */}
      {activeTab === 'toa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {/* Header ToA Tinh Gọn (Chỉ ghi Mùa và Khoảng Thời Gian theo yêu cầu) */}
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
              background: 'rgba(52, 211, 153, 0.12)',
              color: 'var(--accent-green)',
              fontWeight: 700,
              border: '1px solid rgba(52, 211, 153, 0.3)'
            }}>
              Phân bổ 3 team độc lập cho 12 tầng tháp
            </div>
          </div>

          {!toaSolution ? (
            <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Layers size={44} style={{ margin: '0 auto 16px auto', opacity: 0.4, color: 'var(--accent-gold)' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Cần tối thiểu 9 nhân vật đã chọn để phân bổ cho 3 tháp!
              </p>
              <p style={{ fontSize: '0.86rem', maxWidth: '500px', margin: '0 auto' }}>
                Hiện tại bạn đã chọn {ownedIds.length}/9 nhân vật. Hãy quay lại tab "Tự Động Xếp Đội" và tick thêm nhân vật để thuật toán phân phối 12 tầng ToA.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {toaSolution.towers.map((tower) => {
                const isHazard = tower.id === 'hazard';
                const isResonant = tower.id === 'resonant';
                const towerColor = isHazard ? '#ef4444' : isResonant ? '#f43f5e' : '#facc15';

                return (
                  <div
                    key={tower.id}
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      borderLeft: `5px solid ${towerColor}`,
                      background: 'linear-gradient(145deg, rgba(14, 20, 31, 0.9) 0%, rgba(8, 12, 20, 0.98) 100%)'
                    }}
                  >
                    {/* Tower Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '18px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                            {tower.name}
                          </h3>
                          {tower.elementAdvantage && (
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              color: 'var(--accent-green)',
                              background: 'rgba(52, 211, 153, 0.15)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              border: '1px solid rgba(52, 211, 153, 0.3)'
                            }}>
                              ✓ Đạt Ưu Thế Hệ
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          ⚡ Buff Mùa 3.7 (Ưu tiên: <strong style={{ color: towerColor }}>{tower.recommendedElement}</strong>): {tower.buff}
                        </div>
                      </div>

                      {/* Nút Xem Combo ToA */}
                      <button
                        onClick={() => setSelectedTeamForRotation(tower.team)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '8px',
                          background: 'rgba(250, 204, 21, 0.12)',
                          border: '1px solid rgba(250, 204, 21, 0.35)',
                          color: 'var(--accent-gold)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Swords size={16} /> Xem Rotation Tháp Này
                      </button>
                    </div>

                    {/* Đội Hình Phân Bổ Cho Tháp Này */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Đội Hình Chủ Lực Phân Bổ: <span style={{ color: '#fff' }}>{tower.team.name}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Sử dụng cho cả 4 tầng của tháp này
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        {tower.team.characters.map((m, idx) => (
                          <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}>
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              overflow: 'hidden',
                              border: `2px solid ${idx === 0 ? towerColor : 'rgba(255, 255, 255, 0.2)'}`,
                              background: m?.iconColor || '#38bdf8',
                              flexShrink: 0
                            }}>
                              {m?.avatar ? (
                                <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : (
                                <span style={{ fontWeight: 'bold', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{m?.name?.[0]}</span>
                              )}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>{m?.name}</div>
                              <div style={{ fontSize: '0.72rem', color: idx === 0 ? towerColor : 'var(--text-muted)', fontWeight: 600 }}>
                                {idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub-DPS/Buffer' : 'Sustain/Healer'} • {m?.element}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Danh Sách 4 Tầng Của Tháp Này (Đủ 4 tầng theo đúng yêu cầu) */}
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={16} color="var(--accent-gold)" />
                        Tiến Trình 4 Tầng Của Tháp ({tower.floors.length} Tầng)
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                        {tower.floors.map((floor) => (
                          <div
                            key={floor.floor}
                            style={{
                              background: 'rgba(0, 0, 0, 0.45)',
                              padding: '14px',
                              borderRadius: '10px',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  color: floor.floor === 4 ? towerColor : 'var(--accent-gold)',
                                  background: 'rgba(255, 255, 255, 0.06)',
                                  padding: '2px 8px',
                                  borderRadius: '4px'
                                }}>
                                  {floor.name}
                                </span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                  Tiêu hao: {floor.vigorCost} Vigor
                                </span>
                              </div>
                              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                                Quái / Boss: {floor.boss}
                              </div>
                            </div>

                            <div style={{
                              marginTop: '12px',
                              paddingTop: '8px',
                              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.75rem',
                              color: 'var(--text-secondary)'
                            }}>
                              <span>Độ khó: <strong style={{ color: floor.floor === 4 ? '#f87171' : '#34d399' }}>{floor.difficulty}</strong></span>
                              <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>✓ Team Sẵn Sàng</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PITY TRACKER */}
      {activeTab === 'pity' && (
        <PityTracker />
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
