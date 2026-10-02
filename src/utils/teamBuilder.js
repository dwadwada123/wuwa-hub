import { RESONATORS, TEAM_TEMPLATES } from '../data/resonators';

/**
 * Tự động tìm kiếm và đề xuất các đội hình tối ưu dựa trên kho nhân vật người dùng đang có
 * @param {Array<string>} ownedCharacterIds - Danh sách ID nhân vật người dùng tick chọn
 * @returns {Array} - Danh sách đội hình khả thi sắp xếp theo độ ưu tiên
 */
export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length === 0) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTeams = [];

  // 1. Kiểm tra các Template Meta định nghĩa sẵn
  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      matchedTeams.push({
        ...template,
        isCustom: false,
        matchScore: 100,
        characters: template.members.map(id => RESONATORS.find(r => r.id === id)).filter(Boolean)
      });
    }
  }

  // 2. Thuật toán tự sinh đội hình linh hoạt (Dynamic Heuristic Team Building)
  // Quy tắc phân bổ WuWa tiêu chuẩn: 1 Main DPS + 1 Buffer/Sub-DPS tương thích + 1 Healer/Sustain
  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  const mainDPSList = ownedResonators.filter(r => r.role.includes('Main') || r.role.includes('Quickswap') || r.role.includes('DPS'));
  const bufferList = ownedResonators.filter(r => r.role.includes('Sub-DPS') || r.role.includes('Buffer') || r.role.includes('Support') || r.tags.includes('Buffer'));
  const healerList = ownedResonators.filter(r => r.role.includes('Healer') || r.role.includes('Support') || r.role.includes('Shielder') || r.tags.includes('Healer') || r.tags.includes('Shield'));

  // Đảm bảo không trùng các team đã có trong template
  for (const dps of mainDPSList) {
    for (const buff of bufferList) {
      if (buff.id === dps.id) continue;

      for (const heal of (healerList.length > 0 ? healerList : [{ id: 'baizhi', name: 'Baizhi', role: 'Healer' }])) {
        if (heal.id === dps.id || heal.id === buff.id) continue;

        const teamKey = [dps.id, buff.id, heal.id].sort().join('-');
        const alreadyExists = matchedTeams.some(t => [...t.members].sort().join('-') === teamKey);

        if (!alreadyExists && ownedSet.has(heal.id)) {
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

          // Bonus điểm sustain
          if (heal.id === 'shorekeeper' || heal.id === 'verina') {
            synergyScore += 10;
          }

          const healChar = RESONATORS.find(r => r.id === heal.id);

          matchedTeams.push({
            id: `custom-${teamKey}`,
            name: `${dps.name} + ${buff.name} Synergy`,
            core: dps.id,
            members: [dps.id, buff.id, heal.id],
            type: (dps.role.includes('Quickswap') || buff.role.includes('Quickswap')) ? 'Quickswap' : 'Hypercarry',
            description: notes,
            tags: [dps.element, 'Synergy Match'],
            isCustom: true,
            matchScore: synergyScore,
            characters: [dps, buff, healChar],
            customRotations: {
              standard: [
                {
                  step: 1,
                  char: healChar?.name || 'Sustain',
                  action: `Ra sân đầu tiên ➔ Dùng Resonance Skill (E) và Liberation (R) ➔ Bật Echo (Bell-Borne / Fallacy) tạo khiên & hồi máu ➔ Tích đầy Concerto ➔ Outro chuyển giao: ${healChar?.outroDescription || 'Hồi máu và buff toàn đội.'}`
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
  }

  // Sắp xếp theo điểm tương thích giảm dần
  return matchedTeams.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Thuật toán Tower of Adversity (ToA) Solver:
 * Chia kho nhân vật thành 3 đội hình không trùng lặp nhân vật cho 3 nhánh tháp
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  const allPossibleTeams = generateOptimalTeams(ownedCharacterIds);
  if (allPossibleTeams.length === 0) return null;

  // Cần tìm 3 team sao cho tập hợp members giao nhau bằng rỗng
  for (let i = 0; i < allPossibleTeams.length; i++) {
    const t1 = allPossibleTeams[i];
    const used1 = new Set(t1.members);

    for (let j = i + 1; j < allPossibleTeams.length; j++) {
      const t2 = allPossibleTeams[j];
      if (t2.members.some(m => used1.has(m))) continue;

      const used2 = new Set([...used1, ...t2.members]);

      for (let k = j + 1; k < allPossibleTeams.length; k++) {
        const t3 = allPossibleTeams[k];
        if (t3.members.some(m => used2.has(m))) continue;

        return {
          tower1_Hazard: t1,
          tower2_Resonant: t2,
          tower3_Echoing: t3
        };
      }
    }
  }

  return null; // Không đủ nhân vật để chia 3 team độc lập hoàn chỉnh
}
