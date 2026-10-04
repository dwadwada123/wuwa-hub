import { CharacterSynergyRule, RecommendedTeam } from '../types/domain';
import { INITIAL_RESONATORS } from './resonators';

export const SYNERGY_RULES: CharacterSynergyRule[] = [
  {
    sourceSlug: 'hsin',
    targetSlug: 'suoming',
    synergyType: 'unison_response_dual_electro',
    score: 98,
    explanation: 'Hsin activates Unison Response Outro to pull Suoming with zero Concerto lag, compounding Electro Flare vulnerability in 3.7.',
  },
  {
    sourceSlug: 'hsin',
    targetSlug: 'xiangli_yao',
    synergyType: 'electro_burst_quickswap',
    score: 96,
    explanation: 'Hsin enables fluid quickswap rotations allowing Xiangli Yao to unleash Decaying Cube burst without rotation dead time.',
  },
  {
    sourceSlug: 'sanhua',
    targetSlug: 'camellya',
    synergyType: 'basic_attack_amplification',
    score: 99,
    explanation: 'Sanhua grants +38% Basic ATK Deepen in an ultra-fast 3.2s Concerto cycle, perfectly matching Camellya\'s Ephemeral whip dance.',
  },
  {
    sourceSlug: 'zhezhi',
    targetSlug: 'jinhsi',
    synergyType: 'coordinated_attack_skill_buff',
    score: 97,
    explanation: 'Zhezhi generates high-frequency coordinated Glacio attacks to cap Jinhsi\'s 50 Incandescence stacks, plus 25% Skill DMG Deepen.',
  },
  {
    sourceSlug: 'yuanwu',
    targetSlug: 'jinhsi',
    synergyType: 'instant_coordinated_battery',
    score: 94,
    explanation: 'Yuanwu takes 1 second of field time to drop his E pillar, firing coordinated attacks on every Jinhsi hit to effortlessly cap stacks.',
  },
  {
    sourceSlug: 'changli',
    targetSlug: 'encore',
    synergyType: 'quickswap_animation_cancel',
    score: 96,
    explanation: 'Changli buffs Fusion and Liberation DMG by 20%/25%; Encore heavy charge can be animation-canceled into Changli True Sight.',
  },
  {
    sourceSlug: 'mortefi',
    targetSlug: 'jiyan',
    synergyType: 'heavy_attack_amplification',
    score: 98,
    explanation: 'Mortefi grants 38% Heavy ATK Deepen and coordinated dragon projectiles that trigger on every swing of Jiyan\'s Lance of Qingloong.',
  },
  {
    sourceSlug: 'danjin',
    targetSlug: 'rover_havoc',
    synergyType: 'havoc_deepen',
    score: 95,
    explanation: 'Danjin transfers 23% Havoc DMG Deepen for 14s, supercharging Rover\'s Dark Surge and Dreamless execution.',
  },
  {
    sourceSlug: 'shorekeeper',
    targetSlug: 'any_dps',
    synergyType: 'universal_crit_buff',
    score: 98,
    explanation: 'Shorekeeper provides 12.5% Crit Rate, 25% Crit DMG, and teamwide healing with nearly 100% uptime.',
  },
  {
    sourceSlug: 'verina',
    targetSlug: 'any_dps',
    synergyType: 'universal_all_type_deepen',
    score: 96,
    explanation: 'Verina provides 15% All-Type DMG Deepen to the entire party for 30s with instant aerial concerto build.',
  },
  {
    sourceSlug: 'yinlin',
    targetSlug: 'xiangli_yao',
    synergyType: 'electro_liberation_deepen',
    score: 96,
    explanation: 'Yinlin provides 20% Electro DMG and 25% Liberation DMG Deepen, perfectly aligning with Xiangli Yao\'s Decaying Cube burst.',
  },
  {
    sourceSlug: 'sanhua',
    targetSlug: 'encore',
    synergyType: 'basic_attack_amplification',
    score: 95,
    explanation: 'Sanhua grants 38% Basic ATK Deepen, drastically amplifying Encore\'s Cosmos Rave basic attack combos during her Liberation state.',
  }
];

export const VERIFIED_META_TEAMS: RecommendedTeam[] = [
  {
    id: 'meta-team-hsin-electro',
    publicId: 'hsin-electro-unison',
    name: 'Hsin Unison Sworn Vigil',
    members: [
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'hsin')!,
        role: 'quickswap_dps',
        isFocus: true,
        position: 1,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'yinlin')!,
        role: 'sub_dps',
        isFocus: false,
        position: 2,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'shorekeeper')!,
        role: 'support',
        isFocus: false,
        position: 3,
      },
    ],
    objective: 'best_overall',
    score: 98,
    breakdown: {
      mainDpsSynergy: 99,
      support: 98,
      buffs: 98,
      rotation: 97,
      sustain: 97,
    },
    reasons: [
      'Hsin utilizes 3.7 Unison Response to trigger zero-delay instant Intro swaps and 25% Electro amplification.',
      'Yinlin provides persistent off-field Judgment coordinated lightning and 20% Electro + 25% Liberation Deepen.',
      'Shorekeeper provides 12.5% Crit Rate, 25% Crit DMG, and continuous Stellar Symphony heals with nearly 100% uptime.',
    ],
    strengths: [
      'Highest burst & sustained Electro damage ceiling in Version 3.7.',
      'Fluid quickswap window with no dead field-time intervals.',
      'High stagger break efficiency against Calamity class bosses.',
    ],
    weaknesses: [
      'High investment roster requiring two 5-star signature rectifiers.',
    ],
    warnings: [],
    rotationSummary: 'Shorekeeper (Skill → Lib → Echo) → Yinlin (Skill → Forte → Outro) → Hsin (Unison Intro → Skill → Liberation → Burst Loop) → Repeat.',
    confidence: 'high',
    gameVersion: '3.7',
  },
  {
    id: 'meta-team-jinhsi-resonance',
    publicId: 'jinhsi-dragonfire',
    name: 'Jinhsi Dragonfire Incarnation',
    members: [
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'jinhsi')!,
        role: 'main_dps',
        isFocus: true,
        position: 1,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'zhezhi')!,
        role: 'sub_dps',
        isFocus: false,
        position: 2,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'verina')!,
        role: 'support',
        isFocus: false,
        position: 3,
      },
    ],
    objective: 'highest_damage',
    score: 97,
    breakdown: {
      mainDpsSynergy: 98,
      support: 97,
      buffs: 98,
      rotation: 95,
      sustain: 96,
    },
    reasons: [
      'Zhezhi provides off-field coordinated Glacio phantoms that stack Jinhsi\'s Incandescence gauge at maximum speed.',
      'Zhezhi Outro grants 25% Resonance Skill Deepen, directly supercharging Jinhsi\'s Illuminous Epiphany dragon nuke.',
      'Verina delivers 15% All-Type DMG Deepen + instant Rejuvenating Glow team ATK buff.',
    ],
    strengths: [
      'Massive single-hit screenshot damage capable of 1-cycling Hazard Zone bosses.',
      'Extremely safe aerial combat maneuvers avoid ground AoE hazards.',
    ],
    weaknesses: [
      'Missing Incandescence timing heavily penalizes rotation damage output.',
    ],
    warnings: [],
    rotationSummary: 'Verina (Skill → Lib → Outro) → Zhezhi (Skill x3 → Lib → Echo → Outro) → Jinhsi (Intro → Skill → Incandescence Nuke → Outro) → Loop.',
    confidence: 'high',
    gameVersion: '3.7',
  },
  {
    id: 'meta-team-camellya-havoc',
    publicId: 'camellya-havoc-blossom',
    name: 'Camellya Havoc Blossom',
    members: [
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'camellya')!,
        role: 'main_dps',
        isFocus: true,
        position: 1,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'sanhua')!,
        role: 'sub_dps',
        isFocus: false,
        position: 2,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'shorekeeper')!,
        role: 'support',
        isFocus: false,
        position: 3,
      },
    ],
    objective: 'best_overall',
    score: 96,
    breakdown: {
      mainDpsSynergy: 97,
      support: 96,
      buffs: 96,
      rotation: 97,
      sustain: 95,
    },
    reasons: [
      'Sanhua builds Concerto in under 4 seconds and transfers 38% Basic ATK Deepen for 14s.',
      'Camellya\'s Blossom Ephemeral state scales primarily with Basic Attack multipliers, maximizing Sanhua\'s buff.',
      'Shorekeeper locks in guaranteed critical strike consistency and teamwide survivability.',
    ],
    strengths: [
      'Lightning-fast rotation cycles with Sanhua\'s instant Concerto generation.',
      'High continuous single-target and multi-target shred.',
    ],
    weaknesses: [
      'Requires precise spacing to keep enemy clusters within floral bud radius.',
    ],
    warnings: [],
    rotationSummary: 'Shorekeeper (Setup Buffs) → Sanhua (Skill → Detonate Ice → Echo → Outro) → Camellya (Blossom Stance → Basic Chains → Lib) → Loop.',
    confidence: 'high',
    gameVersion: '3.7',
  },
  {
    id: 'meta-team-jiyan-aero',
    publicId: 'jiyan-aero-monsoon',
    name: 'Jiyan Qingloong Tempest',
    members: [
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'jiyan')!,
        role: 'main_dps',
        isFocus: true,
        position: 1,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'mortefi')!,
        role: 'sub_dps',
        isFocus: false,
        position: 2,
      },
      {
        character: INITIAL_RESONATORS.find((r) => r.slug === 'verina')!,
        role: 'support',
        isFocus: false,
        position: 3,
      },
    ],
    objective: 'comfortable_safe',
    score: 95,
    breakdown: {
      mainDpsSynergy: 98,
      support: 95,
      buffs: 96,
      rotation: 93,
      sustain: 96,
    },
    reasons: [
      'Mortefi Outro grants 38% Heavy Attack Deepen, perfectly aligning with Jiyan\'s Qingloong lance strikes.',
      'Mortefi Liberation fires coordinated flame darts on every lance hit.',
      'High stagger pressure effortlessly suppresses aggressive mob chambers.',
    ],
    strengths: [
      'Supreme AoE grouping and crowd control.',
      'Highly accessible F2P support partner (Mortefi 4★).',
    ],
    weaknesses: [
      'Requires 125%+ Energy Recharge on Jiyan for 100% burst uptime.',
    ],
    warnings: [],
    rotationSummary: 'Verina (Skill → Lib → Outro) → Mortefi (Skill x2 → Lib → Heron Echo → Outro) → Jiyan (Intro → Lib → Heavy Lance Storm) → Loop.',
    confidence: 'high',
    gameVersion: '3.7',
  }
];
