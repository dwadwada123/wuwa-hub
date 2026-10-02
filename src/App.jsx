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
  Check, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  Search,
  Star,
  RotateCcw,
  Flame,
  LayoutGrid
} from 'lucide-react';

const STORAGE_KEY_OWNED = 'wuwa_owned_resonators';

// Danh sách mặc định ban đầu nếu người dùng mở web lần đầu tiên
const DEFAULT_OWNED = [
  'hsin', 'camellya', 'shorekeeper', 'jinhsi', 'changli', 
  'xiangli_yao', 'yinlin', 'zhezhi', 'verina', 'sanhua', 'mortefi', 'yuanwu'
];

export default function App() {
  // Navigation Tabs: 'builder' | 'toa' | 'pity' | 'stamina'
  const [activeTab, setActiveTab] = useState('builder');

  // Kho nhân vật sở hữu (Tải tức thì từ LocalStorage để 0ms hiển thị, không bị reset mock khi refresh)
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

  // Filter nguyên tố & tìm kiếm ở kho nhân vật
  const [elementFilter, setElementFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Tải danh sách sở hữu từ Supabase Cloud khi mở trang (chạy ngầm cập nhật)
  useEffect(() => {
    async function loadOwnedFromCloud() {
      try {
        const { data, error } = await supabase
          .from('user_state')
          .select('value')
          .eq('key', 'owned_characters')
          .single();

        if (data && Array.isArray(data.value)) {
          setOwnedIds(data.value);
          localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(data.value));
        }
      } catch (e) {
        // LocalStorage đã giữ dữ liệu an toàn
      }
    }
    loadOwnedFromCloud();
  }, []);

  // Lưu danh sách nhân vật vào cả LocalStorage và Supabase Cloud
  const persistOwned = useCallback((list) => {
    setOwnedIds(list);
    try {
      localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(list));
    } catch (e) {}

    // Lưu ngầm lên cloud
    supabase.from('user_state').upsert({
      key: 'owned_characters',
      value: list,
      updated_at: new Date().toISOString()
    }).catch(err => console.warn('Cloud sync:', err));
  }, []);

  // Toggle sở hữu nhân vật (Phản hồi tức thì 60 FPS)
  const toggleCharacterOwnership = useCallback((id) => {
    setOwnedIds(prev => {
      const updated = prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id];
      
      try {
        localStorage.setItem(STORAGE_KEY_OWNED, JSON.stringify(updated));
      } catch (e) {}

      supabase.from('user_state').upsert({
        key: 'owned_characters',
        value: updated,
        updated_at: new Date().toISOString()
      }).catch(() => {});

      return updated;
    });
  }, []);

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

  // Tối ưu hoá hiệu năng với useMemo: Loại bỏ hoàn toàn hiện tượng đơ lag
  const suggestedTeams = useMemo(() => {
    return generateOptimalTeams(ownedIds);
  }, [ownedIds]);

  const toaSolution = useMemo(() => {
    return solveTowerOfAdversity(ownedIds);
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

  // Danh sách các hệ nguyên tố WuWa chính thống
  const elementList = [
    { id: 'All', name: 'Tất Cả', icon: null },
    { id: 'Spectro', name: 'Quang', icon: ELEMENT_ICONS.Spectro, color: '#facc15' },
    { id: 'Havoc', name: 'Hủy Diệt', icon: ELEMENT_ICONS.Havoc, color: '#e11d48' },
    { id: 'Fusion', name: 'Nhiệt', icon: ELEMENT_ICONS.Fusion, color: '#f97316' },
    { id: 'Aero', name: 'Khí', icon: ELEMENT_ICONS.Aero, color: '#10b981' },
    { id: 'Electro', name: 'Lôi', icon: ELEMENT_ICONS.Electro, color: '#a855f7' },
    { id: 'Glacio', name: 'Băng', icon: ELEMENT_ICONS.Glacio, color: '#38bdf8' }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 16px 80px 16px' }}>
      {/* Top Header Bar - Mang phong cách Tacet Field WuWa */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #facc15, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(250, 204, 21, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Swords size={26} color="#000" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#fff' }}>
                WUWA HUB
              </h1>
              <span style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(243, 186, 47, 0.15)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(243, 186, 47, 0.3)',
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}>
                v3.7 HSIN & SUOMING
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Trợ Lý Xếp Đội Tự Động • Game8 Combo Rotations • Tháp ToA Mùa 3.7
            </p>
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
          { id: 'toa', label: 'Tower of Adversity (Mùa 3.7)', icon: <Layers size={18} /> },
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
              padding: '11px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: activeTab === tab.id ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
              border: activeTab === tab.id ? '1px solid var(--accent-gold)' : '1px solid var(--border-color)',
              boxShadow: activeTab === tab.id ? '0 0 16px rgba(243, 186, 47, 0.35)' : 'none',
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
            {/* Header kho nhân vật */}
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                <Users size={22} color="var(--accent-cyan)" />
                Kho Nhân Vật Của Bạn ({ownedIds.length}/{RESONATORS.length})
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Bấm vào thẻ nhân vật để chọn những Resonator bạn đang sở hữu. Hệ thống sẽ tự động ghép các đội hình tối ưu nhất.
              </p>
            </div>

            {/* Thanh Công Cụ Đã Tổ Chức Lại (Toolbar): Hàng 1 gồm Tìm kiếm & Nút Thao Tác Nhanh */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px',
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

              {/* Bulk Action Buttons (Sắp xếp đẹp mắt, rõ ràng) */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={selectAllResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Chọn tất cả ({RESONATORS.length})
                </button>
                <button 
                  onClick={selectOnly5StarResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
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
                  <Star size={13} fill="var(--accent-gold)" /> Chỉ chọn 5★ (23)
                </button>
                <button 
                  onClick={selectOnly4StarResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    background: 'rgba(192, 132, 252, 0.12)',
                    border: '1px solid rgba(192, 132, 252, 0.35)',
                    color: 'var(--accent-purple)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Chỉ chọn 4★ (13)
                </button>
                <button 
                  onClick={clearAllResonators}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
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

            {/* Hàng 2: Element Filter Tabs với Icon Game WuWa Chính Thống */}
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
                    onClick={() => setElementFilter(el.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      background: isActive 
                        ? (el.id === 'All' ? 'rgba(255, 255, 255, 0.15)' : `${el.color}25`)
                        : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      border: '1px solid',
                      borderColor: isActive 
                        ? (el.id === 'All' ? 'rgba(255, 255, 255, 0.4)' : el.color) 
                        : 'rgba(255, 255, 255, 0.06)',
                      boxShadow: isActive && el.id !== 'All' ? `0 0 12px ${el.color}40` : 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
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

            {/* Resonator Roster Grid - Hiển Thị Ảnh Chân Dung Nhân Vật Thật (Không Dùng Chữ Cái) */}
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
                          background: 'rgba(0, 0, 0, 0.6)',
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

          {/* Section: Đề Xuất Đội Hình Tối Ưu (Suggested Teams) */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                  <Sparkles size={22} color="var(--accent-gold)" />
                  Đội Hình Đề Xuất Tối Ưu ({suggestedTeams.length} đội khả thi)
                </h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Bấm vào bất kỳ đội hình nào để xem <strong>Hướng dẫn Combo từng bước (Game8 format)</strong>
                </p>
              </div>
            </div>

            {suggestedTeams.length === 0 ? (
              <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Chưa tìm thấy đội hình phù hợp từ kho nhân vật đã chọn. Hãy chọn thêm nhân vật ở trên để mở khóa các đội hình tối ưu!
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '18px'
              }}>
                {suggestedTeams.map((team) => (
                  <div
                    key={team.id}
                    className="glass-panel glass-panel-hover"
                    style={{
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderLeft: `4px solid ${team.matchScore >= 95 ? 'var(--accent-gold)' : 'var(--accent-cyan)'}`,
                      background: 'linear-gradient(145deg, rgba(16, 22, 33, 0.8) 0%, rgba(10, 14, 22, 0.9) 100%)'
                    }}
                  >
                    <div>
                      {/* Team Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                            {team.name}
                          </h3>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.12)', color: 'var(--accent-gold)', fontWeight: 700 }}>
                              {team.type}
                            </span>
                            {team.tier && (
                              <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontWeight: 800 }}>
                                {team.tier} Meta
                              </span>
                            )}
                          </div>
                        </div>

                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-green)', padding: '3px 8px', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.12)' }}>
                          {team.matchScore}% Match
                        </span>
                      </div>

                      {/* 3 Members Display with Real Avatars */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        marginBottom: '16px',
                        background: 'rgba(0, 0, 0, 0.35)',
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>
                        {team.characters.map((m, idx) => (
                          <div key={idx} style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
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

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
                        {team.description}
                      </p>
                    </div>

                    {/* View Rotation Action Button */}
                    <button
                      onClick={() => setSelectedTeamForRotation(team)}
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
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* TAB 2: TOWER OF ADVERSITY SOLVER (MÙA 3.7 CẬP NHẬT MỚI NHẤT) */}
      {activeTab === 'toa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* TOA Season Banner */}
          <div className="glass-panel" style={{
            padding: '24px',
            border: '1px solid rgba(243, 186, 47, 0.3)',
            background: 'linear-gradient(135deg, rgba(243, 186, 47, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                <Layers size={24} color="var(--accent-gold)" />
                TOWER OF ADVERSITY • MÙA 3.7 (HIỆN TẠI)
              </h2>
              <span style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(52, 211, 153, 0.15)',
                color: 'var(--accent-green)',
                fontWeight: 800,
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}>
                Thuật Toán Ưu Tiên Khắc Hệ Mùa 3.7
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Hệ thống tự động phân tích kho nhân vật của bạn và phân bổ thành <strong>3 đội hình hoàn toàn độc lập (9 nhân vật không trùng nhau)</strong>, ưu tiên chính xác theo cơ chế buff nguyên tố của mùa tháp 3.7: <strong>Hazard (Electro/Unison)</strong>, <strong>Resonant (Havoc/Basic ATK)</strong>, và <strong>Echoing (Spectro/Resonance Skill)</strong>.
            </p>
          </div>

          {!toaSolution ? (
            <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Layers size={40} style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Cần tối thiểu 9 nhân vật đã chọn để tạo 3 đội hình độc lập!
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Hiện tại bạn đã chọn {ownedIds.length}/9 nhân vật cần thiết. Hãy quay lại tab "Tự Động Xếp Đội" và tick thêm nhân vật.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
              {toaSolution.towers.map((tower, tIdx) => {
                const isHazard = tower.id === 'hazard';
                const isResonant = tower.id === 'resonant';
                const borderColor = isHazard ? '#ef4444' : isResonant ? '#e11d48' : '#facc15';
                const badgeColor = isHazard ? 'rgba(239, 68, 68, 0.15)' : isResonant ? 'rgba(225, 29, 72, 0.15)' : 'rgba(250, 204, 21, 0.15)';
                const badgeTextColor = isHazard ? '#f87171' : isResonant ? '#fb7185' : 'var(--accent-gold)';

                return (
                  <div
                    key={tower.id}
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      borderTop: `4px solid ${borderColor}`,
                      background: 'linear-gradient(145deg, rgba(16, 22, 33, 0.85) 0%, rgba(10, 14, 22, 0.95) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Tower Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: badgeTextColor,
                          background: badgeColor,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {tower.floor} • Boss: {tower.boss}
                        </span>

                        {tower.elementAdvantage && (
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: 'var(--accent-green)',
                            background: 'rgba(52, 211, 153, 0.15)',
                            padding: '3px 8px',
                            borderRadius: '4px'
                          }}>
                            ✓ Ưu Thế Hệ
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                        {tower.name}
                      </h3>

                      {/* Season 3.7 Buff Badge */}
                      <div style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        marginBottom: '16px',
                        fontSize: '0.8rem',
                        lineHeight: 1.4
                      }}>
                        <div style={{ color: badgeTextColor, fontWeight: 700, marginBottom: '2px' }}>
                          ⚡ Buff Mùa 3.7 (Ưu tiên: {tower.recommendedElement}):
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          {tower.buff}
                        </div>
                      </div>

                      {/* Team Display */}
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                          Đội Hình Phân Bổ: <span style={{ color: '#fff' }}>{tower.team.name}</span>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '10px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          padding: '12px 8px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                          {tower.team.characters.map((m, idx) => (
                            <div key={idx} style={{ textAlign: 'center' }}>
                              <div style={{
                                width: '46px',
                                height: '46px',
                                borderRadius: '50%',
                                margin: '0 auto 6px auto',
                                overflow: 'hidden',
                                border: `2px solid ${idx === 0 ? borderColor : 'rgba(255, 255, 255, 0.2)'}`,
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
                              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                {idx === 0 ? 'Main DPS' : idx === 1 ? 'Buffer' : 'Sustain'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTeamForRotation(tower.team)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                    >
                      <Swords size={16} /> Xem Combo ToA
                    </button>
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
