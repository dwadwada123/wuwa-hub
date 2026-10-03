import { RESONATORS, TEAM_TEMPLATES } from '../data/resonators.js';

/**
 * Tra cứu nhanh thông tin resonator theo ID
 */
export function getResonator(id) {
  return RESONATORS.find(r => r.id === id);
}

/**
 * Điểm sức mạnh meta cá nhân của từng nhân vật theo tier list mới nhất (Prydwen / Game8)
 */
export const RESONATOR_POWER_TIER = {
  // S+ / Tier 0 Core Carry & Buffer
  'shorekeeper': 100,
  'verina': 98,
  'camellya': 97,
  'jinhsi': 97,
  'changli': 95,
  'carlotta': 95,
  'hsin': 95,
  'suoming': 94,
  'xiangli_yao': 94,
  'jiyan': 93,
  'zhezhi': 94,
  'yinlin': 93,
  'cantarella': 92,
  'phoebe': 92,
  'brant': 91,
  'roccia': 90,
  'ciaccona': 90,
  'sanhua': 90,
  'mortefi': 88,
  'rover_havoc': 88,
  'rover_electro': 88,
  'encore': 88,
  'danjin': 84,
  'calcharo': 82,
  'jianxin': 80,
  'rover_spectro': 80,
  'youhu': 79,
  'baizhi': 78,
  'yuanwu': 78,
  'chixia': 76,
  'buling': 76,
  'lumi': 75,
  'yangyang': 74,
  'aalto': 74,
  'taoqi': 72,
  'lingyang': 72,
  'rover_aero': 70,
  // Resonators Bổ Sung
  'cartethyia': 96,
  'phrolova': 96,
  'augusta': 95,
  'jingran': 95,
  'yangyang_xuanling': 94,
  'chisa': 94,
  'zani': 94,
  'lupa': 94,
  'iuno': 94,
  'qiuyuan': 93,
  'lucilla': 93,
  'lynae': 93,
  'mornye': 93,
  'aemeath': 93,
  'qingxiao': 93,
  'galbrena': 93,
  'luuk_herssen': 93,
  'sigrika': 92,
  'hiyuki': 92,
  'denia': 91,
  'lucy': 92,
  'rebecca': 92,
  'suisui': 90
};

// Danh sách các nhân vật đảm nhiệm vai trò hồi phục / tạo lá chắn chân chính (Sustain / Healer / Shielder)
// Danh sách các nhân vật đảm nhiệm vai trò hồi phục / tạo lá chắn chân chính (Sustain / Healer / Shielder)
export const TRUE_SUSTAIN_IDS = new Set([
  'shorekeeper', 'verina', 'baizhi', 'youhu', 'jianxin', 'taoqi', 'buling', 'suisui', 'denia', 'lucilla', 'mornye'
]);

// Bảng ánh xạ hình ảnh chuẩn của các Echo 4-Cost và Echo chủ lực
export const ECHO_IMAGE_MAP = {
  'Bell-Borne Geochelone': 'https://wutheringlab.com/wp-content/uploads/Bell-Borne-Geochelone.webp',
  'Fallacy of No Return': 'https://wutheringlab.com/wp-content/uploads/Fallacy-of-No-Return.webp',
  'Impermanence Heron': 'https://wutheringlab.com/wp-content/uploads/Impermanence-Heron.webp',
  'Dreamless': 'https://wutheringlab.com/wp-content/uploads/Dreamless.webp',
  'Crownless': 'https://wutheringlab.com/wp-content/uploads/Crownless.webp',
  'Jué': 'https://wutheringlab.com/wp-content/uploads/Jue.webp',
  'Jue': 'https://wutheringlab.com/wp-content/uploads/Jue.webp',
  'Mourning Aix': 'https://wutheringlab.com/wp-content/uploads/Mourning-Aix.webp',
  'Lampylumen Myriad': 'https://wutheringlab.com/wp-content/uploads/Lampylumen-Myriad.webp',
  'Inferno Rider': 'https://wutheringlab.com/wp-content/uploads/Inferno-Rider.webp',
  'Nightmare Inferno Rider': 'https://wutheringlab.com/wp-content/uploads/Nightmare-Inferno-Rider.webp',
  'Feilian Beringal': 'https://wutheringlab.com/wp-content/uploads/Feilian-Beringal.webp',
  'Thundering Mephis': 'https://wutheringlab.com/wp-content/uploads/Thundering-Mephis.webp',
  'Tempest Mephis': 'https://wutheringlab.com/wp-content/uploads/Tempest-Mephis.webp',
  'Mech Abomination': 'https://wutheringlab.com/wp-content/uploads/Mech-Abomination.webp',
  'Lorelei': 'https://wutheringlab.com/wp-content/uploads/Lorelei.webp',
  'Sentry Construct': 'https://wutheringlab.com/wp-content/uploads/Sentry-Construct.webp',
  'Chasm Guardian': 'https://wutheringlab.com/wp-content/uploads/Chasm-Guardian.webp',
  'Violet-Feathered Heron': 'https://wutheringlab.com/wp-content/uploads/Violet-Feathered-Heron.webp',
  'Havoc Dreadmane': 'https://wutheringlab.com/wp-content/uploads/Havoc-Dreadmane.webp',
  'Glacio Dreadmane': 'https://wutheringlab.com/wp-content/uploads/Glacio-Dreadmane.webp'
};

export function getEchoImage(echoName) {
  if (!echoName) return 'https://wutheringlab.com/wp-content/uploads/Bell-Borne-Geochelone.webp';
  const clean = echoName.toLowerCase();
  for (const [key, url] of Object.entries(ECHO_IMAGE_MAP)) {
    if (clean.includes(key.toLowerCase()) || key.toLowerCase().includes(clean)) {
      return url;
    }
  }
  return 'https://wutheringlab.com/wp-content/uploads/Bell-Borne-Geochelone.webp';
}

/**
 * Trả về thông số chỉ số chuẩn khuyến nghị (Target Benchmark Stats) và hướng dẫn build Echo/Vũ khí
 * dựa trên cơ chế scalers thực tế của từng nhân vật
 */
export function getResonatorBuildGuide(resonator) {
  if (!resonator) return null;

  const id = resonator.id;
  const isHealer = TRUE_SUSTAIN_IDS.has(id);
  const element = resonator.element || 'Spectro';

  // 1. Shorekeeper (HP Scaler & Universal Crit Buffer)
  if (id === 'shorekeeper') {
    return {
      statType: 'HP Scaler',
      echoImage: ECHO_IMAGE_MAP['Fallacy of No Return'],
      targetStats: {
        primaryLabel: 'HP Tối Đa',
        primaryValue: '35,000 - 38,000+',
        critRate: 'Không yêu cầu',
        critDmg: 'Không yêu cầu',
        energyRegen: '170% - 190%'
      },
      bestEchoSet: '5-pc Rejuvenating Glow',
      mainEcho4Cost: 'Fallacy of No Return',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu hoặc HP%',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + Hiệu Quả Nạp Năng Lượng%',
        cost1: 'HP% + HP%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'HP%', 'HP Cố Định', 'Kháng Sát Thương'],
      recommendedWeapons: [
        'Stellar Symphony (Trấn 5★)',
        'Variation (4★ Nạp Concerto Tối Ưu)',
        'Rectifier of Voyager (3★ Nạp F2P)'
      ]
    };
  }

  // 2. Verina (ATK Scaler Healer & Universal Buffer)
  if (id === 'verina') {
    return {
      statType: 'ATK Scaler',
      echoImage: ECHO_IMAGE_MAP['Bell-Borne Geochelone'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,000 - 2,200+',
        critRate: 'Cơ bản',
        critDmg: 'Cơ bản',
        energyRegen: '160% - 175%'
      },
      bestEchoSet: '5-pc Rejuvenating Glow',
      mainEcho4Cost: 'Bell-Borne Geochelone',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + Hiệu Quả Nạp Năng Lượng%',
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'Tấn Công%', 'Tấn Công Cố Định'],
      recommendedWeapons: [
        'Variation (4★ Nạp Concerto Thần Tốc)',
        'Cosmic Ripples (5★ Chuẩn)',
        'Rectifier of Voyager (3★ F2P)'
      ]
    };
  }

  // 3. Baizhi (HP Scaler Healer)
  if (id === 'baizhi') {
    return {
      statType: 'HP Scaler',
      echoImage: ECHO_IMAGE_MAP['Bell-Borne Geochelone'],
      targetStats: {
        primaryLabel: 'HP Tối Đa',
        primaryValue: '32,000 - 36,000+',
        critRate: 'Cơ bản',
        critDmg: 'Cơ bản',
        energyRegen: '160% - 180%'
      },
      bestEchoSet: '5-pc Rejuvenating Glow',
      mainEcho4Cost: 'Bell-Borne Geochelone',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + HP%',
        cost1: 'HP% + HP%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'HP%', 'HP Cố Định'],
      recommendedWeapons: ['Variation (4★)', 'Rectifier of Voyager (3★)']
    };
  }

  // 4. Mornye (5★ Fusion Broadblade Sustain & Shield)
  if (id === 'mornye') {
    return {
      statType: 'Sustain / Hồi Phục & Bảo Hộ',
      echoImage: ECHO_IMAGE_MAP['Bell-Borne Geochelone'],
      targetStats: {
        primaryLabel: 'HP Tối Đa',
        primaryValue: '32,000 - 36,000+',
        critRate: 'Cơ bản',
        critDmg: 'Cơ bản',
        energyRegen: '160% - 175%'
      },
      bestEchoSet: '5-pc Rejuvenating Glow',
      mainEcho4Cost: 'Bell-Borne Geochelone',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu hoặc HP%',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + HP%',
        cost1: 'HP% + HP%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'HP%', 'HP Cố Định', 'Phòng Ngự%'],
      recommendedWeapons: [
        'Broadblade#41 (4★ Nạp Concerto)',
        'Discord (4★)',
        'Originite: Type IV (3★ Hồi Máu Toàn Đội)'
      ]
    };
  }

  // 5. Taoqi / Yuanwu (DEF Scaler Shielder)
  if (id === 'taoqi' || id === 'yuanwu') {
    return {
      statType: 'DEF Scaler',
      echoImage: ECHO_IMAGE_MAP['Bell-Borne Geochelone'],
      targetStats: {
        primaryLabel: 'Phòng Ngự',
        primaryValue: '2,500 - 2,900+',
        critRate: id === 'yuanwu' ? '60%+' : 'Cơ bản',
        critDmg: '200%+',
        energyRegen: '135% - 150%'
      },
      bestEchoSet: id === 'taoqi' ? '5-pc Moonlit Clouds' : '5-pc Rejuvenating Glow',
      mainEcho4Cost: 'Bell-Borne Geochelone',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Phòng Ngự% hoặc Tỉ Lệ Bạo Kích',
        cost3: 'Hiệu Quả Nạp% + Phòng Ngự%',
        cost1: 'Phòng Ngự% + Phòng Ngự%'
      },
      subStatsPriority: ['Phòng Ngự%', 'Hiệu Quả Nạp', 'Phòng Ngự Cố Định', 'Tỉ Lệ Bạo Kích'],
      recommendedWeapons: [
        id === 'taoqi' ? 'Discord (4★ Hồi Concerto)' : 'Originite: Type IV (3★ Hồi Máu Toàn Đội)'
      ]
    };
  }

  // 6. Hsin (5★ Electro Rectifier Sentinel - Main DPS)
  if (id === 'hsin') {
    return {
      statType: 'Main Carry DPS (Unison)',
      echoImage: ECHO_IMAGE_MAP['Thundering Mephis'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,150 - 2,400+',
        critRate: '72% - 80%+',
        critDmg: '260% - 290%+',
        energyRegen: '120% - 130%'
      },
      bestEchoSet: '5-pc Heart of Sworn Vigil',
      mainEcho4Cost: 'Thundering Mephis',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích',
        cost3: 'Sát Thương Electro% + Sát Thương Electro%',
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: [
        'Tỉ Lệ Bạo Kích',
        'Sát Thương Bạo Kích',
        'Tấn Công%',
        'Hiệu Quả Nạp Năng Lượng',
        'Sát Thương Kỹ Năng Cộng Hưởng'
      ],
      recommendedWeapons: [
        'Blooming Jadehaven (Trấn 5★)',
        'Cosmic Ripples (5★ Chuẩn)',
        'Augment (4★ Battlepass)'
      ]
    };
  }

  // 7. Suoming (5★ Electro Sword - Sub-DPS / Unison Buffer)
  if (id === 'suoming') {
    return {
      statType: 'Sub-DPS / Khuếch Đại Unison',
      echoImage: ECHO_IMAGE_MAP['Tempest Mephis'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,000 - 2,250+',
        critRate: '70% - 78%+',
        critDmg: '240% - 270%+',
        energyRegen: '130% - 145%'
      },
      bestEchoSet: '5-pc Void Thunder',
      mainEcho4Cost: 'Tempest Mephis',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích',
        cost3: 'Sát Thương Electro% + Sát Thương Electro%',
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: [
        'Tỉ Lệ Bạo Kích',
        'Sát Thương Bạo Kích',
        'Hiệu Quả Nạp Năng Lượng',
        'Tấn Công%',
        'Sát Thương Giải Phóng Cộng Hưởng'
      ],
      recommendedWeapons: [
        "Thunder's Horizon (Trấn 5★)",
        'Emerald of Genesis (5★ Chuẩn)',
        'Commando of Conviction (4★)'
      ]
    };
  }

  // 8. Lucy (5★ Spectro Pistols - Main DPS)
  if (id === 'lucy') {
    return {
      statType: 'Main Carry DPS (Spectro)',
      echoImage: ECHO_IMAGE_MAP['Jué'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,100 - 2,350+',
        critRate: '70% - 78%+',
        critDmg: '250% - 280%+',
        energyRegen: '120% - 130%'
      },
      bestEchoSet: '5-pc Celestial Light',
      mainEcho4Cost: 'Jué',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích',
        cost3: 'Sát Thương Spectro% + Sát Thương Spectro%',
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: [
        'Tỉ Lệ Bạo Kích',
        'Sát Thương Bạo Kích',
        'Tấn Công%',
        'Hiệu Quả Nạp Năng Lượng',
        'Sát Thương Đánh Thường & Trọng Kích'
      ],
      recommendedWeapons: [
        'Static Mist (5★ Chuẩn)',
        'Novaburst (4★ Battlepass)',
        'Cadenza (4★)'
      ]
    };
  }

  // 9. Buffer / Sub-DPS (Sanhua, Zhezhi, Yinlin, Mortefi, Danjin, Ciaccona, Roccia)
  const isBufferSubDPS = resonator.role.includes('Sub-DPS') || resonator.role.includes('Buffer') || resonator.tags.includes('Buffer');
  if (isBufferSubDPS) {
    return {
      statType: 'Sub-DPS / Buffer',
      echoImage: ECHO_IMAGE_MAP['Impermanence Heron'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '1,900 - 2,150+',
        critRate: '68% - 75%+',
        critDmg: '230% - 260%+',
        energyRegen: '130% - 145%+'
      },
      bestEchoSet: '5-pc Moonlit Clouds',
      mainEcho4Cost: 'Impermanence Heron',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích',
        cost3: `Sát Thương ${element}% + Sát Thương ${element}%`,
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: ['Tỉ Lệ Bạo Kích', 'Sát Thương Bạo Kích', 'Hiệu Quả Nạp Năng Lượng', 'Tấn Công%', 'Tấn Công Cố Định'],
      recommendedWeapons: [
        resonator.bestWeapon || 'Vũ khí 5★ Chuẩn / Signature',
        'Vũ khí 4★ có dòng Nạp Concerto hoặc Tỉ lệ Bạo kích'
      ]
    };
  }

  // 10. Main DPS Chuẩn (Camellya, Jinhsi, Changli, Carlotta, Jiyan, Xiangli Yao, Rover Havoc, Rover Electro, Luuk Herssen, etc.)
  let mainEchoName = 'Echo Trùm 4-Cost';
  let mainEchoImg = ECHO_IMAGE_MAP['Crownless'];
  if (element === 'Havoc') {
    mainEchoName = 'Dreamless';
    mainEchoImg = ECHO_IMAGE_MAP['Dreamless'];
  } else if (element === 'Spectro') {
    mainEchoName = 'Jué';
    mainEchoImg = ECHO_IMAGE_MAP['Jué'];
  } else if (element === 'Glacio') {
    mainEchoName = 'Lampylumen Myriad';
    mainEchoImg = ECHO_IMAGE_MAP['Lampylumen Myriad'];
  } else if (element === 'Fusion') {
    mainEchoName = 'Inferno Rider';
    mainEchoImg = ECHO_IMAGE_MAP['Inferno Rider'];
  } else if (element === 'Aero') {
    mainEchoName = 'Feilian Beringal';
    mainEchoImg = ECHO_IMAGE_MAP['Feilian Beringal'];
  } else if (element === 'Electro') {
    mainEchoName = 'Thundering Mephis';
    mainEchoImg = ECHO_IMAGE_MAP['Thundering Mephis'];
  }

  return {
    statType: 'Main Carry DPS',
    echoImage: mainEchoImg,
    targetStats: {
      primaryLabel: 'Tấn Công',
      primaryValue: '2,100 - 2,350+',
      critRate: '70% - 78%+',
      critDmg: '250% - 280%+',
      energyRegen: '120% - 130%'
    },
    bestEchoSet: resonator.bestEchoSet || `5-pc Nguyên Tố ${element}`,
    mainEcho4Cost: mainEchoName,
    costStructure: '4 - 3 - 3 - 1 - 1',
    mainStats: {
      cost4: 'Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích',
      cost3: `Sát Thương ${element}% + Sát Thương ${element}%`,
      cost1: 'Tấn Công% + Tấn Công%'
    },
    subStatsPriority: [
      'Tỉ Lệ Bạo Kích',
      'Sát Thương Bạo Kích',
      'Tấn Công%',
      'Hiệu Quả Nạp Năng Lượng',
      'Sát Thương Kỹ Năng / Giải Phóng Cộng Hưởng'
    ],
    recommendedWeapons: [
      resonator.bestWeapon || 'Vũ khí Trấn 5★',
      'Vũ khí 5★ Chuẩn (Emerald of Genesis / Ages of Harvest / Cosmic Ripples)',
      'Vũ khí 4★ Battlepass (Autumntrace / Novaburst / Lumingloss)'
    ]
  };
}

/**
 * Xây dựng chuỗi Rotation Tiêu Chuẩn đầy đủ, chi tiết và chính xác từng bước xuất chiêu cho đội hình
 */
function buildDetailedStandardRotation(mainDps, buffer, sustain) {
  const mName = mainDps?.name || 'Main DPS';
  const bName = buffer?.name || 'Sub-DPS / Buffer';
  const sName = sustain?.name || 'Sustain / Healer';
  const mId = mainDps?.id || '';

  // 1. Bước 1: Sustain / Healer
  let sEcho = 'Bell-Borne Geochelone (Tạo khiên chắn giảm 50% sát thương và tăng 12% ATK)';
  if (sustain?.id === 'shorekeeper') {
    sEcho = 'Fallacy of No Return (Kích hoạt Stella Field buff 10% ATK & tăng 10% Energy Regen)';
  } else if (sustain?.id === 'mornye') {
    sEcho = 'Bell-Borne Geochelone (Kích hoạt lá chắn dung nham giảm 50% sát thương)';
  }

  const step1 = {
    step: 1,
    char: sName,
    roleTitle: 'Sustain / Healer • Khởi Động Sàn Đấu',
    tokens: ['E', 'R (Liberation)', 'Echo', 'Outro'],
    actionText: `Ra sân đầu tiên ➔ Tung Resonance Skill (E) và bật Resonance Liberation (R) mở vùng hồi phục & buff công toàn đội ➔ Kích hoạt ${sEcho} ➔ Thực hiện đòn đánh thường/trọng kích tích đầy 100% thanh Concerto ➔ Kích hoạt Outro Skill buff 15% All-Type DMG Deepen cho đồng minh tiếp theo.`
  };

  // 2. Bước 2: Sub-DPS / Buffer
  let bufferDetail = `Intro nhận buff từ Sustain ➔ Dùng Skill E và Resonance Liberation (R) ➔ Bật Echo Sonata Moonlit Clouds (Impermanence Heron) khuếch đại 12% ATK ➔ Kích hoạt cơ chế Forte tích thần tốc 100% thanh Concerto ➔ Outro truyền buff chuyên biệt cho ${mName}.`;
  
  if (buffer?.id === 'suoming') {
    bufferDetail = `Intro vào sân nhận buff từ Sustain ➔ Tung Skill E chuyển đổi thế kiếm Azure Surge ➔ Tích nạp Concerto nhanh ➔ Bật Impermanence Heron ➔ Outro truyền Lôi Vũ Đồng Điệu nạp 25% Concerto và tăng cường sát thương Lôi cho ${mName}.`;
  } else if (buffer?.id === 'rebecca') {
    bufferDetail = `Intro vào sân ➔ Tung đòn súng điện Overdrive E ➔ Bấm R kích hoạt điện thế nạp đầy Concerto ➔ Bật Heron Echo ➔ Outro buff sát thương cho ${mName}.`;
  } else if (buffer?.id === 'sanhua') {
    bufferDetail = `Intro vào sân ➔ Skill (E) giáng băng ➔ Liberation (R) tạo vết nứt băng ➔ Giữ Trọng Kích Detonate căn đúng thanh chuẩn nổ toàn bộ sông băng ➔ Bật Heron Echo ➔ Outro truyền trọn vẹn 38% Basic ATK DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'zhezhi') {
    bufferDetail = `Intro vào sân nhận buff ➔ E ➔ R triệu hồi linh hồn mực vẽ bắn đòn phối hợp ➔ Chuỗi đánh thường lướt bút nạp đầy thanh Concerto ➔ Bật Heron Echo ➔ Outro buff 20% Glacio DMG và 25% Resonance Skill DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'yinlin') {
    bufferDetail = `Intro nhận buff ➔ E ➔ R triệu hồi sấm sét trừng phạt ➔ Bật Heron Echo ➔ Đánh thường tích đầy Judgment Point giáng sét diện rộng ➔ Outro truyền 20% Electro DMG và 25% Resonance Liberation DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'mortefi') {
    bufferDetail = `Intro vào sân ➔ E ➔ Bấm R kích hoạt rồng lửa Burning Rhapsody bắn theo mỗi đòn đánh của đồng minh ➔ Bật Heron Echo ➔ Outro truyền 38% Heavy Attack DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'danjin') {
    bufferDetail = `Intro nhận buff ➔ Tung chuỗi Skill E rút máu tích đầy thanh Ruby Blossom ➔ Trọng kích xoay kiếm tiêu hao máu nạp đầy Concerto ➔ Outro buff 23% Havoc DMG Deepen cho ${mName}.`;
  }

  const step2 = {
    step: 2,
    char: bName,
    roleTitle: 'Sub-DPS / Buffer • Nạp Concerto & Truyền Trao Deepen',
    tokens: ['Intro', 'E', 'R', 'Forte Burst', 'Heron Echo', 'Outro'],
    actionText: bufferDetail
  };

  // 3. Bước 3: Main DPS Burst Window
  let dpsDetail = `Intro vào sân thừa hưởng toàn bộ hiệu ứng Deepen trong 14 giây ➔ Kích hoạt thế đánh cường hóa Forte đặc trưng ➔ Tung Skill E nạp đầy thanh năng lượng ➔ Bật Echo chủ lực (4-Cost) ➔ Xả Resonance Liberation (R) nộ dứt điểm toàn bộ kẻ địch ➔ Hoàn tất chuỗi và chuẩn bị lặp lại vòng xoay.`;

  if (mId === 'hsin') {
    dpsDetail = `Intro vào sân nhận trọn vẹn buff Unison và Deepen ➔ Kích hoạt Skill E ở thể Lôi Cường Hóa (Electro Flare) ➔ Xả Resonance Liberation (R) nộ dứt điểm bão sét diện rộng ➔ Đánh thường cường hóa hoàn tất chuỗi sát thương.`;
  } else if (mId === 'lucy') {
    dpsDetail = `Intro vào sân nhận buff ➔ Kích hoạt trạng thái Starlight Hack ➔ Tung chuỗi đạn Spectro định hướng cường hóa liên hoàn ➔ Xả Resonance Liberation (R) pháo sáng quét sạch sàn đấu.`;
  } else if (mId === 'camellya') {
    dpsDetail = `Đột kích bằng Intro nhận 38% Basic ATK Deepen từ Sanhua ➔ Giữ Trọng Kích vào trạng thái Ephemeral nhào lộn trên không ➔ Xả chuỗi đánh thường BA4 roi gai xoay tròn liên hoàn ➔ Nhấn E kích hoạt nổ hạt giống gai ➔ Bấm R tung nộ bão hoa bóng tối xóa sổ toàn bộ sàn đấu.`;
  } else if (mId === 'jinhsi') {
    dpsDetail = `Intro vào sân nhận đòn Coordinated Attack từ Buffer ➔ Lướt Skill E vào trạng thái Incarnation ➔ Tung chuỗi kiếm rồng tích đầy 50 tầng Incandescence ➔ Bấm R xả nộ sấm sét Thanh Long ➔ Giữ phím E kích hoạt đòn Illuminous Dragon nuke hàng triệu sát thương diện rộng.`;
  } else if (mId === 'changli') {
    dpsDetail = `Intro vào sân ➔ Tung đòn đánh thường BA4 nạp 2 tầng Enflamement ➔ Bấm E (True Sight: Charge) lướt kiếm ➔ Nối tiếp BA (True Sight: Conquest) tích đủ 4 tầng ➔ Giữ Trọng Kích Flaming Sacrifice giáng bão kiếm lửa cực đại ➔ Bấm R xả nộ Radiance of Feathers thiêu rụi đối thủ.`;
  } else if (mId === 'jiyan') {
    dpsDetail = `Intro vào sân nhận 38% Heavy Attack Deepen từ Mortefi ➔ Bấm R kích hoạt trạng thái Thanh Long hóa thần ➔ Giữ Trọng Kích tung thương rồng lốc xoáy liên tục hất tung và quét sạch quái vật trong 10 giây hiệu lực.`;
  } else if (mId === 'carlotta') {
    dpsDetail = `Intro nhận buff Băng ➔ Nhấn Skill E nạp đạn Shotgun ➔ Xả 3 phát đạn băng tỏa rộng nát giáp đối thủ ➔ Bấm R nộ bắn pháo đại bác đóng băng và tiêu diệt hoàn toàn kẻ địch.`;
  } else if (mId === 'xiangli_yao') {
    dpsDetail = `Intro nhận 20% Electro và 25% Liberation Deepen từ Yinlin ➔ Bấm R mở không gian Cogitation Horizon ➔ Liên tục bấm E cường hóa tung nắm đấm công nghệ ➔ Kết liễu bằng cú đấm nổ hạt nhân cuối cùng.`;
  } else if (mId === 'rover_havoc') {
    dpsDetail = `Intro nhận 23% Havoc Deepen từ Danjin ➔ Giữ Trọng kích vào trạng thái Dark Surge ➔ Xả chuỗi kiếm bóng tối cường hóa ➔ Bấm R tung nộ lưỡi hái Dead Realm ➔ Triệu hồi Dreamless Echo bổ xuống nổ 50% sát thương gia tăng.`;
  } else if (mId === 'rover_electro') {
    dpsDetail = `Intro nhận buff Electro & Liberation từ Buffer ➔ Bật Skill E lôi kiếm chém quét tích đầy Forte ➔ Bấm R nộ giáng bão sét Lôi Minh Trảm ➔ Bật Echo Thundering Mephis càn quét toàn sàn đấu.`;
  } else if (mId === 'luuk_herssen') {
    dpsDetail = `Intro nhận buff Glacio & Basic ATK từ Sanhua ➔ Tung Skill E trảm kích băng giá tích lũy Forte ➔ Giữ Trọng Kích chém kiếm ánh sáng hàn băng ➔ Bấm R tung nộ đại kiếm băng phá hủy boss.`;
  }

  const step3 = {
    step: 3,
    char: mName,
    roleTitle: `Main DPS (${mName}) • Cửa Sổ Dồn Sát Thương Cực Đại`,
    tokens: ['Intro', 'Forte Stance', 'E', 'Echo Trùm', 'R (Liberation Nuke)'],
    actionText: dpsDetail
  };

  return [step1, step2, step3];
}

/**
 * Tự động tìm kiếm và đề xuất các đội hình tối ưu dựa trên kho nhân vật người dùng đang có.
 * ĐẢM BẢO QUY TẮC KHÔNG TRÙNG NHÂN VẬT:
 * 1. Đội hình Meta Templates được ưu tiên hàng đầu.
 * 2. Đội hình luôn tuân thủ cấu trúc chuẩn: 1 Main DPS + 1 Buffer + 1 Sustain/Healer.
 * 3. Tuyệt đối KHÔNG ghép 2 Healer trong cùng 1 đội (Shorekeeper và Verina không bao giờ đi chung).
 * 4. Luuk Herssen là Main DPS (Glacio Broadblade), không bao giờ bị xếp vào vị trí Sustain.
 *
 * @param {Array<string>} ownedCharacterIds - Danh sách ID nhân vật người dùng tick chọn
 * @returns {Array} - Danh sách đội hình không trùng lặp nhân vật
 */
export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 3) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTemplates = [];
  const seenTeamKeys = new Set();

  // 1. Thu thập tất cả các Template Meta định nghĩa sẵn mà người dùng sở hữu đủ
  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      const key = [...template.members].sort().join('-');
      seenTeamKeys.add(key);
      const chars = template.members.map(id => getResonator(id)).filter(Boolean);

      // Điểm ưu tiên cao cho Template chính thức (130 - 150 điểm để luôn ăn đứt custom team)
      let baseScore = template.tier === 'T0' ? 140 : template.tags?.includes('Tier 0') ? 135 : 125;
      const avgPower = chars.reduce((sum, c) => sum + (RESONATOR_POWER_TIER[c.id] || 75), 0) / (chars.length || 1);
      const compositeScore = Math.round(baseScore * 0.6 + avgPower * 0.4);

      const mainChar = chars[0];
      const buffChar = chars[1];
      const sustainChar = chars[2];

      matchedTemplates.push({
        ...template,
        isCustom: false,
        matchScore: compositeScore,
        characters: chars,
        customRotations: {
          standard: buildDetailedStandardRotation(mainChar, buffChar, sustainChar)
        }
      });
    }
  }

  // 2. Thuật toán tự sinh đội hình linh hoạt (Dynamic Heuristic Team Building)
  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  
  // Phân loại vai trò chuẩn xác
  const mainDPSList = ownedResonators.filter(r => 
    !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Main') || r.role.includes('Burst') || r.tags.includes('Main DPS'))
  );
  
  const bufferList = ownedResonators.filter(r => 
    !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Sub-DPS') || r.role.includes('Buffer') || r.tags.includes('Buffer') || r.role.includes('Coordinated'))
  );
  
  const healerList = ownedResonators.filter(r => TRUE_SUSTAIN_IDS.has(r.id));

  // Fallback danh sách phòng thủ nếu người dùng thiếu healer thuần
  const defensiveFallbackList = ownedResonators.filter(r => 
    TRUE_SUSTAIN_IDS.has(r.id) || r.role.includes('Support') || r.role.includes('Shielder')
  );
  const sustainPool = healerList.length > 0 ? healerList : defensiveFallbackList.length > 0 ? defensiveFallbackList : ownedResonators;

  const customTeams = [];

  for (const dps of mainDPSList) {
    for (const buff of bufferList) {
      if (buff.id === dps.id) continue;

      for (const flex of sustainPool) {
        if (flex.id === dps.id || flex.id === buff.id) continue;

        // BẮT BUỘC: Không bao giờ được có 2 Healer trong cùng 1 đội
        const healerCount = [dps.id, buff.id, flex.id].filter(id => TRUE_SUSTAIN_IDS.has(id)).length;
        if (healerCount > 1) continue;

        // BẮT BUỘC: Camellya không bao giờ đi cùng Luuk Herssen
        if ((dps.id === 'camellya' && buff.id === 'luuk_herssen') || (dps.id === 'luuk_herssen' && buff.id === 'camellya')) continue;

        const teamKey = [dps.id, buff.id, flex.id].sort().join('-');
        if (seenTeamKeys.has(teamKey)) continue;

        let synergyScore = 70;
        let notes = `Đội hình linh hoạt với core ${dps.name}`;

        // Kiểm tra tính tương thích Concerto/Outro Deepen đặc hữu
        if (dps.id === 'camellya' && buff.id === 'sanhua') {
          synergyScore += 32;
          notes = 'Sanhua Outro buff 38% Basic ATK cực hợp thế roi gai của Camellya';
        } else if (dps.id === 'jinhsi' && (buff.id === 'zhezhi' || buff.id === 'yuanwu' || buff.id === 'yinlin')) {
          synergyScore += 30;
          notes = `${buff.name} kích hoạt đòn Coordinated Attack nạp 50 tầng Incandescence thần tốc cho Jinhsi`;
        } else if (dps.id === 'jiyan' && (buff.id === 'mortefi' || buff.id === 'ciaccona')) {
          synergyScore += 30;
          notes = `${buff.name} buff Heavy Attack / Aero Erosion khuếch đại Thanh Long Jiyan`;
        } else if (dps.id === 'carlotta' && (buff.id === 'zhezhi' || buff.id === 'sanhua')) {
          synergyScore += 28;
          notes = `${buff.name} tối ưu hóa sát thương Shotgun Băng của Carlotta`;
        } else if (dps.id === 'luuk_herssen' && (buff.id === 'sanhua' || buff.id === 'zhezhi')) {
          synergyScore += 29;
          notes = `${buff.name} gia tăng tốc độ và sát thương đại kiếm băng giá của Luuk Herssen`;
        } else if (dps.id === 'xiangli_yao' && (buff.id === 'yinlin' || buff.id === 'jianxin')) {
          synergyScore += 29;
          notes = `${buff.name} buff Electro & Liberation biến cú đấm của Xiangli Yao thành sát thương cực đại`;
        } else if (dps.id === 'rover_havoc' && buff.id === 'danjin') {
          synergyScore += 28;
          notes = 'Danjin Outro buff 23% Havoc DMG Deepen cho thanh kiếm Dark Surge của Rover Havoc';
        } else if (dps.id === 'rover_electro' && (buff.id === 'yinlin' || buff.id === 'sanhua')) {
          synergyScore += 28;
          notes = `${buff.name} khuếch đại đòn chém sấm sét Lôi Minh Trảm của Rover Electro`;
        }

        // Điểm cộng nếu có Sustain xịn
        if (flex.id === 'shorekeeper' || flex.id === 'verina') {
          synergyScore += 8;
        }

        const avgPower = ((RESONATOR_POWER_TIER[dps.id] || 75) + (RESONATOR_POWER_TIER[buff.id] || 75) + (RESONATOR_POWER_TIER[flex.id] || 75)) / 3;
        const totalScore = Math.min(100, Math.round(synergyScore * 0.55 + avgPower * 0.45));

        seenTeamKeys.add(teamKey);
        customTeams.push({
          id: `custom-${teamKey}`,
          name: `${dps.name} + ${buff.name} Synergy`,
          core: dps.id,
          members: [dps.id, buff.id, flex.id],
          type: 'Hypercarry',
          description: notes,
          tags: [dps.element, 'Synergy Match'],
          isCustom: true,
          matchScore: totalScore,
          characters: [dps, buff, flex],
          customRotations: {
            standard: buildDetailedStandardRotation(dps, buff, flex)
          }
        });
      }
    }
  }

  // Sắp xếp: Matched Templates lên đầu tiên (ưu tiên tuyệt đối các đội hình chuẩn meta), sau đó mới tới Custom Teams
  matchedTemplates.sort((a, b) => b.matchScore - a.matchScore);
  customTeams.sort((a, b) => b.matchScore - a.matchScore);

  const allCandidates = [...matchedTemplates, ...customTeams];

  // 3. LỌC ĐỘI HÌNH KHÔNG TRÙNG LẶP BẤT KỲ NHÂN VẬT NÀO
  const nonOverlappingTeams = [];
  const globallyUsedCharacters = new Set();

  for (const team of allCandidates) {
    const hasOverlap = team.members.some(memberId => globallyUsedCharacters.has(memberId));
    if (!hasOverlap) {
      nonOverlappingTeams.push(team);
      team.members.forEach(memberId => globallyUsedCharacters.add(memberId));
    }
  }

  return nonOverlappingTeams;
}

/**
 * Dữ liệu Tower of Adversity (ToA) Season 3.7
 * Chuẩn xác luật Stamina / Thể Lực Wuthering Waves:
 * - Tháp Giữa (Hazard Tower): 4 Tầng, mỗi tầng tiêu hao đúng 5 THỂ LỰC (Stamina) mỗi nhân vật!
 *   Mỗi nhân vật chỉ có tối đa 10 Thể Lực -> Bắt buộc cần 2 đội hình độc lập (Tầng 1-2 & Tầng 3-4)!
 *   - Tầng 3 & 4 (Boss): ƯU TIÊN ĐỘI HÌNH TẬN DỤNG TỐI ĐA BUFF THÁP MÙA 3.7!
 *   - Tầng 1 & 2: Ưu tiên đội hình khắc chế hệ.
 * - 2 Tháp Bên (Tháp Trái & Tháp Phải): 4 Tầng mỗi tháp (Tầng 1: 1 Vigor, Tầng 2: 2 Vigor, Tầng 3: 3 Vigor, Tầng 4: 4 Vigor).
 */
export const TOA_DATA_SEASON_37 = {
  seasonName: 'Mùa 3.7 (Tower of Adversity)',
  seasonPeriod: '01/10/2026 - 31/10/2026',
  
  // 1. THÁP GIỮA (Hazard Tower)
  hazardTower: {
    id: 'hazard',
    name: 'Hazard Tower (Tháp Hiểm Họa - Giữa)',
    vigorCostPerFloor: 5,
    maxVigorPerCharacter: 10,
    recommendedElement: 'Electro / Unison',
    towerBuff: '+30% Electro & Liberation DMG, +15% ATK khi kích hoạt Unison',
    bossFloors: {
      name: 'Tầng 3 & 4 (Đỉnh Điểm Boss)',
      vigorCost: 10, // 5 + 5 = 10 Vigor
      priorityStrategy: 'Ưu tiên Đội Hình Tận Dụng Tối Đa Buff Tháp (+30% Liberation DMG & Unison)',
      floors: [
        { floor: 3, name: 'Tầng 3 (Lv 95)', boss: 'Crownless (Hóa Thân)', vigorCost: 5, difficulty: 'Rất Khó' },
        { floor: 4, name: 'Tầng 4 (Lv 100)', boss: 'Mech Abomination & Thundering Mephis', vigorCost: 5, difficulty: 'Đỉnh Điểm La Hoàn' }
      ]
    },
    earlyFloors: {
      name: 'Tầng 1 & 2 (Khởi Đầu)',
      vigorCost: 10, // 5 + 5 = 10 Vigor
      priorityStrategy: 'Ưu tiên Đội Hình Khắc Chế Hệ (Electro / Sát thương diện rộng)',
      floors: [
        { floor: 1, name: 'Tầng 1 (Lv 80)', boss: 'Autopuppet Scout & Viridblaze Saurian', vigorCost: 5, difficulty: 'Trung Bình' },
        { floor: 2, name: 'Tầng 2 (Lv 90)', boss: 'Havoc Warrior & Geohide Saurian', vigorCost: 5, difficulty: 'Khó' }
      ]
    }
  },

  // 2. THÁP TRÁI (Resonant Tower - Tháp Cộng Hưởng)
  resonantTower: {
    id: 'resonant',
    name: 'Resonant Tower (Tháp Cộng Hưởng - Trái)',
    recommendedElement: 'Havoc / Basic ATK',
    towerBuff: '+40% Sát thương đòn Đánh thường, giảm 10% Kháng Havoc',
    bossFloor: {
      floor: 4,
      name: 'Tầng 4 (Lv 90 - Boss Cuối)',
      boss: 'Mourning Aix & Havoc Dreadmane',
      vigorCost: 4,
      priorityStrategy: 'Ưu tiên Đội Havoc / Basic ATK (Camellya, Rover Havoc, Sanhua)'
    },
    earlyFloors: {
      floors: [
        { floor: 1, name: 'Tầng 1 (Lv 70)', boss: 'Chasm Guardian & Tambourinist', vigorCost: 1, difficulty: 'Dễ' },
        { floor: 2, name: 'Tầng 2 (Lv 80)', boss: 'Traffic Illuminator & Spearback', vigorCost: 2, difficulty: 'Trung Bình' },
        { floor: 3, name: 'Tầng 3 (Lv 85)', boss: 'Flautist & Glacio Dreadmane', vigorCost: 3, difficulty: 'Khó' }
      ],
      totalVigor: 6, // 1 + 2 + 3 = 6 Vigor
      priorityStrategy: 'Đội hình càn quét dọn tầng tiết kiệm thể lực'
    }
  },

  // 3. THÁP PHẢI (Echoing Tower - Tháp Vang Vọng)
  echoingTower: {
    id: 'echoing',
    name: 'Echoing Tower (Tháp Vang Vọng - Phải)',
    recommendedElement: 'Spectro / Resonance Skill',
    towerBuff: '+30% Spectro DMG, +25% Sát thương Kỹ năng Cộng hưởng (Skill)',
    bossFloor: {
      floor: 4,
      name: 'Tầng 4 (Lv 90 - Boss Cuối)',
      boss: 'Inferno Rider & Feilian Beringal',
      vigorCost: 4,
      priorityStrategy: 'Ưu tiên Đội Spectro / Skill DMG (Jinhsi, Phoebe, Zhezhi)'
    },
    earlyFloors: {
      floors: [
        { floor: 1, name: 'Tầng 1 (Lv 70)', boss: 'Cruisewing & Gulpuff Group', vigorCost: 1, difficulty: 'Dễ' },
        { floor: 2, name: 'Tầng 2 (Lv 80)', boss: 'Cyan-Feathered Heron & Hoochief', vigorCost: 2, difficulty: 'Trung Bình' },
        { floor: 3, name: 'Tầng 3 (Lv 85)', boss: 'Rocksteady Guardian & Roseshroom', vigorCost: 3, difficulty: 'Khó' }
      ],
      totalVigor: 6, // 1 + 2 + 3 = 6 Vigor
      priorityStrategy: 'Đội hình càn quét dọn tầng tiết kiệm thể lực'
    }
  }
};

/**
 * Thuật toán Tower of Adversity (ToA) Solver Season 3.7
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 6) {
    return null;
  }

  const optimalTeams = generateOptimalTeams(ownedCharacterIds);
  if (optimalTeams.length < 2) {
    return null;
  }

  // Chấm điểm độ tương thích với Buff Mùa Tháp Giữa (Tầng 3-4)
  const scoreForHazardBossBuff = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const elements = (team.characters || []).map(c => c?.element);

    if (members.includes('xiangli_yao') || members.includes('calcharo') || members.includes('changli') || members.includes('augusta') || members.includes('rover_electro')) {
      score += 45;
    }
    if (members.includes('hsin') || members.includes('suoming')) {
      score += 50;
    }
    if (elements.includes('Electro')) {
      score += 35;
    }
    if (members.includes('yinlin')) {
      score += 25;
    }

    return score;
  };

  const scoreForResonant = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const elements = (team.characters || []).map(c => c?.element);

    if (elements.includes('Havoc')) score += 40;
    if (members.includes('camellya') || members.includes('rover_havoc')) score += 35;
    if (members.includes('sanhua') || members.includes('danjin')) score += 25;
    return score;
  };

  const scoreForEchoing = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const elements = (team.characters || []).map(c => c?.element);

    if (elements.includes('Spectro')) score += 40;
    if (members.includes('jinhsi') || members.includes('phoebe') || members.includes('carlotta')) score += 35;
    if (members.includes('zhezhi')) score += 25;
    return score;
  };

  const sortedByHazardBuff = [...optimalTeams].sort((a, b) => scoreForHazardBossBuff(b) - scoreForHazardBossBuff(a));
  
  const hazardBossTeam = sortedByHazardBuff[0];
  const remainingForOther = optimalTeams.filter(t => t.id !== hazardBossTeam.id);

  const sortedForResonant = [...remainingForOther].sort((a, b) => scoreForResonant(b) - scoreForResonant(a));
  const resonantTeam = sortedForResonant[0] || optimalTeams[0];
  const remainingAfterResonant = remainingForOther.filter(t => t.id !== resonantTeam.id);

  const sortedForEchoing = [...remainingAfterResonant].sort((a, b) => scoreForEchoing(b) - scoreForEchoing(a));
  const echoingTeam = sortedForEchoing[0] || remainingForOther[0] || optimalTeams[0];
  const remainingAfterEchoing = remainingAfterResonant.filter(t => t.id !== echoingTeam.id);

  const hazardEarlyTeam = remainingAfterEchoing[0] || remainingAfterResonant[0] || remainingForOther[0] || optimalTeams[1] || hazardBossTeam;

  return {
    seasonName: TOA_DATA_SEASON_37.seasonName,
    seasonPeriod: TOA_DATA_SEASON_37.seasonPeriod,
    hazardTower: {
      ...TOA_DATA_SEASON_37.hazardTower,
      bossFloors: {
        ...TOA_DATA_SEASON_37.hazardTower.bossFloors,
        assignedTeam: hazardBossTeam,
        vigorUsed: '5 + 5 = 10 / 10 Thể Lực (Cạn kiệt sau Tầng 3-4)'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.hazardTower.earlyFloors,
        assignedTeam: hazardEarlyTeam,
        vigorUsed: '5 + 5 = 10 / 10 Thể Lực (Cạn kiệt sau Tầng 1-2)'
      }
    },
    resonantTower: {
      ...TOA_DATA_SEASON_37.resonantTower,
      bossFloor: {
        ...TOA_DATA_SEASON_37.resonantTower.bossFloor,
        assignedTeam: resonantTeam,
        vigorUsed: '4 / 10 Thể Lực'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.resonantTower.earlyFloors,
        assignedTeam: resonantTeam,
        vigorUsed: '1 + 2 + 3 = 6 / 10 Thể Lực'
      }
    },
    echoingTower: {
      ...TOA_DATA_SEASON_37.echoingTower,
      bossFloor: {
        ...TOA_DATA_SEASON_37.echoingTower.bossFloor,
        assignedTeam: echoingTeam,
        vigorUsed: '4 / 10 Thể Lực'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.echoingTower.earlyFloors,
        assignedTeam: echoingTeam,
        vigorUsed: '1 + 2 + 3 = 6 / 10 Thể Lực'
      }
    },
    towers: [
      {
        id: 'hazard',
        name: 'Hazard Tower (Tháp Hiểm Họa - Giữa)',
        recommendedElement: 'Electro / Unison',
        buff: TOA_DATA_SEASON_37.hazardTower.towerBuff,
        bossTeam: hazardBossTeam,
        earlyTeam: hazardEarlyTeam,
        team: hazardBossTeam
      },
      {
        id: 'resonant',
        name: 'Resonant Tower (Tháp Cộng Hưởng - Trái)',
        recommendedElement: 'Havoc / Basic ATK',
        buff: TOA_DATA_SEASON_37.resonantTower.towerBuff,
        bossTeam: resonantTeam,
        earlyTeam: resonantTeam,
        team: resonantTeam
      },
      {
        id: 'echoing',
        name: 'Echoing Tower (Tháp Vang Vọng - Phải)',
        recommendedElement: 'Spectro / Resonance Skill',
        buff: TOA_DATA_SEASON_37.echoingTower.towerBuff,
        bossTeam: echoingTeam,
        earlyTeam: echoingTeam,
        team: echoingTeam
      }
    ]
  };
}
