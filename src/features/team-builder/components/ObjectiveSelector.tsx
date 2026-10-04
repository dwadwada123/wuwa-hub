'use client';

import React from 'react';
import { Target, Zap, Shield, Repeat, Sparkles, Users, Crown, ArrowRight } from 'lucide-react';
import { Resonator, BuildObjective } from '../../../types/domain';
import { TEAM_SIZE, OBJECTIVES } from '../../../lib/constants';

interface ObjectiveSelectorProps {
  ownedResonators: Resonator[];
  focusCharacterId: string | null;
  onSelectFocusCharacter: (id: string | null) => void;
  selectedObjective: BuildObjective;
  onSelectObjective: (obj: BuildObjective) => void;
  onGenerateTeams: () => void;
  isGenerating: boolean;
}

export const ObjectiveSelector: React.FC<ObjectiveSelectorProps> = ({
  ownedResonators,
  focusCharacterId,
  onSelectFocusCharacter,
  selectedObjective,
  onSelectObjective,
  onGenerateTeams,
  isGenerating,
}) => {
  const objectiveIcons = {
    best_overall: <Sparkles className="w-4 h-4 text-amber-400" />,
    highest_damage: <Zap className="w-4 h-4 text-rose-400" />,
    easy_rotation: <Repeat className="w-4 h-4 text-cyan-400" />,
    comfortable_safe: <Shield className="w-4 h-4 text-emerald-400" />,
    specific_main_dps: <Crown className="w-4 h-4 text-amber-300" />,
  };

  const hasEnough = ownedResonators.length >= TEAM_SIZE;

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/[0.08] shadow-xl space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step 2: Focus Main DPS Selection */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Step 2: Focus Main DPS (Optional)</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {ownedResonators.length} available
            </span>
          </div>

          <div className="relative">
            <select
              value={focusCharacterId || ''}
              onChange={(e) => onSelectFocusCharacter(e.target.value ? e.target.value : null)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Auto-Detect Best Carry (Any Main DPS)</option>
              {ownedResonators.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name} ({char.element} • {char.primaryRole.replace('_', ' ')})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Lock in a specific hypercarry (e.g. Hsin, Jinhsi, Changli) or leave on auto to find the highest-synergy team across your entire roster.
          </p>
        </div>

        {/* Step 3: Objective Selection */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Step 3: Select Team Objective</span>
            </label>
            <div className="flex items-center gap-1 text-[11px] text-amber-400/90 font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>Team Size: {TEAM_SIZE} Resonators</span>
            </div>
          </div>

          {/* Objective Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(OBJECTIVES) as BuildObjective[]).map((key) => {
              const obj = OBJECTIVES[key];
              const isSelected = selectedObjective === key;

              return (
                <button
                  key={key}
                  onClick={() => onSelectObjective(key)}
                  className={`p-2.5 rounded-xl text-left border transition-all duration-200 flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400/60 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/30'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{objectiveIcons[key]}</div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      {obj.name}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-snug mt-0.5 line-clamp-1">
                      {obj.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          {!hasEnough ? (
            <span className="text-amber-400 font-medium">
              ⚠️ Please select at least {TEAM_SIZE} Resonators in Step 1 to generate recommendations.
            </span>
          ) : (
            <span>
              Ready to evaluate potential team synergies with verified 3.7 combat data.
            </span>
          )}
        </div>

        <button
          onClick={onGenerateTeams}
          disabled={!hasEnough || isGenerating}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Simulating Rotations...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Calculate Best Teams</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
