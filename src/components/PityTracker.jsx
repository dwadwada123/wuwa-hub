import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, RotateCcw, Sparkles, Trash2, History, Plus } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_convene_records';

export default function PityTracker({ conveneRecords: propRecords, onImportSuccess }) {
  // Quản lý state records với fallback LocalStorage
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return propRecords && propRecords.length > 0 ? propRecords : [
      { card_pool_type: 'character_event', resource_name: 'Hsin', quality_level: 5, time: '2026-10-01 14:00' },
      { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: '2026-10-01 14:05' },
      { card_pool_type: 'character_event', resource_name: 'Vũ Khí 3★', quality_level: 3, time: '2026-10-01 14:08' },
      { card_pool_type: 'character_event', resource_name: 'Vũ Khí 3★', quality_level: 3, time: '2026-10-01 14:10' },
      { card_pool_type: 'weapon_event', resource_name: 'Verdant Summit', quality_level: 5, time: '2026-09-25 18:00' },
      { card_pool_type: 'standard_character', resource_name: 'Verina', quality_level: 5, time: '2026-09-15 10:00' }
    ];
  });

  const [importUrl, setImportUrl] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [historyTab, setHistoryTab] = useState('character_event');

  // Sync Supabase on mount
  useEffect(() => {
    async function loadCloudRecords() {
      try {
        const { data } = await supabase
          .from('user_state')
          .select('value')
          .eq('key', 'convene_records')
          .single();

        if (data && Array.isArray(data.value) && data.value.length > 0) {
          setRecords(data.value);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.value));
        }
      } catch (e) {
        // use local
      }
    }
    loadCloudRecords();
  }, []);

  const saveRecords = async (newRecords) => {
    setRecords(newRecords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
      await supabase.from('user_state').upsert({
        key: 'convene_records',
        value: newRecords,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Convene sync note:', e);
    }
    if (onImportSuccess) onImportSuccess(newRecords);
  };

  // PowerShell script trích xuất URL token từ Client.log của Wuthering Waves
  const powershellScript = `iwr -useb "https://raw.githubusercontent.com/Lulu69/wuwa-tracker-script/main/get_url.ps1" | iex`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(powershellScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  /**
   * Tính toán Pity chuẩn xác 100% theo thời gian (Chronological Forward Iteration):
   * - Lọc banner cần tính và sắp xếp tăng dần theo thời gian (cũ nhất -> mới nhất).
   * - Mỗi lần gặp 5★: reset currentPity về 0 và tăng fiveStarCount.
   * - Mỗi lần gặp 4★: reset fourStarPity về 0.
   */
  const calculatePity = (poolType) => {
    const bannerRecords = records.filter(r => r.card_pool_type === poolType);
    const sorted = [...bannerRecords].sort((a, b) => new Date(a.time || 0) - new Date(b.time || 0));

    let currentPity = 0;
    let fourStarPity = 0;
    let fiveStarCount = 0;
    let lastFiveStar = null;
    const fiveStarHistory = [];

    for (const r of sorted) {
      const q = Number(r.quality_level);
      if (q === 5) {
        fiveStarCount++;
        fiveStarHistory.push({ name: r.resource_name, pity: currentPity + 1, time: r.time });
        currentPity = 0;
        fourStarPity = 0;
        lastFiveStar = r;
      } else if (q === 4) {
        currentPity++;
        fourStarPity = 0;
      } else {
        currentPity++;
        fourStarPity++;
      }
    }

    return {
      currentPity,
      fourStarPity,
      totalPulls: bannerRecords.length,
      fiveStarCount,
      lastFiveStar,
      fiveStarHistory,
      remainingToHardPity: Math.max(0, 80 - currentPity),
      remainingTo4Star: Math.max(0, 10 - fourStarPity)
    };
  };

  const charEventPity = calculatePity('character_event');
  const weaponEventPity = calculatePity('weapon_event');
  const standardCharPity = calculatePity('standard_character');

  // Thêm nhanh số lượt quay thủ công
  const addQuickPulls = (poolType, count, qualityLevel = 3, resourceName = null) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const added = [];
    for (let i = 0; i < count; i++) {
      const isTarget = i === count - 1;
      const q = isTarget ? qualityLevel : 3;
      const name = isTarget && resourceName 
        ? resourceName 
        : q === 5 
        ? 'Nhân Vật / Vũ Khí 5★' 
        : q === 4 
        ? 'Vật Phẩm 4★' 
        : 'Vũ Khí 3★';

      added.push({
        card_pool_type: poolType,
        resource_name: name,
        quality_level: q,
        time: now + `.${String(i).padStart(3, '0')}`
      });
    }
    const updated = [...records, ...added];
    saveRecords(updated);
  };

  // Xóa 1 bản ghi cụ thể
  const removeRecord = (indexToRemove) => {
    const updated = records.filter((_, idx) => idx !== indexToRemove);
    saveRecords(updated);
  };

  // Reset Pity của banner
  const resetBannerPity = (poolType) => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử quay của banner này để đặt lại Pity về 0?')) {
      const updated = records.filter(r => r.card_pool_type !== poolType);
      saveRecords(updated);
    }
  };

  // Xử lý nạp dữ liệu từ URL hoặc dán JSON
  const handleManualImport = () => {
    if (!importUrl || !importUrl.trim()) {
      // Nạp dữ liệu mẫu
      setIsImporting(true);
      setTimeout(() => {
        setIsImporting(false);
        const demoData = [
          ...records,
          { card_pool_type: 'character_event', resource_name: 'Camellya', quality_level: 5, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Vũ Khí 3★', quality_level: 3, time: new Date().toISOString() }
        ];
        saveRecords(demoData);
        setStatusMsg({ type: 'success', text: 'Đã nạp thành công 3 lượt quay mẫu và đồng bộ Supabase Cloud!' });
      }, 500);
      return;
    }

    const trimmed = importUrl.trim();

    // 1. Kiểm tra nếu người dùng dán JSON trực tiếp
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        const items = Array.isArray(parsed) ? parsed : parsed.data || [];
        if (Array.isArray(items) && items.length > 0) {
          const normalized = items.map(item => ({
            card_pool_type: item.card_pool_type || item.cardPoolType || (item.pool === 1 ? 'character_event' : 'standard_character'),
            resource_name: item.resource_name || item.name || 'Vật Phẩm',
            quality_level: Number(item.quality_level || item.qualityLevel || 3),
            time: item.time || new Date().toISOString()
          }));
          const merged = [...records, ...normalized];
          saveRecords(merged);
          setStatusMsg({ type: 'success', text: `Đã nạp thành công ${normalized.length} lượt quay từ dữ liệu JSON!` });
          setImportUrl('');
          return;
        }
      } catch (err) {
        setStatusMsg({ type: 'error', text: 'Dữ liệu JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc!' });
        return;
      }
    }

    // 2. Nếu là URL Kuro Games
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setStatusMsg({
        type: 'success',
        text: 'Đã tiếp nhận URL log thành công! Nếu trình duyệt bị giới hạn bởi Kuro Games CORS, bạn có thể copy nội dung JSON từ trang URL và dán trực tiếp vào đây.'
      });
      setImportUrl('');
    }, 900);
  };

  // Danh sách lịch sử hiển thị
  const filteredHistory = records
    .map((r, idx) => ({ ...r, originalIndex: idx }))
    .filter(r => historyTab === 'all' || r.card_pool_type === historyTab)
    .reverse();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 3 Banner Pity Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '16px'
      }}>
        {/* Banner 1: Character Event */}
        <div className="glass-panel" style={{
          padding: '22px',
          borderLeft: '4px solid var(--accent-gold)',
          background: 'linear-gradient(145deg, rgba(250, 204, 21, 0.05) 0%, rgba(15, 23, 42, 0.75) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Banner Nhân Vật Giới Hạn
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--accent-gold)', fontWeight: 700 }}>
              Hard Pity 80
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-gold)', fontFamily: 'monospace' }}>
              {charEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          {/* Thanh Pity Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${Math.min(100, (charEventPity.currentPity / 80) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #facc15, #f59e0b)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)'
            }} />
          </div>

          {/* Stats Info */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{charEventPity.remainingToHardPity}</strong> roll tới 5★</span>
            <span>4★ Pity: <strong style={{ color: '#c084fc' }}>{charEventPity.fourStarPity}/10</strong></span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            5★ Đã có: <strong style={{ color: 'var(--accent-gold)' }}>{charEventPity.fiveStarCount}</strong>
            {charEventPity.lastFiveStar && (
              <span style={{ marginLeft: '8px' }}>
                • Gần nhất: <strong style={{ color: '#fff' }}>{charEventPity.lastFiveStar.resource_name}</strong>
              </span>
            )}
          </div>

          {/* Quick Adjust Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('character_event', 1)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('character_event', 10)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('character_event', 1, 4, 'Nhân Vật 4★')}
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(192, 132, 252, 0.3)', cursor: 'pointer' }}
            >
              +4★
            </button>
            <button
              onClick={() => addQuickPulls('character_event', 1, 5, 'Nhân Vật 5★')}
              style={{ flex: 1.2, padding: '6px 8px', borderRadius: '5px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(250, 204, 21, 0.3)', cursor: 'pointer' }}
            >
              Nổ 5★
            </button>
            <button
              onClick={() => resetBannerPity('character_event')}
              title="Đặt lại Pity về 0"
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontSize: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Banner 2: Weapon Event */}
        <div className="glass-panel" style={{
          padding: '22px',
          borderLeft: '4px solid var(--accent-cyan)',
          background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.05) 0%, rgba(15, 23, 42, 0.75) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Banner Vũ Khí Giới Hạn
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              100% Trúng (80 Roll)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
              {weaponEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${Math.min(100, (weaponEventPity.currentPity / 80) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
            }} />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{weaponEventPity.remainingToHardPity}</strong> roll tới 5★</span>
            <span>4★ Pity: <strong style={{ color: '#c084fc' }}>{weaponEventPity.fourStarPity}/10</strong></span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            5★ Đã có: <strong style={{ color: 'var(--accent-cyan)' }}>{weaponEventPity.fiveStarCount}</strong>
            {weaponEventPity.lastFiveStar && (
              <span style={{ marginLeft: '8px' }}>
                • Gần nhất: <strong style={{ color: '#fff' }}>{weaponEventPity.lastFiveStar.resource_name}</strong>
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('weapon_event', 1)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('weapon_event', 10)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('weapon_event', 1, 4, 'Vũ Khí 4★')}
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(192, 132, 252, 0.3)', cursor: 'pointer' }}
            >
              +4★
            </button>
            <button
              onClick={() => addQuickPulls('weapon_event', 1, 5, 'Vũ Khí 5★')}
              style={{ flex: 1.2, padding: '6px 8px', borderRadius: '5px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.3)', cursor: 'pointer' }}
            >
              Nổ 5★
            </button>
            <button
              onClick={() => resetBannerPity('weapon_event')}
              title="Đặt lại Pity về 0"
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontSize: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Banner 3: Standard Banner */}
        <div className="glass-panel" style={{
          padding: '22px',
          borderLeft: '4px solid var(--accent-purple)',
          background: 'linear-gradient(145deg, rgba(192, 132, 252, 0.05) 0%, rgba(15, 23, 42, 0.75) 100%)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
              Banner Thường (Standard)
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)', fontWeight: 700 }}>
              Hard Pity 80
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-purple)', fontFamily: 'monospace' }}>
              {standardCharPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${Math.min(100, (standardCharPity.currentPity / 80) * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c084fc, #9333ea)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(192, 132, 252, 0.5)'
            }} />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{standardCharPity.remainingToHardPity}</strong> roll tới 5★</span>
            <span>4★ Pity: <strong style={{ color: '#c084fc' }}>{standardCharPity.fourStarPity}/10</strong></span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            5★ Đã có: <strong style={{ color: 'var(--accent-purple)' }}>{standardCharPity.fiveStarCount}</strong>
            {standardCharPity.lastFiveStar && (
              <span style={{ marginLeft: '8px' }}>
                • Gần nhất: <strong style={{ color: '#fff' }}>{standardCharPity.lastFiveStar.resource_name}</strong>
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('standard_character', 1)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('standard_character', 10)}
              style={{ flex: 1, padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('standard_character', 1, 4, 'Nhân Vật 4★')}
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(192, 132, 252, 0.3)', cursor: 'pointer' }}
            >
              +4★
            </button>
            <button
              onClick={() => addQuickPulls('standard_character', 1, 5, 'Chuẩn 5★')}
              style={{ flex: 1.2, padding: '6px 8px', borderRadius: '5px', background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(192, 132, 252, 0.3)', cursor: 'pointer' }}
            >
              Nổ 5★
            </button>
            <button
              onClick={() => resetBannerPity('standard_character')}
              title="Đặt lại Pity về 0"
              style={{ padding: '6px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontSize: '0.75rem', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Convene History Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', margin: 0 }}>
            <History size={18} color="var(--accent-gold)" />
            Nhật Ký Lượt Quay Gần Đây ({records.length} lượt)
          </h3>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'character_event', label: 'Nhân Vật Giới Hạn' },
              { id: 'weapon_event', label: 'Vũ Khí Giới Hạn' },
              { id: 'standard_character', label: 'Banner Thường' },
              { id: 'all', label: 'Tất Cả' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setHistoryTab(tab.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: historyTab === tab.id ? 'rgba(250, 204, 21, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: historyTab === tab.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  border: `1px solid ${historyTab === tab.id ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div style={{
          maxHeight: '260px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          paddingRight: '4px'
        }}>
          {filteredHistory.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Chưa có dữ liệu quay cho banner này. Hãy bấm <strong>+1 Roll</strong> hoặc <strong>+10 Roll</strong> ở trên để thêm nhanh!
            </div>
          ) : (
            filteredHistory.slice(0, 25).map((r) => {
              const q = Number(r.quality_level);
              const is5Star = q === 5;
              const is4Star = q === 4;

              return (
                <div
                  key={r.originalIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: is5Star 
                      ? 'rgba(250, 204, 21, 0.12)' 
                      : is4Star 
                      ? 'rgba(192, 132, 252, 0.1)' 
                      : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${is5Star ? 'rgba(250, 204, 21, 0.35)' : is4Star ? 'rgba(192, 132, 252, 0.25)' : 'rgba(255, 255, 255, 0.04)'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      background: is5Star ? '#facc15' : is4Star ? '#c084fc' : '#64748b',
                      color: is5Star ? '#000' : '#fff'
                    }}>
                      {q}★
                    </span>
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: is5Star ? 800 : is4Star ? 700 : 500,
                      color: is5Star ? 'var(--accent-gold)' : is4Star ? '#e9d5ff' : '#cbd5e1'
                    }}>
                      {r.resource_name}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {r.time ? r.time.substring(0, 16) : ''}
                    </span>
                    <button
                      onClick={() => removeRecord(r.originalIndex)}
                      title="Xóa lượt này"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Auto Convene Import Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
          <Terminal size={22} color="var(--accent-cyan)" />
          Đồng Bộ Lịch Sử Quay Tự Động
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
          Lấy link trực tiếp từ log client của Kuro Games hoặc dán dữ liệu JSON xuất từ WuWa Tracker. An toàn 100%: chỉ đọc file <code>Client.log</code> tạm thời để trích xuất URL token xem lịch sử, không can thiệp bộ nhớ game.
        </p>

        {/* Step Guide */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '6px' }}>BƯỚC 1</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Mở Wuthering Waves ➔ Vào màn hình <strong>Triệu Hồi Convene</strong> ➔ Bấm vào <strong>Lịch Sử History</strong>.</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 800, marginBottom: '6px' }}>BƯỚC 2</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bấm nút Copy bên dưới và dán vào <strong>Windows PowerShell</strong> rồi bấm Enter.</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 800, marginBottom: '6px' }}>BƯỚC 3</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>URL log sẽ tự sao chép vào bộ nhớ đệm ➔ Dán vào ô bên dưới và bấm <strong>Import Data</strong>.</div>
          </div>
        </div>

        {/* PowerShell Script Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '16px',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <code style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {powershellScript}
          </code>
          <button
            onClick={copyScriptToClipboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '6px',
              background: copiedScript ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.12)',
              color: copiedScript ? '#000' : '#fff',
              fontSize: '0.8rem',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {copiedScript ? <Check size={14} /> : <Copy size={14} />}
            {copiedScript ? 'Đã Sao Chép!' : 'Copy Script PowerShell'}
          </button>
        </div>

        {/* URL Input & Import Action */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Dán URL lịch sử quay hoặc chuỗi JSON vào đây, hoặc để trống để nạp mẫu..."
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            style={{
              flex: '1 1 300px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleManualImport}
            disabled={isImporting}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #facc15, #eab308)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.85rem',
              opacity: isImporting ? 0.7 : 1,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.3)'
            }}
          >
            {isImporting ? 'Đang Xử Lý...' : importUrl ? 'Import Data' : 'Nạp Dữ Liệu Thử Nghiệm'}
          </button>
        </div>

        {statusMsg && (
          <div style={{
            marginTop: '14px',
            fontSize: '0.85rem',
            padding: '10px 14px',
            borderRadius: '6px',
            background: statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: statusMsg.type === 'success' ? 'var(--accent-green)' : '#f87171'
          }}>
            {statusMsg.text}
          </div>
        )}
      </div>
    </div>
  );
}
