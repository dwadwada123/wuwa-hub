'use client';

import React, { useState } from 'react';
import {
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { RecommendedTeam, ElementType } from '../../../types/domain';

interface TeamCardProps {
  team: RecommendedTeam;
  rank: number;
  onSaveTeam: (team: RecommendedTeam) => void;
  onOpenRotation: (team: RecommendedTeam) => void;
  onShareTeam: (team: RecommendedTeam) => void;
  isSaved?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  rank,
  onSaveTeam,
  onOpenRotation,
  onShareTeam,
  isSaved = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getElementBadgeClass = (el: ElementType) => {
    switch (el) {
      case 'Electro': return 'element-electro';
      case 'Havoc': return 'element-havoc';
      case 'Spectro': return 'element-spectro';
      case 'Aero': return 'element-aero';
      case 'Fusion': return 'element-fusion';
      case 'Glacio': return 'element-glacio';
      default: return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-amber-400 border-amber-400/40 bg-amber-400/10';
    if (score >= 80) return 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10';
    if (score >= 70) return 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10';
    return 'text-slate-300 border-slate-600 bg-slate-800/20';
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 shadow-xl overflow-hidden group">
      {/* Top Banner: Rank & Score */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-white/[0.02] to-transparent">
        <div className="flex items-center gap-3">
          {/* Rank Badge */}
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            #{rank}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {team.name}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                v{team.gameVersion} VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Objective: <strong className="text-slate-200 capitalize">{team.objective.replace('_', ' ')}</strong></span>
              <span>•</span>
              <span className="capitalize">{team.confidence} Confidence</span>
            </p>
          </div>
        </div>

        {/* Score Dial / Badge */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getScoreColor(team.score)}`}>
            <Sparkles className="w-4 h-4" />
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-80">Synergy Score</div>
              <div className="text-xl sm:text-2xl font-black font-mono leading-none">
                {team.score}
                <span className="text-xs font-normal opacity-70">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster Trio Display */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {team.members.map((slot, index) => {
            const char = slot.character;
            return (
              <div
                key={char.id}
                className="relative rounded-xl p-3 bg-slate-900/60 border border-white/[0.06] hover:border-white/[0.15] transition-all flex items-center gap-3.5"
              >
                {/* Position Marker */}
                <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 font-bold">
                  SLOT {index + 1}
                </div>

                {/* Character Avatar */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-white/[0.1] shrink-0">
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center font-bold text-lg"
                    style={{ color: char.iconColor, backgroundColor: `${char.iconColor}20` }}
                  >
                    {char.name.slice(0, 2)}
                  </div>
                  {slot.isFocus && (
                    <div className="absolute bottom-0 inset-x-0 bg-amber-500/90 text-slate-950 text-[9px] font-black text-center py-0.2">
                      CARRY
                    </div>
                  )}
                </div>

                {/* Character Specs */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${getElementBadgeClass(
                        char.element
                      )}`}
                    >
                      {char.element}
                    </span>
                    <span className="text-[10px] text-amber-400">
                      {'★'.repeat(char.rarity)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white truncate">{char.name}</h4>
                  <div className="text-[11px] font-semibold text-amber-400/90 capitalize mt-0.5">
                    {slot.role.replace('_', ' ')}
                  </div>

                  {/* Recommended Setup Badges */}
                  <div className="mt-1.5 flex flex-col gap-0.5 text-[10px] text-slate-400">
                    {char.bestEchoSet && (
                      <span className="truncate" title={`Best Echo: ${char.bestEchoSet}`}>
                        Echo: <span className="text-slate-300 font-medium">{char.bestEchoSet}</span>
                      </span>
                    )}
                    {char.bestWeapon && (
                      <span className="truncate" title={`Weapon: ${char.bestWeapon}`}>
                        Wpn: <span className="text-slate-300 font-medium">{char.bestWeapon}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reasons List */}
        <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Why This Team is Recommended</span>
          </div>
          <ul className="space-y-1.5">
            {team.reasons.map((reason, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings or Limitations */}
        {team.warnings && team.warnings.length > 0 && (
          <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
            {team.warnings.map((warn, idx) => (
              <div key={idx} className="text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{warn}</span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable Breakdown Drawer */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-4 animate-in fade-in duration-200">
            {/* Detailed Metric Progress Bars */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Score Dimension Breakdown</span>
                <span className="text-[11px] text-slate-400 font-mono">Weighted Algorithm</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Carry Synergy */}
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.04]">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Main DPS Synergy</span>
                    <span className="font-mono font-bold text-amber-400">{team.breakdown.mainDpsSynergy}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${team.breakdown.mainDpsSynergy}%` }}
                    />
                  </div>
                </div>

                {/* Support & Amplification */}
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.04]">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Support & Deepen Buffs</span>
                    <span className="font-mono font-bold text-cyan-400">{team.breakdown.support}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${team.breakdown.support}%` }}
                    />
                  </div>
                </div>

                {/* Rotation Flow */}
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.04]">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Concerto & Rotation Flow</span>
                    <span className="font-mono font-bold text-purple-400">{team.breakdown.rotation}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${team.breakdown.rotation}%` }}
                    />
                  </div>
                </div>

                {/* Sustain */}
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-white/[0.04]">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Sustain & Survival</span>
                    <span className="font-mono font-bold text-emerald-400">{team.breakdown.sustain}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${team.breakdown.sustain}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rotation Preview Summary */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotation Loop Summary</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                {team.rotationSummary}
              </p>
            </div>
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
          {/* Toggle Details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1 py-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Hide Analysis</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>View Full Scoring Analysis</span>
              </>
            )}
          </button>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenRotation(team)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rotation Guide</span>
            </button>

            <button
              onClick={() => onShareTeam(team)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Share</span>
            </button>

            <button
              onClick={() => onSaveTeam(team)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                isSaved
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border-amber-400/40'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Team</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
