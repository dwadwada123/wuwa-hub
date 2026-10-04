-- ====================================================================
-- SEED DATA: PART 3 - WEAPONS, SYNERGIES, ECHO RECOMMENDATIONS & TEAMS
-- ====================================================================

-- 1. WEAPONS
INSERT INTO public.weapons (id, slug, name, type, rarity, base_atk, secondary_stat_type, secondary_stat_value, passive_name, passive_desc, signature_character_id) VALUES
('66666666-6666-6666-6666-666666666601', 'blooming-jadehaven', 'Blooming Jadehaven', 'Rectifier', 5, 588, 'Crit DMG', 48.6, 'Sentinel''s Grace', 'Increases Electro DMG by 12%. When Unison is triggered, increases Resonance Skill DMG by 24% and restores 8 Resonance Energy.', '55555555-5555-5555-5555-555555555501'),
('66666666-6666-6666-6666-666666666602', 'unspoken-rue', 'Unspoken Rue', 'Sword', 5, 588, 'Crit Rate', 24.3, 'Azure Verge', 'Increases All-Attribute DMG by 12%. Entering combat or switching forms increases Basic and Heavy ATK DMG by 24% for 12s.', '55555555-5555-5555-5555-555555555502'),
('66666666-6666-6666-6666-666666666603', 'stellar-symphony', 'Stellar Symphony', 'Rectifier', 5, 500, 'Energy Regen', 77.0, 'Cosmic Polyphony', 'Increases HP by 12%. Casting Resonance Liberation restores Concerto Energy and increases party ATK by 14% for 30s.', '55555555-5555-5555-5555-555555555504'),
('66666666-6666-6666-6666-666666666604', 'ages-of-harvest', 'Ages of Harvest', 'Broadblade', 5, 588, 'Crit Rate', 24.3, 'Divine Dragon''s Blessings', 'Increases All-Elemental DMG by 12%. Casting Intro or Skill grants stacks increasing Resonance Skill DMG by up to 48%.', '55555555-5555-5555-5555-555555555505'),
('66666666-6666-6666-6666-666666666605', 'blazing-brilliance', 'Blazing Brilliance', 'Sword', 5, 588, 'Crit DMG', 48.6, 'Feather of Everflame', 'Increases ATK by 12%. Dealing Resonance Skill DMG grants stacks increasing Resonance Liberation DMG by up to 56%.', '55555555-5555-5555-5555-555555555506'),
('66666666-6666-6666-6666-666666666606', 'red-spring', 'Red Spring', 'Sword', 5, 588, 'Crit Rate', 24.3, 'Crimson Thorn', 'Increases Basic ATK DMG by 12%. Entering Ephemeral state grants 24% Havoc DMG boost for 10s.', '55555555-5555-5555-5555-555555555503'),
('66666666-6666-6666-6666-666666666607', 'veritys-handle', 'Verity''s Handle', 'Gauntlets', 5, 588, 'Crit Rate', 24.3, 'Absolute Ratio', 'Increases All-Attribute DMG by 12%. Casting Resonance Liberation increases Liberation DMG by 48% for 8s.', '55555555-5555-5555-5555-555555555507'),
('66666666-6666-6666-6666-666666666608', 'stringmaster', 'Stringmaster', 'Rectifier', 5, 500, 'Crit Rate', 36.0, 'Marionette Strings', 'Increases All-Attribute DMG by 12%. Casting Resonance Skill increases ATK by 12%; when not on field, increases ATK by an additional 12%.', '55555555-5555-5555-5555-555555555508'),
('66666666-6666-6666-6666-666666666609', 'rime-draped-sprouts', 'Rime-Draped Sprouts', 'Rectifier', 5, 500, 'Crit DMG', 72.0, 'Vivid Brushwork', 'Increases ATK by 12%. Casting Outro grants incoming ally 15% Resonance Skill DMG bonus.', '55555555-5555-5555-5555-555555555509'),
('66666666-6666-6666-6666-666666666610', 'verdant-summit', 'Verdant Summit', 'Broadblade', 5, 588, 'Crit DMG', 48.6, 'Dragon''s Roar', 'Increases All-Elemental DMG by 12%. Casting Intro or Liberation increases Heavy ATK DMG by 48%.', '55555555-5555-5555-5555-555555555510'),
-- Standard & 4-Star
('66666666-6666-6666-6666-666666666611', 'emerald-of-genesis', 'Emerald of Genesis', 'Sword', 5, 588, 'Crit Rate', 24.3, 'Genesis Cycle', 'Increases Energy Regen by 12.8%. Casting Resonance Skill increases ATK by 6%, stacking up to 2 times.', NULL),
('66666666-6666-6666-6666-666666666612', 'variation', 'Variation', 'Rectifier', 4, 387, 'Energy Regen', 51.8, 'Virtue of Versatility', 'Casting Resonance Skill restores 8 Concerto Energy. Can be triggered once every 20s.', NULL),
('66666666-6666-6666-6666-666666666613', 'static-mist', 'Static Mist', 'Pistols', 5, 588, 'Crit Rate', 24.3, 'Phantom Mist', 'Increases Energy Regen by 12.8%. Switching to next character increases their ATK by 10% for 14s.', NULL),
('66666666-6666-6666-6666-666666666614', 'autumntrace', 'Autumntrace', 'Broadblade', 4, 412, 'Crit Rate', 20.2, 'Ledge Stride', 'Dealing Basic or Heavy ATK DMG increases ATK by 4%, stacking up to 5 times.', NULL)
ON CONFLICT (slug) DO NOTHING;

-- 2. CHARACTER ECHO RECOMMENDATIONS
INSERT INTO public.character_echo_recommendations (id, character_id, preferred_set_id, alternative_set_id, main_echo_id, cost_distribution, main_stats, substat_priority, reasoning) VALUES
-- Hsin
('77777777-7777-7777-7777-777777777701', '55555555-5555-5555-5555-555555555501', '33333333-3333-3333-3333-333333333301', '33333333-3333-3333-3333-333333333302', '44444444-4444-4444-4444-444444444401', '4-3-3-1-1', '4-Cost: Crit DMG / 3-Cost: Electro DMG (x2) / 1-Cost: ATK% (x2)', 'Crit DMG > Crit Rate > Electro DMG% > Energy Regen', 'Heart of Sworn Vigil synergizes directly with Hsin''s Unison mode and Electro Flare procs, offering 15% Crit Rate and 22.5% Electro DMG.'),
-- Suoming
('77777777-7777-7777-7777-777777777702', '55555555-5555-5555-5555-555555555502', '33333333-3333-3333-3333-333333333301', '33333333-3333-3333-3333-333333333306', '44444444-4444-4444-4444-444444444401', '4-3-3-1-1', '4-Cost: Crit Rate / 3-Cost: Electro DMG (x2) / 1-Cost: ATK% (x2)', 'Crit Rate > Crit DMG > ATK% > Energy Regen', 'Maintains 100% uptime on the Sworn Vigil 5-pc buff through repeated Unison stance transformations.'),
-- Camellya
('77777777-7777-7777-7777-777777777703', '55555555-5555-5555-5555-555555555503', '33333333-3333-3333-3333-333333333304', NULL, '44444444-4444-4444-4444-444444444405', '4-3-3-1-1', '4-Cost: Crit Rate / 3-Cost: Havoc DMG (x2) / 1-Cost: ATK% (x2)', 'Crit Rate > Crit DMG > Basic ATK DMG% > ATK%', 'Sun-sinking Eclipse easily reaches 4 stacks (+30% Havoc) with her rapid Basic ATK vine flurry.'),
-- Shorekeeper
('77777777-7777-7777-7777-777777777704', '55555555-5555-5555-5555-555555555504', '33333333-3333-3333-3333-333333333303', '33333333-3333-3333-3333-333333333302', '44444444-4444-4444-4444-444444444403', '4-3-3-1-1', '4-Cost: Healing Bonus / 3-Cost: Energy Regen (x2) / 1-Cost: HP% (x2)', 'Energy Regen (Target 250%+) > HP% > DEF%', 'Requires 250%+ Energy Regen to maximize Stella Field Stage 3 party Crit buffs.'),
-- Jinhsi
('77777777-7777-7777-7777-777777777705', '55555555-5555-5555-5555-555555555505', '33333333-3333-3333-3333-333333333305', NULL, '44444444-4444-4444-4444-444444444406', '4-3-3-1-1', '4-Cost: Crit DMG / 3-Cost: Spectro DMG (x2) / 1-Cost: ATK% (x2)', 'Crit Rate = Crit DMG > Resonance Skill DMG% > ATK%', 'Jué provides immediate Spectro buffs and triggers additional hits for Incandescence buildup.'),
-- Changli
('77777777-7777-7777-7777-777777777706', '55555555-5555-5555-5555-555555555506', '33333333-3333-3333-3333-333333333307', '33333333-3333-3333-3333-333333333302', '44444444-4444-4444-4444-444444444408', '4-3-3-1-1', '4-Cost: Crit Rate / 3-Cost: Fusion DMG (x2) / 1-Cost: ATK% (x2)', 'Crit Rate > Crit DMG > Fusion DMG% > Energy Regen', 'Inferno Rider grants 12% Fusion DMG and increases Basic ATK for Flaming Sacrifice sequences.'),
-- Jiyan
('77777777-7777-7777-7777-777777777707', '55555555-5555-5555-5555-555555555510', '33333333-3333-3333-3333-333333333308', NULL, '44444444-4444-4444-4444-444444444409', '4-3-3-1-1', '4-Cost: Crit DMG / 3-Cost: Aero DMG (x2) / 1-Cost: ATK% (x2)', 'Crit DMG > Crit Rate > Heavy ATK DMG% > Energy Regen', 'Feilian Beringal buffs Aero DMG and Heavy ATK, directly augmenting his Lance of Qingloong nuke window.')
ON CONFLICT (id) DO NOTHING;

-- 3. CHARACTER SYNERGIES
INSERT INTO public.character_synergies (id, source_character_id, target_character_id, synergy_type, score, conditions, explanation) VALUES
-- Hsin + Suoming
('88888888-8888-8888-8888-888888888801', '55555555-5555-5555-5555-555555555501', '55555555-5555-5555-5555-555555555502', 'unison_response_dual_electro', 98, 'Unison mode active', 'Hsin triggers Unison Response Outro pulling Suoming into field with zero Concerto delay, compounding Electro Flare vulnerability.'),
-- Hsin + Xiangli Yao
('88888888-8888-8888-8888-888888888802', '55555555-5555-5555-5555-555555555501', '55555555-5555-5555-5555-555555555507', 'electro_burst_quickswap', 96, 'Electro Flare applied', 'Hsin enables smooth quickswap rotations allowing Xiangli Yao to unleash Decaying Cube burst without rotation dead time.'),
-- Camellya + Sanhua
('88888888-8888-8888-8888-888888888803', '55555555-5555-5555-5555-555555555527', '55555555-5555-5555-5555-555555555503', 'basic_attack_amplification', 99, 'Sanhua Outro active', 'Sanhua grants +38% Basic ATK Deepen in an ultra-fast 3.2s Concerto cycle, perfectly matching Camellya''s Ephemeral whip dance.'),
-- Jinhsi + Zhezhi
('88888888-8888-8888-8888-888888888804', '55555555-5555-5555-5555-555555555509', '55555555-5555-5555-5555-555555555505', 'coordinated_attack_skill_buff', 97, 'Ink cranes active', 'Zhezhi generates high-frequency coordinated Glacio attacks to cap Jinhsi''s 50 Incandescence stacks, plus 25% Skill DMG Deepen.'),
-- Jinhsi + Yuanwu
('88888888-8888-8888-8888-888888888805', '55555555-5555-5555-5555-555555555534', '55555555-5555-5555-5555-555555555505', 'instant_coordinated_battery', 94, 'Thunder Wedge placed', 'Yuanwu takes 1 second of field time to drop his E pillar, firing coordinated attacks on every Jinhsi hit to effortlessly cap stacks.'),
-- Changli + Encore
('88888888-8888-8888-8888-888888888806', '55555555-5555-5555-5555-555555555506', '55555555-5555-5555-5555-555555555521', 'quickswap_animation_cancel', 96, 'Encore Cosmos Rave swap', 'Changli buffs Fusion and Liberation DMG by 20%/25%; Encore heavy charge can be animation-canceled into Changli True Sight.'),
-- Jiyan + Mortefi
('88888888-8888-8888-8888-888888888807', '55555555-5555-5555-5555-555555555528', '55555555-5555-5555-5555-555555555510', 'heavy_attack_amplification', 98, 'Mortefi Outro active', 'Mortefi grants 38% Heavy ATK Deepen and coordinated dragon projectiles that trigger on every swing of Jiyan''s Lance of Qingloong.'),
-- Rover Havoc + Danjin
('88888888-8888-8888-8888-888888888808', '55555555-5555-5555-5555-555555555529', '55555555-5555-5555-5555-555555555524', 'havoc_deepen', 95, 'Danjin Outro active', 'Danjin transfers 23% Havoc DMG Deepen for 14s, supercharging Rover''s Dark Surge and Dreamless execution.'),
-- Shorekeeper + All DPS
('88888888-8888-8888-8888-888888888809', '55555555-5555-5555-5555-555555555504', '55555555-5555-5555-5555-555555555501', 'universal_crit_buff', 98, 'Stella Field Stage 3', 'Shorekeeper provides 12.5% Crit Rate, 25% Crit DMG, and teamwide healing with nearly 100% uptime.'),
-- Verina + All DPS
('88888888-8888-8888-8888-888888888810', '55555555-5555-5555-5555-555555555519', '55555555-5555-5555-5555-555555555505', 'universal_all_type_deepen', 96, 'Verina Outro active', 'Verina provides 15% All-Type DMG Deepen to the entire party for 30s with instant aerial concerto build.')
ON CONFLICT (source_character_id, target_character_id, synergy_type) DO NOTHING;

-- 4. SEED VERIFIED 3.7 META TEAMS
INSERT INTO public.teams (id, public_id, name, description, objective, score, score_breakdown, strengths, weaknesses, rotation_summary, version_id, is_public) VALUES
-- Team 1: Unison Electro
('99999999-9999-9999-9999-999999999901', 'unison-electro-37', 'Mengzhou Unison Electro Core', 'The premier Version 3.7 meta team utilizing the new Unison Response mechanic between Sentinel Hsin and Suoming/Xiangli Yao.', 'Best Overall', 97, '{"mainDpsSynergy": 98, "support": 96, "buffs": 97, "rotation": 99, "sustain": 95}'::jsonb, ARRAY['Zero Concerto rotation delay', 'Dual-carry burst windows', 'Exceptional AoE lightning coverage', 'Top 3.7 ceiling DPS'], ARRAY['Requires precise animation canceling', 'Relies on Unison timing'], 'Shorekeeper E > R > Fallacy ➔ Hsin Intro > E > R > Unison Outro ➔ Suoming / Xiangli Yao burst window', '22222222-2222-2222-2222-222222222202', true),
-- Team 2: Camellya Havoc Hypercarry
('99999999-9999-9999-9999-999999999902', 'camellya-blossom-37', 'Camellya Havoc Blossom Hypercarry', 'The premier single-target and cleave hypercarry composition in Version 3.7.', 'Highest Damage', 98, '{"mainDpsSynergy": 99, "support": 97, "buffs": 98, "rotation": 97, "sustain": 96}'::jsonb, ARRAY['Huge sustained Basic ATK DPS', 'Ultra-fast 3.2s Sanhua concerto cycle', 'Top-tier boss killer'], ARRAY['Melee range vulnerability during vine spin'], 'Shorekeeper buffs ➔ Sanhua E > R > Detonate (Outro 38% Basic ATK) ➔ Camellya Ephemeral stance whip flurry', '22222222-2222-2222-2222-222222222202', true),
-- Team 3: Jinhsi Sovereign Dragon
('99999999-9999-9999-9999-999999999903', 'jinhsi-dragon-37', 'Jinhsi Sovereign Dragon Burst', 'The highest single-hit nuke in Wuthering Waves, deleting boss phases with Illuminous Epiphany.', 'Specific Main DPS', 96, '{"mainDpsSynergy": 97, "support": 95, "buffs": 97, "rotation": 94, "sustain": 95}'::jsonb, ARRAY['Massive single-hit burst damage', 'Safe mid-air combat', 'Fast coordinated attack charging'], ARRAY['Strict requirement to stack 50 Incandescence'], 'Verina/Shorekeeper opener ➔ Zhezhi/Yuanwu coordinated skill drop ➔ Jinhsi dragon beam nuke', '22222222-2222-2222-2222-222222222202', true),
-- Team 4: Changli & Encore Dual Quickswap
('99999999-9999-9999-9999-999999999904', 'changli-encore-37', 'Changli & Encore Dual Fusion Quickswap', 'Fluid high-APM dual-carry swap team featuring constant animation cancels and zero downtime.', 'Easy Rotation', 94, '{"mainDpsSynergy": 96, "support": 94, "buffs": 95, "rotation": 93, "sustain": 93}'::jsonb, ARRAY['Continuous damage flow', 'No idle frames', 'Double invulnerability windows'], ARRAY['High player skill and swap accuracy needed'], 'Shorekeeper buffs ➔ Changli True Sight ➔ Swap to Encore Cosmos Rave cancel ➔ Swap back to Changli finisher', '22222222-2222-2222-2222-222222222202', true),
-- Team 5: Jiyan Qingloong Storm
('99999999-9999-9999-9999-999999999905', 'jiyan-qingloong-37', 'Jiyan Qingloong Whirlwind Storm', 'The undisputed king of mob gathering and AoE dominance for Tower of Adversity mob floors.', 'Comfortable / Safe', 95, '{"mainDpsSynergy": 98, "support": 94, "buffs": 96, "rotation": 95, "sustain": 94}'::jsonb, ARRAY['Unmatched room-wide crowd control', 'Mortefi +38% Heavy ATK perfect synergy', 'Simple comfortable execution'], ARRAY['Single-target DPS slightly lower than Camellya'], 'Verina E > R > Bell-Borne ➔ Mortefi E > R > Heron Outro ➔ Jiyan Liberation Qingloong sweep', '22222222-2222-2222-2222-222222222202', true),
-- Team 6: Rover (Havoc) F2P Powerhouse
('99999999-9999-9999-9999-999999999906', 'rover-havoc-f2p-37', 'Rover (Havoc) Dark Surge Powerhouse', '100% F2P accessible composition delivering limited 5-star level burst with accessible 4-star supports.', 'Best Overall', 93, '{"mainDpsSynergy": 95, "support": 92, "buffs": 94, "rotation": 93, "sustain": 91}'::jsonb, ARRAY['Free S6 Rover via main story', '23% Havoc Deepen from Danjin', 'Massive Dreamless active echo nuke'], ARRAY['Danjin self-damage leaves her low HP'], 'Baizhi heal/feather ➔ Danjin E combo > Outro ➔ Rover Havoc Dark Surge > Liberation > Dreamless', '22222222-2222-2222-2222-222222222202', true)
ON CONFLICT (public_id) DO NOTHING;

-- TEAM MEMBERS
INSERT INTO public.team_members (team_id, character_id, position, role, is_focus) VALUES
-- Team 1 (Unison Electro)
('99999999-9999-9999-9999-999999999901', '55555555-5555-5555-5555-555555555502', 1, 'Main DPS', true),
('99999999-9999-9999-9999-999999999901', '55555555-5555-5555-5555-555555555501', 2, 'Sub-DPS / Buffer', false),
('99999999-9999-9999-9999-999999999901', '55555555-5555-5555-5555-555555555504', 3, 'Sustain / Buffer', false),
-- Team 2 (Camellya)
('99999999-9999-9999-9999-999999999902', '55555555-5555-5555-5555-555555555503', 1, 'Main DPS', true),
('99999999-9999-9999-9999-999999999902', '55555555-5555-5555-5555-555555555527', 2, 'Sub-DPS / Buffer', false),
('99999999-9999-9999-9999-999999999902', '55555555-5555-5555-5555-555555555504', 3, 'Sustain / Buffer', false),
-- Team 3 (Jinhsi)
('99999999-9999-9999-9999-999999999903', '55555555-5555-5555-5555-555555555505', 1, 'Main DPS', true),
('99999999-9999-9999-9999-999999999903', '55555555-5555-5555-5555-555555555509', 2, 'Coordinated Enabler', false),
('99999999-9999-9999-9999-999999999903', '55555555-5555-5555-5555-555555555519', 3, 'Sustain / Buffer', false),
-- Team 4 (Changli & Encore)
('99999999-9999-9999-9999-999999999904', '55555555-5555-5555-5555-555555555506', 1, 'Quickswap Main DPS', true),
('99999999-9999-9999-9999-999999999904', '55555555-5555-5555-5555-555555555521', 2, 'Quickswap Main DPS', false),
('99999999-9999-9999-9999-999999999904', '55555555-5555-5555-5555-555555555504', 3, 'Sustain / Buffer', false),
-- Team 5 (Jiyan)
('99999999-9999-9999-9999-999999999905', '55555555-5555-5555-5555-555555555510', 1, 'Main DPS', true),
('99999999-9999-9999-9999-999999999905', '55555555-5555-5555-5555-555555555528', 2, 'Sub-DPS / Buffer', false),
('99999999-9999-9999-9999-999999999905', '55555555-5555-5555-5555-555555555519', 3, 'Sustain / Buffer', false),
-- Team 6 (Rover Havoc)
('99999999-9999-9999-9999-999999999906', '55555555-5555-5555-5555-555555555524', 1, 'Main DPS', true),
('99999999-9999-9999-9999-999999999906', '55555555-5555-5555-5555-555555555529', 2, 'Sub-DPS / Buffer', false),
('99999999-9999-9999-9999-999999999906', '55555555-5555-5555-5555-555555555531', 3, 'Healer / Buffer', false)
ON CONFLICT (team_id, position) DO NOTHING;
