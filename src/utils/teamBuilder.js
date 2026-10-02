import { RESONATORS, TEAM_TEMPLATES } from '../data/resonators.js';

/**
 * Tra cứu nhanh thông tin resonator theo ID
 */
export function getResonator(id) {
  return RESONATORS.find(r => r.id === id);
}

/**
 * Tự động tìm kiếm và đề xuất các đội hình tối ưu dựa trên kho nhân vật người dùng đang có
 * Đã tối ưu hóa thuật toán để đạt 60FPS mượt mà, không giật lag
 * @param {Array<string>} ownedCharacterIds - Danh sách ID nhân vật người dùng tick chọn
 * @returns {Array} - Danh sách đội hình khả thi sắp xếp theo độ ưu tiên
 */
export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length === 0) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTeams = [];
  const seenTeamKeys = new Set();

  // 1. Kiểm tra các Template Meta định nghĩa sẵn
  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      const key = [...template.members].sort().join('-');
      seenTeamKeys.add(key);
      matchedTeams.push({
        ...template,
        isCustom: false,
        matchScore: template.tier === 'T0' ? 100 : template.tier === 'T0.5' ? 95 : 90,
        characters: template.members.map(id => getResonator(id)).filter(Boolean)
      });
    }
  }

  // 2. Thuật toán tự sinh đội hình linh hoạt (Dynamic Heuristic Team Building)
  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  const mainDPSList = ownedResonators.filter(r => r.role.includes('Main') || r.role.includes('Quickswap') || r.role.includes('DPS'));
  const bufferList = ownedResonators.filter(r => r.role.includes('Sub-DPS') || r.role.includes('Buffer') || r.role.includes('Support') || r.tags?.includes('Buffer'));
  
  // Hỗ trợ cả healer chuyên dụng và flex sustain/shield
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

        // Kiểm tra tính tương thích Concerto/Outro Deepen
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

        // Bonus điểm sustain cao cấp
        if (flex.id === 'shorekeeper' || flex.id === 'verina') {
          synergyScore += 10;
        }

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
          matchScore: synergyScore,
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

  // Giữ tối đa 35 đội hình custom có matchScore cao nhất để đảm bảo hiệu năng cực nhạy
  customTeams.sort((a, b) => b.matchScore - a.matchScore);
  const topCustomTeams = customTeams.slice(0, 35);

  const finalTeams = [...matchedTeams, ...topCustomTeams];
  return finalTeams.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Thuật toán Tower of Adversity (ToA) Solver Season 3.7:
 * Tự động chia 3 team độc lập (9 nhân vật không trùng lặp) ưu tiên theo buff nguyên tố của mùa 3.7:
 * - Hazard Tower (Tháp Nguy Hiểm): Ưu tiên Electro & Unison (+30% Electro, +20% Liberation, +15% Unison ATK)
 * - Resonant Tower (Tháp Cộng Hưởng): Ưu tiên Havoc & Basic ATK (+40% DMG, -10% Havoc RES)
 * - Echoing Tower (Tháp Vang Vọng): Ưu tiên Spectro & Resonance Skill (+30% Spectro, +25% Skill)
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 9) {
    return null; // Cần tối thiểu 9 nhân vật để tạo 3 team độc lập
  }

  const ownedSet = new Set(ownedCharacterIds);
  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  if (ownedResonators.length < 9) return null;

  // Tính điểm phù hợp của một đội hình với từng tháp
  const scoreTeamForTower = (team, towerType) => {
    let score = team.matchScore || 75;
    const chars = team.characters || [];
    const elements = chars.map(c => c?.element);

    if (towerType === 'hazard') {
      if (elements.includes('Electro')) score += 40; // Ưu tiên Electro mùa 3.7
      if (team.members.includes('hsin') || team.members.includes('xiangli_yao') || team.members.includes('suoming')) score += 25;
      if (team.members.includes('yinlin')) score += 15;
    } else if (towerType === 'resonant') {
      if (elements.includes('Havoc')) score += 40; // Ưu tiên Havoc & Basic ATK mùa 3.7
      if (team.members.includes('camellya') || team.members.includes('rover_havoc')) score += 25;
      if (team.members.includes('sanhua') || team.members.includes('danjin')) score += 15;
    } else if (towerType === 'echoing') {
      if (elements.includes('Spectro')) score += 40; // Ưu tiên Spectro & Skill mùa 3.7
      if (team.members.includes('jinhsi') || team.members.includes('phoebe')) score += 25;
      if (team.members.includes('zhezhi') || team.members.includes('shorekeeper')) score += 15;
    }

    if (team.members.includes('shorekeeper') || team.members.includes('verina')) score += 10;
    return score;
  };

  // Tạo candidate pool từ templates và các tổ hợp khả thi
  const candidateTeams = [];
  const seenKeys = new Set();

  for (const tm of TEAM_TEMPLATES) {
    if (tm.members.every(m => ownedSet.has(m))) {
      const key = [...tm.members].sort().join('-');
      seenKeys.add(key);
      candidateTeams.push({
        ...tm,
        matchScore: tm.tier === 'T0' ? 100 : 92,
        characters: tm.members.map(id => getResonator(id)).filter(Boolean)
      });
    }
  }

  const mainDPSList = ownedResonators.filter(r => r.role.includes('Main') || r.role.includes('DPS') || r.role.includes('Quickswap'));
  const bufferList = ownedResonators.filter(r => r.role.includes('Sub-DPS') || r.role.includes('Buffer') || r.role.includes('Support'));
  const flexList = ownedResonators;

  for (const d of mainDPSList) {
    for (const b of bufferList) {
      if (b.id === d.id) continue;
      for (const f of flexList) {
        if (f.id === d.id || f.id === b.id) continue;
        const key = [d.id, b.id, f.id].sort().join('-');
        if (seenKeys.has(key)) continue;
        seenKeys.add(key);

        let matchScore = 75;
        if (d.id === 'camellya' && b.id === 'sanhua') matchScore += 20;
        if (d.id === 'jinhsi' && (b.id === 'zhezhi' || b.id === 'yuanwu' || b.id === 'yinlin')) matchScore += 20;
        if (d.id === 'xiangli_yao' && b.id === 'yinlin') matchScore += 20;
        if (f.id === 'shorekeeper' || f.id === 'verina') matchScore += 10;

        candidateTeams.push({
          id: `toa-${key}`,
          name: `${d.name} + ${b.name} + ${f.name}`,
          members: [d.id, b.id, f.id],
          characters: [d, b, f],
          matchScore,
          type: 'Balanced'
        });
      }
    }
  }

  // Lựa chọn 3 đội hình tối ưu cho 3 tháp không trùng bất kỳ nhân vật nào
  const sortedHazard = [...candidateTeams].sort((a, b) => scoreTeamForTower(b, 'hazard') - scoreTeamForTower(a, 'hazard'));
  
  let bestTrio = null;
  let bestCombinedScore = -1;

  const hazardLimit = Math.min(25, sortedHazard.length);
  for (let i = 0; i < hazardLimit; i++) {
    const t1 = sortedHazard[i];
    const s1 = new Set(t1.members);
    const score1 = scoreTeamForTower(t1, 'hazard');

    const sortedResonant = candidateTeams
      .filter(t => !t.members.some(m => s1.has(m)))
      .sort((a, b) => scoreTeamForTower(b, 'resonant') - scoreTeamForTower(a, 'resonant'));

    const resonantLimit = Math.min(20, sortedResonant.length);
    for (let j = 0; j < resonantLimit; j++) {
      const t2 = sortedResonant[j];
      const s2 = new Set([...s1, ...t2.members]);
      const score2 = scoreTeamForTower(t2, 'resonant');

      const sortedEchoing = candidateTeams
        .filter(t => !t.members.some(m => s2.has(m)))
        .sort((a, b) => scoreTeamForTower(b, 'echoing') - scoreTeamForTower(a, 'echoing'));

      if (sortedEchoing.length > 0) {
        const t3 = sortedEchoing[0];
        const score3 = scoreTeamForTower(t3, 'echoing');
        const total = score1 + score2 + score3;
        if (total > bestCombinedScore) {
          bestCombinedScore = total;
          bestTrio = { t1, t2, t3 };
        }
      }
    }
  }

  if (!bestTrio) return null;

  return {
    season: 'Mùa 3.7 - Vũ Khí Tuyệt Đỉnh (Mới Nhất)',
    buffSummary: 'Hazard: Electro & Unison | Resonant: Havoc & Đánh Thường | Echoing: Spectro & Kỹ Năng',
    towers: [
      {
        id: 'hazard',
        name: 'Hazard Tower (Tháp Nguy Hiểm - Giữa)',
        recommendedElement: 'Electro / Unison',
        floor: 'Tầng 4 (Lv 100)',
        boss: 'Mech Abomination',
        buff: '+30% Electro & Liberation DMG, +15% ATK khi kích hoạt Unison',
        team: bestTrio.t1,
        elementAdvantage: bestTrio.t1.characters.some(c => c?.element === 'Electro')
      },
      {
        id: 'resonant',
        name: 'Resonant Tower (Tháp Cộng Hưởng - Trái)',
        recommendedElement: 'Havoc / Basic ATK',
        floor: 'Tầng 4 (Lv 90)',
        boss: 'Mourning Aix & Havoc Dreadmane',
        buff: '+40% Sát thương đòn Đánh thường, giảm 10% Kháng Havoc của quái',
        team: bestTrio.t2,
        elementAdvantage: bestTrio.t2.characters.some(c => c?.element === 'Havoc')
      },
      {
        id: 'echoing',
        name: 'Echoing Tower (Tháp Vang Vọng - Phải)',
        recommendedElement: 'Spectro / Resonance Skill',
        floor: 'Tầng 4 (Lv 90)',
        boss: 'Inferno Rider & Feilian Beringal',
        buff: '+30% Spectro DMG, +25% Sát thương Kỹ năng Cộng hưởng (Skill)',
        team: bestTrio.t3,
        elementAdvantage: bestTrio.t3.characters.some(c => c?.element === 'Spectro')
      }
    ],
    tower1_Hazard: bestTrio.t1,
    tower2_Resonant: bestTrio.t2,
    tower3_Echoing: bestTrio.t3
  };
}
