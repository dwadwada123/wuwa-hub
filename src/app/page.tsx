'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { AuthModal } from '../components/AuthModal';
import { RosterSelector } from '../features/team-builder/components/RosterSelector';
import { ObjectiveSelector } from '../features/team-builder/components/ObjectiveSelector';
import { TeamCard } from '../features/team-builder/components/TeamCard';
import { RotationModal } from '../features/team-builder/components/RotationModal';
import { ShareModal } from '../features/team-builder/components/ShareModal';
import { SavedTeamsDrawer } from '../features/team-builder/components/SavedTeamsDrawer';
import { MetaTeamsView } from '../components/MetaTeamsView';
import { CodexView } from '../components/CodexView';
import { INITIAL_RESONATORS, VERIFIED_META_TEAMS } from '../data/fallbackData';
import { Resonator, BuildObjective, RecommendedTeam } from '../types/domain';
import { recommendTeams } from '../features/team-builder/scoring/engine';
import { CURRENT_LIVE_VERSION } from '../lib/constants';
import { supabase } from '../lib/supabase/client';
import { Sparkles, Trophy, ArrowUpDown, Filter, AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'builder' | 'meta' | 'database'>('builder');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [selectedRotationTeam, setSelectedRotationTeam] = useState<RecommendedTeam | null>(null);
  const [selectedShareTeam, setSelectedShareTeam] = useState<RecommendedTeam | null>(null);

  // User State
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Roster State (Deterministic SSR default)
  const [ownedIds, setOwnedIds] = useState<Set<string>>(
    () =>
      new Set([
        '55555555-5555-5555-5555-555555555501', // Hsin
        '55555555-5555-5555-5555-555555555504', // Jinhsi
        '55555555-5555-5555-5555-555555555509', // Verina
        '55555555-5555-5555-5555-555555555518', // Sanhua
        '55555555-5555-5555-5555-555555555519', // Mortefi
        '55555555-5555-5555-5555-555555555520', // Baizhi
        '55555555-5555-5555-5555-555555555514', // Rover (Havoc)
        '55555555-5555-5555-5555-555555555517', // Yuanwu
      ])
  );

  // Builder Controls
  const [focusCharId, setFocusCharId] = useState<string | null>(null);
  const [objective, setObjective] = useState<BuildObjective>('best_overall');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendedTeamsList, setRecommendedTeamsList] = useState<RecommendedTeam[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'damage' | 'sustain'>('score');

  // Saved Teams (Deterministic SSR default)
  const [savedTeams, setSavedTeams] = useState<RecommendedTeam[]>([]);

  // Hydrate client-stored roster and saved teams on mount
  useEffect(() => {
    try {
      const savedRoster = localStorage.getItem('wuwa_owned_roster');
      if (savedRoster) {
        setOwnedIds(new Set(JSON.parse(savedRoster)));
      }
      const savedTeamsData = localStorage.getItem('wuwa_saved_teams');
      if (savedTeamsData) {
        setSavedTeams(JSON.parse(savedTeamsData));
      }
    } catch (e) {
      console.error('Failed to parse localStorage:', e);
    }
  }, []);

  // Sync auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        setUserId(session.user.id ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setUserId(session?.user?.id ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Save roster to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wuwa_owned_roster', JSON.stringify(Array.from(ownedIds)));
    }
  }, [ownedIds]);

  // Save teams to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wuwa_saved_teams', JSON.stringify(savedTeams));
    }
  }, [savedTeams]);

  // Owned Resonators objects
  const ownedResonators = useMemo(() => {
    return INITIAL_RESONATORS.filter((r) => ownedIds.has(r.id) || ownedIds.has(r.slug));
  }, [ownedIds]);

  // Toggle single ownership
  const handleToggleOwned = (id: string) => {
    setOwnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select all filtered
  const handleSelectAllFiltered = (ids: string[]) => {
    setOwnedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
  };

  // Clear all selections
  const handleClearAll = () => {
    setOwnedIds(new Set());
    setFocusCharId(null);
  };

  // Select F2P starter pack
  const handleSelectStarterPack = () => {
    const starterSlugs = [
      'rover-havoc',
      'rover-spectro',
      'baizhi',
      'yangyang',
      'chixia',
      'sanhua',
      'mortefi',
      'danjin',
      'taoqi',
      'yuanwu',
      'aalto',
      'verina',
    ];
    const starterIds = INITIAL_RESONATORS.filter((r) => starterSlugs.includes(r.slug)).map((r) => r.id);
    setOwnedIds((prev) => {
      const next = new Set(prev);
      starterIds.forEach((id) => next.add(id));
      return next;
    });
  };

  // Run Recommendation Calculation
  const handleGenerateTeams = () => {
    setIsGenerating(true);

    // Simulate minor calculation delay for fluid UX
    setTimeout(() => {
      const result = recommendTeams({
        roster: ownedResonators,
        focusCharacterId: focusCharId,
        objective,
        limit: 12,
      });

      setRecommendedTeamsList(result.teams);
      setIsGenerating(false);

      // Smooth scroll to results
      const resultsEl = document.getElementById('recommendations-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  // Initial calculation on load
  useEffect(() => {
    if (ownedResonators.length >= 3 && recommendedTeamsList.length === 0) {
      const initial = recommendTeams({
        roster: ownedResonators,
        objective: 'best_overall',
        limit: 8,
      });
      setRecommendedTeamsList(initial.teams);
    }
  }, [ownedResonators.length]);

  // Save / Toggle Team
  const handleSaveTeam = (team: RecommendedTeam) => {
    const exists = savedTeams.some((t) => t.id === team.id || t.publicId === team.publicId);
    if (exists) {
      setSavedTeams((prev) => prev.filter((t) => t.id !== team.id && t.publicId !== team.publicId));
    } else {
      setSavedTeams((prev) => [team, ...prev]);

      // If user is authenticated, sync to Supabase
      if (userId) {
        fetch('/api/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ team, userId }),
        }).catch((err) => console.error('Cloud team save error:', err));
      }
    }
  };

  const handleRemoveSavedTeam = (teamId: string) => {
    setSavedTeams((prev) => prev.filter((t) => t.id !== teamId && t.publicId !== teamId));
  };

  // Sorted teams
  const sortedTeams = useMemo(() => {
    return [...recommendedTeamsList].sort((a, b) => {
      if (sortBy === 'damage') {
        return b.breakdown.mainDpsSynergy - a.breakdown.mainDpsSynergy;
      }
      if (sortBy === 'sustain') {
        return b.breakdown.sustain - a.breakdown.sustain;
      }
      return b.score - a.score;
    });
  }, [recommendedTeamsList, sortBy]);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col">
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSavedTeams={() => setIsSavedDrawerOpen(true)}
        savedTeamsCount={savedTeams.length}
        userEmail={userEmail}
        onSignOut={() => supabase.auth.signOut()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-8">
        {/* VIEW 1: SMART TEAM BUILDER */}
        {activeTab === 'builder' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Banner */}
            <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/30 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VERSION 3.7 KNOWLEDGE ENGINE</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-tight">
                  Wuthering Waves <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Smart Team Builder</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tailored recommendations calculated strictly from your owned Resonators. Evaluates Concerto energy discharge, Outro amplification tags, rotation flow, and sustain with live 3.7 combat balance.
                </p>
              </div>
            </div>

            {/* Step 1: Owned Roster Grid */}
            <RosterSelector
              resonators={INITIAL_RESONATORS}
              ownedIds={ownedIds}
              onToggleOwned={handleToggleOwned}
              onSelectAllFiltered={handleSelectAllFiltered}
              onClearAll={handleClearAll}
              onSelectStarterPack={handleSelectStarterPack}
            />

            {/* Step 2 & 3: Focus Resonator & Objective Selection */}
            <ObjectiveSelector
              ownedResonators={ownedResonators}
              focusCharacterId={focusCharId}
              onSelectFocusCharacter={setFocusCharId}
              selectedObjective={objective}
              onSelectObjective={setObjective}
              onGenerateTeams={handleGenerateTeams}
              isGenerating={isGenerating}
            />

            {/* Recommendations Section */}
            <div id="recommendations-section" className="space-y-5 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">
                      Recommended Team Compositions
                    </h2>
                    <p className="text-xs text-slate-400">
                      Found {recommendedTeamsList.length} viable synergy compositions from your {ownedResonators.length} Resonators
                    </p>
                  </div>
                </div>

                {/* Sort Controls */}
                {recommendedTeamsList.length > 0 && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ArrowUpDown className="w-3 h-3" /> Sort by:
                    </span>
                    <div className="flex items-center bg-white/[0.03] p-1 rounded-lg border border-white/[0.06]">
                      <button
                        onClick={() => setSortBy('score')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          sortBy === 'score'
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Overall Score
                      </button>
                      <button
                        onClick={() => setSortBy('damage')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          sortBy === 'damage'
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Max Damage
                      </button>
                      <button
                        onClick={() => setSortBy('sustain')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          sortBy === 'sustain'
                            ? 'bg-amber-400/20 text-amber-300 font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Sustain Safety
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Team Cards List */}
              {recommendedTeamsList.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl text-center space-y-3 border border-white/[0.06]">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                  <h3 className="text-base font-bold text-white">No Viable Teams Found</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {ownedResonators.length < 3
                      ? 'Please select at least 3 owned Resonators in Step 1 to generate team recommendations.'
                      : 'Try unsetting the focus character or switching to the "Best Overall" objective to broaden synergy combinations.'}
                  </p>
                  <button
                    onClick={handleSelectStarterPack}
                    className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-semibold transition-colors"
                  >
                    Select Starter Roster Preset
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedTeams.map((team, index) => {
                    const isSaved = savedTeams.some(
                      (t) => t.id === team.id || t.publicId === team.publicId
                    );
                    return (
                      <TeamCard
                        key={team.id || index}
                        team={team}
                        rank={index + 1}
                        onSaveTeam={handleSaveTeam}
                        onOpenRotation={setSelectedRotationTeam}
                        onShareTeam={setSelectedShareTeam}
                        isSaved={isSaved}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: 3.7 META TEAMS */}
        {activeTab === 'meta' && (
          <div className="animate-in fade-in duration-300">
            <MetaTeamsView
              onOpenRotation={setSelectedRotationTeam}
              onShareTeam={setSelectedShareTeam}
            />
          </div>
        )}

        {/* VIEW 3: RESONATOR CODEX */}
        {activeTab === 'database' && (
          <div className="animate-in fade-in duration-300">
            <CodexView resonators={INITIAL_RESONATORS} />
          </div>
        )}
      </main>

      {/* Global Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => setUserEmail(email)}
      />

      <RotationModal
        team={selectedRotationTeam}
        onClose={() => setSelectedRotationTeam(null)}
      />

      <ShareModal
        team={selectedShareTeam}
        onClose={() => setSelectedShareTeam(null)}
      />

      <SavedTeamsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedTeams={savedTeams}
        onRemoveTeam={handleRemoveSavedTeam}
        onOpenRotation={setSelectedRotationTeam}
        onShareTeam={setSelectedShareTeam}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 bg-[#07090e]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            Solaris Hub • Wuthering Waves Smart Team Builder & Knowledge Architecture.
          </p>
          <p className="text-[11px] text-slate-600">
            Targeting Version 3.7 (&quot;Prism&apos;s Illusion, Heart&apos;s Illumination&quot;). Wuthering Waves is a trademark of Kuro Games.
          </p>
        </div>
      </footer>
    </div>
  );
}
