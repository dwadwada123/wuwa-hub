'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Shield, Zap, Layers, ExternalLink } from 'lucide-react';
import { Resonator, ElementType } from '../types/domain';

interface CodexViewProps {
  resonators: Resonator[];
}

export const CodexView: React.FC<CodexViewProps> = ({ resonators }) => {
  const [search, setSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementType | 'All'>('All');
  const [selectedChar, setSelectedChar] = useState<Resonator | null>(null);

  const elements: (ElementType | 'All')[] = ['All', 'Electro', 'Havoc', 'Spectro', 'Aero', 'Fusion', 'Glacio'];

  const filtered = resonators.filter((r) => {
    if (selectedElement !== 'All' && r.element !== selectedElement) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.element.toLowerCase().includes(q) || r.primaryRole.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Solaris Resonator Codex
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Complete reference of all {resonators.length} Resonators up to live Version 3.7 with Outro skills, Forte mechanics, and optimal builds.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
              {resonators.length} TOTAL RESONATORS
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search codex..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
            {elements.map((el) => (
              <button
                key={el}
                onClick={() => setSelectedElement(el)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedElement === el
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                }`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resonators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((char) => (
          <div
            key={char.id}
            onClick={() => setSelectedChar(char)}
            className="glass-panel p-4 rounded-xl border border-white/[0.08] hover:border-amber-400/40 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-white/[0.1] shrink-0">
                <img
                  src={char.avatarUrl}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded border bg-white/[0.04] text-slate-300">
                    {char.element}
                  </span>
                  <span className="text-[10px] text-amber-400">
                    {'★'.repeat(char.rarity)}
                  </span>
                  {char.releaseVersion === '3.7' && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-black">
                      v3.7
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {char.name}
                </h3>
                <div className="text-[11px] text-slate-400 capitalize">
                  {char.weaponType} • {char.primaryRole.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Outro Summary */}
            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.04] text-xs space-y-1">
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3" /> Outro Skill
              </div>
              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                {char.outroSkill || 'Direct damage Outro sequence with Concerto generation.'}
              </p>
            </div>

            {/* Build tags */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/[0.04]">
              <span className="truncate">Echo: {char.bestEchoSet || 'Moonlit Clouds'}</span>
              <span className="text-amber-400/90 font-medium group-hover:underline">Details &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Character Detail Modal */}
      {selectedChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl glass-panel-gold p-6 shadow-2xl border border-amber-400/30 max-h-[85vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setSelectedChar(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-white/[0.1] shrink-0">
                <img
                  src={selectedChar.avatarUrl}
                  alt={selectedChar.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedChar.name}</h3>
                <p className="text-xs text-amber-400 font-medium">
                  {selectedChar.title || 'Resonator of Solaris-3'}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span>{selectedChar.element}</span>
                  <span>•</span>
                  <span>{selectedChar.weaponType}</span>
                  <span>•</span>
                  <span className="capitalize">{selectedChar.primaryRole.replace('_', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Outro Skill</div>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedChar.outroSkill}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Forte Circuit & Combat Novelty</div>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedChar.forteMechanic}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Recommended Weapon</div>
                  <div className="text-xs font-bold text-white mt-1">{selectedChar.bestWeapon || '5-Star Standard'}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Recommended Echo Set</div>
                  <div className="text-xs font-bold text-white mt-1">{selectedChar.bestEchoSet || 'Moonlit Clouds'}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setSelectedChar(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
