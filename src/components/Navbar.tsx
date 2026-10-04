'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Bookmark, User, LogOut, Layers } from 'lucide-react';
import { CURRENT_LIVE_VERSION } from '../lib/constants';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenSavedTeams: () => void;
  savedTeamsCount: number;
  userEmail: string | null;
  onSignOut: () => void;
  activeTab: 'builder' | 'meta' | 'database';
  setActiveTab: (tab: 'builder' | 'meta' | 'database') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAuth,
  onOpenSavedTeams,
  savedTeamsCount,
  userEmail,
  onSignOut,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090b10]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400/20 via-purple-500/20 to-cyan-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors shadow-lg shadow-amber-400/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wider text-slate-100 flex items-center gap-1.5">
                SOLARIS<span className="text-amber-400 font-black">HUB</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                Wuthering Waves Companion
              </span>
            </div>
          </Link>

          {/* Version Badge */}
          <div 
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium ml-2 cursor-help"
            title="Wuthering Waves Version 3.7: Prism's Illusion, Heart's Illumination (Live since Sep 30, 2026)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 radar-dot" />
            <span>v{CURRENT_LIVE_VERSION} LIVE</span>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Team Builder
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'meta'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            3.7 Meta Teams
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'database'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Resonator Codex
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Saved Teams Button */}
          <button
            onClick={onOpenSavedTeams}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="View saved teams"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Saved Teams</span>
            {savedTeamsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold">
                {savedTeamsCount}
              </span>
            )}
          </button>

          {/* User Auth */}
          {userEmail ? (
            <div className="flex items-center space-x-1.5 pl-1">
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                <User className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">{userEmail}</span>
              </div>
              <button
                onClick={onSignOut}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* GitHub Repo */}
          <a
            href="https://github.com/dwadwada123/wuwa-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
