'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { RecommendedTeam } from '../../../types/domain';

interface ShareModalProps {
  team: RecommendedTeam | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ team, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!team) return null;

  // Use public ID or fallback to team id
  const shareId = team.publicId || team.id;
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/teams/${shareId}` : `/teams/${shareId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl glass-panel-gold p-6 sm:p-7 shadow-2xl border border-amber-400/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 mx-auto flex items-center justify-center mb-3">
            <Share2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-wide">
            Share Your Team Build
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Anyone with this public link can view your team lineup, synergy analysis, and rotation guide.
          </p>
        </div>

        {/* Team Preview Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08] mb-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">{team.name}</span>
            <span className="text-xs font-mono font-bold text-emerald-400">Score {team.score}/100</span>
          </div>
          <div className="flex items-center gap-2">
            {team.members.map((slot) => (
              <div key={slot.character.id} className="flex items-center gap-1 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{slot.character.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Public Share Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/[0.1] text-xs font-mono text-slate-200 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center text-xs text-slate-400">
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Preview Public Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
