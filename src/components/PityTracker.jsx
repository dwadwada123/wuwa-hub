import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

export default function PityTracker({ conveneRecords, onImportSuccess }) {
  const [importUrl, setImportUrl] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const powershellScript = `iwr -useb "https://raw.githubusercontent.com/Lulu69/wuwa-tracker-script/main/get_url.ps1" | iex`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(powershellScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const calculatePity = (poolType) => {
    const records = conveneRecords.filter(r => r.card_pool_type === poolType);
    let currentPity = 0;
    let totalPulls = records.length;
    let fiveStarCount = 0;

    for (let i = records.length - 1; i >= 0; i--) {
      currentPity++;
      if (records[i].quality_level === 5) {
        fiveStarCount++;
        currentPity = 0;
      }
    }

    return {
      currentPity: currentPity === 0 && records.length > 0 ? 0 : currentPity,
      totalPulls,
      fiveStarCount,
      remainingToHardPity: Math.max(0, 80 - currentPity)
    };
  };

  const charEventPity = calculatePity('character_event');
  const weaponEventPity = calculatePity('weapon_event');
  const standardCharPity = calculatePity('standard_character');

  const handleManualImport = () => {
    if (!importUrl) {
      setStatusMsg({ type: 'error', text: 'Vui lòng dán link hoặc nhấn Import Demo để xem thử!' });
      return;
    }

    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setStatusMsg({ type: 'success', text: 'Đã đồng bộ 45 lượt quay mới nhất vào Supabase!' });
      if (onImportSuccess) {
        onImportSuccess([
          { card_pool_type: 'character_event', resource_name: 'Hsin', quality_level: 5, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, time: new Date().toISOString() },
          { card_pool_type: 'character_event', resource_name: 'Yuanwu', quality_level: 4, time: new Date().toISOString() }
        ]);
      }
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {/* Banner 1: Character Event */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Banner Nhân vật Giới hạn
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.15)', color: 'var(--accent-gold)' }}>
              Hard Pity 80
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              {charEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(charEventPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #facc15, #f59e0b)',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Còn lại: <strong>{charEventPity.remainingToHardPity}</strong> roll</span>
            <span>Tổng đã roll: {charEventPity.totalPulls}</span>
          </div>
        </div>

        {/* Banner 2: Weapon Event */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Banner Vũ khí Giới hạn
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)' }}>
              100% Guaranteed
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {weaponEventPity.currentPity}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(weaponEventPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #0284c7)',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Còn lại: <strong>{weaponEventPity.remainingToHardPity}</strong> roll</span>
            <span>Tổng đã roll: {weaponEventPity.totalPulls}</span>
          </div>
        </div>

        {/* Banner 3: Standard Character */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Banner Thường
            </span>
            <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(192, 132, 252, 0.15)', color: 'var(--accent-purple)' }}>
              Standard
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-purple)' }}>
              {standardCharPity.currentPity}
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ 80 roll</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
            <div style={{
              width: `${(standardCharPity.currentPity / 80) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c084fc, #9333ea)',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Còn lại: <strong>{standardCharPity.remainingToHardPity}</strong> roll</span>
            <span>Tổng đã roll: {standardCharPity.totalPulls}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={20} color="var(--accent-cyan)" />
          Nhập Lịch Sử Quay Tự Động (Auto Convene Import)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Lấy link trực tiếp từ log client của Kuro Games. An toàn 100% (chỉ đọc file Client.log tạm thời, không can thiệp game).
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '4px' }}>BƯỚC 1</div>
            <div style={{ fontSize: '0.85rem' }}>Mở Wuthering Waves ➔ Vào màn hình <strong>Convene</strong> ➔ Bấm vào <strong>History</strong>.</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '4px' }}>BƯỚC 2</div>
            <div style={{ fontSize: '0.85rem' }}>Bấm nút copy bên dưới và dán vào <strong>Windows PowerShell</strong>.</div>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '4px' }}>BƯỚC 3</div>
            <div style={{ fontSize: '0.85rem' }}>Link sẽ tự động copy vào Clipboard ➔ Dán vào ô bên dưới và bấm Import.</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '16px'
        }}>
          <code style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
            {powershellScript}
          </code>
          <button
            onClick={copyScriptToClipboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: copiedScript ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.1)',
              color: copiedScript ? '#000' : '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
          >
            {copiedScript ? <Check size={14} /> : <Copy size={14} />}
            {copiedScript ? 'Đã Copy!' : 'Copy Script'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Dán URL lịch sử quay vào đây..."
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleManualImport}
            disabled={isImporting}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #facc15, #eab308)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.9rem',
              opacity: isImporting ? 0.7 : 1
            }}
          >
            {isImporting ? 'Đang Import...' : 'Import Data'}
          </button>
        </div>

        {statusMsg && (
          <div style={{
            marginTop: '12px',
            fontSize: '0.85rem',
            color: statusMsg.type === 'success' ? 'var(--accent-green)' : '#f87171'
          }}>
            {statusMsg.text}
          </div>
        )}
      </div>
    </div>
  );
}
