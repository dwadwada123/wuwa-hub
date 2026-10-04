# Solaris Hub — Wuthering Waves Smart Team Builder & Knowledge Architecture

> **Version 3.7 Production Live System**  
> *"Prism's Illusion, Heart's Illumination"* (Released Sep 30, 2026)

Solaris Hub is a version-aware, production-ready companion web application for Wuthering Waves players. It evaluates players' owned Resonators, weapon compatibility, Echo Sonata sets, and rotation flow to generate mathematically scored, explainable team recommendations.

---

## 🌟 Key Features

1. **Smart Team Builder (MVP)**
   - **Owned Roster Filtering**: Recommendations calculated strictly from your owned Resonators. Unowned characters never appear in your lineup.
   - **Focus Resonator Locking**: Pin your favorite Main DPS (e.g. Hsin, Suoming, Camellya, Jinhsi, Shorekeeper) and build optimized teams around them.
   - **Objective-Driven Scoring**: Choose between **Best Overall**, **Max Damage**, **Easy Quickswap**, **Comfort & Safe**, or **Specific Main DPS**.
   - **Explainable Scoring Breakdown**: Transparent ratings for Main DPS Synergy, Support/Amplification, Concerto Flow, and Sustain.
   - **Animation Canceling Combat Rotations**: Step-by-step 20s combat cycles detailing opener, Forte discharge, Outro buffs, and cancels.

2. **Version 3.7 Meta Showcase**
   - Curated high-tier lineups (Electro Unison, Spectro Celestial, Havoc Blooming, Frost Shatter) verified against the 3.7 live patch.

3. **Resonator Codex**
   - Complete 38-character database with elements, weapon types, roles, signature weapons, best Echo sets, and Forte mechanics.

4. **Public Team Sharing**
   - Shareable links (`/teams/[publicId]`) with OpenGraph preview cards and zero account leak.

5. **Cloud Sync & Guest Mode**
   - Supabase Auth integration with seamless Guest Mode fallback via localStorage.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphic sci-fi dark theme
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Testing**: Automated unit test suite & Playwright E2E verification
- **Deployment**: Vercel-ready with zero serverless cold-start penalties

---

## 🚀 Quick Start

\`\`\`bash
# 1. Clone repository
git clone https://github.com/dwadwada123/wuwa-hub.git
cd wuwa-hub

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Run development server
npm run dev

# 5. Run automated test suite
node tests/test_recommendations.mjs
\`\`\`

---

## 📜 License
MIT License. Wuthering Waves is a trademark of Kuro Games.
