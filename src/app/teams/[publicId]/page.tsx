'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Shield,
  Zap,
  Play,
  ArrowLeft,
  Share2,
  Check,
  CheckCircle2,
  Clock,
  Crown,
  Layers,
} from 'lucide-react';
import { RecommendedTeam } from '../../../types/domain';
import { VERIFIED_META_TEAMS } from '../../../data/fallbackData';

export default function PublicTeamPage() {
  const params = useParams();
  const publicId = params?.publicId as string;

  const [team, setTeam] = useState<RecommendedTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!publicId) return;

    // 1. Try local verified meta teams
    const localMatch = VERIFIED_META_TEAMS.find(
      (t) => t.publicId === publicId || t.id === publicId
    );

    if (localMatch) {
      setTeam(localMatch);
      setLoading(false);
      return;
    }

    // 2. Fetch from API
    fetch(`/api/teams?publicId=${encodeURIComponent(publicId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.team) {
          if (data.team.team_data) {
            setTeam(data.team.team_data);
          } else {
            setTeam(data.team);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching public team:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [publicId]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090b10] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400">Loading Team Setup...</p>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-[#090b10] text-white flex flex-col items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl border border-white/[0.08] max-w-md text-center space-y-4">
          <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold">Team Composition Not Found</h2>
          <p className="text-xs text-slate-400">
            This public lineup may have expired or the link is incorrect.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Open Team Builder</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-[#090b10]/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white text-xs font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Smart Team Builder</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              v{team.gameVersion} VERIFIED
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8">
        {/* Hero Section */}
        <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                <Crown className="w-3.5 h-3.5" />
                <span>SHARED TEAM BUILD</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                {team.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Optimized for <strong className="text-amber-300 capitalize">{team.objective.replace('_', ' ')}</strong> in Wuthering Waves Version {team.gameVersion}.
              </p>
            </div>

            {/* Score Showcase */}
            <div className="px-6 py-4 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-300 flex items-center gap-4 self-start md:self-auto">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Synergy Rating
                </div>
                <div className="text-3xl sm:text-4xl font-black font-mono leading-tight">
                  {team.score}
                  <span className="text-sm font-normal text-slate-400">/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resonators Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.members.map((slot, index) => {
            const char = slot.character;
            return (\n              <div
                key={char.id}
                className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-amber-400/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 font-bold">
                      SLOT {index + 1}
                    </span>
                    <span className="text-xs text-amber-400 font-mono">
                      {'★'.repeat(char.rarity)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-white/[0.1] shrink-0">
                      <img
                        src={char.avatarUrl}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center font-bold text-xl"
                        style={{ color: char.iconColor, backgroundColor: `${char.iconColor}20` }}
                      >
                        {char.name.slice(0, 2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded border bg-white/[0.04] text-slate-300">
                        {char.element}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{char.name}</h3>
                      <p className="text-xs font-semibold text-amber-400/90 capitalize">
                        {slot.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Build specs */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.04] space-y-1.5 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block font-medium">Recommended Weapon</span>
                    <span className="font-semibold text-white">{char.bestWeapon || 'Signature / 5★ Standard'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block font-medium">Recommended Echo Sonata</span>
                    <span className="font-semibold text-white">{char.bestEchoSet || 'Moonlit Clouds'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Recommended & Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reasons */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Synergy & Mechanics Analysis</span>
            </h3>
            <ul className="space-y-2.5">
              {team.reasons.map((r, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Breakdown bars */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Weighted Scoring Model</span>
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Main DPS Synergy</span>
                  <span className="font-mono font-bold text-amber-400">{team.breakdown.mainDpsSynergy}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${team.breakdown.mainDpsSynergy}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Support & Amplification</span>
                  <span className="font-mono font-bold text-cyan-400">{team.breakdown.support}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${team.breakdown.support}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Concerto & Rotation Flow</span>
                  <span className="font-mono font-bold text-purple-400">{team.breakdown.rotation}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${team.breakdown.rotation}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Sustain & Survival</span>
                  <span className="font-mono font-bold text-emerald-400">{team.breakdown.sustain}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${team.breakdown.sustain}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Rotation Sequence */}
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-amber-400 fill-current" />
              <span>Recommended Combat Rotation</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">~20s Cycle</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-white/[0.06] text-xs sm:text-sm font-mono text-cyan-300 leading-relaxed">
            {team.rotationSummary}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Build Teams From Your Own Resonators</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
