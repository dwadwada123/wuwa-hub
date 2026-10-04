'use client';

import React from 'react';
import { X, Bookmark, Trash2, Share2, Play, Sparkles } from 'lucide-react';
import { RecommendedTeam } from '../../../types/domain';

interface SavedTeamsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTeams: RecommendedTeam[];
  onRemoveTeam: (id: string) => void;
  onOpenRotation: (team: RecommendedTeam) => void;
  onShareTeam: (team: RecommendedTeam) => void;
}

export const SavedTeamsDrawer: React.FC<SavedTeamsDrawerProps> = ({
  isOpen,
  onClose,
  savedTeams,
  onRemoveTeam,
  onOpenRotation,
  onShareTeam,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-gold p-6 sm:p-7 shadow-2xl border border-amber-400/30 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Your Saved Teams ({savedTeams.length})
              </h2>
              <p className="text-xs text-slate-400">
                Teams saved locally or synced to your Solaris cloud profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Teams List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedTeams.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No Saved Teams Yet</p>
              <p className="text-xs text-slate-500">
                Click &quot;Save Team&quot; on any recommendation card to store it here.
              </p>
            </div>
          ) : (
            savedTeams.map((team) => (
              <div
                key={team.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] hover:border-amber-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{team.name}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      Score {team.score}/100
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {team.members.map((slot) => (
                      <span
                        key={slot.character.id}
                        className="text-xs text-slate-300 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]"
                      >
                        {slot.character.name} ({slot.role.replace('_', ' ')})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Item Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => {
                      onOpenRotation(team);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-cyan-400 hover:text-cyan-300 transition-colors"
                    title="View Rotation Guide"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => {
                      onShareTeam(team);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-purple-400 hover:text-purple-300 transition-colors"
                    title="Share Team"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveTeam(team.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Saved Team"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
