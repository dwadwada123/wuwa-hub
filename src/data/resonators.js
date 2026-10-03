// Wuthering Waves Resonators & Meta Database
// Updated to Version 3.7 • 60 Resonators

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
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích | 3-Cost: Sát Thương Lôi | 1-Cost: Tấn Công%",
    "outroDescription": "Kích hoạt Phản Hồi Đồng Điệu: Tiêu hao trạng thái Unison để kích hoạt Outro cá nhân và kéo đồng minh vào sân bằng Intro Skill mà không cần tiêu tốn thanh Concerto truyền thống.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Shorekeeper / Verina",
          "action": "Bật Resonance Liberation R tạo Stella Field và buff ATK ➔ Dùng E và chuỗi đánh thường tích đầy Concerto ➔ Outro kích hoạt buff All-Type DMG."
        },
        {
          "step": 2,
          "char": "Sub-DPS: Xiangli Yao, Yinlin",
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
          "char": "Đồng minh: Changli, Xiangli Yao",
          "action": "Chuyển sang đồng minh ngay lập tức khi Hsin kích hoạt Outro tức thì nhờ Unison ➔ Đồng minh ra sân tung Intro Skill và 1 đòn E nhanh."
        },
        {
          "step": 3,
          "char": "Hsin",
          "action": "Đổi ngược về Hsin lập tức nhận Unison Boon cộng dồn buff toàn đội mà không mất thời gian chờ Concerto."
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
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích | 3-Cost: Sát Thương Lôi | 1-Cost: Tấn Công%",
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
    "id": "qingxiao",
    "name": "Qingxiao",
    "title": "Azure Cloud Hermit",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Phi Kiếm Phong Lực",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.6",
    "releaseOrder": 3
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.6",
    "releaseOrder": 4
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.5",
    "releaseOrder": 5
  },
  {
    "id": "suisui",
    "name": "Suisui",
    "title": "Frostbell Wanderer",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Trị Liệu Hàn Băng",
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
    "releaseVersion": "3.5",
    "releaseOrder": 6
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
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích | 3-Cost: Sát Thương Spectro | 1-Cost: Tấn Công%",
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
    "releaseVersion": "3.4",
    "releaseOrder": 7
  },
  {
    "id": "rebecca",
    "name": "Rebecca",
    "title": "Voltaic Overdrive Specialist",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Xạ Thủ Lôi Quá Tải",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.4",
    "releaseOrder": 8
  },
  {
    "id": "lucilla",
    "name": "Lucilla",
    "title": "Frost Maiden of Court",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Đại Kiếm Băng Trảm Sương",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Lucilla.webp",
    "iconColor": "#38bdf8",
    "tags": [
      "Glacio",
      "Broadblade",
      "Main DPS",
      "Burst Carry"
    ],
    "bestWeapon": "Variation / Rectifier#25",
    "bestEchoSet": "5-pc Rejuvenating Glow",
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: DEF% / HP%",
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
    "releaseVersion": "3.4",
    "releaseOrder": 9
  },
  {
    "id": "hiyuki",
    "name": "Hiyuki",
    "title": "Frostbloom Swordswoman",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Kiếm Sĩ Hàn Băng Sương Giá",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Glacio DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.3",
    "releaseOrder": 10
  },
  {
    "id": "denia",
    "name": "Denia",
    "title": "Solaris Firework Artificer",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hỏa Ngục Hồi Sinh",
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
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: ATK%",
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
    "releaseVersion": "3.3",
    "releaseOrder": 11
  },
  {
    "id": "sigrika",
    "name": "Sigrika",
    "title": "Gale Valkyrie of the Highlands",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Main DPS / Hút Chân Không Bão Tố",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseVersion": "3.2",
    "releaseOrder": 12
  },
  {
    "id": "aemeath",
    "name": "Aemeath",
    "title": "Crimson Rose Duelist",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Hỏa Kiếm Thiêu Rụi",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "releaseVersion": "3.1",
    "releaseOrder": 13
  },
  {
    "id": "luuk_herssen",
    "name": "Luuk Herssen",
    "title": "The Vanguard Knight of Rinascita",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Đại Kiếm Hàn Băng Tiên Phong",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Glacio DMG | 1-Cost: ATK%",
    "outroDescription": "Băng Kiếm Trảm: Gây 520% Sát thương Glacio và gia tăng 25% Resonance Liberation DMG cho đồng minh kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sustain: Shorekeeper, Verina, Baizhi",
          "action": "Vào sân đầu tiên ➔ Dùng Skill E và Liberation R tạo buff All-Type DMG và hồi máu ➔ Outro."
        },
        {
          "step": 2,
          "char": "Buffer: Sanhua, Zhezhi",
          "action": "Tiếp nhận buff ➔ Dùng E và R xả nộ nạp Concerto ➔ Outro buff 38% Basic ATK hoặc 20% Glacio DMG."
        },
        {
          "step": 3,
          "char": "Luuk Herssen",
          "action": "Intro vào sân nhận toàn bộ buff ➔ Kích hoạt Skill E trảm kích băng giá ➔ Xả Resonance Liberation R quét sạch sàn đấu."
        }
      ]
    },
    "releaseVersion": "3.1",
    "releaseOrder": 14
  },
  {
    "id": "rover_electro",
    "name": "Rover Electro",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
    "outroDescription": "Lôi Minh Trảm: Tung đòn chém sấm sét giáng 380% sát thương Electro và hồi 15 điểm Concerto cho đồng minh kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sustain: Verina, Shorekeeper, Baizhi",
          "action": "Vào sân trước ➔ Dùng E và R tạo buff All-Type DMG và hồi máu ➔ Bell-Borne Echo ➔ Outro."
        },
        {
          "step": 2,
          "char": "Buffer: Yinlin, Sanhua, Jianxin",
          "action": "Nhận buff ➔ Xả E và R ➔ Kích hoạt Heron Echo ➔ Outro buff Electro DMG & Resonance Liberation DMG."
        },
        {
          "step": 3,
          "char": "Rover Electro",
          "action": "Intro vào sân nhận toàn bộ buff ➔ Kích hoạt Skill E lôi kiếm ➔ Xả Resonance Liberation R nộ sấm sét quét sạch sàn đấu ➔ Trọng kích hoàn tất chuỗi."
        }
      ]
    },
    "releaseVersion": "3.0",
    "releaseOrder": 15
  },
  {
    "id": "lynae",
    "name": "Lynae",
    "title": "Solar Flare Gunslinger",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Xạ Thủ Tinh Tú Quang Minh",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Spectro DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseVersion": "3.0",
    "releaseOrder": 16
  },
  {
    "id": "mornye",
    "name": "Mornye",
    "title": "Flameforged Titan",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Sub-DPS / Hỏa Nham Hỗ Trợ Đội",
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
    "echoMainStats": "4-Cost: Tăng Lượng Trị Liệu | 3-Cost: Hiệu Quả Nạp Năng Lượng% | 1-Cost: HP%",
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
    "releaseVersion": "3.0",
    "releaseOrder": 17
  },
  {
    "id": "chisa",
    "name": "Chisa",
    "title": "Shadow Cleaver of Solaris",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Sustain / Hộ Vệ Trị Liệu & Buff Havoc",
    "avatar": "https://wutheringlab.com/wp-content/uploads/Chisa.webp",
    "iconColor": "#f43f5e",
    "tags": [
      "Havoc",
      "Rectifier",
      "Support",
      "Sustain",
      "Buffer"
    ],
    "bestWeapon": "Verdant Summit / Helios Cleaver",
    "bestEchoSet": "5-pc Sun-sinking Eclipse",
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.8",
    "releaseOrder": 18
  },
  {
    "id": "buling",
    "name": "Buling",
    "title": "Electro Frequency Specialist",
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Rectifier",
    "role": "Sustain / Trị Liệu Trợ Lực Lôi",
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
    "releaseOrder": 19
  },
  {
    "id": "galbrena",
    "name": "Galbrena",
    "title": "Solaris Gunslinger of the Sun",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Main DPS / Hỏa Quyền Xạ Kích",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseVersion": "2.7",
    "releaseOrder": 20
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseVersion": "2.7",
    "releaseOrder": 21
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.6",
    "releaseOrder": 22
  },
  {
    "id": "iuno",
    "name": "Iuno",
    "title": "Glacial Wind Pugilist",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Quyền Sĩ Bão Tố",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.6",
    "releaseOrder": 23
  },
  {
    "id": "phrolova",
    "name": "Phrolova",
    "title": "Fractsidus Overseer of Lament",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Main DPS / Khúc Ca Tang Lễ Havoc",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.5",
    "releaseOrder": 24
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.4",
    "releaseOrder": 25
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.3",
    "releaseOrder": 26
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Spectro DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.3",
    "releaseOrder": 27
  },
  {
    "id": "ciaccona",
    "name": "Ciaccona",
    "title": "Melody of the Tempest",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Pistols",
    "role": "Sub-DPS / Giai Điệu Bào Mòn Gió",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Gây hiệu ứng Xói Mòn Phong: Khiến kẻ địch chịu thêm 23% sát thương Aero Deepen trong 14 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Ciaccona",
          "action": "Intro vào sân ➔ Xả băng đạn phong lôi E ➔ Bật R gieo rắc giai điệu bão tố ngoài sân ➔ Heron Echo ➔ Outro kích nổ 23% Aero Deepen cho Jiyan."
        }
      ]
    },
    "releaseVersion": "2.3",
    "releaseOrder": 28
  },
  {
    "id": "cantarella",
    "name": "Cantarella",
    "title": "Matriarch of Fisalia",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Khúc Ca Biển Đen Havoc",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
          "action": "Intro vào sân ➔ Khởi động ma trận Fisalia E ➔ Đánh thường tầm xa áp đảo ➔ R giải phóng thực thể bóng tối nuốt trọn chiến trường."
        }
      ]
    },
    "releaseVersion": "2.2",
    "releaseOrder": 29
  },
  {
    "id": "rover_aero",
    "name": "Rover Aero",
    "title": "Arbiter of Gales",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Sub-DPS / Lốc Xoáy Chém Gió",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG | 1-Cost: ATK%",
    "outroDescription": "Tạo lốc xoáy Aero hút chặt kẻ địch nhỏ vào tâm điểm và gây sát thương kéo dài.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Rover Aero",
          "action": "Intro ➔ Tung đòn lướt kiếm gió ➔ R xoáy phong lốc ➔ Gom quái tạo tiền đề cho Main DPS."
        }
      ]
    },
    "releaseVersion": "2.2",
    "releaseOrder": 30
  },
  {
    "id": "phoebe",
    "name": "Phoebe",
    "title": "Blessed Maiden of Rinascita",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Biến Chuyển Hình Thái Spectro",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Spectro DMG | 1-Cost: ATK%",
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
          "char": "Rover Spectro / Yangyang",
          "action": "Hỗ trợ nạp năng lượng và gom quái."
        },
        {
          "step": 3,
          "char": "Phoebe",
          "action": "Intro vào sân ➔ Chuyển thể Xá Tội ➔ E phóng chùm tia quang năng ➔ R xả toàn bộ ánh sáng thiêng trừng phạt kẻ địch."
        }
      ]
    },
    "releaseVersion": "2.1",
    "releaseOrder": 31
  },
  {
    "id": "brant",
    "name": "Brant",
    "title": "Captain of the Fleet",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Sub-DPS / Đại Kiếm Hỏa Bộc Phá",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "releaseVersion": "2.1",
    "releaseOrder": 32
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
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích | 3-Cost: Sát Thương Băng | 1-Cost: Tấn Công%",
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
          "action": "Intro ➔ Bật đòn phối hợp R ➔ Outro buff 25% Skill DMG cho Zhezhi hoặc 38% Basic ATK cho Sanhua."
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
    "releaseOrder": 33
  },
  {
    "id": "roccia",
    "name": "Roccia",
    "title": "First Mate of the Fleet",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Gauntlets",
    "role": "Sub-DPS / Đấu Sĩ Rối Bóng Havoc",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseOrder": 34
  },
  {
    "id": "camellya",
    "name": "Camellya",
    "title": "Bloom of Bloom",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Gai Hoa Hắc Ám Havoc",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
          "action": "Intro nhận buff ➔ E ➔ R ➔ Căn thanh Forte nổ băng Detonate ➔ Outro truyền 38% Basic ATK DMG Deepen."
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
    "releaseOrder": 35
  },
  {
    "id": "lumi",
    "name": "Lumi",
    "title": "Lollo Logistics Navigator",
    "element": "Electro",
    "rarity": 4,
    "weaponType": "Broadblade",
    "role": "Sub-DPS / Giao Hàng Siêu Tốc Bộc Phá Lôi",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
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
    "releaseOrder": 36
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
    "echoMainStats": "4-Cost: Tăng Lượng Trị Liệu hoặc HP% | 3-Cost: Hiệu Quả Nạp Năng Lượng% | 1-Cost: HP%",
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
    "releaseOrder": 37
  },
  {
    "id": "youhu",
    "name": "Youhu",
    "title": "Antique Appraiser",
    "element": "Glacio",
    "rarity": 4,
    "weaponType": "Gauntlets",
    "role": "Sustain / Thẩm Định Đồ Cổ & Hồi Máu",
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
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hồi phục HP và kích hoạt Thi Khúc Cổ: Tăng 100% Sát Thương Đòn Tấn Công Phối Hợp cho đồng minh trong 20 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Youhu",
          "action": "Intro vào sân ➔ E giám định cổ vật rút bùa Thỏi Vàng hoặc Bình Gốm ➔ Heavy Attack ném rương hồi máu toàn đội ➔ R nổ cổ vật ➔ Outro buff 100% Coordinated Attack cho Zhezhi / Yinlin / Mortefi."
        }
      ]
    },
    "releaseVersion": "1.3",
    "releaseOrder": 38
  },
  {
    "id": "zhezhi",
    "name": "Zhezhi",
    "title": "Commission Painter",
    "element": "Glacio",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Bút Họa Phối Hợp Buff Băng",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseOrder": 39
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
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
          "action": "Intro nhận buff khổng lồ ➔ Bật R kích hoạt trạng thái Trực Giác ➔ Bấm liên tiếp Skill E cường hóa Decaying Cube ➔ Kết liễu bằng Law of Reduction."
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
    "releaseOrder": 40
  },
  {
    "id": "jinhsi",
    "name": "Jinhsi",
    "title": "Magistrate of Jinzhou",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Long Thần Bộc Phá Kỹ Năng",
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
    "echoMainStats": "4-Cost: Tỉ Lệ Bạo Kích hoặc Sát Thương Bạo Kích | 3-Cost: Sát Thương Spectro | 1-Cost: Tấn Công%",
    "outroDescription": "Giảm thời gian hồi chiêu của các đòn Coordinated Attack từ đồng đội đi 1 giây.",
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
          "action": "Intro ➔ Bật đòn phối hợp Coordinated Attack từ Zhezhi R hoặc Yuanwu E ➔ Outro chuyển giao."
        },
        {
          "step": 3,
          "char": "Jinhsi",
          "action": "Intro vào sân Incarnation ➔ Hấp thụ tối đa 50 tầng Incandescence từ đòn đánh phối hợp ➔ Đánh thường 4 nhịp ➔ Skill E đợt 1 ➔ Liberation R xả long nộ ➔ Bấm E cường hóa Illuminous Epiphany thả rồng nổ hàng triệu sát thương."
        }
      ]
    },
    "releaseVersion": "1.1",
    "releaseOrder": 41
  },
  {
    "id": "changli",
    "name": "Changli",
    "title": "Counselor to the Magistrate",
    "element": "Fusion",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Hỏa Kiếm Phượng Hoàng",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "releaseOrder": 42
  },
  {
    "id": "rover_havoc",
    "name": "Rover Havoc",
    "title": "Arbiter of Darkness",
    "element": "Havoc",
    "rarity": 5,
    "weaponType": "Sword",
    "role": "Main DPS / Lưỡi Hái Hắc Ám Dark Surge",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Havoc DMG | 1-Cost: ATK%",
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
          "char": "Rover Havoc",
          "action": "Intro nhận buff Havoc ➔ Heavy Attack vào trạng thái Dark Surge ➔ Combo kiếm đen cường hóa ➔ R tung lưỡi hái bóng tối nộ khổng lồ ➔ Bấm Dreamless Echo nổ sạch màn hình."
        }
      ],
      "quickswap": [
        {
          "step": 1,
          "char": "Rover Havoc",
          "action": "Bật R tung nộ lưỡi hái ➔ Lập tức bấm Dreamless Echo."
        },
        {
          "step": 2,
          "char": "Danjin",
          "action": "Animation cancel: Ngay lúc Dreamless đang gầm, đổi sang Danjin tung E."
        },
        {
          "step": 3,
          "char": "Rover Havoc",
          "action": "Đổi lại Rover tiếp tục đánh thường Dark Surge."
        }
      ]
    },
    "releaseVersion": "1.1",
    "releaseOrder": 43
  },
  {
    "id": "jiyan",
    "name": "Jiyan",
    "title": "General of the Midnight Rangers",
    "element": "Aero",
    "rarity": 5,
    "weaponType": "Broadblade",
    "role": "Main DPS / Thanh Long Thương Trọng Kích",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG | 1-Cost: ATK%",
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
    "releaseOrder": 44
  },
  {
    "id": "yinlin",
    "name": "Yinlin",
    "title": "Secrecy Officer of Jinzhou",
    "element": "Electro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sub-DPS / Lôi Điệp Phối Hợp & Khuếch Đại Lôi",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG / Energy Regen | 1-Cost: ATK%",
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
    "releaseOrder": 45
  },
  {
    "id": "verina",
    "name": "Verina",
    "title": "Botanist of Huaxu Academy",
    "element": "Spectro",
    "rarity": 5,
    "weaponType": "Rectifier",
    "role": "Sustain / Hồi Sinh & Khuếch Đại Toàn Đội",
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
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: ATK%",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Electro DMG | 1-Cost: ATK%",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
          "action": "Ngay khi Encore bắt đầu tụ lực, lập tức đổi sang Changli vung kiếm E trong khi Encore vẫn đứng sân tự nổ."
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
    "echoMainStats": "4-Cost: Crit Rate / ATK | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Resonance Liberation DMG Deepen trong 14 giây cho nhân vật tiếp theo.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Jianxin",
          "action": "Vào sân ➔ E phản đòn đỡ chiêu Parry ➔ R gom toàn bộ quái vật vào tâm xoáy thái cực ➔ Giữ chuột tụ khí Chi Spiral tạo khiên siêu dày ➔ Outro truyền 38% Liberation Deepen cho Calcharo / Xiangli Yao / Rover."
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Glacio DMG | 1-Cost: ATK%",
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
    "id": "rover_spectro",
    "name": "Rover Spectro",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Spectro DMG | 1-Cost: ATK%",
    "outroDescription": "Tạo vùng quang trường ngưng đọng thời gian làm bất động mọi kẻ địch trong 3 giây.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Rover Spectro",
          "action": "Intro vào sân ➔ E ➔ R tung vòng thời gian ngưng đọng đối thủ ➔ Chuỗi đánh thường tích đầy Diminuendo ➔ Jué Echo ➔ Outro khống chế toàn sân."
        }
      ]
    },
    "releaseVersion": "1.0",
    "releaseOrder": 60
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Glacio DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Sát Thương Đánh Thường trong 14 giây cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Sanhua",
          "action": "Intro vào sân ➔ Skill E tạo khối băng ➔ Nộ R tạo gai tuyết ➔ Nhả chuột đúng vạch xanh thanh Forte Detonate nổ sạch băng ➔ Heron Echo ➔ Đầy 100% Concerto chỉ trong 3 giây ➔ Outro ngay cho Camellya / Encore / Lingyang."
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Energy Regen / Fusion DMG | 1-Cost: ATK%",
    "outroDescription": "Buff cực mạnh 38% Sát Thương Trọng Kích trong 14 giây cho nhân vật kế tiếp.",
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
    "outroDescription": "Buff 23% Sát Thương Thuộc Tính Havoc trong 14 giây cho đồng minh tiếp theo.",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Fusion DMG | 1-Cost: ATK%",
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
    "echoMainStats": "4-Cost: Healing Bonus | 3-Cost: Energy Regen | 1-Cost: HP%",
    "outroDescription": "Hồi máu cho đồng minh và rơi ra Lông Vũ Giai Điệu: Khi nhân vật nhặt sẽ nhận 15% All-Type DMG Deepen và 12% ATK trong 6 giây.",
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Hồi phục cực mạnh 4 Resonance Energy mỗi giây trong 5 giây cho đồng minh kế tiếp.",
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
    "outroDescription": "Buff cực mạnh 38% Sát Thương Kỹ Năng trong 14 giây cho nhân vật kế tiếp.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Taoqi",
          "action": "Intro ➔ Nhấn giữ E kích hoạt thế phòng ngự Rocksteady Shield ➔ Phản đòn khi bị tấn công ➔ R xả nộ ➔ Outro truyền 38% Skill DMG Deepen cho Jinhsi / Changli."
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
    "role": "Sub-DPS / Đột Phá Bào Mòn Trụ Lôi",
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
    "outroDescription": "Gây sát thương Electro phá vỡ thanh Rung Chấn của boss cực nhanh.",
    "rotations": {
      "standard": [
        {
          "step": 1,
          "char": "Yuanwu",
          "action": "Ra sân vỏn vẹn 1 giây ➔ Cắm cột Lôi Trụ E ➔ Bấm Bell-Borne Echo ➔ Đổi ngay sang Jinhsi. Cột tự động nổ đòn phối hợp Coordinated ATK mỗi khi Jinhsi tấn công, sạc 50 tầng Incandescence miễn phí."
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
    "echoMainStats": "4-Cost: Crit Rate/DMG | 3-Cost: Aero DMG / Energy Regen | 1-Cost: ATK%",
    "outroDescription": "Tạo Cổng Ranh Giới: Đồng minh đi qua cổng nhận thêm 23% Aero DMG Deepen trong 14 giây.",
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
  }
];

export const TEAM_TEMPLATES = [
  {
    "id": "hsin-suoming-shorekeeper",
    "name": "Hsin & Suoming Lôi Định Song Sát",
    "core": "hsin",
    "members": [
      "hsin",
      "suoming",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Electro",
    "description": "Đội hình Unison đỉnh cao phiên bản 3.7. Suoming buff Unison Boon kết hợp cùng vùng siêu buff của Shorekeeper giúp Hsin xả sát thương Lôi cực đại.",
    "tags": [
      "Electro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "hsin-suoming-chisa",
    "name": "Hsin & Suoming Khúc Ca Hắc Lôi",
    "core": "hsin",
    "members": [
      "hsin",
      "suoming",
      "chisa"
    ],
    "tier": "T0",
    "type": "Dual Resonance Electro Havoc",
    "description": "Chisa đảm nhiệm vị trí Sustain hỗ trợ hồi phục và đòn đánh phối hợp Havoc, tối ưu hóa nhịp hồi Unison cho Hsin và Suoming.",
    "tags": [
      "Electro",
      "Havoc",
      "T0",
      "Sustain Chisa"
    ]
  },
  {
    "id": "hsin-yinlin-shorekeeper",
    "name": "Hsin & Yinlin Lôi Điện Trùng Điệp",
    "core": "hsin",
    "members": [
      "hsin",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Electro",
    "description": "Yinlin khuếch đại sát thương Electro và Resonance Liberation biến toàn bộ chuỗi chiêu thức của Hsin thành bão sét.",
    "tags": [
      "Electro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "hsin-suoming-verina",
    "name": "Hsin & Suoming Tiên Phong Lôi Giới",
    "core": "hsin",
    "members": [
      "hsin",
      "suoming",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Electro",
    "description": "Lựa chọn kinh điển với Verina hồi máu và khuếch đại toàn bộ sát thương nguyên tố cho cặp đôi Hsin và Suoming.",
    "tags": [
      "Electro",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "qingxiao-ciaccona-shorekeeper",
    "name": "Qingxiao Phong Kiếm Bào Mòn",
    "core": "qingxiao",
    "members": [
      "qingxiao",
      "ciaccona",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Aero",
    "description": "Ciaccona tạo hiệu ứng Aero Erosion và khuếch đại sát thương gió, dọn đường cho Qingxiao phóng phi kiếm trảm kích.",
    "tags": [
      "Aero",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "qingxiao-sanhua-verina",
    "name": "Qingxiao & Sanhua Phong Hàn Song Trảm",
    "core": "qingxiao",
    "members": [
      "qingxiao",
      "sanhua",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Aero",
    "description": "Sanhua nạp Concerto siêu tốc và buff đòn đánh thường giúp Qingxiao duy trì tần suất kiếm khí dày đặc.",
    "tags": [
      "Aero",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "jingran-changli-shorekeeper",
    "name": "Jingran & Changli Hỏa Phượng Bộc Phá",
    "core": "jingran",
    "members": [
      "jingran",
      "changli",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Changli buff Fusion DMG Deepen cực mạnh hỗ trợ các đòn vung trọng kiếm rực lửa của Jingran.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "jingran-mortefi-verina",
    "name": "Jingran & Mortefi Liệt Diễm Long Hỏa",
    "core": "jingran",
    "members": [
      "jingran",
      "mortefi",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Fusion",
    "description": "Mortefi phối hợp đòn đánh rồng lửa và gia tăng sát thương Trọng Kích cho đại kiếm của Jingran.",
    "tags": [
      "Fusion",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "yangyang-xuanling-danjin-shorekeeper",
    "name": "Yangyang Xuanling Hắc Bão Trảm",
    "core": "yangyang_xuanling",
    "members": [
      "yangyang_xuanling",
      "danjin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Danjin Outro buff 23% Havoc DMG Deepen khuếch đại vũ điệu lông vũ hắc ám thức tỉnh của Yangyang Xuanling.",
    "tags": [
      "Havoc",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "yangyang-xuanling-sanhua-chisa",
    "name": "Yangyang Xuanling & Chisa Dạ Vũ",
    "core": "yangyang_xuanling",
    "members": [
      "yangyang_xuanling",
      "sanhua",
      "chisa"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Chisa ở slot 3 giữ nhịp hồi phục và buff Havoc đồng thời Sanhua đẩy nhanh xoay vòng kỹ năng.",
    "tags": [
      "Havoc",
      "T0",
      "Sustain Chisa"
    ]
  },
  {
    "id": "lucilla-sanhua-shorekeeper",
    "name": "Lucilla Băng Tuyết Đại Kiếm Trảm",
    "core": "lucilla",
    "members": [
      "lucilla",
      "sanhua",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Glacio",
    "description": "Lucilla đóng vai trò Main DPS dồn sát thương băng giá cực đại với nhịp nạp Concerto thần tốc của Sanhua.",
    "tags": [
      "Glacio",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "lucilla-zhezhi-verina",
    "name": "Lucilla & Zhezhi Bút Họa Hàn Khí",
    "core": "lucilla",
    "members": [
      "lucilla",
      "zhezhi",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Glacio",
    "description": "Zhezhi cung cấp đòn đánh phối hợp và hồi năng lượng Resonance Liberation cho đại kiếm băng giá Lucilla.",
    "tags": [
      "Glacio",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "lucilla-mornye-chisa",
    "name": "Lucilla & Chisa Băng Ma Giao Hưởng",
    "core": "lucilla",
    "members": [
      "lucilla",
      "mornye",
      "chisa"
    ],
    "tier": "T0.5",
    "type": "Dual Resonance",
    "description": "Mornye hỗ trợ đòn đánh thiêu đốt và Chisa ở slot 3 bảo vệ hồi máu cho những đòn trảm kiếm dũng mãnh của Lucilla.",
    "tags": [
      "Glacio",
      "Havoc",
      "T0.5",
      "Sustain Chisa"
    ]
  },
  {
    "id": "lucy-phoebe-shorekeeper",
    "name": "Lucy Hack Quang Học Tinh Tú",
    "core": "lucy",
    "members": [
      "lucy",
      "phoebe",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Spectro",
    "description": "Phoebe khuếch đại hiệu ứng Frazzle giúp các phát bắn công nghệ cao của Lucy bộc phát sát thương khủng.",
    "tags": [
      "Spectro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "rebecca-augusta-shorekeeper",
    "name": "Rebecca & Augusta Lôi Điện Quá Tải",
    "core": "rebecca",
    "members": [
      "rebecca",
      "augusta",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Electro",
    "description": "Cặp đôi xạ thủ và chiến binh lôi điện càn quét toàn bộ quái vật và boss với hỏa lực dày đặc.",
    "tags": [
      "Electro",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "hiyuki-sanhua-shorekeeper",
    "name": "Hiyuki Tuyết Vũ Kiếm",
    "core": "hiyuki",
    "members": [
      "hiyuki",
      "sanhua",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Glacio",
    "description": "Hiyuki vung kiếm băng giá xé tan hàng phòng ngự kẻ địch dưới sự hỗ trợ của Sanhua và Shorekeeper.",
    "tags": [
      "Glacio",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "sigrika-ciaccona-shorekeeper",
    "name": "Sigrika Bão Cuốn Không Gian",
    "core": "sigrika",
    "members": [
      "sigrika",
      "ciaccona",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Aero",
    "description": "Sigrika gom quái và bắn nổ chân không kết hợp hiệu ứng ăn mòn gió từ Ciaccona.",
    "tags": [
      "Aero",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "luuk-herssen-sanhua-shorekeeper",
    "name": "Luuk Herssen Tiên Phong Đại Kiếm Băng",
    "core": "luuk_herssen",
    "members": [
      "luuk_herssen",
      "sanhua",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Glacio",
    "description": "Luuk Herssen đảm nhiệm vai trò Main DPS dồn toàn bộ sức mạnh vào cú bổ kiếm băng giá kết liễu boss.",
    "tags": [
      "Glacio",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "luuk-herssen-zhezhi-verina",
    "name": "Luuk Herssen & Zhezhi Băng Tuyết Trường Thành",
    "core": "luuk_herssen",
    "members": [
      "luuk_herssen",
      "zhezhi",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Glacio",
    "description": "Đội hình Glacio chuẩn mực giúp Luuk Herssen duy trì sát thương kỹ năng liên tục.",
    "tags": [
      "Glacio",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "aemeath-changli-shorekeeper",
    "name": "Aemeath & Changli Hỏa Long Trảm",
    "core": "aemeath",
    "members": [
      "aemeath",
      "changli",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Changli và Aemeath tạo nên vòng lặp sát thương lửa thiêu đốt toàn bộ đấu trường.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "rover-electro-yinlin-shorekeeper",
    "name": "Rover Electro Lôi Kiếm Trảm",
    "core": "rover_electro",
    "members": [
      "rover_electro",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Electro",
    "description": "Rover hệ Lôi thức tỉnh sức mạnh bão sét kết hợp cùng búp bê lôi điện của Yinlin.",
    "tags": [
      "Electro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "rover-electro-suoming-shorekeeper",
    "name": "Rover Electro & Suoming Lôi Minh Song Hiệp",
    "core": "rover_electro",
    "members": [
      "rover_electro",
      "suoming",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual Resonance Electro",
    "description": "Suoming nạp đầy Unison kích hoạt đòn chém Lôi Minh Trảm cực đại của Rover Electro.",
    "tags": [
      "Electro",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "camellya-sanhua-chisa",
    "name": "Camellya & Chisa Cuồng Hoan Havoc",
    "core": "camellya",
    "members": [
      "camellya",
      "sanhua",
      "chisa"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Đội hình Havoc khuyến nghị hàng đầu. Chisa đảm nhiệm vị trí Sustain hồi phục máu và cung cấp đòn đánh phối hợp Havoc hỗ trợ thế roi gai của Camellya.",
    "tags": [
      "Havoc",
      "T0",
      "Sustain Chisa"
    ]
  },
  {
    "id": "rover-havoc-danjin-chisa",
    "name": "Rover Havoc & Chisa Hắc Ám Bộc Phá",
    "core": "rover_havoc",
    "members": [
      "rover_havoc",
      "danjin",
      "chisa"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Bộ ba Havoc thuần túy. Danjin buff sát thương Havoc trong khi Chisa ở slot 3 duy trì máu an toàn cho Danjin xả kỹ năng.",
    "tags": [
      "Havoc",
      "T0",
      "Sustain Chisa"
    ]
  },
  {
    "id": "phrolova-cantarella-chisa",
    "name": "Phrolova & Chisa Khúc Ca U Tối",
    "core": "phrolova",
    "members": [
      "phrolova",
      "cantarella",
      "chisa"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Chisa giữ vững đội hình ở vị trí Sustain bảo kê cho giọng ca tang lễ Havoc Decay của Phrolova.",
    "tags": [
      "Havoc",
      "T0",
      "Sustain Chisa"
    ]
  },
  {
    "id": "galbrena-changli-shorekeeper",
    "name": "Galbrena & Changli Liệt Hỏa Song Hành",
    "core": "galbrena",
    "members": [
      "galbrena",
      "changli",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Hỏa quyền bộc phá của Galbrena kết hợp hoàn hảo cùng buff Fusion Deepen từ Changli.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "augusta-yinlin-shorekeeper",
    "name": "Augusta Lôi Phá Thiên Binh",
    "core": "augusta",
    "members": [
      "augusta",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Electro",
    "description": "Augusta bổ thanh đại kiếm sét xuống mặt đất kết liễu kẻ thù dưới sự hỗ trợ của Yinlin.",
    "tags": [
      "Electro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "phrolova-cantarella-shorekeeper",
    "name": "Phrolova Khúc Ca Tang Lễ Havoc",
    "core": "phrolova",
    "members": [
      "phrolova",
      "cantarella",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Sự kết hợp hoàn hảo giữa Phrolova và Cantarella tạo ra lượng sát thương bóng tối áp đảo.",
    "tags": [
      "Havoc",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "lupa-changli-shorekeeper",
    "name": "Lupa Lang Vương Hỏa Diệm",
    "core": "lupa",
    "members": [
      "lupa",
      "changli",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Fusion",
    "description": "Lupa xé toạc phòng tuyến kẻ địch với tốc độ chớp nhoáng và hỏa lực cuồng bạo.",
    "tags": [
      "Fusion",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "cartethyia-ciaccona-shorekeeper",
    "name": "Cartethyia Trảm Phong Vô Ảnh",
    "core": "cartethyia",
    "members": [
      "cartethyia",
      "ciaccona",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Aero",
    "description": "Giai điệu bào mòn gió của Ciaccona tạo tiền đề cho những đường kiếm xé gió của Cartethyia.",
    "tags": [
      "Aero",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "zani-phoebe-shorekeeper",
    "name": "Zani Kim Cang Quyền Quang Minh",
    "core": "zani",
    "members": [
      "zani",
      "phoebe",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Spectro",
    "description": "Phoebe đặt trạng thái Frazzle dọn đường cho những cú đấm liên hoàn chói lòa của Zani.",
    "tags": [
      "Spectro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "cantarella-camellya-shorekeeper",
    "name": "Cantarella Khúc Ca Biển Đen",
    "core": "cantarella",
    "members": [
      "cantarella",
      "camellya",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Havoc",
    "description": "Cặp đôi bóng tối quyền lực càn quét mọi tầng Tháp Hiểm Họa với lượng sát thương Havoc dồi dào.",
    "tags": [
      "Havoc",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "phoebe-zani-shorekeeper",
    "name": "Phoebe Quang Minh Thần Giáo",
    "core": "phoebe",
    "members": [
      "phoebe",
      "zani",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Spectro",
    "description": "Phoebe chuyển đổi hình thái xả đạn Spectro kết hợp đòn đánh quyền pháp dũng mãnh của Zani.",
    "tags": [
      "Spectro",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "brant-changli-shorekeeper",
    "name": "Brant Hỏa Luân Đao Bộc Phá",
    "core": "brant",
    "members": [
      "brant",
      "changli",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Đại kiếm lửa của Brant kết hợp nhịp nhàng với phi kiếm hỏa diệm của Changli.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "carlotta-zhezhi-shorekeeper",
    "name": "Carlotta Trọng Pháo Shotgun Băng",
    "core": "carlotta",
    "members": [
      "carlotta",
      "zhezhi",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Glacio",
    "description": "Zhezhi buff sát thương Glacio và hồi năng lượng nộ giúp Carlotta bắn nát boss trong chớp mắt.",
    "tags": [
      "Glacio",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "carlotta-sanhua-verina",
    "name": "Carlotta Băng Giá Thần Tốc",
    "core": "carlotta",
    "members": [
      "carlotta",
      "sanhua",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Glacio",
    "description": "Đội hình quốc dân cực kỳ mượt mà giúp Carlotta xả đạn liên tục.",
    "tags": [
      "Glacio",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "carlotta-sanhua-baizhi",
    "name": "Carlotta Thân Thiện Tân Thủ",
    "core": "carlotta",
    "members": [
      "carlotta",
      "sanhua",
      "baizhi"
    ],
    "tier": "T1",
    "type": "Hypercarry Glacio",
    "description": "Phiên bản tiếp cận dễ dàng cho mọi người chơi với hai nhân vật 4 sao hỗ trợ đắc lực.",
    "tags": [
      "Glacio",
      "T1",
      "F2P Friendly"
    ]
  },
  {
    "id": "roccia-danjin-shorekeeper",
    "name": "Roccia Đấu Sĩ Rối Bóng Havoc",
    "core": "roccia",
    "members": [
      "roccia",
      "danjin",
      "shorekeeper"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Havoc",
    "description": "Danjin gia tăng sát thương Havoc cho những cú đấm rối bộc phá của Roccia.",
    "tags": [
      "Havoc",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "camellya-sanhua-shorekeeper",
    "name": "Camellya Gai Hoa Hắc Ám",
    "core": "camellya",
    "members": [
      "camellya",
      "sanhua",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Đội hình chuẩn chỉ hàng đầu cho Camellya. Sanhua Outro buff 38% sát thương Đánh Thường giúp Camellya quét sạch boss.",
    "tags": [
      "Havoc",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "camellya-danjin-shorekeeper",
    "name": "Camellya & Danjin Huyết Vũ",
    "core": "camellya",
    "members": [
      "camellya",
      "danjin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Danjin khuếch đại 23% sát thương Havoc đẩy ngưỡng sát thương của Camellya lên đỉnh điểm.",
    "tags": [
      "Havoc",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "jinhsi-zhezhi-shorekeeper",
    "name": "Jinhsi Long Thần Giáng Thế",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "zhezhi",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Spectro",
    "description": "Zhezhi cung cấp đòn đánh phối hợp nạp 50 tầng Incandescence thần tốc để Jinhsi giáng đòn rồng thần hủy diệt.",
    "tags": [
      "Spectro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "jinhsi-yuanwu-verina",
    "name": "Jinhsi & Yuanwu Lôi Long Quang Minh",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "yuanwu",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Spectro",
    "description": "Trụ sét của Yuanwu kích hoạt đòn phối hợp nạp tầng cho Jinhsi mà không cần đầu tư nhiều tài nguyên.",
    "tags": [
      "Spectro",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "jinhsi-yinlin-shorekeeper",
    "name": "Jinhsi & Yinlin Lôi Điệp Phối Hợp",
    "core": "jinhsi",
    "members": [
      "jinhsi",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Spectro",
    "description": "Yinlin liên tục kích hoạt lôi điệp giúp Jinhsi tích lũy tài nguyên tung chiêu thức kết liễu.",
    "tags": [
      "Spectro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "changli-brant-shorekeeper",
    "name": "Changli Phượng Hoàng Niết Bàn",
    "core": "changli",
    "members": [
      "changli",
      "brant",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Cặp đôi kiếm hỏa bộc phát sát thương dày đặc liên tục thiêu rụi mục tiêu.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "changli-encore-shorekeeper",
    "name": "Changli & Encore Song Sát Hỏa Diệm",
    "core": "changli",
    "members": [
      "changli",
      "encore",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Dual DPS Fusion",
    "description": "Changli Outro buff 20% Fusion DMG và 25% Resonance Liberation DMG hoàn hảo cho ma pháp của Encore.",
    "tags": [
      "Fusion",
      "T0",
      "Dual DPS"
    ]
  },
  {
    "id": "xiangli-yao-yinlin-shorekeeper",
    "name": "Xiangli Yao Quyền Vương Lôi Điện",
    "core": "xiangli_yao",
    "members": [
      "xiangli_yao",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Electro",
    "description": "Yinlin Outro buff 20% Electro và 25% Liberation biến cú đấm của Xiangli Yao thành sát thương cực đại.",
    "tags": [
      "Electro",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "xiangli-yao-yinlin-verina",
    "name": "Xiangli Yao & Yinlin Sấm Sét",
    "core": "xiangli_yao",
    "members": [
      "xiangli_yao",
      "yinlin",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Electro",
    "description": "Đội hình Electro chuẩn mực từ phiên bản 1.2 được tin dùng trong mọi mùa Tháp.",
    "tags": [
      "Electro",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "rover-havoc-danjin-shorekeeper",
    "name": "Rover Havoc Lưỡi Hái Hắc Ám",
    "core": "rover_havoc",
    "members": [
      "rover_havoc",
      "danjin",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Havoc",
    "description": "Danjin Outro buff 23% Havoc DMG Deepen cho thanh kiếm Dark Surge và nộ lưỡi hái Dead Realm của Rover Havoc.",
    "tags": [
      "Havoc",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "jiyan-mortefi-shorekeeper",
    "name": "Jiyan Thanh Long Cuồng Phong",
    "core": "jiyan",
    "members": [
      "jiyan",
      "mortefi",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Aero",
    "description": "Mortefi buff 38% Heavy Attack kết hợp cùng Thanh Long Thương của Jiyan quét sạch mọi sàn đấu.",
    "tags": [
      "Aero",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "jiyan-ciaccona-shorekeeper",
    "name": "Jiyan & Ciaccona Bào Mòn Gió",
    "core": "jiyan",
    "members": [
      "jiyan",
      "ciaccona",
      "shorekeeper"
    ],
    "tier": "T0",
    "type": "Hypercarry Aero",
    "description": "Hiệu ứng Aero Erosion từ Ciaccona gia tăng mạnh sát thương gió của Jiyan.",
    "tags": [
      "Aero",
      "T0",
      "Hypercarry"
    ]
  },
  {
    "id": "jiyan-mortefi-verina",
    "name": "Jiyan & Mortefi Phong Lôi",
    "core": "jiyan",
    "members": [
      "jiyan",
      "mortefi",
      "verina"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Aero",
    "description": "Bộ ba kinh điển từ thời điểm ra mắt game giúp Jiyan càn quét mọi thử thách.",
    "tags": [
      "Aero",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "calcharo-yinlin-shorekeeper",
    "name": "Calcharo Lôi Thần Thức Tỉnh",
    "core": "calcharo",
    "members": [
      "calcharo",
      "yinlin",
      "shorekeeper"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Electro",
    "description": "Yinlin hỗ trợ trảm kích sấm sét cho chuỗi Death Messenger của Calcharo.",
    "tags": [
      "Electro",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "encore-sanhua-shorekeeper",
    "name": "Encore Ma Pháp Hỏa Lực",
    "core": "encore",
    "members": [
      "encore",
      "sanhua",
      "shorekeeper"
    ],
    "tier": "T0.5",
    "type": "Hypercarry Fusion",
    "description": "Sanhua nạp Concerto nhanh chóng để Encore bật trạng thái hóa thân xả sát thương ma pháp.",
    "tags": [
      "Fusion",
      "T0.5",
      "Hypercarry"
    ]
  },
  {
    "id": "rover-spectro-yangyang-verina",
    "name": "Rover Spectro Quang Minh Kiếm",
    "core": "rover_spectro",
    "members": [
      "rover_spectro",
      "yangyang",
      "verina"
    ],
    "tier": "T1",
    "type": "Hypercarry Spectro",
    "description": "Yangyang hỗ trợ nạp năng lượng giúp Rover Spectro liên tục tung chiêu thức ánh sáng.",
    "tags": [
      "Spectro",
      "T1",
      "F2P Friendly"
    ]
  }
];

export const ELEMENT_ICONS = {
  "Spectro": "/elements/spectro.png",
  "Havoc": "/elements/havoc.png",
  "Aero": "/elements/aero.png",
  "Electro": "/elements/electro.png",
  "Fusion": "/elements/fusion.png",
  "Glacio": "/elements/glacio.png"
};

export const ELEMENT_ICONS_FALLBACK = {
  "Spectro": "https://static.wikia.nocookie.net/wutheringwaves/images/9/9d/Attribute_Spectro_Round.png",
  "Havoc": "https://static.wikia.nocookie.net/wutheringwaves/images/5/5d/Attribute_Havoc_Round.png",
  "Aero": "https://static.wikia.nocookie.net/wutheringwaves/images/9/9e/Attribute_Aero_Round.png",
  "Electro": "https://static.wikia.nocookie.net/wutheringwaves/images/1/10/Attribute_Electro_Round.png",
  "Fusion": "https://static.wikia.nocookie.net/wutheringwaves/images/7/78/Attribute_Fusion_Round.png",
  "Glacio": "https://static.wikia.nocookie.net/wutheringwaves/images/c/cd/Attribute_Glacio_Round.png"
};
