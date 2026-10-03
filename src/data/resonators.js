// =========================================================================================
// DATABASE CÁC NHÂN VẬT WUTHERING WAVES (TOÀN BỘ 59 RESONATORS ĐẦY ĐỦ CHÍNH THỨC)
// Tuyệt đối chuẩn xác: 59 Resonators (5-Star Limited, 5-Star Standard, Rovers, 4-Star)
// Đầy đủ thông tin: Vũ khí, Hệ, Sonata Echo, Chỉ số chính, Outro Skill & Rotation Game8 chi tiết
// =========================================================================================

export const RESONATORS = [

  {
    "id": "hsin",
    "name": "Hsin",
    "title": "The Moon Fox / Mengzhou Sentinel",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Sát Thương Lôi Định",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Hsin.webp",
    "iconColor": "#a855f7",
    "tags": [
      "Electro",
      "Main DPS",
      "Unison",
      "Rectifier",
      "Sentinel"
    ],
    "bestWeapon": "Blooming Jadehaven",
    "bestEchoSet": "5-pc Heart of Sworn Vigil",
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích (Thundering Mephis) | 3-Cost: Sát Thương Lôi | 1-Cost: Tấn Công%",
    "outroDescription": "Kích hoạt Phản Hồi Đồng Điệu (Unison Response): Tiêu hao trạng thái Unison để kích hoạt Outro cá nhân và kéo đồng minh vào sân bằng Intro Skill mà không cần tiêu tốn thanh Concerto truyền thống.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Bật Resonance Liberation (R) tạo Stella Field / buff ATK ➔ Dùng E và chuỗi đánh thường tích đầy Concerto ➔ Outro kích hoạt buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Sub-DPS (Xiangli Yao / Yinlin)",
          "action": "Vào sân bằng Intro nhận buff ➔ E ➔ R xả nộ ➔ Outro truyền 20% Electro DMG và 25% Liberation DMG Deepen."
        },
        {
          "step": 3,
          "char": "Hsin",
          "action": "Intro vào sân ➔ Kích hoạt Skill E ở thể Electro Flare ➔ Xả Resonance Liberation R kết liễu ➔ Tấn công thường cường hóa tiêu diệt phần còn lại."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Hsin",
          "action": "Bắt đầu ở trạng thái Unison ➔ Bấm E gây sát thương đợt 1."
        },
        {
          "step": 2,
          "char": "Ally (Changli / Xiangli Yao)",
          "action": "Chuyển sang đồng minh ngay lập tức (Hsin kích hoạt Outro tức thì nhờ Unison) ➔ Đồng minh ra sân tung Intro Skill và 1 đòn E nhanh."
        },
        {
          "step": 3,
          "char": "Hsin",
          "action": "Đổi ngược về Hsin lập tức nhận Unison Boon (cộng dồn buff toàn đội) mà không mất thời gian chờ Concerto."
        }
      ]
    },
    "releaseVersion": "3.7",
    "releaseOrder": 1
  },
  {
    "id": "suoming",
    "name": "Suoming",
    "title": "Sword of Azure Flash",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Khuếch Đại Unison",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Suoming.webp",
    "iconColor": "#8b5cf6",
    "tags": [
      "Electro",
      "Sub-DPS",
      "Buffer",
      "Sword",
      "Unison"
    ],
    "bestWeapon": "Thunder's Horizon",
    "bestEchoSet": "5-pc Void Thunder",
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích (Tempest Mephis) | 3-Cost: Sát Thương Lôi | 1-Cost: Tấn Công%",
    "outroDescription": "Tạo Lôi Vũ Đồng Điệu: 3 đòn đánh kế tiếp của đồng minh vào sân sẽ phát nổ sát thương Lôi diện rộng và nạp 25% thanh Concerto tức thì.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Kích hoạt buff toàn đội và hồi máu qua R ➔ Outro chuyển giao sang Sub-DPS."
        },
        {
          "step": 2,
          "char": "Suoming",
          "action": "Intro vào sân ➔ Kích hoạt Resonance Skill chuyển đổi thế kiếm Azure Surge ➔ Tích nạp Concerto nhanh ➔ Bật Impermanence Heron ➔ Outro truyền Lôi Vũ Đồng Điệu cho Hsin."
        },
        {
          "step": 3,
          "char": "Hsin",
          "action": "Intro vào sân nhận trọn vẹn buff Unison ➔ Kích hoạt Skill E cường hóa ➔ Xả Resonance Liberation R nổ sét màn hình tiêu diệt mục tiêu."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Suoming",
          "action": "Tung đòn kiếm thế 1 ➔ Nhấn E giải phóng lôi kiếm xoay vòng."
        },
        {
          "step": 2,
          "char": "Hsin",
          "action": "Animation cancel sang Hsin nhận Unison ➔ Tung E lôi nộ ➔ Outro chuyển về."
        },
        {
          "step": 3,
          "char": "Suoming",
          "action": "Quay lại sân kích hoạt ngay nộ R kết liễu quái."
        }
      ]
    },
    "releaseVersion": "3.7",
    "releaseOrder": 2
  },
  {
    "id": "lucilla",
    "name": "Lucilla",
    "title": "Frost Maiden of Court",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hộ Thuẫn Băng Giá & Bảo Vệ",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Lucilla.webp",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Sustain",
      "Shielder",
      "Rectifier",
      "Support",
      "Shielder"
    ],
    "bestWeapon": "Variation / Rectifier#25",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: DEF% / HP%",
    "outroDescription": "Màn Băng Hộ Mệnh: Cung cấp khiên chắn bằng 25% Max HP và tăng 20% Glacio DMG cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Lucilla",
          "action": "Tạo khiên băng bảo vệ E ➔ R ➔ Outro."
        },
        {
          "step": 2,
          "char": "Zhezhi / Sanhua",
          "action": "Buff sát thương băng ➔ Outro."
        },
        {
          "step": 3,
          "char": "Carlotta / Hiyuki",
          "action": "Bắn phá tầm xa trong vòng bảo vệ tuyệt đối."
        }
      ]
    },
    "releaseVersion": "3.6",
    "releaseOrder": 3
  },
  {
    "id": "rebecca",
    "name": "Rebecca",
    "title": "Voltaic Overdrive Specialist",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Xạ Thủ Lôi Quá Tải Overdrive",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Rebecca.webp",
    "iconColor": "#a855f7",
    "tags": [
      "Electro",
      "Sub-DPS",
      "Buffer",
      "Pistols",
      "Quickswap",
      "Overdrive"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Quá Tải Điện Trường: Gây hiệu ứng Tê Liệt Electro và tăng 25% Electro DMG Deepen trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Buff toàn diện ➔ Outro."
        },
        {
          "step": 2,
          "char": "Rebecca",
          "action": "Xả băng đạn điện E ➔ R quá tải ➔ Outro."
        },
        {
          "step": 3,
          "char": "Xiangli Yao / Hsin",
          "action": "Dứt điểm mục tiêu với sát thương sét nhân đôi."
        }
      ]
    },
    "releaseVersion": "3.6",
    "releaseOrder": 4
  },
  {
    "id": "lucy",
    "name": "Lucy",
    "title": "Luminous Starlight Archer",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Main DPS / Xạ Thủ Spectro Hack",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Lucy.webp",
    "iconColor": "#facc15",
    "tags": [
      "Spectro",
      "Main DPS",
      "Pistols",
      "Starlight"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Celestial Light",
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích (Jué) | 3-Cost: Sát Thương Spectro | 1-Cost: Tấn Công%",
    "outroDescription": "Đạn Định Hướng Tinh Tú: Đánh dấu điểm yếu kẻ địch, tăng 20% Sát Thương Bạo Kích cho đòn đánh kế tiếp của đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Mornye / Shorekeeper / Baizhi",
          "action": "Tung Skill E và R mở vùng hồi máu và buff công toàn đội ➔ Kích hoạt Bell-Borne / Fallacy ➔ Outro."
        },
        {
          "step": 2,
          "char": "Rebecca / Sanhua / Zhezhi",
          "action": "Intro nhận buff ➔ E ➔ R tích nhanh 100% Concerto ➔ Kích hoạt Impermanence Heron ➔ Outro truyền buff sát thương."
        },
        {
          "step": 3,
          "char": "Lucy",
          "action": "Intro vào sân kích hoạt Starlight Hack ➔ Bắn súng đôi dồn dập đạn năng lượng Spectro ➔ Xả Resonance Liberation pháo sáng quét sạch chiến trường."
        }
      ]
    },
    "releaseVersion": "3.5",
    "releaseOrder": 5
  },
  {
    "id": "qiuyuan",
    "name": "Qiuyuan",
    "title": "Autumn Mist Bladesmith",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Kiếm Sư Cường Hóa Phong Lực",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Qiuyuan.webp",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Sword",
      "Bladesmith"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Thu Phong Trảm: Tăng 25% Aero DMG và 20% Resonance Skill DMG trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Buff Stella Field ➔ Outro."
        },
        {
          "step": 2,
          "char": "Qiuyuan",
          "action": "Skill E chém sương thu ➔ Heron Echo ➔ Outro buff 25% Aero."
        },
        {
          "step": 3,
          "char": "Jiyan / Cartethyia",
          "action": "Vào sân với đầy đủ buff nguyên tố."
        }
      ]
    },
    "releaseVersion": "3.5",
    "releaseOrder": 6
  },
  {
    "id": "lupa",
    "name": "Lupa",
    "title": "The Crimson Wolf of the Wastes",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Lang Vương Đại Kiếm Hỏa Diệm",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Lupa-icon.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Main DPS",
      "Broadblade",
      "Wolf"
    ],
    "bestWeapon": "Verdant Summit / Helios Cleaver",
    "bestEchoSet": "5-pc Molten Rift",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Tiếng Hú Sói Lửa: Khiến toàn đội tăng 20% ATK và 20% Fusion DMG Deepen trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Hồi phục HP và tăng ATK toàn đội ➔ Outro."
        },
        {
          "step": 2,
          "char": "Mortefi / Changli",
          "action": "Buff đòn đánh nặng và Fusion ➔ Outro."
        },
        {
          "step": 3,
          "char": "Lupa",
          "action": "Hóa cuồng nộ đại đao sói lửa càn quét đối thủ."
        }
      ]
    },
    "releaseVersion": "3.4",
    "releaseOrder": 7
  },
  {
    "id": "zani",
    "name": "Zani",
    "title": "Radiant Fist Monk",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Main DPS / Kim Cang Quyền Quang Minh",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Zani_Icon.webp",
    "iconColor": "#facc15",
    "tags": [
      "Spectro",
      "Main DPS",
      "Gauntlets",
      "Monk"
    ],
    "bestWeapon": "Abyss Surges / Marcato",
    "bestEchoSet": "5-pc Celestial Light",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%",
    "outroDescription": "Kim Cang Quyền Pháp: Tăng 20% Spectro DMG và 25% Basic Attack DMG cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Buff ATK và Crit Rate ➔ Outro."
        },
        {
          "step": 2,
          "char": "Sanhua / Lynae",
          "action": "Buff 38% Basic ATK / Spectro Deepen ➔ Outro."
        },
        {
          "step": 3,
          "char": "Zani",
          "action": "Quyền trượng ánh sáng liên hoàn đấm bùng nổ."
        }
      ]
    },
    "releaseVersion": "3.3",
    "releaseOrder": 8
  },
  {
    "id": "galbrena",
    "name": "Galbrena",
    "title": "Solaris Gunslinger of the Sun",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Hỏa Xạ Kích Nhanh & Buffer",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Galbrena.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Sub-DPS",
      "Buffer",
      "Pistols",
      "Burst"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Fusion DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Phát Đạn Mặt Trời: Gây 400% sát thương Fusion và tăng 25% Fusion DMG Deepen cho đồng minh tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Mở Stella Field ➔ Outro."
        },
        {
          "step": 2,
          "char": "Galbrena",
          "action": "Bắn súng lửa song hành E ➔ Heron Echo ➔ Outro buff 25% Fusion."
        },
        {
          "step": 3,
          "char": "Changli / Jingran",
          "action": "Tung đòn trảm rực lửa."
        }
      ]
    },
    "releaseVersion": "3.2",
    "releaseOrder": 9
  },
  {
    "id": "jingran",
    "name": "Jingran",
    "title": "The Blazing Sentinel of Mengzhou",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Hỏa Tiên Phong Vệ Thần",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Jingran-icon-2.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Main DPS",
      "Broadblade",
      "Sentinel"
    ],
    "bestWeapon": "Verdant Summit / Helios Cleaver",
    "bestEchoSet": "5-pc Molten Rift",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Hỏa Trận Trấn Thủ: Kích nổ 500% sát thương Fusion và tăng 25% Heavy ATK & Fusion DMG cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Kích hoạt buff ATK ➔ Outro."
        },
        {
          "step": 2,
          "char": "Changli / Mortefi",
          "action": "Xả Skill E nạp Concerto ➔ Outro truyền buff 20% Fusion."
        },
        {
          "step": 3,
          "char": "Jingran",
          "action": "Đại kiếm lửa giáng đòn kết liễu nổ tung chiến trường."
        }
      ]
    },
    "releaseVersion": "3.1",
    "releaseOrder": 10
  },
  {
    "id": "qingxiao",
    "name": "Qingxiao",
    "title": "Azure Cloud Hermit",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Ẩn Sĩ Phi Kiếm Khí",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Qingxiao-1.webp",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Sword",
      "Quickswap",
      "Hermit"
    ],
    "bestWeapon": "Emerald of Genesis / Blazing Gale",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Thanh Vân Kiếm Ý: Tăng 20% Aero DMG và 20% Resonance Liberation DMG cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Buff Crit và ATK ➔ Outro."
        },
        {
          "step": 2,
          "char": "Qingxiao",
          "action": "Kiếm ý mây xanh E ➔ R chém gió ➔ Outro."
        },
        {
          "step": 3,
          "char": "Jiyan / Cartethyia",
          "action": "Lĩnh hội kiếm ý quét sạch chiến trường."
        }
      ]
    },
    "releaseVersion": "3.1",
    "releaseOrder": 11
  },
  {
    "id": "rover_electro",
    "name": "Rover (Electro)",
    "title": "Arbiter of Thunder",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Lôi Kiếm Liên Hoàn Bão Sét",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Havoc.png",
    "iconColor": "#a855f7",
    "tags": [
      "Electro",
      "Main DPS",
      "Sword",
      "Burst DPS",
      "Rover",
      "Free 5-Star S6"
    ],
    "bestWeapon": "Emerald of Genesis / Blazing Brilliance / Commando Surge",
    "bestEchoSet": "5-pc Void Thunder",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Thundering Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Lôi Minh Trảm: Tung đòn chém sấm sét giáng 380% sát thương Electro và hồi 15 điểm Concerto cho đồng minh kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sustain (Verina / Shorekeeper / Baizhi)",
          "action": "Vào sân trước ➔ Dùng E và R tạo buff All-Type DMG và hồi máu ➔ Bell-Borne Echo ➔ Outro."
        },
        {
          "step": 2,
          "char": "Buffer (Yinlin / Sanhua / Jianxin)",
          "action": "Nhận buff ➔ Xả E và R ➔ Kích hoạt Heron Echo ➔ Outro buff Electro DMG & Resonance Liberation DMG."
        },
        {
          "step": 3,
          "char": "Rover (Electro)",
          "action": "Intro vào sân nhận toàn bộ buff ➔ Kích hoạt Skill E lôi kiếm ➔ Xả Resonance Liberation R nộ sấm sét quét sạch sàn đấu ➔ Trọng kích hoàn tất chuỗi."
        }
      ]
    },
    "releaseVersion": "3.0",
    "releaseOrder": 12
  },
  {
    "id": "buling",
    "name": "Buling",
    "title": "Electro Frequency Specialist",
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Rectifier",
    "role": "Sustain / Trị Liệu Trợ Lực & Buff Lôi",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Buling.webp",
    "iconColor": "#9333ea",
    "tags": [
      "Electro",
      "Sustain",
      "Healer",
      "Rectifier",
      "Electro Buffer"
    ],
    "bestWeapon": "Variation",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: HP%",
    "outroDescription": "Hồi phục tức thời 19% Max HP cho đồng minh vào sân và tăng 15% Electro DMG Deepen trong 20 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Buling",
          "action": "Intro ➔ E phát sóng từ trường lôi hồi máu ➔ R mở màn chắn tần số Electro ➔ Đầy Concerto ➔ Outro buff 15% Electro DMG cho Xiangli Yao / Hsin / Calcharo."
        }
      ]
    },
    "releaseVersion": "2.8",
    "releaseOrder": 13
  },
  {
    "id": "suisui",
    "name": "Suisui",
    "title": "Frostbell Wanderer",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Trị Liệu Hàn Băng & Đóng Băng",
    "avatar": "https://wutheringlab.com/wp-content/uploads/SuiSui.webp",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Sustain",
      "Healer",
      "Rectifier",
      "Freeze"
    ],
    "bestWeapon": "Variation / Cosmic Ripples",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: HP%",
    "outroDescription": "Chuông Băng Hồi Sinh: Hồi phục 20% HP cho đồng minh ra sân và tăng 20% Glacio DMG Deepen trong 15 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Suisui",
          "action": "Dùng E lắc chuông băng ➔ R hồi máu toàn sân ➔ Outro."
        },
        {
          "step": 2,
          "char": "Zhezhi",
          "action": "Intro nhận buff ➔ E tích họa bút ➔ Outro."
        },
        {
          "step": 3,
          "char": "Carlotta / Hiyuki",
          "action": "Xả sát thương băng cực đại."
        }
      ]
    },
    "releaseVersion": "2.8",
    "releaseOrder": 14
  },
  {
    "id": "yangyang_xuanling",
    "name": "Yangyang Xuanling",
    "title": "Awakened Feather of the Void",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Hắc Vũ Trảm Thức Tỉnh",
    "avatar": "https://wutheringlab.com/wp-content/uploads/YangYang-Xuanling.webp",
    "iconColor": "#f43f5e",
    "tags": [
      "Havoc",
      "Main DPS",
      "Sword",
      "Awakened",
      "Xuanling"
    ],
    "bestWeapon": "Emerald of Genesis / Dark Gale",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Dreamless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Hắc Vũ Phá Toái: Tăng 25% Havoc DMG Deepen và hồi 20 Energy năng lượng nộ cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Kích hoạt Stella Field ➔ Outro."
        },
        {
          "step": 2,
          "char": "Sanhua / Danjin",
          "action": "Nạp Concerto siêu nhanh ➔ Outro truyền buff."
        },
        {
          "step": 3,
          "char": "Yangyang Xuanling",
          "action": "Xòe lông vũ bóng tối E ➔ R quét sạch đấu trường."
        }
      ]
    },
    "releaseVersion": "2.8",
    "releaseOrder": 15
  },
  {
    "id": "denia",
    "name": "Denia",
    "title": "Solaris Firework Artificer",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hỏa Ngục Hồi Sinh & Khuếch Đại",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Denia.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Sustain",
      "Healer",
      "Buffer",
      "Rectifier"
    ],
    "bestWeapon": "Variation / Rectifier#25",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Pháo Hoa Trùng Phùng: Hồi máu toàn đội 22% Max HP và tăng 25% Fusion DMG trong 20 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Denia",
          "action": "Intro ➔ Bắn pháo hoa E hồi máu ➔ R mở tiệc ánh lửa ➔ Outro buff 25% Fusion."
        },
        {
          "step": 2,
          "char": "Changli",
          "action": "Nhận buff tung kiếm lửa ➔ Outro."
        },
        {
          "step": 3,
          "char": "Encore / Brant",
          "action": "Xả hỏa lực hủy diệt kẻ địch."
        }
      ]
    },
    "releaseVersion": "2.7",
    "releaseOrder": 16
  },
  {
    "id": "hiyuki",
    "name": "Hiyuki",
    "title": "Frostbloom Swordswoman",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Kiếm Sĩ Băng Giá Sương Giá",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Hiyuki.webp",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Main DPS",
      "Sword",
      "Frostbite"
    ],
    "bestWeapon": "Emerald of Genesis / Winter Needle",
    "bestEchoSet": "5-pc Freezing Frost",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Lampylumen) | 3-Cost: Glacio DMG | 1-Cost: ATK%",
    "outroDescription": "Băng Vũ Vĩnh Cửu: Đóng băng kẻ địch trong 3 giây và tăng 20% Glacio DMG Deepen cho nhân vật tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Heal và buff toàn đội ➔ Outro."
        },
        {
          "step": 2,
          "char": "Zhezhi / Sanhua",
          "action": "Buff Glacio DMG và Basic ATK ➔ Outro."
        },
        {
          "step": 3,
          "char": "Hiyuki",
          "action": "Intro rút kiếm băng ➔ E chém hoa tuyết ➔ R đóng băng dứt điểm."
        }
      ]
    },
    "releaseVersion": "2.7",
    "releaseOrder": 17
  },
  {
    "id": "sigrika",
    "name": "Sigrika",
    "title": "Gale Valkyrie of the Highlands",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Hút Chân Không & Gom Quái Khí Tụ",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Sigrika.webp",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Gauntlets",
      "Crowd Control"
    ],
    "bestWeapon": "Abyss Surges / Stonedge",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hút Gió Gom Quái: Gom toàn bộ quái trong phạm vi 15m vào tâm điểm và tăng 25% Aero DMG Deepen.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Bật Stella Field ➔ Outro."
        },
        {
          "step": 2,
          "char": "Sigrika",
          "action": "E hút gom toàn bộ quái ➔ R lốc xoáy ➔ Heron Echo ➔ Outro."
        },
        {
          "step": 3,
          "char": "Jiyan",
          "action": "Quét sạch toàn bộ kẻ địch đang bị gom lại bằng Thanh Long."
        }
      ]
    },
    "releaseVersion": "2.6",
    "releaseOrder": 18
  },
  {
    "id": "luuk_herssen",
    "name": "Luuk Herssen",
    "title": "The Vanguard Knight of Rinascita",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Đại Kiếm Hàn Băng Bộc Phá",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Luuk-Herssen.png",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Main DPS",
      "Broadblade",
      "Burst Carry"
    ],
    "bestWeapon": "Ages of Harvest / Verdant Summit / Autumntrace",
    "bestEchoSet": "5-pc Freezing Frost",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Lampylumen Myriad) | 3-Cost: Glacio DMG | 1-Cost: ATK%",
    "outroDescription": "Băng Kiếm Trảm: Gây 520% Sát thương Glacio và gia tăng 25% Resonance Liberation DMG cho đồng minh kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sustain (Shorekeeper / Verina / Baizhi)",
          "action": "Vào sân đầu tiên ➔ Dùng Skill E và Liberation R tạo buff All-Type DMG và hồi máu ➔ Outro."
        },
        {
          "step": 2,
          "char": "Buffer (Sanhua / Zhezhi)",
          "action": "Tiếp nhận buff ➔ Dùng E và R xả nộ nạp Concerto ➔ Outro buff 38% Basic ATK hoặc 20% Glacio DMG."
        },
        {
          "step": 3,
          "char": "Luuk Herssen",
          "action": "Intro vào sân nhận toàn bộ buff ➔ Kích hoạt Skill E trảm kích băng giá ➔ Xả Resonance Liberation R quét sạch sàn đấu."
        }
      ]
    },
    "releaseVersion": "2.6",
    "releaseOrder": 19
  },
  {
    "id": "aemeath",
    "name": "Aemeath",
    "title": "Crimson Rose Duelist",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Hỏa Kiếm Thiêu Rụi & Quickswap",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Aemeath.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Sub-DPS",
      "Sword",
      "Quickswap",
      "Burn"
    ],
    "bestWeapon": "Blazing Brilliance / Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Vũ Điệu Hoa Hồng Lửa: Tăng 20% Fusion DMG và 20% Basic ATK Deepen cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Buff ATK ➔ Outro."
        },
        {
          "step": 2,
          "char": "Aemeath",
          "action": "Kiếm vũ hoa hồng E ➔ R xả nộ ➔ Outro."
        },
        {
          "step": 3,
          "char": "Brant / Changli",
          "action": "Khai hỏa chiêu thức kết liễu."
        }
      ]
    },
    "releaseVersion": "2.5",
    "releaseOrder": 20
  },
  {
    "id": "mornye",
    "name": "Mornye",
    "title": "Flameforged Titan",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Sustain / Hồi Phục & Bảo Hộ Đội",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Mornye.webp",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Broadblade",
      "Sustain",
      "Healer",
      "Flameforged"
    ],
    "bestWeapon": "Broadblade#41",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Tăng Lượng Trị Liệu (Bell-Borne Geochelone) | 3-Cost: Hiệu Quả Nạp Năng Lượng% | 1-Cost: HP%",
    "outroDescription": "Bảo Hộ Dung Nham: Hồi phục lượng lớn HP cho toàn đội và tạo lá chắn hấp thụ sát thương tương đương 20% giới hạn HP.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Mornye",
          "action": "Ra sân đầu tiên ➔ Tung Resonance Skill mở màn chắn nhiệt lượng ➔ Kích hoạt Resonance Liberation hồi máu toàn đội ➔ Kích hoạt Bell-Borne Geochelone ➔ Outro chuyển giao."
        },
        {
          "step": 2,
          "char": "Rebecca / Mortefi / Sanhua",
          "action": "Intro nhận buff ➔ E ➔ R tích đầy thanh Concerto ➔ Bật Heron Echo ➔ Outro buff sát thương cho Main DPS."
        },
        {
          "step": 3,
          "char": "Lucy",
          "action": "Intro vào sân nhận trọn vẹn buff ➔ Kích hoạt đạn Spectro dồn dập ➔ Xả Resonance Liberation dứt điểm toàn bộ quái vật."
        }
      ]
    },
    "releaseVersion": "2.5",
    "releaseOrder": 21
  },
  {
    "id": "lynae",
    "name": "Lynae",
    "title": "Solar Flare Gunslinger",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Xạ Thủ Đạn Tinh Tú & Frazzle",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Lynae.webp",
    "iconColor": "#facc15",
    "tags": [
      "Spectro",
      "Sub-DPS",
      "Buffer",
      "Pistols",
      "Frazzle"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Spectro DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Đạn Phân Rã Quang Học: Đòn Outro gây 380% sát thương Spectro và tăng 25% Spectro DMG Deepen cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Heal và buff ATK ➔ Outro."
        },
        {
          "step": 2,
          "char": "Lynae",
          "action": "Intro bắn đôi súng lục ➔ E ➔ Heron Echo ➔ Outro buff 25% Spectro."
        },
        {
          "step": 3,
          "char": "Jinhsi / Phoebe",
          "action": "Vào sân với trọn vẹn buff ánh sáng."
        }
      ]
    },
    "releaseVersion": "2.4",
    "releaseOrder": 22
  },
  {
    "id": "chisa",
    "name": "Chisa",
    "title": "Shadow Cleaver of Solaris",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Cuồng Nộ Hắc Ám Berserker",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Chisa.webp",
    "iconColor": "#f43f5e",
    "tags": [
      "Havoc",
      "Main DPS",
      "Broadblade",
      "Berserker"
    ],
    "bestWeapon": "Verdant Summit / Helios Cleaver",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Dreamless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Vết Cắt Hư Vô: Tăng 25% Heavy Attack DMG và 15% Havoc DMG cho đồng minh trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Buff Stella Field ➔ Outro."
        },
        {
          "step": 2,
          "char": "Danjin / Sanhua",
          "action": "Xả E nạp Concerto ➔ Outro buff sát thương."
        },
        {
          "step": 3,
          "char": "Chisa",
          "action": "Intro vung đại đao chém bóng tối ➔ E nạp Forte ➔ R xả trảm."
        }
      ]
    },
    "releaseVersion": "2.4",
    "releaseOrder": 23
  },
  {
    "id": "iuno",
    "name": "Iuno",
    "title": "Glacial Wind Pugilist",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Quyền Sĩ Bão Tố & Tiếp Nạp",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Iuno.webp",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Gauntlets",
      "Brawler"
    ],
    "bestWeapon": "Abyss Surges / Marcato",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Liên Hoàn Cước Gió: Tăng 20% Aero DMG và 25% Resonance Skill DMG cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Buff hồi máu và thanh Concerto ➔ Outro."
        },
        {
          "step": 2,
          "char": "Iuno",
          "action": "Intro vào sân đấm bốc lốc xoáy ➔ E ➔ Heron Echo ➔ Outro."
        },
        {
          "step": 3,
          "char": "Jiyan / Cartethyia",
          "action": "Intro vào nhận buff ➔ Bật nộ dọn sạch quái."
        }
      ]
    },
    "releaseVersion": "2.3",
    "releaseOrder": 24
  },
  {
    "id": "augusta",
    "name": "Augusta",
    "title": "Vanguard General of Mengzhou",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Tiên Phong Đại Kiếm Lôi",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Augusta-icon.webp",
    "iconColor": "#a855f7",
    "tags": [
      "Electro",
      "Main DPS",
      "Broadblade",
      "Vanguard"
    ],
    "bestWeapon": "Verdant Summit / Lustrous Razor",
    "bestEchoSet": "5-pc Void Thunder",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Thundering Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Cú Trảm Lôi Thần: Giáng đại đao sấm sét gây 520% sát thương Electro và tăng 25% Heavy ATK DMG cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Buff ATK và Crit Rate ➔ Outro."
        },
        {
          "step": 2,
          "char": "Yinlin / Buling",
          "action": "Intro vào sân ➔ E ➔ R triệu hồi lưới sét ➔ Outro truyền 20% Electro & 25% Liberation Deepen."
        },
        {
          "step": 3,
          "char": "Augusta",
          "action": "Intro chém sấm sét ➔ Skill E cường hóa đòn nặng ➔ R xả đại nộ diện rộng."
        }
      ]
    },
    "releaseVersion": "2.3",
    "releaseOrder": 25
  },
  {
    "id": "phrolova",
    "name": "Phrolova",
    "title": "Fractsidus Overseer of Lament",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Khúc Ca Tang Lễ Havoc Decay",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Phrolova-icon.webp",
    "iconColor": "#e11d48",
    "tags": [
      "Havoc",
      "Main DPS",
      "Rectifier",
      "Burst DPS",
      "Decay",
      "Fractsidus"
    ],
    "bestWeapon": "Cosmic Ripples / Stringmaster",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Dreamless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Khởi xướng Khúc Ca Tang Lễ: Gây Havoc Decay làm giảm 15% phòng ngự kẻ địch và tăng 20% Havoc DMG cho đồng minh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Kích hoạt Stella Field / buff ATK ➔ Tích đầy Concerto ➔ Outro."
        },
        {
          "step": 2,
          "char": "Cantarella / Danjin",
          "action": "Intro vào sân ➔ Xả Skill E tăng cường Havoc Deepen ➔ Outro chuyển giao."
        },
        {
          "step": 3,
          "char": "Phrolova",
          "action": "Intro vào sân nhận buff ➔ E kích hoạt ma trận âm thanh hắc ám ➔ R giải phóng thực thể Hủy Diệt."
        }
      ]
    },
    "releaseVersion": "2.2",
    "releaseOrder": 26
  },
  {
    "id": "cartethyia",
    "name": "Cartethyia",
    "title": "The Silent Wind / Black Shores Operative",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Trảm Phong Bão Tố",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Cartethyia-icon.webp",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Main DPS",
      "Sword",
      "Aero Shred",
      "Tier 0"
    ],
    "bestWeapon": "Emerald of Genesis / Blazing Gale",
    "bestEchoSet": "5-pc Sierra Gale",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Phát động Gió Lốc Cắt Xé: Gây 480% sát thương Aero và tăng 25% Aero DMG Deepen cho nhân vật ra sân tiếp theo trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Bật Liberation R buff sát thương toàn đội ➔ Tích 100% Concerto ➔ Outro."
        },
        {
          "step": 2,
          "char": "Ciaccona / Sanhua",
          "action": "Intro vào sân ➔ Dùng E và R kích hoạt buff Aero/Basic Deepen ➔ Outro truyền sang Cartethyia."
        },
        {
          "step": 3,
          "char": "Cartethyia",
          "action": "Intro vào sân ➔ Skill E lướt gió chém liên kích ➔ Bật Liberation R bão xoáy quét sạch quái vật."
        }
      ]
    },
    "releaseVersion": "2.2",
    "releaseOrder": 27
  },
  {
    "id": "rover_aero",
    "name": "Rover (Aero)",
    "title": "Arbiter of Gales",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Lốc Xoáy Hút Quái & Chém Gió",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Sword",
      "Vortex",
      "Wind Slashing"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Feilian) | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Tạo lốc xoáy Aero hút chặt kẻ địch nhỏ vào tâm điểm và gây sát thương kéo dài.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Rover (Aero)",
          "action": "Intro ➔ Tung đòn lướt kiếm gió ➔ R xoáy phong lốc ➔ Gom quái tạo tiền đề cho Main DPS."
        }
      ]
    },
    "releaseVersion": "2.2",
    "releaseOrder": 28
  },
  {
    "id": "ciaccona",
    "name": "Ciaccona",
    "title": "Melody of the Tempest",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Xạ Thủ Bào Mòn Gió & Buffer",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Ciaccona_Icon.webp",
    "iconColor": "#059669",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Pistols",
      "Aero Erosion"
    ],
    "bestWeapon": "Whirlwind Serenade",
    "bestEchoSet": "5-pc Empyrean Anthem",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Gây hiệu ứng Xói Mòn Phong (Aero Erosion): Khiến kẻ địch chịu thêm 23% sát thương Aero Deepen trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Ciaccona",
          "action": "Intro vào sân ➔ Xả băng đạn phong lôi (E) ➔ Bật R gieo rắc giai điệu bão tố ngoài sân ➔ Heron Echo ➔ Outro kích nổ 23% Aero Deepen cho Jiyan."
        }
      ]
    },
    "releaseVersion": "2.1",
    "releaseOrder": 29
  },
  {
    "id": "cantarella",
    "name": "Cantarella",
    "title": "Matriarch of Fisalia",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Nữ Vương Cộng Hưởng Bóng Tối",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Cantarella.webp",
    "iconColor": "#9d174d",
    "tags": [
      "Havoc",
      "Main DPS",
      "Rectifier",
      "Fisalia",
      "Dark Resonance"
    ],
    "bestWeapon": "Echo of the Abyss",
    "bestEchoSet": "5-pc Midnight Veil",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Crownless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Gắn Dấu Ấn Hư Vô lên mục tiêu: Khi đồng minh tấn công mục tiêu sẽ giảm 15% Kháng Havoc của đối thủ trong 15 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Buff toàn diện Crit & ATK."
        },
        {
          "step": 2,
          "char": "Roccia / Danjin",
          "action": "Ra sân tích Concerto nhanh ➔ Outro buff Havoc DMG Deepen."
        },
        {
          "step": 3,
          "char": "Cantarella",
          "action": "Intro vào sân ➔ Khởi động ma trận Fisalia (E) ➔ Đánh thường tầm xa áp đảo ➔ R giải phóng thực thể bóng tối nuốt trọn chiến trường."
        }
      ]
    },
    "releaseVersion": "2.1",
    "releaseOrder": 30
  },
  {
    "id": "roccia",
    "name": "Roccia",
    "title": "First Mate of the Fleet",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Đấu Sĩ Havoc & Trọng Kích Buffer",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Roccia.webp",
    "iconColor": "#be185d",
    "tags": [
      "Havoc",
      "Sub-DPS",
      "Buffer",
      "Gauntlets",
      "Brawler",
      "Rinascita"
    ],
    "bestWeapon": "Obsidian Claws",
    "bestEchoSet": "5-pc Midnight Veil",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Havoc DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Đập mạnh xuống mặt đất gây sát thương Havoc diện rộng và buff 20% Havoc DMG Deepen & 20% Heavy ATK DMG Deepen cho đồng minh vào sân.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Roccia",
          "action": "Intro ➔ Chuỗi đấm bốc cận chiến tích thanh Forte ➔ E kích nổ quyền lực Havoc ➔ R xả sóng xung kích ➔ Heron Echo ➔ Outro chuyển giao cho Cantarella / Camellya."
        }
      ]
    },
    "releaseVersion": "2.0",
    "releaseOrder": 31
  },
  {
    "id": "brant",
    "name": "Brant",
    "title": "Captain of the Fleet",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Đại Kiếm Hỏa Bộc Phá Không Trung",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Brant.webp",
    "iconColor": "#ea580c",
    "tags": [
      "Fusion",
      "Main DPS",
      "Broadblade",
      "Plunge DMG",
      "Rinascita"
    ],
    "bestWeapon": "Blazing Sun Anchor",
    "bestEchoSet": "5-pc Tidebreaking Courage",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Thực hiện cú bổ nhào rực lửa: Tăng 20% Fusion DMG và 25% Resonance Skill DMG Deepen cho đồng minh tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Mở buff ATK và hồi phục toàn đội."
        },
        {
          "step": 2,
          "char": "Changli",
          "action": "Thi triển đòn phượng hoàng tích Concerto ➔ Outro truyền 20% Fusion DMG và 25% Liberation Deepen."
        },
        {
          "step": 3,
          "char": "Brant",
          "action": "Intro vào sân nhận trọn buff Fusion ➔ Kích hoạt Skill E lướt trên không ➔ Nện đòn Plunging lửa long trời lở đất ➔ R kích nổ đại bác mạn thuyền."
        }
      ]
    },
    "releaseVersion": "2.0",
    "releaseOrder": 32
  },
  {
    "id": "phoebe",
    "name": "Phoebe",
    "title": "Blessed Maiden of Rinascita",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Biến Chuyển Hình Thái Spectro",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Phoebe.webp",
    "iconColor": "#facc15",
    "tags": [
      "Spectro",
      "Main DPS",
      "Rectifier",
      "Spectro Frazzle",
      "Dual Form"
    ],
    "bestWeapon": "Luminous Reverie",
    "bestEchoSet": "5-pc Eternal Radiance",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%",
    "outroDescription": "Áp đặt trạng thái Spectro Frazzle lên mục tiêu: Kẻ địch chịu thêm 20% sát thương Spectro và khuếch đại sát thương dứt điểm trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Tạo Stella Field hoặc buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Rover (Spectro) / Yangyang",
          "action": "Hỗ trợ nạp năng lượng và gom quái."
        },
        {
          "step": 3,
          "char": "Phoebe",
          "action": "Intro vào sân ➔ Chuyển thể Xá Tội (Absolution Form) ➔ E phóng chùm tia quang năng ➔ R xả toàn bộ ánh sáng thiêng trừng phạt kẻ địch."
        }
      ]
    },
    "releaseVersion": "2.0",
    "releaseOrder": 33
  },
  {
    "id": "carlotta",
    "name": "Carlotta",
    "title": "Second Daughter of Montelli Family",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Main DPS / Xạ Thủ Shotgun Băng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Carlotta.webp",
    "iconColor": "#0ea5e9",
    "tags": [
      "Glacio",
      "Main DPS",
      "Pistols",
      "Skill DMG",
      "Rinascita",
      "Parry"
    ],
    "bestWeapon": "Cold Whisper / Static Mist",
    "bestEchoSet": "5-pc Frosty Resolve",
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích (Lampylumen Myriad) | 3-Cost: Sát Thương Băng | 1-Cost: Tấn Công%",
    "outroDescription": "Gây sát thương Glacio bằng 480% ATK và tăng 25% Resonance Skill DMG Deepen cho nhân vật vào sân kế tiếp trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Tạo vùng buff ATK và Crit Rate toàn đội."
        },
        {
          "step": 2,
          "char": "Zhezhi / Sanhua",
          "action": "Intro ➔ Bật đòn phối hợp R ➔ Outro buff 25% Skill DMG (Zhezhi) hoặc 38% Basic ATK (Sanhua)."
        },
        {
          "step": 3,
          "char": "Carlotta",
          "action": "Intro vào sân ➔ Biến đổi súng ngắn thành Shotgun hạng nặng ➔ E liên hoàn bắn diện rộng ➔ Đỡ đòn Parry phản kích ➔ R nổ băng xóa sổ kẻ địch."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Carlotta",
          "action": "Tung đòn bắn Shotgun nổ băng đợt 1."
        },
        {
          "step": 2,
          "char": "Zhezhi",
          "action": "Cancel hoạt ảnh giật súng ➔ Chuyển Zhezhi tung E vẽ hạc."
        },
        {
          "step": 3,
          "char": "Carlotta",
          "action": "Đổi lại Carlotta kích nổ Resonance Liberation ngay tầm gần."
        }
      ]
    },
    "releaseVersion": "2.0",
    "releaseOrder": 34
  },
  {
    "id": "lumi",
    "name": "Lumi",
    "title": "Lollo Logistics Navigator",
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Broadblade",
    "role": "Sub-DPS / Giao Hàng Siêu Tốc & Bộc Phá Lôi",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lumi.webp",
    "iconColor": "#7c3aed",
    "tags": [
      "Electro",
      "Sub-DPS",
      "Broadblade",
      "Lollo Logistics",
      "Electro Burst"
    ],
    "bestWeapon": "Autumntrace / Broadblade#41",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Ném gói hàng sấm sét gây 320% sát thương Electro và tăng 15% Electro DMG & 15% Basic ATK Deepen cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Lumi",
          "action": "Intro vào sân ➔ Nhấn Skill E vận chuyển năng lượng Lollo ➔ Tích đầy thanh Lollo Delivery ➔ Bật Liberation R nổ thùng hàng lôi điện ➔ Outro chuyển giao."
        }
      ]
    },
    "releaseVersion": "1.4",
    "releaseOrder": 35
  },
  {
    "id": "camellya",
    "name": "Camellya",
    "title": "Bloom of Bloom",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Sát Thương Đánh Thường Havoc",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Camellya.webp",
    "iconColor": "#ec4899",
    "tags": [
      "Havoc",
      "Main DPS",
      "Basic ATK",
      "Sword",
      "Black Shores"
    ],
    "bestWeapon": "Red Spring",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Dreamless / Crownless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Tạo vụ nổ Cánh Hoa Hỗn Loạn gây sát thương Havoc diện rộng bằng 459% ATK cho kẻ địch xung quanh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Intro ➔ E ➔ R ➔ Mid-air combo tích Concerto ➔ Bell-Borne Echo ➔ Outro buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Sanhua",
          "action": "Intro nhận buff ➔ E ➔ R ➔ Căn thanh Forte nổ băng (Detonate) ➔ Outro truyền 38% Basic ATK DMG Deepen."
        },
        {
          "step": 3,
          "char": "Camellya",
          "action": "Intro vào sân nhận 38% buff Basic ATK ➔ Kích hoạt Ephemeral Stance ➔ Giữ chuột đánh thường xả chuỗi roi gai Havoc điên cuồng ➔ Resonance Liberation R nổ kết liễu."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Camellya",
          "action": "Kích hoạt Ephemeral Stance ➔ Dùng E trói mục tiêu."
        },
        {
          "step": 2,
          "char": "Sanhua",
          "action": "Animation cancel lúc Camellya bay lên ➔ Sanhua vào sân tung E + R nổ băng trong 2 giây."
        },
        {
          "step": 3,
          "char": "Camellya",
          "action": "Đổi ngược về Camellya để tiếp tục chuỗi quạt roi gai trọn vẹn buff."
        }
      ]
    },
    "releaseVersion": "1.4",
    "releaseOrder": 36
  },
  {
    "id": "youhu",
    "name": "Youhu",
    "title": "Antique Appraiser",
    "element": "Glacio",
    "rarity": 4,
    "weaponType": "Gauntlets",
    "role": "Sustain / Thẩm Định Đồ Cổ & Hồi Máu Toàn Năng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Youhu.png",
    "iconColor": "#0284c7",
    "tags": [
      "Glacio",
      "Sustain",
      "Healer",
      "Gauntlets",
      "Coordinated Buffer",
      "Rinascita"
    ],
    "bestWeapon": "Abyss Surges / Marcato",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hồi phục HP và kích hoạt Thi Khúc Cổ: Tăng 100% Sát Thương Đòn Tấn Công Phối Hợp (Coordinated Attack DMG Deepen) cho đồng minh trong 20 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Youhu",
          "action": "Intro vào sân ➔ E giám định cổ vật (Rút bùa Thỏi Vàng/Bình Gốm) ➔ Heavy Attack ném rương hồi máu toàn đội ➔ R nổ cổ vật ➔ Outro buff 100% Coordinated Attack cho Zhezhi / Yinlin / Mortefi."
        }
      ]
    },
    "releaseVersion": "1.3",
    "releaseOrder": 37
  },
  {
    "id": "shorekeeper",
    "name": "The Shorekeeper",
    "title": "Guardian of the Black Shores",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hồi Máu & Siêu Buff Toàn Năng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Shorekeeper.png",
    "iconColor": "#38bdf8",
    "tags": [
      "Spectro",
      "Sustain",
      "Healer",
      "Crit Buffer",
      "Rectifier",
      "Tier 0 Support"
    ],
    "bestWeapon": "Stellar Symphony",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Tăng Lượng Trị Liệu hoặc HP% (Fallacy of No Return) | 3-Cost: Hiệu Quả Nạp Năng Lượng% | 1-Cost: HP%",
    "outroDescription": "Nâng cấp Stella Field lên Giai Đoạn 3: Tăng 12.5% Tỷ Lệ Bạo Kích và 25% Sát Thương Bạo Kích cho toàn đội trong 30 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper",
          "action": "Ra sân đầu trận ➔ Dùng E triệu hồi bướm tích Forte ➔ Kích hoạt Resonance Liberation R mở Stella Field ➔ Bấm Fallacy Echo ➔ Đầy Concerto ➔ Outro buff Crit cho đồng đội."
        }
      ]
    },
    "releaseVersion": "1.3",
    "releaseOrder": 38
  },
  {
    "id": "xiangli_yao",
    "name": "Xiangli Yao",
    "title": "Principal Investigator of Huaxu Academy",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Main DPS / Quyền Vương Công Nghệ Lôi",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/XiangliYao.png",
    "iconColor": "#8b5cf6",
    "tags": [
      "Electro",
      "Main DPS",
      "Resonance Liberation",
      "Gauntlets",
      "Huaxu"
    ],
    "bestWeapon": "Verity's Handle",
    "bestEchoSet": "5-pc Void Thunder",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Gây sát thương Electro bằng 237% ATK và đóng băng/làm chậm kẻ địch xung quanh trong 3 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Kích hoạt buff sát thương và Crit toàn đội."
        },
        {
          "step": 2,
          "char": "Yinlin",
          "action": "Đặt hình nộm ➔ R xả nộ ➔ Outro buff 20% Electro DMG & 25% Resonance Liberation DMG Deepen."
        },
        {
          "step": 3,
          "char": "Xiangli Yao",
          "action": "Intro nhận buff khổng lồ ➔ Bật R kích hoạt trạng thái Trực Giác (Intuition) ➔ Bấm liên tiếp Skill E cường hóa (Decaying Cube) ➔ Kết liễu bằng Law of Reduction."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Xiangli Yao",
          "action": "Bấm E giải phóng khối lập phương năng lượng."
        },
        {
          "step": 2,
          "char": "Changli / Yinlin",
          "action": "Hoán đổi ngay khi đòn đấm đang thi triển ➔ Đồng đội ra sân dùng Skill E ngắn."
        },
        {
          "step": 3,
          "char": "Xiangli Yao",
          "action": "Quay lại kích hoạt nộ R với đầy đủ thanh buff."
        }
      ]
    },
    "releaseVersion": "1.2",
    "releaseOrder": 39
  },
  {
    "id": "zhezhi",
    "name": "Zhezhi",
    "title": "Commission Painter",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Bút Họa Phối Hợp & Buff Băng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Zhezhi.png",
    "iconColor": "#06b6d4",
    "tags": [
      "Glacio",
      "Sub-DPS",
      "Buffer",
      "Coordinated ATK",
      "Skill DMG Buffer",
      "Rectifier"
    ],
    "bestWeapon": "Rime-Draped Sprouts",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff 20% Glacio DMG và 25% Resonance Skill DMG Deepen trong 14 giây cho nhân vật tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Zhezhi",
          "action": "Intro ➔ E triệu hồi hạc mực ➔ R xả nộ kích hoạt đòn phối hợp liên kích ngoài sân ➔ Heavy Attack tích đầy Concerto ➔ Heron Echo ➔ Outro truyền 25% Skill DMG Deepen cho Jinhsi hoặc Carlotta."
        }
      ]
    },
    "releaseVersion": "1.2",
    "releaseOrder": 40
  },
  {
    "id": "changli",
    "name": "Changli",
    "title": "Counselor to the Magistrate",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Hỏa Kiếm Bộc Phá & Quickswap",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Changli.png",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Main DPS",
      "Quickswap",
      "Resonance Liberation",
      "Sword"
    ],
    "bestWeapon": "Blazing Brilliance",
    "bestEchoSet": "5-pc Molten Rift",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Buff 20% Fusion DMG và 25% Resonance Liberation DMG Deepen trong 10 giây cho nhân vật tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Chuỗi combo chuẩn bị buff ATK & All-Type DMG."
        },
        {
          "step": 2,
          "char": "Changli",
          "action": "Tích 4 tầng Enflamement ➔ E ➔ Đòn trọng kích Flaming Sacrifice ➔ R xả nộ phượng hoàng ➔ Outro kích hoạt."
        },
        {
          "step": 3,
          "char": "Encore / Chixia",
          "action": "Nhận trọn vẹn 20% Fusion DMG và 25% Liberation DMG ➔ Bật R hóa hình dồn sát thương."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Changli",
          "action": "Tung True Sight: Charge hoặc bấm R nộ phượng hoàng."
        },
        {
          "step": 2,
          "char": "Encore",
          "action": "Animation cancel: Ngay lúc kiếm của Changli vung ra, đổi sang Encore bấm trọng kích Cosmos Rave."
        },
        {
          "step": 3,
          "char": "Changli",
          "action": "Đổi ngược về Changli tiếp tục chuỗi chém kiếm lửa mà không lãng phí 1 giây hoạt ảnh."
        }
      ]
    },
    "releaseVersion": "1.1",
    "releaseOrder": 41
  },
  {
    "id": "jinhsi",
    "name": "Jinhsi",
    "title": "Magistrate of Jinzhou",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Bộc Phá Kỹ Năng Cộng Hưởng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jinhsi.png",
    "iconColor": "#facc15",
    "tags": [
      "Spectro",
      "Main DPS",
      "Resonance Skill DMG",
      "Broadblade",
      "Tier 0 DPS"
    ],
    "bestWeapon": "Ages of Harvest",
    "bestEchoSet": "5-pc Celestial Light",
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích (Jué) | 3-Cost: Sát Thương Spectro | 1-Cost: Tấn Công%",
    "outroDescription": "Giảm thời gian hồi chiêu của các đòn Coordinated Attack (Đòn tấn công phối hợp) từ đồng đội đi 1 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Intro ➔ E ➔ R ➔ Mid-air combo ➔ Outro buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Zhezhi / Yuanwu / Yinlin",
          "action": "Intro ➔ Bật đòn phối hợp Coordinated Attack (Zhezhi R hoặc Yuanwu cắm cột E) ➔ Outro chuyển giao."
        },
        {
          "step": 3,
          "char": "Jinhsi",
          "action": "Intro vào sân (Incarnation) ➔ Hấp thụ tối đa 50 tầng Incandescence từ đòn đánh phối hợp ➔ Đánh thường 4 nhịp ➔ Skill E đợt 1 ➔ Liberation R xả long nộ ➔ Bấm E cường hóa (Illuminous Epiphany) thả rồng nổ hàng triệu sát thương."
        }
      ]
    },
    "releaseVersion": "1.1",
    "releaseOrder": 42
  },
  {
    "id": "rover_havoc",
    "name": "Rover (Havoc)",
    "title": "Arbiter of Darkness",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Bộc Phá Hắc Ám Dark Surge",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Havoc.png",
    "iconColor": "#be123c",
    "tags": [
      "Havoc",
      "Main DPS",
      "Sword",
      "Dark Surge",
      "Free 5-Star S6"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Dreamless) | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Tung đòn chém bóng tối hình chữ X gây 143% sát thương Havoc và kích hoạt nổ Dark Burst.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Buff ATK và All-Type DMG."
        },
        {
          "step": 2,
          "char": "Danjin",
          "action": "Intro ➔ Combo rút máu tăng thanh Forte ➔ E liên hoàn ➔ Outro truyền 23% Havoc DMG Deepen."
        },
        {
          "step": 3,
          "char": "Rover (Havoc)",
          "action": "Intro nhận buff Havoc ➔ Heavy Attack vào trạng thái Dark Surge ➔ Combo kiếm đen cường hóa ➔ R tung lưỡi hái bóng tối nộ khổng lồ ➔ Bấm Dreamless Echo nổ sạch màn hình."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Rover (Havoc)",
          "action": "Bật R tung nộ lưỡi hái ➔ Lập tức bấm Dreamless Echo."
        },
        {
          "step": 2,
          "char": "Danjin",
          "action": "Animation cancel: Ngay lúc Dreamless đang gầm, đổi sang Danjin tung E."
        },
        {
          "step": 3,
          "char": "Rover (Havoc)",
          "action": "Đổi lại Rover tiếp tục đánh thường Dark Surge."
        }
      ]
    },
    "releaseVersion": "1.1",
    "releaseOrder": 43
  },
  {
    "id": "yinlin",
    "name": "Yinlin",
    "title": "Secrecy Officer of Jinzhou",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Đòn Phối Hợp & Khuếch Đại Lôi",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yinlin.png",
    "iconColor": "#9333ea",
    "tags": [
      "Electro",
      "Sub-DPS",
      "Buffer",
      "Coordinated ATK",
      "Rectifier"
    ],
    "bestWeapon": "Stringmaster",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Electro DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff 20% Electro DMG và 25% Resonance Liberation DMG Deepen trong 14 giây cho đồng minh tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Yinlin",
          "action": "Intro vào sân ➔ E đợt 1 ➔ Đánh thường tích Judgment Points ➔ E đợt 2 ➔ R nộ sấm sét ➔ Heavy Attack khắc dấu ấn ngầm Zapstring ➔ Heron Echo ➔ Outro chuyển giao buff."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Yinlin",
          "action": "Bấm R xả nộ tạo lưới điện diện rộng."
        },
        {
          "step": 2,
          "char": "Xiangli Yao / Calcharo",
          "action": "Animation cancel lập tức đổi sang Main DPS lao vào đấm khi lưới điện vẫn đang giật liên tục."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 44
  },
  {
    "id": "jiyan",
    "name": "Jiyan",
    "title": "General of the Midnight Rangers",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Thanh Long Thương Trọng Kích AOE",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jiyan.png",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Main DPS",
      "Heavy ATK",
      "Broadblade",
      "Midnight Rangers",
      "Tier 0 AOE"
    ],
    "bestWeapon": "Verdant Summit",
    "bestEchoSet": "5-pc Sierra Gale",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Feilian Beringal) | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Triệu hồi gió xoáy Qingloong lướt qua kẻ thù gây sát thương Aero liên tục.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "E ➔ R ➔ Mid-air combo ➔ Outro buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Mortefi / Ciaccona",
          "action": "Intro nhận buff ➔ E ➔ R triệu hồi rồng bắn tỉa ➔ Outro kích hoạt 38% Heavy ATK DMG Deepen."
        },
        {
          "step": 3,
          "char": "Jiyan",
          "action": "Intro nhận trọn buff của Mortefi ➔ Bật Resonance Liberation R hóa Thanh Long ➔ Giữ chuột quạt thương sát thương Heavy ATK cuốn phăng toàn bộ quái vật trên sàn đấu."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 45
  },
  {
    "id": "verina",
    "name": "Verina",
    "title": "Botanist of Huaxu Academy",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hồi Phục Sinh Mệnh & Buff Công",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Verina.png",
    "iconColor": "#eab308",
    "tags": [
      "Spectro",
      "Sustain",
      "Healer",
      "Universal Buffer",
      "Rectifier",
      "Tier 0 Support"
    ],
    "bestWeapon": "Variation",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hồi phục HP liên tục cho nhân vật đang xuất trận và buff 15% All-Type DMG Deepen cho toàn đội trong 30 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina",
          "action": "Vào sân ➔ E ➔ R ➔ Nhảy đánh thường trên không Mid-air 3 lần tiêu hao Photosynthesis ➔ Bật Bell-Borne Echo ➔ Kích hoạt Outro buff 15% All-Type DMG cho đồng đội."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 46
  },
  {
    "id": "calcharo",
    "name": "Calcharo",
    "title": "Leader of the Ghost Hounds",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Thức Tỉnh Lôi Thần",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Calcharo.png",
    "iconColor": "#9333ea",
    "tags": [
      "Electro",
      "Main DPS",
      "Broadblade",
      "Resonance Liberation",
      "Ghost Hounds"
    ],
    "bestWeapon": "Verity's Handle / Lustrous Razor",
    "bestEchoSet": "5-pc Void Thunder",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Tempest Mephis) | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Triệu hồi Phantom of the Hound giáng một đòn sấm sét gây sát thương Electro bằng 195.98% + 61.3% ATK.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Thi triển chuỗi buff ATK & sát thương."
        },
        {
          "step": 2,
          "char": "Yinlin / Jianxin",
          "action": "Intro ➔ E ➔ R ➔ Outro buff Electro & Liberation DMG Deepen."
        },
        {
          "step": 3,
          "char": "Calcharo",
          "action": "Intro vào sân ➔ Bật R kích hoạt trạng thái Deathblade Gear ➔ Thực hiện chuỗi 3 đòn Hounds Roar và Death Messenger chém sấm sét hủy diệt."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Calcharo",
          "action": "Dùng E đợt 1 ➔ Đánh thường nhịp 1."
        },
        {
          "step": 2,
          "char": "Yinlin",
          "action": "Animation cancel sang Yinlin xả đòn E tích điểm."
        },
        {
          "step": 3,
          "char": "Calcharo",
          "action": "Đổi về Calcharo dùng E đợt 2 ngay tắp lự mà không bị đứt chuỗi combo."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 47
  },
  {
    "id": "encore",
    "name": "Encore",
    "title": "Consultant of the Black Shores",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Hỏa Lực Ma Pháp Cosmos",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Encore.png",
    "iconColor": "#fb923c",
    "tags": [
      "Fusion",
      "Main DPS",
      "Basic ATK",
      "Quickswap",
      "Rectifier",
      "Black Shores"
    ],
    "bestWeapon": "Stringmaster / Augment",
    "bestEchoSet": "5-pc Molten Rift",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Triệu hồi trường lửa Cosmos thiêu đốt kẻ địch xung quanh, gây 176.76% sát thương Fusion mỗi giây trong 6 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Shorekeeper",
          "action": "Buff ATK và All-Type DMG."
        },
        {
          "step": 2,
          "char": "Sanhua",
          "action": "E ➔ R ➔ Detonate nổ băng trong 3s ➔ Outro buff 38% Basic ATK."
        },
        {
          "step": 3,
          "char": "Encore",
          "action": "Intro ➔ Bật R hóa hình cuồng nộ Cosmos Rave ➔ Đánh thường dồn dập ➔ Heavy Attack nổ vụ nổ cừu Cosmos."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Encore",
          "action": "Bắt đầu bấm giữ Heavy Attack tụ lực nổ Cosmos Rave."
        },
        {
          "step": 2,
          "char": "Changli",
          "action": "Ngay khi Encore bắt đầu tụ lực, lập tức đổi sang Changli vung kiếm E (Encore vẫn đứng sân tự nổ độc lập)."
        },
        {
          "step": 3,
          "char": "Encore",
          "action": "Đổi lại Encore sau khi Changli hoàn tất đòn chém."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 48
  },
  {
    "id": "jianxin",
    "name": "Jianxin",
    "title": "Taoist Monk of Fengyidu",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sustain / Khiên Khí Công & Hóa Giải Đòn",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Jianxin.png",
    "iconColor": "#14b8a6",
    "tags": [
      "Aero",
      "Sustain",
      "Shielder",
      "Shield",
      "Parry",
      "Liberation Buffer",
      "Gauntlets"
    ],
    "bestWeapon": "Abyss Surges / Marcato",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Crit Rate / ATK (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Resonance Liberation DMG Deepen trong 14 giây cho nhân vật tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Jianxin",
          "action": "Vào sân ➔ E phản đòn đỡ chiêu (Parry) ➔ R gom toàn bộ quái vật vào tâm xoáy thái cực ➔ Giữ chuột tụ khí Chi Spiral tạo khiên siêu dày ➔ Outro truyền 38% Liberation Deepen cho Calcharo / Xiangli Yao / Rover."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 49
  },
  {
    "id": "lingyang",
    "name": "Lingyang",
    "title": "Liondance Troupe Performer",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Main DPS / Vũ Điệu Múa Lân Băng",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Lingyang.png",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Main DPS",
      "Gauntlets",
      "Aerial Combat",
      "Basic ATK"
    ],
    "bestWeapon": "Abyss Surges",
    "bestEchoSet": "5-pc Freezing Frost",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Lampylumen Myriad) | 3-Cost: Glacio DMG | 1-Cost: ATK%",
    "outroDescription": "Giải phóng cú vồ sư tử gây sát thương Glacio bằng 587% ATK cho kẻ địch xung quanh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Baizhi",
          "action": "Chuẩn bị buff ATK & hồi phục HP."
        },
        {
          "step": 2,
          "char": "Sanhua",
          "action": "E ➔ R ➔ Detonate nổ băng ➔ Outro truyền 38% Basic ATK DMG Deepen."
        },
        {
          "step": 3,
          "char": "Lingyang",
          "action": "Intro vào sân ➔ Bật R kích hoạt trạng thái Suan'ni múa lân ➔ Nhảy lên không trung liên hoàn cào vuốt băng xé toạc mục tiêu."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 50
  },
  {
    "id": "sanhua",
    "name": "Sanhua",
    "title": "Guard of Jinzhou",
    "element": "Glacio",
    "rarity": 4,
    "weaponType": "Sword",
    "role": "Sub-DPS / Siêu Nạp Concerto & Buff Đánh Thường",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Sanhua.png",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Sub-DPS",
      "Buffer",
      "Basic ATK Buffer",
      "Fast Concerto",
      "Sword",
      "Top Tier 4-Star"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Sát Thương Đánh Thường (Basic Attack DMG Deepen) trong 14 giây cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sanhua",
          "action": "Intro vào sân ➔ Skill E tạo khối băng ➔ Nộ R tạo gai tuyết ➔ Nhả chuột đúng vạch xanh thanh Forte (Detonate nổ sạch băng) ➔ Heron Echo ➔ Đầy 100% Concerto chỉ trong 3 giây ➔ Outro ngay cho Camellya / Encore / Lingyang."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 51
  },
  {
    "id": "mortefi",
    "name": "Mortefi",
    "title": "Department of Safety Researcher",
    "element": "Fusion",
    "rarity": 4,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Hỏa Long Phối Hợp & Buff Trọng Kích",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Mortefi.png",
    "iconColor": "#ef4444",
    "tags": [
      "Fusion",
      "Sub-DPS",
      "Buffer",
      "Heavy ATK Buffer",
      "Coordinated ATK",
      "Pistols",
      "Top Tier 4-Star"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Energy Regen / Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Sát Thương Trọng Kích (Heavy Attack DMG Deepen) trong 14 giây cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Mortefi",
          "action": "Intro vào sân ➔ E đợt 1 ➔ Đánh thường tích nộ ➔ E đợt 2 ➔ R kích hoạt Rồng Lửa bắn tỉa cùng đòn đánh của đồng minh ➔ Heron Echo ➔ Outro truyền 38% Heavy ATK cho Jiyan."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 52
  },
  {
    "id": "danjin",
    "name": "Danjin",
    "title": "Midnight Rangers Scout",
    "element": "Havoc",
    "rarity": 4,
    "weaponType": "Sword",
    "role": "Sub-DPS / Huyết Kiếm Khuếch Đại Havoc",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Danjin.png",
    "iconColor": "#e11d48",
    "tags": [
      "Havoc",
      "Sub-DPS",
      "Buffer",
      "Havoc Buffer",
      "HP Consume",
      "Sword"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
    "outroDescription": "Buff 23% Sát Thương Thuộc Tính Havoc (Havoc DMG Deepen) trong 14 giây cho đồng minh tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Danjin",
          "action": "Intro ➔ Nhấn liên tục Skill E để chém rút máu bản thân nạp Forte Ruby Blossom ➔ Heavy Attack giải phóng máu hồi lại HP ➔ R xả nộ ➔ Outro truyền 23% Havoc Deepen cho Rover Havoc / Camellya."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 53
  },
  {
    "id": "chixia",
    "name": "Chixia",
    "title": "Junior Patroller of Jinzhou",
    "element": "Fusion",
    "rarity": 4,
    "weaponType": "Pistols",
    "role": "Main DPS / Xạ Thủ Hỏa Lực Liên Thanh",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Chixia.png",
    "iconColor": "#f97316",
    "tags": [
      "Fusion",
      "Main DPS",
      "Pistols",
      "Rapid Fire",
      "Patroller"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Molten Rift",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Inferno Rider) | 3-Cost: Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Nã một phát đạn pháo cực đại gây 530% sát thương Fusion diện rộng về phía trước.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Verina / Baizhi",
          "action": "Cung cấp buff ATK."
        },
        {
          "step": 2,
          "char": "Changli",
          "action": "Outro truyền 20% Fusion DMG và 25% Liberation Deepen."
        },
        {
          "step": 3,
          "char": "Chixia",
          "action": "Intro vào sân ➔ Giữ E xả toàn bộ 30 viên đạn Boom Boom sấy nát mục tiêu ➔ R nổ pháo hoa kết thúc chuỗi sát thương."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 54
  },
  {
    "id": "baizhi",
    "name": "Baizhi",
    "title": "Researcher of Huaxu Academy",
    "element": "Glacio",
    "rarity": 4,
    "weaponType": "Rectifier",
    "role": "Sustain / Y Sĩ Băng & Trị Liệu Toàn Đội",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Baizhi.png",
    "iconColor": "#0ea5e9",
    "tags": [
      "Glacio",
      "Sustain",
      "Healer",
      "Rectifier",
      "F2P Friendly"
    ],
    "bestWeapon": "Variation",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus (Bell-Borne) | 3-Cost: Energy Regen | 1-Cost: HP%",
    "outroDescription": "Hồi máu cho đồng minh và rơi ra Lông Vũ Giai Điệu (Euphonia): Khi nhân vật nhặt sẽ nhận 15% All-Type DMG Deepen và 12% ATK trong 6 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Baizhi",
          "action": "Vào sân ➔ E triệu hồi You'tan ➔ Đánh thường tích 4 tầng Concentration ➔ Heavy Attack tiêu hao tầng hồi máu toàn đội ➔ R nộ ➔ Bell-Borne Echo ➔ Outro rơi lông vũ cho Main DPS nhặt."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 55
  },
  {
    "id": "yangyang",
    "name": "Yangyang",
    "title": "Outrider of Midnight Rangers",
    "element": "Aero",
    "rarity": 4,
    "weaponType": "Sword",
    "role": "Sub-DPS / Nạp Năng Lượng & Hút Quái",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yangyang.png",
    "iconColor": "#10b981",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Energy Battery",
      "Sword",
      "Fast Concerto"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hồi phục cực mạnh 4 Resonance Energy mỗi giây trong 5 giây (Tổng cộng 20 Năng Lượng Nộ) cho đồng minh kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Yangyang",
          "action": "Intro vào sân ➔ E ➔ R tạo cơn lốc gom quái cực rộng ➔ Đánh trên không Mid-air ➔ Heron Echo ➔ Outro nạp ngay 20 Năng Lượng R cho nhân vật phụ thuộc nộ."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 56
  },
  {
    "id": "taoqi",
    "name": "Taoqi",
    "title": "Border Guard Officer",
    "element": "Havoc",
    "rarity": 4,
    "weaponType": "Broadblade",
    "role": "Sustain / Đại Kiếm Hộ Thuẫn & Chống Chịu",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Taoqi.png",
    "iconColor": "#ec4899",
    "tags": [
      "Havoc",
      "Sustain",
      "Shielder",
      "Broadblade",
      "Shield",
      "Skill DMG Buffer",
      "DEF Scaler"
    ],
    "bestWeapon": "Dauntless Evernight / Discord",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Bell-Borne | 3-Cost: DEF% / Energy Regen | 1-Cost: DEF%",
    "outroDescription": "Buff cực mạnh 38% Sát Thương Kỹ Năng (Resonance Skill DMG Deepen) trong 14 giây cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Taoqi",
          "action": "Intro ➔ Nhấn giữ E kích hoạt thế phòng ngự Rocksteady Shield (DEF cao) ➔ Phản đòn khi bị tấn công ➔ R xả nộ ➔ Outro truyền 38% Skill DMG Deepen cho Jinhsi / Changli."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 57
  },
  {
    "id": "yuanwu",
    "name": "Yuanwu",
    "title": "Boxing Gym Master",
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Đột Phá Bào Mòn Trụ Lôi & Phối Hợp",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Yuanwu.png",
    "iconColor": "#a855f7",
    "tags": [
      "Electro",
      "Sub-DPS",
      "Buffer",
      "Coordinated ATK",
      "Gauntlets",
      "Vibration Break",
      "Jinhsi Best Friend"
    ],
    "bestWeapon": "Originite: Type IV",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Bell-Borne | 3-Cost: DEF% / Energy Regen | 1-Cost: DEF%",
    "outroDescription": "Gây sát thương Electro phá vỡ thanh Rung Chấn (Vibration Strength) của boss cực nhanh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Yuanwu",
          "action": "Ra sân vỏn vẹn 1 giây ➔ Cắm cột Lôi Trụ (E) ➔ Bấm Bell-Borne Echo ➔ Đổi ngay sang Jinhsi (Cột tự động nổ đòn phối hợp Coordinated ATK mỗi khi Jinhsi tấn công, sạc 50 tầng Incandescence miễn phí)."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 58
  },
  {
    "id": "aalto",
    "name": "Aalto",
    "title": "Information Broker",
    "element": "Aero",
    "rarity": 4,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Cổng Khói Tăng Tốc & Buff Aero",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Aalto.png",
    "iconColor": "#059669",
    "tags": [
      "Aero",
      "Sub-DPS",
      "Buffer",
      "Pistols",
      "Aero Buffer",
      "Taunt Gate"
    ],
    "bestWeapon": "Static Mist",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Heron) | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Tạo Cổng Ranh Giới (Gate of Quandary): Đồng minh đi qua cổng nhận thêm 23% Aero DMG Deepen trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Aalto",
          "action": "Intro ➔ Bật E để lại ảo ảnh sương mù khiêu khích quái ➔ R tạo cánh cổng gió khổng lồ ➔ Bắn xuyên cổng gia tăng tốc độ đạn ➔ Outro buff 23% Aero cho Jiyan."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 59
  },
  {
    "id": "rover_spectro",
    "name": "Rover (Spectro)",
    "title": "Arbiter of Radiance",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Ngưng Đọng Thời Gian & Khống Chế",
    "avatar": "https://whisperingsea.github.io/wuthering-waves-assets/images/icons_character/Rover-Spectro.png",
    "iconColor": "#eab308",
    "tags": [
      "Spectro",
      "Sub-DPS",
      "Buffer",
      "Sword",
      "Time Stop",
      "Free 5-Star S6"
    ],
    "bestWeapon": "Emerald of Genesis",
    "bestEchoSet": "5-pc Moonlit Clouds",
    "echoMainStats": "4-Cost: Crit Rate/DMG (Jué) | 3-Cost: Spectro DMG | 1-Cost: ATK%",
    "outroDescription": "Tạo vùng quang trường ngưng đọng thời gian (Time-Stop) làm bất động mọi kẻ địch trong 3 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Rover (Spectro)",
          "action": "Intro vào sân ➔ E ➔ R tung vòng thời gian ngưng đọng đối thủ ➔ Chuỗi đánh thường tích đầy Diminuendo ➔ Jué Echo ➔ Outro khống chế toàn sân."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 60
  }

];

export const TEAM_TEMPLATES = [
  {
    "id": "hsin-electro-quickswap",
    "name": "Hsin Unison Quickswap (Meta 3.7)",
    "core": "hsin",
    "members": [
      "hsin",
      "xiangli_yao",
      "shorekeeper"
    ],
    "type": "Quickswap / Dual Carry",
    "description": "Tối ưu hóa cơ chế Unison độc bản của Hsin (3.7) luân chuyển liên tục với Xiangli Yao mà không cần chờ nạp đầy Concerto.",
    "tags": [
      "Electro",
      "Unison",
      "Tier 0",
      "v3.7"
    ]
  },
  {
    "id": "suoming-hsin-duo",
    "name": "Hsin & Suoming Dual Sentinels",
    "core": "hsin",
    "members": [
      "hsin",
      "suoming",
      "shorekeeper"
    ],
    "type": "Dual Carry Burst",
    "description": "Bộ đôi Mengzhou Sentinels v3.7 với Hsin đảm nhiệm vai trò Main DPS dồn sát thương Lôi diện rộng và Suoming kích hoạt Unison.",
    "tags": [
      "Electro",
      "Unison",
      "Top Burst"
    ]
  },
  {
    "id": "camellya-hypercarry",
    "name": "Camellya Havoc Storm",
    "core": "camellya",
    "members": [
      "camellya",
      "sanhua",
      "shorekeeper"
    ],
    "type": "Hypercarry",
    "description": "Tận dụng 38% Basic ATK DMG Deepen của Sanhua cùng Stella Field để Camellya đạt ngưỡng sát thương roi gai Havoc cực đại.",
    "tags": [
      "Havoc",
      "Basic ATK",
      "Tier 0 DPS"
    ]
  },
  {
    "id": "carlotta-glacio-shred",
    "name": "Carlotta Shotgun Heavy Artillery",
    "core": "carlotta",
    "members": [
      "carlotta",
      "zhezhi",
      "shorekeeper"
    ],
    "type": "Hypercarry",
    "description": "Zhezhi buff 25% Resonance Skill DMG và Glacio DMG đưa các phát bắn Shotgun của Carlotta lên tầm hủy diệt.",
    "tags": [
      "Glacio",
      "Skill DMG",
      "Shotgun"
    ]
  },
  {
    "id": "carlotta-f2p-sanhua",
    "name": "Carlotta F2P Friendly Frost",
    "core": "carlotta",
    "members": [
      "carlotta",
      "sanhua",
      "baizhi"
    ],
    "type": "F2P Friendly Carry",
    "description": "Đội hình Glacio dễ tiếp cận nhất cho Carlotta với Sanhua nạp Concerto siêu tốc và Baizhi cung cấp hồi máu.",
    "tags": [
      "Glacio",
      "F2P",
      "Fast Rotation"
    ]
  },
  {
    "id": "phoebe-spectro-carry",
    "name": "Phoebe Absolution Radiance",
    "core": "phoebe",
    "members": [
      "phoebe",
      "rover_spectro",
      "shorekeeper"
    ],
    "type": "Hypercarry",
    "description": "Tận dụng hiệu ứng Spectro Frazzle kết hợp Time-Stop của Rover Spectro để Phoebe xả toàn bộ chùm tia sáng thiêng.",
    "tags": [
      "Spectro",
      "Spectro Frazzle"
    ]
  },
  {
    "id": "brant-fusion-plunge",
    "name": "Brant Plunging Inferno",
    "core": "brant",
    "members": [
      "brant",
      "changli",
      "shorekeeper"
    ],
    "type": "Quickswap / Dual Carry",
    "description": "Changli buff 20% Fusion và 25% Liberation biến mỗi cú bổ nhào đại bác của Thuyền Trưởng Brant thành vụ nổ dung nham.",
    "tags": [
      "Fusion",
      "Plunge",
      "Rinascita"
    ]
  },
  {
    "id": "cantarella-roccia-havoc",
    "name": "Cantarella & Roccia Havoc Requiem",
    "core": "cantarella",
    "members": [
      "cantarella",
      "roccia",
      "shorekeeper"
    ],
    "type": "Dual Carry",
    "description": "Roccia buff 20% Havoc & Heavy ATK kết hợp dấu ấn Fisalia của Cantarella làm tan chảy mọi khiên boss.",
    "tags": [
      "Havoc",
      "Rinascita",
      "Sustain"
    ]
  },
  {
    "id": "jiyan-ciaccona-aero",
    "name": "Jiyan & Ciaccona Tempest Tornado",
    "core": "jiyan",
    "members": [
      "jiyan",
      "ciaccona",
      "shorekeeper"
    ],
    "type": "Hypercarry AOE",
    "description": "Ciaccona gieo rắc Aero Erosion tăng 23% sát thương Aero Deepen giúp Thanh Long Jiyan càn quét toàn bộ La Hoàn.",
    "tags": [
      "Aero",
      "Aero Erosion",
      "AOE King"
    ]
  },
  {
    "id": "jinhsi-dragon-nuke",
    "name": "Jinhsi Dragon Bomb (Tier 0)",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "zhezhi",
      "verina"
    ],
    "type": "Burst Hypercarry",
    "description": "Đội hình chuẩn mực số 1 của Jinhsi: Hạc Zhezhi nạp đầy 50 tầng Incandescence và buff 25% Resonance Skill DMG Deepen.",
    "tags": [
      "Spectro",
      "Resonance Skill",
      "Tier 0"
    ]
  },
  {
    "id": "jinhsi-f2p-yuanwu",
    "name": "Jinhsi F2P Fast Stack",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "yuanwu",
      "verina"
    ],
    "type": "F2P Friendly Hypercarry",
    "description": "Yuanwu không cần đầu tư tài nguyên, chỉ cần cắm cột E là Jinhsi có đòn phối hợp Coordinated ATK sạc max stack.",
    "tags": [
      "F2P",
      "Low Investment",
      "High Value"
    ]
  },
  {
    "id": "changli-encore-quickswap",
    "name": "Changli & Encore Fusion Twin",
    "core": "changli",
    "members": [
      "changli",
      "encore",
      "verina"
    ],
    "type": "Quickswap S-Tier",
    "description": "Cặp bài trùng hủy diệt hoạt ảnh (Animation Cancel): Changli và Encore liên tục đổi chỗ nhau khi đối phương đang tụ lực.",
    "tags": [
      "Fusion",
      "Quickswap",
      "High Skill Ceiling"
    ]
  },
  {
    "id": "changli-chixia-burst",
    "name": "Changli & Chixia Gunslinger Duo",
    "core": "changli",
    "members": [
      "changli",
      "chixia",
      "verina"
    ],
    "type": "Quickswap Burst",
    "description": "Chixia nhận trọn 20% Fusion DMG và 25% Liberation Deepen từ Changli để nã 30 viên đạn thiêu đốt mục tiêu.",
    "tags": [
      "Fusion",
      "Fun",
      "High Burst"
    ]
  },
  {
    "id": "xiangli-yinlin-hyper",
    "name": "Xiangli Yao Electro Surge",
    "core": "xiangli_yao",
    "members": [
      "xiangli_yao",
      "yinlin",
      "shorekeeper"
    ],
    "type": "Hypercarry",
    "description": "Yinlin buff 20% Electro + 25% Liberation DMG biến mỗi cú đấm của Viện Trưởng Xiangli Yao thành sát thương hạt nhân.",
    "tags": [
      "Electro",
      "Resonance Liberation",
      "Single Target King"
    ]
  },
  {
    "id": "jiyan-wind-dragon",
    "name": "Jiyan Heavy Whirlwind",
    "core": "jiyan",
    "members": [
      "jiyan",
      "mortefi",
      "verina"
    ],
    "type": "Hypercarry",
    "description": "Đội hình quốc dân của Jiyan: Mortefi cung cấp 38% Heavy ATK DMG Deepen và rồng lửa bắn phụ trợ.",
    "tags": [
      "Aero",
      "Heavy ATK",
      "AOE King"
    ]
  },
  {
    "id": "rover-havoc-danjin",
    "name": "Rover (Havoc) & Danjin Blood Pact",
    "core": "rover_havoc",
    "members": [
      "rover_havoc",
      "danjin",
      "verina"
    ],
    "type": "Hypercarry S-Tier",
    "description": "Danjin buff 23% Havoc DMG Deepen giúp Rover Havoc vung kiếm Dark Surge và ném lưỡi hái Dreamless hủy diệt mọi boss.",
    "tags": [
      "Havoc",
      "F2P Accessible",
      "High DMG"
    ]
  },
  {
    "id": "calcharo-yinlin-classic",
    "name": "Calcharo & Yinlin Classic Thunder",
    "core": "calcharo",
    "members": [
      "calcharo",
      "yinlin",
      "verina"
    ],
    "type": "Hypercarry",
    "description": "Đội hình sấm sét kinh điển: Yinlin buff 20% Electro & 25% Liberation cho trạng thái Deathblade Gear của Calcharo.",
    "tags": [
      "Electro",
      "Classic Meta"
    ]
  },
  {
    "id": "calcharo-jianxin-liberation",
    "name": "Calcharo & Jianxin Safe Liberation",
    "core": "calcharo",
    "members": [
      "calcharo",
      "jianxin",
      "verina"
    ],
    "type": "Safe Hypercarry",
    "description": "Jianxin vừa tạo khiên khổng lồ chống gián đoạn vừa buff 38% Resonance Liberation DMG cho Calcharo chém an toàn.",
    "tags": [
      "Electro",
      "Shield",
      "High Comfort"
    ]
  },
  {
    "id": "lingyang-sanhua-frost",
    "name": "Lingyang Lion Dance Frost",
    "core": "lingyang",
    "members": [
      "lingyang",
      "sanhua",
      "verina"
    ],
    "type": "Hypercarry",
    "description": "Sanhua buff 38% Basic ATK giúp điệu múa lân trên không của Lingyang gây sát thương băng liên tục.",
    "tags": [
      "Glacio",
      "Basic ATK",
      "Aerial"
    ]
  },
  {
    "id": "encore-sanhua-f2p",
    "name": "Encore & Sanhua F2P Blast",
    "core": "encore",
    "members": [
      "encore",
      "sanhua",
      "baizhi"
    ],
    "type": "F2P Friendly",
    "description": "Đội hình F2P cực mạnh với Sanhua sạc Concerto 3s cho Encore hóa thú Cosmos tung hoành.",
    "tags": [
      "Fusion",
      "F2P",
      "Easy Play"
    ]
  },
  {
    "id": "rover-spectro-f2p",
    "name": "Rover (Spectro) Time Freeze",
    "core": "rover_spectro",
    "members": [
      "rover_spectro",
      "yangyang",
      "baizhi"
    ],
    "type": "Starter Friendly",
    "description": "Đội hình khởi đầu hoàn hảo với hiệu ứng khống chế ngưng đọng thời gian và Yangyang nạp năng lượng liên tục.",
    "tags": [
      "Spectro",
      "F2P Starter",
      "Crowd Control"
    ]
  },
  {
    "id": "lumi-yinlin-logistics",
    "name": "Lumi Express Delivery",
    "core": "lumi",
    "members": [
      "lumi",
      "yinlin",
      "verina"
    ],
    "type": "Electro Burst",
    "description": "Yinlin hỗ trợ sát thương phụ trợ ngoài sân để Lumi liên tục xả những kiện hàng lôi điện nặng ký.",
    "tags": [
      "Electro",
      "Fun"
    ]
  },
  {
    "id": "buling-electro-support",
    "name": "Xiangli Yao & Buling Resonator",
    "core": "xiangli_yao",
    "members": [
      "xiangli_yao",
      "yinlin",
      "buling"
    ],
    "type": "Hypercarry Sustain",
    "description": "Buling đảm bảo hồi máu và cung cấp 15% Electro Deepen vững chắc cho Xiangli Yao thoải mái dồn sát thương.",
    "tags": [
      "Electro",
      "Sustain"
    ]
  },
  {
    "id": "youhu-jinhsi-luck",
    "name": "Jinhsi & Youhu Antique Fortune",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "yuanwu",
      "youhu"
    ],
    "type": "Hypercarry",
    "description": "Youhu vừa đảm nhận vai trò hồi phục vừa buff 100% Coordinated Attack DMG cho đòn rồng của Jinhsi.",
    "tags": [
      "Spectro",
      "Healer Buffer"
    ]
  },
  {
    "id": "chixia-mortefi-gunslinger",
    "name": "Dual Gunslingers: Chixia & Mortefi",
    "core": "chixia",
    "members": [
      "chixia",
      "mortefi",
      "baizhi"
    ],
    "type": "Fun Machine Gun",
    "description": "Cặp đôi xạ thủ súng lục bắn rực lửa toàn sàn đấu, kết hợp rồng lửa của Mortefi với đạn Boom Boom của Chixia.",
    "tags": [
      "Fusion",
      "Pistols",
      "Fun"
    ]
  },
  {
    "id": "cartethyia-aero-storm",
    "name": "Cartethyia Tempest Gale (Tier 0)",
    "core": "cartethyia",
    "members": [
      "cartethyia",
      "ciaccona",
      "shorekeeper"
    ],
    "type": "Hypercarry Aero",
    "description": "Ciaccona gieo rắc hiệu ứng Aero Erosion và Shorekeeper buff Crit đưa nhát chém Cartethyia lên đỉnh cao sát thương.",
    "tags": [
      "Aero",
      "Sword",
      "Tier 0"
    ]
  },
  {
    "id": "phrolova-havoc-requiem",
    "name": "Phrolova Lamenting Requiem",
    "core": "phrolova",
    "members": [
      "phrolova",
      "cantarella",
      "shorekeeper"
    ],
    "type": "Burst Havoc",
    "description": "Sự kết hợp giữa hai nữ chúa Havoc: Cantarella khuếch đại sát thương và Phrolova giáng khúc ca tang lễ xóa sổ kẻ địch.",
    "tags": [
      "Havoc",
      "Rectifier",
      "Tier 0"
    ]
  },
  {
    "id": "augusta-thunder-dominion",
    "name": "Augusta Thunder Dominion",
    "core": "augusta",
    "members": [
      "augusta",
      "yinlin",
      "shorekeeper"
    ],
    "type": "Hypercarry Electro",
    "description": "Yinlin kích hoạt đòn đánh phối hợp và buff Electro giúp nhát chém đại đao của Augusta quét sạch mọi boss.",
    "tags": [
      "Electro",
      "Broadblade",
      "Tier 0"
    ]
  },
  {
    "id": "jingran-flame-sentinel",
    "name": "Jingran Blazing Sentinel",
    "core": "jingran",
    "members": [
      "jingran",
      "changli",
      "verina"
    ],
    "type": "Dual Carry Fusion",
    "description": "Changli buff Fusion và Liberation Deepen kết hợp đại kiếm lửa của Tướng Quân Jingran tạo biển lửa hủy diệt.",
    "tags": [
      "Fusion",
      "Broadblade",
      "Tier 0"
    ]
  },
  {
    "id": "rover-electro-hyper",
    "name": "Rover (Electro) Thunder Storm",
    "core": "rover_electro",
    "members": [
      "rover_electro",
      "yinlin",
      "verina"
    ],
    "type": "Hypercarry Electro",
    "description": "Yinlin buff 20% Electro DMG và 25% Liberation Deepen biến các nhát kiếm sấm sét của Rover thành đòn nộ kết liễu uy lực.",
    "tags": [
      "Electro",
      "Sword",
      "Hypercarry"
    ]
  },
  {
    "id": "lucy-rebecca-mornye",
    "name": "Lucy & Rebecca Cyber Starlight",
    "core": "lucy",
    "members": [
      "lucy",
      "rebecca",
      "mornye"
    ],
    "type": "Hypercarry",
    "tier": "T0",
    "description": "Đội hình Lucy dồn hỏa lực Spectro cực đại với hiệu ứng Overdrive của Rebecca và lá chắn nhiệt lượng từ Mornye.",
    "tags": [
      "Spectro",
      "Hypercarry",
      "Collab"
    ]
  },
  {
    "id": "zani-radiant-impact",
    "name": "Zani Radiant Impact",
    "core": "zani",
    "members": [
      "zani",
      "phoebe",
      "shorekeeper"
    ],
    "type": "Hypercarry Spectro",
    "description": "Phoebe khuếch đại Spectro Frazzle hỗ trợ quyền pháp chớp nhoáng của Zani đấm vỡ giáp boss.",
    "tags": [
      "Spectro",
      "Gauntlets",
      "Tier 0"
    ]
  }
];

export const ELEMENT_ICONS = {
  'Spectro': '/elements/Spectro.png',
  'Havoc': '/elements/Havoc.png',
  'Aero': '/elements/Aero.png',
  'Electro': '/elements/Electro.png',
  'Fusion': '/elements/Fusion.png',
  'Glacio': '/elements/Glacio.png'
};

export const ELEMENT_ICONS_FALLBACK = {
  'Spectro': 'https://static.wikia.nocookie.net/wutheringwaves/images/9/92/Attribute_Spectro_Icon.png',
  'Havoc': 'https://static.wikia.nocookie.net/wutheringwaves/images/3/3d/Attribute_Havoc_Icon.png',
  'Aero': 'https://static.wikia.nocookie.net/wutheringwaves/images/9/99/Attribute_Aero_Icon.png',
  'Electro': 'https://static.wikia.nocookie.net/wutheringwaves/images/0/00/Attribute_Electro_Icon.png',
  'Fusion': 'https://static.wikia.nocookie.net/wutheringwaves/images/c/cb/Attribute_Fusion_Icon.png',
  'Glacio': 'https://static.wikia.nocookie.net/wutheringwaves/images/d/da/Attribute_Glacio_Icon.png'
};
