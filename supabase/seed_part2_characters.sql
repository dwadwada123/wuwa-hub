-- ====================================================================
-- SEED DATA: PART 2 - CHARACTERS & ROLES
-- ====================================================================

INSERT INTO public.characters (id, slug, name, title, rarity, element, weapon_type, release_version_id, avatar_url, icon_color, is_live, tags) VALUES
-- 1. Limited 5-Star
('55555555-5555-5555-5555-555555555501', 'hsin', 'Hsin', 'Sentinel of Mengzhou / Moon Fox', 5, 'Electro', 'Rectifier', '22222222-2222-2222-2222-222222222202', 'https://wutheringlab.com/wp-content/uploads/Hsin.webp', '#a855f7', true, ARRAY['Electro', 'Unison', 'Quickswap', 'Rectifier', 'Sentinel']),
('55555555-5555-5555-5555-555555555502', 'suoming', 'Suoming', 'Sword of Azure Flash', 5, 'Electro', 'Sword', '22222222-2222-2222-2222-222222222202', 'https://wutheringlab.com/wp-content/uploads/Suoming.webp', '#8b5cf6', true, ARRAY['Electro', 'Sword', 'Unison', 'Main DPS']),
('55555555-5555-5555-5555-555555555503', 'camellya', 'Camellya', 'Bloom of Bloom', 5, 'Havoc', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Camellya.webp', '#ec4899', true, ARRAY['Havoc', 'Basic ATK', 'Sword', 'Black Shores']),
('55555555-5555-5555-5555-555555555504', 'shorekeeper', 'The Shorekeeper', 'Guardian of the Black Shores', 5, 'Spectro', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Shorekeeper.png', '#38bdf8', true, ARRAY['Spectro', 'Healer', 'Crit Buffer', 'Rectifier', 'Tier 0 Support']),
('55555555-5555-5555-5555-555555555505', 'jinhsi', 'Jinhsi', 'Magistrate of Jinzhou', 5, 'Spectro', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jinhsi.png', '#facc15', true, ARRAY['Spectro', 'Resonance Skill DMG', 'Broadblade', 'Tier 0 DPS']),
('55555555-5555-5555-5555-555555555506', 'changli', 'Changli', 'Counselor to the Magistrate', 5, 'Fusion', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Changli.png', '#f97316', true, ARRAY['Fusion', 'Quickswap', 'Resonance Liberation', 'Sword']),
('55555555-5555-5555-5555-555555555507', 'xiangli_yao', 'Xiangli Yao', 'Principal Investigator of Huaxu Academy', 5, 'Electro', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/XiangliYao.png', '#8b5cf6', true, ARRAY['Electro', 'Resonance Liberation', 'Gauntlets', 'Huaxu']),
('55555555-5555-5555-5555-555555555508', 'yinlin', 'Yinlin', 'Secrecy Officer of Jinzhou', 5, 'Electro', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yinlin.png', '#9333ea', true, ARRAY['Electro', 'Coordinated ATK', 'Buffer', 'Rectifier']),
('55555555-5555-5555-5555-555555555509', 'zhezhi', 'Zhezhi', 'Commission Painter', 5, 'Glacio', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Zhezhi.png', '#06b6d4', true, ARRAY['Glacio', 'Coordinated ATK', 'Skill DMG Buffer', 'Rectifier']),
('55555555-5555-5555-5555-555555555510', 'jiyan', 'Jiyan', 'General of the Midnight Rangers', 5, 'Aero', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jiyan.png', '#10b981', true, ARRAY['Aero', 'Heavy ATK', 'Broadblade', 'Midnight Rangers', 'Tier 0 AOE']),
('55555555-5555-5555-5555-555555555511', 'carlotta', 'Carlotta', 'Second Daughter of Montelli Family', 5, 'Glacio', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Carlotta.webp', '#0ea5e9', true, ARRAY['Glacio', 'Pistols', 'Skill DMG', 'Rinascita', 'Parry']),
('55555555-5555-5555-5555-555555555512', 'phoebe', 'Phoebe', 'Blessed Maiden of Rinascita', 5, 'Spectro', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://wutheringlab.com/wp-content/uploads/Phoebe.webp', '#facc15', true, ARRAY['Spectro', 'Rectifier', 'Spectro Frazzle', 'Dual Form']),
('55555555-5555-5555-5555-555555555513', 'brant', 'Brant', 'Captain of the Fleet', 5, 'Fusion', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://wutheringlab.com/wp-content/uploads/Brant.webp', '#ea580c', true, ARRAY['Fusion', 'Broadblade', 'Plunge DMG', 'Rinascita']),
('55555555-5555-5555-5555-555555555514', 'roccia', 'Roccia', 'First Mate of the Fleet', 5, 'Havoc', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Roccia.webp', '#be185d', true, ARRAY['Havoc', 'Gauntlets', 'Brawler', 'Rinascita']),
('55555555-5555-5555-5555-555555555515', 'cantarella', 'Cantarella', 'Matriarch of Fisalia', 5, 'Havoc', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://wutheringlab.com/wp-content/uploads/Cantarella.webp', '#9d174d', true, ARRAY['Havoc', 'Rectifier', 'Fisalia', 'Dark Resonance']),
('55555555-5555-5555-5555-555555555516', 'ciaccona', 'Ciaccona', 'Melody of the Tempest', 5, 'Aero', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/aero.png', '#059669', true, ARRAY['Aero', 'Pistols', 'Aero Erosion', 'Buffer']),
('55555555-5555-5555-5555-555555555517', 'chisa', 'Chisa', 'Startorch Scholar', 5, 'Havoc', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Havoc.png', '#9333ea', true, ARRAY['Havoc', 'Sword', 'Startorch']),
('55555555-5555-5555-5555-555555555518', 'iuno', 'Iuno', 'Tetragon Priestess', 5, 'Aero', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/aero.png', '#10b981', true, ARRAY['Aero', 'Pistols', 'Domain Buffer', 'Healer']),

-- 2. Standard 5-Star
('55555555-5555-5555-5555-555555555519', 'verina', 'Verina', 'Botanist of Huaxu Academy', 5, 'Spectro', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Verina.png', '#eab308', true, ARRAY['Spectro', 'Healer', 'Universal Buffer', 'Rectifier', 'Tier 0 Support']),
('55555555-5555-5555-5555-555555555520', 'calcharo', 'Calcharo', 'Leader of the Ghost Hounds', 5, 'Electro', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Calcharo.png', '#9333ea', true, ARRAY['Electro', 'Broadblade', 'Resonance Liberation', 'Ghost Hounds']),
('55555555-5555-5555-5555-555555555521', 'encore', 'Encore', 'Consultant of the Black Shores', 5, 'Fusion', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Encore.png', '#fb923c', true, ARRAY['Fusion', 'Basic ATK', 'Quickswap', 'Rectifier', 'Black Shores']),
('55555555-5555-5555-5555-555555555522', 'jianxin', 'Jianxin', 'Taoist Monk of Fengyidu', 5, 'Aero', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jianxin.png', '#14b8a6', true, ARRAY['Aero', 'Shield', 'Parry', 'Liberation Buffer', 'Gauntlets']),
('55555555-5555-5555-5555-555555555523', 'lingyang', 'Lingyang', 'Liondance Troupe Performer', 5, 'Glacio', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lingyang.png', '#38bdf8', true, ARRAY['Glacio', 'Gauntlets', 'Aerial Combat', 'Basic ATK']),

-- 3. Rover (Protagonist Forms)
('55555555-5555-5555-5555-555555555524', 'rover_havoc', 'Rover (Havoc)', 'Arbiter of Darkness', 5, 'Havoc', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Havoc.png', '#be123c', true, ARRAY['Havoc', 'Sword', 'Dark Surge', 'Free 5-Star S6']),
('55555555-5555-5555-5555-555555555525', 'rover_spectro', 'Rover (Spectro)', 'Arbiter of Radiance', 5, 'Spectro', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png', '#eab308', true, ARRAY['Spectro', 'Sword', 'Time Stop', 'Free 5-Star S6']),
('55555555-5555-5555-5555-555555555526', 'rover_aero', 'Rover (Aero)', 'Arbiter of Gales', 5, 'Aero', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png', '#10b981', true, ARRAY['Aero', 'Sword', 'Vortex', 'Wind Slashing']),

-- 4. 4-Star Resonators
('55555555-5555-5555-5555-555555555527', 'sanhua', 'Sanhua', 'Guard of Jinzhou', 4, 'Glacio', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Sanhua.png', '#38bdf8', true, ARRAY['Glacio', 'Basic ATK Buffer', 'Fast Concerto', 'Sword', 'Top Tier 4-Star']),
('55555555-5555-5555-5555-555555555528', 'mortefi', 'Mortefi', 'Department of Safety Researcher', 4, 'Fusion', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Mortefi.png', '#ef4444', true, ARRAY['Fusion', 'Heavy ATK Buffer', 'Coordinated ATK', 'Pistols', 'Top Tier 4-Star']),
('55555555-5555-5555-5555-555555555529', 'danjin', 'Danjin', 'Midnight Rangers Scout', 4, 'Havoc', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Danjin.png', '#e11d48', true, ARRAY['Havoc', 'Havoc Buffer', 'HP Consume', 'Sword']),
('55555555-5555-5555-5555-555555555530', 'chixia', 'Chixia', 'Junior Patroller of Jinzhou', 4, 'Fusion', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Chixia.png', '#f97316', true, ARRAY['Fusion', 'Pistols', 'Rapid Fire', 'Patroller']),
('55555555-5555-5555-5555-555555555531', 'baizhi', 'Baizhi', 'Researcher of Huaxu Academy', 4, 'Glacio', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Baizhi.png', '#0ea5e9', true, ARRAY['Glacio', 'Healer', 'Rectifier', 'F2P Friendly']),
('55555555-5555-5555-5555-555555555532', 'yangyang', 'Yangyang', 'Outrider of Midnight Rangers', 4, 'Aero', 'Sword', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yangyang.png', '#10b981', true, ARRAY['Aero', 'Energy Battery', 'Sword', 'Fast Concerto']),
('55555555-5555-5555-5555-555555555533', 'taoqi', 'Taoqi', 'Border Guard Officer', 4, 'Havoc', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Taoqi.png', '#ec4899', true, ARRAY['Havoc', 'Broadblade', 'Shield', 'Skill DMG Buffer', 'DEF Scaler']),
('55555555-5555-5555-5555-555555555534', 'yuanwu', 'Yuanwu', 'Boxing Gym Master', 4, 'Electro', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yuanwu.png', '#a855f7', true, ARRAY['Electro', 'Coordinated ATK', 'Gauntlets', 'Vibration Break', 'Jinhsi Best Friend']),
('55555555-5555-5555-5555-555555555535', 'aalto', 'Aalto', 'Information Broker', 4, 'Aero', 'Pistols', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Aalto.png', '#059669', true, ARRAY['Aero', 'Pistols', 'Aero Buffer', 'Taunt Gate']),
('55555555-5555-5555-5555-555555555536', 'youhu', 'Youhu', 'Antique Appraiser', 4, 'Glacio', 'Gauntlets', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Youhu.png', '#0284c7', true, ARRAY['Glacio', 'Gauntlets', 'Healer', 'Coordinated Buffer', 'Rinascita']),
('55555555-5555-5555-5555-555555555537', 'lumi', 'Lumi', 'Lollo Logistics Navigator', 4, 'Electro', 'Broadblade', '22222222-2222-2222-2222-222222222201', 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lumi.webp', '#7c3aed', true, ARRAY['Electro', 'Broadblade', 'Lollo Logistics', 'Electro Burst']),
('55555555-5555-5555-5555-555555555538', 'buling', 'Buling', 'Electro Frequency Specialist', 4, 'Electro', 'Rectifier', '22222222-2222-2222-2222-222222222201', 'https://wutheringlab.com/wp-content/uploads/Buling.webp', '#9333ea', true, ARRAY['Electro', 'Rectifier', 'Healer', 'Electro Buffer'])
ON CONFLICT (slug) DO NOTHING;

-- CHARACTER ROLES
INSERT INTO public.character_roles (character_id, role, is_primary) VALUES
-- Hsin
('55555555-5555-5555-5555-555555555501', 'quickswap_dps', true),
('55555555-5555-5555-5555-555555555501', 'sub_dps', false),
('55555555-5555-5555-5555-555555555501', 'concerto_enabler', false),
-- Suoming
('55555555-5555-5555-5555-555555555502', 'main_dps', true),
('55555555-5555-5555-5555-555555555502', 'quickswap_dps', false),
-- Camellya
('55555555-5555-5555-5555-555555555503', 'main_dps', true),
-- Shorekeeper
('55555555-5555-5555-5555-555555555504', 'support', true),
('55555555-5555-5555-5555-555555555504', 'healer', false),
('55555555-5555-5555-5555-555555555504', 'buffer', false),
-- Jinhsi
('55555555-5555-5555-5555-555555555505', 'main_dps', true),
('55555555-5555-5555-5555-555555555505', 'burst_dps', false),
-- Changli
('55555555-5555-5555-5555-555555555506', 'quickswap_dps', true),
('55555555-5555-5555-5555-555555555506', 'main_dps', false),
('55555555-5555-5555-5555-555555555506', 'buffer', false),
-- Xiangli Yao
('55555555-5555-5555-5555-555555555507', 'main_dps', true),
('55555555-5555-5555-5555-555555555507', 'burst_dps', false),
-- Yinlin
('55555555-5555-5555-5555-555555555508', 'sub_dps', true),
('55555555-5555-5555-5555-555555555508', 'coordinated_attack', false),
('55555555-5555-5555-5555-555555555508', 'buffer', false),
-- Zhezhi
('55555555-5555-5555-5555-555555555509', 'sub_dps', true),
('55555555-5555-5555-5555-555555555509', 'coordinated_attack', false),
('55555555-5555-5555-5555-555555555509', 'buffer', false),
-- Jiyan
('55555555-5555-5555-5555-555555555510', 'main_dps', true),
-- Carlotta
('55555555-5555-5555-5555-555555555511', 'main_dps', true),
-- Phoebe
('55555555-5555-5555-5555-555555555512', 'main_dps', true),
-- Brant
('55555555-5555-5555-5555-555555555513', 'main_dps', true),
-- Roccia
('55555555-5555-5555-5555-555555555514', 'sub_dps', true),
-- Cantarella
('55555555-5555-5555-5555-555555555515', 'main_dps', true),
-- Ciaccona
('55555555-5555-5555-5555-555555555516', 'sub_dps', true),
-- Chisa
('55555555-5555-5555-5555-555555555517', 'main_dps', true),
-- Iuno
('55555555-5555-5555-5555-555555555518', 'sub_dps', true),
('55555555-5555-5555-5555-555555555518', 'healer', false),
-- Verina
('55555555-5555-5555-5555-555555555519', 'support', true),
('55555555-5555-5555-5555-555555555519', 'healer', false),
('55555555-5555-5555-5555-555555555519', 'buffer', false),
-- Calcharo
('55555555-5555-5555-5555-555555555520', 'main_dps', true),
-- Encore
('55555555-5555-5555-5555-555555555521', 'main_dps', true),
('55555555-5555-5555-5555-555555555521', 'quickswap_dps', false),
-- Jianxin
('55555555-5555-5555-5555-555555555522', 'support', true),
('55555555-5555-5555-5555-555555555522', 'shielder', false),
-- Lingyang
('55555555-5555-5555-5555-555555555523', 'main_dps', true),
-- Rover Havoc
('55555555-5555-5555-5555-555555555524', 'main_dps', true),
-- Rover Spectro
('55555555-5555-5555-5555-555555555525', 'sub_dps', true),
-- Rover Aero
('55555555-5555-5555-5555-555555555526', 'sub_dps', true),
-- Sanhua
('55555555-5555-5555-5555-555555555527', 'sub_dps', true),
('55555555-5555-5555-5555-555555555527', 'buffer', false),
-- Mortefi
('55555555-5555-5555-5555-555555555528', 'sub_dps', true),
('55555555-5555-5555-5555-555555555528', 'coordinated_attack', false),
-- Danjin
('55555555-5555-5555-5555-555555555529', 'sub_dps', true),
('55555555-5555-5555-5555-555555555529', 'buffer', false),
-- Chixia
('55555555-5555-5555-5555-555555555530', 'main_dps', true),
-- Baizhi
('55555555-5555-5555-5555-555555555531', 'healer', true),
('55555555-5555-5555-5555-555555555531', 'support', false),
-- Yangyang
('55555555-5555-5555-5555-555555555532', 'energy_support', true),
('55555555-5555-5555-5555-555555555532', 'sub_dps', false),
-- Taoqi
('55555555-5555-5555-5555-555555555533', 'shielder', true),
('55555555-5555-5555-5555-555555555533', 'buffer', false),
-- Yuanwu
('55555555-5555-5555-5555-555555555534', 'coordinated_attack', true),
('55555555-5555-5555-5555-555555555534', 'support', false),
-- Aalto
('55555555-5555-5555-5555-555555555535', 'sub_dps', true),
-- Youhu
('55555555-5555-5555-5555-555555555536', 'healer', true),
-- Lumi
('55555555-5555-5555-5555-555555555537', 'sub_dps', true),
-- Buling
('55555555-5555-5555-5555-555555555538', 'healer', true),
('55555555-5555-5555-5555-555555555538', 'buffer', false)
ON CONFLICT (character_id, role) DO NOTHING;
