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
const RESONATOR_POWER_TIER = {
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
  // 23 Resonators Mới Được Bổ Sung
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
  'luuk_herssen': 92,
  'sigrika': 92,
  'hiyuki': 92,
  'denia': 91,
  'lucy': 92,
  'rebecca': 92,
  'suisui': 90
};

/**
 * Tự động tìm kiếm và đề xuất các đội hình tối ưu dựa trên kho nhân vật người dùng đang có.
 * ĐẢM BẢO QUY TẮC KHÔNG TRÙNG NHÂN VẬT:
 * Nếu một nhân vật đã nằm trong một đội hình được đề xuất trước, các đội hình sau sẽ KHÔNG chứa nhân vật đó nữa!
 * Ưu tiên các đội hình mạnh nhất trước (Meta Tier 0, synergy hoàn hảo).
 *
 * @param {Array<string>} ownedCharacterIds - Danh sách ID nhân vật người dùng tick chọn
 * @returns {Array} - Danh sách đội hình không trùng lặp nhân vật
 */
export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 3) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTeams = [];
  const seenTeamKeys = new Set();

  // 1. Thu thập tất cả các Template Meta định nghĩa sẵn mà người dùng sở hữu đủ
  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      const key = [...template.members].sort().join('-');
      seenTeamKeys.add(key);
      const chars = template.members.map(id => getResonator(id)).filter(Boolean);
      
      // Tính toán điểm tổng thể dựa trên Tier và Meta Power
      let baseScore = template.tier === 'T0' ? 100 : template.tier === 'T0.5' ? 95 : 90;
      const avgPower = chars.reduce((sum, c) => sum + (RESONATOR_POWER_TIER[c.id] || 75), 0) / (chars.length || 1);
      const compositeScore = Math.round(baseScore * 0.6 + avgPower * 0.4);

      matchedTeams.push({
        ...template,
        isCustom: false,
        matchScore: compositeScore,
        characters: chars
      });
    }
  }

  // 2. Thuật toán tự sinh đội hình linh hoạt (Dynamic Heuristic Team Building)
  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  const mainDPSList = ownedResonators.filter(r => r.role.includes('Main') || r.role.includes('Quickswap') || r.role.includes('DPS'));
  const bufferList = ownedResonators.filter(r => r.role.includes('Sub-DPS') || r.role.includes('Buffer') || r.role.includes('Support') || r.tags?.includes('Buffer'));
  const healerList = ownedResonators.filter(r => r.role.includes('Healer') || r.role.includes('Support') || r.role.includes('Shielder') || r.tags?.includes('Healer') || r.tags?.includes('Shield'));
  const flexList = healerList.length >= 2 ? healerList : ownedResonators;

  const customTeams = [];

  for (const dps of mainDPSList) {
    for (const buff of bufferList) {
      if (buff.id === dps.id) continue;

      for (const flex of flexList) {
        if (flex.id === dps.id || flex.id === buff.id) continue;

        const teamKey = [dps.id, buff.id, flex.id].sort().join('-');
        if (seenTeamKeys.has(teamKey)) continue;

        let synergyScore = 70;
        let notes = `Đội hình linh hoạt với core ${dps.name}`;

        // Kiểm tra tính tương thích Concerto/Outro Deepen đặc hữu
        if (dps.id === 'camellya' && buff.id === 'sanhua') {
          synergyScore += 28;
          notes = 'Sanhua Outro buff 38% Basic ATK cực hợp thế roi gai của Camellya';
        } else if (dps.id === 'jinhsi' && (buff.id === 'zhezhi' || buff.id === 'yuanwu' || buff.id === 'yinlin' || buff.id === 'youhu')) {
          synergyScore += 30;
          notes = `${buff.name} kích hoạt đòn Coordinated Attack nạp 50 tầng Incandescence thần tốc cho Jinhsi`;
        } else if (dps.id === 'jiyan' && (buff.id === 'mortefi' || buff.id === 'ciaccona')) {
          synergyScore += 30;
          notes = `${buff.name} buff Heavy Attack / Aero Erosion khuếch đại Thanh Long Jiyan`;
        } else if (dps.id === 'carlotta' && (buff.id === 'zhezhi' || buff.id === 'sanhua')) {
          synergyScore += 27;
          notes = `${buff.name} tối ưu hóa sát thương Shotgun Băng của Carlotta`;
        } else if (dps.id === 'xiangli_yao' && (buff.id === 'yinlin' || buff.id === 'buling' || buff.id === 'jianxin')) {
          synergyScore += 29;
          notes = `${buff.name} buff Electro & Liberation biến cú đấm của Xiangli Yao thành sát thương cực đại`;
        } else if (dps.id === 'calcharo' && (buff.id === 'yinlin' || buff.id === 'jianxin')) {
          synergyScore += 26;
          notes = `${buff.name} gia tăng sát thương nộ Deathblade Gear cho Calcharo`;
        } else if (dps.id === 'rover_havoc' && buff.id === 'danjin') {
          synergyScore += 28;
          notes = 'Danjin Outro buff 23% Havoc DMG Deepen cho thanh kiếm Dark Surge của Rover Havoc';
        } else if (dps.id === 'changli' || buff.id === 'changli') {
          synergyScore += 25;
          notes = 'Changli buff 20% Fusion và 25% Liberation Deepen cho đồng minh';
        } else if (dps.id === 'hsin' || buff.id === 'hsin' || dps.id === 'suoming' || buff.id === 'suoming') {
          synergyScore += 26;
          notes = 'Tận dụng cơ chế Unison độc bản (3.7) luân chuyển không tiêu tốn Concerto';
        }

        // Điểm cộng sustain xịn
        if (flex.id === 'shorekeeper' || flex.id === 'verina') {
          synergyScore += 10;
        }

        const avgPower = ((RESONATOR_POWER_TIER[dps.id] || 75) + (RESONATOR_POWER_TIER[buff.id] || 75) + (RESONATOR_POWER_TIER[flex.id] || 75)) / 3;
        const totalScore = Math.min(100, Math.round(synergyScore * 0.55 + avgPower * 0.45));

        seenTeamKeys.add(teamKey);
        customTeams.push({
          id: `custom-${teamKey}`,
          name: `${dps.name} + ${buff.name} Synergy`,
          core: dps.id,
          members: [dps.id, buff.id, flex.id],
          type: (dps.role.includes('Quickswap') || buff.role.includes('Quickswap')) ? 'Quickswap' : 'Hypercarry',
          description: notes,
          tags: [dps.element, 'Synergy Match'],
          isCustom: true,
          matchScore: totalScore,
          characters: [dps, buff, flex],
          customRotations: {
            standard: [
              {
                step: 1,
                char: flex.name,
                action: `Ra sân đầu tiên ➔ Dùng Resonance Skill (E) và Liberation (R) ➔ Bật Echo (Bell-Borne / Fallacy) tạo khiên & hồi máu ➔ Tích đầy Concerto ➔ Outro chuyển giao: ${flex.outroDescription || 'Hồi máu và buff toàn đội.'}`
              },
              {
                step: 2,
                char: buff.name,
                action: `Intro nhận buff từ Sustain ➔ Kích hoạt Skill (E) và Liberation (R) ➔ Bật Echo Sonata Moonlit Clouds (Impermanence Heron) ➔ Tích 100% Concerto ➔ Outro truyền buff chủ lực: ${buff.outroDescription || 'Khuếch đại sát thương.'}`
              },
              {
                step: 3,
                char: dps.name,
                action: `Intro vào sân nhận trọn vẹn hiệu ứng Deepen từ ${buff.name} ➔ Kích hoạt trạng thái cường hóa Forte đặc hữu ➔ Xả Resonance Liberation (R) ➔ Dứt điểm chuỗi rotation và chuẩn bị lặp lại.`
              }
            ],
            quickswap: (dps.rotations?.quickswap || buff.rotations?.quickswap) ? [
              { step: 1, char: dps.name, action: `Khởi đầu bằng chuỗi tấn công thế Forte hoặc Skill (E).` },
              { step: 2, char: buff.name, action: `Animation Cancel: Ngay khi ${dps.name} bắt đầu tung đòn kết liễu, đổi ngay sang ${buff.name} tung Skill E nhanh.` },
              { step: 3, char: dps.name, action: `Đổi ngược lại ${dps.name} để hoàn tất chuỗi đánh mà không lãng phí thời gian chờ hoạt ảnh.` }
            ] : null
          }
        });
      }
    }
  }

  // Kết hợp toàn bộ candidate và sắp xếp theo điểm mạnh nhất giảm dần
  const allCandidates = [...matchedTeams, ...customTeams];
  allCandidates.sort((a, b) => b.matchScore - a.matchScore);

  // 3. LỌC ĐỘI HÌNH KHÔNG TRÙNG LẶP BẤT KỲ NHÂN VẬT NÀO
  // Tức là khi 1 team đã được chọn, 3 nhân vật trong team đó sẽ bị khóa hoàn toàn, các team sau không được dùng lại!
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
 * Dữ liệu 4 tầng chi tiết của cả 3 tháp ToA (Tower of Adversity) Season 3.7
 * Tổng cộng 12 tầng với phân bố Vigor chuẩn (4 tầng x 3 tháp)
 */
export const TOA_FLOORS_DATA = [
  // 1. Resonant Tower (Tháp Trái - 4 tầng, tối đa 10 Vigor/char)
  {
    towerId: 'resonant',
    towerName: 'Resonant Tower (Tháp Cộng Hưởng - Trái)',
    recommendedElement: 'Havoc / Basic ATK',
    towerBuff: '+40% Sát thương đòn Đánh thường, giảm 10% Kháng Havoc',
    floors: [
      { floor: 1, name: 'Tầng 1 (Lv 70)', boss: 'Chasm Guardian & Tambourinist', vigorCost: 1, difficulty: 'Dễ' },
      { floor: 2, name: 'Tầng 2 (Lv 80)', boss: 'Traffic Illuminator & Spearback', vigorCost: 2, difficulty: 'Trung Bình' },
      { floor: 3, name: 'Tầng 3 (Lv 85)', boss: 'Flautist & Glacio Dreadmane', vigorCost: 3, difficulty: 'Khó' },
      { floor: 4, name: 'Tầng 4 (Lv 90)', boss: 'Mourning Aix & Havoc Dreadmane', vigorCost: 4, difficulty: 'Thử Thách Boss' }
    ]
  },
  // 2. Hazard Tower (Tháp Giữa - 4 tầng, khó nhất)
  {
    towerId: 'hazard',
    towerName: 'Hazard Tower (Tháp Nguy Hiểm - Giữa)',
    recommendedElement: 'Electro / Unison',
    towerBuff: '+30% Electro & Liberation DMG, +15% ATK khi kích hoạt Unison',
    floors: [
      { floor: 1, name: 'Tầng 1 (Lv 80)', boss: 'Autopuppet Scout & Viridblaze Saurian', vigorCost: 1, difficulty: 'Trung Bình' },
      { floor: 2, name: 'Tầng 2 (Lv 90)', boss: 'Havoc Warrior & Geohide Saurian', vigorCost: 2, difficulty: 'Khó' },
      { floor: 3, name: 'Tầng 3 (Lv 95)', boss: 'Crownless (Hóa Thân)', vigorCost: 3, difficulty: 'Rất Khó' },
      { floor: 4, name: 'Tầng 4 (Lv 100)', boss: 'Mech Abomination & Thundering Mephis', vigorCost: 4, difficulty: 'Đỉnh Điểm La Hoàn' }
    ]
  },
  // 3. Echoing Tower (Tháp Phải - 4 tầng)
  {
    towerId: 'echoing',
    towerName: 'Echoing Tower (Tháp Vang Vọng - Phải)',
    recommendedElement: 'Spectro / Resonance Skill',
    towerBuff: '+30% Spectro DMG, +25% Sát thương Kỹ năng Cộng hưởng (Skill)',
    floors: [
      { floor: 1, name: 'Tầng 1 (Lv 70)', boss: 'Cruisewing & Gulpuff Group', vigorCost: 1, difficulty: 'Dễ' },
      { floor: 2, name: 'Tầng 2 (Lv 80)', boss: 'Cyan-Feathered Heron & Hoochief', vigorCost: 2, difficulty: 'Trung Bình' },
      { floor: 3, name: 'Tầng 3 (Lv 85)', boss: 'Rocksteady Guardian & Roseshroom', vigorCost: 3, difficulty: 'Khó' },
      { floor: 4, name: 'Tầng 4 (Lv 90)', boss: 'Inferno Rider & Feilian Beringal', vigorCost: 4, difficulty: 'Thử Thách Boss' }
    ]
  }
];

/**
 * Thuật toán Tower of Adversity (ToA) Solver Season 3.7:
 * Lấy trực tiếp các đội hình đã được đề xuất tối ưu (hoàn toàn không trùng lặp nhân vật),
 * phân bổ thông minh vào cả 3 tháp (12 tầng) sao cho mỗi tháp được ghép đội có độ tương thích cao nhất
 * với buff nguyên tố của mùa 3.7:
 * - Hazard Tower: Electro & Unison
 * - Resonant Tower: Havoc & Basic ATK
 * - Echoing Tower: Spectro & Resonance Skill
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 9) {
    return null;
  }

  // 1. Sinh các đội hình tối ưu (đã đảm bảo không trùng nhau)
  const optimalTeams = generateOptimalTeams(ownedCharacterIds);
  if (optimalTeams.length < 3) {
    return null;
  }

  // 2. Chấm điểm độ hợp của 1 team với từng tháp
  const scoreTeamForTower = (team, towerType) => {
    let score = team.matchScore || 75;
    const chars = team.characters || [];
    const elements = chars.map(c => c?.element);

    if (towerType === 'hazard') {
      if (elements.includes('Electro')) score += 45;
      if (team.members.includes('hsin') || team.members.includes('xiangli_yao') || team.members.includes('suoming')) score += 30;
      if (team.members.includes('yinlin')) score += 20;
    } else if (towerType === 'resonant') {
      if (elements.includes('Havoc')) score += 45;
      if (team.members.includes('camellya') || team.members.includes('rover_havoc')) score += 30;
      if (team.members.includes('sanhua') || team.members.includes('danjin')) score += 20;
    } else if (towerType === 'echoing') {
      if (elements.includes('Spectro')) score += 45;
      if (team.members.includes('jinhsi') || team.members.includes('phoebe')) score += 30;
      if (team.members.includes('zhezhi') || team.members.includes('shorekeeper')) score += 20;
    }

    return score;
  };

  // 3. Tìm cách ghép 3 team vào 3 tháp sao cho tổng điểm phù hợp cao nhất
  // Vì các team trong optimalTeams vốn đã không trùng lặp nhân vật, ta chỉ cần chọn 3 team hàng đầu
  const candidatePool = optimalTeams.slice(0, Math.min(6, optimalTeams.length));
  let bestAssignment = null;
  let bestTotalScore = -1;

  for (let i = 0; i < candidatePool.length; i++) {
    for (let j = 0; j < candidatePool.length; j++) {
      if (j === i) continue;
      for (let k = 0; k < candidatePool.length; k++) {
        if (k === i || k === j) continue;

        const hazardTeam = candidatePool[i];
        const resonantTeam = candidatePool[j];
        const echoingTeam = candidatePool[k];

        const total = scoreTeamForTower(hazardTeam, 'hazard') +
                      scoreTeamForTower(resonantTeam, 'resonant') +
                      scoreTeamForTower(echoingTeam, 'echoing');

        if (total > bestTotalScore) {
          bestTotalScore = total;
          bestAssignment = { hazardTeam, resonantTeam, echoingTeam };
        }
      }
    }
  }

  if (!bestAssignment) {
    bestAssignment = {
      hazardTeam: optimalTeams[0],
      resonantTeam: optimalTeams[1],
      echoingTeam: optimalTeams[2]
    };
  }

  // Ghép đội hình vào từng tháp và chi tiết 4 tầng của mỗi tháp
  const towersResult = TOA_FLOORS_DATA.map(towerDef => {
    let assignedTeam = bestAssignment.hazardTeam;
    if (towerDef.towerId === 'resonant') assignedTeam = bestAssignment.resonantTeam;
    if (towerDef.towerId === 'echoing') assignedTeam = bestAssignment.echoingTeam;

    const chars = assignedTeam.characters || [];
    const elements = chars.map(c => c?.element);
    let hasElementAdvantage = false;

    if (towerDef.towerId === 'hazard' && elements.includes('Electro')) hasElementAdvantage = true;
    if (towerDef.towerId === 'resonant' && elements.includes('Havoc')) hasElementAdvantage = true;
    if (towerDef.towerId === 'echoing' && elements.includes('Spectro')) hasElementAdvantage = true;

    return {
      id: towerDef.towerId,
      name: towerDef.towerName,
      recommendedElement: towerDef.recommendedElement,
      buff: towerDef.towerBuff,
      team: assignedTeam,
      elementAdvantage: hasElementAdvantage,
      floors: towerDef.floors.map(f => ({
        ...f,
        assignedTeam: assignedTeam
      }))
    };
  });

  return {
    seasonName: 'Mùa 3.7',
    seasonPeriod: '01/10/2026 - 31/10/2026',
    towers: towersResult
  };
}
