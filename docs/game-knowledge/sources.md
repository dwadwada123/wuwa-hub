# Data Provenance, Source Hierarchy & Confidence Model

This system implements a strict multi-tier hierarchy to prevent misinformation, hallucinations, and premature leak contamination.

---

## 1. Source Hierarchy

### Tier 1 — Official Sources (Gold Standard: 100% Fact)
- Kuro Games Official Patch Announcements
- In-game noticeboard & skill descriptions
- Official developer broadcasts & livestream patch notes
- Used for: Live version confirmation, skill ratios, base stats, exact Outro text, Echo set definitions.

### Tier 2 — High-Quality Maintained Community Databases (Verified Community Data)
- Prydwen.gg Wuthering Waves Portal
- WutheringLab
- Game8 Wuthering Waves guides
- wuthering.gg / Whispering Sea asset repositories
- Used for: Optimal Sonata recommendations, weapon tier lists, primary team archetypes.

### Tier 3 — Community Theorycrafting & Testing (Analysis & Meta Consensus)
- Discord theorycrafting channels, Reddit r/WutheringWaves
- Speedrun & Tower of Adversity clear data
- Used for: Rotation timings, animation cancel discoveries, niche F2P synergies.

### Tier 4 — Leaks / Beta / Pre-Release (Strictly Quarantined)
- **Status**: `BETA`, `LEAK`, `SPECULATION`.
- **Policy**: NEVER included in the LIVE recommendation pipeline. Must be flagged with `is_live = false`.

---

## 2. Confidence Scoring Model

Every recommendation and synergy score is tagged with a confidence tier:\n- `high`: Cross-verified across Tier 1 (official) + ≥2 Tier 2 community databases.\n- `medium`: Verified on 1 Tier 2 database with strong mathematical rationale, or newly released unit in first 14 days of patch.\n- `low`: Early theorycrafting or uncorroborated community opinion.
