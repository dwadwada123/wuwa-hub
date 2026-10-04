'use client';

import React from 'react';
import { X, Play, Clock, Sparkles, ArrowRight, Zap, Shield, RotateCcw } from 'lucide-react';
import { RecommendedTeam } from '../../../types/domain';

interface RotationModalProps {
  team: RecommendedTeam | null;
  onClose: () => void;
}

export const RotationModal: React.FC<RotationModalProps> = ({ team, onClose }) => {
  if (!team) return null;

  const carry = team.members.find((m) => m.role === 'main_dps') || team.members[0];
  const subDps = team.members.find((m) => m.role.includes('sub_dps') || m.role.includes('quickswap')) || team.members[1];
  const support = team.members.find((m) => m.role.includes('support') || m.role.includes('healer') || m.role.includes('sustain')) || team.members[2];

  // Specific combat rotation tailored to character kits
  const rotationSteps = [
    {
      step: 1,
      phase: 'Opener & Team Buff Setup',
      resonator: support?.character?.name || 'Support Resonator',
      action: 'Resonance Skill (E) → Resonance Liberation (R) → 4-Cost Echo Skill (Bell-Borne / Fallacy)',
      detail: 'Fills Concerto bar rapidly. Triggers Rejuvenating Glow 5-pc (+15% ATK) and activates Outro Skill (15% All-DMG Amplification). Swap immediately when Concerto glows.',
      duration: '3 - 4s',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
    {
      step: 2,
      phase: 'Amplification & Concerto Enabler',
      resonator: subDps?.character?.name || 'Sub-DPS Resonator',
      action: 'Intro Skill → Skill (E) → Forte Circuit Chain → Echo Skill (Impermanence Heron / Suhsin)',
      detail: `Deposits Moonlit Clouds / Sworn Vigil buffs. Executes animation cancel into Outro Skill to funnel deep elemental damage deepen (+20-25%) directly into ${carry?.character?.name}.`,
      duration: '4 - 5s',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    },
    {
      step: 3,
      phase: 'Hypercarry Liberation Burst',
      resonator: carry?.character?.name || 'Main DPS Resonator',
      action: 'Intro Skill → Enhanced Forte Gauge → Resonance Liberation (R) → Basic/Heavy Burst Loop',
      detail: `Consumes stacked buffs and Outro deepen effects during maximum damage window. Discharges Calamity Echo active skill (e.g. Jue, Dreamless, Inferno Rider) before Forte expiration.`,
      duration: '7 - 9s',
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      step: 4,
      phase: 'Concerto Reset & Loop',
      resonator: 'Team Quickswap',
      action: 'Quickswap to Support upon Carry Outro activation or Forte depletion.',
      detail: 'Ensures zero field downtime. Energy recharge regenerates bursts for seamless 20-22 second rotation cycles in Tower of Adversity.',
      duration: '1 - 2s',
      color: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-gold p-6 sm:p-7 shadow-2xl border border-amber-400/30 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                Optimal Combat Rotation Guide
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                v{team.gameVersion}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequence for <strong className="text-amber-300">{team.name}</strong> ({team.members.map((m) => m.character.name).join(' • ')})\n            </p>
          </div>
        </div>

        {/* Timeline Sequence */}
        <div className="space-y-4">
          {rotationSteps.map((step) => (
            <div
              key={step.step}
              className="relative p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-white/[0.15] transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.color}`}>
                    STEP {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-white">{step.phase}</h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>~{step.duration}</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Resonator: {step.resonator}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-xs font-mono text-cyan-300 leading-relaxed">
                {step.action}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Animation Canceling & Mechanics Pro-Tip */}
        <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Resonance Optimization Tips</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Always swap during long liberation / heavy skill windups when Concerto is full. Wuthering Waves allows dual-character presence on field during active animation intervals, preventing DPS downtime!
          </p>
        </div>

        {/* Close Button at bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
