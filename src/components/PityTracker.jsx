import React, { useState, useEffect, useMemo } from 'react';
import { 
  Copy, Check, Terminal, RotateCcw, Sparkles, Trash2, History, Plus, 
  Search, ChevronLeft, ChevronRight, Download, Upload, ShieldCheck, 
  Flame, TrendingUp, ExternalLink, Zap, Star, AlertCircle, RefreshCw
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { RESONATORS } from '../data/resonators';

const STORAGE_KEY = 'wuwa_convene_records';

// Danh sách nhân vật 5 sao banner thường trong Wuthering Waves
const STANDARD_5_STAR_RESONATORS = new Set([
  'Calcharo',
  'Encore',
  'Jianxin',
  'Lingyang',
  'Verina'
]);

// Danh sách vũ khí 5 sao thường
const STANDARD_5_STAR_WEAPONS = new Set([
  'Cosmic Ripples',
  'Emerald of Genesis',
  'Lustrous Razor',
  'Static Mist',
  'Abyss Surges'
]);

// PowerShell command từ WuWa Tracker chính thức
const POWERSHELL_SCRIPT_PRIMARY = `iwr -useb https://raw.githubusercontent.com/wuwatracker/wuwatracker/747a48b1b994baa9c372a4fb933ea7588428bd4b/import.ps1 | iex`;
const POWERSHELL_SCRIPT_SHORT = `irm https://wuwatracker.com/import.ps1 | iex`;

// Banner metadata
const BANNER_CONFIGS = [
  {
    id: 'character_event',
    name: 'Nhân Vật Sự Kiện',
    shortName: 'Nhân Vật',
    cardPoolType: 1,
    hardPity: 80,
    accentColor: '#facc15',
    bgGradient: 'from-amber-500/20 to-transparent',
    featuredRateUp: 'Hsin / Camellya',
    image: 'https://wutheringlab.com/wp-content/uploads/Hsin.webp'
  },
  {
    id: 'weapon_event',
    name: 'Vũ Khí Sự Kiện',
    shortName: 'Vũ Khí',
    cardPoolType: 2,
    hardPity: 80,
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-500/20 to-transparent',
    featuredRateUp: '100% Trúng Banner',
    image: 'https://wutheringlab.com/wp-content/uploads/Blooming-Jadehaven.webp'
  },
  {
    id: 'standard_character',
    name: 'Nhân Vật Thường',
    shortName: 'Nhân Vật Thường',
    cardPoolType: 3,
    hardPity: 80,
    accentColor: '#c084fc',
    bgGradient: 'from-purple-500/20 to-transparent',
    featuredRateUp: 'Verina, Encore, Calcharo',
    image: 'https://wutheringlab.com/wp-content/uploads/Verina.webp'
  },
  {
    id: 'standard_weapon',
    name: 'Vũ Khí Thường',
    shortName: 'Vũ Khí Thường',
    cardPoolType: 4,
    hardPity: 80,
    accentColor: '#34d399',
    bgGradient: 'from-emerald-500/20 to-transparent',
    featuredRateUp: 'Định Chuẩn 100% Trúng',
    image: 'https://wutheringlab.com/wp-content/uploads/Emerald-of-Genesis.webp'
  }
];

// Dữ liệu mẫu khởi đầu khi người dùng chưa đồng bộ
const INITIAL_DEMO_RECORDS = [
  { card_pool_type: 'character_event', resource_name: 'Hsin', quality_level: 5, resource_type: 'Resonator', time: '2026-10-02 18:22:10' },
  { card_pool_type: 'character_event', resource_name: 'Sanhua', quality_level: 4, resource_type: 'Resonator', time: '2026-10-02 18:20:00' },
  { card_pool_type: 'character_event', resource_name: 'Vũ Khí 3★', quality_level: 3, resource_type: 'Weapon', time: '2026-10-02 18:19:10' },
  { card_pool_type: 'character_event', resource_name: 'Vũ Khí 3★', quality_level: 3, resource_type: 'Weapon', time: '2026-10-02 18:18:25' },
  { card_pool_type: 'character_event', resource_name: 'Calcharo', quality_level: 5, resource_type: 'Resonator', time: '2026-09-28 14:10:00' },
  { card_pool_type: 'character_event', resource_name: 'Yangyang', quality_level: 4, resource_type: 'Resonator', time: '2026-09-28 14:05:00' },
  { card_pool_type: 'character_event', resource_name: 'Camellya', quality_level: 5, resource_type: 'Resonator', time: '2026-09-15 11:30:00' },
  { card_pool_type: 'weapon_event', resource_name: 'Blooming Jadehaven', quality_level: 5, resource_type: 'Weapon', time: '2026-10-02 19:00:00' },
  { card_pool_type: 'weapon_event', resource_name: 'Vũ Khí 4★', quality_level: 4, resource_type: 'Weapon', time: '2026-10-02 18:55:00' },
  { card_pool_type: 'standard_character', resource_name: 'Verina', quality_level: 5, resource_type: 'Resonator', time: '2026-09-10 09:20:00' },
  { card_pool_type: 'standard_character', resource_name: 'Chixia', quality_level: 4, resource_type: 'Resonator', time: '2026-09-10 09:15:00' },
  { card_pool_type: 'standard_weapon', resource_name: 'Emerald of Genesis', quality_level: 5, resource_type: 'Weapon', time: '2026-09-05 16:40:00' }
];

export default function PityTracker({ conveneRecords: propRecords, onImportSuccess }) {
  // Quản lý state records
  const [records, setRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return propRecords && propRecords.length > 0 ? propRecords : INITIAL_DEMO_RECORDS;
  });

  const [activeBanner, setActiveBanner] = useState('character_event');
  const [importUrl, setImportUrl] = useState('');
  const [copiedScript, setCopiedScript] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [historyFilterRarity, setHistoryFilterRarity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [showImportSection, setShowImportSection] = useState(false);

  // Sync Supabase Cloud
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
        // fallback local
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

  const copyScriptToClipboard = (scriptText) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2200);
  };

  // Tra cứu Avatar nhân vật từ database
  const getAvatarForName = (name) => {
    if (!name) return null;
    const cleanName = name.trim().toLowerCase();
    const found = RESONATORS.find(r => r.name.toLowerCase() === cleanName || cleanName.includes(r.name.toLowerCase()));
    if (found) return found.avatar;
    if (name.includes('Verina')) return 'https://wutheringlab.com/wp-content/uploads/Verina.webp';
    if (name.includes('Camellya')) return 'https://wutheringlab.com/wp-content/uploads/Camellya.webp';
    if (name.includes('Hsin')) return 'https://wutheringlab.com/wp-content/uploads/Hsin.webp';
    if (name.includes('Calcharo')) return 'https://wutheringlab.com/wp-content/uploads/Calcharo.webp';
    if (name.includes('Encore')) return 'https://wutheringlab.com/wp-content/uploads/Encore.webp';
    if (name.includes('Jianxin')) return 'https://wutheringlab.com/wp-content/uploads/Jianxin.webp';
    if (name.includes('Lingyang')) return 'https://wutheringlab.com/wp-content/uploads/Lingyang.webp';
    if (name.includes('Jinhsi')) return 'https://wutheringlab.com/wp-content/uploads/Jinhsi.webp';
    if (name.includes('Changli')) return 'https://wutheringlab.com/wp-content/uploads/Changli.webp';
    if (name.includes('Shorekeeper')) return 'https://wutheringlab.com/wp-content/uploads/Shorekeeper.webp';
    if (name.includes('Yinlin')) return 'https://wutheringlab.com/wp-content/uploads/Yinlin.webp';
    if (name.includes('Jiyan')) return 'https://wutheringlab.com/wp-content/uploads/Jiyan.webp';
    return null;
  };

  /**
   * Tính toán Pity, 50/50, Lịch sử 5★ chuẩn xác theo thuật toán WuWa Tracker
   */
  const calculateBannerStats = (poolId) => {
    const bannerRecords = records.filter(r => poolId === 'all' ? true : r.card_pool_type === poolId);
    // Sắp xếp tăng dần theo thời gian (cũ nhất -> mới nhất)
    const sorted = [...bannerRecords].sort((a, b) => new Date(a.time || 0) - new Date(b.time || 0));

    let currentPity = 0;
    let fourStarPity = 0;
    let fiveStarCount = 0;
    let fourStarCount = 0;
    let threeStarCount = 0;
    let isGuaranteed = false;
    const fiveStarHistory = [];
    let total5StarPitySum = 0;
    let fiftyFiftyWins = 0;
    let fiftyFiftyLosses = 0;

    for (const r of sorted) {
      const q = Number(r.quality_level);
      if (q === 5) {
        fiveStarCount++;
        const pityAtDrop = currentPity + 1;
        total5StarPitySum += pityAtDrop;

        let status = 'featured';
        if (poolId === 'character_event' || (poolId === 'all' && r.card_pool_type === 'character_event')) {
          const isStandard = STANDARD_5_STAR_RESONATORS.has(r.resource_name);
          if (isStandard) {
            status = 'lost_50_50';
            fiftyFiftyLosses++;
            isGuaranteed = true;
          } else {
            if (isGuaranteed) {
              status = 'guaranteed_win';
            } else {
              status = 'won_50_50';
              fiftyFiftyWins++;
            }
            isGuaranteed = false;
          }
        } else if (poolId === 'weapon_event') {
          status = 'guaranteed_win';
        }

        fiveStarHistory.push({
          name: r.resource_name,
          pity: pityAtDrop,
          time: r.time,
          status,
          type: r.resource_type || 'Resonator',
          avatar: getAvatarForName(r.resource_name)
        });

        currentPity = 0;
        fourStarPity = 0;
      } else if (q === 4) {
        fourStarCount++;
        currentPity++;
        fourStarPity = 0;
      } else {
        threeStarCount++;
        currentPity++;
        fourStarPity++;
      }
    }

    const total5050 = fiftyFiftyWins + fiftyFiftyLosses;
    const winRate = total5050 > 0 ? ((fiftyFiftyWins / total5050) * 100).toFixed(1) : null;
    const avgPity = fiveStarCount > 0 ? (total5StarPitySum / fiveStarCount).toFixed(1) : null;

    return {
      currentPity,
      fourStarPity,
      totalPulls: bannerRecords.length,
      fiveStarCount,
      fourStarCount,
      threeStarCount,
      fiveStarHistory: [...fiveStarHistory].reverse(),
      isGuaranteed,
      winRate,
      fiftyFiftyWins,
      fiftyFiftyLosses,
      avgPity,
      remainingToHardPity: Math.max(0, 80 - currentPity),
      remainingTo4Star: Math.max(0, 10 - fourStarPity),
      astritesSpent: bannerRecords.length * 160
    };
  };

  // Thống kê từng banner
  const bannerStatsMap = useMemo(() => {
    return {
      character_event: calculateBannerStats('character_event'),
      weapon_event: calculateBannerStats('weapon_event'),
      standard_character: calculateBannerStats('standard_character'),
      standard_weapon: calculateBannerStats('standard_weapon'),
      all: calculateBannerStats('all')
    };
  }, [records]);

  const currentStats = bannerStatsMap[activeBanner] || bannerStatsMap.character_event;

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
        ? (poolType.includes('weapon') ? 'Vũ Khí 5★ Giới Hạn' : 'Hsin') 
        : q === 4 
        ? (poolType.includes('weapon') ? 'Vũ Khí 4★' : 'Sanhua') 
        : 'Vũ Khí 3★';

      added.push({
        card_pool_type: poolType,
        resource_name: name,
        quality_level: q,
        resource_type: poolType.includes('weapon') ? 'Weapon' : 'Resonator',
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
    if (window.confirm('Bạn có chắc muốn đặt lại lịch sử của banner này về 0?')) {
      const updated = records.filter(r => r.card_pool_type !== poolType);
      saveRecords(updated);
    }
  };

  // Trích xuất tham số từ Convene URL
  const parseConveneUrl = (urlStr) => {
    if (!urlStr) return null;
    const trimmed = urlStr.trim();
    let queryPart = '';
    if (trimmed.includes('?')) {
      queryPart = trimmed.slice(trimmed.indexOf('?') + 1);
    } else if (trimmed.includes('&')) {
      queryPart = trimmed;
    }
    const params = new URLSearchParams(queryPart);
    const playerId = params.get('player_id') || params.get('playerId');
    const recordId = params.get('record_id') || params.get('recordId');
    const serverId = params.get('svr_id') || params.get('serverId');
    const isCn = trimmed.includes('.com') && !trimmed.includes('-oversea');

    if (!playerId || !recordId) return null;

    return {
      playerId,
      recordId,
      serverId: serverId || '7631075344474771694',
      serverArea: isCn ? 'cn' : 'global',
      languageCode: 'en'
    };
  };

  // Xử lý nạp dữ liệu từ URL Kuro Games hoặc dán JSON
  const handleImportConveneData = async () => {
    if (!importUrl || !importUrl.trim()) {
      setStatusMsg({ type: 'error', text: 'Vui lòng dán URL Convene History hoặc dữ liệu JSON trước khi bấm Nhập!' });
      return;
    }

    const trimmed = importUrl.trim();

    // 1. Kiểm tra dán JSON trực tiếp từ WuWa Tracker / Backup
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        const list = Array.isArray(parsed) ? parsed : (parsed.data || parsed.pulls || []);
        if (Array.isArray(list) && list.length > 0) {
          const normalized = list.map(item => ({
            card_pool_type: item.card_pool_type || item.cardPoolType || (item.pool === 1 ? 'character_event' : 'standard_character'),
            resource_name: item.resource_name || item.name || 'Vật Phẩm',
            quality_level: Number(item.quality_level || item.qualityLevel || 3),
            resource_type: item.resource_type || item.resourceType || (Number(item.quality_level || item.qualityLevel) === 5 ? 'Resonator' : 'Weapon'),
            time: item.time || new Date().toISOString()
          }));

          // Khử trùng lặp
          const seen = new Set(records.map(r => `${r.card_pool_type}-${r.time}-${r.resource_name}`));
          const uniqueNew = normalized.filter(r => !seen.has(`${r.card_pool_type}-${r.time}-${r.resource_name}`));

          const merged = [...records, ...uniqueNew];
          saveRecords(merged);
          setStatusMsg({ type: 'success', text: `Đã nạp thành công ${uniqueNew.length} lượt quay mới từ dữ liệu JSON!` });
          setImportUrl('');
          return;
        }
      } catch (err) {
        setStatusMsg({ type: 'error', text: 'Dữ liệu JSON không đúng định dạng. Vui lòng kiểm tra lại cấu trúc!' });
        return;
      }
    }

    // 2. Phân tích URL Convene từ Kuro Games
    const parsedParams = parseConveneUrl(trimmed);
    if (!parsedParams) {
      setStatusMsg({
        type: 'error',
        text: 'URL không hợp lệ. Vui lòng kiểm tra URL có chứa tham số player_id và record_id từ PowerShell script.'
      });
      return;
    }

    setIsImporting(true);
    setStatusMsg(null);
    setImportProgress('Đang kết nối tới máy chủ Kuro Games...');

    try {
      const baseUrl = parsedParams.serverArea === 'cn'
        ? 'https://gmserver-api.aki-game2.com/gacha/record/query'
        : 'https://gmserver-api.aki-game2.net/gacha/record/query';

      const poolQueries = [
        { type: 1, key: 'character_event', label: 'Nhân Vật Sự Kiện' },
        { type: 2, key: 'weapon_event', label: 'Vũ Khí Sự Kiện' },
        { type: 3, key: 'standard_character', label: 'Nhân Vật Thường' },
        { type: 4, key: 'standard_weapon', label: 'Vũ Khí Thường' }
      ];

      const pulledItems = [];

      for (let i = 0; i < poolQueries.length; i++) {
        const pool = poolQueries[i];
        setImportProgress(`Đang tải lịch sử ${pool.label}... (${i + 1}/${poolQueries.length})`);

        try {
          const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              playerId: parsedParams.playerId,
              recordId: parsedParams.recordId,
              serverId: parsedParams.serverId,
              cardPoolType: pool.type,
              languageCode: 'en'
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data && data.code === 0 && Array.isArray(data.data)) {
              for (const it of data.data) {
                pulledItems.push({
                  card_pool_type: pool.key,
                  raw_pool_type: pool.type,
                  resource_name: it.name || it.resourceName || 'Vật Phẩm',
                  quality_level: Number(it.qualityLevel || 3),
                  resource_type: it.resourceType || (it.qualityLevel === 5 ? 'Resonator' : 'Weapon'),
                  time: it.time || new Date().toISOString(),
                  player_id: parsedParams.playerId
                });
              }
            }
          }
        } catch (innerErr) {
          console.warn(`Lỗi fetch ${pool.label}:`, innerErr);
        }
      }

      if (pulledItems.length > 0) {
        // Khử trùng lặp
        const seen = new Set(records.map(r => `${r.card_pool_type}-${r.time}-${r.resource_name}`));
        const uniqueItems = pulledItems.filter(r => !seen.has(`${r.card_pool_type}-${r.time}-${r.resource_name}`));
        const merged = [...records, ...uniqueItems];
        saveRecords(merged);
        setStatusMsg({
          type: 'success',
          text: `Đồng bộ hoàn tất! Đã nạp thành công ${uniqueItems.length} lượt quay mới từ tài khoản UID ${parsedParams.playerId}.`
        });
        setImportUrl('');
      } else {
        setStatusMsg({
          type: 'error',
          text: 'Máy chủ không trả về lượt quay mới nào. Hãy đảm bảo bạn đã mở mục Triệu Hồi Convene trong game trước khi chạy script.'
        });
      }
    } catch (e) {
      setStatusMsg({
        type: 'error',
        text: `Lỗi kết nối máy chủ: ${e.message}. Bạn có thể copy dữ liệu JSON và dán trực tiếp vào đây.`
      });
    } finally {
      setIsImporting(false);
      setImportProgress('');
    }
  };

  // Nạp lại dữ liệu mẫu
  const handleLoadDemoData = () => {
    saveRecords(INITIAL_DEMO_RECORDS);
    setStatusMsg({ type: 'success', text: 'Đã khôi phục dữ liệu mẫu thành công!' });
  };

  // Xóa sạch toàn bộ dữ liệu
  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử quay để bắt đầu nhập từ đầu?')) {
      saveRecords([]);
      setStatusMsg({ type: 'success', text: 'Đã làm trống toàn bộ lịch sử quay.' });
    }
  };

  // Xuất file JSON backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `wuwa_convene_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Lọc và phân trang cho bảng lịch sử
  const filteredHistory = useMemo(() => {
    return records
      .map((r, originalIndex) => ({ ...r, originalIndex }))
      .filter(r => {
        if (activeBanner !== 'all' && r.card_pool_type !== activeBanner) return false;
        if (historyFilterRarity !== 'all' && Number(r.quality_level) !== Number(historyFilterRarity)) return false;
        if (searchTerm.trim()) {
          const matchName = r.resource_name.toLowerCase().includes(searchTerm.toLowerCase());
          if (!matchName) return false;
        }
        return true;
      })
      .reverse();
  }, [records, activeBanner, historyFilterRarity, searchTerm]);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(start, start + itemsPerPage);
  }, [filteredHistory, currentPage, itemsPerPage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* HEADER SECTION: Tiêu đề & Hành động theo phong cách WuWa Tracker */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #facc15, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.4)'
            }}>
              <Sparkles size={20} color="#000" />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.3px' }}>
              Theo Dõi Triệu Hồi & Pity Tracker
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Phân tích số lượt quay, bảo hiểm 50/50 và lịch sử nổ 5 sao theo thời gian thực chuẩn WuWa Tracker
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowImportSection(!showImportSection)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              background: showImportSection 
                ? 'linear-gradient(135deg, #38bdf8, #0284c7)' 
                : 'linear-gradient(135deg, #facc15, #eab308)',
              color: '#000',
              fontWeight: 800,
              fontSize: '0.82rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: showImportSection ? '0 0 20px rgba(56, 189, 248, 0.4)' : '0 0 20px rgba(250, 204, 21, 0.35)',
              transition: 'all 0.25s ease'
            }}
          >
            <Terminal size={16} />
            {showImportSection ? 'Đóng Khu Vực Nhập Log' : 'Nhập Dữ Liệu Tự Động'}
          </button>

          <button
            onClick={handleExportJSON}
            title="Xuất file sao lưu JSON"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            Sao Lưu
          </button>

          <button
            onClick={handleLoadDemoData}
            title="Nạp dữ liệu mẫu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} />
            Mẫu
          </button>

          <button
            onClick={handleClearAll}
            title="Xóa trắng toàn bộ dữ liệu"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* AUTO IMPORT SECTION: Chuẩn WuWa Tracker (Hiện / Ẩn linh hoạt) */}
      {showImportSection && (
        <div className="glass-panel animate-fade-in-up" style={{
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(14, 165, 233, 0.06) 100%)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={22} color="var(--accent-cyan)" />
              Đồng Bộ Lịch Sử Triệu Hồi Với WuWa Tracker Script
            </h3>
            <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
              An toàn 100% không can thiệp game
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            Phương thức chính thức từ WuWa Tracker: script chỉ đọc tạm thời file log <code>Client.log</code> của game trên máy bạn để lấy liên kết token xem lịch sử triệu hồi, bảo mật tuyệt đối và không sửa đổi bất kỳ tập tin nào.
          </p>

          {/* 3 Bước Hướng Dẫn Trực Quan */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            marginBottom: '22px'
          }}>
            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.07)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', background: 'rgba(250, 204, 21, 0.2)', color: 'var(--accent-gold)' }}>
                  BƯỚC 1
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Mở Lịch Sử Game</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Khởi động Wuthering Waves trên PC ➔ Vào mục <strong>Triệu Hồi Convene</strong> ➔ Bấm vào <strong>Lịch Sử History</strong> để game tạo log.
              </div>
            </div>

            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.07)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.2)', color: 'var(--accent-cyan)' }}>
                  BƯỚC 2
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Chạy Script PowerShell</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Bấm nút Copy lệnh bên dưới ➔ Mở <strong>Windows PowerShell</strong> ➔ Dán và nhấn Enter để script tự động copy URL log.
              </div>
            </div>

            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.07)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', background: 'rgba(52, 211, 153, 0.2)', color: 'var(--accent-green)' }}>
                  BƯỚC 3
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Dán Link & Đồng Bộ</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Dán URL vào ô bên dưới rồi nhấn <strong>Bắt Đầu Nhập Dữ Liệu</strong>. Hệ thống sẽ tự động cập nhật đầy đủ mọi banner.
              </div>
            </div>
          </div>

          {/* Hộp Lệnh PowerShell Script */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.65)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '14px 18px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                Lệnh PowerShell WuWa Tracker
              </div>
              <code style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {POWERSHELL_SCRIPT_PRIMARY}
              </code>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => copyScriptToClipboard(POWERSHELL_SCRIPT_PRIMARY)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: copiedScript ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.12)',
                  color: copiedScript ? '#000' : '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {copiedScript ? <Check size={14} /> : <Copy size={14} />}
                {copiedScript ? 'Đã Sao Chép!' : 'Sao Chép Lệnh'}
              </button>
            </div>
          </div>

          {/* Input URL & Nút Hành Động */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Dán URL lịch sử quay hoặc chuỗi JSON sao lưu vào đây..."
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              style={{
                flex: '1 1 320px',
                padding: '13px 18px',
                borderRadius: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleImportConveneData}
              disabled={isImporting}
              style={{
                padding: '13px 28px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #facc15, #eab308)',
                color: '#000',
                fontWeight: 900,
                fontSize: '0.88rem',
                opacity: isImporting ? 0.7 : 1,
                cursor: isImporting ? 'not-allowed' : 'pointer',
                border: 'none',
                boxShadow: '0 0 20px rgba(250, 204, 21, 0.35)',
                whiteSpace: 'nowrap'
              }}
            >
              {isImporting ? 'Đang Nhập Dữ Liệu...' : 'Bắt Đầu Nhập Dữ Liệu'}
            </button>
          </div>

          {importProgress && (
            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={14} className="animate-spin" />
              {importProgress}
            </div>
          )}

          {statusMsg && (
            <div style={{
              marginTop: '14px',
              fontSize: '0.85rem',
              padding: '12px 16px',
              borderRadius: '8px',
              background: statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: `1px solid ${statusMsg.type === 'success' ? 'rgba(52, 211, 153, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
              color: statusMsg.type === 'success' ? 'var(--accent-green)' : '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {statusMsg.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
              {statusMsg.text}
            </div>
          )}
        </div>
      )}

      {/* TOP BANNER CARDS: Các thẻ banner hàng ngang chuẩn WuWa Tracker */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {BANNER_CONFIGS.map(banner => {
          const stats = bannerStatsMap[banner.id] || calculateBannerStats(banner.id);
          const isSelected = activeBanner === banner.id;

          return (
            <div
              key={banner.id}
              onClick={() => setActiveBanner(banner.id)}
              className="glass-panel"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '20px',
                borderRadius: '16px',
                cursor: 'pointer',
                border: isSelected 
                  ? `2px solid ${banner.accentColor}` 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                background: isSelected 
                  ? `linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)` 
                  : 'rgba(15, 23, 42, 0.6)',
                boxShadow: isSelected 
                  ? `0 8px 30px ${banner.accentColor}25` 
                  : '0 4px 16px rgba(0, 0, 0, 0.2)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Hình nền mờ góc phải */}
              {banner.image && (
                <div style={{
                  position: 'absolute',
                  right: '-10px',
                  bottom: '-15px',
                  width: '130px',
                  height: '130px',
                  opacity: isSelected ? 0.28 : 0.12,
                  backgroundImage: `url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(20%)',
                  pointerEvents: 'none',
                  transition: 'opacity 0.3s ease'
                }} />
              )}

              {/* Tên Banner & Hard Pity Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isSelected ? banner.accentColor : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {banner.name}
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  background: isSelected ? `${banner.accentColor}20` : 'rgba(255, 255, 255, 0.06)',
                  color: isSelected ? banner.accentColor : 'var(--text-muted)'
                }}>
                  Hard Pity {banner.hardPity}
                </span>
              </div>

              {/* Pity Lớn */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: banner.accentColor, fontFamily: 'monospace', lineHeight: 1 }}>
                  {stats.currentPity}
                </span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  / {banner.hardPity} roll
                </span>

                {/* Badge Bảo Hiểm 50/50 nếu là Banner Nhân Vật */}
                {banner.id === 'character_event' && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: stats.isGuaranteed ? 'rgba(250, 204, 21, 0.2)' : 'rgba(192, 132, 252, 0.2)',
                    color: stats.isGuaranteed ? '#facc15' : '#c084fc',
                    border: `1px solid ${stats.isGuaranteed ? 'rgba(250, 204, 21, 0.4)' : 'rgba(192, 132, 252, 0.3)'}`
                  }}>
                    {stats.isGuaranteed ? 'Bảo Hiểm' : '50/50'}
                  </span>
                )}

                {/* Badge 100% Trúng nếu là Banner Vũ Khí */}
                {banner.id === 'weapon_event' && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.4)'
                  }}>
                    100% Trúng
                  </span>
                )}
              </div>

              {/* Thanh Tiến Trình Progress Bar */}
              <div style={{
                width: '100%',
                height: '7px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '12px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  width: `${Math.min(100, (stats.currentPity / banner.hardPity) * 100)}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${banner.accentColor}, #fff)`,
                  borderRadius: '4px',
                  boxShadow: `0 0 10px ${banner.accentColor}80`,
                  transition: 'width 0.4s ease'
                }} />
              </div>

              {/* Dòng Thống Kê Phụ */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', position: 'relative', zIndex: 1 }}>
                <span>Còn lại: <strong style={{ color: '#fff' }}>{stats.remainingToHardPity}</strong> roll</span>
                <span>4★ Pity: <strong style={{ color: '#c084fc' }}>{stats.fourStarPity}/10</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED DASHBOARD CỦA BANNER ĐANG CHỌN */}
      <div className="glass-panel" style={{
        padding: '28px',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)'
      }}>
        {/* Tiêu đề & Chọn tab con */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '22px',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Bảng Phân Tích Chi Tiết
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '2px 0 0 0' }}>
              {BANNER_CONFIGS.find(b => b.id === activeBanner)?.name || 'Tổng Quan'}
            </h3>
          </div>

          {/* Quick Roll Controls */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addQuickPulls(activeBanner, 1)}
              style={{ padding: '7px 12px', borderRadius: '7px', background: 'rgba(255, 255, 255, 0.07)', fontSize: '0.78rem', fontWeight: 700, color: '#fff', border: '1px solid rgba(255, 255, 255, 0.12)', cursor: 'pointer' }}
            >
              +1 Roll
            </button>
            <button
              onClick={() => addQuickPulls(activeBanner, 10)}
              style={{ padding: '7px 12px', borderRadius: '7px', background: 'rgba(255, 255, 255, 0.07)', fontSize: '0.78rem', fontWeight: 700, color: '#fff', border: '1px solid rgba(255, 255, 255, 0.12)', cursor: 'pointer' }}
            >
              +10 Roll
            </button>
            <button
              onClick={() => addQuickPulls(activeBanner, 1, 4)}
              style={{ padding: '7px 12px', borderRadius: '7px', background: 'rgba(192, 132, 252, 0.18)', color: '#c084fc', fontSize: '0.78rem', fontWeight: 800, border: '1px solid rgba(192, 132, 252, 0.3)', cursor: 'pointer' }}
            >
              +4★ Tím
            </button>
            <button
              onClick={() => addQuickPulls(activeBanner, 1, 5)}
              style={{ padding: '7px 14px', borderRadius: '7px', background: 'rgba(250, 204, 21, 0.18)', color: '#facc15', fontSize: '0.78rem', fontWeight: 900, border: '1px solid rgba(250, 204, 21, 0.35)', cursor: 'pointer' }}
            >
              Nổ 5★ Vàng
            </button>
            <button
              onClick={() => resetBannerPity(activeBanner)}
              title="Đặt lại Pity về 0"
              style={{ padding: '7px 10px', borderRadius: '7px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', fontSize: '0.78rem', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* 4 THẺ THỐNG KÊ CHI TIẾT (BANNER SUMMARY METRICS) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '14px',
          marginBottom: '26px'
        }}>
          {/* Card 1: Pity & Hard Pity */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
              PITY HIỆN TẠI
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#facc15', fontFamily: 'monospace' }}>
                {currentStats.currentPity}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 80 roll</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Còn <strong style={{ color: '#fff' }}>{currentStats.remainingToHardPity}</strong> lượt tới Hard Pity
            </div>
          </div>

          {/* Card 2: Trạng Thái 50/50 */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
              TRẠNG THÁI BẢO HIỂM
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: currentStats.isGuaranteed ? '#facc15' : activeBanner === 'weapon_event' ? '#38bdf8' : '#c084fc' }}>
              {activeBanner === 'weapon_event' 
                ? '100% Trúng Vũ Khí' 
                : currentStats.isGuaranteed 
                ? 'Bảo Hiểm 100%' 
                : 'Tỉ Lệ 50/50'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {activeBanner === 'weapon_event' 
                ? 'Không bao giờ lệch rate vũ khí' 
                : currentStats.isGuaranteed 
                ? 'Lần 5★ kế tiếp chắc chắn trúng banner' 
                : 'Lần 5★ kế tiếp có tỉ lệ 50% trúng banner'}
            </div>
          </div>

          {/* Card 3: Tổng Số Roll & Astrite Đã Dùng */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
              TỔNG SỐ LƯỢT QUAY
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace' }}>
                {currentStats.totalPulls}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>lượt</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Đã tiêu: <strong style={{ color: '#fff' }}>{currentStats.astritesSpent.toLocaleString()}</strong> Astrite
            </div>
          </div>

          {/* Card 4: Vận May 5★ & Tỉ Lệ Thắng 50/50 */}
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>
              VẬN MAY & THỐNG KÊ 5★
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#34d399' }}>
                {currentStats.fiveStarCount} vật phẩm 5★
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {currentStats.avgPity ? `Trung bình ${currentStats.avgPity} roll / 5★` : 'Chưa có đủ dữ liệu'}
              {currentStats.winRate && ` • Thắng 50/50: ${currentStats.winRate}%`}
            </div>
          </div>
        </div>

        {/* 5-STAR TIMELINE SHOWCASE: Dòng Thời Gian Nổ 5★ Đặc Trưng WuWa Tracker */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} color="var(--accent-gold)" />
              Lịch Sử Nổ 5 Sao
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentStats.fiveStarHistory.length} lần nhận được 5★
            </span>
          </div>

          {currentStats.fiveStarHistory.length === 0 ? (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}>
              Chưa có vật phẩm 5★ nào được ghi nhận trong banner này. Hãy bấm <strong>Nổ 5★ Vàng</strong> ở trên hoặc đồng bộ log thực tế!
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '12px'
            }}>
              {currentStats.fiveStarHistory.map((item, idx) => {
                const isWin = item.status === 'won_50_50';
                const isLoss = item.status === 'lost_50_50';
                const isGuaranteedWin = item.status === 'guaranteed_win';

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(15, 23, 42, 0.7) 100%)',
                      border: '1px solid rgba(250, 204, 21, 0.25)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(250, 204, 21, 0.4)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Star size={20} color="#facc15" />
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#facc15', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', background: 'rgba(255, 255, 255, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                          {item.pity} roll
                        </span>

                        {isWin && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#34d399', background: 'rgba(52, 211, 153, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                            Thắng 50/50
                          </span>
                        )}

                        {isLoss && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                            Thua 50/50
                          </span>
                        )}

                        {isGuaranteedWin && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#facc15', background: 'rgba(250, 204, 21, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                            Bảo Hiểm
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.time ? item.time.slice(0, 16) : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FULL PULL HISTORY TABLE: Bảng Nhật Ký Lịch Sử Toàn Diện */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={16} color="var(--accent-gold)" />
              Nhật Ký Chi Tiết Tất Cả Lượt Quay
            </h4>

            {/* Filter chips & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {/* Rarity filter */}
              {[
                { id: 'all', label: 'Tất Cả' },
                { id: '5', label: '5★ Vàng' },
                { id: '4', label: '4★ Tím' },
                { id: '3', label: '3★ Xanh' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => { setHistoryFilterRarity(f.id); setCurrentPage(1); }}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: historyFilterRarity === f.id ? 'rgba(250, 204, 21, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: historyFilterRarity === f.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    border: `1px solid ${historyFilterRarity === f.id ? 'rgba(250, 204, 21, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}

              {/* Search input */}
              <div style={{ position: 'relative' }}>
                <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Tìm tên vật phẩm..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  style={{
                    padding: '5px 10px 5px 30px',
                    borderRadius: '6px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    outline: 'none',
                    width: '140px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.35)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700, width: '60px' }}>#</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Vật Phẩm</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Phân Loại</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Thời Gian</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'right' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {paginatedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      Không có lượt quay nào khớp với bộ lọc.
                    </td>
                  </tr>
                ) : (
                  paginatedHistory.map((item, idx) => {
                    const q = Number(item.quality_level);
                    const is5Star = q === 5;
                    const is4Star = q === 4;
                    const rowNumber = filteredHistory.length - ((currentPage - 1) * itemsPerPage + idx);

                    return (
                      <tr
                        key={item.originalIndex}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                          background: is5Star 
                            ? 'rgba(250, 204, 21, 0.06)' 
                            : is4Star 
                            ? 'rgba(192, 132, 252, 0.04)' 
                            : 'transparent'
                        }}
                      >
                        <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          {rowNumber}
                        </td>

                        <td style={{ padding: '10px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              padding: '2px 7px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 900,
                              background: is5Star ? '#facc15' : is4Star ? '#c084fc' : '#475569',
                              color: is5Star ? '#000' : '#fff'
                            }}>
                              {q}★
                            </span>
                            <span style={{
                              fontWeight: is5Star ? 800 : is4Star ? 700 : 500,
                              color: is5Star ? '#facc15' : is4Star ? '#e9d5ff' : '#cbd5e1'
                            }}>
                              {item.resource_name}
                            </span>
                          </div>
                        </td>

                        <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>
                          {item.resource_type === 'Resonator' ? 'Nhân Vật' : 'Vũ Khí'}
                        </td>

                        <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          {item.time ? item.time.slice(0, 16) : ''}
                        </td>

                        <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => removeRecord(item.originalIndex)}
                            title="Xóa lượt này"
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              padding: '4px'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Phân Trang Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '14px',
              padding: '0 4px'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Hiển thị trang {currentPage} / {totalPages} trong tổng {filteredHistory.length} lượt
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: currentPage === 1 ? 'var(--text-muted)' : '#fff',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: currentPage === totalPages ? 'var(--text-muted)' : '#fff',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
