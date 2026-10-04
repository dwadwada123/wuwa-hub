// ====================================================================
// SMART TEAM RECOMMENDATION ENGINE (VERSION 3.7 AWARE & MODULAR)
// ====================================================================

import {
  Resonator,
  BuildObjective,
  RecommendedTeam,
  ScoreBreakdown,
  RecommendationResponse,
} from '../../../types/domain';
import { TEAM_SIZE, OBJECTIVES, CURRENT_LIVE_VERSION } from '../../../lib/constants';
import { SYNERGY_RULES } from '../../../data/fallbackData';

interface GenerateOptions {
  roster: Resonator[];
  focusCharacterId?: string | null;
  objective?: BuildObjective;
  teamSize?: number;
  targetVersion?: string;
  limit?: number;
}

export function recommendTeams(options: GenerateOptions): RecommendationResponse {
  const {
    roster,
    focusCharacterId = null,
    objective = 'best_overall',
    teamSize = TEAM_SIZE,
    targetVersion = CURRENT_LIVE_VERSION,
    limit = 10,
  } = options;

  const validRoster = roster.filter((r) => r.isLive);

  // Insufficient roster check
  if (validRoster.length < teamSize) {
    return {
      teams: [],
      meta: {
        evaluatedCount: 0,
        rosterSize: validRoster.length,
        objective,
        version: targetVersion,
        focusCharacter: focusCharacterId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // If focus character is specified, verify ownership
  let focusChar: Resonator | undefined;
  if (focusCharacterId) {
    focusChar = validRoster.find((r) => r.id === focusCharacterId || r.slug === focusCharacterId);
    if (!focusChar) {
      // Focus character not owned
      return {
        teams: [],
        meta: {
          evaluatedCount: 0,
          rosterSize: validRoster.length,
          objective,
          version: targetVersion,
          focusCharacter: focusCharacterId,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  // Generate candidate combinations
  const combinations = generateCombinations(validRoster, teamSize, focusChar);
  const scoredTeams: RecommendedTeam[] = [];

  for (const combo of combinations) {
    const scored = evaluateTeam(combo, objective, targetVersion, focusChar);
    if (scored) {
      scoredTeams.push(scored);
    }
  }

  // Deterministic sorting: by score descending, then by primary carry name, then second member name
  scoredTeams.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const nameA = a.members.map((m) => m.character.name).join(',');
    const nameB = b.members.map((m) => m.character.name).join(',');
    return nameA.localeCompare(nameB);
  });

  const finalTeams = scoredTeams.slice(0, limit);

  return {
    teams: finalTeams,
    meta: {
      evaluatedCount: combinations.length,
      rosterSize: validRoster.length,
      objective,
      version: targetVersion,
      focusCharacter: focusChar ? focusChar.name : null,
      timestamp: new Date().toISOString(),
    },
  };
}

// Generate combinations of size N containing focus character (if requested)
function generateCombinations(
  roster: Resonator[],
  k: number,
  focusChar?: Resonator
): Resonator[][] {
  const results: Resonator[][] = [];

  if (focusChar) {
    // Other pool excluding focus character
    const others = roster.filter((r) => r.id !== focusChar.id);
    const subCombos: Resonator[][] = [];

    function findCombos(start: number, current: Resonator[]) {
      if (current.length === k - 1) {
        subCombos.push([...current]);
        return;
      }
      for (let i = start; i < others.length; i++) {
        current.push(others[i]);
        findCombos(i + 1, current);
        current.pop();
      }
    }

    findCombos(0, []);

    for (const sub of subCombos) {
      results.push([focusChar, ...sub]);
    }
  } else {
    function findCombos(start: number, current: Resonator[]) {
      if (current.length === k) {
        results.push([...current]);
        return;
      }
      for (let i = start; i < roster.length; i++) {
        current.push(roster[i]);
        findCombos(i + 1, current);
        current.pop();
      }
    }
    findCombos(0, []);
  }

  return results;
}

// Evaluate and score a specific team composition
function evaluateTeam(
  rawMembers: Resonator[],
  objective: BuildObjective,
  gameVersion: string,
  focusChar?: Resonator
): RecommendedTeam | null {
  // Determine optimal member ordering (Position 1 = Main DPS, Pos 2 = Sub DPS / Enabler, Pos 3 = Sustain / Buffer)
  const orderedMembers = organizeTeamPositions(rawMembers, focusChar);
  const mainDps = orderedMembers[0];
  const subDps = orderedMembers[1];
  const support = orderedMembers[2];

  const reasons: string[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const warnings: string[] = [];

  // 1. EVALUATE SUSTAIN & HEALING
  let sustainScore = 40;
  const isHealerOrShielder = (r: Resonator) =>
    r.roles.includes('healer') || r.roles.includes('shielder') || r.slug === 'shorekeeper' || r.slug === 'verina';

  const sustainMembers = orderedMembers.filter(isHealerOrShielder);

  if (sustainMembers.length >= 1) {
    const topSustain = sustainMembers[0];
    if (topSustain.slug === 'shorekeeper') {
      sustainScore = 99;
      reasons.push('The Shorekeeper provides top-tier continuous healing and Stella Field party buffs.');
      strengths.push('Tier 0 Crit Rate & Crit DMG enhancement with unrivaled team protection.');
    } else if (topSustain.slug === 'verina') {
      sustainScore = 97;
      reasons.push('Verina ensures maximum party survivability while providing universal 15% All-Type DMG Deepen.');
      strengths.push('High-frequency photosynthesis healing and effortless Concerto generation.');
    } else if (topSustain.slug === 'baizhi' || topSustain.slug === 'buling' || topSustain.slug === 'youhu') {
      sustainScore = 88;
      reasons.push(`${topSustain.name} supplies reliable team healing and utility buffs.`);
      strengths.push('Dependable sustain for high-difficulty challenges.');
    } else if (topSustain.slug === 'jianxin' || topSustain.slug === 'taoqi') {
      sustainScore = 82;
      reasons.push(`${topSustain.name} offers damage mitigation and absorption shields.`);
      strengths.push('Solid defensive posture and crowd control.');
    }
  } else {
    sustainScore = 35;
    warnings.push('Warning: Team has no dedicated healer or shielder. Extreme dodging precision required.');
    weaknesses.push('High vulnerability to attrition damage in prolonged boss fights.');
  }

  // 2. EVALUATE SUPPORT & ENABLERS
  let supportScore = 50;
  const bufferCount = orderedMembers.filter((r) => r.roles.includes('buffer') || r.roles.includes('support')).length;
  supportScore = Math.min(99, 55 + bufferCount * 22);

  // 3. EVALUATE MAIN DPS & SPECIFIC PAIRWISE SYNERGIES
  let synergyScore = 60;
  let buffsScore = 60;

  // Check synergy rules
  for (let i = 0; i < orderedMembers.length; i++) {
    for (let j = 0; j < orderedMembers.length; j++) {
      if (i === j) continue;
      const sChar = orderedMembers[i];
      const tChar = orderedMembers[j];

      // Exact rule match
      const rule = SYNERGY_RULES.find(
        (sr) =>
          (sr.sourceSlug === sChar.slug && (sr.targetSlug === tChar.slug || sr.targetSlug === 'any_dps')) ||
          (sr.sourceSlug === tChar.slug && (sr.targetSlug === sChar.slug || sr.targetSlug === 'any_dps'))
      );

      if (rule) {
        synergyScore = Math.max(synergyScore, rule.score);
        if (!reasons.includes(rule.explanation)) {
          reasons.push(rule.explanation);
        }
      }
    }
  }

  // Special 3.7 Unison mechanic detection
  const hasUnisonPair = orderedMembers.some((r) => r.slug === 'hsin') && orderedMembers.some((r) => r.slug === 'suoming' || r.slug === 'xiangli_yao');
  if (hasUnisonPair) {
    synergyScore = Math.max(synergyScore, 98);
    buffsScore = Math.max(buffsScore, 97);
    reasons.push('Leverages the Version 3.7 Unison Response mechanic to bypass swap delays and trigger dual-Electro burst.');
    strengths.push('Near-zero Concerto downtime and instant dual-carry field transitions.');
  }

  // Camellya + Sanhua combo
  if (orderedMembers.some((r) => r.slug === 'camellya') && orderedMembers.some((r) => r.slug === 'sanhua')) {
    synergyScore = Math.max(synergyScore, 99);
    buffsScore = Math.max(buffsScore, 98);
    reasons.push("Sanhua provides +38% Basic ATK Deepen via Outro, perfectly aligning with Camellya's Ephemeral whip flurries.");
    strengths.push("Fastest rotation cycle in the meta (Sanhua builds Concerto in ~3.2 seconds).");
  }

  // Jiyan + Mortefi combo
  if (orderedMembers.some((r) => r.slug === 'jiyan') && orderedMembers.some((r) => r.slug === 'mortefi')) {
    synergyScore = Math.max(synergyScore, 98);
    buffsScore = Math.max(buffsScore, 97);
    reasons.push("Mortefi's Outro empowers Jiyan's entire Lance of Qingloong liberation with +38% Heavy ATK Deepen and coordinated missiles.");
    strengths.push("Supreme AoE wave clearing and mob vacuuming.");
  }

  // Jinhsi + (Zhezhi or Yuanwu)
  if (orderedMembers.some((r) => r.slug === 'jinhsi') && (orderedMembers.some((r) => r.slug === 'zhezhi') || orderedMembers.some((r) => r.slug === 'yuanwu'))) {
    synergyScore = Math.max(synergyScore, 97);
    buffsScore = Math.max(buffsScore, 96);
    reasons.push("High-frequency coordinated attacks consistently charge Jinhsi's 50 Incandescence stacks for maximum dragon beam nukes.");
    strengths.push("Devastating single-hit burst damage capable of one-shotting boss phases.");
  }

  // Changli + Encore
  if (orderedMembers.some((r) => r.slug === 'changli') && orderedMembers.some((r) => r.slug === 'encore')) {
    synergyScore = Math.max(synergyScore, 96);
    buffsScore = Math.max(buffsScore, 95);
    reasons.push("Changli's Fusion and Liberation buffs amplify Encore, while animation cancels allow simultaneous dual-DPS output.");
    strengths.push("Continuous combat flow with zero idle frames.");
  }

  // 4. ROTATION SCORE
  let rotationScore = 70;
  const fastConcertoUnits = orderedMembers.filter((r) => r.slug === 'sanhua' || r.slug === 'verina' || r.slug === 'hsin' || r.slug === 'yuanwu').length;
  rotationScore = Math.min(99, 65 + fastConcertoUnits * 12);

  // 5. PENALTIES
  let penalty = 0;

  // Conflicting field time penalty: Multiple greedy on-field carries
  const onFieldCarries = orderedMembers.filter((r) =>
    ['jiyan', 'calcharo', 'lingyang', 'carlotta', 'chixia'].includes(r.slug)
  );
  if (onFieldCarries.length >= 2) {
    penalty += 22;
    warnings.push(`Rotation conflict: ${onFieldCarries.map((c) => c.name).join(' and ')} both demand high on-field uptime, resulting in clunky rotations.`);
    weaknesses.push('Split field time reduces overall DPS output.');
  }

  // Missing sustain penalty (unless highest_damage objective)
  if (sustainMembers.length === 0) {
    penalty += objective === 'highest_damage' ? 10 : 22;
  }

  // Calculate final weighted score according to selected objective
  const config = OBJECTIVES[objective];
  const w = config.weights;

  // Breakdown values
  const breakdown: ScoreBreakdown = {
    mainDpsSynergy: Math.min(100, Math.round(synergyScore)),
    support: Math.min(100, Math.round(supportScore)),
    buffs: Math.min(100, Math.round(buffsScore)),
    rotation: Math.min(100, Math.round(rotationScore)),
    sustain: Math.min(100, Math.round(sustainScore)),
  };

  const rawWeightedScore =
    breakdown.mainDpsSynergy * w.synergy +
    breakdown.buffs * w.damage +
    breakdown.rotation * w.rotation +
    breakdown.sustain * w.sustain +
    breakdown.support * w.concerto;

  const finalScore = Math.max(20, Math.min(100, Math.round(rawWeightedScore - penalty)));

  // Team naming & rotation summary
  const teamName = `${mainDps.name} ${subDps.name} ${support.name}`;
  const rotationSummary = `${support.name} setup buffs ➔ ${subDps.name} Concerto build & Outro ➔ ${mainDps.name} DPS window`;

  return {
    id: `rec-${orderedMembers.map((m) => m.slug).join('-')}-${objective}`,
    publicId: `${orderedMembers.map((m) => m.slug).join('-')}-${Date.now().toString(36).slice(-4)}`,
    name: teamName,
    members: orderedMembers.map((char, idx) => ({
      character: char,
      role: idx === 0 ? 'Main DPS' : idx === 1 ? 'Sub-DPS / Enabler' : 'Support / Sustain',
      isFocus: focusChar ? char.id === focusChar.id : idx === 0,
      position: idx + 1,
    })),
    objective,
    score: finalScore,
    breakdown,
    reasons: reasons.slice(0, 4),
    strengths: strengths.length > 0 ? strengths : ['Solid elemental and role coverage.'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Standard cooldown management required.'],
    warnings,
    rotationSummary,
    confidence: 'high',
    gameVersion,
  };
}

// Order 3 resonators into: [Main DPS, Sub DPS / Buffer, Support / Sustain]
function organizeTeamPositions(members: Resonator[], focusChar?: Resonator): Resonator[] {
  const result: Resonator[] = [];
  const pool = [...members];

  // If focus character is specified, place them in Position 1 (or position 3 if pure healer)
  if (focusChar && pool.some((r) => r.id === focusChar.id)) {
    result.push(focusChar);
    const remaining = pool.filter((r) => r.id !== focusChar.id);

    // Pick best sustain for slot 3
    const sustainIdx = remaining.findIndex(
      (r) => r.roles.includes('healer') || r.roles.includes('shielder') || r.slug === 'shorekeeper' || r.slug === 'verina'
    );
    if (sustainIdx !== -1) {
      const sustain = remaining.splice(sustainIdx, 1)[0];
      result.push(remaining[0]); // Slot 2 (Sub-DPS)
      result.push(sustain);      // Slot 3 (Sustain)
    } else {
      result.push(...remaining);
    }
    return result;
  }

  // Automatic sorting:
  // 1. Find Sustain (Slot 3)
  let sustainChar: Resonator | undefined;
  const sustainIdx = pool.findIndex(
    (r) => r.slug === 'shorekeeper' || r.slug === 'verina' || r.roles.includes('healer') || r.roles.includes('shielder')
  );
  if (sustainIdx !== -1) {
    sustainChar = pool.splice(sustainIdx, 1)[0];
  }

  // 2. Find Main DPS (Slot 1)
  let mainDpsIdx = pool.findIndex((r) => r.primaryRole === 'main_dps' || r.roles.includes('main_dps'));
  if (mainDpsIdx === -1) mainDpsIdx = 0;
  const mainDpsChar = pool.splice(mainDpsIdx, 1)[0];

  // 3. Remainder is Slot 2 (Sub-DPS / Enabler)
  const subDpsChar = pool[0];

  return [mainDpsChar, subDpsChar || mainDpsChar, sustainChar || pool[1] || mainDpsChar];
}
