import { RESONATORS, TEAM_TEMPLATES } from '../data/resonators';

export function generateOptimalTeams(ownedCharacterIds) {
  if (!ownedCharacterIds || ownedCharacterIds.length === 0) return [];

  const ownedSet = new Set(ownedCharacterIds);
  const matchedTeams = [];

  for (const template of TEAM_TEMPLATES) {
    const isFullTeam = template.members.every(m => ownedSet.has(m));
    if (isFullTeam) {
      matchedTeams.push({
        ...template,
        isCustom: false,
        matchScore: 100,
        characters: template.members.map(id => RESONATORS.find(r => r.id === id))
      });
    }
  }

  const ownedResonators = RESONATORS.filter(r => ownedSet.has(r.id));
  const mainDPSList = ownedResonators.filter(r => r.role.includes('Main') || r.role.includes('Quickswap'));
  const bufferList = ownedResonators.filter(r => r.role.includes('Sub-DPS') || r.role.includes('Buffer'));
  const healerList = ownedResonators.filter(r => r.role.includes('Healer') || r.role.includes('Support'));

  for (const dps of mainDPSList) {
    for (const buff of bufferList) {
      if (buff.id === dps.id) continue;

      for (const heal of (healerList.length > 0 ? healerList : [{ id: 'baizhi', name: 'Baizhi' }])) {
        if (heal.id === dps.id || heal.id === buff.id) continue;

        const teamKey = [dps.id, buff.id, heal.id].sort().join('-');
        const alreadyExists = matchedTeams.some(t => [...t.members].sort().join('-') === teamKey);

        if (!alreadyExists && ownedSet.has(heal.id)) {
          let synergyScore = 70;
          let notes = `Đội hình linh hoạt với core ${dps.name}`;

          if (dps.id === 'camellya' && buff.id === 'sanhua') {
            synergyScore += 25;
            notes = 'Sanhua Outro buff 38% Basic ATK cực hợp Camellya';
          } else if (dps.id === 'jinhsi' && (buff.id === 'zhezhi' || buff.id === 'yuanwu' || buff.id === 'yinlin')) {
            synergyScore += 30;
            notes = `${buff.name} Coordinated Attack nạp tầng Incandescence thần tốc cho Jinhsi`;
          } else if (dps.id === 'jiyan' && buff.id === 'mortefi') {
            synergyScore += 30;
            notes = 'Mortefi Outro buff 38% Heavy ATK cho Thanh Long Jiyan';
          } else if (dps.id === 'hsin' || buff.id === 'hsin') {
            synergyScore += 25;
            notes = 'Tận dụng Unison của Hsin (3.7) luân chuyển không tốn Concerto';
          }

          matchedTeams.push({
            id: `custom-${teamKey}`,
            name: `${dps.name} + ${buff.name} Synergy`,
            core: dps.id,
            members: [dps.id, buff.id, heal.id],
            type: dps.role.includes('Quickswap') ? 'Quickswap' : 'Hypercarry',
            description: notes,
            tags: [dps.element, 'Synergy Match'],
            isCustom: true,
            matchScore: synergyScore,
            characters: [dps, buff, RESONATORS.find(r => r.id === heal.id)]
          });
        }
      }
    }
  }

  return matchedTeams.sort((a, b) => b.matchScore - a.matchScore);
}

export function solveTowerOfAdversity(ownedCharacterIds) {
  const allPossibleTeams = generateOptimalTeams(ownedCharacterIds);
  if (allPossibleTeams.length === 0) return null;

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

  return null;
}
