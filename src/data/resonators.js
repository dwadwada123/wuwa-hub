// =========================================================================================
// DATABASE CÁC NHÂN VẬT WUTHERING WAVES (TOÀN BỘ DANH SÁCH CHÍNH THỨC ĐẾN BẢN V3.7 - HSIN & SUOMING)
// Tuyệt đối đầy đủ: 36 Resonators (5-Star Limited, 5-Star Standard, Rovers, 4-Star)
// Đầy đủ thông tin: Vũ khí, Hệ, Sonata Echo, Chỉ số chính, Outro Skill & Rotation Game8 chi tiết
// =========================================================================================

export const RESONATORS = [
  // ==========================================
  // 1. NHÓM 5-SAO GIỚI HẠN (LIMITED 5-STAR)
  // ==========================================
  {
    id: 'hsin',
    name: 'Hsin',
    title: 'The Moon Fox / Mengzhou Sentinel',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Quickswap DPS / Burst Buffer',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Hsin.webp',
    iconColor: '#a855f7',
    tags: ['Electro', 'Unison', 'Quickswap', 'Rectifier', 'Sentinel'],
    bestWeapon: 'Blooming Jadehaven',
    bestEchoSet: '5-pc Heart of Sworn Vigil',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Kích hoạt Phản Hồi Đồng Điệu (Unison Response): Tiêu hao trạng thái Unison để kích hoạt Outro cá nhân và kéo đồng minh vào sân bằng Intro Skill mà không cần tiêu tốn thanh Concerto truyền thống.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Bật Resonance Liberation (R) tạo Stella Field / buff ATK ➔ Dùng E và chuỗi đánh thường tích đầy Concerto ➔ Outro kích hoạt buff All-Type DMG.' },
        { step: 2, char: 'Sub-DPS (Xiangli Yao / Yinlin)', action: 'Vào sân bằng Intro nhận buff ➔ E ➔ R xả nộ ➔ Outro truyền 20% Electro DMG và 25% Liberation DMG Deepen.' },
        { step: 3, char: 'Hsin', action: 'Intro vào sân ➔ Kích hoạt Skill E ở thể Electro Flare ➔ Xả Resonance Liberation R kết liễu ➔ Tấn công thường cường hóa tiêu diệt phần còn lại.' }
      ],
      quickswap: [
        { step: 1, char: 'Hsin', action: 'Bắt đầu ở trạng thái Unison ➔ Bấm E gây sát thương đợt 1.' },
        { step: 2, char: 'Ally (Changli / Xiangli Yao)', action: 'Chuyển sang đồng minh ngay lập tức (Hsin kích hoạt Outro tức thì nhờ Unison) ➔ Đồng minh ra sân tung Intro Skill và 1 đòn E nhanh.' },
        { step: 3, char: 'Hsin', action: 'Đổi ngược về Hsin lập tức nhận Unison Boon (cộng dồn buff toàn đội) mà không mất thời gian chờ Concerto.' }
      ]
    }
  },
  {
    id: 'suoming',
    name: 'Suoming',
    title: 'Sword of Azure Flash',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Main DPS / Form Switcher',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Suoming.webp',
    iconColor: '#8b5cf6',
    tags: ['Electro', 'Sword', 'Unison', 'Main DPS'],
    bestWeapon: 'Thunder\'s Horizon',
    bestEchoSet: '5-pc Void Thunder',
    echoMainStats: '4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Tạo Lôi Vũ Đồng Điệu: 3 đòn đánh kế tiếp của đồng minh vào sân sẽ phát nổ sát thương Lôi diện rộng và nạp 25% thanh Concerto tức thì.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Kích hoạt buff toàn đội và hồi máu qua R ➔ Outro chuyển giao sang Sub-DPS.' },
        { step: 2, char: 'Hsin / Yinlin', action: 'Thi triển đòn Lôi diện rộng ➔ Outro truyền buff Electro DMG và Liberation Deepen.' },
        { step: 3, char: 'Suoming', action: 'Intro vào sân ➔ Kích hoạt Resonance Skill chuyển đổi thế kiếm Azure Surge ➔ Chuỗi combo 4 nhịp đánh thường ➔ Resonance Liberation R nổ sét màn hình.' }
      ],
      quickswap: [
        { step: 1, char: 'Suoming', action: 'Tung đòn kiếm thế 1 ➔ Nhấn E giải phóng lôi kiếm xoay vòng.' },
        { step: 2, char: 'Hsin', action: 'Animation cancel sang Hsin nhận Unison ➔ Tung E lôi nộ ➔ Outro chuyển về.' },
        { step: 3, char: 'Suoming', action: 'Quay lại sân kích hoạt ngay nộ R kết liễu quái.' }
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
    role: 'Main DPS / Basic ATK Specialist',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Camellya.webp',
    iconColor: '#ec4899',
    tags: ['Havoc', 'Basic ATK', 'Sword', 'Black Shores'],
    bestWeapon: 'Red Spring',
    bestEchoSet: '5-pc Sun-sinking Eclipse',
    echoMainStats: '4-Cost: Crit Rate/DMG (Dreamless / Crownless) | 3-Cost: Havoc DMG | 1-Cost: ATK%',
    outroDescription: 'Tạo vụ nổ Cánh Hoa Hỗn Loạn gây sát thương Havoc diện rộng bằng 459% ATK cho kẻ địch xung quanh.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Intro ➔ E ➔ R ➔ Mid-air combo tích Concerto ➔ Bell-Borne Echo ➔ Outro buff All-Type DMG.' },
        { step: 2, char: 'Sanhua', action: 'Intro nhận buff ➔ E ➔ R ➔ Căn thanh Forte nổ băng (Detonate) ➔ Outro truyền 38% Basic ATK DMG Deepen.' },
        { step: 3, char: 'Camellya', action: 'Intro vào sân nhận 38% buff Basic ATK ➔ Kích hoạt Ephemeral Stance ➔ Giữ chuột đánh thường xả chuỗi roi gai Havoc điên cuồng ➔ Resonance Liberation R nổ kết liễu.' }
      ],
      quickswap: [
        { step: 1, char: 'Camellya', action: 'Kích hoạt Ephemeral Stance ➔ Dùng E trói mục tiêu.' },
        { step: 2, char: 'Sanhua', action: 'Animation cancel lúc Camellya bay lên ➔ Sanhua vào sân tung E + R nổ băng trong 2 giây.' },
        { step: 3, char: 'Camellya', action: 'Đổi ngược về Camellya để tiếp tục chuỗi quạt roi gai trọn vẹn buff.' }
      ]
    }
  },
  {
    id: 'shorekeeper',
    name: 'The Shorekeeper',
    title: 'Guardian of the Black Shores',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Universal Support / Crit Buffer / Healer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Shorekeeper.png',
    iconColor: '#38bdf8',
    tags: ['Spectro', 'Healer', 'Crit Buffer', 'Rectifier', 'Tier 0 Support'],
    bestWeapon: 'Stellar Symphony',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus (Fallacy of No Return) | 3-Cost: Energy Regen | 1-Cost: HP%',
    outroDescription: 'Nâng cấp Stella Field lên Giai Đoạn 3: Tăng 12.5% Tỷ Lệ Bạo Kích (Crit Rate) và 25% Sát Thương Bạo Kích (Crit DMG) cho toàn đội trong 30 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper', action: 'Ra sân đầu trận ➔ Dùng E triệu hồi bướm tích Forte ➔ Kích hoạt Resonance Liberation R mở Stella Field ➔ Bấm Fallacy Echo ➔ Đầy Concerto ➔ Outro buff Crit cho đồng đội.' }
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
    role: 'Burst Main DPS / Skill DMG King',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jinhsi.png',
    iconColor: '#facc15',
    tags: ['Spectro', 'Resonance Skill DMG', 'Broadblade', 'Tier 0 DPS'],
    bestWeapon: 'Ages of Harvest',
    bestEchoSet: '5-pc Celestial Light',
    echoMainStats: '4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%',
    outroDescription: 'Giảm thời gian hồi chiêu của các đòn Coordinated Attack (Đòn tấn công phối hợp) từ đồng đội đi 1 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Intro ➔ E ➔ R ➔ Mid-air combo ➔ Outro buff All-Type DMG.' },
        { step: 2, char: 'Zhezhi / Yuanwu / Yinlin', action: 'Intro ➔ Bật đòn phối hợp Coordinated Attack (Zhezhi R hoặc Yuanwu cắm cột E) ➔ Outro chuyển giao.' },
        { step: 3, char: 'Jinhsi', action: 'Intro vào sân (Incarnation) ➔ Hấp thụ tối đa 50 tầng Incandescence từ đòn đánh phối hợp ➔ Đánh thường 4 nhịp ➔ Skill E đợt 1 ➔ Liberation R xả long nộ ➔ Bấm E cường hóa (Illuminous Epiphany) thả rồng nổ hàng triệu sát thương.' }
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
    role: 'Main / Quickswap DPS / Fusion Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Changli.png',
    iconColor: '#f97316',
    tags: ['Fusion', 'Quickswap', 'Resonance Liberation', 'Sword'],
    bestWeapon: 'Blazing Brilliance',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Fusion DMG và 25% Resonance Liberation DMG Deepen trong 10 giây cho nhân vật tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Chuỗi combo chuẩn bị buff ATK & All-Type DMG.' },
        { step: 2, char: 'Changli', action: 'Tích 4 tầng Enflamement ➔ E ➔ Đòn trọng kích Flaming Sacrifice ➔ R xả nộ phượng hoàng ➔ Outro kích hoạt.' },
        { step: 3, char: 'Encore / Chixia', action: 'Nhận trọn vẹn 20% Fusion DMG và 25% Liberation DMG ➔ Bật R hóa hình dồn sát thương.' }
      ],
      quickswap: [
        { step: 1, char: 'Changli', action: 'Tung True Sight: Charge hoặc bấm R nộ phượng hoàng.' },
        { step: 2, char: 'Encore', action: 'Animation cancel: Ngay lúc kiếm của Changli vung ra, đổi sang Encore bấm trọng kích Cosmos Rave.' },
        { step: 3, char: 'Changli', action: 'Đổi ngược về Changli tiếp tục chuỗi chém kiếm lửa mà không lãng phí 1 giây hoạt ảnh.' }
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
    role: 'Burst Main DPS / Liberation Specialist',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/XiangliYao.png',
    iconColor: '#8b5cf6',
    tags: ['Electro', 'Resonance Liberation', 'Gauntlets', 'Huaxu'],
    bestWeapon: 'Verity\'s Handle',
    bestEchoSet: '5-pc Void Thunder',
    echoMainStats: '4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Gây sát thương Electro bằng 237% ATK và đóng băng/làm chậm kẻ địch xung quanh trong 3 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Kích hoạt buff sát thương và Crit toàn đội.' },
        { step: 2, char: 'Yinlin', action: 'Đặt hình nộm ➔ R xả nộ ➔ Outro buff 20% Electro DMG & 25% Resonance Liberation DMG Deepen.' },
        { step: 3, char: 'Xiangli Yao', action: 'Intro nhận buff khổng lồ ➔ Bật R kích hoạt trạng thái Trực Giác (Intuition) ➔ Bấm liên tiếp Skill E cường hóa (Decaying Cube) ➔ Kết liễu bằng Law of Reduction.' }
      ],
      quickswap: [
        { step: 1, char: 'Xiangli Yao', action: 'Bấm E giải phóng khối lập phương năng lượng.' },
        { step: 2, char: 'Changli / Yinlin', action: 'Hoán đổi ngay khi đòn đấm đang thi triển ➔ Đồng đội ra sân dùng Skill E ngắn.' },
        { step: 3, char: 'Xiangli Yao', action: 'Quay lại kích hoạt nộ R với đầy đủ thanh buff.' }
      ]
    }
  },
  {
    id: 'yinlin',
    name: 'Yinlin',
    title: 'Secrecy Officer of Jinzhou',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Sub-DPS / Electro & Liberation Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yinlin.png',
    iconColor: '#9333ea',
    tags: ['Electro', 'Coordinated ATK', 'Buffer', 'Rectifier'],
    bestWeapon: 'Stringmaster',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Electro DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Electro DMG và 25% Resonance Liberation DMG Deepen trong 14 giây cho đồng minh tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Yinlin', action: 'Intro vào sân ➔ E đợt 1 ➔ Đánh thường tích Judgment Points ➔ E đợt 2 ➔ R nộ sấm sét ➔ Heavy Attack khắc dấu ấn ngầm Zapstring ➔ Heron Echo ➔ Outro chuyển giao buff.' }
      ],
      quickswap: [
        { step: 1, char: 'Yinlin', action: 'Bấm R xả nộ tạo lưới điện diện rộng.' },
        { step: 2, char: 'Xiangli Yao / Calcharo', action: 'Animation cancel lập tức đổi sang Main DPS lao vào đấm khi lưới điện vẫn đang giật liên tục.' }
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
    role: 'Sub-DPS / Skill DMG & Glacio Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Zhezhi.png',
    iconColor: '#06b6d4',
    tags: ['Glacio', 'Coordinated ATK', 'Skill DMG Buffer', 'Rectifier'],
    bestWeapon: 'Rime-Draped Sprouts',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff 20% Glacio DMG và 25% Resonance Skill DMG Deepen trong 14 giây cho nhân vật tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Zhezhi', action: 'Intro ➔ E triệu hồi hạc mực ➔ R xả nộ kích hoạt đòn phối hợp liên kích ngoài sân ➔ Heavy Attack tích đầy Concerto ➔ Heron Echo ➔ Outro truyền 25% Skill DMG Deepen cho Jinhsi hoặc Carlotta.' }
      ]
    }
  },
  {
    id: 'carlotta',
    name: 'Carlotta',
    title: 'Second Daughter of Montelli Family',
    element: 'Glacio',
    rarity: 5,
    weaponType: 'Pistols',
    role: 'Main DPS / Shotgun Skill Specialist',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Carlotta.webp',
    iconColor: '#0ea5e9',
    tags: ['Glacio', 'Pistols', 'Skill DMG', 'Rinascita', 'Parry'],
    bestWeapon: 'Cold Whisper / Static Mist',
    bestEchoSet: '5-pc Freezing Frost',
    echoMainStats: '4-Cost: Crit Rate/DMG (Lampylumen Myriad) | 3-Cost: Glacio DMG | 1-Cost: ATK%',
    outroDescription: 'Gây sát thương Glacio bằng 480% ATK và tăng 25% Resonance Skill DMG Deepen cho nhân vật vào sân kế tiếp trong 14 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Tạo vùng buff ATK và Crit Rate toàn đội.' },
        { step: 2, char: 'Zhezhi / Sanhua', action: 'Intro ➔ Bật đòn phối hợp R ➔ Outro buff 25% Skill DMG (Zhezhi) hoặc 38% Basic ATK (Sanhua).' },
        { step: 3, char: 'Carlotta', action: 'Intro vào sân ➔ Biến đổi súng ngắn thành Shotgun hạng nặng ➔ E liên hoàn bắn diện rộng ➔ Đỡ đòn Parry phản kích ➔ R nổ băng xóa sổ kẻ địch.' }
      ],
      quickswap: [
        { step: 1, char: 'Carlotta', action: 'Tung đòn bắn Shotgun nổ băng đợt 1.' },
        { step: 2, char: 'Zhezhi', action: 'Cancel hoạt ảnh giật súng ➔ Chuyển Zhezhi tung E vẽ hạc.' },
        { step: 3, char: 'Carlotta', action: 'Đổi lại Carlotta kích nổ Resonance Liberation ngay tầm gần.' }
      ]
    }
  },
  {
    id: 'phoebe',
    name: 'Phoebe',
    title: 'Blessed Maiden of Rinascita',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Main DPS / Dual Form Buffer',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Phoebe.webp',
    iconColor: '#facc15',
    tags: ['Spectro', 'Rectifier', 'Spectro Frazzle', 'Dual Form'],
    bestWeapon: 'Luminous Reverie',
    bestEchoSet: '5-pc Celestial Light',
    echoMainStats: '4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%',
    outroDescription: 'Áp đặt trạng thái Spectro Frazzle lên mục tiêu: Kẻ địch chịu thêm 20% sát thương Spectro và khuếch đại sát thương dứt điểm trong 14 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Tạo Stella Field hoặc buff All-Type DMG.' },
        { step: 2, char: 'Rover (Spectro) / Yangyang', action: 'Hỗ trợ nạp năng lượng và gom quái.' },
        { step: 3, char: 'Phoebe', action: 'Intro vào sân ➔ Chuyển thể Xá Tội (Absolution Form) ➔ E phóng chùm tia quang năng ➔ R xả toàn bộ ánh sáng thiêng trừng phạt kẻ địch.' }
      ]
    }
  },
  {
    id: 'brant',
    name: 'Brant',
    title: 'Captain of the Fleet',
    element: 'Fusion',
    rarity: 5,
    weaponType: 'Broadblade',
    role: 'Main DPS / Plunge Burst',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Brant.webp',
    iconColor: '#ea580c',
    tags: ['Fusion', 'Broadblade', 'Plunge DMG', 'Rinascita'],
    bestWeapon: 'Blazing Sun Anchor',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Thực hiện cú bổ nhào rực lửa: Tăng 20% Fusion DMG và 25% Resonance Skill DMG Deepen cho đồng minh tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Mở buff ATK và hồi phục toàn đội.' },
        { step: 2, char: 'Changli', action: 'Thi triển đòn phượng hoàng tích Concerto ➔ Outro truyền 20% Fusion DMG và 25% Liberation Deepen.' },
        { step: 3, char: 'Brant', action: 'Intro vào sân nhận trọn buff Fusion ➔ Kích hoạt Skill E lướt trên không ➔ Nện đòn Plunging lửa long trời lở đất ➔ R kích nổ đại bác mạn thuyền.' }
      ]
    }
  },
  {
    id: 'roccia',
    name: 'Roccia',
    title: 'First Mate of the Fleet',
    element: 'Havoc',
    rarity: 5,
    weaponType: 'Gauntlets',
    role: 'Sub-DPS / Havoc & Heavy ATK Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Roccia.webp',
    iconColor: '#be185d',
    tags: ['Havoc', 'Gauntlets', 'Brawler', 'Rinascita'],
    bestWeapon: 'Obsidian Claws',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Havoc DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Đập mạnh xuống mặt đất gây sát thương Havoc diện rộng và buff 20% Havoc DMG Deepen & 20% Heavy ATK DMG Deepen cho đồng minh vào sân.',
    rotations: {
      standard: [
        { step: 1, char: 'Roccia', action: 'Intro ➔ Chuỗi đấm bốc cận chiến tích thanh Forte ➔ E kích nổ quyền lực Havoc ➔ R xả sóng xung kích ➔ Heron Echo ➔ Outro chuyển giao cho Cantarella / Camellya.' }
      ]
    }
  },
  {
    id: 'cantarella',
    name: 'Cantarella',
    title: 'Matriarch of Fisalia',
    element: 'Havoc',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Main DPS / Dark Resonance Master',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Cantarella.webp',
    iconColor: '#9d174d',
    tags: ['Havoc', 'Rectifier', 'Fisalia', 'Dark Resonance'],
    bestWeapon: 'Echo of the Abyss',
    bestEchoSet: '5-pc Sun-sinking Eclipse',
    echoMainStats: '4-Cost: Crit Rate/DMG (Crownless) | 3-Cost: Havoc DMG | 1-Cost: ATK%',
    outroDescription: 'Gắn Dấu Ấn Hư Vô lên mục tiêu: Khi đồng minh tấn công mục tiêu sẽ giảm 15% Kháng Havoc của đối thủ trong 15 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Shorekeeper / Verina', action: 'Buff toàn diện Crit & ATK.' },
        { step: 2, char: 'Roccia / Danjin', action: 'Ra sân tích Concerto nhanh ➔ Outro buff Havoc DMG Deepen.' },
        { step: 3, char: 'Cantarella', action: 'Intro vào sân ➔ Khởi động ma trận Fisalia (E) ➔ Đánh thường tầm xa áp đảo ➔ R giải phóng thực thể bóng tối nuốt trọn chiến trường.' }
      ]
    }
  },
  {
    id: 'ciaccona',
    name: 'Ciaccona',
    title: 'Melody of the Tempest',
    element: 'Aero',
    rarity: 5,
    weaponType: 'Pistols',
    role: 'Sub-DPS / Aero Erosion Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/aero.png',
    iconColor: '#059669',
    tags: ['Aero', 'Pistols', 'Aero Erosion', 'Buffer'],
    bestWeapon: 'Whirlwind Serenade',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Gây hiệu ứng Xói Mòn Phong (Aero Erosion): Khiến kẻ địch chịu thêm 23% sát thương Aero Deepen trong 14 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Ciaccona', action: 'Intro vào sân ➔ Xả băng đạn phong lôi (E) ➔ Bật R gieo rắc giai điệu bão tố ngoài sân ➔ Heron Echo ➔ Outro kích nổ 23% Aero Deepen cho Jiyan.' }
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
    role: 'Main DPS / Heavy ATK AOE King',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jiyan.png',
    iconColor: '#10b981',
    tags: ['Aero', 'Heavy ATK', 'Broadblade', 'Midnight Rangers', 'Tier 0 AOE'],
    bestWeapon: 'Verdant Summit',
    bestEchoSet: '5-pc Sierra Gale',
    echoMainStats: '4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%',
    outroDescription: 'Triệu hồi gió xoáy Qingloong lướt qua kẻ thù gây sát thương Aero liên tục.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'E ➔ R ➔ Mid-air combo ➔ Outro buff All-Type DMG.' },
        { step: 2, char: 'Mortefi / Ciaccona', action: 'Intro nhận buff ➔ E ➔ R triệu hồi rồng bắn tỉa ➔ Outro kích hoạt 38% Heavy ATK DMG Deepen.' },
        { step: 3, char: 'Jiyan', action: 'Intro nhận trọn buff của Mortefi ➔ Bật Resonance Liberation R hóa Thanh Long ➔ Giữ chuột quạt thương sát thương Heavy ATK cuốn phăng toàn bộ quái vật trên sàn đấu.' }
      ]
    }
  },

  // ==========================================
  // 2. NHÓM 5-SAO CƠ BẢN (STANDARD 5-STAR)
  // ==========================================
  {
    id: 'calcharo',
    name: 'Calcharo',
    title: 'Leader of the Ghost Hounds',
    element: 'Electro',
    rarity: 5,
    weaponType: 'Broadblade',
    role: 'Main DPS / Burst Awakening',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Calcharo.png',
    iconColor: '#9333ea',
    tags: ['Electro', 'Broadblade', 'Resonance Liberation', 'Ghost Hounds'],
    bestWeapon: 'Verity\'s Handle / Lustrous Razor',
    bestEchoSet: '5-pc Void Thunder',
    echoMainStats: '4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Triệu hồi Phantom of the Hound giáng một đòn sấm sét gây sát thương Electro bằng 195.98% + 61.3% ATK.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Thi triển chuỗi buff ATK & sát thương.' },
        { step: 2, char: 'Yinlin / Jianxin', action: 'Intro ➔ E ➔ R ➔ Outro buff Electro & Liberation DMG Deepen.' },
        { step: 3, char: 'Calcharo', action: 'Intro vào sân ➔ Bật R kích hoạt trạng thái Deathblade Gear ➔ Thực hiện chuỗi 3 đòn Hounds Roar và Death Messenger chém sấm sét hủy diệt.' }
      ],
      quickswap: [
        { step: 1, char: 'Calcharo', action: 'Dùng E đợt 1 ➔ Đánh thường nhịp 1.' },
        { step: 2, char: 'Yinlin', action: 'Animation cancel sang Yinlin xả đòn E tích điểm.' },
        { step: 3, char: 'Calcharo', action: 'Đổi về Calcharo dùng E đợt 2 ngay tắp lự mà không bị đứt chuỗi combo.' }
      ]
    }
  },
  {
    id: 'encore',
    name: 'Encore',
    title: 'Consultant of the Black Shores',
    element: 'Fusion',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Main / Quickswap DPS / Basic ATK Specialist',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Encore.png',
    iconColor: '#fb923c',
    tags: ['Fusion', 'Basic ATK', 'Quickswap', 'Rectifier', 'Black Shores'],
    bestWeapon: 'Stringmaster / Augment',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Triệu hồi trường lửa Cosmos thiêu đốt kẻ địch xung quanh, gây 176.76% sát thương Fusion mỗi giây trong 6 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Buff ATK và All-Type DMG.' },
        { step: 2, char: 'Sanhua', action: 'E ➔ R ➔ Detonate nổ băng trong 3s ➔ Outro buff 38% Basic ATK.' },
        { step: 3, char: 'Encore', action: 'Intro ➔ Bật R hóa hình cuồng nộ Cosmos Rave ➔ Đánh thường dồn dập ➔ Heavy Attack nổ vụ nổ cừu Cosmos.' }
      ],
      quickswap: [
        { step: 1, char: 'Encore', action: 'Bắt đầu bấm giữ Heavy Attack tụ lực nổ Cosmos Rave.' },
        { step: 2, char: 'Changli', action: 'Ngay khi Encore bắt đầu tụ lực, lập tức đổi sang Changli vung kiếm E (Encore vẫn đứng sân tự nổ độc lập).' },
        { step: 3, char: 'Encore', action: 'Đổi lại Encore sau khi Changli hoàn tất đòn chém.' }
      ]
    }
  },
  {
    id: 'verina',
    name: 'Verina',
    title: 'Botanist of Huaxu Academy',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Rectifier',
    role: 'Universal Support / Healer / Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Verina.png',
    iconColor: '#eab308',
    tags: ['Spectro', 'Healer', 'Universal Buffer', 'Rectifier', 'Tier 0 Support'],
    bestWeapon: 'Variation',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Hồi phục HP liên tục cho nhân vật đang xuất trận và buff 15% All-Type DMG Deepen cho toàn đội trong 30 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina', action: 'Vào sân ➔ E ➔ R ➔ Nhảy đánh thường trên không Mid-air 3 lần tiêu hao Photosynthesis ➔ Bật Bell-Borne Echo ➔ Kích hoạt Outro buff 15% All-Type DMG cho đồng đội.' }
      ]
    }
  },
  {
    id: 'jianxin',
    name: 'Jianxin',
    title: 'Taoist Monk of Fengyidu',
    element: 'Aero',
    rarity: 5,
    weaponType: 'Gauntlets',
    role: 'Support / Shielder / Liberation Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jianxin.png',
    iconColor: '#14b8a6',
    tags: ['Aero', 'Shield', 'Parry', 'Liberation Buffer', 'Gauntlets'],
    bestWeapon: 'Abyss Surges / Marcato',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate / ATK (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff cực mạnh 38% Resonance Liberation DMG Deepen trong 14 giây cho nhân vật tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Jianxin', action: 'Vào sân ➔ E phản đòn đỡ chiêu (Parry) ➔ R gom toàn bộ quái vật vào tâm xoáy thái cực ➔ Giữ chuột tụ khí Chi Spiral tạo khiên siêu dày ➔ Outro truyền 38% Liberation Deepen cho Calcharo / Xiangli Yao / Rover.' }
      ]
    }
  },
  {
    id: 'lingyang',
    name: 'Lingyang',
    title: 'Liondance Troupe Performer',
    element: 'Glacio',
    rarity: 5,
    weaponType: 'Gauntlets',
    role: 'Main DPS / Aerial Flurry',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lingyang.png',
    iconColor: '#38bdf8',
    tags: ['Glacio', 'Gauntlets', 'Aerial Combat', 'Basic ATK'],
    bestWeapon: 'Abyss Surges',
    bestEchoSet: '5-pc Freezing Frost',
    echoMainStats: '4-Cost: Crit Rate/DMG (Lampylumen Myriad) | 3-Cost: Glacio DMG | 1-Cost: ATK%',
    outroDescription: 'Giải phóng cú vồ sư tử gây sát thương Glacio bằng 587% ATK cho kẻ địch xung quanh.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Baizhi', action: 'Chuẩn bị buff ATK & hồi phục HP.' },
        { step: 2, char: 'Sanhua', action: 'E ➔ R ➔ Detonate nổ băng ➔ Outro truyền 38% Basic ATK DMG Deepen.' },
        { step: 3, char: 'Lingyang', action: 'Intro vào sân ➔ Bật R kích hoạt trạng thái Suan\'ni múa lân ➔ Nhảy lên không trung liên hoàn cào vuốt băng xé toạc mục tiêu.' }
      ]
    }
  },

  // ==========================================
  // 3. NHÓM ROVER (PROTAGONIST FORMS)
  // ==========================================
  {
    id: 'rover_havoc',
    name: 'Rover (Havoc)',
    title: 'Arbiter of Darkness',
    element: 'Havoc',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Main DPS / Dark Surge Burst',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Havoc.png',
    iconColor: '#be123c',
    tags: ['Havoc', 'Sword', 'Dark Surge', 'Free 5-Star S6'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Sun-sinking Eclipse',
    echoMainStats: '4-Cost: Crit Rate/DMG (Dreamless) | 3-Cost: Havoc DMG | 1-Cost: ATK%',
    outroDescription: 'Tung đòn chém bóng tối hình chữ X gây 143% sát thương Havoc và kích hoạt nổ Dark Burst.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Shorekeeper', action: 'Buff ATK và All-Type DMG.' },
        { step: 2, char: 'Danjin', action: 'Intro ➔ Combo rút máu tăng thanh Forte ➔ E liên hoàn ➔ Outro truyền 23% Havoc DMG Deepen.' },
        { step: 3, char: 'Rover (Havoc)', action: 'Intro nhận buff Havoc ➔ Heavy Attack vào trạng thái Dark Surge ➔ Combo kiếm đen cường hóa ➔ R tung lưỡi hái bóng tối nộ khổng lồ ➔ Bấm Dreamless Echo nổ sạch màn hình.' }
      ],
      quickswap: [
        { step: 1, char: 'Rover (Havoc)', action: 'Bật R tung nộ lưỡi hái ➔ Lập tức bấm Dreamless Echo.' },
        { step: 2, char: 'Danjin', action: 'Animation cancel: Ngay lúc Dreamless đang gầm, đổi sang Danjin tung E.' },
        { step: 3, char: 'Rover (Havoc)', action: 'Đổi lại Rover tiếp tục đánh thường Dark Surge.' }
      ]
    }
  },
  {
    id: 'rover_spectro',
    name: 'Rover (Spectro)',
    title: 'Arbiter of Radiance',
    element: 'Spectro',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Sub-DPS / Time Stop CC / Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png',
    iconColor: '#eab308',
    tags: ['Spectro', 'Sword', 'Time Stop', 'Free 5-Star S6'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Celestial Light',
    echoMainStats: '4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%',
    outroDescription: 'Tạo vùng quang trường ngưng đọng thời gian (Time-Stop) làm bất động mọi kẻ địch trong 3 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Rover (Spectro)', action: 'Intro vào sân ➔ E ➔ R tung vòng thời gian ngưng đọng đối thủ ➔ Chuỗi đánh thường tích đầy Diminuendo ➔ Jué Echo ➔ Outro khống chế toàn sân.' }
      ]
    }
  },
  {
    id: 'rover_aero',
    name: 'Rover (Aero)',
    title: 'Arbiter of Gales',
    element: 'Aero',
    rarity: 5,
    weaponType: 'Sword',
    role: 'Sub-DPS / Crowd Control Vortex',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png',
    iconColor: '#10b981',
    tags: ['Aero', 'Sword', 'Vortex', 'Wind Slashing'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Sierra Gale',
    echoMainStats: '4-Cost: Crit Rate/DMG (Feilian) | 3-Cost: Aero DMG | 1-Cost: ATK%',
    outroDescription: 'Tạo lốc xoáy Aero hút chặt kẻ địch nhỏ vào tâm điểm và gây sát thương kéo dài.',
    rotations: {
      standard: [
        { step: 1, char: 'Rover (Aero)', action: 'Intro ➔ Tung đòn lướt kiếm gió ➔ R xoáy phong lốc ➔ Gom quái tạo tiền đề cho Main DPS.' }
      ]
    }
  },

  // ==========================================
  // 4. NHÓM 4-SAO (4-STAR RESONATORS)
  // ==========================================
  {
    id: 'sanhua',
    name: 'Sanhua',
    title: 'Guard of Jinzhou',
    element: 'Glacio',
    rarity: 4,
    weaponType: 'Sword',
    role: 'Sub-DPS / Basic ATK Buffer / Fast Concerto',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Sanhua.png',
    iconColor: '#38bdf8',
    tags: ['Glacio', 'Basic ATK Buffer', 'Fast Concerto', 'Sword', 'Top Tier 4-Star'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Buff cực mạnh 38% Sát Thương Đánh Thường (Basic Attack DMG Deepen) trong 14 giây cho nhân vật kế tiếp.',
    rotations: {
      standard: [
        { step: 1, char: 'Sanhua', action: 'Intro vào sân ➔ Skill E tạo khối băng ➔ Nộ R tạo gai tuyết ➔ Nhả chuột đúng vạch xanh thanh Forte (Detonate nổ sạch băng) ➔ Heron Echo ➔ Đầy 100% Concerto chỉ trong 3 giây ➔ Outro ngay cho Camellya / Encore / Lingyang.' }
      ]
    }
  },
  {
    id: 'mortefi',
    name: 'Mortefi',
    title: 'Department of Safety Researcher',
    element: 'Fusion',
    rarity: 4,
    weaponType: 'Pistols',
    role: 'Sub-DPS / Heavy ATK Buffer / Coordinated ATK',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Mortefi.png',
    iconColor: '#ef4444',
    tags: ['Fusion', 'Heavy ATK Buffer', 'Coordinated ATK', 'Pistols', 'Top Tier 4-Star'],
    bestWeapon: 'Static Mist',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Energy Regen / Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Buff cực mạnh 38% Sát Thương Trọng Kích (Heavy Attack DMG Deepen) trong 14 giây cho nhân vật kế tiếp.',
    rotations: {
      standard: [
        { step: 1, char: 'Mortefi', action: 'Intro vào sân ➔ E đợt 1 ➔ Đánh thường tích nộ ➔ E đợt 2 ➔ R kích hoạt Rồng Lửa bắn tỉa cùng đòn đánh của đồng minh ➔ Heron Echo ➔ Outro truyền 38% Heavy ATK cho Jiyan.' }
      ]
    }
  },
  {
    id: 'danjin',
    name: 'Danjin',
    title: 'Midnight Rangers Scout',
    element: 'Havoc',
    rarity: 4,
    weaponType: 'Sword',
    role: 'Sub-DPS / Havoc DMG Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Danjin.png',
    iconColor: '#e11d48',
    tags: ['Havoc', 'Havoc Buffer', 'HP Consume', 'Sword'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Moonlit Clouds / Sun-sinking',
    echoMainStats: '4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%',
    outroDescription: 'Buff 23% Sát Thương Thuộc Tính Havoc (Havoc DMG Deepen) trong 14 giây cho đồng minh tiếp theo.',
    rotations: {
      standard: [
        { step: 1, char: 'Danjin', action: 'Intro ➔ Nhấn liên tục Skill E để chém rút máu bản thân nạp Forte Ruby Blossom ➔ Heavy Attack giải phóng máu hồi lại HP ➔ R xả nộ ➔ Outro truyền 23% Havoc Deepen cho Rover Havoc / Camellya.' }
      ]
    }
  },
  {
    id: 'chixia',
    name: 'Chixia',
    title: 'Junior Patroller of Jinzhou',
    element: 'Fusion',
    rarity: 4,
    weaponType: 'Pistols',
    role: 'Main / Burst DPS / Rapid Fire',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Chixia.png',
    iconColor: '#f97316',
    tags: ['Fusion', 'Pistols', 'Rapid Fire', 'Patroller'],
    bestWeapon: 'Static Mist',
    bestEchoSet: '5-pc Molten Rift',
    echoMainStats: '4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%',
    outroDescription: 'Nã một phát đạn pháo cực đại gây 530% sát thương Fusion diện rộng về phía trước.',
    rotations: {
      standard: [
        { step: 1, char: 'Verina / Baizhi', action: 'Cung cấp buff ATK.' },
        { step: 2, char: 'Changli', action: 'Outro truyền 20% Fusion DMG và 25% Liberation Deepen.' },
        { step: 3, char: 'Chixia', action: 'Intro vào sân ➔ Giữ E xả toàn bộ 30 viên đạn Boom Boom sấy nát mục tiêu ➔ R nổ pháo hoa kết thúc chuỗi sát thương.' }
      ]
    }
  },
  {
    id: 'baizhi',
    name: 'Baizhi',
    title: 'Researcher of Huaxu Academy',
    element: 'Glacio',
    rarity: 4,
    weaponType: 'Rectifier',
    role: 'F2P Healer / Team Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Baizhi.png',
    iconColor: '#0ea5e9',
    tags: ['Glacio', 'Healer', 'Rectifier', 'F2P Friendly'],
    bestWeapon: 'Variation',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: HP%',
    outroDescription: 'Hồi máu cho đồng minh và rơi ra Lông Vũ Giai Điệu (Euphonia): Khi nhân vật nhặt sẽ nhận 15% All-Type DMG Deepen và 12% ATK trong 6 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Baizhi', action: 'Vào sân ➔ E triệu hồi You\'tan ➔ Đánh thường tích 4 tầng Concentration ➔ Heavy Attack tiêu hao tầng hồi máu toàn đội ➔ R nộ ➔ Bell-Borne Echo ➔ Outro rơi lông vũ cho Main DPS nhặt.' }
      ]
    }
  },
  {
    id: 'yangyang',
    name: 'Yangyang',
    title: 'Outrider of Midnight Rangers',
    element: 'Aero',
    rarity: 4,
    weaponType: 'Sword',
    role: 'Sub-DPS / Energy Battery / Crowd Control',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yangyang.png',
    iconColor: '#10b981',
    tags: ['Aero', 'Energy Battery', 'Sword', 'Fast Concerto'],
    bestWeapon: 'Emerald of Genesis',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Hồi phục cực mạnh 4 Resonance Energy mỗi giây trong 5 giây (Tổng cộng 20 Năng Lượng Nộ) cho đồng minh kế tiếp.',
    rotations: {
      standard: [
        { step: 1, char: 'Yangyang', action: 'Intro vào sân ➔ E ➔ R tạo cơn lốc gom quái cực rộng ➔ Đánh trên không Mid-air ➔ Heron Echo ➔ Outro nạp ngay 20 Năng Lượng R cho nhân vật phụ thuộc nộ.' }
      ]
    }
  },
  {
    id: 'taoqi',
    name: 'Taoqi',
    title: 'Border Guard Officer',
    element: 'Havoc',
    rarity: 4,
    weaponType: 'Broadblade',
    role: 'Support / Shielder / Skill DMG Buffer',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Taoqi.png',
    iconColor: '#ec4899',
    tags: ['Havoc', 'Broadblade', 'Shield', 'Skill DMG Buffer', 'DEF Scaler'],
    bestWeapon: 'Dauntless Evernight / Discord',
    bestEchoSet: '5-pc Moonlit Clouds / Rejuvenating',
    echoMainStats: '4-Cost: Bell-Borne | 3-Cost: DEF% / Energy Regen | 1-Cost: DEF%',
    outroDescription: 'Buff cực mạnh 38% Sát Thương Kỹ Năng (Resonance Skill DMG Deepen) trong 14 giây cho nhân vật kế tiếp.',
    rotations: {
      standard: [
        { step: 1, char: 'Taoqi', action: 'Intro ➔ Nhấn giữ E kích hoạt thế phòng ngự Rocksteady Shield (DEF cao) ➔ Phản đòn khi bị tấn công ➔ R xả nộ ➔ Outro truyền 38% Skill DMG Deepen cho Jinhsi / Changli.' }
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
    role: 'Fast Coordinated Support / Shield Shredder',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yuanwu.png',
    iconColor: '#a855f7',
    tags: ['Electro', 'Coordinated ATK', 'Gauntlets', 'Vibration Break', 'Jinhsi Best Friend'],
    bestWeapon: 'Originite: Type IV',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Bell-Borne | 3-Cost: DEF% / Energy Regen | 1-Cost: DEF%',
    outroDescription: 'Gây sát thương Electro phá vỡ thanh Rung Chấn (Vibration Strength) của boss cực nhanh.',
    rotations: {
      standard: [
        { step: 1, char: 'Yuanwu', action: 'Ra sân vỏn vẹn 1 giây ➔ Cắm cột Lôi Trụ (E) ➔ Bấm Bell-Borne Echo ➔ Đổi ngay sang Jinhsi (Cột tự động nổ đòn phối hợp Coordinated ATK mỗi khi Jinhsi tấn công, sạc 50 tầng Incandescence miễn phí).' }
      ]
    }
  },
  {
    id: 'aalto',
    name: 'Aalto',
    title: 'Information Broker',
    element: 'Aero',
    rarity: 4,
    weaponType: 'Pistols',
    role: 'Sub-DPS / Aero DMG Buffer / Taunt',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Aalto.png',
    iconColor: '#059669',
    tags: ['Aero', 'Pistols', 'Aero Buffer', 'Taunt Gate'],
    bestWeapon: 'Static Mist',
    bestEchoSet: '5-pc Moonlit Clouds',
    echoMainStats: '4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Tạo Cổng Ranh Giới (Gate of Quandary): Đồng minh đi qua cổng nhận thêm 23% Aero DMG Deepen trong 14 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Aalto', action: 'Intro ➔ Bật E để lại ảo ảnh sương mù khiêu khích quái ➔ R tạo cánh cổng gió khổng lồ ➔ Bắn xuyên cổng gia tăng tốc độ đạn ➔ Outro buff 23% Aero cho Jiyan.' }
      ]
    }
  },
  {
    id: 'youhu',
    name: 'Youhu',
    title: 'Antique Appraiser',
    element: 'Glacio',
    rarity: 4,
    weaponType: 'Gauntlets',
    role: 'Healer / Coordinated ATK Buffer / Gambler',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Youhu.png',
    iconColor: '#0284c7',
    tags: ['Glacio', 'Gauntlets', 'Healer', 'Coordinated Buffer', 'Rinascita'],
    bestWeapon: 'Abyss Surges / Marcato',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%',
    outroDescription: 'Hồi phục HP và kích hoạt Thi Khúc Cổ: Tăng 100% Sát Thương Đòn Tấn Công Phối Hợp (Coordinated Attack DMG Deepen) cho đồng minh trong 20 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Youhu', action: 'Intro vào sân ➔ E giám định cổ vật (Rút bùa Thỏi Vàng/Bình Gốm) ➔ Heavy Attack ném rương hồi máu toàn đội ➔ R nổ cổ vật ➔ Outro buff 100% Coordinated Attack cho Zhezhi / Yinlin / Mortefi.' }
      ]
    }
  },
  {
    id: 'lumi',
    name: 'Lumi',
    title: 'Lollo Logistics Navigator',
    element: 'Electro',
    rarity: 4,
    weaponType: 'Broadblade',
    role: 'Main / Sub-DPS / Logistics Delivery',
    avatar: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lumi.webp',
    iconColor: '#7c3aed',
    tags: ['Electro', 'Broadblade', 'Lollo Logistics', 'Electro Burst'],
    bestWeapon: 'Autumntrace / Broadblade#41',
    bestEchoSet: '5-pc Void Thunder',
    echoMainStats: '4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%',
    outroDescription: 'Ném gói hàng sấm sét gây 320% sát thương Electro và tăng 15% Electro DMG & 15% Basic ATK Deepen cho nhân vật kế tiếp.',
    rotations: {
      standard: [
        { step: 1, char: 'Lumi', action: 'Intro vào sân ➔ Nhấn Skill E vận chuyển năng lượng Lollo ➔ Tích đầy thanh Lollo Delivery ➔ Bật Liberation R nổ thùng hàng lôi điện ➔ Outro chuyển giao.' }
      ]
    }
  },
  {
    id: 'buling',
    name: 'Buling',
    title: 'Electro Frequency Specialist',
    element: 'Electro',
    rarity: 4,
    weaponType: 'Rectifier',
    role: 'Support / Healer / Electro Buffer',
    avatar: 'https://wutheringlab.com/wp-content/uploads/Buling.webp',
    iconColor: '#9333ea',
    tags: ['Electro', 'Rectifier', 'Healer', 'Electro Buffer'],
    bestWeapon: 'Variation',
    bestEchoSet: '5-pc Rejuvenating Glow',
    echoMainStats: '4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: HP%',
    outroDescription: 'Hồi phục tức thời 19% Max HP cho đồng minh vào sân và tăng 15% Electro DMG Deepen trong 20 giây.',
    rotations: {
      standard: [
        { step: 1, char: 'Buling', action: 'Intro ➔ E phát sóng từ trường lôi hồi máu ➔ R mở màn chắn tần số Electro ➔ Đầy Concerto ➔ Outro buff 15% Electro DMG cho Xiangli Yao / Hsin / Calcharo.' }
      ]
    }
  }
];

// =========================================================================================
// PREDEFINED META TEAM TEMPLATES (DANH SÁCH 25 ĐỘI HÌNH META CHUẨN MỰC TỪ BẢN 1.0 ĐẾN 3.7)
// =========================================================================================
export const TEAM_TEMPLATES = [
  // 1. Meta Version 3.7 & Rinascita
  {
    id: 'hsin-electro-quickswap',
    name: 'Hsin Unison Quickswap (Meta 3.7)',
    core: 'hsin',
    members: ['hsin', 'xiangli_yao', 'shorekeeper'],
    type: 'Quickswap / Dual Carry',
    description: 'Tối ưu hóa cơ chế Unison độc bản của Hsin (3.7) luân chuyển liên tục với Xiangli Yao mà không cần chờ nạp đầy Concerto.',
    tags: ['Electro', 'Unison', 'Tier 0', 'v3.7']
  },
  {
    id: 'suoming-hsin-duo',
    name: 'Suoming & Hsin Dual Sentinels',
    core: 'suoming',
    members: ['suoming', 'hsin', 'shorekeeper'],
    type: 'Dual Carry Burst',
    description: 'Bộ đôi Lôi Tướng v3.7 tạo chuỗi nổ sét màn hình với 2 lần kích hoạt Unison không gián đoạn.',
    tags: ['Electro', 'Unison', 'Top Burst']
  },
  {
    id: 'camellya-hypercarry',
    name: 'Camellya Havoc Storm',
    core: 'camellya',
    members: ['camellya', 'sanhua', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Tận dụng 38% Basic ATK DMG Deepen của Sanhua cùng Stella Field để Camellya đạt ngưỡng sát thương roi gai Havoc cực đại.',
    tags: ['Havoc', 'Basic ATK', 'Tier 0 DPS']
  },
  {
    id: 'carlotta-glacio-shred',
    name: 'Carlotta Shotgun Heavy Artillery',
    core: 'carlotta',
    members: ['carlotta', 'zhezhi', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Zhezhi buff 25% Resonance Skill DMG và Glacio DMG đưa các phát bắn Shotgun của Carlotta lên tầm hủy diệt.',
    tags: ['Glacio', 'Skill DMG', 'Shotgun']
  },
  {
    id: 'carlotta-f2p-sanhua',
    name: 'Carlotta F2P Friendly Frost',
    core: 'carlotta',
    members: ['carlotta', 'sanhua', 'baizhi'],
    type: 'F2P Friendly Carry',
    description: 'Đội hình Glacio dễ tiếp cận nhất cho Carlotta với Sanhua nạp Concerto siêu tốc và Baizhi cung cấp hồi máu.',
    tags: ['Glacio', 'F2P', 'Fast Rotation']
  },
  {
    id: 'phoebe-spectro-carry',
    name: 'Phoebe Absolution Radiance',
    core: 'phoebe',
    members: ['phoebe', 'rover_spectro', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Tận dụng hiệu ứng Spectro Frazzle kết hợp Time-Stop của Rover Spectro để Phoebe xả toàn bộ chùm tia sáng thiêng.',
    tags: ['Spectro', 'Spectro Frazzle']
  },
  {
    id: 'brant-fusion-plunge',
    name: 'Brant Plunging Inferno',
    core: 'brant',
    members: ['brant', 'changli', 'shorekeeper'],
    type: 'Quickswap / Dual Carry',
    description: 'Changli buff 20% Fusion và 25% Liberation biến mỗi cú bổ nhào đại bác của Thuyền Trưởng Brant thành vụ nổ dung nham.',
    tags: ['Fusion', 'Plunge', 'Rinascita']
  },
  {
    id: 'cantarella-roccia-havoc',
    name: 'Cantarella & Roccia Havoc Requiem',
    core: 'cantarella',
    members: ['cantarella', 'roccia', 'shorekeeper'],
    type: 'Dual Carry',
    description: 'Roccia buff 20% Havoc & Heavy ATK kết hợp dấu ấn Fisalia của Cantarella làm tan chảy mọi khiên boss.',
    tags: ['Havoc', 'Rinascita', 'Sustain']
  },
  {
    id: 'jiyan-ciaccona-aero',
    name: 'Jiyan & Ciaccona Tempest Tornado',
    core: 'jiyan',
    members: ['jiyan', 'ciaccona', 'shorekeeper'],
    type: 'Hypercarry AOE',
    description: 'Ciaccona gieo rắc Aero Erosion tăng 23% sát thương Aero Deepen giúp Thanh Long Jiyan càn quét toàn bộ La Hoàn.',
    tags: ['Aero', 'Aero Erosion', 'AOE King']
  },

  // 2. Meta Version 1.1 - 1.3
  {
    id: 'jinhsi-dragon-nuke',
    name: 'Jinhsi Dragon Bomb (Tier 0)',
    core: 'jinhsi',
    members: ['jinhsi', 'zhezhi', 'verina'],
    type: 'Burst Hypercarry',
    description: 'Đội hình chuẩn mực số 1 của Jinhsi: Hạc Zhezhi nạp đầy 50 tầng Incandescence và buff 25% Resonance Skill DMG Deepen.',
    tags: ['Spectro', 'Resonance Skill', 'Tier 0']
  },
  {
    id: 'jinhsi-f2p-yuanwu',
    name: 'Jinhsi F2P Fast Stack',
    core: 'jinhsi',
    members: ['jinhsi', 'yuanwu', 'verina'],
    type: 'F2P Friendly Hypercarry',
    description: 'Yuanwu không cần đầu tư tài nguyên, chỉ cần cắm cột E là Jinhsi có đòn phối hợp Coordinated ATK sạc max stack.',
    tags: ['F2P', 'Low Investment', 'High Value']
  },
  {
    id: 'changli-encore-quickswap',
    name: 'Changli & Encore Fusion Twin',
    core: 'changli',
    members: ['changli', 'encore', 'verina'],
    type: 'Quickswap S-Tier',
    description: 'Cặp bài trùng hủy diệt hoạt ảnh (Animation Cancel): Changli và Encore liên tục đổi chỗ nhau khi đối phương đang tụ lực.',
    tags: ['Fusion', 'Quickswap', 'High Skill Ceiling']
  },
  {
    id: 'changli-chixia-burst',
    name: 'Changli & Chixia Gunslinger Duo',
    core: 'changli',
    members: ['changli', 'chixia', 'verina'],
    type: 'Quickswap Burst',
    description: 'Chixia nhận trọn 20% Fusion DMG và 25% Liberation Deepen từ Changli để nã 30 viên đạn thiêu đốt mục tiêu.',
    tags: ['Fusion', 'Fun', 'High Burst']
  },
  {
    id: 'xiangli-yinlin-hyper',
    name: 'Xiangli Yao Electro Surge',
    core: 'xiangli_yao',
    members: ['xiangli_yao', 'yinlin', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Yinlin buff 20% Electro + 25% Liberation DMG biến mỗi cú đấm của Viện Trưởng Xiangli Yao thành sát thương hạt nhân.',
    tags: ['Electro', 'Resonance Liberation', 'Single Target King']
  },
  {
    id: 'jiyan-wind-dragon',
    name: 'Jiyan Heavy Whirlwind',
    core: 'jiyan',
    members: ['jiyan', 'mortefi', 'verina'],
    type: 'Hypercarry',
    description: 'Đội hình quốc dân của Jiyan: Mortefi cung cấp 38% Heavy ATK DMG Deepen và rồng lửa bắn phụ trợ.',
    tags: ['Aero', 'Heavy ATK', 'AOE King']
  },

  // 3. Đội hình Rover & Standard 5-Star
  {
    id: 'rover-havoc-danjin',
    name: 'Rover (Havoc) & Danjin Blood Pact',
    core: 'rover_havoc',
    members: ['rover_havoc', 'danjin', 'verina'],
    type: 'Hypercarry S-Tier',
    description: 'Danjin buff 23% Havoc DMG Deepen giúp Rover Havoc vung kiếm Dark Surge và ném lưỡi hái Dreamless hủy diệt mọi boss.',
    tags: ['Havoc', 'F2P Accessible', 'High DMG']
  },
  {
    id: 'calcharo-yinlin-classic',
    name: 'Calcharo & Yinlin Classic Thunder',
    core: 'calcharo',
    members: ['calcharo', 'yinlin', 'verina'],
    type: 'Hypercarry',
    description: 'Đội hình sấm sét kinh điển: Yinlin buff 20% Electro & 25% Liberation cho trạng thái Deathblade Gear của Calcharo.',
    tags: ['Electro', 'Classic Meta']
  },
  {
    id: 'calcharo-jianxin-liberation',
    name: 'Calcharo & Jianxin Safe Liberation',
    core: 'calcharo',
    members: ['calcharo', 'jianxin', 'verina'],
    type: 'Safe Hypercarry',
    description: 'Jianxin vừa tạo khiên khổng lồ chống gián đoạn vừa buff 38% Resonance Liberation DMG cho Calcharo chém an toàn.',
    tags: ['Electro', 'Shield', 'High Comfort']
  },
  {
    id: 'lingyang-sanhua-frost',
    name: 'Lingyang Lion Dance Frost',
    core: 'lingyang',
    members: ['lingyang', 'sanhua', 'verina'],
    type: 'Hypercarry',
    description: 'Sanhua buff 38% Basic ATK giúp điệu múa lân trên không của Lingyang gây sát thương băng liên tục.',
    tags: ['Glacio', 'Basic ATK', 'Aerial']
  },
  {
    id: 'encore-sanhua-f2p',
    name: 'Encore & Sanhua F2P Blast',
    core: 'encore',
    members: ['encore', 'sanhua', 'baizhi'],
    type: 'F2P Friendly',
    description: 'Đội hình F2P cực mạnh với Sanhua sạc Concerto 3s cho Encore hóa thú Cosmos tung hoành.',
    tags: ['Fusion', 'F2P', 'Easy Play']
  },
  {
    id: 'rover-spectro-f2p',
    name: 'Rover (Spectro) Time Freeze',
    core: 'rover_spectro',
    members: ['rover_spectro', 'yangyang', 'baizhi'],
    type: 'Starter Friendly',
    description: 'Đội hình khởi đầu hoàn hảo với hiệu ứng khống chế ngưng đọng thời gian và Yangyang nạp năng lượng liên tục.',
    tags: ['Spectro', 'F2P Starter', 'Crowd Control']
  },
  {
    id: 'lumi-yinlin-logistics',
    name: 'Lumi Express Delivery',
    core: 'lumi',
    members: ['lumi', 'yinlin', 'verina'],
    type: 'Electro Burst',
    description: 'Yinlin hỗ trợ sát thương phụ trợ ngoài sân để Lumi liên tục xả những kiện hàng lôi điện nặng ký.',
    tags: ['Electro', 'Fun']
  },
  {
    id: 'buling-electro-support',
    name: 'Xiangli Yao & Buling Resonator',
    core: 'xiangli_yao',
    members: ['xiangli_yao', 'buling', 'shorekeeper'],
    type: 'Hypercarry Sustain',
    description: 'Buling đảm bảo hồi máu và cung cấp 15% Electro Deepen vững chắc cho Xiangli Yao thoải mái dồn sát thương.',
    tags: ['Electro', 'Sustain']
  },
  {
    id: 'youhu-jinhsi-luck',
    name: 'Jinhsi & Youhu Antique Fortune',
    core: 'jinhsi',
    members: ['jinhsi', 'youhu', 'shorekeeper'],
    type: 'Hypercarry',
    description: 'Youhu vừa đảm nhận vai trò hồi phục vừa buff 100% Coordinated Attack DMG cho đòn rồng của Jinhsi.',
    tags: ['Spectro', 'Healer Buffer']
  },
  {
    id: 'chixia-mortefi-gunslinger',
    name: 'Dual Gunslingers: Chixia & Mortefi',
    core: 'chixia',
    members: ['chixia', 'mortefi', 'baizhi'],
    type: 'Fun Machine Gun',
    description: 'Cặp đôi xạ thủ súng lục bắn rực lửa toàn sàn đấu, kết hợp rồng lửa của Mortefi với đạn Boom Boom của Chixia.',
    tags: ['Fusion', 'Pistols', 'Fun']
  }
];

export const ELEMENT_ICONS = {
  Spectro: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/spectro.png',
  Havoc: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/havoc.png',
  Fusion: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/fusion.png',
  Aero: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/aero.png',
  Electro: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/electro.png',
  Glacio: 'https://whisperingsea.github.io/wuthering-waves-assets/images/icons_ele/glacio.png'
};
