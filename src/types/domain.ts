// ====================================================================
// DOMAIN TYPES: WUTHERING WAVES SMART TEAM BUILDER & KNOWLEDGE SYSTEM
// ====================================================================

export type ElementType = 'Aero' | 'Electro' | 'Fusion' | 'Glacio' | 'Havoc' | 'Spectro';
export type WeaponType = 'Broadblade' | 'Gauntlets' | 'Pistols' | 'Rectifier' | 'Sword';

export type CharacterRole =
  | 'main_dps'
  | 'sub_dps'
  | 'burst_dps'
  | 'quickswap_dps'
  | 'off_field_dps'
  | 'support'
  | 'healer'
  | 'shielder'
  | 'buffer'
  | 'debuffer'
  | 'coordinated_attack'
  | 'concerto_enabler'
  | 'energy_support'
  | 'utility';

export interface Resonator {
  id: string;
  slug: string;
  name: string;
  title?: string;
  rarity: 4 | 5;
  element: ElementType;
  weaponType: WeaponType;
  roles: CharacterRole[];
  primaryRole: CharacterRole;
  avatarUrl: string;
  iconColor: string;
  isLive: boolean;
  tags: string[];
  bestWeapon?: string;
  bestEchoSet?: string;
  mainEcho?: string;
  outroSkill?: string;
  forteMechanic?: string;
  releaseVersion: string;
}

export type BuildObjective =
  | 'best_overall'
  | 'highest_damage'
  | 'easy_rotation'
  | 'comfortable_safe'
  | 'specific_main_dps';

export interface ObjectiveConfig {
  id: BuildObjective;
  name: string;
  description: string;
  weights: {
    synergy: number;
    damage: number;
    rotation: number;
    sustain: number;
    concerto: number;
  };
}

export interface ScoreBreakdown {
  mainDpsSynergy: number;
  support: number;
  buffs: number;
  rotation: number;
  sustain: number;
}

export interface RecommendedTeam {
  id: string;
  publicId: string;
  name: string;
  members: {
    character: Resonator;
    role: string;
    isFocus: boolean;
    position: number;
  }[];
  objective: BuildObjective;
  score: number;
  breakdown: ScoreBreakdown;
  reasons: string[];
  strengths: string[];
  weaknesses: string[];
  warnings: string[];
  rotationSummary: string;
  confidence: 'high' | 'medium' | 'low';
  gameVersion: string;
  isCustom?: boolean;
}

export interface CharacterSynergyRule {
  sourceSlug: string;
  targetSlug: string;
  synergyType: string;
  score: number;
  explanation: string;
  condition?: string;
}

export interface RecommendationRequest {
  ownedCharacterIds: string[];
  focusCharacterId?: string | null;
  objective: BuildObjective;
  targetVersion?: string;
}

export interface RecommendationResponse {
  teams: RecommendedTeam[];
  meta: {
    evaluatedCount: number;
    rosterSize: number;
    objective: BuildObjective;
    version: string;
    focusCharacter?: string | null;
    timestamp: string;
  };
}
