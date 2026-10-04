'use client';

import React, { useState, useMemo } from 'react';
import { Search, Check, CheckCheck, Trash2, Sparkles, Filter, ShieldAlert } from 'lucide-react';
import { Resonator, ElementType, WeaponType, CharacterRole } from '../../../types/domain';

interface RosterSelectorProps {
  resonators: Resonator[];
  ownedIds: Set<string>;
  onToggleOwned: (id: string) => void;
  onSelectAllFiltered: (ids: string[]) => void;
  onClearAll: () => void;
  onSelectStarterPack: () => void;
}

const ELEMENTS: (ElementType | 'All')[] = ['All', 'Electro', 'Havoc', 'Spectro', 'Aero', 'Fusion', 'Glacio'];
const WEAPONS: (WeaponType | 'All')[] = ['All', 'Broadblade', 'Gauntlets', 'Pistols', 'Rectifier', 'Sword'];
const RARITIES = ['All', '5-Star', '4-Star'] as const;

export const RosterSelector: React.FC<RosterSelectorProps> = ({
  resonators,
  ownedIds,
  onToggleOwned,
  onSelectAllFiltered,
  onClearAll,
  onSelectStarterPack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementType | 'All'>('All');
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponType | 'All'>('All');
  const [selectedRarity, setSelectedRarity] = useState<'All' | '5-Star' | '4-Star'>('All');
  const [ownershipFilter, setOwnershipFilter] = useState<'all' | 'owned' | 'unowned'>('all');

  // Filtered resonators list
  const filteredResonators = useMemo(() => {
    return resonators.filter((r) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(query);
        const matchesSlug = r.slug.toLowerCase().includes(query);
        const matchesRole = r.roles.some((role) => role.toLowerCase().includes(query));
        const matchesTag = r.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesSlug && !matchesRole && !matchesTag) return false;
      }

      // Element
      if (selectedElement !== 'All' && r.element !== selectedElement) return false;

      // Weapon
      if (selectedWeapon !== 'All' && r.weaponType !== selectedWeapon) return false;

      // Rarity
      if (selectedRarity === '5-Star' && r.rarity !== 5) return false;
      if (selectedRarity === '4-Star' && r.rarity !== 4) return false;

      // Ownership
      const isOwned = ownedIds.has(r.id) || ownedIds.has(r.slug);
      if (ownershipFilter === 'owned' && !isOwned) return false;
      if (ownershipFilter === 'unowned' && isOwned) return false;

      return true;
    });
  }, [resonators, searchQuery, selectedElement, selectedWeapon, selectedRarity, ownershipFilter, ownedIds]);

  const filteredIds = useMemo(() => filteredResonators.map((r) => r.id), [filteredResonators]);

  const getElementClass = (el: ElementType) => {
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

  return (
    <div className="w-full space-y-4">
      {/* Header and Controls */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.08] shadow-xl space-y-4">
        {/* Top Bar: Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Select Your Owned Resonators
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                {ownedIds.size} / {resonators.length} OWNED
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Click characters to toggle ownership. The recommendation engine only suggests teams from Resonators you own.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onSelectAllFiltered(filteredIds)}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Select all currently visible resonators"
            >
              <CheckCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Select All Shown</span>
            </button>
            <button
              onClick={onSelectStarterPack}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Quickly select all 4-star resonators and standard units"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>F2P Starter Pack</span>
            </button>
            <button
              onClick={onClearAll}
              className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Clear all selections"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role (e.g. Hsin, Jinhsi)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-slate-500"
            />
          </div>

          {/* Element Filter Pills */}
          <div className="md:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Element:
            </span>
            {ELEMENTS.map((el) => {
              const active = selectedElement === el;
              return (
                <button
                  key={el}
                  onClick={() => setSelectedElement(el)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 border ${
                    active
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-sm'
                      : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border-white/[0.06] hover:bg-white/[0.05]'
                  }`}
                >
                  {el}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters: Weapon, Rarity & Ownership */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.04] text-xs text-slate-400">
          {/* Weapon Filter */}
          <div className="flex items-center gap-1 mr-3">
            <span className="text-[11px] font-medium text-slate-400">Weapon:</span>
            {WEAPONS.map((wp) => (
              <button
                key={wp}
                onClick={() => setSelectedWeapon(wp)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedWeapon === wp
                    ? 'bg-amber-400/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {wp}
              </button>
            ))}
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center gap-1 mr-3">
            <span className="text-[11px] font-medium text-slate-400">Rarity:</span>
            {RARITIES.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRarity(r)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedRarity === r
                    ? 'bg-amber-400/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Ownership Toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[11px] font-medium text-slate-400">Show:</span>
            {(['all', 'owned', 'unowned'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setOwnershipFilter(mode)}
                className={`px-2 py-0.5 rounded text-[11px] uppercase tracking-wide transition-colors ${
                  ownershipFilter === mode
                    ? 'bg-amber-400/20 text-amber-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Roster Character Cards Grid */}
      {filteredResonators.length === 0 ? (
        <div className="glass-panel p-10 rounded-2xl text-center space-y-2 border border-white/[0.06]">
          <ShieldAlert className="w-8 h-8 text-amber-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No Resonators Match Your Filters</p>
          <p className="text-xs text-slate-400">Try clearing search terms or resetting element filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5 sm:gap-3">
          {filteredResonators.map((char) => {
            const isOwned = ownedIds.has(char.id) || ownedIds.has(char.slug);
            const isFiveStar = char.rarity === 5;

            return (
              <button
                key={char.id}
                onClick={() => onToggleOwned(char.id)}
                className={`group relative rounded-xl p-2.5 text-left transition-all duration-200 flex flex-col justify-between overflow-hidden border ${
                  isOwned
                    ? 'bg-gradient-to-b from-[#182030] to-[#0e1422] border-amber-400/70 shadow-lg shadow-amber-400/10 ring-1 ring-amber-400/40'
                    : 'bg-[#0f131d]/90 hover:bg-[#141b27] border-white/[0.08] opacity-60 hover:opacity-85'
                }`}
              >
                {/* Active Selection Glow & Indicator */}
                {isOwned && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Card Top: Element & Rarity */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getElementClass(
                      char.element
                    )}`}
                  >
                    {char.element}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                    {Array.from({ length: char.rarity }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Portrait Avatar with Fallback Icon */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-900 border border-white/[0.06] mb-2 flex items-center justify-center">
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback stylized avatar if image network blocked
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center font-bold text-xl uppercase tracking-wider"
                    style={{ color: char.iconColor || '#f59e0b', backgroundColor: `${char.iconColor}15` }}
                  >
                    {char.name.slice(0, 2)}
                  </div>
                  {/* Subtle 3.7 badge for new release */}
                  {char.releaseVersion === '3.7' && (
                    <div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-amber-500/90 text-slate-950 text-[9px] font-black font-mono">
                      NEW 3.7
                    </div>
                  )}
                </div>

                {/* Character Name & Role */}
                <div>
                  <h3 className="text-xs font-bold text-white truncate tracking-wide group-hover:text-amber-300 transition-colors">
                    {char.name}
                  </h3>
                  <div className="flex items-center justify-between mt-0.5 text-[10px] text-slate-400">
                    <span className="truncate">{char.weaponType}</span>
                    <span className="capitalize font-mono text-[9px] px-1 rounded bg-white/[0.05]">
                      {char.primaryRole.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
