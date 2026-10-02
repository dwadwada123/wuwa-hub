export const RESONATORS = [
  {
    id: 'hsin',
    name: 'Hsin',
    title: 'The Moon Fox / Mengzhou Sentinel',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Quickswap DPS / Burst',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hsin',
    iconColor: '#a855f7',
    tags: ['Electro', 'Unison', 'Quickswap', 'Rectifier'],
    bestWeapon: 'Blooming Jadehaven',
    bestEchoSet: '5-pc Heart of Sworn Vigil',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Triggers Unison Response: Consumes Unison state to trigger own Outro & incoming ally Intro without consuming standard Concerto.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Bật R (Resonance Liberation) tạo Stella Field/buff ATK ➔ Tích Concerto ➔ Outro buff All-Type DMG.' },
        { step: 2, char: 'Sub-DPS (Xiangli Yao / Yinlin)', action: 'Intro nhận buff ➔ E ➔ R xả nộ ➔ Outro buff Electro/Resonance Liberation DMG.' },
        { step: 3, char: 'Hsin', action: 'Intro vào sân ➔ Kích hoạt Skill ở chế độ Electro Flare ➔ Xả Resonance Liberation ➔ Đòn đánh cường hóa kết liễu quái.' }
      ],
      quickswap: [
        { step: 1, char: 'Hsin', action: 'Bắt đầu ở trạng thái Unison ➔ Dùng Resonance Skill gây sát thương đợt 1.' },
        { step: 2, char: 'Ally (Changli / Xiangli Yao)', action: 'Chuyển sang đồng minh ngay lập tức (Hsin kích hoạt Outro tức thì nhờ cơ chế Unison) ➔ Đồng minh ra sân bằng Intro Skill.' },
        { step: 3, char: 'Hsin', action: 'Sau khi đồng minh xả 1 skill ngắn, lập tức switch ngược lại Hsin để nhận Unison Boon (cộng dồn buff toàn đội).' }
      ]
    }
  },
  {
    id: 'camellya',
    name: 'Camellya',
    title: 'Bloom of Bloom',
    element: 'Havoc',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Main DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Camellya',
    iconColor: '#ec4899',
    tags: ['Havoc', 'Basic ATK', 'Sword'],
    bestWeapon: 'Red Spring',
    bestEchoSet: '5-pc Sun-sinking Eclipse',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%',
    outroDescription: 'Gây sát thương Havoc diện rộng bằng 459% ATK.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Intro ➔ E ➔ R ➔ Nhảy đánh thường (Mid-air) tích Concerto ➔ Outro buff All-Type DMG.' },
        { step: 2, char: 'Sanhua', action: 'Intro nhận buff ➔ E ➔ R ➔ Nổ băng Detonate ➔ Outro buff 38% Basic ATK DMG Deepen (cực kỳ quan trọng).' },
        { step: 3, char: 'Camellya', action: 'Intro vào sân nhận 38% buff Basic ATK ➔ Kích hoạt Ephemeral state ➔ Giữ chuột đánh thường xả sát thương Havoc cực lớn.' }
      ]
    }
  },
  {
    id: 'shorekeeper',
    name: 'Shorekeeper',
    title: 'Guardian of the Black Shores',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Support / Healer / Buffer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Shorekeeper',
    iconColor: '#38bdf8',
    tags: ['Spectro', 'Healer', 'Crit Buffer', 'Rectifier'],
    bestWeapon: 'Stellar Symphony',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: HP%',
    outroDescription: 'Tạo vùng Stella Field cấp 3: Buff 12.5% Crit Rate và 25% Crit DMG cho toàn đội.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper', action: 'Ra sân đầu trận ➔ Dùng E tích bướm ➔ Kích hoạt R mở Stella Field ➔ Outro buff Crit Rate/Crit DMG cho đồng đội tiếp theo.' }
      ]
    }
  },
  {
    id: 'jinhsi',
    name: 'Jinhsi',
    title: 'Magistrate of Jinzhou',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Broadblade',
    role: 'Main DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jinhsi',
    iconColor: '#facc15',
    tags: ['Spectro', 'Resonance Skill DMG', 'Broadblade'],
    bestWeapon: 'Ages of Harvest',
    bestEchoSet: '5-pc Celestial Light',
    echoMainStats: '4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%',
    outroDescription: 'Giảm thời gian hồi chiêu Coordinated Attack của đồng đội.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Intro ➔ E ➔ R ➔ Mid-air combo ➔ Outro buff toàn đội.' },
        { step: 2, char: 'Zhezhi / Yuanwu / Yinlin', action: 'Intro ➔ Bật đòn Coordinated Attack (E/R) ➔ Outro chuyển sân.' },
        { step: 3, char: 'Jinhsi', action: 'Intro vào sân (Incarnation) ➔ Hấp thụ tối đa 50 stack Incandescence từ đòn phối hợp ➔ E đợt 1 ➔ R xả nộ ➔ E cường hóa (Illuminous Epiphany) nổ triệu damage.' }
      ]
    }
  },
  {
    id: 'changli',
    name: 'Changli',
    title: 'Counselor to the Magistrate',
    element: 'Fusion',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Main / Quickswap DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Changli',
    iconColor: '#f97316',
    tags: ['Fusion', 'Quickswap', 'Resonance Liberation', 'Sword'],
    bestWeapon: 'Blazing Brilliance',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Fusion DMG và 25% Resonance Liberation DMG Deepen cho nhân vật vào sân tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Chuỗi combo chuẩn bị buff ATK & All-Type DMG.' },
        { step: 2, char: 'Changli', action: 'Tích 4 tầng Enflamement ➔ E ➔ Heavy Attack Flaming Sacrifice ➔ R xả nộ ➔ Outro kích hoạt.' },
        { step: 3, char: 'Encore / Chixia', action: 'Nhận trọn vẹn 20% Fusion DMG và 25% Liberation DMG ➔ Bật R dồn sát thương.' }
      ],
      quickswap: [
        { step: 1, char: 'Changli', action: 'Bắt đầu dùng True Sight: Charge hoặc R xả nộ.' },
        { step: 2, char: 'Encore', action: 'Animation cancel: Ngay lúc Changli đang vung kiếm, đổi ngay sang Encore tích Heavy Attack (Cosmos Rave).' },
        { step: 3, char: 'Changli', action: 'Lại đổi ngược về Changli để tiếp tục chuỗi đánh mà không bị lãng phí thời gian chờ hoạt ảnh.' }
      ]
    }
  },
  {
    id: 'xiangli_yao',
    name: 'Xiangli Yao',
    title: 'Principal Investigator of Huaxu Academy',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Gauntlets',
    role: 'Main DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=XiangliYao',
    iconColor: '#8b5cf6',
    tags: ['Electro', 'Resonance Liberation', 'Gauntlets'],
    bestWeapon: 'Verity\'s Handle',
    bestEchoSet: '5-pc Void Thunder',
    echoMainStats: '4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Gây sát thương Electro bằng 237% ATK và làm chậm kẻ địch.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Bật R tạo buff sát thương và Crit.' },
        { step: 2, char: 'Yinlin', action: 'Đặt hình nộm ➔ R xả nộ ➔ Outro buff 20% Electro DMG & 25% Resonance Liberation DMG Deepen.' },
        { step: 3, char: 'Xiangli Yao', action: 'Intro nhận buff khổng lồ từ Yinlin ➔ Bật R kích hoạt trạng thái Intuition ➔ Liên tục bấm E cường hóa (Decaying Cube) ➔ Kết liễu bằng Law of Reduction.' }
      ]
    }
  },
  {
    id: 'yinlin',
    name: 'Yinlin',
    title: 'Secrecy Officer',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Sub-DPS / Buffer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Yinlin',
    iconColor: '#9333ea',
    tags: ['Electro', 'Coordinated ATK', 'Buffer', 'Rectifier'],
    bestWeapon: 'Stringmaster',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Electro DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Electro DMG và 25% Resonance Liberation DMG Deepen cho đồng minh tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Yinlin', action: 'Intro ➔ E đợt 1 ➔ Đánh thường tích Judgment Points ➔ E đợt 2 ➔ R xả nộ ➔ Heavy Attack khắc dấu ấn ngầm ➔ Outro chuyển giao buff.' }
      ]
    }
  },
  {
    id: 'zhezhi',
    name: 'Zhezhi',
    title: 'Commission Painter',
    element: 'Glacio',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Sub-DPS / Buffer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Zhezhi',
    iconColor: '#06b6d4',
    tags: ['Glacio', 'Coordinated ATK', 'Buffer', 'Rectifier'],
    bestWeapon: 'Rime-Draped Sprouts',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Glacio DMG và 25% Resonance Skill DMG Deepen cho nhân vật vào sân tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Zhezhi', action: 'Intro ➔ E triệu hồi hạc ➔ R xả nộ kích hoạt đòn Coordinated ATK ngoài sân ➔ Heavy Attack tích đầy Concerto ➔ Outro buff Resonance Skill DMG cho Jinhsi.' }
      ]
    }
  },
  {
    id: 'verina',
    name: 'Verina',
    title: 'Botanist',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Universal Support / Healer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Verina',
    iconColor: '#eab308',
    tags: ['Spectro', 'Healer', 'Universal Buffer', 'Rectifier'],
    bestWeapon: 'Variation',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Hồi phục HP liên tục và buff 15% All-Type DMG Deepen cho toàn đội trong 30 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Vào sân ➔ E ➔ R ➔ Chuỗi đánh thường trên không Mid-air ➔ Bật Bell-Borne Echo ➔ Kích hoạt Outro buff 15% All-Type DMG.' }
      ]
    }
  },
  {
    id: 'sanhua',
    name: 'Sanhua',
    title: 'Guard of Jinzhou',
    element: 'Glacio',
    rarity: 4,
    weaponType: 'Sword',
    role: 'Sub-DPS / Basic ATK Buffer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sanhua',
    iconColor: '#38bdf8',
    tags: ['Glacio', 'Basic ATK Buffer', 'Fast Concerto', 'Sword'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff cực mạnh 38% Basic Attack DMG Deepen trong 14 giây cho đồng đội tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Sanhua', action: 'Intro ➔ E ➔ R ➔ Nhả chuột chuẩn xác thanh Forte Timing (Detonate nổ băng) ➔ Đầy Concerto chỉ trong 3 giây ➔ Outro ngay cho Camellya / Encore.' }
      ]
    }
  },
  {
    id: 'mortefi',
    name: 'Mortefi',
    title: 'Department of Safety',
    element: 'Fusion',
    rarity: 4,
    weaponType: 'Pistols',
    role: 'Sub-DPS / Heavy ATK Buffer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mortefi',
    iconColor: '#ef4444',
    tags: ['Fusion', 'Heavy ATK Buffer', 'Coordinated ATK', 'Pistols'],
    bestWeapon: 'Static Mist',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff 38% Heavy Attack DMG Deepen cho đồng minh tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Mortefi', action: 'Intro ➔ E ➔ R (triệu hồi rồng lửa bắn cùng đòn đánh của đồng minh) ➔ Đầy Concerto ➔ Outro buff Heavy ATK cho Jiyan.' }
      ]
    }
  },
  {
    id: 'jiyan',
    name: 'Jiyan',
    title: 'General of the Midnight Rangers',
    element: 'Aero',
    rarity: 5,
    weaponType: 'Broadblade',
    role: 'Main DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jiyan',
    iconColor: '#10b981',
    tags: ['Aero', 'Heavy ATK', 'Broadblade'],
    bestWeapon: 'Verdant Summit',
    bestEchoSet: '5-pc Sierra Gale',
    echoMainStats: '4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%',
    outroDescription: 'Triệu hồi gió xoáy gây sát thương Aero.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Buff All-Type DMG.' },
        { step: 2, char: 'Mortefi', action: 'Bật R triệu hồi rồng bắn tỉa ➔ Outro kích hoạt 38% Heavy ATK DMG Deepen.' },
        { step: 3, char: 'Jiyan', action: 'Intro nhận trọn vẹn buff của Mortefi ➔ Bật R triệu hồi Thanh Long ➔ Giữ chuột quạt thương sát thương Heavy ATK cuốn phăng toàn bộ quái vật.' }
      ]
    }
  },
  {
    id: 'encore',
    name: 'Encore',
    title: 'Black Shores Consultant',
    element: 'Fusion',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Main / Quickswap DPS',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Encore',
    iconColor: '#fb923c',
    tags: ['Fusion', 'Basic ATK', 'Quickswap', 'Rectifier'],
    bestWeapon: 'Stringmaster',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Gây sát thương Fusion nổ diện rộng.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Buff ATK và All-Type DMG.' },
        { step: 2, char: 'Sanhua', action: 'Outro buff 38% Basic ATK DMG.' },
        { step: 3, char: 'Encore', action: 'Intro ➔ Bật R hóa hình cuồng nộ ➔ Đánh thường dồn dập ➔ Heavy Attack nổ Cosmos Rave.' }
      ]
    }
  },
  {
    id: 'yuanwu',
    name: 'Yuanwu',
    title: 'Boxing Gym Master',
    element: 'Electro',
    rarity: 4,
    weaponType: 'Gauntlets',
    role: 'Fast Stack Support for Jinhsi',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Yuanwu',
    iconColor: '#a855f7',
    tags: ['Electro', 'Fast Coordinated ATK', 'Gauntlets'],
    bestWeapon: 'Originite: Type IV',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Bell-Borne | 3-Cost: DEF% / Energy Regen | 1-Cost: DEF%',
    outroDescription: 'Phá khiên rung chấn (Vibration Strength) của boss cực nhanh.',
    rotations: {
      standard: [
        { step: 1, char: 'Yuanwu', action: 'Chỉ cần ra sân 1 giây ➔ Cắm cột Lôi Trụ (E) ➔ Đổi ngay sang Jinhsi (Cột tự động nổ đòn Coordinated ATK mỗi khi Jinhsi tấn công, tích stack Incandescence cực rẻ và hiệu quả).' }
      ]
    }
  }
];

export const TEAM_TEMPLATES = [
  {
    id: 'hsin-electro-quickswap',
    name: 'Hsin Unison Quickswap',
    core: 'hsin',
    members: ['hsin', 'xiangli_yao', 'shorekeeper'],
    type: 'Quickswap / Dual Carry',
    description: 'Tối ưu hóa cơ chế Unison độc bản của Hsin (3.7) để hoán đổi liên tục với Xiangli Yao mà không chờ Concerto.',
    tags: ['Electro', 'Unison', 'Meta 3.7']
  },
  {
    id: 'camellya-hypercarry',
    name: 'Camellya Havoc Storm',
    core: 'camellya',
    members: ['camellya', 'sanhua', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Tận dụng 38% Basic ATK DMG Deepen của Sanhua để Camellya đạt ngưỡng sát thương Havoc cao nhất.',
    tags: ['Havoc', 'Basic ATK', 'High DPS']
  },
  {
    id: 'jinhsi-dragon-nuke',
    name: 'Jinhsi Dragon Bomb',
    core: 'jinhsi',
    members: ['jinhsi', 'zhezhi', 'verina'],
    type: 'Burst Hypercarry',
    description: 'Đội hình mạnh nhất của Jinhsi với hạc Zhezhi buff 25% Resonance Skill DMG và nạp stack cực tốc.',
    tags: ['Spectro', 'Resonance Skill', 'Tier 0']
  },
  {
    id: 'changli-encore-quickswap',
    name: 'Changli & Encore Fusion Twin',
    core: 'changli',
    members: ['changli', 'encore', 'verina'],
    type: 'Quickswap',
    description: 'Cặp bài trùng hoạt ảnh cancel đỉnh cao. Changli buff Fusion & Liberation cho Encore và ngược lại.',
    tags: ['Fusion', 'Quickswap', 'High Skill Ceiling']
  },
  {
    id: 'jiyan-wind-dragon',
    name: 'Jiyan Heavy Whirlwind',
    core: 'jiyan',
    members: ['jiyan', 'mortefi', 'verina'],
    type: 'Hypercarry',
    description: 'Đội hình quét map và tháp số 1 với Mortefi buff 38% Heavy ATK cho thanh long Jiyan.',
    tags: ['Aero', 'Heavy ATK', 'AOE King']
  },
  {
    id: 'xiangli-yinlin-hyper',
    name: 'Xiangli Yao Electro Surge',
    core: 'xiangli_yao',
    members: ['xiangli_yao', 'yinlin', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Yinlin buff 20% Electro + 25% Liberation DMG biến mỗi cú đấm của Xiangli Yao thành sát thương hạt nhân.',
    tags: ['Electro', 'Liberation', 'Single Target']
  },
  {
    id: 'jinhsi-f2p-friendly',
    name: 'Jinhsi F2P Fast Stack',
    core: 'jinhsi',
    members: ['jinhsi', 'yuanwu', 'verina'],
    type: 'F2P Friendly Hypercarry',
    description: 'Yuanwu không cần tài nguyên nâng cấp, chỉ cần cắm cột E để Jinhsi tích full stack tức thì.',
    tags: ['F2P', 'Low Investment', 'High Return']
  }
];
