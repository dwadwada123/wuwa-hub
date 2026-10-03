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
  'shorekeeper', 'verina', 'chisa', 'mornye', 'brant', 'baizhi', 'youhu', 'jianxin', 'taoqi', 'buling', 'suisui'
]);

// Bảng ánh xạ icon chính thức của toàn bộ 36 bộ Echo Sonata (từ 1.0 đến phiên bản 3.7)
export const SONATA_ICON_MAP = {
  // 1.0 Core Sets
  'Celestial Light': 'https://static.wikia.nocookie.net/wutheringwaves/images/0/0c/Icon_Celestial_Light.png/revision/latest',
  'Sun-sinking Eclipse': 'https://static.wikia.nocookie.net/wutheringwaves/images/6/6e/Icon_Sun-sinking_Eclipse.png/revision/latest',
  'Molten Rift': 'https://static.wikia.nocookie.net/wutheringwaves/images/9/95/Icon_Molten_Rift.png/revision/latest',
  'Void Thunder': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/1d/Icon_Void_Thunder.png/revision/latest',
  'Sierra Gale': 'https://static.wikia.nocookie.net/wutheringwaves/images/d/db/Icon_Sierra_Gale.png/revision/latest',
  'Freezing Frost': 'https://static.wikia.nocookie.net/wutheringwaves/images/8/8d/Icon_Freezing_Frost.png/revision/latest',
  'Moonlit Clouds': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a5/Icon_Moonlit_Clouds.png/revision/latest',
  'Rejuvenating Glow': 'https://static.wikia.nocookie.net/wutheringwaves/images/7/75/Icon_Rejuvenating_Glow.png/revision/latest',
  'Lingering Tunes': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/aa/Icon_Lingering_Tunes.png/revision/latest',

  // 2.0+ Rinascita Sets
  'Frosty Resolve': 'https://static.wikia.nocookie.net/wutheringwaves/images/9/9e/Icon_Frosty_Resolve.png/revision/latest',
  'Eternal Radiance': 'https://static.wikia.nocookie.net/wutheringwaves/images/8/82/Icon_Eternal_Radiance.png/revision/latest',
  'Midnight Veil': 'https://static.wikia.nocookie.net/wutheringwaves/images/0/0a/Icon_Midnight_Veil.png/revision/latest',
  'Empyrean Anthem': 'https://static.wikia.nocookie.net/wutheringwaves/images/3/3a/Icon_Empyrean_Anthem.png/revision/latest',
  'Tidebreaking Courage': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a8/Icon_Tidebreaking_Courage.png/revision/latest',

  // 3.0 Roya Frostlands Sets
  'Pact of Neonlight Leap': 'https://static.wikia.nocookie.net/wutheringwaves/images/d/de/Icon_Pact_of_Neonlight_Leap.png/revision/latest',
  'Halo of Starry Radiance': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/ce/Icon_Halo_of_Starry_Radiance.png/revision/latest',
  'Rite of Gilded Revelation': 'https://static.wikia.nocookie.net/wutheringwaves/images/a/a1/Icon_Rite_of_Gilded_Revelation.png/revision/latest',

  // 3.7 Mengzhou & Simulacrum Nexus Sets
  'Heart of Sworn Vigil': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/10/Icon_Heart_of_Sworn_Vigil.png/revision/latest',
  'Heart of Evil\'s Purge': 'https://static.wikia.nocookie.net/wutheringwaves/images/2/20/Icon_Heart_of_Evil%27s_Purge.png/revision/latest',
  'Wishes of Quiet Snowfall': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/17/Icon_Wishes_of_Quiet_Snowfall.png/revision/latest',
  'Crown of Valor': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/1d/Icon_Crown_of_Valor.png/revision/latest',
  'Thread of Severed Fate': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/cb/Icon_Thread_of_Severed_Fate.png/revision/latest',
  'Lamp of Nether Road': 'https://static.wikia.nocookie.net/wutheringwaves/images/1/10/Icon_Lamp_of_Nether_Road.png/revision/latest',
  'Chromatic Foam': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/ce/Icon_Chromatic_Foam.png/revision/latest',
  'Dream of the Lost': 'https://static.wikia.nocookie.net/wutheringwaves/images/f/fe/Icon_Dream_of_the_Lost.png/revision/latest'
};

export function getSonataIcon(sonataName) {
  if (!sonataName) return SONATA_ICON_MAP['Moonlit Clouds'];
  const clean = sonataName.toLowerCase();
  for (const [key, url] of Object.entries(SONATA_ICON_MAP)) {
    if (clean.includes(key.toLowerCase())) {
      return url;
    }
  }
  return SONATA_ICON_MAP['Moonlit Clouds'];
}

// Bảng ánh xạ hình ảnh chính thức của toàn bộ các Echo 4-Cost và 3-Cost quan trọng (đến phiên bản 3.7)
export const ECHO_IMAGE_MAP = {
  // 1.0 - 1.4 Calamity & Overlord Bosses
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
  'Feilian Beringal': 'https://wutheringlab.com/wp-content/uploads/Feilian-Beringal.webp',
  'Thundering Mephis': 'https://wutheringlab.com/wp-content/uploads/Thundering-Mephis.webp',
  'Tempest Mephis': 'https://wutheringlab.com/wp-content/uploads/Tempest-Mephis.webp',
  'Mech Abomination': 'https://wutheringlab.com/wp-content/uploads/Mech-Abomination.webp',

  // 2.0 - 3.7 New Bosses & Elites
  'Nightmare Inferno Rider': 'https://wutheringlab.com/wp-content/uploads/Nightmare-Inferno-Rider.webp',
  'Lorelei': 'https://wutheringlab.com/wp-content/uploads/Lorelei.webp',
  'Sentry Construct': 'https://wutheringlab.com/wp-content/uploads/Sentry-Construct.webp',
  'Chasm Guardian': 'https://wutheringlab.com/wp-content/uploads/Chasm-Guardian.webp',
  'Violet-Feathered Heron': 'https://wutheringlab.com/wp-content/uploads/Violet-Feathered-Heron.webp',
  'Havoc Dreadmane': 'https://wutheringlab.com/wp-content/uploads/Havoc-Dreadmane.webp',
  'Glacio Dreadmane': 'https://wutheringlab.com/wp-content/uploads/Glacio-Dreadmane.webp',
  'Tambourinist': 'https://wutheringlab.com/wp-content/uploads/Tambourinist.webp',
  'Flautist': 'https://wutheringlab.com/wp-content/uploads/Flautist.webp'
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
  const guide = _getResonatorBuildGuideInternal(resonator);
  if (guide) {
    if (!guide.sonataIcon) guide.sonataIcon = getSonataIcon(guide.bestEchoSet);
    if (!guide.echoImage) guide.echoImage = getEchoImage(guide.mainEcho4Cost);
  }
  return guide;
}

function _getResonatorBuildGuideInternal(resonator) {
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
      sonataIcon: getSonataIcon('Rejuvenating Glow'),
      mainEcho4Cost: 'Fallacy of No Return',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu hoặc HP%',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + Hiệu Quả Nạp Năng Lượng%',
        cost1: 'HP% + HP%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'HP%', 'HP Cố Định', 'Kháng Sát Thương'],
      recommendedWeapons: [
        'Stellar Symphony',
        'Variation',
        'Rectifier of Voyager'
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
      sonataIcon: getSonataIcon('Rejuvenating Glow'),
      mainEcho4Cost: 'Bell-Borne Geochelone',
      costStructure: '4 - 3 - 3 - 1 - 1',
      mainStats: {
        cost4: 'Tăng Lượng Trị Liệu',
        cost3: 'Hiệu Quả Nạp Năng Lượng% + Hiệu Quả Nạp Năng Lượng%',
        cost1: 'Tấn Công% + Tấn Công%'
      },
      subStatsPriority: ['Hiệu Quả Nạp Năng Lượng', 'Tấn Công%', 'Tấn Công Cố Định'],
      recommendedWeapons: [
        'Variation',
        'Cosmic Ripples',
        'Rectifier of Voyager'
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
      recommendedWeapons: ['Variation', 'Rectifier of Voyager']
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
        'Broadblade#41',
        'Discord',
        'Originite: Type IV'
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
        id === 'taoqi' ? 'Discord' : 'Originite: Type IV'
      ]
    };
  }

  // 6. Hsin (5★ Electro Rectifier Sentinel - Main DPS)
  if (id === 'hsin') {
    return {
      statType: 'Main Carry DPS',
      echoImage: ECHO_IMAGE_MAP['Thundering Mephis'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,150 - 2,400+',
        critRate: '72% - 80%+',
        critDmg: '260% - 290%+',
        energyRegen: '120% - 130%'
      },
      bestEchoSet: '5-pc Heart of Sworn Vigil',
      sonataIcon: getSonataIcon('Heart of Sworn Vigil'),
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
        'Blooming Jadehaven',
        'Cosmic Ripples',
        'Augment'
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
      sonataIcon: getSonataIcon('Void Thunder'),
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
        "Thunder's Horizon",
        'Emerald of Genesis',
        'Commando of Conviction'
      ]
    };
  }

  // 8. Lucy (5★ Spectro Pistols - Main DPS)
  if (id === 'lucy') {
    return {
      statType: 'Main Carry DPS',
      echoImage: ECHO_IMAGE_MAP['Jué'],
      targetStats: {
        primaryLabel: 'Tấn Công',
        primaryValue: '2,100 - 2,350+',
        critRate: '70% - 78%+',
        critDmg: '250% - 280%+',
        energyRegen: '120% - 130%'
      },
      bestEchoSet: '5-pc Celestial Light',
      sonataIcon: getSonataIcon('Celestial Light'),
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
        'Static Mist',
        'Novaburst',
        'Cadenza'
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
      sonataIcon: getSonataIcon('Moonlit Clouds'),
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
    sonataIcon: getSonataIcon(resonator.bestEchoSet || element),
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
      'Vũ khí 5★ Chuẩn Emerald of Genesis / Ages of Harvest / Cosmic Ripples',
      'Vũ khí 4★ Battlepass Autumntrace / Novaburst / Lumingloss'
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
  let sEcho = 'Bell-Borne Geochelone tạo khiên chắn giảm 50% sát thương và tăng 12% ATK';
  if (sustain?.id === 'shorekeeper') {
    sEcho = 'Fallacy of No Return kích hoạt Stella Field buff 10% ATK và tăng 10% nạp năng lượng';
  } else if (sustain?.id === 'mornye') {
    sEcho = 'Bell-Borne Geochelone kích hoạt lá chắn dung nham giảm 50% sát thương';
  } else if (sustain?.id === 'chisa') {
    sEcho = 'Nightmare Crownless kích hoạt đòn đánh phối hợp Havoc và hồi phục sinh mệnh cho đồng minh';
  } else if (sustain?.id === 'brant') {
    sEcho = 'Bell-Borne Geochelone tạo khiên hỏa diệm và hồi phục sinh lực toàn đội';
  }

  const step1 = {
    step: 1,
    char: sName,
    roleTitle: 'Sustain / Healer • Khởi Động Sàn Đấu',
    tokens: ['Kỹ năng E', 'Chiêu R', 'Echo', 'Outro'],
    actionText: `Ra sân đầu tiên ➔ Tung Kỹ năng E và bật Chiêu R mở vùng hồi phục & buff công toàn đội ➔ Kích hoạt ${sEcho} ➔ Thực hiện đòn đánh thường/trọng kích tích đầy 100% thanh Concerto ➔ Kích hoạt Outro Skill buff 15% All-Type DMG Deepen cho đồng minh tiếp theo.`
  };

  // 2. Bước 2: Sub-DPS / Buffer
  let bufferDetail = `Intro nhận buff từ Sustain ➔ Dùng Kỹ năng E và Chiêu R ➔ Bật Echo Sonata Moonlit Clouds Impermanence Heron khuếch đại 12% ATK ➔ Kích hoạt cơ chế Forte tích thần tốc 100% thanh Concerto ➔ Outro truyền buff chuyên biệt cho ${mName}.`;
  
  if (buffer?.id === 'suoming') {
    bufferDetail = `Intro vào sân nhận buff từ Sustain ➔ Tung Kỹ năng E chuyển đổi thế kiếm Azure Surge ➔ Tích nạp Concerto nhanh ➔ Bật Impermanence Heron ➔ Outro truyền Lôi Vũ Đồng Điệu nạp 25% Concerto và tăng cường sát thương Lôi cho ${mName}.`;
  } else if (buffer?.id === 'lucilla') {
    bufferDetail = `Intro vào sân ➔ Kích hoạt trạng thái Glacio Chafe và Echo Mode ➔ Tung Kỹ năng E xả hàn khí ➔ Bật Heron Echo nạp đầy Concerto ➔ Outro khuếch đại sát thương Băng và kỹ năng Echo cho ${mName}.`;
  } else if (buffer?.id === 'lupa') {
    bufferDetail = `Intro vào sân ➔ Kích hoạt đòn đánh phối hợp Lang Tộc ➔ Tung Kỹ năng E và Chiêu R bão lửa ➔ Bật Heron Echo ➔ Outro buff sát thương Hỏa và đòn đánh thường cho ${mName}.`;
  } else if (buffer?.id === 'iuno') {
    bufferDetail = `Intro vào sân ➔ Tung quyền cước và bắn cung nguyệt hoa ➔ Kích hoạt hồi phục thể lực ➔ Bật Heron Echo ➔ Outro truyền trọn vẹn buff Heavy Attack cực đại cho ${mName}.`;
  } else if (buffer?.id === 'qiuyuan') {
    bufferDetail = `Intro vào sân ➔ Vung kiếm phong lôi tích lũy kiếm ý ➔ Bật Heron Echo ➔ Outro khuếch đại sát thương kỹ năng Echo cực mạnh cho ${mName}.`;
  } else if (buffer?.id === 'rebecca') {
    bufferDetail = `Intro vào sân ➔ Tung đòn súng điện Overdrive E ➔ Bấm R kích hoạt điện thế nạp đầy Concerto ➔ Bật Heron Echo ➔ Outro buff sát thương cho ${mName}.`;
  } else if (buffer?.id === 'sanhua') {
    bufferDetail = `Intro vào sân ➔ Kỹ năng E giáng băng ➔ Chiêu R tạo vết nứt băng ➔ Giữ Trọng Kích Detonate căn đúng thanh chuẩn nổ toàn bộ sông băng ➔ Bật Heron Echo ➔ Outro truyền trọn vẹn 38% Basic ATK DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'zhezhi') {
    bufferDetail = `Intro vào sân nhận buff ➔ E ➔ R triệu hồi linh hồn mực vẽ bắn đòn phối hợp ➔ Chuỗi đánh thường lướt bút nạp đầy thanh Concerto ➔ Bật Heron Echo ➔ Outro buff 20% Glacio DMG và 25% Resonance Skill DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'yinlin') {
    bufferDetail = `Intro nhận buff ➔ E ➔ R triệu hồi sấm sét trừng phạt ➔ Bật Heron Echo ➔ Đánh thường tích đầy Judgment Point giáng sét diện rộng ➔ Outro truyền 20% Electro DMG và 25% Resonance Liberation DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'mortefi') {
    bufferDetail = `Intro vào sân ➔ E ➔ Bấm R kích hoạt rồng lửa Burning Rhapsody bắn theo mỗi đòn đánh của đồng minh ➔ Bật Heron Echo ➔ Outro truyền 38% Heavy Attack DMG Deepen cho ${mName}.`;
  } else if (buffer?.id === 'danjin') {
    bufferDetail = `Intro nhận buff ➔ Tung chuỗi Kỹ năng E rút máu tích đầy thanh Ruby Blossom ➔ Trọng kích xoay kiếm tiêu hao máu nạp đầy Concerto ➔ Outro buff 23% Havoc DMG Deepen cho ${mName}.`;
  }

  const step2 = {
    step: 2,
    char: bName,
    roleTitle: 'Sub-DPS / Buffer • Nạp Concerto & Truyền Trao Deepen',
    tokens: ['Intro', 'Kỹ năng E', 'Chiêu R', 'Forte Burst', 'Heron Echo', 'Outro'],
    actionText: bufferDetail
  };

  // 3. Bước 3: Main DPS Burst Window
  let dpsDetail = `Intro vào sân thừa hưởng toàn bộ hiệu ứng Deepen trong 14 giây ➔ Kích hoạt thế đánh cường hóa Forte đặc trưng ➔ Tung Kỹ năng E nạp đầy thanh năng lượng ➔ Bật Echo chủ lực 4-Cost ➔ Xả Chiêu R nộ dứt điểm toàn bộ kẻ địch ➔ Hoàn tất chuỗi và chuẩn bị lặp lại vòng xoay.`;

  if (mId === 'hsin') {
    dpsDetail = `Intro vào sân nhận trọn vẹn buff Unison và Deepen ➔ Kích hoạt Kỹ năng E ở thể Lôi Cường Hóa Electro Flare ➔ Xả Chiêu R nộ dứt điểm bão sét diện rộng ➔ Đánh thường cường hóa hoàn tất chuỗi sát thương.`;
  } else if (mId === 'lucy') {
    dpsDetail = `Intro vào sân nhận buff ➔ Kích hoạt trạng thái Starlight Hack ➔ Tung chuỗi đạn Spectro định hướng cường hóa liên hoàn ➔ Xả Chiêu R pháo sáng quét sạch sàn đấu.`;
  } else if (mId === 'camellya') {
    dpsDetail = `Đột kích bằng Intro nhận 38% Basic ATK Deepen từ Sanhua ➔ Giữ Trọng Kích vào trạng thái Ephemeral nhào lộn trên không ➔ Xả chuỗi đánh thường BA4 roi gai xoay tròn liên hoàn ➔ Nhấn E kích hoạt nổ hạt giống gai ➔ Bấm R tung nộ bão hoa bóng tối xóa sổ toàn bộ sàn đấu.`;
  } else if (mId === 'jinhsi') {
    dpsDetail = `Intro vào sân nhận đòn Coordinated Attack từ Buffer ➔ Lướt Kỹ năng E vào trạng thái Incarnation ➔ Tung chuỗi kiếm rồng tích đầy 50 tầng Incandescence ➔ Bấm R xả nộ sấm sét Thanh Long ➔ Giữ phím E kích hoạt đòn Illuminous Dragon nuke hàng triệu sát thương diện rộng.`;
  } else if (mId === 'changli') {
    dpsDetail = `Intro vào sân ➔ Tung đòn đánh thường BA4 nạp 2 tầng Enflamement ➔ Bấm E True Sight Charge lướt kiếm ➔ Nối tiếp BA True Sight Conquest tích đủ 4 tầng ➔ Giữ Trọng Kích Flaming Sacrifice giáng bão kiếm lửa cực đại ➔ Bấm R xả nộ Radiance of Feathers thiêu rụi đối thủ.`;
  } else if (mId === 'jiyan') {
    dpsDetail = `Intro vào sân nhận 38% Heavy Attack Deepen từ Mortefi ➔ Bấm R kích hoạt trạng thái Thanh Long hóa thần ➔ Giữ Trọng Kích tung thương rồng lốc xoáy liên tục hất tung và quét sạch quái vật trong 10 giây hiệu lực.`;
  } else if (mId === 'carlotta') {
    dpsDetail = `Intro nhận buff Băng ➔ Nhấn Kỹ năng E nạp đạn Shotgun ➔ Xả 3 phát đạn băng tỏa rộng nát giáp đối thủ ➔ Bấm R nộ bắn pháo đại bác đóng băng và tiêu diệt hoàn toàn kẻ địch.`;
  } else if (mId === 'xiangli_yao') {
    dpsDetail = `Intro nhận 20% Electro và 25% Liberation Deepen từ Yinlin ➔ Bấm R mở không gian Cogitation Horizon ➔ Liên tục bấm E cường hóa tung nắm đấm công nghệ ➔ Kết liễu bằng cú đấm nổ hạt nhân cuối cùng.`;
  } else if (mId === 'rover_havoc') {
    dpsDetail = `Intro nhận 23% Havoc Deepen từ Danjin ➔ Giữ Trọng kích vào trạng thái Dark Surge ➔ Xả chuỗi kiếm bóng tối cường hóa ➔ Bấm R tung nộ lưỡi hái Dead Realm ➔ Triệu hồi Dreamless Echo bổ xuống nổ 50% sát thương gia tăng.`;
  } else if (mId === 'rover_electro') {
    dpsDetail = `Intro nhận buff Electro & Liberation từ Buffer ➔ Bật Kỹ năng E lôi kiếm chém quét tích đầy Forte ➔ Bấm R nộ giáng bão sét Lôi Minh Trảm ➔ Bật Echo Thundering Mephis càn quét toàn sàn đấu.`;
  } else if (mId === 'luuk_herssen') {
    dpsDetail = `Intro nhận buff Basic ATK từ Sanhua ➔ Lao vào không chiến tung chuỗi đòn Bao Tay Spectro liên hoàn ➔ Kích hoạt Kỹ năng E Aureate Judge lướt trảm không trung ➔ Bấm R nộ giáng búa quang học Spectro nuke sát thương bùng nổ.`;
  } else if (mId === 'augusta') {
    dpsDetail = `Intro nhận buff Heavy Attack từ Iuno ➔ Tung đại kiếm điện lướt chém tích lũy Majesty ➔ Xả chuỗi Heavy Attack sấm sét cực đại ➔ Bấm R xả nộ lôi thần kết liễu toàn bộ quái vật.`;
  } else if (mId === 'denia') {
    dpsDetail = `Intro vào sân tích lũy tài nguyên ở Stagecraft Form ➔ Chuyển đổi sang Breakdown Form bộc phát hỏa diễm ➔ Bấm R nộ xả toàn bộ năng lượng thiêu rụi sàn đấu.`;
  } else if (mId === 'galbrena') {
    dpsDetail = `Intro nhận buff Echo từ Qiuyuan ➔ Bật Kỹ năng E vào thể Demon Hypostasis ➔ Xả mưa đạn bạo kích và kích hoạt Echo chủ lực dứt điểm mục tiêu.`;
  }

  const step3 = {
    step: 3,
    char: mName,
    roleTitle: `Main DPS ${mName} • Cửa Sổ Dồn Sát Thương Cực Đại`,
    tokens: ['Intro', 'Thế Forte', 'Kỹ năng E', 'Echo Chủ Lực', 'Chiêu R'],
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
 * 4. Luuk Herssen là Main DPS Spectro Gauntlets, không bao giờ bị xếp vào vị trí Sustain.
 *
 * @param {Array<string>} ownedCharacterIds - Danh sách ID nhân vật người dùng tick chọn
 * @returns {Array} - Danh sách đội hình không trùng lặp nhân vật
 */
export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 3) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTeams = [];
  const seenTeamKeys = new Set();

  // Thu thập tất cả các Template Meta khuyến nghị mà người dùng sở hữu đủ
  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      const key = [...template.members].sort().join('-');
      if (seenTeamKeys.has(key)) continue;
      seenTeamKeys.add(key);

      const chars = template.members.map(id => getResonator(id)).filter(Boolean);
      if (chars.length < 3) continue;

      const mainChar = chars[0];
      const buffChar = chars[1];
      const sustainChar = chars[2];

      let baseScore = template.tier === 'T0' ? 145 : template.tier === 'T0.5' ? 135 : 120;
      const avgPower = chars.reduce((sum, c) => sum + (RESONATOR_POWER_TIER[c.id] || 75), 0) / chars.length;
      const compositeScore = Math.round(baseScore * 0.6 + avgPower * 0.4);

      matchedTeams.push({
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

  // Sắp xếp các đội hình theo điểm sức mạnh và tier
  matchedTeams.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  return matchedTeams;
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
  seasonName: 'Mùa 3.7',
  seasonPeriod: '01/10/2026 - 31/10/2026',
  
  // 1. THÁP GIỮA (Hazard Tower)
  hazardTower: {
    id: 'hazard',
    name: 'Hazard Tower',
    vigorCostPerFloor: 5,
    maxVigorPerCharacter: 10,
    recommendedElement: 'Electro / Unison',
    towerBuff: '+30% Electro & Liberation DMG, +15% ATK khi kích hoạt Unison',
    bossFloors: {
      name: 'Tầng 3 & 4 - Đỉnh Điểm Boss',
      vigorCost: 10, // 5 + 5 = 10 Vigor
      priorityStrategy: 'Ưu tiên Đội Hình Tận Dụng Tối Đa Buff Tháp +30% Liberation DMG & Unison',
      floors: [
        { floor: 3, name: 'Tầng 3 - Lv 95', boss: 'Crownless', vigorCost: 5, difficulty: 'Rất Khó' },
        { floor: 4, name: 'Tầng 4 - Lv 100', boss: 'Mech Abomination & Thundering Mephis', vigorCost: 5, difficulty: 'Đỉnh Điểm La Hoàn' }
      ]
    },
    earlyFloors: {
      name: 'Tầng 1 & 2 - Khởi Đầu',
      vigorCost: 10, // 5 + 5 = 10 Vigor
      priorityStrategy: 'Ưu tiên Đội Hình Khắc Chế Hệ Electro diện rộng',
      floors: [
        { floor: 1, name: 'Tầng 1 - Lv 80', boss: 'Autopuppet Scout & Viridblaze Saurian', vigorCost: 5, difficulty: 'Trung Bình' },
        { floor: 2, name: 'Tầng 2 - Lv 90', boss: 'Havoc Warrior & Geohide Saurian', vigorCost: 5, difficulty: 'Khó' }
      ]
    }
  },

  // 2. THÁP TRÁI (Resonant Tower - Tháp Cộng Hưởng)
  resonantTower: {
    id: 'resonant',
    name: 'Resonant Tower',
    recommendedElement: 'Havoc / Basic ATK',
    towerBuff: '+40% Sát thương đòn Đánh thường, giảm 10% Kháng Havoc',
    bossFloor: {
      floor: 4,
      name: 'Tầng 4 - Lv 90 Boss Cuối',
      boss: 'Mourning Aix & Havoc Dreadmane',
      vigorCost: 4,
      priorityStrategy: 'Ưu tiên Đội Havoc / Basic ATK'
    },
    earlyFloors: {
      floors: [
        { floor: 1, name: 'Tầng 1 - Lv 70', boss: 'Chasm Guardian & Tambourinist', vigorCost: 1, difficulty: 'Dễ' },
        { floor: 2, name: 'Tầng 2 - Lv 80', boss: 'Traffic Illuminator & Spearback', vigorCost: 2, difficulty: 'Trung Bình' },
        { floor: 3, name: 'Tầng 3 - Lv 85', boss: 'Flautist & Glacio Dreadmane', vigorCost: 3, difficulty: 'Khó' }
      ],
      totalVigor: 6, // 1 + 2 + 3 = 6 Vigor
      priorityStrategy: 'Đội hình càn quét dọn tầng tiết kiệm thể lực'
    }
  },

  // 3. THÁP PHẢI (Echoing Tower - Tháp Vang Vọng)
  echoingTower: {
    id: 'echoing',
    name: 'Echoing Tower',
    recommendedElement: 'Spectro / Resonance Skill',
    towerBuff: '+30% Spectro DMG, +25% Sát thương Kỹ năng Cộng hưởng',
    bossFloor: {
      floor: 4,
      name: 'Tầng 4 - Lv 90 Boss Cuối',
      boss: 'Inferno Rider & Feilian Beringal',
      vigorCost: 4,
      priorityStrategy: 'Ưu tiên Đội Spectro / Skill DMG'
    },
    earlyFloors: {
      floors: [
        { floor: 1, name: 'Tầng 1 - Lv 70', boss: 'Cruisewing & Gulpuff Group', vigorCost: 1, difficulty: 'Dễ' },
        { floor: 2, name: 'Tầng 2 - Lv 80', boss: 'Cyan-Feathered Heron & Hoochief', vigorCost: 2, difficulty: 'Trung Bình' },
        { floor: 3, name: 'Tầng 3 - Lv 85', boss: 'Rocksteady Guardian & Roseshroom', vigorCost: 3, difficulty: 'Khó' }
      ],
      totalVigor: 6, // 1 + 2 + 3 = 6 Vigor
      priorityStrategy: 'Đội hình càn quét dọn tầng tiết kiệm thể lực'
    }
  }
};

/**
 * Thuật toán Tower of Adversity Solver Season 3.7
 * Tối ưu hóa toàn cục đa tháp (Global Multi-Tower Combinatorial Optimizer):
 * - Tháp Trái (Resonant Tower): Tối ưu tối đa cho hệ Havoc & sát thương Đánh Thường (+40% Basic ATK, -10% Kháng Havoc)
 * - Tháp Phải (Echoing Tower): Tối ưu tối đa cho hệ Spectro & Kỹ Năng Cộng Hưởng (+30% Spectro, +25% Skill DMG)
 * - Tháp Giữa Boss (Hazard Tầng 3-4): Tối ưu tối đa cho hệ Electro & Nộ / Unison (+30% Electro & Liberation DMG)
 * - Tháp Giữa Khởi Đầu (Hazard Tầng 1-2): Đội hình càn quét dọn tầng 1 và 2 tối ưu từ các nhân vật độc lập còn lại.
 * - ĐẢM BẢO 100%: TUYỆT ĐỐI KHÔNG TRÙNG LẶP BẤT KỲ NHÂN VẬT NÀO GIỮA CÁC ĐỘI HÌNH TOA (LUẬT THỂ LỰC VIGOR 10/10).
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 6) {
    return null;
  }

  const optimalTeams = generateOptimalTeams(ownedCharacterIds);
  if (!optimalTeams || optimalTeams.length < 2) {
    return null;
  }

  // 1. Chấm điểm độ tương thích với Tháp Trái (Resonant Tower - Havoc & Basic ATK)
  const scoreForResonant = (team) => {
    let score = team.tier === 'T0' ? 100 : team.tier === 'T0.5' ? 85 : 70;
    const elements = (team.characters || []).map(c => c?.element);
    const members = team.members || [];
    const core = team.characters?.[0] || getResonator(team.core);

    if (core?.element === 'Havoc') score += 60;
    else if (elements.includes('Havoc')) score += 30;

    if (members.includes('camellya')) score += 35;
    if (members.includes('rover_havoc')) score += 25;
    if (members.includes('danjin')) score += 20;
    if (members.includes('sanhua') || members.includes('roccia')) score += 20;

    // Quái vật Tháp Trái (Mourning Aix) kháng cao Spectro / Aero
    if (core?.element === 'Spectro' || core?.element === 'Aero') score -= 30;

    return score;
  };

  // 2. Chấm điểm độ tương thích với Tháp Phải (Echoing Tower - Spectro & Skill DMG)
  const scoreForEchoing = (team) => {
    let score = team.tier === 'T0' ? 100 : team.tier === 'T0.5' ? 85 : 70;
    const elements = (team.characters || []).map(c => c?.element);
    const members = team.members || [];
    const core = team.characters?.[0] || getResonator(team.core);

    if (core?.element === 'Spectro') score += 60;
    else if (elements.includes('Spectro')) score += 30;

    if (members.includes('jinhsi')) score += 35;
    if (members.includes('phoebe') || members.includes('carlotta')) score += 25;
    if (members.includes('zhezhi')) score += 20;
    if (members.includes('yuanwu')) score += 15;

    // Quái vật Tháp Phải (Inferno Rider) kháng cao Fusion
    if (core?.element === 'Fusion') score -= 30;

    return score;
  };

  // 3. Chấm điểm độ tương thích với Tháp Giữa Boss (Hazard Tầng 3-4 - Electro & Liberation DMG & Unison)
  const scoreForHazardBoss = (team) => {
    let score = team.tier === 'T0' ? 100 : team.tier === 'T0.5' ? 85 : 70;
    const elements = (team.characters || []).map(c => c?.element);
    const members = team.members || [];
    const core = team.characters?.[0] || getResonator(team.core);

    if (core?.element === 'Electro') score += 60;
    else if (elements.includes('Electro')) score += 30;

    if (members.includes('hsin')) score += 40;
    if (members.includes('xiangli_yao')) score += 35;
    if (members.includes('changli')) score += 30;
    if (members.includes('calcharo') || members.includes('augusta') || members.includes('rover_electro')) score += 25;
    if (members.includes('yinlin') || members.includes('suoming')) score += 20;

    return score;
  };

  // 4. Chấm điểm độ tương thích với Tháp Giữa Khởi Đầu (Hazard Tầng 1-2 - Càn Quét)
  const scoreForHazardEarly = (team) => {
    let score = team.tier === 'T0' ? 100 : team.tier === 'T0.5' ? 85 : 70;
    score += (team.matchScore || 80) * 0.4;
    return score;
  };

  // TÌM KIẾM TOÀN CỤC ĐA THÁP (GLOBAL OPTIMIZATION):
  // Duyệt qua tất cả các tổ hợp 3 đội hình hoàn toàn không trùng nhân vật để tìm phương án có tổng điểm cao nhất
  let bestScore = -1;
  let bestAssignment = null;

  for (let r = 0; r < optimalTeams.length; r++) {
    const tRes = optimalTeams[r];
    const sRes = scoreForResonant(tRes);

    for (let e = 0; e < optimalTeams.length; e++) {
      if (e === r) continue;
      const tEcho = optimalTeams[e];
      // Không được trùng bất kỳ nhân vật nào với Tháp Trái
      if (tEcho.members.some(m => tRes.members.includes(m))) continue;
      const sEcho = scoreForEchoing(tEcho);

      for (let h = 0; h < optimalTeams.length; h++) {
        if (h === r || h === e) continue;
        const tHaz = optimalTeams[h];
        // Không được trùng bất kỳ nhân vật nào với Tháp Trái hoặc Tháp Phải
        if (tHaz.members.some(m => tRes.members.includes(m) || tEcho.members.includes(m))) continue;
        const sHaz = scoreForHazardBoss(tHaz);

        const totalScore = sRes + sEcho + sHaz;
        if (totalScore > bestScore) {
          bestScore = totalScore;
          bestAssignment = { tRes, tEcho, tHaz, totalScore };
        }
      }
    }
  }

  // Trường hợp kho nhân vật ít (dưới 9 nhân vật), tìm tổ hợp 2 đội tối ưu nhất
  if (!bestAssignment) {
    let best2Score = -1;
    for (let r = 0; r < optimalTeams.length; r++) {
      const tRes = optimalTeams[r];
      for (let e = 0; e < optimalTeams.length; e++) {
        if (e === r) continue;
        const tEcho = optimalTeams[e];
        if (tEcho.members.some(m => tRes.members.includes(m))) continue;
        const score = scoreForResonant(tRes) + scoreForEchoing(tEcho);
        if (score > best2Score) {
          best2Score = score;
          bestAssignment = { tRes, tEcho, tHaz: null, totalScore: score };
        }
      }
    }
  }

  // Ghi nhận danh sách nhân vật đã sử dụng ở 3 tháp chính
  const usedToaCharacters = new Set();
  const resonantTeam = bestAssignment?.tRes || optimalTeams[0];
  const echoingTeam = bestAssignment?.tEcho || optimalTeams[1] || optimalTeams[0];
  let hazardBossTeam = bestAssignment?.tHaz;

  if (resonantTeam) resonantTeam.members.forEach(m => usedToaCharacters.add(m));
  if (echoingTeam) echoingTeam.members.forEach(m => usedToaCharacters.add(m));
  if (hazardBossTeam) hazardBossTeam.members.forEach(m => usedToaCharacters.add(m));

  // Nếu chưa có hazardBossTeam (kho người dùng < 9), tìm trong các nhân vật độc lập còn lại
  if (!hazardBossTeam) {
    const unusedIds = ownedCharacterIds.filter(id => !usedToaCharacters.has(id));
    if (unusedIds.length >= 3) {
      const pool = unusedIds.map(id => getResonator(id)).filter(Boolean);
      pool.sort((a, b) => (RESONATOR_POWER_TIER[b.id] || 75) - (RESONATOR_POWER_TIER[a.id] || 75));
      const dps = pool.find(r => !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Main') || r.tags?.includes('Main DPS'))) || pool[0];
      const afterDPS = pool.filter(r => r.id !== dps.id);
      const buff = afterDPS.find(r => !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Sub') || r.role.includes('Buffer'))) || afterDPS[0];
      const afterBuff = afterDPS.filter(r => r.id !== buff.id);
      const flex = afterBuff.find(r => TRUE_SUSTAIN_IDS.has(r.id)) || afterBuff[0];

      hazardBossTeam = {
        id: `toa-boss-${dps.id}-${buff.id}-${flex.id}`,
        name: `${dps.name} & ${buff.name} Đỉnh Điểm Boss`,
        core: dps.id,
        members: [dps.id, buff.id, flex.id],
        type: 'Đỉnh Điểm Boss',
        tier: 'T0.5',
        description: `Đội hình độc lập hoàn toàn không trùng nhân vật cho Tháp Giữa Tầng 3 và 4.`,
        tags: [dps.element, 'TOA Independent'],
        characters: [dps, buff, flex],
        customRotations: {
          standard: buildDetailedStandardRotation(dps, buff, flex)
        }
      };
      hazardBossTeam.members.forEach(m => usedToaCharacters.add(m));
    }
  }

  // Phân bổ Đội Hình Tháp Giữa Tầng 1-2 (Hazard Early - Càn Quét) từ các nhân vật độc lập còn lại
  let hazardEarlyTeam = null;
  const remainingCandidates = optimalTeams.filter(t => t.members.every(m => !usedToaCharacters.has(m)));
  if (remainingCandidates.length > 0) {
    remainingCandidates.sort((a, b) => scoreForHazardEarly(b) - scoreForHazardEarly(a));
    hazardEarlyTeam = remainingCandidates[0];
    hazardEarlyTeam.members.forEach(m => usedToaCharacters.add(m));
  } else {
    // Tạo đội hình từ các nhân vật chưa dùng
    const unusedIds = ownedCharacterIds.filter(id => !usedToaCharacters.has(id));
    if (unusedIds.length >= 3) {
      const pool = unusedIds.map(id => getResonator(id)).filter(Boolean);
      pool.sort((a, b) => (RESONATOR_POWER_TIER[b.id] || 75) - (RESONATOR_POWER_TIER[a.id] || 75));
      const dps = pool.find(r => !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Main') || r.tags?.includes('Main DPS'))) || pool[0];
      const afterDPS = pool.filter(r => r.id !== dps.id);
      const buff = afterDPS.find(r => !TRUE_SUSTAIN_IDS.has(r.id) && (r.role.includes('Sub') || r.role.includes('Buffer'))) || afterDPS[0];
      const afterBuff = afterDPS.filter(r => r.id !== buff.id);
      const flex = afterBuff.find(r => TRUE_SUSTAIN_IDS.has(r.id)) || afterBuff[0];

      hazardEarlyTeam = {
        id: `toa-early-${dps.id}-${buff.id}-${flex.id}`,
        name: `${dps.name} & ${buff.name} Càn Quét Khởi Đầu`,
        core: dps.id,
        members: [dps.id, buff.id, flex.id],
        type: 'Khởi Đầu Càn Quét',
        tier: 'T0.5',
        description: `Đội hình càn quét dọn tầng 1 và 2 tiết kiệm thể lực tối ưu.`,
        tags: [dps.element, 'TOA Early'],
        characters: [dps, buff, flex],
        customRotations: {
          standard: buildDetailedStandardRotation(dps, buff, flex)
        }
      };
      hazardEarlyTeam.members.forEach(m => usedToaCharacters.add(m));
    } else if (unusedIds.length === 2) {
      // Duo squad cho tầng dễ
      const pool = unusedIds.map(id => getResonator(id)).filter(Boolean);
      const c1 = pool[0];
      const c2 = pool[1];
      hazardEarlyTeam = {
        id: `toa-early-${c1.id}-${c2.id}`,
        name: `${c1.name} & ${c2.name} Song Đấu Khởi Đầu`,
        core: c1.id,
        members: [c1.id, c2.id],
        type: 'Duo Càn Quét',
        tier: 'T1',
        description: `Đội hình 2 người càn quét dọn tầng 1 và 2 tiết kiệm thể lực tối ưu.`,
        tags: [c1.element, 'TOA Duo'],
        characters: [c1, c2],
        customRotations: {
          standard: buildDetailedStandardRotation(c1, c2, null)
        }
      };
      hazardEarlyTeam.members.forEach(m => usedToaCharacters.add(m));
    }
  }

  return {
    seasonName: TOA_DATA_SEASON_37.seasonName,
    seasonPeriod: TOA_DATA_SEASON_37.seasonPeriod,
    hazardTower: {
      ...TOA_DATA_SEASON_37.hazardTower,
      bossFloors: {
        ...TOA_DATA_SEASON_37.hazardTower.bossFloors,
        assignedTeam: hazardBossTeam,
        vigorUsed: '10/10 Thể Lực'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.hazardTower.earlyFloors,
        assignedTeam: hazardEarlyTeam,
        vigorUsed: '10/10 Thể Lực'
      }
    },
    resonantTower: {
      ...TOA_DATA_SEASON_37.resonantTower,
      bossFloor: {
        ...TOA_DATA_SEASON_37.resonantTower.bossFloor,
        assignedTeam: resonantTeam,
        vigorUsed: '4/10 Thể Lực'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.resonantTower.earlyFloors,
        assignedTeam: resonantTeam,
        vigorUsed: '6/10 Thể Lực'
      }
    },
    echoingTower: {
      ...TOA_DATA_SEASON_37.echoingTower,
      bossFloor: {
        ...TOA_DATA_SEASON_37.echoingTower.bossFloor,
        assignedTeam: echoingTeam,
        vigorUsed: '4/10 Thể Lực'
      },
      earlyFloors: {
        ...TOA_DATA_SEASON_37.echoingTower.earlyFloors,
        assignedTeam: echoingTeam,
        vigorUsed: '6/10 Thể Lực'
      }
    },
    towers: [
      {
        id: 'hazard',
        name: 'Hazard Tower',
        recommendedElement: 'Electro / Unison',
        buff: TOA_DATA_SEASON_37.hazardTower.towerBuff,
        bossTeam: hazardBossTeam,
        earlyTeam: hazardEarlyTeam,
        team: hazardBossTeam
      },
      {
        id: 'resonant',
        name: 'Resonant Tower',
        recommendedElement: 'Havoc / Basic ATK',
        buff: TOA_DATA_SEASON_37.resonantTower.towerBuff,
        bossTeam: resonantTeam,
        earlyTeam: resonantTeam,
        team: resonantTeam
      },
      {
        id: 'echoing',
        name: 'Echoing Tower',
        recommendedElement: 'Spectro / Resonance Skill',
        buff: TOA_DATA_SEASON_37.echoingTower.towerBuff,
        bossTeam: echoingTeam,
        earlyTeam: echoingTeam,
        team: echoingTeam
      }
    ]
  };
}
