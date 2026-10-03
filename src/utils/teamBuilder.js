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
  'luuk_herssen': 93,
  'sigrika': 92,
  'hiyuki': 92,
  'denia': 91,
  'lucy': 92,
  'rebecca': 92,
  'suisui': 90
};

// Danh sách các nhân vật đảm nhiệm vai trò hồi phục / tạo lá chắn chân chính (Sustain / Healer / Shielder)
const TRUE_SUSTAIN_IDS = new Set([
  'shorekeeper', 'verina', 'baizhi', 'youhu', 'jianxin', 'taoqi', 'buling', 'suisui', 'denia', 'lucilla'
]);

// Danh sách nhân vật có cơ chế Quickswap hợp lệ trong meta WuWa
const QUICKSWAP_CORE_IDS = new Set([
  'changli', 'encore', 'chixia', 'hsin', 'suoming', 'xiangli_yao', 'yinlin', 'rover_havoc', 'danjin', 'brant'
]);

// Danh sách các cặp Quickswap chuẩn xác có hủy hoạt ảnh (Animation Cancel)
const VALID_QUICKSWAP_PAIRS = new Set([
  'changli-encore', 'encore-changli',
  'changli-chixia', 'chixia-changli',
  'changli-brant', 'brant-changli',
  'hsin-xiangli_yao', 'xiangli_yao-hsin',
  'suoming-hsin', 'hsin-suoming',
  'xiangli_yao-yinlin', 'yinlin-xiangli_yao',
  'rover_havoc-danjin', 'danjin-rover_havoc'
]);

/**
 * Tạo rotation Quickswap chi tiết từng đòn đánh và nhịp swap cho các đội hình hợp lệ
 */
function createDetailedQuickswapRotation(char1, char2, sustain) {
  const c1 = char1.name;
  const c2 = char2.name;
  const sus = sustain ? sustain.name : 'Sustain / Buffer';

  if ((char1.id === 'changli' && char2.id === 'encore') || (char1.id === 'encore' && char2.id === 'changli')) {
    return [
      {
        step: 1,
        char: 'Changli',
        actionTokens: ['BA1-BA4', 'E (Charge)', 'SWAP ⇄'],
        actionText: 'Tung đòn đánh thường BA1-BA4 tích lũy Enflamement ➔ Nhấn E (True Sight: Charge) lướt kiếm',
        swapCue: 'SWAP NGAY trong lúc Changli đang trong hoạt ảnh lướt kiếm E'
      },
      {
        step: 2,
        char: 'Encore',
        actionTokens: ['E1 (Cosmos Rave)', 'Echo', 'SWAP ⇄'],
        actionText: 'Ra sân lập tức tung E1 (Cosmos Rave) ➔ Bật Echo Inferno Rider kích hoạt buff Fusion',
        swapCue: 'SWAP NGAY khi hoạt ảnh thú bông vừa nổ'
      },
      {
        step: 3,
        char: 'Changli',
        actionTokens: ['BA (Conquest)', 'HA (Sacrifice)', 'R (Liberation)', 'SWAP ⇄'],
        actionText: 'Vào sân tiếp nối đòn BA (True Sight: Conquest) ➔ Giữ Trọng Kích (Flaming Sacrifice) xả 4 tầng ➔ Bấm R nộ nuke sát thương diện rộng',
        swapCue: 'SWAP NGAY trong lúc hoạt ảnh kiếm lửa bay lên của chiêu R'
      },
      {
        step: 4,
        char: 'Encore',
        actionTokens: ['HA (Cloudy Cosmos)', 'R (Rampage)', 'BA4 Combo'],
        actionText: 'Vào sân giữ Trọng kích (Cloudy: Cosmos) ném thú bông ➔ Bấm R (Cosmos Rampage) hóa cuồng nộ ➔ Xả chuỗi BA4',
        swapCue: 'Khi thanh Dissonance của Encore cạn hoặc hết thời gian nộ'
      },
      {
        step: 5,
        char: sus,
        actionTokens: ['Intro', 'R', 'E', 'Echo', 'Outro'],
        actionText: `Vào sân bằng Intro ➔ Bật Resonance Liberation (R) mở buff ➔ E ➔ Bell-Borne / Fallacy Echo ➔ Outro chuyển giao`,
        swapCue: 'Tích 100% Concerto để Outro buff cho Changli bắt đầu vòng mới'
      }
    ];
  }

  if ((char1.id === 'changli' && char2.id === 'chixia') || (char1.id === 'chixia' && char2.id === 'changli')) {
    return [
      {
        step: 1,
        char: 'Changli',
        actionTokens: ['BA1-BA4', 'E', 'SWAP ⇄'],
        actionText: 'BA1-BA4 tích điểm ➔ Nhấn E lướt kiếm ➔ Outro buff 20% Fusion DMG và 25% Liberation DMG',
        swapCue: 'SWAP NGAY khi Changli tung đòn lướt kiếm'
      },
      {
        step: 2,
        char: 'Chixia',
        actionTokens: ['Intro', 'Hold E (Daka-Daka)', 'SWAP ⇄'],
        actionText: 'Intro vào sân nhận buff ➔ Giữ phím E xả toàn bộ 30 viên đạn Boom Boom thiêu đốt mục tiêu',
        swapCue: 'SWAP NGAY trong đòn bắn viên cuối cùng của Chixia'
      },
      {
        step: 3,
        char: 'Changli',
        actionTokens: ['BA', 'HA', 'R', 'SWAP ⇄'],
        actionText: 'Trở lại sân tung BA cường hóa ➔ Trọng kích Flaming Sacrifice ➔ Bấm R nộ',
        swapCue: 'SWAP trong lúc hoạt ảnh nộ đang thi triển'
      },
      {
        step: 4,
        char: 'Chixia',
        actionTokens: ['R (Blazing Flames)', 'Echo'],
        actionText: 'Vào sân tung chiêu Nộ R (Blazing Flames) dứt điểm ➔ Bật Echo Inferno Rider',
        swapCue: 'Chuyển sang Healer tích Concerto'
      },
      {
        step: 5,
        char: sus,
        actionTokens: ['R', 'E', 'Outro'],
        actionText: `Hồi phục máu và buff ATK toàn đội để lặp lại chuỗi luân chuyển`,
        swapCue: 'Outro kích hoạt'
      }
    ];
  }

  if (char1.id === 'hsin' || char2.id === 'hsin') {
    const ally = char1.id === 'hsin' ? c2 : c1;
    return [
      {
        step: 1,
        char: 'Hsin',
        actionTokens: ['E (Electro Flare)', 'Unison Outro', 'SWAP ⇄'],
        actionText: 'Kích hoạt E gây sát thương Electro đợt 1 ➔ Tiêu hao Unison kích hoạt Outro tức thì mà không cần đầy Concerto',
        swapCue: 'SWAP NGAY lập tức sang đồng minh'
      },
      {
        step: 2,
        char: ally,
        actionTokens: ['Intro', 'E', 'Echo', 'SWAP ⇄'],
        actionText: `Vào sân tức thời bằng Intro Skill nhờ cơ chế Unison ➔ Tung E nhanh ➔ Bật Echo`,
        swapCue: `SWAP ngược lại Hsin ngay khi đòn E kết thúc`
      },
      {
        step: 3,
        char: 'Hsin',
        actionTokens: ['R (Moonfall)', 'Enhanced BA', 'SWAP ⇄'],
        actionText: 'Trở lại sân xả chiêu nộ Resonance Liberation R ➔ Đánh thường cường hóa',
        swapCue: 'Khi hết buff'
      },
      {
        step: 4,
        char: sus,
        actionTokens: ['Intro', 'R', 'Outro'],
        actionText: `Tạo vòng hồi máu Stella Field / buff ATK ➔ Outro tiếp năng lượng`,
        swapCue: 'Concerto 100%'
      }
    ];
  }

  if ((char1.id === 'rover_havoc' && char2.id === 'danjin') || (char1.id === 'danjin' && char2.id === 'rover_havoc')) {
    return [
      {
        step: 1,
        char: 'Danjin',
        actionTokens: ['E1-E2-E3', 'HA', 'Outro', 'SWAP ⇄'],
        actionText: 'Tung chuỗi Skill E tích đầy thanh Ruby Blossom ➔ Trọng kích rút máu kích hoạt Outro buff 23% Havoc Deepen',
        swapCue: 'SWAP NGAY khi Trọng Kích vừa chém trúng'
      },
      {
        step: 2,
        char: 'Rover (Havoc)',
        actionTokens: ['Intro', 'R (Dead Realm)', 'Echo (Dreamless)', 'SWAP ⇄'],
        actionText: 'Intro nhận buff 23% Havoc ➔ Bấm R nộ giáng lưỡi hái ➔ Bật Echo Dreamless gây sát thương tức thì được tăng 50%',
        swapCue: 'SWAP NGAY trong hoạt ảnh Dreamless bổ xuống'
      },
      {
        step: 3,
        char: 'Danjin',
        actionTokens: ['E', 'R (Crimson Bloom)'],
        actionText: 'Vào sân xả chiêu nộ R Crimson Bloom bùng nổ máu đỏ',
        swapCue: 'Hoàn tất vòng xả'
      },
      {
        step: 4,
        char: sus,
        actionTokens: ['R', 'E', 'Outro'],
        actionText: `Hồi phục lại lượng máu đã tiêu hao của Danjin và buff công`,
        swapCue: 'Concerto 100%'
      }
    ];
  }

  // Mẫu Quickswap chung cho các cặp quickswap khác
  return [
    {
      step: 1,
      char: c1,
      actionTokens: ['BA1-BA2', 'E', 'SWAP ⇄'],
      actionText: `Tung BA1-BA2 ➔ Nhấn Skill E ➔ Hủy hoạt ảnh thừa bằng thao tác đổi nhân vật`,
      swapCue: `SWAP NGAY trong hoạt ảnh ra đòn của ${c1}`
    },
    {
      step: 2,
      char: c2,
      actionTokens: ['E', 'Echo', 'SWAP ⇄'],
      actionText: `Ra sân lập tức tung Skill E ➔ Bật Echo dứt điểm`,
      swapCue: `SWAP ngược lại ${c1}`
    },
    {
      step: 3,
      char: c1,
      actionTokens: ['HA', 'R', 'SWAP ⇄'],
      actionText: `Trở lại sân tung Trọng Kích hoặc xả Nộ R dứt điểm đợt burst`,
      swapCue: `SWAP sang Healer`
    },
    {
      step: 4,
      char: sus,
      actionTokens: ['Intro', 'R', 'E', 'Outro'],
      actionText: `Hồi phục và gia tăng sát thương toàn đội trước khi lặp lại vòng xoay`,
      swapCue: 'Concerto 100%'
    }
  ];
}

/**
 * Tự động tìm kiếm và đề xuất các đội hình tối ưu dựa trên kho nhân vật người dùng đang có.
 * ĐẢM BẢO QUY TẮC KHÔNG TRÙNG NHÂN VẬT:
 * 1. Đội hình Meta Templates được ưu tiên hàng đầu (T0, T0.5).
 * 2. Đội hình luôn tuân thủ cấu trúc chuẩn: 1 Main DPS + 1 Sub-DPS/Buffer + 1 Sustain/Healer.
 * 3. Tuyệt đối KHÔNG ghép 2 Healer hàng đầu trong cùng 1 đội (Shorekeeper và Verina không bao giờ đi chung).
 * 4. Luuk Herssen là Main DPS (Glacio Broadblade), không bao giờ bị xếp vào vị trí Sustain.
 * 5. Tab Quickswap chỉ xuất hiện khi đội hình có cơ chế Quickswap thực thụ.
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
      
      // Kiểm tra tính hợp lệ của Quickswap
      const isQuickswapTeam = Boolean(
        template.type?.includes('Quickswap') ||
        (chars.length >= 2 && VALID_QUICKSWAP_PAIRS.has(`${chars[0]?.id}-${chars[1]?.id}`)) ||
        (chars.length >= 2 && VALID_QUICKSWAP_PAIRS.has(`${chars[1]?.id}-${chars[0]?.id}`))
      );

      // Điểm ưu tiên cao cho Template chính thức (120 - 150 điểm để luôn ăn đứt custom team)
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
        hasQuickswap: isQuickswapTeam,
        customRotations: {
          standard: [
            {
              step: 1,
              char: sustainChar?.name || 'Sustain / Healer',
              action: `Ra sân đầu tiên ➔ Dùng Skill E và Liberation (R) ➔ Bật Bell-Borne / Fallacy Echo tạo khiên & hồi máu ➔ Outro chuyển giao.`
            },
            {
              step: 2,
              char: buffChar?.name || 'Sub-DPS / Buffer',
              action: `Intro nhận buff từ Sustain ➔ Kích hoạt Skill E và Liberation (R) ➔ Tích đầy 100% Concerto ➔ Outro truyền buff cho Main DPS.`
            },
            {
              step: 3,
              char: mainChar?.name || 'Main DPS',
              action: `Intro vào sân nhận toàn bộ hiệu ứng Deepen ➔ Kích hoạt trạng thái Forte cường hóa ➔ Xả Resonance Liberation (R) dứt điểm.`
            }
          ],
          quickswap: isQuickswapTeam ? createDetailedQuickswapRotation(mainChar, buffChar, sustainChar) : null
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
        }

        // Điểm cộng nếu có Sustain xịn
        if (flex.id === 'shorekeeper' || flex.id === 'verina') {
          synergyScore += 8;
        }

        const avgPower = ((RESONATOR_POWER_TIER[dps.id] || 75) + (RESONATOR_POWER_TIER[buff.id] || 75) + (RESONATOR_POWER_TIER[flex.id] || 75)) / 3;
        const totalScore = Math.min(100, Math.round(synergyScore * 0.55 + avgPower * 0.45));

        const isQuickswap = VALID_QUICKSWAP_PAIRS.has(`${dps.id}-${buff.id}`) || VALID_QUICKSWAP_PAIRS.has(`${buff.id}-${dps.id}`);

        seenTeamKeys.add(teamKey);
        customTeams.push({
          id: `custom-${teamKey}`,
          name: `${dps.name} + ${buff.name} Synergy`,
          core: dps.id,
          members: [dps.id, buff.id, flex.id],
          type: isQuickswap ? 'Quickswap' : 'Hypercarry',
          description: notes,
          tags: [dps.element, isQuickswap ? 'Quickswap' : 'Hypercarry'],
          isCustom: true,
          matchScore: totalScore,
          characters: [dps, buff, flex],
          hasQuickswap: isQuickswap,
          customRotations: {
            standard: [
              {
                step: 1,
                char: flex.name,
                action: `Ra sân đầu tiên ➔ Dùng Resonance Skill (E) và Liberation (R) ➔ Bật Echo tạo khiên & hồi máu ➔ Tích đầy Concerto ➔ Outro chuyển giao.`
              },
              {
                step: 2,
                char: buff.name,
                action: `Intro nhận buff từ Sustain ➔ Kích hoạt Skill (E) và Liberation (R) ➔ Tích 100% Concerto ➔ Outro truyền buff chủ lực.`
              },
              {
                step: 3,
                char: dps.name,
                action: `Intro vào sân nhận trọn vẹn hiệu ứng Deepen từ ${buff.name} ➔ Kích hoạt trạng thái Forte ➔ Xả Resonance Liberation (R) dứt điểm.`
              }
            ],
            quickswap: isQuickswap ? createDetailedQuickswapRotation(dps, buff, flex) : null
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
 * Phân chia chuẩn xác:
 * 1. Tháp Giữa: BẮT BUỘC 2 đội hình riêng biệt (Tầng 1-2 & Tầng 3-4, mỗi tầng tốn 5 thể lực).
 *    - Tầng 3-4: Ưu tiên đội hình hưởng lợi lớn nhất từ Buff Mùa (+30% Liberation DMG, Unison, Electro).
 *    - Tầng 1-2: Đội hình thứ hai hưởng ưu thế hệ.
 * 2. Hai Tháp Bên (Trái & Phải):
 *    - Tầng 4 (Boss): Đội mạnh đánh tầng 4 (tốn 4 Vigor).
 *    - Tầng 1-3: Đội dọn tầng (tốn 1+2+3 = 6 Vigor).
 */
export function solveTowerOfAdversity(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length < 6) {
    return null;
  }

  const optimalTeams = generateOptimalTeams(ownedCharacterIds);
  if (optimalTeams.length < 2) {
    return null;
  }

  // 1. Chấm điểm độ tương thích với Buff Mùa Tháp Giữa (Tầng 3-4)
  // Hazard Buff: +30% Electro & Liberation DMG, +15% ATK khi kích hoạt Unison
  const scoreForHazardBossBuff = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const chars = team.characters || [];
    const elements = chars.map(c => c?.element);

    // Buff Liberation DMG cực lớn
    if (members.includes('xiangli_yao') || members.includes('calcharo') || members.includes('changli') || members.includes('augusta')) {
      score += 45;
    }
    // Buff Unison độc bản (3.7)
    if (members.includes('hsin') || members.includes('suoming')) {
      score += 50;
    }
    // Hệ Electro
    if (elements.includes('Electro')) {
      score += 35;
    }
    if (members.includes('yinlin')) {
      score += 25;
    }

    return score;
  };

  // 2. Chấm điểm cho Tháp Trái (Havoc & Basic ATK)
  const scoreForResonant = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const elements = (team.characters || []).map(c => c?.element);

    if (elements.includes('Havoc')) score += 40;
    if (members.includes('camellya') || members.includes('rover_havoc')) score += 35;
    if (members.includes('sanhua') || members.includes('danjin')) score += 25;
    return score;
  };

  // 3. Chấm điểm cho Tháp Phải (Spectro & Skill DMG)
  const scoreForEchoing = (team) => {
    let score = team.matchScore || 70;
    const members = team.members || [];
    const elements = (team.characters || []).map(c => c?.element);

    if (elements.includes('Spectro')) score += 40;
    if (members.includes('jinhsi') || members.includes('phoebe') || members.includes('carlotta')) score += 35;
    if (members.includes('zhezhi')) score += 25;
    return score;
  };

  // Sắp xếp các đội hình theo độ tương thích với Buff Tháp Giữa Tầng 3-4
  const sortedByHazardBuff = [...optimalTeams].sort((a, b) => scoreForHazardBossBuff(b) - scoreForHazardBossBuff(a));
  
  // Đội 1: Hazard Tầng 3-4 (Đội tận dụng tốt nhất Buff Tháp)
  const hazardBossTeam = sortedByHazardBuff[0];
  const remainingForOther = optimalTeams.filter(t => t.id !== hazardBossTeam.id);

  // Đội 2: Tháp Trái Tầng 4 hoặc Tháp Phải Tầng 4
  const sortedForResonant = [...remainingForOther].sort((a, b) => scoreForResonant(b) - scoreForResonant(a));
  const resonantTeam = sortedForResonant[0] || optimalTeams[0];
  const remainingAfterResonant = remainingForOther.filter(t => t.id !== resonantTeam.id);

  // Đội 3: Tháp Phải Tầng 4
  const sortedForEchoing = [...remainingAfterResonant].sort((a, b) => scoreForEchoing(b) - scoreForEchoing(a));
  const echoingTeam = sortedForEchoing[0] || remainingForOther[0] || optimalTeams[0];
  const remainingAfterEchoing = remainingAfterResonant.filter(t => t.id !== echoingTeam.id);

  // Đội 4: Hazard Tầng 1-2 (Nếu có đủ đội thứ 4)
  const hazardEarlyTeam = remainingAfterEchoing[0] || remainingAfterResonant[0] || remainingForOther[0] || optimalTeams[1] || hazardBossTeam;

  // Xây dựng kết quả chuẩn 3 tháp cho giao diện
  const result = {
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
    // Backward compatibility array cho các render cũ nếu cần
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

  return result;
}
