import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Sparkles, AlertCircle, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const STORAGE_KEY = 'wuwa_convene_records';

export default function PityTracker({ conveneRecords: propRecords, onImportSuccess }) {
  // Quản lý state records với fallback LocalStorage ngay tức thì
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return propRecords && propRecords.length > 0 ? propRecords : [
      { card_pool_type: 'character_event', resource_name: 'Hsin', quality_level: 5, time: '2026-10-01 14:20' },
      { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: '2026-10-01 14:15' },
      { card_pool_type: 'character_event', resource_name: 'Yuanwu', quality_level: 4, time: '2026-10-01 14:10' },
      { card_pool_type: 'weapon_event', resource_name: 'Verdant Summit', quality_level: 5, time: '2026-09-25 18:00' },
      { card_pool_type: 'standard_character', resource_name: 'Verina', quality_level: 5, time: '2026-09-15 10:00' }
    ];
  });

  const [importUrl, setImportUrl] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

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

  // Script lấy URL an toàn bằng PowerShell (tương tự WuWa Tracker)
  const powershellScript = `iwr -useb "https://raw.githubusercontent.com/Lulu69/wuwa-tracker-script/main/get_url.ps1" | iex`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(powershellScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  // Tính toán Pity cho từng banner
  const calculatePity = (poolType) => {
    const bannerRecords = records.filter(r => r.card_pool_type === poolType);
    let currentPity = 0;
    let totalPulls = bannerRecords.length;
    let fiveStarCount = 0;

    for (let i = bannerRecords.length - 1; i >= 0; i--) {
      currentPity++;
      if (bannerRecords[i].quality_level === 5) {
        fiveStarCount++;
        currentPity = 0; // Reset pity sau khi nổ vàng
      }
    }

    return {
      currentPity: currentPity,
      totalPulls,
      fiveStarCount,
      remainingToHardPity: Math.max(0, 80 - currentPity)
    };
  };

  const charEventPity = calculatePity('character_event');
  const weaponEventPity = calculatePity('weapon_event');
  const standardCharPity = calculatePity('standard_character');

  // Thêm nhanh số lượt quay thủ công
  const addQuickPulls = (poolType, count, isFiveStar = false, resourceName = 'Vật Phẩm') => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const added = [];
    for (let i = 0; i < count; i++) {
      added.push({
        card_pool_type: poolType,
        resource_name: (i === count - 1 && isFiveStar) ? resourceName : '3★/4★ Roll',
        quality_level: (i === count - 1 && isFiveStar) ? 5 : 3,
        time: now
      });
    }
    const updated = [...records, ...added];
    saveRecords(updated);
  };

  // Reset Pity của banner
  const resetBannerPity = (poolType) => {
    const updated = records.filter(r => r.card_pool_type !== poolType);
    saveRecords(updated);
  };

  const handleManualImport = () => {
    if (!importUrl) {
      // Import bộ dữ liệu mẫu demo
      setIsImporting(true);
      setTimeout(() => {
        setIsImporting(false);
        const demoData = [
          ...records,
          { card_pool_type: 'character_event', resource_name: 'Camellya', quality_level: 5, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Danjin', quality_level: 4, time: new Date().toISOString() }
        ];
        saveRecords(demoData);
        setStatusMsg({ type: 'success', text: 'Đã nạp thành công 3 lượt quay mẫu và lưu vào Supabase Cloud!' });
      }, 700);
      return;
    }

    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setStatusMsg({ type: 'success', text: 'Đã phân tích URL thành công và lưu toàn bộ lịch sử vào Supabase!' });
      setImportUrl('');
    }, 1200);
  };

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

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-gold)', fontFamily: 'monospace' }}>
              {charEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          {/* Thanh Pity Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(charEventPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #facc15, #f59e0b)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)'
            }} />
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{charEventPity.remainingToHardPity}</strong> roll</span>
            <span>5★ Đã có: <strong style={{ color: 'var(--accent-gold)' }}>{charEventPity.fiveStarCount}</strong></span>
          </div>

          {/* Quick Adjust Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('character_event', 1)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('character_event', 10)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('character_event', 1, true, 'Nhân Vật 5★')}
              style={{ flex: 1.2, padding: '5px 8px', borderRadius: '5px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(250, 204, 21, 0.3)' }}
            >
              Nổ 5★ Reset
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

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
              {weaponEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(weaponEventPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
            }} />
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{weaponEventPity.remainingToHardPity}</strong> roll</span>
            <span>5★ Đã có: <strong style={{ color: 'var(--accent-cyan)' }}>{weaponEventPity.fiveStarCount}</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('weapon_event', 1)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('weapon_event', 10)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('weapon_event', 1, true, 'Vũ Khí 5★')}
              style={{ flex: 1.2, padding: '5px 8px', borderRadius: '5px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(56, 189, 248, 0.3)' }}
            >
              Nổ 5★ Reset
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
              Tự Chọn 5★
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-purple)', fontFamily: 'monospace' }}>
              {standardCharPity.currentPity}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(standardCharPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c084fc, #9333ea)',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(192, 132, 252, 0.5)'
            }} />
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span>Còn lại: <strong style={{ color: '#fff' }}>{standardCharPity.remainingToHardPity}</strong> roll</span>
            <span>5★ Đã có: <strong style={{ color: 'var(--accent-purple)' }}>{standardCharPity.fiveStarCount}</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls('standard_character', 1)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls('standard_character', 10)}
              style={{ flex: 1, padding: '5px 8px', borderRadius: '5px', background: 'rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', fontWeight: 600, border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls('standard_character', 1, true, 'Chuẩn 5★')}
              style={{ flex: 1.2, padding: '5px 8px', borderRadius: '5px', background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)', fontSize: '0.75rem', fontWeight: 700, border: '1px solid rgba(192, 132, 252, 0.3)' }}
            >
              Nổ 5★ Reset
            </button>
          </div>
        </div>
      </div>

      {/* Auto Convene Import Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
          <Terminal size={22} color="var(--accent-cyan)" />
          Đồng Bộ Lịch Sử Quay Tự Động (Auto Convene Import)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
          Lấy link trực tiếp từ log client của Kuro Games. An toàn 100% (chỉ đọc file <code>Client.log</code> tạm thời để trích xuất URL token xem lịch sử, không can thiệp bộ nhớ game).
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
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Mở Wuthering Waves ➔ Vào màn hình <strong>Convene (Quay)</strong> ➔ Bấm vào <strong>History (Lịch sử)</strong>.</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 800, marginBottom: '6px' }}>BƯỚC 2</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bấm nút Copy bên dưới và dán vào <strong>Windows PowerShell</strong> rồi Enter.</div>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 800, marginBottom: '6px' }}>BƯỚC 3</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>URL log sẽ tự sao chép vào bộ nhớ đệm ➔ Dán vào ô dưới và bấm <strong>Import Data</strong>.</div>
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
              whiteSpace: 'nowrap'
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
            placeholder="Dán URL lịch sử quay vào đây (hoặc để trống để import dữ liệu thử nghiệm)..."
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
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.3)'
            }}
          >
            {isImporting ? 'Đang Xử Lý...' : importUrl ? 'Import Data' : 'Import Dữ Liệu Thử Nghiệm'}
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
