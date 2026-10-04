-- ====================================================================
-- SEED DATA: Wuthering Waves Version 3.7 Live Production Knowledge Base
-- ====================================================================

-- 1. RESEARCH SOURCES
INSERT INTO public.research_sources (id, name, url, source_type, confidence_tier, notes) VALUES
('11111111-1111-1111-1111-111111111101', 'Kuro Games Official Patch Notes', 'https://wutheringwaves.kurogames.com/en/main/news', 'official', 'high', 'Primary source for factual skills, stats, versioning'),
('11111111-1111-1111-1111-111111111102', 'Prydwen.gg Wuthering Waves Portal', 'https://www.prydwen.gg/wuthering-waves/', 'database', 'high', 'Cross-checked damage calculations and gear recommendations'),
('11111111-1111-1111-1111-111111111103', 'WutheringLab Character Database', 'https://wutheringlab.com/', 'database', 'high', 'Build guidelines, echo distribution, team compositions'),
('11111111-1111-1111-1111-111111111104', 'Game8 Wuthering Waves Guide', 'https://game8.co/games/Wuthering-Waves', 'database', 'medium', 'Combo rotations and animation canceling benchmarks')
ON CONFLICT (id) DO NOTHING;

-- 2. GAME VERSIONS
INSERT INTO public.game_versions (id, version, title, status, release_date, is_current, source_url) VALUES
('22222222-2222-2222-2222-222222222201', '3.6', 'Starlight Whispers', 'historical', '2026-08-15', false, 'https://wutheringwaves.kurogames.com/en/main/news/3.6'),
('22222222-2222-2222-2222-222222222202', '3.7', 'Prism''s Illusion, Heart''s Illumination', 'live', '2026-09-30', true, 'https://wutheringwaves.kurogames.com/en/main/news/3.7'),
('22222222-2222-2222-2222-222222222203', '3.8', 'Echoes of Eternity', 'upcoming', '2026-11-12', false, 'https://wutheringwaves.kurogames.com/en/main/news/roadmap')
ON CONFLICT (version) DO UPDATE SET is_current = EXCLUDED.is_current, status = EXCLUDED.status;

-- 3. SONATA ECHO SETS
INSERT INTO public.echo_sets (id, slug, name, element, two_piece_effect, five_piece_effect, introduced_version_id) VALUES
('33333333-3333-3333-3333-333333333301', 'heart-of-sworn-vigil', 'Heart of Sworn Vigil', 'Electro', 'Electro DMG +10%', 'Inflicting Electro Flare, obtaining Unison, or triggering Unison Response increases Crit. Rate by 15% and grants 22.5% Electro DMG for 30s.', '22222222-2222-2222-2222-222222222202'),
('33333333-3333-3333-3333-333333333302', 'moonlit-clouds', 'Moonlit Clouds', 'Universal', 'Energy Regen +10%', 'After using an Outro Skill, the ATK of the next Resonator to enter the field is increased by 22.5% for 15 seconds.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333303', 'rejuvenating-glow', 'Rejuvenating Glow', 'Universal', 'Healing Bonus +10%', 'When healing allies, the ATK of all party members is increased by 15% for 30 seconds.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333304', 'sun-sinking-eclipse', 'Sun-sinking Eclipse', 'Havoc', 'Havoc DMG +10%', 'Basic or Heavy ATK grants +7.5% Havoc DMG, stacks up to 4 times (30% total) for 15s.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333305', 'celestial-light', 'Celestial Light', 'Spectro', 'Spectro DMG +10%', 'Resonance Skill grants +30% Spectro DMG for 15s.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333306', 'void-thunder', 'Void Thunder', 'Electro', 'Electro DMG +10%', 'Heavy ATK or Resonance Skill grants +15% Electro DMG, stacks up to 2 times (30% total) for 15s.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333307', 'molten-rift', 'Molten Rift', 'Fusion', 'Fusion DMG +10%', 'Resonance Skill grants +30% Fusion DMG for 15s.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333308', 'sierra-gale', 'Sierra Gale', 'Aero', 'Aero DMG +10%', 'Intro Skill grants +30% Aero DMG for 15s.', '22222222-2222-2222-2222-222222222201'),
('33333333-3333-3333-3333-333333333309', 'freezing-frost', 'Freezing Frost', 'Glacio', 'Glacio DMG +10%', 'Basic or Heavy ATK grants +10% Glacio DMG, stacks up to 3 times (30% total) for 15s.', '22222222-2222-2222-2222-222222222201')
ON CONFLICT (slug) DO NOTHING;

-- 4. PRIMARY 4-COST CALAMITY / OVERLORD ECHOES
INSERT INTO public.echoes (id, slug, name, cost, sonata_set_id, active_skill_name, active_skill_desc, is_calamity) VALUES
('44444444-4444-4444-4444-444444444401', 'suhsin', 'Reminiscence: Suhsin the Inevitable', 4, '33333333-3333-3333-3333-333333333301', 'Descend of Sworn Sovereign', 'Transform into Suhsin to unleash high-impact lightning descent, inflicting Electro Flare and replenishing 15 Unison points.', true),
('44444444-4444-4444-4444-444444444402', 'impermanence-heron', 'Impermanence Heron', 4, '33333333-3333-3333-3333-333333333302', 'Winged Plumage', 'Transform into Impermanence Heron to attack; hitting enemies grants 10 Resonance Energy and +12% DMG buff to the next character.', true),
('44444444-4444-4444-4444-444444444403', 'fallacy-of-no-return', 'Fallacy of No Return', 4, '33333333-3333-3333-3333-333333333303', 'Ephemeral Cascade', 'Summon illusion to grant +10% Energy Regen and +10% ATK to all party members for 20s.', true),
('44444444-4444-4444-4444-444444444404', 'bell-borne-geochelone', 'Bell-Borne Aegis', 4, '33333333-3333-3333-3333-333333333303', 'Bell-Borne Aegis', 'Grants a shield that absorbs damage and increases party DMG by 10% for 15s.', true),
('44444444-4444-4444-4444-444444444405', 'dreamless', 'Dreamless', 4, '33333333-3333-3333-3333-333333333304', 'Dark Oblivion', 'Transform into Dreamless to unleash devastating Havoc sweeps. DMG increased by 50% after Rover (Havoc) casts Resonance Liberation.', true),
('44444444-4444-4444-4444-444444444406', 'jue', 'Jué', 4, '33333333-3333-3333-3333-333333333305', 'Temporal Crest', 'Summons radiant dragon Jué to deal continuous Spectro DMG and grant Blessing of Jué, enhancing Resonance Skill DMG.', true),
('44444444-4444-4444-4444-444444444407', 'tempest-mephis', 'Tempest Mephis', 4, '33333333-3333-3333-3333-333333333306', 'Thunderous Surge', 'Transform to strike multiple lightning claw attacks, increasing user Electro DMG by 12% and Heavy ATK DMG by 12%.', true),
('44444444-4444-4444-4444-444444444408', 'inferno-rider', 'Inferno Rider', 4, '33333333-3333-3333-3333-333333333307', 'Blazing Onslaught', 'Transform into Inferno Rider to execute 3 consecutive slash attacks and grant +12% Fusion DMG and +12% Basic ATK DMG.', true),
('44444444-4444-4444-4444-444444444409', 'feilian-beringal', 'Feilian Beringal', 4, '33333333-3333-3333-3333-333333333308', 'Gale Flurry', 'Transform to deliver ferocious Aero strikes, granting +12% Aero DMG and +12% Heavy ATK DMG.', true),
('44444444-4444-4444-4444-444444444410', 'lampylumen-myriad', 'Lampylumen Myriad', 4, '33333333-3333-3333-3333-333333333309', 'Frozen Glaze', 'Transform to leap and plunge with massive Glacio burst, granting +12% Glacio DMG and +12% Resonance Skill DMG.', true)
ON CONFLICT (slug) DO NOTHING;
