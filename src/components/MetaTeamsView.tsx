'use client';

import React from 'react';
import { Shield, Sparkles, Play, Award, Zap } from 'lucide-react';
import { VERIFIED_META_TEAMS } from '../data/fallbackData';
import { RecommendedTeam } from '../types/domain';

interface MetaTeamsViewProps {
  onOpenRotation: (team: RecommendedTeam) => void;
  onShareTeam: (team: RecommendedTeam) => void;
}

export const MetaTeamsView: React.FC<MetaTeamsViewProps> = ({ onOpenRotation, onShareTeam }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Award className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Version 3.7 Verified Meta Team Compositions
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Top performing Tower of Adversity hazard zone lineups researched and cross-checked against live 3.7 mechanics.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 radar-dot" />
            <span>PATCH 3.7 CERTIFIED</span>
          </div>
        </div>
      </div>

      {/* Meta Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {VERIFIED_META_TEAMS.map((team, idx) => (
          <div
            key={team.id || idx}
            className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-amber-400/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    TIER 0 / S+
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide">{team.name}</h3>
                </div>
                <div className="text-sm font-black font-mono text-amber-400">
                  {team.score}/100
                </div>
              </div>

              {/* Members Trio */}
              <div className="grid grid-cols-3 gap-2 mt-3.5">
                {team.members.map((slot) => (
                  <div
                    key={slot.character.id}
                    className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-center space-y-1.5"
                  >
                    <div className="relative w-12 h-12 mx-auto rounded-lg overflow-hidden bg-slate-950 border border-white/[0.1]">
                      <img
                        src={slot.character.avatarUrl}
                        alt={slot.character.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center font-bold text-sm"
                        style={{ color: slot.character.iconColor, backgroundColor: `${slot.character.iconColor}20` }}
                      >
                        {slot.character.name.slice(0, 2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate">{slot.character.name}</div>
                      <div className="text-[10px] text-amber-400/90 capitalize truncate">
                        {slot.role.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="mt-3.5 space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Strengths:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {team.strengths.slice(0, 2).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04] text-slate-300">
                  <div className="font-bold text-amber-300 flex items-center gap-1 text-[11px] uppercase tracking-wider mb-1">
                    <Zap className="w-3 h-3 text-amber-400" /> Rotation Summary:
                  </div>
                  <p className="text-[11px] font-mono leading-relaxed line-clamp-2">
                    {team.rotationSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
              <button
                onClick={() => onOpenRotation(team)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Rotation Guide</span>
              </button>
              <button
                onClick={() => onShareTeam(team)}
                className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-semibold transition-colors"
              >
                Share Lineup
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
