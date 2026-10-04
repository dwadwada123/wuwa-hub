// ====================================================================
// CONSTANTS & CONFIGURATION
// ====================================================================

import { BuildObjective, ElementType, ObjectiveConfig } from '@/types/domain';

// Team size is explicitly configurable, not hardcoded as magic numbers
export const TEAM_SIZE = 3;

// Default live target version for current recommendations
export const CURRENT_LIVE_VERSION = '3.7';

export const OBJECTIVES: Record<BuildObjective, ObjectiveConfig> = {
  best_overall: {
    id: 'best_overall',
    name: 'Best Overall',
    description: 'Harmonious balance between damage output, rotation uptime, and comfortable survivability.',
    weights: {
      synergy: 0.30,
      damage: 0.30,
      rotation: 0.20,
      sustain: 0.20,
      concerto: 0.15,
    },
  },
  highest_damage: {
    id: 'highest_damage',
    name: 'Highest Damage',
    description: 'Maximizes peak burst DPS and damage amplification deepens. High risk, high reward.',
    weights: {
      synergy: 0.35,
      damage: 0.45,
      rotation: 0.15,
      sustain: 0.05,
      concerto: 0.15,
    },
  },
  easy_rotation: {
    id: 'easy_rotation',
    name: 'Easy Rotation',
    description: 'Forgiving combo cycles with fast Concerto builds, smooth swaps, and minimal strict animation cancels.',
    weights: {
      synergy: 0.25,
      damage: 0.20,
      rotation: 0.35,
      sustain: 0.20,
      concerto: 0.30,
    },
  },
  comfortable_safe: {
    id: 'comfortable_safe',
    name: 'Comfortable / Safe',
    description: 'High survivability featuring strong shields, continuous heals, and crowd control for stress-free clears.',
    weights: {
      synergy: 0.20,
      damage: 0.15,
      rotation: 0.25,
      sustain: 0.40,
      concerto: 0.15,
    },
  },
  specific_main_dps: {
    id: 'specific_main_dps',
    name: 'Focused Main DPS',
    description: 'Locks your chosen carry and tailors the optimal Sub-DPS enabler and Support buffer around them.',
    weights: {
      synergy: 0.40,
      damage: 0.30,
      rotation: 0.15,
      sustain: 0.15,
      concerto: 0.20,
    },
  },
};

export const ELEMENT_THEMES: Record<ElementType, { name: string; badge: string; border: string; bg: string; text: string; glow: string }> = {
  Electro: {
    name: 'Electro',
    badge: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    border: 'border-purple-600/40',
    bg: 'bg-purple-950/20',
    text: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  Havoc: {
    name: 'Havoc',
    badge: 'bg-pink-950/80 text-pink-300 border-pink-800/60',
    border: 'border-pink-600/40',
    bg: 'bg-pink-950/20',
    text: 'text-pink-400',
    glow: 'rgba(236, 72, 153, 0.25)',
  },
  Spectro: {
    name: 'Spectro',
    badge: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    border: 'border-amber-500/40',
    bg: 'bg-amber-950/20',
    text: 'text-amber-300',
    glow: 'rgba(250, 204, 21, 0.25)',
  },
  Fusion: {
    name: 'Fusion',
    badge: 'bg-orange-950/80 text-orange-300 border-orange-800/60',
    border: 'border-orange-500/40',
    bg: 'bg-orange-950/20',
    text: 'text-orange-400',
    glow: 'rgba(249, 115, 22, 0.25)',
  },
  Aero: {
    name: 'Aero',
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/20',
    text: 'text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.25)',
  },
  Glacio: {
    name: 'Glacio',
    badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-950/20',
    text: 'text-cyan-300',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
};
