/**
 * MAHLIGAI WEDDING ORGANIZER - CORE APPLICATION LOGIC (v19)
 * Sistem Manajemen Acara & Koordinasi Tim Lapangan
 */

// Purge any stale caches immediately on boot
(async function purgeOldCachesOnBoot() {
  if (typeof caches === 'undefined') return;
  try {
    const keys = await caches.keys();
    for (const key of keys) {
      if (key !== 'mahligai-wo-pwa-v21.5') {
        await caches.delete(key);
      }
    }
  } catch (e) {}
})();

// Backward safety dummy
// ==================== HARVY WEDDING CATALOG & OPERATIONAL DATA (OFFICIAL EXCEL) ====================
const HARVY_PACKAGES = [
  {
    "id": "pkg-sekitar-sakura",
    "area": "Area Sekitar",
    "name": "Sakura",
    "price": 10000000,
    "desc": "Dekor, MC, dan dokumentasi liputan.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang",
    "effects": "MC",
    "docs": "Foto 2 roll\nVideo (1x acara akad & resepsi) Liputan\nFile dalam flashdisk",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-anggrek",
    "area": "Area Sekitar",
    "name": "Anggrek",
    "price": 12500000,
    "desc": "Lebih lengkap, dengan video sinematik.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang",
    "effects": "Hena\nMC",
    "docs": "Foto 3 roll\nVideo (1x acara akad & resepsi) Cinematic\nFile dalam flashdisk",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-aglonema",
    "area": "Area Sekitar",
    "name": "Aglonema",
    "price": 20000000,
    "desc": "Lengkap dengan terop, kursi, dan sound system.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang\nWelcome sign in",
    "effects": "Hena + nail art\nMC",
    "docs": "Foto 3 roll\nVideo (1x acara akad & resepsi) Cinematic\nFile dalam flashdisk",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "",
    "equipment": "Terop VVIP 1 plong\nTerop semi 3 plong\nKursi + cover 200\nKipas 3\nKerucut + 2 meja\nSound system",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-caladium",
    "area": "Area Sekitar",
    "name": "Caladium",
    "price": 36000000,
    "desc": "Paket paling lengkap, foto unlimited.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang\nWelcome sign in\nLengkungan 2\nPanggung kaca\nDekor lorong\nFree meja kursi akad",
    "effects": "Dry smoke (beam 2, parled, dry ice, kembang api 4)\nBuket asli\nElectone tunggal + 2 penyanyi\nHena + nail art\nMC",
    "docs": "Foto Unlimited\nVideo (1x acara akad & resepsi) Cinematic\nFile dalam flashdisk",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "",
    "equipment": "Terop VVIP 6 plong (4x6)\nKursi + cover 250\nKipas 3\nKerucut + 2 meja\nBlower 1\nFull karpet\nSound system",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-akad-1",
    "area": "Area Sekitar",
    "name": "Paket Akad - Pilihan 1",
    "price": 6000000,
    "desc": "Rias, kebaya akad + jas, hena, dan dokumentasi foto.",
    "decor": "",
    "effects": "Hena",
    "docs": "Foto 2 roll + album",
    "makeup": "Rias make up by owner\nKebaya akad + jas\nHena",
    "flowers": "Melati asli",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-akad-2",
    "area": "Area Sekitar",
    "name": "Paket Akad - Pilihan 2",
    "price": 7500000,
    "desc": "Rias, kebaya akad + jas, hena, dan dokumentasi foto + backdrop.",
    "decor": "Backdrop akad modern",
    "effects": "Hena",
    "docs": "Foto 2 roll + album",
    "makeup": "Rias make up by owner\nKebaya akad + jas\nHena",
    "flowers": "Melati asli\nBuket asli",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-rias-saja",
    "area": "Area Sekitar",
    "name": "Rias Saja (Area Sekitar)",
    "price": 6000000,
    "desc": "Untuk yang hanya membutuhkan rias pengantin.",
    "decor": "",
    "effects": "Hena",
    "docs": "",
    "makeup": "1 gown baru (free gown akad)\nMelati\nHena",
    "flowers": "Melati",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-makeup-resepsi",
    "area": "Area Sekitar",
    "name": "Make Up Resepsi (Area Sekitar)",
    "price": 7000000,
    "desc": "Rias pengantin lengkap untuk acara resepsi.",
    "decor": "",
    "effects": "",
    "docs": "",
    "makeup": "Gaun 2 gaun (gratis gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Melati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-sekitar-prewed",
    "area": "Area Sekitar",
    "name": "Prewedding",
    "price": 5000000,
    "desc": "Sesi foto outdoor dengan 2 tema.",
    "decor": "",
    "effects": "",
    "docs": "Foto outdoor\nFoto 20R (2x) + frame (pigura)\nSemua file dalam flashdisk",
    "makeup": "Rias & Gown pengantin",
    "flowers": "",
    "equipment": "",
    "extraCost": "",
    "notes": "Foto bisa 2 tema (formal & casual), baju sendiri. Lokasi photoshoot di area sekitar. Transportasi & makan ditanggung client."
  },
  {
    "id": "pkg-gresik-wijaya-kusuma",
    "area": "Area Gresik",
    "name": "Wijaya Kusuma",
    "price": 10500000,
    "desc": "Dekor, MC, dan rias pengantin lengkap.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang",
    "effects": "MC",
    "docs": "Foto 3 roll",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Melati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-gresik-sanseviera",
    "area": "Area Gresik",
    "name": "Sanseviera",
    "price": 12500000,
    "desc": "Lebih lengkap, dengan buket asli dan hena.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nWelcome sign in\nTumbang",
    "effects": "MC\nHena & nail art",
    "docs": "Foto 3 roll",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Buket asli\nMelati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-gresik-rias-saja",
    "area": "Area Gresik",
    "name": "Rias Saja (Area Gresik)",
    "price": 6500000,
    "desc": "Untuk yang hanya membutuhkan rias pengantin.",
    "decor": "",
    "effects": "Hena",
    "docs": "",
    "makeup": "1 gown baru (free gown akad)\nMelati\nHena",
    "flowers": "Melati",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-gresik-makeup-resepsi",
    "area": "Area Gresik",
    "name": "Make Up Resepsi (Area Gresik)",
    "price": 7000000,
    "desc": "Rias pengantin lengkap untuk acara resepsi.",
    "decor": "",
    "effects": "",
    "docs": "",
    "makeup": "Gaun 2 gaun (gratis gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Melati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-lamongan-monstera",
    "area": "Area Lamongan",
    "name": "Monstera",
    "price": 10500000,
    "desc": "Dekor, MC, dan rias pengantin lengkap.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang",
    "effects": "MC",
    "docs": "Foto 3 roll",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Melati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-lamongan-seropegia",
    "area": "Area Lamongan",
    "name": "Seropegia",
    "price": 12500000,
    "desc": "Lebih lengkap, dengan buket asli dan hena.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nWelcome sign in\nTumbang",
    "effects": "MC\nHena & nail art",
    "docs": "Foto 3 roll",
    "makeup": "Gaun 3 gaun (bonus gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Buket asli\nMelati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-lamongan-rias-saja",
    "area": "Area Lamongan",
    "name": "Rias Saja (Area Lamongan)",
    "price": 6500000,
    "desc": "Untuk yang hanya membutuhkan rias pengantin.",
    "decor": "",
    "effects": "Hena",
    "docs": "",
    "makeup": "1 gown baru (free gown akad)\nMelati\nHena",
    "flowers": "Melati",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-lamongan-makeup-resepsi",
    "area": "Area Lamongan",
    "name": "Make Up Resepsi (Area Lamongan)",
    "price": 7000000,
    "desc": "Rias pengantin lengkap untuk acara resepsi.",
    "decor": "",
    "effects": "",
    "docs": "",
    "makeup": "Gaun 2 gaun (gratis gaun akad)\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan\nMelati asli, bukan adat",
    "flowers": "Melati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-luar-rias-10",
    "area": "Area Luar Kota",
    "name": "Rias 10 Juta",
    "price": 10000000,
    "desc": "Khusus rias pengantin, lengkap dengan buket asli.",
    "decor": "",
    "effects": "",
    "docs": "",
    "makeup": "Rias manten + 2 gown\nBonus gaun akad\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan",
    "flowers": "Buket asli\nMelati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-luar-rias-12",
    "area": "Area Luar Kota",
    "name": "Rias 12 Juta",
    "price": 12000000,
    "desc": "Rias lengkap plus MC dan dokumentasi foto.",
    "decor": "",
    "effects": "MC",
    "docs": "Foto 3 roll",
    "makeup": "Rias manten + 2 gown\nBonus gaun akad\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan",
    "flowers": "Buket asli\nMelati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  },
  {
    "id": "pkg-luar-rias-17",
    "area": "Area Luar Kota",
    "name": "Rias 17 Juta",
    "price": 17000000,
    "desc": "Rias lengkap plus dekor pintu masuk dan tumbang.",
    "decor": "Ukuran 4 – 8 meter\nPintu masuk\nTumbang",
    "effects": "MC",
    "docs": "Foto 3 roll",
    "makeup": "Rias manten + 2 gown\nBonus gaun akad\nRias terima tamu 4 orang\nRias domas Putra 2 & putri 2\nRias penggapit 2\nRias orang tua & besan",
    "flowers": "Buket asli\nMelati asli, bukan adat",
    "equipment": "",
    "extraCost": "Melati adat Jawa Sunda / Solo: Rp 500.000\nAcara malam: Rp 1.300.000\nFotografer sampai acara malam: Rp 800.000",
    "notes": "Transportasi menyesuaikan lokasi"
  }
];

const HARVY_RENTALS = [
  {
    "id": "rent-vip-46",
    "category": "Sewa 4 x 6",
    "name": "Terop 4x6 VIP",
    "price": 750000,
    "unit": "plong"
  },
  {
    "id": "rent-vvip-46",
    "category": "Sewa 4 x 6",
    "name": "Terop 4x6 VVIP",
    "price": 1200000,
    "unit": "plong"
  },
  {
    "id": "rent-lorong-46",
    "category": "Sewa 4 x 6",
    "name": "Terop 4x6 Lorong",
    "price": 1200000,
    "unit": "plong"
  },
  {
    "id": "rent-semi-46",
    "category": "Sewa 4 x 6",
    "name": "Terop 4x6 Semi",
    "price": 550000,
    "unit": "plong"
  },
  {
    "id": "rent-biasa-46",
    "category": "Sewa 4 x 6",
    "name": "Terop 4x6 Biasa",
    "price": 350000,
    "unit": "plong"
  },
  {
    "id": "rent-kerucut-meja",
    "category": "Sewa Perlengkapan",
    "name": "Kerucut + 2 Meja",
    "price": 400000,
    "unit": "set"
  },
  {
    "id": "rent-kursi-cover",
    "category": "Sewa Perlengkapan",
    "name": "Kursi + Cover",
    "price": 4000,
    "unit": "kursi"
  },
  {
    "id": "rent-meja-tamu",
    "category": "Sewa Perlengkapan",
    "name": "Meja Tamu (60x130, t=70cm)",
    "price": 75000,
    "unit": "unit"
  },
  {
    "id": "rent-kipas",
    "category": "Sewa Perlengkapan",
    "name": "Kipas Angin",
    "price": 125000,
    "unit": "unit"
  },
  {
    "id": "rent-blower",
    "category": "Sewa Perlengkapan",
    "name": "Blower Kabut",
    "price": 400000,
    "unit": "unit"
  },
  {
    "id": "rent-karpet",
    "category": "Sewa Perlengkapan",
    "name": "Karpet Jalan",
    "price": 15000,
    "unit": "meter"
  },
  {
    "id": "rent-cover-dinding",
    "category": "Sewa Perlengkapan",
    "name": "Cover Dinding",
    "price": 75000,
    "unit": "bidang"
  },
  {
    "id": "rent-sound",
    "category": "Sewa Perlengkapan",
    "name": "Sound System (2 hari 1 malam)",
    "price": 2500000,
    "unit": "set"
  },
  {
    "id": "rent-vvip-66",
    "category": "Sewa 6 x 6",
    "name": "Terop 6x6 VVIP",
    "price": 1500000,
    "unit": "plong"
  },
  {
    "id": "rent-lorong-66",
    "category": "Sewa 6 x 6",
    "name": "Terop 6x6 Lorong",
    "price": 1500000,
    "unit": "plong"
  },
  {
    "id": "rent-dekor-lorong",
    "category": "Paket Tambahan",
    "name": "Dekor Lorong",
    "price": 1500000,
    "unit": "set"
  },
  {
    "id": "rent-pregolan",
    "category": "Paket Tambahan",
    "name": "Pregolan",
    "price": 800000,
    "unit": "set"
  },
  {
    "id": "rent-lorong-bungah",
    "category": "Paket Tambahan",
    "name": "Lorong Bungah",
    "price": 1800000,
    "unit": "set"
  },
  {
    "id": "rent-panggung-kaca",
    "category": "Paket Tambahan",
    "name": "Panggung Kaca",
    "price": 1200000,
    "unit": "set"
  },
  {
    "id": "rent-welcome-sign",
    "category": "Paket Tambahan",
    "name": "Welcome Sign In Kaca",
    "price": 200000,
    "unit": "unit"
  },
  {
    "id": "rent-lengkungan",
    "category": "Paket Tambahan",
    "name": "Lengkungan Bunga",
    "price": 200000,
    "unit": "buah"
  },
  {
    "id": "rent-vas-bunga",
    "category": "Paket Tambahan",
    "name": "Vas Bunga Standing",
    "price": 100000,
    "unit": "buah"
  },
  {
    "id": "rent-meja-akad",
    "category": "Paket Tambahan",
    "name": "Meja Kursi Akad",
    "price": 500000,
    "unit": "set"
  },
  {
    "id": "rent-jagrak-foto",
    "category": "Paket Tambahan",
    "name": "Jagrak Foto",
    "price": 100000,
    "unit": "buah"
  },
  {
    "id": "rent-dry-smoke",
    "category": "Paket Tambahan",
    "name": "Dry Smoke (Beam 2, Parled, Dry Ice, Kembang Api 4)",
    "price": 2000000,
    "unit": "set"
  },
  {
    "id": "rent-cucuk-lampa",
    "category": "Paket Tambahan",
    "name": "Cucuk Lampa (Anoman / Gatot Kaca)",
    "price": 1000000,
    "unit": "sesi"
  }
];

const HARVY_CATALOG = { packages: HARVY_PACKAGES, rentals: HARVY_RENTALS };

// Storage Keys
const STORAGE_KEY_EVENTS = 'mahligai_wedding_events_fresh_v2';
const STORAGE_KEY_MASTER_CREW = 'mahligai_master_crew_v2';
const STORAGE_KEY_ADMIN_LIST = 'mahligai_admin_list_v2';
const STORAGE_KEY_BRAND_CONFIG = 'mahligai_brand_config_v2';

// Default Brand Identity Configuration

// ==================== LUXURY BRAND EMBLEMS & UI VECTOR ICONS ====================
const BRAND_LOGO_SVGS = {
  'svg-rings': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="14" r="5.5"/><circle cx="15" cy="14" r="5.5"/><path d="M9 4.5L11 7l-2 1.5L7 7z" fill="currentColor" stroke="none"/><path d="M6.5 4.5h5"/></svg>`,
  'svg-crown': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M4 15l-1-9 5.5 4L12 4l3.5 6L21 6l-1 9H4z"/><circle cx="12" cy="3" r="1" fill="currentColor"/><circle cx="3" cy="5" r="1" fill="currentColor"/><circle cx="21" cy="5" r="1" fill="currentColor"/></svg>`,
  'svg-monogram': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 16V8l4 5 4-5v8"/></svg>`,
  'svg-floral': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c-1.5 2.5-2 5.5 0 8 2-2.5 1.5-5.5 0-8z"/><path d="M12 13c-3-1.5-6-1-7.5 1.5 2.5 1.5 5.5 1 7.5-1.5z"/><path d="M12 13c3-1.5 6-1 7.5 1.5-2.5 1.5-5.5 1-7.5-1.5z"/><path d="M7 8c1 2.5 3 4 5 5-2-1-4-2.5-5-5z"/><path d="M17 8c-1 2.5-3 4-5 5 2-1 4-2.5 5-5z"/><path d="M8 18h8"/></svg>`,
  'svg-heart': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5l-1.35-1.23C5.8 14.88 2.5 11.9 2.5 8.25 2.5 5.28 4.83 3 7.75 3c1.66 0 3.25.77 4.25 2 1-1.23 2.59-2 4.25-2 2.92 0 5.25 2.28 5.25 5.25 0 3.65-3.3 6.63-8.15 11.03L12 20.5z"/></svg>`,
  'svg-dove': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>`,
  'svg-sparkle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/></svg>`,
  'svg-castle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-5a3 3 0 0 1 6 0v5"/><path d="M9 9h6"/></svg>`
};

const UI_ICONS = {
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  mapPin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  note: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  whatsapp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>`,
  edit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  externalMap: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  couple: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  dress: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 4 4 1-3 4 2 9H7l2-9-3-4 4-1 2-4z"/></svg>`,
  tent: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18L12 4 3 20z"/><path d="M12 4v16"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  crown: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M4 15l-1-9 5.5 4L12 4l3.5 6L21 6l-1 9H4z"/></svg>`
};

function resizeImageToDataUrl(file, maxWidth, maxHeight, callback) {
  if (!file) return callback(new Error('No file'));
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width || maxWidth;
      let h = img.height || maxHeight;
      if (w > maxWidth || h > maxHeight) {
        const ratio = Math.min(maxWidth / w, maxHeight / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      callback(null, canvas.toDataURL('image/png', 0.92));
    };
    img.onerror = (err) => callback(err);
    img.src = e.target.result;
  };
  reader.onerror = (err) => callback(err);
  reader.readAsDataURL(file);
}

function getDefaultBrandConfig() {
  return {
    fullName: 'Mahligai Wedding Organizer',
    shortName: 'Mahligai WO',
    tagline: 'Wedding Organizer Management',
    logoType: 'svg',
    logoValue: 'svg-rings',
    logoUrl: '',
    primaryColor: '#92400E',
    whatsappSharePhone: '081234567890',
    email: 'admin@mahligaiwo.com',
    website: 'https://mahligaiwo.com'
  };
}

// Default Admin List
function getInitialAdminList() {
  return [
    {
      id: 'adm-sarah',
      name: 'Sarah Maharani',
      phone: '081234567890',
      email: 'sarah@mahligaiwo.com',
      isPrimary: true
    }
  ];
}

// Default Master Crew Database
function getInitialMasterCrew() {
  return [
    {
      id: 'mc-harvy',
      name: 'Harvy',
      role: 'Perias',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-pak-rozy',
      name: 'Pak Rozy',
      role: 'MC',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-om-cloudy',
      name: 'Om Cloudy',
      role: 'Fotografer',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-lani',
      name: 'Lani',
      role: 'Asisten',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-lia',
      name: 'Lia',
      role: 'Asisten',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-dewi',
      name: 'Dewi',
      role: 'Asisten',
      phone: '',
      email: '',
      notes: ''
    },
    {
      id: 'mc-mas-rudi',
      name: 'Mas Rudi',
      role: 'Sopir Logistik',
      phone: '',
      email: '',
      notes: ''
    }
  ];
}

// 3 Realistic Initial Demo Events
function getInitialEvents() {
  return [
    {
      id: 'event-salbil-meli-2026',
      coupleName: 'Salbil & Meli',
      date: '2026-11-07',
      clientPhone: '085606622517 / 082196557216',
      clientIg: '@un.melindah (mel)',
      fatherName: 'Abd. Kholiq',
      motherName: 'Ida Khuriyah',
      status: 'confirmed',
      vendorMc: 'Pak Rozy',
      vendorPhoto: '-',
      vendorVideo: 'Om Cloudy',
      vendorHenna: 'Harvy',
      makeupNotes: '- Manten siap dimake up sktar jam 9/10 pagi.\n- Untuk terima tamu dll siap dimake up sktr jam 7/8 pagi.',
      attireNotes: '1. Coklat jarik + Blangkon (7), (Hijab modern pakai melati)\n2. Maroon jarik + Bashofi, Sembongan, Tanpa kopyah, (Hijab modern)\n3. Ivory + Jas ivory / Jas mocca LL, (Hijab modern)\n• Melati : Biasa',
      logisticsNotes: 'Untuk paket yg ikut dr harvy :\n• Ada dekor & welcome sign in kaca\n• Terop VVIP 1 plong\n• Terop semi 3 plong\n• Kursi 200 + bungkus\n• Kipas 4 unit\n• Kerucut + 2 meja\n• Blower 1 unit\n• Meja 3 unit',
      specialNotes: 'Tanpa akad, langsung resepsi siang jam 1 (13.00 WIB). Seluruh kru hadir standby 2 jam sebelum acara.',
      locations: [
        {
          id: 'loc-salbil-1',
          locName: 'Lokasi 1',
          eventName: 'Resepsi',
          label: 'Resepsi',
          name: 'Resepsi',
          time: '13.00 WIB - Selesai',
          startTime: '13:00',
          endTime: 'Selesai',
          venueName: 'Kediaman Mempelai Wanita',
          venueType: 'Kediaman Mempelai Wanita',
          venueAddress: 'Dsn. Dukuh, Desa Bungah RT 22B / RW 8, Bungah, Gresik',
          customMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dsn.+Dukuh,+Desa+Bungah+RT+22B+/+RW+8,+Bungah,+Gresik',
          mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dsn.+Dukuh,+Desa+Bungah+RT+22B+/+RW+8,+Bungah,+Gresik',
          isAkad: false,
          isReception: true,
          notes: 'Tanpa Akad, Resepsi siang jam 1. Area parkir tamu di lapangan terdekat.'
        }
      ],
      crew: [
        {
          id: 'c-lani',
          name: 'Lani',
          role: 'Asisten Lapangan / Runner',
          phone: '082111223344',
          email: 'lani@mahligaiwo.com',
          notes: 'Pendamping ganti gaun 1, 2, 3 dan runner manten putri.'
        },
        {
          id: 'c-lia',
          name: 'Lia',
          role: 'Asisten Lapangan / Runner',
          phone: '082111223355',
          email: 'lia@mahligaiwo.com',
          notes: 'Standby penerima tamu dan souvenir.'
        },
        {
          id: 'c-dewi',
          name: 'Dewi',
          role: 'Asisten Lapangan / Runner',
          phone: '082111223366',
          email: 'dewi@mahligaiwo.com',
          notes: 'Koordinasi katering, meja prasmanan kerucut & blower/kipas angin.'
        },
        {
          id: 'c-rozy',
          name: 'Pak Rozy',
          role: 'Master of Ceremony (MC)',
          phone: '081298765432',
          email: 'rozy@mahligaiwo.com',
          notes: 'MC resepsi jam 13.00 WIB.'
        },
        {
          id: 'c-cloudy',
          name: 'Om Cloudy',
          role: 'Videografer & Dokumentasi Shot',
          phone: '081345678901',
          email: 'cloudy@mahligaiwo.com',
          notes: 'Dokumentasi video shot liputan.'
        },
        {
          id: 'c-harvy',
          name: 'Harvy',
          role: 'Perias / MUA, Henna & Nail Art',
          phone: '085712345678',
          email: 'harvy@mahligaiwo.com',
          notes: 'MUA 3x ganti gaun, ronce melati, henna art.'
        }
      ]
    },
    {
      id: 'event-rifqi-nabila-2026',
      coupleName: 'Rifqi & Nabila',
      date: '2026-11-15',
      clientPhone: '081233445566',
      clientIg: '@rifqinabila.story',
      fatherName: 'Drs. H. Bambang Soediro',
      motherName: 'Hj. Sri Wahyuni',
      status: 'confirmed',
      vendorMc: 'Pak Rozy',
      vendorPhoto: 'Om Cloudy Photography',
      vendorVideo: 'Cinematic Lens',
      vendorHenna: 'Harvy',
      makeupNotes: '- Standby makeup akad jam 05.30 pagi di hotel transit.\n- Retouch makeup resepsi jam 17.00 WIB.',
      attireNotes: '1. Akad: Putih adat Jawa Solo (ronce melati tibo dodo)\n2. Resepsi: Velvet maroon keemasan modern + Jas beskap',
      logisticsNotes: 'Dekorasi pelaminan 10 meter, karpet jalan merah, 6 unit standing flower, lighting moving beam.',
      specialNotes: 'Acara akad nikah khidmat di Masjid Agung, dilanjutkan resepsi megah di ballroom.',
      locations: [
        {
          id: 'loc-rifqi-1',
          name: 'Akad Nikah',
          startTime: '08:00',
          endTime: '10:00',
          venueType: 'Masjid Agung Gresik',
          venueAddress: 'Jl. DR. Wahidin Sudirohusodo No.788, Kebomas, Gresik',
          customMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Masjid+Agung+Gresik',
          isAkad: true,
          isReception: false,
          notes: 'Akad nikah di ruang utama masjid, parkir luas di halaman barat.'
        },
        {
          id: 'loc-rifqi-2',
          name: 'Resepsi Malam',
          startTime: '18:30',
          endTime: '21:30',
          venueType: 'Gedung Graha Sarana Gresik',
          venueAddress: 'Jl. Ahmad Yani No. 1, Gresik',
          customMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gedung+Graha+Sarana+Gresik',
          isAkad: false,
          isReception: true,
          notes: 'Resepsi ballroom dengan 500 undangan.'
        }
      ],
      crew: [
        {
          id: 'c-r1',
          name: 'Sarah Maharani',
          role: 'Admin WO & Koordinator',
          phone: '081234567890',
          email: 'sarah@mahligaiwo.com',
          notes: 'Leader & Koordinator Rundown Acara.'
        },
        {
          id: 'c-r2',
          name: 'Pak Rozy',
          role: 'Master of Ceremony (MC)',
          phone: '081298765432',
          email: 'rozy@mahligaiwo.com',
          notes: 'MC Akad & Resepsi Malam.'
        },
        {
          id: 'c-r3',
          name: 'Harvy',
          role: 'Perias / MUA, Henna & Nail Art',
          phone: '085712345678',
          email: 'harvy@mahligaiwo.com',
          notes: 'MUA Akad & Resepsi.'
        },
        {
          id: 'c-r4',
          name: 'Om Cloudy',
          role: 'Videografer & Dokumentasi Shot',
          phone: '081345678901',
          email: 'cloudy@mahligaiwo.com',
          notes: 'Lead Videografer Cinematic.'
        }
      ]
    },
    {
      id: 'event-dimas-anggi-2026',
      coupleName: 'Dimas & Anggi',
      date: '2026-11-20',
      clientPhone: '081799881122',
      clientIg: '@dimasanggi.wedding',
      fatherName: 'H. Achmad Subari',
      motherName: 'Hj. Siti Aminah',
      status: 'confirmed',
      vendorMc: 'Pak Rozy',
      vendorPhoto: 'Om Cloudy',
      vendorVideo: 'Om Cloudy',
      vendorHenna: 'Harvy',
      makeupNotes: '- Makeup akad di kediaman mempelai wanita jam 05.30 pagi.',
      attireNotes: '1. Kebaya akad putih modern payet & Jas pria modern. Melati asli fresh.',
      logisticsNotes: 'Backdrop akad modern aesthetic, karpet jalan putih, sound system 2 hari 1 malam.',
      specialNotes: 'Akad nikah intim keluarga dilanjutkan tasyakuran.',
      locations: [
        {
          id: 'loc-dimas-1',
          name: 'Akad & Syukuran',
          startTime: '08:00',
          endTime: '11:30',
          venueType: 'Kediaman Mempelai Wanita',
          venueAddress: 'Jl. Raya Manyar No. 45, Manyar, Gresik',
          customMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Manyar+Gresik',
          isAkad: true,
          isReception: true,
          notes: 'Akad nikah khidmat dilanjutkan ramah tamah keluarga.'
        }
      ],
      crew: [
        {
          id: 'c-d1',
          name: 'Sarah Maharani',
          role: 'Admin WO & Koordinator',
          phone: '081234567890',
          email: 'sarah@mahligaiwo.com',
          notes: 'Koordinator lapangan.'
        },
        {
          id: 'c-d2',
          name: 'Harvy',
          role: 'Perias / MUA, Henna & Nail Art',
          phone: '085712345678',
          email: 'harvy@mahligaiwo.com',
          notes: 'MUA akad nikah.'
        },
        {
          id: 'c-d3',
          name: 'Pak Rozy',
          role: 'Master of Ceremony (MC)',
          phone: '081298765432',
          email: 'rozy@mahligaiwo.com',
          notes: 'MC akad nikah.'
        }
      ]
    }
  ];
}


class WeddingApp {
  constructor() {
    this.events = [];
    this.masterCrew = [];
    this.adminList = [];
    this.brandConfig = null;
    this.currentView = 'events';
    this.currentEventId = null;
    this.activeFilter = 'upcoming';
    this.shareEmojiMode = false;
    this.selectedMasterCrewIds = new Set();
    this.activeExcelPreviewArea = 'Area Sekitar';

    this.STORAGE_KEY_HARVY_PACKAGES = 'mahligai_harvy_packages_v2';
    this.STORAGE_KEY_HARVY_RENTALS = 'mahligai_harvy_rentals_v2';
    this.STORAGE_KEY_HARVY_SYNC_META = 'mahligai_harvy_sync_meta_v2';
    this.harvyPackages = HARVY_PACKAGES;
    this.harvyRentals = HARVY_RENTALS;

    this.init();
  }

  init() {
    this.loadBrandConfig();
    this.loadMasterCrew();
    this.loadAdminList();
    this.loadEvents();
    this.loadHarvyDatabase();
    this.initElements();
    this.bindEvents();
    this.renderOperationalPackageDropdowns();
    this.applyBrandSettings();
    this.renderUserAccessHeader();
    this.checkH3Notifications();
    this.render();
    this.initPwaInstall();
  }

  // ==================== STORAGE & PERSISTENCE ====================
  loadBrandConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_BRAND_CONFIG);
      if (raw) {
        this.brandConfig = JSON.parse(raw);
      } else {
        this.brandConfig = getDefaultBrandConfig();
        this.saveBrandConfig(this.brandConfig);
      }
    } catch (e) {
      this.brandConfig = getDefaultBrandConfig();
    }
  }

  saveBrandConfig(cfg) {
    this.brandConfig = cfg;
    localStorage.setItem(STORAGE_KEY_BRAND_CONFIG, JSON.stringify(cfg));
  }

  loadAdminList() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ADMIN_LIST);
      if (raw) {
        this.adminList = JSON.parse(raw);
      } else {
        this.adminList = getInitialAdminList();
        this.saveAdminList();
      }
    } catch (e) {
      this.adminList = getInitialAdminList();
    }
  }

  saveAdminList() {
    localStorage.setItem(STORAGE_KEY_ADMIN_LIST, JSON.stringify(this.adminList));
    this.syncPrimaryAdminToMasterCrew();
  }

  getPrimaryAdmin() {
    const p = this.adminList.find(a => a.isPrimary);
    return p || this.adminList[0] || {
      id: 'adm-fallback',
      name: 'Sarah Maharani',
      phone: '081234567890',
      email: 'sarah@mahligaiwo.com'
    };
  }

  syncPrimaryAdminToMasterCrew() {
    const primaryAdmin = this.getPrimaryAdmin();
    if (!primaryAdmin) return;
    let crew = this.masterCrew.find(c => c.id === 'mc-admin' || c.role.includes('Admin WO'));
    if (crew) {
      crew.name = primaryAdmin.name;
      crew.phone = primaryAdmin.phone;
      crew.email = primaryAdmin.email;
    } else {
      this.masterCrew.unshift({
        id: 'mc-admin',
        name: primaryAdmin.name,
        role: 'Admin WO & Koordinator',
        phone: primaryAdmin.phone,
        email: primaryAdmin.email,
        notes: 'Koordinator briefing, jadwal standby kru, dan customer care Mahligai WO.'
      });
    }
    this.saveMasterCrew();
  }

  sanitizeDummyCrewItem(c) {
    if (!c) return;
    const dummyPhones = new Set([
      '085712345678', '081298765432', '081345678901',
      '082111223344', '082111223355', '082111223366',
      '081233445566', '081322119988'
    ]);
    const dummyNotes = new Set([
      'Perias pengantin, henna art, nail art & ronce melati.',
      'MC formal akad nikah dan santai resepsi.',
      'Liputan video cinematic dan foto dokumentasi.',
      'Pendamping pengantin putri dan asisten ganti gaun 1, 2, 3.',
      'Koordinator penerima tamu, buku tamu dan souvenir.',
      'Koordinasi prasmanan, kerucut meja tamu, blower & kipas.',
      'Pengiriman gaun pengantin, kotak hantaran, dan perlengkapan.',
      'Operator tata suara sound system, mic wireless, & dry smoke.',
      'Pendamping ganti gaun 1, 2, 3 dan runner manten putri.',
      'Standby penerima tamu dan souvenir.',
      'Koordinasi katering, meja prasmanan kerucut & blower/kipas angin.',
      'MC resepsi jam 13.00 WIB.',
      'Dokumentasi video shot liputan.',
      'MUA 3x ganti gaun, ronce melati, henna art.',
      'MC Akad & Resepsi Malam.',
      'MUA Akad & Resepsi.',
      'Lead Videografer Cinematic.',
      'MUA akad nikah.',
      'MC akad nikah.'
    ]);
    const dummyEmails = new Set([
      'harvy@mahligaiwo.com', 'rozy@mahligaiwo.com', 'cloudy@mahligaiwo.com',
      'lani@mahligaiwo.com', 'lia@mahligaiwo.com', 'dewi@mahligaiwo.com',
      'rudi@mahligaiwo.com', 'bima@mahligaiwo.com'
    ]);
    if (c.phone && dummyPhones.has(c.phone.trim())) c.phone = '';
    if (c.notes && dummyNotes.has(c.notes.trim())) c.notes = '';
    if (c.email && dummyEmails.has(c.email.trim())) c.email = '';
    if (c.role === 'Asisten Lapangan / Runner') c.role = 'Asisten';
    if (c.role === 'Perias / MUA, Henna & Nail Art' || c.role === 'Perias / MUA & Hairdo') c.role = 'Perias';
    if (c.role === 'Master of Ceremony (MC)' || c.role === 'MC (Master of Ceremony)') c.role = 'MC';
    if (c.role === 'Supir Logistik (Gaun & Makeup)' || c.role === 'Supir Logistik (Hantaran & Sound)') c.role = 'Sopir Logistik';
    if (c.role === 'Fotografer & Video') c.role = 'Fotografer';
  }

  loadMasterCrew() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MASTER_CREW);
      if (raw) {
        this.masterCrew = JSON.parse(raw);
        if (!Array.isArray(this.masterCrew) || this.masterCrew.length === 0) {
          this.masterCrew = getInitialMasterCrew();
        } else {
          this.masterCrew.forEach(c => this.sanitizeDummyCrewItem(c));
        }
        this.saveMasterCrew();
      } else {
        this.masterCrew = getInitialMasterCrew();
        this.saveMasterCrew();
      }
    } catch (e) {
      this.masterCrew = getInitialMasterCrew();
    }
  }

  saveMasterCrew() {
    localStorage.setItem(STORAGE_KEY_MASTER_CREW, JSON.stringify(this.masterCrew));
  }

  loadEvents() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY_EVENTS);
      if (raw) {
        // Sanitize corrupted unicode characters
        raw = raw.replace(/[\uFFFD\uFEFF]/g, '');
        this.events = JSON.parse(raw);
        // Normalize locations for stored events
        if (Array.isArray(this.events)) {
          this.events.forEach(ev => {
            if (ev.crew && Array.isArray(ev.crew)) {
              ev.crew.forEach(c => this.sanitizeDummyCrewItem(c));
            }
            if (ev.locations && Array.isArray(ev.locations)) {
              ev.locations.forEach((loc, idx) => {
                if (!loc.locName) loc.locName = 'Lokasi ' + (idx + 1);
                if (!loc.eventName) loc.eventName = loc.label || (loc.name && !loc.name.toLowerCase().startsWith('lokasi') ? loc.name : 'Resepsi');
                if (ev.id === 'event-salbil-meli-2026' && idx === 0) {
                  loc.locName = 'Lokasi 1';
                  loc.eventName = 'Resepsi';
                  loc.label = 'Resepsi';
                  loc.name = 'Resepsi';
                }
              });
            }
          });
        }
      } else {
        this.events = getInitialEvents();
        this.saveEvents();
      }
    } catch (e) {
      this.events = getInitialEvents();
    }
  }

  saveEvents() {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(this.events));
  }

  // ==================== DOM ELEMENTS INITIALIZATION ====================
  initElements() {
    // Navigation
    this.brandHomeBtn = document.getElementById('brandHomeBtn');
    this.navEventsBtn = document.getElementById('navEventsBtn');
    this.navMasterCrewBtn = document.getElementById('navMasterCrewBtn');
    this.navMasterCrewCount = document.getElementById('navMasterCrewCount');

    // Views
    this.viewListEvents = document.getElementById('viewListEvents');
    this.viewMasterCrew = document.getElementById('viewMasterCrew');
    this.viewDetailEvent = document.getElementById('viewDetailEvent');

    // Metrics & Filter Tab Counts
    this.metricUpcoming = document.getElementById('metricUpcoming');
    this.metricH3Count = document.getElementById('metricH3Count');
    this.metricClosestEvent = document.getElementById('metricClosestEvent');
    this.metricActiveCrewCount = document.getElementById('metricActiveCrewCount');
    this.metricMasterCrewTotal = document.getElementById('metricMasterCrewTotal');
    this.countUpcoming = document.getElementById('countUpcoming');
    this.countH3 = document.getElementById('countH3');
    this.countArchived = document.getElementById('countArchived');
    this.countAll = document.getElementById('countAll');

    // Event Filters & Search
    this.inputSearchEvents = document.getElementById('inputSearchEvents');
    this.eventsGridContainer = document.getElementById('eventsGridContainer');
    this.eventsEmptyState = document.getElementById('eventsEmptyState');
    this.btnEmptyNewEvent = document.getElementById('btnEmptyNewEvent');
    this.archiveActionBanner = document.getElementById('archiveActionBanner');
    this.btnClearAllArchived = document.getElementById('btnClearAllArchived');

    // Master Crew Elements
    this.inputSearchMasterCrew = document.getElementById('inputSearchMasterCrew');
    this.selectMasterRoleFilter = document.getElementById('selectMasterRoleFilter');
    this.masterCrewGridContainer = document.getElementById('masterCrewGridContainer');
    this.masterCrewEmptyState = document.getElementById('masterCrewEmptyState');
    this.btnOpenAddMasterCrewModal = document.getElementById('btnOpenAddMasterCrewModal');
    this.btnEmptyAddMasterCrew = document.getElementById('btnEmptyAddMasterCrew');

    // Event Modal
    this.btnOpenNewEventModal = document.getElementById('btnOpenNewEventModal');
    this.modalEventBackdrop = document.getElementById('modalEventBackdrop');
    this.btnCloseEventModal = document.getElementById('btnCloseEventModal');
    this.btnCancelEventModal = document.getElementById('btnCancelEventModal');
    this.formEvent = document.getElementById('formEvent');
    this.modalEventTitle = document.getElementById('modalEventTitle');
    this.inputEventId = document.getElementById('inputEventId');
    this.inputCoupleName = document.getElementById('inputCoupleName');
    this.inputEventDate = document.getElementById('inputEventDate');
    this.inputClientPhone = document.getElementById('inputClientPhone');
    this.inputClientIg = document.getElementById('inputClientIg');
    this.inputFatherName = document.getElementById('inputFatherName');
    this.inputMotherName = document.getElementById('inputMotherName');
    this.eventLocationsContainer = document.getElementById('eventLocationsContainer');
    this.btnAddLocationInForm = document.getElementById('btnAddLocationInForm');
    this.badgeLocationCount = document.getElementById('badgeLocationCount');

    // Operational Textareas & Package Preset Controls
    this.textareaAttireNotes = document.getElementById('textareaAttireNotes');
    this.textareaLogisticsNotes = document.getElementById('textareaLogisticsNotes');
    this.textareaSpecialNotes = document.getElementById('textareaSpecialNotes');
    this.selectOperationalPackageTemplate = document.getElementById('selectOperationalPackageTemplate');
    this.btnApplyOperationalTemplate = document.getElementById('btnApplyOperationalTemplate');
    this.selectQuickRentalAddon = document.getElementById('selectQuickRentalAddon');
    this.btnAppendQuickRental = document.getElementById('btnAppendQuickRental');

    // Excel Database Sync Settings Elements
    this.tabBtnExcelSettings = document.getElementById('tabBtnExcelSettings');
    this.panelExcelSettings = document.getElementById('panelExcelSettings');
    this.btnTriggerExcelUpload = document.getElementById('btnTriggerExcelUpload');
    this.inputUploadExcelDatabase = document.getElementById('inputUploadExcelDatabase');
    this.btnResetExcelDatabase = document.getElementById('btnResetExcelDatabase');
    this.badgeExcelDbStatus = document.getElementById('badgeExcelDbStatus');
    this.statExcelPackageCount = document.getElementById('statExcelPackageCount');
    this.statExcelPackageAreas = document.getElementById('statExcelPackageAreas');
    this.statExcelRentalCount = document.getElementById('statExcelRentalCount');
    this.statExcelDbSource = document.getElementById('statExcelDbSource');
    this.statExcelDbLastSync = document.getElementById('statExcelDbLastSync');

    // Detail View Elements
    this.btnBackToList = document.getElementById('btnBackToList');
    this.detailCoupleName = document.getElementById('detailCoupleName');
    this.detailEventDate = document.getElementById('detailEventDate');
    this.detailCountdownBadge = document.getElementById('detailCountdownBadge');
    this.detailStatusPill = document.getElementById('detailStatusPill');
    this.detailLocationsHeaderSummary = document.getElementById('detailLocationsHeaderSummary');
    this.detailCrewCountBadge = document.getElementById('detailCrewCountBadge');
    this.detailLocationsList = document.getElementById('detailLocationsList');
    this.detailOperationalContent = document.getElementById('detailOperationalContent');
    this.detailCrewList = document.getElementById('detailCrewList');
    this.crewEmptyState = document.getElementById('crewEmptyState');
    this.btnChooseMasterFromEmpty = document.getElementById('btnChooseMasterFromEmpty');
    this.btnOpenSelectFromMasterModal = document.getElementById('btnOpenSelectFromMasterModal');
    this.btnOpenAddCrewModal = document.getElementById('btnOpenAddCrewModal');

    // Detail: WhatsApp Sharing
    this.selectShareRecipient = document.getElementById('selectShareRecipient');
    this.textareaSharePreview = document.getElementById('textareaSharePreview');
    this.btnCopyShareText = document.getElementById('btnCopyShareText');
    this.btnShareDirectWhatsApp = document.getElementById('btnShareDirectWhatsApp');
    this.btnFormatClean = document.getElementById('btnFormatClean');
    this.btnFormatEmoji = document.getElementById('btnFormatEmoji');

    // Master Crew Modal
    this.modalMasterCrewBackdrop = document.getElementById('modalMasterCrewBackdrop');
    this.btnCloseMasterCrewModal = document.getElementById('btnCloseMasterCrewModal');
    this.btnCancelMasterCrewModal = document.getElementById('btnCancelMasterCrewModal');
    this.formMasterCrew = document.getElementById('formMasterCrew');
    this.modalMasterCrewTitle = document.getElementById('modalMasterCrewTitle');
    this.inputMasterCrewId = document.getElementById('inputMasterCrewId');
    this.inputMasterCrewName = document.getElementById('inputMasterCrewName');
    this.selectMasterCrewRole = document.getElementById('selectMasterCrewRole');
    this.boxMasterCrewCustomRole = document.getElementById('boxMasterCrewCustomRole');
    this.inputMasterCrewCustomRole = document.getElementById('inputMasterCrewCustomRole');
    this.inputMasterCrewPhone = document.getElementById('inputMasterCrewPhone');
    this.inputMasterCrewEmail = document.getElementById('inputMasterCrewEmail');
    this.textareaMasterCrewNotes = document.getElementById('inputMasterCrewNotes');

    // Select From Master Crew Modal
    this.modalSelectMasterCrewBackdrop = document.getElementById('modalSelectMasterCrewBackdrop');
    this.btnCloseSelectMasterModal = document.getElementById('btnCloseSelectMasterModal');
    this.btnCancelSelectMasterModal = document.getElementById('btnCancelSelectMasterModal');
    this.btnConfirmAssignMasterCrew = document.getElementById('btnConfirmAssignMasterCrew');
    this.btnSelectAllInMasterModal = document.getElementById('btnSelectAllInMasterModal');
    this.btnDeselectAllInMasterModal = document.getElementById('btnDeselectAllInMasterModal');
    this.inputSearchInMasterModal = document.getElementById('inputSearchInMasterModal');
    this.listSelectMasterCrew = document.getElementById('masterCrewSelectList');
    this.labelSelectedMasterCount = document.getElementById('labelSelectedMasterCount');

    // Crew Modal
    this.modalCrewBackdrop = document.getElementById('modalCrewBackdrop');
    this.btnCloseCrewModal = document.getElementById('btnCloseCrewModal');
    this.btnCancelCrewModal = document.getElementById('btnCancelCrewModal');
    this.formCrew = document.getElementById('formCrew');
    this.modalCrewTitle = document.getElementById('modalCrewTitle');
    this.inputCrewId = document.getElementById('inputCrewId');
    this.inputCrewName = document.getElementById('inputCrewName');
    this.selectCrewRole = document.getElementById('selectCrewRole');
    this.boxCrewCustomRole = document.getElementById('boxCrewCustomRole');
    this.inputCrewCustomRole = document.getElementById('inputCrewCustomRole');
    this.chkSaveToMasterAlso = document.getElementById('chkSaveToMasterAlso');
    this.inputCrewPhone = document.getElementById('inputCrewPhone');
    this.inputCrewEmail = document.getElementById('inputCrewEmail');
    this.textareaCrewNotes = document.getElementById('textareaCrewNotes');

    // Owner Admin Settings Modal
    this.btnOpenOwnerPanel = document.getElementById('btnOpenOwnerPanel');
    this.modalOwnerAdminBackdrop = document.getElementById('modalOwnerAdminBackdrop');
    this.btnCloseOwnerAdminModal = document.getElementById('btnCloseOwnerAdminModal');
    this.btnCancelOwnerAdminModal = document.getElementById('btnCancelOwnerAdminModal');

    // Tabs inside Owner Admin Modal
    this.tabBtnBrandingSettings = document.getElementById('tabBtnBrandingSettings');
    this.tabBtnAdminSettings = document.getElementById('tabBtnAdminSettings');
    this.tabBtnSecuritySettings = document.getElementById('tabBtnSecuritySettings');
    this.panelBrandingSettings = document.getElementById('panelBrandingSettings');
    this.panelAdminSettings = document.getElementById('panelAdminSettings');
    this.panelSecuritySettings = document.getElementById('panelSecuritySettings');

    // Branding elements
    this.formBrandSettings = document.getElementById('formBrandSettings');
    this.inputBrandFullName = document.getElementById('inputBrandFullName');
    this.inputBrandShortName = document.getElementById('inputBrandShortName');
    this.inputBrandTagline = document.getElementById('inputBrandTagline');
    this.btnTriggerLogoUpload = document.getElementById('btnTriggerLogoUpload');
    this.inputBrandLogoFile = document.getElementById('inputBrandLogoFile');
    this.btnResetBrandLogo = document.getElementById('btnResetBrandLogo');
    this.previewBrandTitle = document.getElementById('previewBrandTitle');
    this.previewBrandSubtitle = document.getElementById('previewBrandSubtitle');
    this.previewBrandIcon = document.getElementById('previewBrandIcon');

    // Admin WhatsApp elements
    this.adminActiveHighlightBox = document.getElementById('adminActiveHighlightBox');
    this.adminOwnerList = document.getElementById('ownerAdminCardsList');
    this.btnOpenAddAdminForm = document.getElementById('btnOpenAddAdminForm');
    this.adminFormCard = document.getElementById('containerAdminForm');
    this.btnCancelAdminForm = document.getElementById('btnCancelAdminForm');
    this.formAddAdmin = document.getElementById('formAdminData');
    this.inputAdminId = document.getElementById('inputAdminId');
    this.inputAdminName = document.getElementById('inputAdminName');
    this.inputAdminPhone = document.getElementById('inputAdminPhone');
    this.inputAdminEmail = document.getElementById('inputAdminEmail');
    this.checkIsPrimaryAdmin = document.getElementById('checkIsPrimaryAdmin');

    // Backup & Restore elements
    this.btnExportData = document.getElementById('btnExportDataBackup');
    this.inputImportFile = document.getElementById('inputImportDataBackup');
    this.btnFactoryReset = document.getElementById('btnFactoryResetApp');

    // iOS Install Modal elements
    this.btnCloseIosInstallModal = document.getElementById('btnCloseIosInstallModal');
    this.btnGotItIosInstall = document.getElementById('btnGotItIosInstall');

    // Notifications H-3
    this.h3UrgentBanner = document.getElementById('h3UrgentBanner');
    this.btnCloseH3Banner = document.getElementById('btnCloseH3Banner');
    this.btnViewH3Events = document.getElementById('btnViewH3Events');
    this.btnNotificationBell = document.getElementById('btnNotificationBell');
    this.headerNotificationCount = document.getElementById('headerNotificationCount');
    this.notificationDropdown = document.getElementById('notificationDropdown');
    this.notificationDropdownList = document.getElementById('notificationDropdownList');
    this.btnRequestWebNotif = document.getElementById('btnRequestWebNotif');
  }

  // ==================== EVENT LISTENERS BINDING ====================
  bindEvents() {
    // Navigation
    if (this.brandHomeBtn) this.brandHomeBtn.addEventListener('click', () => this.switchView('events'));
    if (this.navEventsBtn) this.navEventsBtn.addEventListener('click', () => this.switchView('events'));
    if (this.navMasterCrewBtn) this.navMasterCrewBtn.addEventListener('click', () => this.switchView('masterCrew'));
    if (this.btnBackToList) this.btnBackToList.addEventListener('click', () => this.switchView('events'));

    // Event Filters
    document.querySelectorAll('.tabs-filter .tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tabs-filter .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter || 'upcoming';
        this.renderEventList();
      });
    });

    if (this.inputSearchEvents) {
      this.inputSearchEvents.addEventListener('input', () => this.renderEventList());
    }

    if (this.btnClearAllArchived) {
      this.btnClearAllArchived.addEventListener('click', () => this.clearAllArchivedEvents());
    }

    // New / Edit Event Modal
    if (this.btnOpenNewEventModal) this.btnOpenNewEventModal.addEventListener('click', () => this.openEventModal('add'));
    if (this.btnEmptyNewEvent) this.btnEmptyNewEvent.addEventListener('click', () => this.openEventModal('add'));
    if (this.btnCloseEventModal) this.btnCloseEventModal.addEventListener('click', () => this.closeEventModal());
    if (this.btnCancelEventModal) this.btnCancelEventModal.addEventListener('click', () => this.closeEventModal());
    if (this.formEvent) this.formEvent.addEventListener('submit', (e) => this.handleEventFormSubmit(e));
    if (this.btnAddLocationInForm) this.btnAddLocationInForm.addEventListener('click', () => this.addLocationFormCard());

    const btnEditLocations = document.getElementById('btnEditLocationsFromSection');
    if (btnEditLocations) {
      btnEditLocations.addEventListener('click', () => {
        if (this.currentEventId) {
          this.openEventModal('edit', this.currentEventId);
        }
      });
    }

    const btnEditOperational = document.getElementById('btnEditOperationalFromSection');
    if (btnEditOperational) {
      btnEditOperational.addEventListener('click', () => {
        if (this.currentEventId) {
          this.openEventModal('edit', this.currentEventId);
        }
      });
    }

    // Operational Package Template Auto-Fill Handlers
    if (this.btnApplyOperationalTemplate) {
      this.btnApplyOperationalTemplate.addEventListener('click', () => {
        const pkgId = this.selectOperationalPackageTemplate ? this.selectOperationalPackageTemplate.value : '';
        this.applyOperationalPackageTemplate(pkgId);
      });
    }
    if (this.btnAppendQuickRental) {
      this.btnAppendQuickRental.addEventListener('click', () => {
        this.appendQuickRentalToLogistics();
      });
    }

    // Excel Database Upload, Reset & Preview Area Tabs
    if (this.btnTriggerExcelUpload && this.inputUploadExcelDatabase) {
      this.btnTriggerExcelUpload.addEventListener('click', () => {
        this.inputUploadExcelDatabase.click();
      });
    }

    if (this.inputUploadExcelDatabase) {
      this.inputUploadExcelDatabase.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          await this.handleExcelDatabaseUpload(file);
          e.target.value = '';
        }
      });
    }

    if (this.btnResetExcelDatabase) {
      this.btnResetExcelDatabase.addEventListener('click', () => {
        this.handleResetExcelDatabase();
      });
    }

    document.querySelectorAll('.excel-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const area = btn.getAttribute('data-excel-area') || 'Area Sekitar';
        this.renderExcelPreviewTable(area);
      });
    });

    // WhatsApp Briefing Section D
    if (this.selectShareRecipient) {
      this.selectShareRecipient.addEventListener('change', () => this.handleShareRecipientChange());
    }
    if (this.btnCopyShareText) {
      this.btnCopyShareText.addEventListener('click', () => this.copyShareContent());
    }
    if (this.btnShareDirectWhatsApp) {
      this.btnShareDirectWhatsApp.addEventListener('click', () => this.openDirectWhatsAppShare());
    }
    if (this.btnFormatClean) {
      this.btnFormatClean.addEventListener('click', () => this.setShareEmojiMode(false));
    }
    if (this.btnFormatEmoji) {
      this.btnFormatEmoji.addEventListener('click', () => this.setShareEmojiMode(true));
    }

    // Crew Selection From Master
    if (this.btnOpenSelectFromMasterModal) this.btnOpenSelectFromMasterModal.addEventListener('click', () => this.openSelectMasterModal());
    if (this.btnChooseMasterFromEmpty) this.btnChooseMasterFromEmpty.addEventListener('click', () => this.openSelectMasterModal());
    if (this.btnCloseSelectMasterModal) this.btnCloseSelectMasterModal.addEventListener('click', () => this.closeSelectMasterModal());
    if (this.btnCancelSelectMasterModal) this.btnCancelSelectMasterModal.addEventListener('click', () => this.closeSelectMasterModal());
    if (this.inputSearchInMasterModal) this.inputSearchInMasterModal.addEventListener('input', () => this.renderSelectMasterList());
    if (this.btnSelectAllInMasterModal) this.btnSelectAllInMasterModal.addEventListener('click', () => this.selectAllMasterModal(true));
    if (this.btnDeselectAllInMasterModal) this.btnDeselectAllInMasterModal.addEventListener('click', () => this.selectAllMasterModal(false));
    if (this.btnConfirmAssignMasterCrew) this.btnConfirmAssignMasterCrew.addEventListener('click', () => this.confirmAssignMasterCrew());

    // Custom Crew Modal
    if (this.btnOpenAddCrewModal) this.btnOpenAddCrewModal.addEventListener('click', () => this.openCrewModal('add'));
    if (this.btnCloseCrewModal) this.btnCloseCrewModal.addEventListener('click', () => this.closeCrewModal());
    if (this.btnCancelCrewModal) this.btnCancelCrewModal.addEventListener('click', () => this.closeCrewModal());
    if (this.formCrew) this.formCrew.addEventListener('submit', (e) => this.handleCrewFormSubmit(e));
    if (this.selectCrewRole) {
      this.selectCrewRole.addEventListener('change', () => {
        const isManual = this.selectCrewRole.value === 'MANUAL';
        if (this.boxCrewCustomRole) this.boxCrewCustomRole.classList.toggle('hidden', !isManual);
        if (isManual && this.inputCrewCustomRole) this.inputCrewCustomRole.focus();
      });
    }

    // Master Crew Directory Controls
    if (this.btnOpenAddMasterCrewModal) this.btnOpenAddMasterCrewModal.addEventListener('click', () => this.openMasterCrewModal());
    if (this.btnEmptyAddMasterCrew) this.btnEmptyAddMasterCrew.addEventListener('click', () => this.openMasterCrewModal());
    if (this.btnCloseMasterCrewModal) this.btnCloseMasterCrewModal.addEventListener('click', () => this.closeMasterCrewModal());
    if (this.btnCancelMasterCrewModal) this.btnCancelMasterCrewModal.addEventListener('click', () => this.closeMasterCrewModal());
    if (this.formMasterCrew) this.formMasterCrew.addEventListener('submit', (e) => this.handleMasterCrewFormSubmit(e));
    if (this.selectMasterCrewRole) {
      this.selectMasterCrewRole.addEventListener('change', () => {
        const isManual = this.selectMasterCrewRole.value === 'MANUAL';
        if (this.boxMasterCrewCustomRole) this.boxMasterCrewCustomRole.classList.toggle('hidden', !isManual);
        if (isManual && this.inputMasterCrewCustomRole) this.inputMasterCrewCustomRole.focus();
      });
    }
    if (this.inputSearchMasterCrew) this.inputSearchMasterCrew.addEventListener('input', () => this.renderMasterCrewList());
    if (this.selectMasterRoleFilter) this.selectMasterRoleFilter.addEventListener('change', () => this.renderMasterCrewList());

    // Owner Admin Panel & Tab Navigation
    if (this.btnOpenOwnerPanel) this.btnOpenOwnerPanel.addEventListener('click', () => this.openOwnerAdminModal());
    if (this.btnCloseOwnerAdminModal) this.btnCloseOwnerAdminModal.addEventListener('click', () => this.closeOwnerAdminModal());
    if (this.btnCancelOwnerAdminModal) this.btnCancelOwnerAdminModal.addEventListener('click', () => this.closeOwnerAdminModal());

    document.querySelectorAll('.owner-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const panelId = btn.getAttribute('data-panel');
        if (panelId) this.switchOwnerTab(panelId);
      });
    });

    // Branding Settings
    if (this.formBrandSettings) this.formBrandSettings.addEventListener('submit', (e) => this.handleSaveBrandConfig(e));
    if (this.btnTriggerLogoUpload) this.btnTriggerLogoUpload.addEventListener('click', () => this.inputBrandLogoFile && this.inputBrandLogoFile.click());
    if (this.inputBrandLogoFile) {
      this.inputBrandLogoFile.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          resizeImageToDataUrl(e.target.files[0], 200, 200, (err, dataUrl) => {
            if (!err) {
              this.brandConfig.logoType = 'image';
              this.brandConfig.logoValue = dataUrl;
              this.updateBrandLivePreview();
            }
          });
        }
      });
    }
    if (this.btnResetBrandLogo) {
      this.btnResetBrandLogo.addEventListener('click', () => {
        this.brandConfig.logoType = 'svg';
        this.brandConfig.logoValue = 'svg-rings';
        this.updateBrandLivePreview();
      });
    }

    // Live input listeners on Brand form
    if (this.inputBrandShortName) {
      this.inputBrandShortName.addEventListener('input', () => this.updateBrandLivePreview());
    }
    if (this.inputBrandTagline) {
      this.inputBrandTagline.addEventListener('input', () => this.updateBrandLivePreview());
    }

    // Quick Icon Picker in Branding
    document.querySelectorAll('.quick-icon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const icon = btn.getAttribute('data-icon');
        if (icon && BRAND_LOGO_SVGS[icon]) {
          this.brandConfig.logoType = 'svg';
          this.brandConfig.logoValue = icon;
        } else if (icon) {
          this.brandConfig.logoType = 'emoji';
          this.brandConfig.logoValue = icon;
        }
        this.updateBrandLivePreview();
      });
    });

    // Admin WA Form Controls
    if (this.btnOpenAddAdminForm) this.btnOpenAddAdminForm.addEventListener('click', () => this.openAdminFormForAdd());
    if (this.btnCancelAdminForm) this.btnCancelAdminForm.addEventListener('click', () => this.closeAdminForm());
    if (this.formAddAdmin) this.formAddAdmin.addEventListener('submit', (e) => this.handleSaveAdminSubmit(e));

    // Delegated click actions for Admin list & highlight box
    if (this.modalOwnerAdminBackdrop) {
      this.modalOwnerAdminBackdrop.addEventListener('click', (e) => {
        const btnPrimary = e.target.closest('.btn-set-primary-admin');
        if (btnPrimary) {
          const id = btnPrimary.getAttribute('data-id');
          if (id) this.setPrimaryAdmin(id);
          return;
        }

        const btnEdit = e.target.closest('.btn-edit-admin');
        if (btnEdit) {
          const id = btnEdit.getAttribute('data-id');
          if (id) this.openAdminFormForEdit(id);
          return;
        }

        const btnDelete = e.target.closest('.btn-delete-admin');
        if (btnDelete) {
          const id = btnDelete.getAttribute('data-id');
          if (id) this.deleteAdmin(id);
          return;
        }
      });
    }

    // Backup & Restore
    if (this.btnExportData) this.btnExportData.addEventListener('click', () => this.handleExportDataBackup());
    if (this.inputImportFile) this.inputImportFile.addEventListener('change', (e) => this.handleImportDataBackup(e));
    if (this.btnFactoryReset) this.btnFactoryReset.addEventListener('click', () => this.handleFactoryReset());

    // iOS Install Modal Close Button
    if (this.btnCloseIosInstallModal) {
      this.btnCloseIosInstallModal.addEventListener('click', () => {
        const modal = document.getElementById('iosInstallModal');
        if (modal) modal.classList.remove('active');
      });
    }

    // Quick WA Brief Jump Anchor
    const btnJumpWA = document.getElementById('btnJumpToShareWA');
    if (btnJumpWA) {
      btnJumpWA.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('sectionShareWA');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Notifications H-3
    if (this.btnCloseH3Banner) this.btnCloseH3Banner.addEventListener('click', () => this.dismissH3Banner());
    if (this.btnViewH3Events) {
      this.btnViewH3Events.addEventListener('click', () => {
        this.switchView('events');
        const tabH3 = document.getElementById('tabH3');
        if (tabH3) tabH3.click();
      });
    }
    if (this.btnNotificationBell) {
      this.btnNotificationBell.addEventListener('click', () => {
        if (this.notificationDropdown) this.notificationDropdown.classList.toggle('hidden');
      });
    }
    if (this.btnRequestWebNotif) this.btnRequestWebNotif.addEventListener('click', () => this.requestWebNotification());
  }

  // ==================== VIEW SWITCHING ====================
  switchView(viewName) {
    this.currentView = viewName;

    // Hide all views
    [this.viewListEvents, this.viewMasterCrew, this.viewDetailEvent].forEach(v => {
      if (v) v.classList.remove('active');
    });

    // Remove active from all nav items
    [this.navEventsBtn, this.navMasterCrewBtn].forEach(b => {
      if (b) b.classList.remove('active');
    });

    if (viewName === 'events') {
      if (this.viewListEvents) this.viewListEvents.classList.add('active');
      if (this.navEventsBtn) this.navEventsBtn.classList.add('active');
      this.render();
    } else if (viewName === 'masterCrew') {
      if (this.viewMasterCrew) this.viewMasterCrew.classList.add('active');
      if (this.navMasterCrewBtn) this.navMasterCrewBtn.classList.add('active');
      this.renderMasterCrewList();
    } else if (viewName === 'detail') {
      if (this.viewDetailEvent) this.viewDetailEvent.classList.add('active');
      this.renderDetailView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchToDetail(eventId) {
    this.currentEventId = eventId;
    this.switchView('detail');
  }

  // ==================== EVENT MODAL CRUD ====================
  openEventModal(mode = 'add', eventId = null) {
    if (this.selectOperationalPackageTemplate) this.selectOperationalPackageTemplate.value = '';
    if (this.selectQuickRentalAddon) this.selectQuickRentalAddon.value = '';

    if (mode === 'edit' && eventId) {
      const ev = this.events.find(x => x.id === eventId);
      if (!ev) return;

      this.inputEventId.value = ev.id;
      this.modalEventTitle.textContent = 'Edit Data Acara Pernikahan';
      this.inputCoupleName.value = ev.coupleName || '';
      this.inputEventDate.value = ev.date || '';
      this.inputClientPhone.value = ev.clientPhone || '';
      this.inputClientIg.value = ev.clientIg || '';
      this.inputFatherName.value = ev.fatherName || '';
      this.inputMotherName.value = ev.motherName || '';

      this.textareaAttireNotes.value = ev.attireNotes || '';
      this.textareaLogisticsNotes.value = ev.logisticsNotes || '';
      this.textareaSpecialNotes.value = ev.specialNotes || '';

      this.renderEventLocationFormItems(this.getEventLocations(ev));
    } else {
      this.inputEventId.value = '';
      this.modalEventTitle.textContent = 'Tambah Acara Pernikahan Baru';
      this.formEvent.reset();

      if (this.selectOperationalPackageTemplate) this.selectOperationalPackageTemplate.value = '';
      if (this.selectQuickRentalAddon) this.selectQuickRentalAddon.value = '';

      this.renderEventLocationFormItems([
        {
          id: 'loc-1',
          locName: 'Lokasi 1',
          eventName: 'Resepsi',
          label: 'Resepsi',
          time: '13.00 WIB - Selesai',
          venueName: '',
          venueAddress: '',
          mapsUrl: '',
          notes: ''
        }
      ]);
    }

    if (this.modalEventBackdrop) this.modalEventBackdrop.classList.add('active');
  }

  closeEventModal() {
    if (this.modalEventBackdrop) this.modalEventBackdrop.classList.remove('active');
  }

  handleEventFormSubmit(e) {
    e.preventDefault();

    const coupleName = this.inputCoupleName.value.trim();
    const eventDate = this.inputEventDate.value;

    if (!coupleName || !eventDate) {
      this.showToast('Nama pasangan dan tanggal acara wajib diisi!', 'warning');
      return;
    }

    const eventId = this.inputEventId.value;
    const isEdit = !!eventId;
    const existingEvent = isEdit ? this.events.find(x => x.id === eventId) : null;

    // Collect Locations
    const locationCards = this.eventLocationsContainer.querySelectorAll('.event-location-form-card');
    const locations = [];
    locationCards.forEach((card, idx) => {
      const inputLoc = card.querySelector('.input-loc-name');
      const inputEvent = card.querySelector('.input-loc-event-name') || card.querySelector('.input-loc-label');
      const inputTime = card.querySelector('.input-loc-time');
      const inputVenueName = card.querySelector('.input-loc-venue-name');
      const inputVenueAddress = card.querySelector('.input-loc-venue-address');
      const inputMapsUrl = card.querySelector('.input-loc-maps-url');
      const inputNotes = card.querySelector('.input-loc-notes');

      const locName = inputLoc ? inputLoc.value.trim() || `Lokasi ${idx + 1}` : `Lokasi ${idx + 1}`;
      const eventName = inputEvent ? inputEvent.value.trim() || (idx === 0 ? 'Resepsi' : `Acara ${idx + 1}`) : (idx === 0 ? 'Resepsi' : `Acara ${idx + 1}`);
      const time = inputTime ? inputTime.value.trim() : '';
      const venueName = inputVenueName ? inputVenueName.value.trim() : '';
      const venueAddress = inputVenueAddress ? inputVenueAddress.value.trim() : '';
      const mapsUrl = inputMapsUrl ? inputMapsUrl.value.trim() : '';
      const notes = inputNotes ? inputNotes.value.trim() : '';

      locations.push({
        id: card.dataset.locationId || `loc-${idx + 1}`,
        locName,
        eventName,
        label: eventName,
        name: eventName,
        time,
        venueName,
        venueAddress,
        mapsUrl,
        notes
      });
    });

    const selectedTemplateId = this.selectOperationalPackageTemplate ? this.selectOperationalPackageTemplate.value : '';
    const pkg = (this.harvyPackages || HARVY_PACKAGES).find(p => p.id === selectedTemplateId);

    const eventData = {
      id: isEdit ? eventId : `event-${Date.now()}`,
      coupleName,
      date: eventDate,
      packageId: pkg ? pkg.id : (existingEvent?.packageId || ''),
      packageName: pkg ? pkg.name : (existingEvent?.packageName || ''),
      clientPhone: this.inputClientPhone.value.trim(),
      clientIg: this.inputClientIg.value.trim(),
      fatherName: this.inputFatherName.value.trim(),
      motherName: this.inputMotherName.value.trim(),
      locations: locations.length > 0 ? locations : [
        {
          id: 'loc-1',
          locName: 'Lokasi 1',
          eventName: 'Resepsi',
          label: 'Resepsi',
          name: 'Resepsi',
          time: '',
          venueName: '',
          venueAddress: '',
          mapsUrl: '',
          notes: ''
        }
      ],
      attireNotes: this.textareaAttireNotes.value.trim(),
      logisticsNotes: this.textareaLogisticsNotes.value.trim(),
      specialNotes: this.textareaSpecialNotes.value.trim(),
      isArchived: existingEvent?.isArchived || false,
      crew: existingEvent?.crew || []
    };

    if (isEdit) {
      const idx = this.events.findIndex(x => x.id === eventId);
      if (idx !== -1) {
        eventData.crew = this.events[idx].crew || [];
        eventData.isArchived = this.events[idx].isArchived || false;
        this.events[idx] = eventData;
      }
    } else {
      this.events.unshift(eventData);
    }

    this.saveEvents();
    this.updateMetrics();
    this.closeEventModal();
    this.showToast(isEdit ? 'Data acara berhasil diperbarui!' : 'Acara pernikahan baru berhasil ditambahkan!', 'success');
    this.switchToDetail(eventData.id);
  }

  // ==================== DETAIL VIEW RENDERING ====================
  renderDetailView() {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) {
      this.switchView('events');
      return;
    }

    // Top Header
    if (this.detailCoupleName) this.detailCoupleName.textContent = ev.coupleName || 'Nama Pasangan';
    if (this.detailEventDate) this.detailEventDate.textContent = this.formatDateIndonesian(ev.date);

    const countdown = this.calculateCountdown(ev.date);
    if (this.detailCountdownBadge) {
      this.detailCountdownBadge.textContent = countdown.badgeText;
      this.detailCountdownBadge.className = `countdown-badge large ${countdown.badgeClass}`;
    }

    if (this.detailStatusPill) {
      if (ev.isArchived) {
        this.detailStatusPill.textContent = 'Diarsipkan';
        this.detailStatusPill.className = 'status-pill archived';
      } else if (countdown.daysDiff < 0) {
        this.detailStatusPill.textContent = 'Selesai';
        this.detailStatusPill.className = 'status-pill completed';
      } else {
        this.detailStatusPill.textContent = 'Mendatang';
        this.detailStatusPill.className = 'status-pill upcoming';
      }
    }

    const locations = this.getEventLocations(ev);
    if (this.detailLocationsHeaderSummary) {
      const summaryParts = locations.map(l => `${this.escapeHtml(l.label || 'Acara')}: <strong>${this.escapeHtml(l.time || '-')}</strong>`);
      this.detailLocationsHeaderSummary.innerHTML = summaryParts.join(' | ') || '-';
    }

    if (this.detailCrewCountBadge) {
      const count = ev.crew ? ev.crew.length : 0;
      this.detailCrewCountBadge.innerHTML = `${UI_ICONS.users} <span>${count} Kru Bertugas</span>`;
    }

    // Render Sub-Sections
    this.renderLocationSection(ev);
    this.renderOperationalSection(ev);
    this.renderCrewSection(ev);
    this.populateShareRecipients(ev);
    this.generateShareSummary(ev);
  }

  // ==================== MULTI-LOCATION MANAGEMENT ====================
  getEventLocations(ev) {
    if (ev.locations && Array.isArray(ev.locations) && ev.locations.length > 0) {
      return ev.locations.map((l, idx) => {
        const defaultLocName = `Lokasi ${idx + 1}`;
        let locName = (l.locName || (l.name && l.name.toLowerCase().startsWith('lokasi') ? l.name : defaultLocName)).trim();
        let eventName = (l.eventName || l.label || (l.name && !l.name.toLowerCase().startsWith('lokasi') ? l.name : (idx === 0 ? 'Resepsi' : 'Akad Nikah'))).trim();
        let time = (l.time || (l.startTime ? `${l.startTime} WIB - ${l.endTime || 'Selesai'}` : '13.00 WIB - Selesai')).trim();
        const venueName = (l.venueName && l.venueName !== '-') ? l.venueName.trim() : (l.venueType ? l.venueType.trim() : (l.name ? l.name.trim() : '-'));
        const venueAddress = (l.venueAddress && l.venueAddress !== '-') ? l.venueAddress.trim() : '-';
        const mapsUrl = (l.mapsUrl || l.customMapsUrl || '').trim();
        const notes = (l.notes || '').trim();

        return {
          ...l,
          locName,
          eventName,
          label: eventName,
          name: eventName,
          time,
          venueName,
          venueAddress,
          mapsUrl,
          notes
        };
      });
    }
    const locs = [];
    if (ev.akadTime || ev.venueName) {
      locs.push({
        id: 'loc-1',
        locName: 'Lokasi 1',
        eventName: 'Akad Nikah',
        label: 'Akad Nikah',
        name: 'Akad Nikah',
        time: ev.akadTime || '08.00 WIB - Selesai',
        venueName: ev.venueName || 'Kediaman Mempelai',
        venueAddress: ev.venueAddress || 'Alamat Belum Diisi',
        mapsUrl: ev.customMapsUrl || '',
        notes: ''
      });
    }
    if (ev.resepsiTime) {
      const idx2 = locs.length + 1;
      locs.push({
        id: `loc-${idx2}`,
        locName: `Lokasi ${idx2}`,
        eventName: 'Resepsi',
        label: 'Resepsi',
        name: 'Resepsi',
        time: ev.resepsiTime || '13.00 WIB - Selesai',
        venueName: ev.venueName || 'Kediaman Mempelai',
        venueAddress: ev.venueAddress || 'Alamat Belum Diisi',
        mapsUrl: ev.customMapsUrl || '',
        notes: ''
      });
    }
    return locs.length > 0 ? locs : [
      {
        id: 'loc-1',
        locName: 'Lokasi 1',
        eventName: 'Resepsi',
        label: 'Resepsi',
        name: 'Resepsi',
        time: '13.00 WIB - Selesai',
        venueName: ev.venueName || 'Kediaman Mempelai',
        venueAddress: ev.venueAddress || 'Alamat Belum Diisi',
        mapsUrl: ev.customMapsUrl || '',
        notes: ''
      }
    ];
  }

  renderLocationSection(ev) {
    if (!this.detailLocationsList) return;
    const locations = this.getEventLocations(ev);

    this.detailLocationsList.innerHTML = locations.map((loc, idx) => {
      const num = idx + 1;
      const mapQueryParts = [];
      if (loc.venueName) mapQueryParts.push(loc.venueName.trim());
      if (loc.venueAddress) mapQueryParts.push(loc.venueAddress.trim());
      const query = mapQueryParts.join(', ') || 'Gresik';
      const openMapsUrl = loc.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

      return `
        <div class="location-item-card">
          <div class="lic-header">
            <div class="lic-title">
              <span class="lic-number">#${num}</span>
              <span>${this.escapeHtml(loc.locName || `Lokasi ${num}`)}: ${this.escapeHtml(loc.eventName || loc.label || 'Resepsi')}</span>
            </div>
            <div class="lic-time-badge">${this.escapeHtml(loc.time || '-')}</div>
          </div>
          <div class="lic-body">
            <div class="lic-venue-name">${this.escapeHtml(loc.venueName || '-')}</div>
            <div class="lic-venue-address">${this.escapeHtml(loc.venueAddress || '-')}</div>
            ${loc.notes ? `<div class="lic-notes"><strong>Keterangan:</strong> ${this.escapeHtml(loc.notes)}</div>` : ''}
          </div>
          <div class="lic-footer">
            <a href="${openMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              ${UI_ICONS.externalMap} <span>Buka Google Maps</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  renderEventLocationFormItems(locations) {
    if (!this.eventLocationsContainer) return;
    this.eventLocationsContainer.innerHTML = '';
    locations.forEach(loc => this.addLocationFormCard(loc));
    this.updateLocationCountBadge();
  }

  addLocationFormCard(data = null) {
    if (!this.eventLocationsContainer) return;
    const card = document.createElement('div');
    card.className = 'event-location-form-card';
    card.style.background = '#FFFFFF';
    card.style.border = '1px solid var(--gold-200)';
    card.style.borderRadius = 'var(--radius-md)';
    card.style.padding = '14px 16px';
    card.style.marginBottom = '12px';
    card.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';

    const locId = data ? data.id : `loc-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    card.dataset.locationId = locId;

    const existingCount = this.eventLocationsContainer ? (this.eventLocationsContainer.querySelectorAll('.event-location-form-card').length || this.eventLocationsContainer.children.length) : 0;
    const defaultIndex = existingCount + 1;

    const locName = data ? (data.locName || (data.name && data.name.toLowerCase().startsWith('lokasi') ? data.name : `Lokasi ${defaultIndex}`)) : `Lokasi ${defaultIndex}`;
    const eventName = data ? (data.eventName || data.label || data.name || (defaultIndex === 1 ? 'Resepsi' : 'Akad Nikah')) : (defaultIndex === 1 ? 'Resepsi' : 'Akad Nikah');
    const time = data ? (data.time || '13.00 WIB - Selesai') : (defaultIndex === 1 ? '13.00 WIB - Selesai' : '08.00 WIB - Selesai');
    const venueName = data ? (data.venueName || data.venueType || '') : '';
    const venueAddress = data ? (data.venueAddress || '') : '';
    const mapsUrl = data ? (data.mapsUrl || data.customMapsUrl || '') : '';
    const notes = data ? (data.notes || '') : '';

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:6px; border-bottom:1px dashed #E2E8F0;">
        <span class="loc-card-badge" style="font-weight:800; font-size:0.82rem; color:var(--gold-dark); background:#FAF6ED; padding:3px 10px; border-radius:6px; border:1px solid var(--gold-300);">
          ${this.escapeHtml(locName)}
        </span>
        <button type="button" class="btn-remove-loc" style="background:none; border:none; color:#DC2626; font-size:0.82rem; font-weight:700; cursor:pointer;">&times; Hapus Acara</button>
      </div>

      <!-- Baris 1: Lokasi Manual & Waktu Jam Acara -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
        <div>
          <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
            Lokasi (Manual) <span class="required">*</span>
          </label>
          <input type="text" class="form-control input-loc-name" value="${this.escapeHtml(locName)}" placeholder="Cth: Lokasi 1 / Lokasi 2 / Kediaman Mempelai" required>
        </div>
        <div>
          <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
            Waktu / Jam Acara <span class="required">*</span>
          </label>
          <input type="text" class="form-control input-loc-time" value="${this.escapeHtml(time)}" placeholder="Cth: 13.00 WIB - Selesai" required>
        </div>
      </div>

      <!-- Baris 2: Nama Acara (di bawah Lokasi) -->
      <div style="margin-bottom:10px;">
        <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
          Nama Acara <span class="required">*</span>
        </label>
        <input type="text" class="form-control input-loc-event-name input-loc-label" value="${this.escapeHtml(eventName)}" placeholder="Cth: Resepsi / Akad Nikah / Temu Manten" required>
      </div>

      <!-- Baris 3: Nama Tempat / Gedung / Kediaman -->
      <div style="margin-bottom:10px;">
        <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
          Nama Tempat / Gedung / Kediaman
        </label>
        <input type="text" class="form-control input-loc-venue-name" value="${this.escapeHtml(venueName)}" placeholder="Cth: Kediaman Mempelai Wanita">
      </div>

      <!-- Baris 4: Alamat Lengkap -->
      <div style="margin-bottom:10px;">
        <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
          Alamat Lengkap
        </label>
        <input type="text" class="form-control input-loc-venue-address" value="${this.escapeHtml(venueAddress)}" placeholder="Dsn. Dukuh, Desa Bungah, Gresik">
      </div>

      <!-- Baris 5: Link Google Maps -->
      <div style="margin-bottom:10px;">
        <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-primary); display:block;">
          Link Google Maps (Opsional)
        </label>
        <input type="text" class="form-control input-loc-maps-url" value="${this.escapeHtml(mapsUrl)}" placeholder="https://maps.app.goo.gl/...">
      </div>

      <!-- Baris 6: Keterangan Khusus Lokasi Ini -->
      <div>
        <label class="form-label" style="font-size:0.78rem; font-weight:700; margin-bottom:4px; color:var(--ink-secondary); display:block;">
          Keterangan Khusus Lokasi Ini
        </label>
        <input type="text" class="form-control input-loc-notes" value="${this.escapeHtml(notes)}" placeholder="Cth: Area parkir tamu di lapangan terdekat">
      </div>
    `;

    // Live update badge as user types in input-loc-name
    const inputLoc = card.querySelector('.input-loc-name');
    const badge = card.querySelector('.loc-card-badge');
    if (inputLoc && badge) {
      inputLoc.addEventListener('input', () => {
        badge.textContent = inputLoc.value.trim() || 'Lokasi';
      });
    }

    const btnRemove = card.querySelector('.btn-remove-loc');
    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        card.remove();
        this.reindexLocationFormCards();
        this.updateLocationCountBadge();
      });
    }

    this.eventLocationsContainer.appendChild(card);
    this.reindexLocationFormCards();
    this.updateLocationCountBadge();
  }

  reindexLocationFormCards() {
    if (!this.eventLocationsContainer) return;
    const cards = this.eventLocationsContainer.querySelectorAll('.event-location-form-card');
    cards.forEach((c, i) => {
      const badge = c.querySelector('.loc-card-badge');
      const inputLoc = c.querySelector('.input-loc-name');
      const val = inputLoc ? inputLoc.value.trim() : '';
      if (badge) badge.textContent = val || `Lokasi ${i + 1}`;
    });
  }

  updateLocationCountBadge() {
    if (!this.badgeLocationCount || !this.eventLocationsContainer) return;
    const count = this.eventLocationsContainer.querySelectorAll('.event-location-form-card').length || (this.eventLocationsContainer.children ? this.eventLocationsContainer.children.length : 0);
    this.badgeLocationCount.textContent = `${count} Acara`;
  }

  // ==================== OPERATIONAL BRIEFING PRESET (HARVY EXCEL DATA) ====================
  classifyPackageLines(pkg) {
    const splitClean = (str) => (str || '')
      .replace(/\r/g, '')
      .split('\n')
      .map(s => s.trim())
      .filter(s => s && s !== '-');

    const attireItems = [];
    const flowerItems = [];
    const henaItems = [];
    const decorItems = [];
    const entertainmentItems = [];
    const docItems = [];
    const equipmentItems = [];

    const addUnique = (arr, item) => {
      const clean = item.replace(/^•\s*/, '').trim();
      if (!clean) return;
      const lower = clean.toLowerCase();
      if (!arr.some(existing => existing.toLowerCase() === lower)) {
        arr.push(clean);
      }
    };

    const categorizeSingleLine = (line, sourceHint) => {
      const l = line.toLowerCase();
      // 1. Hena & Nail Art
      if (l.includes('hena') || l.includes('henna') || l.includes('nail art')) {
        addUnique(henaItems, line);
        return;
      }
      // 2. Bunga / Melati / Buket
      if (l.includes('melati') || l.includes('buket') || sourceHint === 'flowers') {
        addUnique(flowerItems, line);
        return;
      }
      // 3. Rias, Gaun, Gown, Kebaya, Jas, Busana
      if (
        l.includes('gaun') ||
        l.includes('gown') ||
        l.includes('kebaya') ||
        l.includes('rias') ||
        l.includes('make up') ||
        l.includes('makeup') ||
        l.includes('domas') ||
        l.includes('penggapit') ||
        l.includes('terima tamu') ||
        l.includes('orang tua') ||
        l.includes('besan') ||
        sourceHint === 'makeup'
      ) {
        addUnique(attireItems, line);
        return;
      }
      // 4. Dokumentasi (Foto, Video, Album, Frame, File, Flashdisk)
      if (
        l.includes('foto') ||
        l.includes('video') ||
        l.includes('liputan') ||
        l.includes('cinematic') ||
        l.includes('sinematik') ||
        l.includes('flashdisk') ||
        l.includes('semua file') ||
        l.includes('album') ||
        l.includes('20r') ||
        l.includes('pigura') ||
        l.includes('frame') ||
        sourceHint === 'docs'
      ) {
        // Watch out: in Gresik/Lamongan/Luar Kota Excel sheets, 'MC' was placed in the docs column
        if (l === 'mc' || l.startsWith('mc ') || l.includes('electone') || l.includes('dry smoke')) {
          addUnique(entertainmentItems, line);
        } else {
          addUnique(docItems, line);
        }
        return;
      }
      // 5. Efek & Hiburan (MC, Electone, Dry Smoke)
      if (
        l === 'mc' ||
        l.startsWith('mc ') ||
        l.includes('electone') ||
        l.includes('elekton') ||
        l.includes('penyanyi') ||
        l.includes('dry smoke') ||
        l.includes('kembang api') ||
        sourceHint === 'effects'
      ) {
        addUnique(entertainmentItems, line);
        return;
      }
      // 6. Dekorasi
      if (
        sourceHint === 'decor' ||
        l.includes('dekor') ||
        l.includes('backdrop') ||
        l.includes('pintu masuk') ||
        l.includes('tumbang') ||
        l.includes('welcome sign') ||
        l.includes('lengkungan') ||
        l.includes('panggung kaca') ||
        l.includes('meja kursi akad')
      ) {
        addUnique(decorItems, line);
        return;
      }
      // 7. Default to Perlengkapan / Equipment
      addUnique(equipmentItems, line);
    };

    splitClean(pkg.makeup).forEach(line => categorizeSingleLine(line, 'makeup'));
    splitClean(pkg.flowers).forEach(line => categorizeSingleLine(line, 'flowers'));
    splitClean(pkg.decor).forEach(line => categorizeSingleLine(line, 'decor'));
    splitClean(pkg.effects).forEach(line => categorizeSingleLine(line, 'effects'));
    splitClean(pkg.docs || pkg.documentation).forEach(line => categorizeSingleLine(line, 'docs'));
    splitClean(pkg.equipment).forEach(line => categorizeSingleLine(line, 'equipment'));
    splitClean(pkg.otherItems).forEach(line => categorizeSingleLine(line, 'other'));

    // Combine attire items if "Rias" and "Gown" are separate single-word lines (e.g. Prewedding)
    const riasIdx = attireItems.findIndex(x => x.toLowerCase() === 'rias');
    const gownIdx = attireItems.findIndex(x => x.toLowerCase() === 'gown');
    if (riasIdx !== -1 && gownIdx !== -1) {
      attireItems.splice(Math.max(riasIdx, gownIdx), 1);
      attireItems[Math.min(riasIdx, gownIdx)] = 'Rias & Gown Pengantin (Sesi Prewedding Outdoor)';
    }

    // Merge "Rias manten + 2 gown" and "Bonus gaun akad" into one clear line if both exist
    const rmIdx = attireItems.findIndex(x => x.toLowerCase() === 'rias manten + 2 gown');
    const bonusIdx = attireItems.findIndex(x => x.toLowerCase() === 'bonus gaun akad');
    if (rmIdx !== -1 && bonusIdx !== -1) {
      attireItems.splice(bonusIdx, 1);
      const targetIdx = attireItems.findIndex(x => x.toLowerCase() === 'rias manten + 2 gown');
      if (targetIdx !== -1) {
        attireItems[targetIdx] = 'Rias manten + 2 gown (bonus gaun akad)';
      }
    }

    // Final deduplication pass on attireItems
    const uniqueAttire = [];
    attireItems.forEach(item => addUnique(uniqueAttire, item));

    return {
      attireItems: uniqueAttire,
      flowerItems,
      henaItems,
      decorItems,
      entertainmentItems,
      docItems,
      equipmentItems
    };
  }

  applyOperationalPackageTemplate(pkgId) {
    if (!pkgId) {
      this.showToast('Silakan pilih salah satu paket Harvy dari dropdown.', 'warning');
      return;
    }
    const pkg = (this.harvyPackages || HARVY_PACKAGES).find(p => p.id === pkgId);
    if (!pkg) {
      this.showToast('Data paket tidak ditemukan.', 'danger');
      return;
    }

    const cleanPkgTitle = /^paket\b/i.test(pkg.name.trim()) ? pkg.name.trim() : `Paket ${pkg.name.trim()}`;
    const areaSuffix = cleanPkgTitle.toLowerCase().includes((pkg.area || '').toLowerCase().replace(/^area\s+/i, '')) ? '' : ` (${pkg.area})`;
    const classified = this.classifyPackageLines(pkg);

    // 1. Build Rincian Rias, Gaun & Busana Pengantin (textareaAttireNotes)
    const attireLines = [`${cleanPkgTitle}${areaSuffix} :`];

    classified.attireItems.forEach(item => {
      const lower = item.toLowerCase();
      if (lower.includes('gaun') || lower.includes('gown') || lower.includes('kebaya')) {
        attireLines.push(`• Busana & Rias: ${item}`);
      } else {
        attireLines.push(`• ${item}`);
      }
    });

    // For Prewedding, also add theme info if notes mention 2 tema
    if (pkg.name.toLowerCase().includes('prewed') && pkg.notes && pkg.notes.toLowerCase().includes('2 tema')) {
      attireLines.push('• Tema Busana: 2 tema (Formal & Casual / baju sendiri)');
    }

    if (classified.flowerItems.length > 0) {
      attireLines.push(`• Bunga & Melati: ${classified.flowerItems.join(', ')}`);
    }
    if (classified.henaItems.length > 0) {
      attireLines.push(`• Henna & Art: ${classified.henaItems.join(', ')}`);
    }

    if (this.textareaAttireNotes) {
      this.textareaAttireNotes.value = attireLines.join('\n');
    }

    // 2. Build Dekorasi, Dokumentasi, Hiburan & Logistik Paket (textareaLogisticsNotes)
    const logisticsLines = [`Fasilitas ${cleanPkgTitle}${areaSuffix} :`];

    if (classified.equipmentItems.length > 0) {
      classified.equipmentItems.forEach(eq => logisticsLines.push(`• Perlengkapan: ${eq}`));
    }
    if (classified.decorItems.length > 0) {
      logisticsLines.push(`• Dekorasi: ${classified.decorItems.join(', ')}`);
    }
    if (classified.entertainmentItems.length > 0) {
      logisticsLines.push(`• Acara & Hiburan: ${classified.entertainmentItems.join(', ')}`);
    }
    if (classified.docItems.length > 0) {
      logisticsLines.push(`• Dokumentasi: ${classified.docItems.join(', ')}`);
    }

    if (
      classified.equipmentItems.length === 0 &&
      classified.decorItems.length === 0 &&
      classified.entertainmentItems.length === 0 &&
      classified.docItems.length === 0
    ) {
      logisticsLines.push('• Paket khusus Rias & Busana (Tidak termasuk tenda, dekorasi, MC & dokumentasi)');
      logisticsLines.push('• Gunakan menu "+ Tambah Logistik Satuan" di atas bila ada sewa perlengkapan tambahan');
    }

    if (this.textareaLogisticsNotes) {
      this.textareaLogisticsNotes.value = logisticsLines.join('\n');
    }

    // 3. Build Keterangan & Ketentuan Paket (textareaSpecialNotes)
    const specialLines = [];
    if (pkg.notes) {
      pkg.notes.replace(/\r/g, '').split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
        specialLines.push(`• ${l}`);
      });
    }
    if (pkg.extraCost) {
      pkg.extraCost.replace(/\r/g, '').split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
        specialLines.push(`• Opsional / Biaya Tambahan: ${l}`);
      });
    }
    if (!pkg.name.toLowerCase().includes('prewed')) {
      specialLines.push('• Konfirmasi ke admin bila ada acara tambahan (banjari, elekton, dll.)');
    }
    if (this.textareaSpecialNotes) {
      this.textareaSpecialNotes.value = specialLines.join('\n');
    }

    this.showToast(`Rincian ${cleanPkgTitle} (${pkg.area}) berhasil diterapkan sesuai isi paket!`, 'success');
  }

  appendQuickRentalToLogistics() {
    if (!this.selectQuickRentalAddon || !this.selectQuickRentalAddon.value) {
      this.showToast('Pilih item sewa tambahan terlebih dahulu.', 'warning');
      return;
    }
    const val = this.selectQuickRentalAddon.value;
    let currentVal = this.textareaLogisticsNotes ? this.textareaLogisticsNotes.value.trim() : '';
    if (currentVal) {
      currentVal = currentVal
        .split('\n')
        .filter(line => !line.includes('Paket khusus Rias & Busana') && !line.includes('Gunakan menu "+ Tambah Logistik Satuan"'))
        .join('\n')
        .trim();
    }
    const lineToAdd = `• Tambahan: ${val}`;
    if (this.textareaLogisticsNotes) {
      this.textareaLogisticsNotes.value = currentVal ? `${currentVal}\n${lineToAdd}` : lineToAdd;
    }
    this.showToast(`Item "${val}" berhasil disisipkan ke daftar logistik!`, 'success');
  }

  // ==================== OPERATIONAL SECTION IN DETAIL ====================
  renderOperationalSection(ev) {
    if (!this.detailOperationalContent) return;
    const cards = [];

    const parents = [];
    if (ev.fatherName) parents.push(`Bpk. ${ev.fatherName}`);
    if (ev.motherName) parents.push(`Ibu ${ev.motherName}`);
    const parentsStr = parents.join(' & ') || '-';
    const clientPhone = ev.clientPhone || '-';
    const cleanPhone = this.formatWhatsAppPhone(clientPhone);
    const waClientLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

    cards.push(`
      <div class="operational-box">
        <div class="operational-box-header">
          <div class="operational-box-title">
            <span class="op-icon-chip">${UI_ICONS.couple}</span><span>MEMPELAI &amp; KONTAK KLIEN</span>
          </div>
          <span class="operational-tag-pill">Klien Inti</span>
        </div>
        <div class="operational-box-content">
          <div><strong>Mempelai:</strong> ${this.escapeHtml(ev.coupleName || '-')}</div>
          <div><strong>Orang Tua:</strong> ${this.escapeHtml(parentsStr)}</div>
          <div><strong>Instagram:</strong> ${this.escapeHtml(ev.clientIg || '-')}</div>
          <div style="margin-top:6px; display:flex; align-items:center; gap:8px;">
            <strong>No. HP/WA:</strong> ${this.escapeHtml(clientPhone)}
            ${waClientLink ? `<a href="${waClientLink}" target="_blank" rel="noopener noreferrer" class="badge-mini" style="background:#25D366; color:#FFF; text-decoration:none; font-weight:700;">Chat WA</a>` : ''}
          </div>
        </div>
      </div>
    `);

    cards.push(`
      <div class="operational-box">
        <div class="operational-box-header">
          <div class="operational-box-title">
            <span class="op-icon-chip">${UI_ICONS.dress}</span><span>RIAS, GAUN &amp; BUSANA PENGANTIN</span>
          </div>
          <span class="operational-tag-pill">Rias &amp; Busana</span>
        </div>
        <div class="operational-box-content" style="white-space:pre-wrap;">${this.escapeHtml(ev.attireNotes || 'Urutan gaun belum diatur.')}</div>
      </div>
    `);

    cards.push(`
      <div class="operational-box">
        <div class="operational-box-header">
          <div class="operational-box-title">
            <span class="op-icon-chip">${UI_ICONS.tent}</span><span>DEKORASI, DOKUMENTASI &amp; LOGISTIK PAKET</span>
          </div>
          <span class="operational-tag-pill">Fasilitas &amp; Logistik</span>
        </div>
        <div class="operational-box-content" style="white-space:pre-wrap;">${this.escapeHtml(ev.logisticsNotes || 'Logistik belum diatur.')}</div>
      </div>
    `);

    const ketText = ev.specialNotes || ev.notes || '';
    if (ketText) {
      cards.push(`
        <div class="operational-box">
          <div class="operational-box-header">
            <div class="operational-box-title">
              <span class="op-icon-chip">${UI_ICONS.note}</span><span>KETERANGAN</span>
            </div>
            <span class="operational-tag-pill">Instruksi Khusus</span>
          </div>
          <div class="operational-box-content" style="white-space:pre-wrap;">${this.escapeHtml(ketText)}</div>
        </div>
      `);
    }

    this.detailOperationalContent.innerHTML = `<div class="operational-grid">${cards.join('')}</div>`;
  }

  // ==================== CREW & BRIEFING IN DETAIL VIEW ====================
  renderCrewSection(ev) {
    if (this.detailCrewCountBadge) {
      const count = ev && ev.crew ? ev.crew.length : 0;
      this.detailCrewCountBadge.innerHTML = `${UI_ICONS.users} <span>${count} Kru Bertugas</span>`;
    }
    if (!this.detailCrewList) return;
    const crewMembers = ev.crew || [];

    if (crewMembers.length === 0) {
      this.detailCrewList.innerHTML = '';
      if (this.crewEmptyState) this.crewEmptyState.classList.remove('hidden');
      return;
    }

    if (this.crewEmptyState) this.crewEmptyState.classList.add('hidden');

    this.detailCrewList.innerHTML = crewMembers.map((c) => {
      const cleanPhone = this.formatWhatsAppPhone(c.phone);
      const personalMsg = this.buildComprehensiveWAMessage(ev, c, false, this.shareEmojiMode);
      const waSendUrl = cleanPhone
        ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(personalMsg)}`
        : '';

      return `
        <div class="crew-card-item">
          <div class="crew-card-left">
            <div class="crew-card-avatar">${this.escapeHtml((c.name || 'KR').substring(0, 2).toUpperCase())}</div>
            <div class="crew-card-info">
              <div class="crew-card-name">${this.escapeHtml(c.name)}</div>
              <div class="crew-card-role">${this.escapeHtml(c.role)}</div>
              ${c.phone ? `<div class="crew-card-contact">${UI_ICONS.phone} <span>${this.escapeHtml(c.phone)}</span></div>` : `<div class="crew-card-contact" style="color:var(--ink-faint); font-style:italic;">Tanpa nomor WA</div>`}
              ${c.notes ? `<div class="crew-card-notes">${UI_ICONS.note} <span>${this.escapeHtml(c.notes)}</span></div>` : ''}
            </div>
          </div>
          <div class="crew-card-actions">
            ${waSendUrl ? `
              <button type="button" class="btn btn-whatsapp btn-sm" onclick="window.app.sendCrewWhatsAppDirect('${c.id}')" title="Kirim briefing personal ke nomor kru ini via WhatsApp">
                ${UI_ICONS.whatsapp} <span>Kirim WA</span>
              </button>
            ` : ''}
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.app.openCrewModal('edit', '${c.id}')" title="Edit data kru ini" style="padding: 5px 10px; font-size: 0.76rem;">
              ${UI_ICONS.edit} <span>Edit</span></button>
            <button type="button" class="btn-icon-danger" onclick="window.app.removeCrewFromEvent('${c.id}')" title="Hapus kru dari acara ini">
              &times;
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  sendCrewWhatsAppDirect(crewId) {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) return;
    const crew = (ev.crew || []).find(c => c.id === crewId);
    if (!crew) return;

    const cleanPhone = this.formatWhatsAppPhone(crew.phone);
    if (!cleanPhone) {
      this.showToast('Nomor WhatsApp kru tidak valid.', 'warning');
      return;
    }

    const text = this.buildComprehensiveWAMessage(ev, crew, false, this.shareEmojiMode);
    this.copyToClipboard(text, `Membuka WhatsApp untuk ${crew.name}... Teks juga otomatis disalin!`);
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  removeCrewFromEvent(crewId) {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) return;
    ev.crew = (ev.crew || []).filter(c => c.id !== crewId);
    this.saveEvents();
    this.updateMetrics();
    this.renderCrewSection(ev);
    this.populateShareRecipients(ev);
    this.generateShareSummary(ev);
    this.showToast('Kru berhasil dihapus dari acara ini.', 'info');
  }

  // ==================== FAST CREW PICKER MODAL ====================
  openSelectMasterModal() {
    const ev = this.events.find(x => x.id === this.currentEventId);
    const masterIds = new Set(this.masterCrew.map(m => m.id));
    this.selectedMasterCrewIds = new Set(
      (ev?.crew || [])
        .filter(c => masterIds.has(c.id))
        .map(c => c.id)
    );
    if (this.inputSearchInMasterModal) this.inputSearchInMasterModal.value = '';
    if (this.modalSelectMasterCrewBackdrop) {
      this.modalSelectMasterCrewBackdrop.classList.add('active');
      this.renderSelectMasterList();
    }
  }

  closeSelectMasterModal() {
    if (this.modalSelectMasterCrewBackdrop) {
      this.modalSelectMasterCrewBackdrop.classList.remove('active');
    }
  }

  updateSelectedMasterCountLabel() {
    if (!this.labelSelectedMasterCount) return;
    const count = this.selectedMasterCrewIds ? this.selectedMasterCrewIds.size : 0;
    this.labelSelectedMasterCount.textContent = `${count} kru terpilih`;
  }

  renderSelectMasterList() {
    if (!this.listSelectMasterCrew) return;
    if (!this.selectedMasterCrewIds) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      this.selectedMasterCrewIds = new Set((ev?.crew || []).map(c => c.id));
    }
    const query = this.inputSearchInMasterModal ? this.inputSearchInMasterModal.value.toLowerCase().trim() : '';

    let list = this.masterCrew;
    if (query) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query) ||
        (c.phone && c.phone.includes(query))
      );
    }

    this.updateSelectedMasterCountLabel();

    if (list.length === 0) {
      this.listSelectMasterCrew.innerHTML = '<div style="padding:20px; text-align:center; color:var(--ink-secondary);">Tidak ada kru yang cocok.</div>';
      return;
    }

    this.listSelectMasterCrew.innerHTML = list.map(c => {
      const isChecked = this.selectedMasterCrewIds.has(c.id);
      return `
        <label class="select-crew-row" style="display:flex; align-items:center; gap:12px; padding:8px 12px; border-bottom:1px solid #E2E8F0; cursor:pointer;">
          <input type="checkbox" class="check-master-crew" value="${c.id}" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--gold-500);">
          <div style="flex:1;">
            <div style="font-weight:700; color:var(--ink-primary); font-size:0.9rem;">${this.escapeHtml(c.name)}</div>
            <div style="font-size:0.78rem; color:var(--gold-dark); font-weight:600;">${this.escapeHtml(c.role)}</div>
            ${c.phone ? `<div style="font-size:0.75rem; color:#64748B;">${UI_ICONS.phone} <span>${this.escapeHtml(c.phone)}</span></div>` : ''}
          </div>
        </label>
      `;
    }).join('');

    this.listSelectMasterCrew.querySelectorAll('.check-master-crew').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.value;
        if (e.target.checked) {
          this.selectedMasterCrewIds.add(id);
        } else {
          this.selectedMasterCrewIds.delete(id);
        }
        this.updateSelectedMasterCountLabel();
      });
    });
  }

  selectAllMasterModal(selectAll) {
    if (!this.listSelectMasterCrew) return;
    if (!this.selectedMasterCrewIds) this.selectedMasterCrewIds = new Set();
    this.listSelectMasterCrew.querySelectorAll('.check-master-crew').forEach(cb => {
      cb.checked = selectAll;
      if (selectAll) {
        this.selectedMasterCrewIds.add(cb.value);
      } else {
        this.selectedMasterCrewIds.delete(cb.value);
      }
    });
    this.updateSelectedMasterCountLabel();
  }

  confirmAssignMasterCrew() {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) return;

    let selectedIds = this.selectedMasterCrewIds;
    if (!selectedIds || selectedIds.size === 0) {
      const checkedBoxes = this.listSelectMasterCrew ? this.listSelectMasterCrew.querySelectorAll('.check-master-crew:checked') : [];
      selectedIds = new Set(Array.from(checkedBoxes).map(cb => cb.value));
    }

    // Retain custom non-master crew
    const nonMasterCrew = (ev.crew || []).filter(c => !this.masterCrew.some(m => m.id === c.id));
    const newlyAssigned = this.masterCrew.filter(m => selectedIds.has(m.id)).map(m => ({ ...m }));

    ev.crew = [...newlyAssigned, ...nonMasterCrew];
    this.saveEvents();
    this.updateMetrics();
    this.closeSelectMasterModal();
    this.renderCrewSection(ev);
    this.populateShareRecipients(ev);
    this.generateShareSummary(ev);
    this.showToast(`${newlyAssigned.length} kru dari Master Kru berhasil ditugaskan!`, 'success');
  }

  // ==================== CUSTOM CREW MODAL ====================
  openCrewModal(mode = 'add', crewId = null) {
    const presetRoles = ['Asisten', 'Perias', 'Fotografer', 'Sopir Logistik', 'MC'];
    if (mode === 'edit' && crewId) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      const crew = (ev?.crew || []).find(c => c.id === crewId);
      if (!crew) return;

      this.inputCrewId.value = crew.id;
      this.modalCrewTitle.textContent = 'Edit Kru Bertugas';
      this.inputCrewName.value = crew.name || '';
      const roleVal = (crew.role || '').trim();
      if (presetRoles.includes(roleVal)) {
        this.selectCrewRole.value = roleVal;
        if (this.boxCrewCustomRole) this.boxCrewCustomRole.classList.add('hidden');
        if (this.inputCrewCustomRole) this.inputCrewCustomRole.value = '';
      } else {
        this.selectCrewRole.value = 'MANUAL';
        if (this.boxCrewCustomRole) this.boxCrewCustomRole.classList.remove('hidden');
        if (this.inputCrewCustomRole) this.inputCrewCustomRole.value = roleVal;
      }
      this.inputCrewPhone.value = crew.phone || '';
      this.inputCrewEmail.value = crew.email || '';
      if (this.textareaCrewNotes) this.textareaCrewNotes.value = crew.notes || '';
    } else {
      this.inputCrewId.value = '';
      this.modalCrewTitle.textContent = 'Tambah Kru Bertugas';
      this.formCrew.reset();
      if (this.selectCrewRole) this.selectCrewRole.value = 'Asisten';
      if (this.boxCrewCustomRole) this.boxCrewCustomRole.classList.add('hidden');
      if (this.inputCrewCustomRole) this.inputCrewCustomRole.value = '';
      if (this.textareaCrewNotes) this.textareaCrewNotes.value = '';
    }

    if (this.modalCrewBackdrop) this.modalCrewBackdrop.classList.add('active');
  }

  closeCrewModal() {
    if (this.modalCrewBackdrop) this.modalCrewBackdrop.classList.remove('active');
  }

  handleCrewFormSubmit(e) {
    e.preventDefault();
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) return;

    const name = this.inputCrewName.value.trim();
    if (!name) {
      this.showToast('Nama kru wajib diisi!', 'warning');
      return;
    }

    let finalRole = this.selectCrewRole ? this.selectCrewRole.value : 'Asisten';
    if (finalRole === 'MANUAL') {
      finalRole = this.inputCrewCustomRole ? this.inputCrewCustomRole.value.trim() : '';
      if (!finalRole) {
        this.showToast('Silakan ketik jabatan manual terlebih dahulu!', 'warning');
        if (this.inputCrewCustomRole) this.inputCrewCustomRole.focus();
        return;
      }
    }

    const crewId = this.inputCrewId.value;
    const isEdit = !!crewId;
    const existingCrew = isEdit ? (ev.crew || []).find(c => c.id === crewId) : null;

    const crewData = {
      id: isEdit ? crewId : `crew-${Date.now()}`,
      name,
      role: finalRole || 'Asisten',
      phone: this.inputCrewPhone ? this.inputCrewPhone.value.trim() : '',
      email: this.inputCrewEmail ? this.inputCrewEmail.value.trim() : '',
      notes: this.textareaCrewNotes ? this.textareaCrewNotes.value.trim() : (existingCrew?.notes || '')
    };

    if (!ev.crew) ev.crew = [];

    if (isEdit) {
      const idx = ev.crew.findIndex(c => c.id === crewId);
      if (idx !== -1) ev.crew[idx] = crewData;
    } else {
      ev.crew.push(crewData);
    }

    if (this.chkSaveToMasterAlso && this.chkSaveToMasterAlso.checked) {
      const masterIdx = this.masterCrew.findIndex(
        m => m.id === crewData.id || (m.name || '').toLowerCase() === name.toLowerCase()
      );
      if (masterIdx !== -1) {
        this.masterCrew[masterIdx] = {
          ...this.masterCrew[masterIdx],
          name: crewData.name,
          role: crewData.role,
          phone: crewData.phone,
          email: crewData.email,
          notes: crewData.notes
        };
      } else {
        this.masterCrew.push({
          id: `mc-${Date.now()}`,
          name: crewData.name,
          role: crewData.role,
          phone: crewData.phone,
          email: crewData.email,
          notes: crewData.notes
        });
      }
      this.saveMasterCrew();
      if (this.navMasterCrewCount) this.navMasterCrewCount.textContent = this.masterCrew.length;
    }

    this.saveEvents();
    this.updateMetrics();
    this.closeCrewModal();
    this.renderCrewSection(ev);
    this.populateShareRecipients(ev);
    this.generateShareSummary(ev);
    this.showToast(isEdit ? 'Data kru diperbarui!' : 'Kru baru ditambahkan ke acara!', 'success');
  }

  // ==================== MASTER CREW DIRECTORY ====================
  renderMasterCrewList() {
    if (!this.masterCrewGridContainer) return;
    const query = this.inputSearchMasterCrew ? this.inputSearchMasterCrew.value.toLowerCase().trim() : '';
    const roleFilter = this.selectMasterRoleFilter ? this.selectMasterRoleFilter.value : 'ALL';

    let list = this.masterCrew;

    if (roleFilter !== 'ALL') {
      const presetMap = {
        'Asisten': ['asisten', 'runner'],
        'Perias': ['perias', 'mua'],
        'Fotografer': ['fotografer', 'foto'],
        'Sopir Logistik': ['sopir', 'supir', 'logistik'],
        'MC': ['mc', 'master of ceremony']
      };
      if (roleFilter === 'OTHER') {
        const allPresetKeywords = Object.values(presetMap).flat();
        list = list.filter(c => {
          const r = (c.role || '').toLowerCase();
          return !allPresetKeywords.some(k => r.includes(k));
        });
      } else if (presetMap[roleFilter]) {
        const keywords = presetMap[roleFilter];
        list = list.filter(c => {
          const r = (c.role || '').toLowerCase();
          return keywords.some(k => r.includes(k));
        });
      } else {
        list = list.filter(c => (c.role || '').toLowerCase().includes(roleFilter.toLowerCase()));
      }
    }

    if (query) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query) ||
        (c.phone && c.phone.includes(query)) ||
        (c.notes && c.notes.toLowerCase().includes(query))
      );
    }

    if (this.navMasterCrewCount) {
      this.navMasterCrewCount.textContent = this.masterCrew.length;
    }

    if (list.length === 0) {
      this.masterCrewGridContainer.innerHTML = '';
      if (this.masterCrewEmptyState) this.masterCrewEmptyState.classList.remove('hidden');
      return;
    }

    if (this.masterCrewEmptyState) this.masterCrewEmptyState.classList.add('hidden');

    this.masterCrewGridContainer.innerHTML = list.map(c => `
      <div class="master-crew-card">
        <div class="mc-card-header">
          <div class="mc-avatar">${this.escapeHtml(c.name.substring(0, 2).toUpperCase())}</div>
          <div class="mc-title-group">
            <div class="mc-name">${this.escapeHtml(c.name)}</div>
            <div class="mc-role">${this.escapeHtml(c.role)}</div>
          </div>
        </div>
        <div class="mc-card-body">
          ${c.phone ? `<div class="mc-contact-item">${UI_ICONS.phone} <span>${this.escapeHtml(c.phone)}</span></div>` : ''}
          ${c.email ? `<div class="mc-contact-item">${UI_ICONS.mail} <span>${this.escapeHtml(c.email)}</span></div>` : ''}
          ${c.notes ? `<div class="mc-notes-item">${UI_ICONS.note} <span>${this.escapeHtml(c.notes)}</span></div>` : ''}
        </div>
        <div class="mc-card-footer" style="display:flex; justify-content:flex-end; gap:8px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.app.openMasterCrewModal('${c.id}')">${UI_ICONS.edit} <span>Edit</span></button>
          <button type="button" class="btn btn-ghost btn-sm" style="color:#DC2626;" onclick="window.app.deleteMasterCrew('${c.id}')">${UI_ICONS.trash} <span>Hapus</span></button>
        </div>
      </div>
    `).join('');
  }

  openMasterCrewModal(crewId = null) {
    const presetRoles = ['Asisten', 'Perias', 'Fotografer', 'Sopir Logistik', 'MC'];
    if (crewId) {
      const c = this.masterCrew.find(x => x.id === crewId);
      if (!c) return;

      this.inputMasterCrewId.value = c.id;
      this.modalMasterCrewTitle.textContent = 'Edit Anggota Master Kru';
      this.inputMasterCrewName.value = c.name || '';
      const roleVal = (c.role || '').trim();
      if (presetRoles.includes(roleVal)) {
        this.selectMasterCrewRole.value = roleVal;
        if (this.boxMasterCrewCustomRole) this.boxMasterCrewCustomRole.classList.add('hidden');
        if (this.inputMasterCrewCustomRole) this.inputMasterCrewCustomRole.value = '';
      } else {
        this.selectMasterCrewRole.value = 'MANUAL';
        if (this.boxMasterCrewCustomRole) this.boxMasterCrewCustomRole.classList.remove('hidden');
        if (this.inputMasterCrewCustomRole) this.inputMasterCrewCustomRole.value = roleVal;
      }
      this.inputMasterCrewPhone.value = c.phone || '';
      this.inputMasterCrewEmail.value = c.email || '';
      if (this.textareaMasterCrewNotes) this.textareaMasterCrewNotes.value = c.notes || '';
    } else {
      this.inputMasterCrewId.value = '';
      this.modalMasterCrewTitle.textContent = 'Tambah Anggota Master Kru';
      this.formMasterCrew.reset();
      if (this.selectMasterCrewRole) this.selectMasterCrewRole.value = 'Asisten';
      if (this.boxMasterCrewCustomRole) this.boxMasterCrewCustomRole.classList.add('hidden');
      if (this.inputMasterCrewCustomRole) this.inputMasterCrewCustomRole.value = '';
    }

    if (this.modalMasterCrewBackdrop) this.modalMasterCrewBackdrop.classList.add('active');
  }

  closeMasterCrewModal() {
    if (this.modalMasterCrewBackdrop) this.modalMasterCrewBackdrop.classList.remove('active');
  }

  handleMasterCrewFormSubmit(e) {
    e.preventDefault();
    const name = this.inputMasterCrewName.value.trim();
    if (!name) {
      this.showToast('Nama kru wajib diisi!', 'warning');
      return;
    }

    let finalRole = this.selectMasterCrewRole ? this.selectMasterCrewRole.value : 'Asisten';
    if (finalRole === 'MANUAL') {
      finalRole = this.inputMasterCrewCustomRole ? this.inputMasterCrewCustomRole.value.trim() : '';
      if (!finalRole) {
        this.showToast('Silakan ketik jabatan manual terlebih dahulu!', 'warning');
        if (this.inputMasterCrewCustomRole) this.inputMasterCrewCustomRole.focus();
        return;
      }
    }

    const crewId = this.inputMasterCrewId.value;
    const isEdit = !!crewId;

    const crewData = {
      id: isEdit ? crewId : `mc-${Date.now()}`,
      name,
      role: finalRole || 'Asisten',
      phone: this.inputMasterCrewPhone ? this.inputMasterCrewPhone.value.trim() : '',
      email: this.inputMasterCrewEmail ? this.inputMasterCrewEmail.value.trim() : '',
      notes: this.textareaMasterCrewNotes ? this.textareaMasterCrewNotes.value.trim() : ''
    };

    if (isEdit) {
      const idx = this.masterCrew.findIndex(c => c.id === crewId);
      if (idx !== -1) this.masterCrew[idx] = crewData;
    } else {
      const existingMasterIdx = this.masterCrew.findIndex(c => (c.name || '').toLowerCase() === name.toLowerCase());
      if (existingMasterIdx !== -1) {
        crewData.id = this.masterCrew[existingMasterIdx].id;
        this.masterCrew[existingMasterIdx] = crewData;
      } else {
        this.masterCrew.push(crewData);
      }
    }

    // Sync updated master crew member into any events where they are assigned
    if (Array.isArray(this.events)) {
      let eventsUpdated = false;
      this.events.forEach(ev => {
        if (Array.isArray(ev.crew)) {
          ev.crew.forEach(c => {
            if (c.id === crewData.id || (c.name || '').toLowerCase() === crewData.name.toLowerCase()) {
              c.name = crewData.name;
              c.role = crewData.role;
              c.phone = crewData.phone;
              c.email = crewData.email;
              c.notes = crewData.notes;
              eventsUpdated = true;
            }
          });
        }
      });
      if (eventsUpdated) this.saveEvents();
    }

    this.saveMasterCrew();
    this.updateMetrics();
    this.closeMasterCrewModal();
    this.renderMasterCrewList();
    this.showToast(isEdit ? 'Master kru diperbarui!' : 'Anggota master kru ditambahkan!', 'success');
  }

  deleteMasterCrew(crewId) {
    if (confirm('Hapus anggota kru ini dari database master?')) {
      this.masterCrew = this.masterCrew.filter(c => c.id !== crewId);
      this.saveMasterCrew();
      this.updateMetrics();
      this.renderMasterCrewList();
      this.showToast('Anggota kru dihapus dari master.', 'info');
    }
  }

  // ==================== WHATSAPP BRIEFING GENERATOR ====================
  populateShareRecipients(ev) {
    if (!this.selectShareRecipient) return;
    this.selectShareRecipient.innerHTML = '<option value="group">📢 Grup WhatsApp Kru (Pilih kontak manual di WA)</option>';

    if (ev.crew && ev.crew.length > 0) {
      ev.crew.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `👤 ${c.name} (${c.role})`;
        this.selectShareRecipient.appendChild(opt);
      });
    }
  }

  handleShareRecipientChange() {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (ev) this.generateShareSummary(ev);
  }

  setShareEmojiMode(useEmojis) {
    this.shareEmojiMode = useEmojis;
    if (this.btnFormatClean) this.btnFormatClean.classList.toggle('active', !useEmojis);
    if (this.btnFormatEmoji) this.btnFormatEmoji.classList.toggle('active', useEmojis);

    const ev = this.events.find(x => x.id === this.currentEventId);
    if (ev) this.generateShareSummary(ev);
  }

  generateShareSummary(ev) {
    if (!this.textareaSharePreview) return;
    const recipient = this.selectShareRecipient ? this.selectShareRecipient.value : 'group';
    let crew = null;
    let isGroup = true;

    if (recipient !== 'group') {
      crew = (ev.crew || []).find(c => c.id === recipient);
      isGroup = false;
    }

    const text = this.buildComprehensiveWAMessage(ev, crew, isGroup, this.shareEmojiMode);
    this.textareaSharePreview.value = text;
  }

  copyShareContent() {
    if (!this.textareaSharePreview) return;
    const text = this.textareaSharePreview.value;
    this.copyToClipboard(text, 'Teks rekap briefing berhasil disalin ke Clipboard!');
  }

  openDirectWhatsAppShare() {
    const ev = this.events.find(x => x.id === this.currentEventId);
    if (!ev) return;

    const recipient = this.selectShareRecipient ? this.selectShareRecipient.value : 'group';
    let text = '';
    let phone = '';

    if (recipient === 'group') {
      text = this.buildComprehensiveWAMessage(ev, null, true, this.shareEmojiMode);
    } else {
      const crew = (ev.crew || []).find(c => c.id === recipient);
      if (crew) {
        text = this.buildComprehensiveWAMessage(ev, crew, false, this.shareEmojiMode);
        phone = this.formatWhatsAppPhone(crew.phone);
      }
    }

    this.copyToClipboard(text, 'Membuka WhatsApp... Teks juga otomatis disalin ke Clipboard!');

    let waUrl = '';
    if (phone) {
      waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    } else {
      waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    }

    window.open(waUrl, '_blank');
  }

  buildComprehensiveWAMessage(ev, crew = null, isGroup = false, useEmojis = false) {
    const formattedDate = this.formatDateIndonesian(ev.date);
    const locations = this.getEventLocations(ev);

    // Emoji icons or empty string if clean text mode is chosen
    const E_PIN    = useEmojis ? '\u{1F4CD}' : '';
    const E_CAL    = useEmojis ? '\u{1F4C5}' : '';
    const E_SPARK  = useEmojis ? '\u{2728}'  : '';
    const E_CAM    = useEmojis ? '\u{1F4F8}' : '';
    const E_USERS  = useEmojis ? '\u{1F465}' : '';
    const E_PHONE  = useEmojis ? '\u{1F4F1}' : '';
    const E_CLOCK  = useEmojis ? '\u{23F0}'  : '';
    const E_DRESS  = useEmojis ? '\u{1F457}' : '';
    const E_TENT   = useEmojis ? '\u{1F3AA}' : '';
    const E_TARGET = useEmojis ? '\u{1F3AF}' : '';
    const E_HAND   = useEmojis ? '\u{1F449}' : '•';
    const E_NOTE   = useEmojis ? '\u{1F4DD}' : '';
    const E_CALL   = useEmojis ? '\u{1F4DE}' : '';
    const E_WAVE   = useEmojis ? '\u{1F44B}' : '';
    const E_BULLET = '•';

    const pfx = (emoji) => emoji ? emoji + ' ' : '';

    // Header Lokasi: 📍*LOKASI 1* *RESEPSI*
    const locationHeaderLines = locations.map((loc, i) => {
      const locStr = (loc.locName || `Lokasi ${i + 1}`).trim().toUpperCase();
      const eventStr = (loc.eventName || loc.label || loc.name || 'Resepsi').trim().toUpperCase();
      const pinPrefix = useEmojis ? '\u{1F4CD}' : '';
      return `${pinPrefix}*${locStr}* *${eventStr}*`;
    }).join('\n');

    // Single Google Maps Link per location
    let locationDetails = locations.map((loc, idx) => {
      const num = idx + 1;
      const locTitleStr = (loc.locName || `Lokasi ${num}`).trim().toUpperCase();
      const eventTitleStr = (loc.eventName || loc.label || loc.name || 'Resepsi').trim().toUpperCase();
      
      // Jika hanya 1 lokasi, header sub-lokasi tidak perlu diulang karena sudah tampil jelas di header atas
      let headerLine = '';
      if (locations.length > 1) {
        headerLine = `*${locTitleStr} : ${eventTitleStr}*\n`;
      }

      const venueName = (loc.venueName && loc.venueName !== '-') ? loc.venueName.trim() : (loc.venueType ? loc.venueType.trim() : (loc.name ? loc.name.trim() : '-'));
      const venueAddress = loc.venueAddress ? loc.venueAddress.trim() : '-';
      let timeStr = loc.time ? loc.time.trim() : (loc.startTime ? `${loc.startTime} WIB - ${loc.endTime || 'Selesai'}` : '-');

      const mapQueryParts = [];
      if (venueName && venueName !== '-') mapQueryParts.push(venueName);
      if (loc.venueAddress) mapQueryParts.push(loc.venueAddress.trim());
      const query = mapQueryParts.join(', ') || 'Gresik';

      const openMapsUrl = loc.mapsUrl || loc.customMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

      return `${headerLine}${E_BULLET} Waktu: ${timeStr}
${E_BULLET} Tempat: ${venueName}
${E_BULLET} Alamat: ${venueAddress}${loc.notes ? `\n${E_BULLET} Keterangan: ${loc.notes.trim()}` : ''}
${E_BULLET} Google Maps: ${openMapsUrl}`;
    }).join('\n\n');

    const primaryAdmin = this.getPrimaryAdmin();
    const cleanAdminPhone = this.formatWhatsAppPhone(primaryAdmin.phone);
    const brandName = this.brandConfig ? this.brandConfig.fullName : 'Mahligai Wedding Organizer';

    // Client and Parents Info
    let clientInfo = [];
    if (ev.coupleName) clientInfo.push(`${pfx(E_SPARK)}*MEMPELAI :* ${ev.coupleName}`);
    if (ev.clientIg) clientInfo.push(`${pfx(E_CAM)}*IG MANTEN:* ${ev.clientIg}`);
    if (ev.fatherName || ev.motherName) {
      const parents = [];
      if (ev.fatherName) parents.push(`Bpk. ${ev.fatherName}`);
      if (ev.motherName) parents.push(`Ibu ${ev.motherName}`);
      clientInfo.push(`${pfx(E_USERS)}*ORANG TUA:* ${parents.join(' & ')}`);
    }
    if (ev.clientPhone) clientInfo.push(`${pfx(E_PHONE)}*NO. HP/WA:* ${ev.clientPhone}`);

    // Operational Sections (VENDOR UTAMA tidak ditampilkan karena sudah ada di TIM KRU BERTUGAS)
    let operationalSections = [];


    if (ev.attireNotes) {
      operationalSections.push(`----------------------------------------\n${pfx(E_DRESS)}*URUTAN GAUN & BUSANA:*\n${ev.attireNotes}`);
    }

    if (ev.logisticsNotes) {
      operationalSections.push(`----------------------------------------\n${pfx(E_TENT)}*LOGISTIK & PAKET FASILITAS:*\n${ev.logisticsNotes}`);
    }

    let crewSection = '';
    if (isGroup) {
      if (ev.crew && ev.crew.length > 0) {
        crewSection = `----------------------------------------\n${pfx(E_USERS)}*TIM KRU BERTUGAS:*\n` +
          ev.crew.map((c, i) => `${i + 1}. ${c.name} - ${c.role} (${c.phone || 'Tanpa no'})`).join('\n');
      }
    } else if (crew) {
      crewSection = `----------------------------------------\n${pfx(E_TARGET)}*TUGAS ANDA (${crew.name}):*\n${E_HAND} *${crew.role}*\n` +
        (crew.notes ? `Catatan Khusus: ${crew.notes}` : '');
    }

        let specialNotesSection = '';
    const ketText = ev.specialNotes || ev.notes || '';
    if (ketText) {
      specialNotesSection = `----------------------------------------\n${pfx(E_NOTE)}*KETERANGAN:*\n${ketText}`;
    }

    let greeting = isGroup
      ? `*BRIEFING ACARA PERNIKAHAN*\n*${brandName.toUpperCase()}*\n----------------------------------------\n${locationHeaderLines}\n\n${pfx(E_CAL)}*TANGGAL:* ${formattedDate}\n\n${clientInfo.join('\n')}`
      : `Halo Kak ${crew ? crew.name : ''}${E_WAVE ? ' ' + E_WAVE : ''}\nBerikut surat tugas & briefing acara:\n\n*BRIEFING ACARA PERNIKAHAN*\n*${brandName.toUpperCase()}*\n----------------------------------------\n${locationHeaderLines}\n\n${pfx(E_CAL)}*TANGGAL:* ${formattedDate}\n\n${clientInfo.join('\n')}`;

    let body = [
      greeting,
      `----------------------------------------\n${pfx(E_PIN)}*JADWAL & LOKASI ACARA:*\n${locationDetails}`,
      ...operationalSections,
      crewSection,
      specialNotesSection,
      `----------------------------------------\n${pfx(E_CALL)}*NARAHUBUNG ADMIN WO:*\n${primaryAdmin.name} (${primaryAdmin.phone || 'Belum diatur'})\nChat WA: https://wa.me/${cleanAdminPhone}\n— Tim ${brandName}.`
    ].filter(Boolean).join('\n\n');

    return body;
  }

  render() {
    this.renderEventList();
    this.updateMetrics();
  }

  updateMetrics() {
    const upcoming = this.events.filter(e => !e.isArchived && this.calculateCountdown(e.date).daysDiff >= 0);
    const h3 = upcoming.filter(e => {
      const diff = this.calculateCountdown(e.date).daysDiff;
      return diff >= 0 && diff <= 3;
    });
    const archived = this.events.filter(e => e.isArchived || this.calculateCountdown(e.date).daysDiff < 0);

    if (this.metricUpcoming) this.metricUpcoming.textContent = upcoming.length;
    if (this.metricH3Count) this.metricH3Count.textContent = h3.length;

    if (this.countUpcoming) this.countUpcoming.textContent = upcoming.length;
    if (this.countH3) this.countH3.textContent = h3.length;
    if (this.countArchived) this.countArchived.textContent = archived.length;
    if (this.countAll) this.countAll.textContent = this.events.length;

    let activeCrewSet = new Set();
    upcoming.forEach(e => {
      (e.crew || []).forEach(c => activeCrewSet.add(c.id || c.name));
    });
    if (this.metricActiveCrewCount) this.metricActiveCrewCount.textContent = activeCrewSet.size;
    if (this.metricMasterCrewTotal) this.metricMasterCrewTotal.textContent = this.masterCrew.length;
    if (this.navMasterCrewCount) this.navMasterCrewCount.textContent = this.masterCrew.length;

    if (upcoming.length > 0 && this.metricClosestEvent) {
      const sortedUpcoming = [...upcoming].sort((a, b) => new Date(a.date) - new Date(b.date));
      const closest = sortedUpcoming[0];
      const diff = this.calculateCountdown(closest.date).daysDiff;
      this.metricClosestEvent.textContent = `Terdekat: ${closest.coupleName} (H-${diff})`;
    } else if (this.metricClosestEvent) {
      this.metricClosestEvent.textContent = 'Terdekat: -';
    }
  }

  renderEventList() {
    if (!this.eventsGridContainer) return;

    const query = this.inputSearchEvents ? this.inputSearchEvents.value.toLowerCase().trim() : '';
    let filtered = [...this.events];

    if (this.activeFilter === 'upcoming') {
      filtered = filtered.filter(e => !e.isArchived && this.calculateCountdown(e.date).daysDiff >= 0);
    } else if (this.activeFilter === 'h3') {
      filtered = filtered.filter(e => {
        if (e.isArchived) return false;
        const diff = this.calculateCountdown(e.date).daysDiff;
        return diff >= 0 && diff <= 3;
      });
    } else if (this.activeFilter === 'archived') {
      filtered = filtered.filter(e => e.isArchived || this.calculateCountdown(e.date).daysDiff < 0);
    }

    if (query) {
      filtered = filtered.filter(e =>
        e.coupleName.toLowerCase().includes(query) ||
        (e.packageName && e.packageName.toLowerCase().includes(query)) ||
        (e.locations && e.locations.some(l => (l.venueName && l.venueName.toLowerCase().includes(query)) || (l.venueAddress && l.venueAddress.toLowerCase().includes(query))))
      );
    }

    // Sort: upcoming by date asc, archived by date desc
    filtered.sort((a, b) => {
      if (this.activeFilter === 'archived') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

    if (this.archiveActionBanner) {
      if (this.activeFilter === 'archived' && filtered.length > 0) {
        this.archiveActionBanner.classList.remove('hidden');
      } else {
        this.archiveActionBanner.classList.add('hidden');
      }
    }

    if (filtered.length === 0) {
      this.eventsGridContainer.innerHTML = '';
      if (this.eventsEmptyState) this.eventsEmptyState.classList.remove('hidden');
      return;
    }

    if (this.eventsEmptyState) this.eventsEmptyState.classList.add('hidden');

    this.eventsGridContainer.innerHTML = filtered.map(ev => {
      const countdown = this.calculateCountdown(ev.date);
      const locations = this.getEventLocations(ev);
      const locSummary = locations[0] ? locations[0].venueName || locations[0].venueAddress || 'Kediaman Mempelai' : '-';
      const crewCount = ev.crew ? ev.crew.length : 0;
      return `
        <div class="event-card" onclick="window.app.switchToDetail('${ev.id}')">
          <div class="event-card-header">
            <span class="countdown-badge ${countdown.badgeClass}">${countdown.badgeText}</span>
          </div>
          <div class="event-card-body">
            <h3 class="event-couple-name">${this.escapeHtml(ev.coupleName)}</h3>
            <div class="event-date-row">
              <span class="event-date-icon">${UI_ICONS.calendar}</span>
              <span>${this.formatDateIndonesian(ev.date)}</span>
            </div>
            <div class="event-location-row">
              <span class="event-loc-icon">${UI_ICONS.mapPin}</span>
              <span class="truncate-1">${this.escapeHtml(locSummary)}</span>
            </div>
          </div>
          <div class="event-card-clean-footer">
            <div class="card-footer-tags">
              <span class="card-crew-count-pill">${UI_ICONS.users} <span>${crewCount} Kru Bertugas</span></span>
              <span class="card-loc-count-pill">${UI_ICONS.mapPin} <span>${locations.length} Lokasi</span></span>
            </div>
            <span class="card-open-link">Buka Detail &amp; WA →</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==================== ARCHIVE CLEANUP ====================
  clearAllArchivedEvents() {
    if (confirm('Hapus SEMUA acara di arsip secara permanen?')) {
      this.events = this.events.filter(x => !x.isArchived && this.calculateCountdown(x.date).daysDiff >= 0);
      this.saveEvents();
      this.showToast('Semua arsip berhasil dibersihkan!', 'success');
      this.render();
    }
  }

  // ==================== UTILITIES ====================
  copyToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMessage, 'success');
      }).catch(() => {
        this.fallbackCopy(text, successMessage);
      });
    } else {
      this.fallbackCopy(text, successMessage);
    }
  }

  fallbackCopy(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(successMessage, 'success');
    } catch (err) {
      this.showToast('Gagal menyalin teks.', 'error');
    }
    document.body.removeChild(textArea);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-item toast-${type}`;
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==================== BRANDING & OWNER PANEL ====================
  getBrandLogoMarkup(cfg, sizePx = 22) {
    const c = cfg || this.brandConfig || getDefaultBrandConfig();
    if (c.logoType === 'image' && c.logoValue) {
      return `<img src="${c.logoValue}" alt="Logo" class="brand-custom-img" style="width:100%; height:100%; object-fit:contain; border-radius:inherit;">`;
    }
    const val = c.logoValue || 'svg-rings';
    if (BRAND_LOGO_SVGS[val]) {
      return BRAND_LOGO_SVGS[val].replace(/width="24" height="24"/, `width="${sizePx}" height="${sizePx}"`);
    }
    if (val === 'heart') {
      return BRAND_LOGO_SVGS['svg-heart'].replace(/width="24" height="24"/, `width="${sizePx}" height="${sizePx}"`);
    }
    const emojiToSvgMap = {
      '👑': 'svg-crown',
      '💍': 'svg-rings',
      '💐': 'svg-floral',
      '🏰': 'svg-castle',
      '❤️': 'svg-heart',
      '🕊️': 'svg-dove',
      '✨': 'svg-sparkle',
      '💖': 'svg-heart'
    };
    if (emojiToSvgMap[val] && BRAND_LOGO_SVGS[emojiToSvgMap[val]]) {
      return BRAND_LOGO_SVGS[emojiToSvgMap[val]].replace(/width="24" height="24"/, `width="${sizePx}" height="${sizePx}"`);
    }
    return BRAND_LOGO_SVGS['svg-rings'].replace(/width="24" height="24"/, `width="${sizePx}" height="${sizePx}"`);
  }

  applyBrandSettings() {
    const cfg = this.brandConfig || getDefaultBrandConfig();
    const titleEl = document.getElementById('headerBrandTitle');
    const subEl = document.getElementById('headerBrandSubtitle');
    const iconEl = document.getElementById('headerBrandIcon');

    if (titleEl) titleEl.textContent = cfg.shortName || cfg.fullName;
    if (subEl) subEl.textContent = cfg.tagline || 'Wedding Organizer Management';

    if (iconEl) {
      iconEl.innerHTML = this.getBrandLogoMarkup(cfg, 22);
    }
  }

  loadBrandFormValues() {
    const cfg = this.brandConfig || getDefaultBrandConfig();
    if (this.inputBrandFullName) this.inputBrandFullName.value = cfg.fullName || '';
    if (this.inputBrandShortName) this.inputBrandShortName.value = cfg.shortName || '';
    if (this.inputBrandTagline) this.inputBrandTagline.value = cfg.tagline || '';
    this.updateBrandLivePreview();
  }

  updateBrandLivePreview() {
    const cfg = this.brandConfig || getDefaultBrandConfig();
    if (this.previewBrandTitle) this.previewBrandTitle.textContent = (this.inputBrandShortName ? this.inputBrandShortName.value : '') || cfg.shortName;
    if (this.previewBrandSubtitle) this.previewBrandSubtitle.textContent = (this.inputBrandTagline ? this.inputBrandTagline.value : '') || cfg.tagline;

    const previewIconEl = document.getElementById('previewBrandIcon');
    if (previewIconEl) {
      previewIconEl.innerHTML = this.getBrandLogoMarkup(cfg, 22);
    }

    const boxUploadPreview = document.getElementById('boxLogoUploadPreview');
    if (boxUploadPreview) {
      boxUploadPreview.innerHTML = this.getBrandLogoMarkup(cfg, 30);
    }

    const activeKey = cfg.logoType === 'image' ? '' : (cfg.logoValue || 'svg-rings');
    document.querySelectorAll('.quick-icon-btn').forEach(btn => {
      const btnKey = btn.getAttribute('data-icon');
      btn.classList.toggle('active', btnKey === activeKey);
    });
  }

  handleSaveBrandConfig(e) {
    e.preventDefault();
    this.brandConfig.fullName = this.inputBrandFullName.value.trim() || 'Mahligai Wedding Organizer';
    this.brandConfig.shortName = this.inputBrandShortName.value.trim() || 'Mahligai WO';
    this.brandConfig.tagline = this.inputBrandTagline.value.trim() || 'Wedding Organizer Management';
    this.saveBrandConfig(this.brandConfig);
    this.applyBrandSettings();
    this.updateBrandLivePreview();
    if (this.currentEventId) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      if (ev) this.generateShareSummary(ev);
    }
    this.showToast('Identitas & logo brand berhasil disimpan!', 'success');
  }

  renderUserAccessHeader() {
    // Header admin pill was replaced by #btnOpenOwnerPanel ("Pengaturan Admin")
  }

  openOwnerAdminModal(defaultPanel = 'panelBrandingSettings') {
    if (this.modalOwnerAdminBackdrop) {
      this.modalOwnerAdminBackdrop.classList.add('active');
      this.switchOwnerTab(defaultPanel);
      this.loadBrandFormValues();
      this.renderOwnerAdminList();
    }
  }

  closeOwnerAdminModal() {
    if (this.modalOwnerAdminBackdrop) {
      this.modalOwnerAdminBackdrop.classList.remove('active');
    }
    this.closeAdminForm();
  }

  switchOwnerTab(panelId) {
    this.activeOwnerTab = panelId || 'panelBrandingSettings';
    const tabConfigs = [
      { id: 'panelBrandingSettings', btnId: 'tabBtnBrandingSettings', anchorId: 'anchorBranding' },
      { id: 'panelAdminSettings', btnId: 'tabBtnAdminSettings', anchorId: 'anchorAdmin' },
      { id: 'panelSecuritySettings', btnId: 'tabBtnSecuritySettings', anchorId: 'anchorSecurity' },
      { id: 'panelExcelSettings', btnId: 'tabBtnExcelSettings', anchorId: 'anchorExcel' }
    ];

    tabConfigs.forEach(item => {
      const btn = document.getElementById(item.btnId);
      const panel = document.getElementById(item.id);
      const anchor = document.getElementById(item.anchorId);
      const isActive = item.id === this.activeOwnerTab;

      if (btn) btn.classList.toggle('active', isActive);
      if (panel) panel.classList.toggle('hidden', !isActive);
      if (anchor) anchor.classList.toggle('hidden', !isActive);
    });

    if (this.activeOwnerTab === 'panelExcelSettings') {
      this.renderExcelDatabaseStats();
    }

    const modalBody = document.querySelector('.admin-modal-body');
    if (modalBody) modalBody.scrollTop = 0;
  }

  renderOwnerAdminList() {
    const highlightBox = document.getElementById('adminActiveHighlightBox');
    const cardsList = document.getElementById('ownerAdminCardsList');
    const primaryAdmin = this.getPrimaryAdmin();

    if (highlightBox && primaryAdmin) {
      const cleanPhone = (primaryAdmin.phone || '').replace(/[^0-9]/g, '');
      const waLink = cleanPhone.startsWith('62') 
        ? `https://wa.me/${cleanPhone}` 
        : cleanPhone.startsWith('0') 
          ? `https://wa.me/62${cleanPhone.slice(1)}` 
          : `https://wa.me/${cleanPhone}`;

      highlightBox.innerHTML = `
        <div class="admin-highlight-header">
          <span class="admin-highlight-tag">⭐ ADMIN 1 (UTAMA) / NARAHUBUNG RESMI WO</span>
          <span class="admin-highlight-status"><span class="status-dot"></span> Aktif</span>
        </div>
        <div class="admin-highlight-body">
          <div class="admin-highlight-avatar">${BRAND_LOGO_SVGS['svg-crown']}</div>
          <div class="admin-highlight-details">
            <div class="admin-highlight-name">${this.escapeHtml(primaryAdmin.name)}</div>
            <div class="admin-highlight-contacts">
              <div class="contact-line">
                <span class="contact-label">📱 WhatsApp:</span>
                <span class="contact-value" style="font-weight:700;">${this.escapeHtml(primaryAdmin.phone)}</span>
              </div>
              ${primaryAdmin.email ? `
                <div class="contact-line">
                  <span class="contact-label">✉️ Email:</span>
                  <span class="contact-value email-value">${this.escapeHtml(primaryAdmin.email)}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
        <div class="admin-highlight-action" style="display:flex; gap:8px;">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="flex:1; justify-content:center; text-decoration:none; min-height:38px; font-weight:700;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"></path>
            </svg>
            <span>Tes Chat WhatsApp</span>
          </a>
          <button type="button" class="btn btn-secondary btn-sm btn-edit-admin" data-id="${primaryAdmin.id}" style="min-height:38px;">
            ${UI_ICONS.edit} <span>Edit Admin</span>
          </button>
        </div>
      `;
    }

    if (cardsList) {
      if (!this.adminList || this.adminList.length === 0) {
        cardsList.innerHTML = `<div style="text-align:center; padding:16px; color:#64748B;">Belum ada admin terdaftar.</div>`;
        return;
      }

      cardsList.innerHTML = this.adminList.map((a, idx) => {
        const isPrim = !!a.isPrimary;
        const cleanP = (a.phone || '').replace(/[^0-9]/g, '');
        const waUrl = cleanP.startsWith('62') ? `https://wa.me/${cleanP}` : cleanP.startsWith('0') ? `https://wa.me/62${cleanP.slice(1)}` : `https://wa.me/${cleanP}`;

        return `
          <div class="admin-card-item ${isPrim ? 'is-primary' : ''}">
            <div class="admin-card-header">
              <div class="admin-idx-badge ${isPrim ? 'is-primary' : ''}">${isPrim ? '★' : (idx + 1)}</div>
              <div class="admin-card-identity">
                <div class="admin-card-title-row">
                  <span class="admin-card-name">${this.escapeHtml(a.name)}</span>
                  ${isPrim ? '<span class="badge-admin-primary">👑 Admin Utama</span>' : '<span class="badge-admin-secondary">Admin Tambahan</span>'}
                </div>
                <div class="admin-card-contacts">
                  <div class="admin-card-contact-item">
                    <span class="icon">📱</span>
                    <span>${this.escapeHtml(a.phone)}</span>
                  </div>
                  ${a.email ? `
                    <div class="admin-card-contact-item">
                      <span class="icon">✉️</span>
                      <span class="email-text">${this.escapeHtml(a.email)}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <div class="admin-card-actions">
              ${!isPrim ? `
                <button type="button" class="btn btn-ghost btn-sm btn-set-primary-admin" data-id="${a.id}" style="font-size:0.78rem; color:#92400E; font-weight:700;">
                  ${UI_ICONS.star} <span>Jadikan Utama</span>
                </button>
              ` : `
                <span class="badge-admin-selected">⭐ Aktif Sebagai Admin 1</span>
              `}
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Chat WhatsApp" style="text-decoration:none; padding:4px 8px; font-size:0.78rem;">
                ${UI_ICONS.whatsapp} <span>WA</span></a>
              <button type="button" class="btn btn-secondary btn-sm btn-edit-admin" data-id="${a.id}" style="padding:4px 10px; font-size:0.78rem;">
                ${UI_ICONS.edit} <span>Edit</span></button>
              ${this.adminList.length > 1 ? `
                <button type="button" class="btn-danger-icon btn-delete-admin" data-id="${a.id}" title="Hapus Admin">${UI_ICONS.trash}</button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  openAdminFormForAdd() {
    if (!this.adminFormCard) return;
    this.adminFormCard.classList.remove('hidden');
    const formTitle = document.getElementById('formAdminTitle');
    if (formTitle) formTitle.textContent = 'Tambah Admin Baru';

    if (this.inputAdminId) this.inputAdminId.value = '';
    if (this.inputAdminName) this.inputAdminName.value = '';
    if (this.inputAdminPhone) this.inputAdminPhone.value = '';
    if (this.inputAdminEmail) this.inputAdminEmail.value = '';
    if (this.checkIsPrimaryAdmin) this.checkIsPrimaryAdmin.checked = (this.adminList.length === 0);

    if (this.inputAdminName) this.inputAdminName.focus();
    this.adminFormCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  openAdminFormForEdit(adminId) {
    const admin = this.adminList.find(a => a.id === adminId);
    if (!admin || !this.adminFormCard) return;

    this.adminFormCard.classList.remove('hidden');
    const formTitle = document.getElementById('formAdminTitle');
    if (formTitle) formTitle.textContent = `Edit Admin: ${admin.name}`;

    if (this.inputAdminId) this.inputAdminId.value = admin.id;
    if (this.inputAdminName) this.inputAdminName.value = admin.name || '';
    if (this.inputAdminPhone) this.inputAdminPhone.value = admin.phone || '';
    if (this.inputAdminEmail) this.inputAdminEmail.value = admin.email || '';
    if (this.checkIsPrimaryAdmin) this.checkIsPrimaryAdmin.checked = !!admin.isPrimary;

    if (this.inputAdminName) this.inputAdminName.focus();
    this.adminFormCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  closeAdminForm() {
    if (!this.adminFormCard) return;
    this.adminFormCard.classList.add('hidden');
    if (this.inputAdminId) this.inputAdminId.value = '';
    if (this.inputAdminName) this.inputAdminName.value = '';
    if (this.inputAdminPhone) this.inputAdminPhone.value = '';
    if (this.inputAdminEmail) this.inputAdminEmail.value = '';
    if (this.checkIsPrimaryAdmin) this.checkIsPrimaryAdmin.checked = false;
  }

  handleSaveAdminSubmit(e) {
    e.preventDefault();
    const id = this.inputAdminId ? this.inputAdminId.value.trim() : '';
    const name = this.inputAdminName ? this.inputAdminName.value.trim() : '';
    const phone = this.inputAdminPhone ? this.inputAdminPhone.value.trim() : '';
    const email = this.inputAdminEmail ? this.inputAdminEmail.value.trim() : '';
    const isPrimary = this.checkIsPrimaryAdmin ? this.checkIsPrimaryAdmin.checked : false;

    if (!name || !phone) {
      this.showToast('Nama dan nomor WhatsApp admin wajib diisi.', 'warning');
      return;
    }

    if (id) {
      const admin = this.adminList.find(a => a.id === id);
      if (admin) {
        admin.name = name;
        admin.phone = phone;
        admin.email = email;
        if (isPrimary) {
          this.adminList.forEach(a => a.isPrimary = false);
          admin.isPrimary = true;
        }
      }
    } else {
      const newAdmin = {
        id: 'adm-' + Date.now(),
        name,
        phone,
        email,
        isPrimary: isPrimary || this.adminList.length === 0
      };
      if (newAdmin.isPrimary) {
        this.adminList.forEach(a => a.isPrimary = false);
      }
      this.adminList.push(newAdmin);
    }

    if (!this.adminList.some(a => a.isPrimary) && this.adminList.length > 0) {
      this.adminList[0].isPrimary = true;
    }

    this.saveAdminList();
    this.renderUserAccessHeader();
    this.renderOwnerAdminList();
    if (this.currentEventId) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      if (ev) this.generateShareSummary(ev);
    }
    this.closeAdminForm();
    this.showToast('Data admin berhasil disimpan!', 'success');
  }

  setPrimaryAdmin(adminId) {
    const admin = this.adminList.find(a => a.id === adminId);
    if (!admin) return;

    this.adminList.forEach(a => a.isPrimary = (a.id === adminId));
    this.saveAdminList();
    this.renderUserAccessHeader();
    this.renderOwnerAdminList();
    if (this.currentEventId) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      if (ev) this.generateShareSummary(ev);
    }
    this.showToast(`Admin Utama diubah ke ${admin.name}`, 'success');
  }

  deleteAdmin(adminId) {
    if (this.adminList.length <= 1) {
      this.showToast('Minimal harus ada 1 admin terdaftar.', 'warning');
      return;
    }

    const admin = this.adminList.find(a => a.id === adminId);
    if (!admin) return;

    if (!confirm(`Hapus admin ${admin.name}?`)) return;

    const wasPrimary = admin.isPrimary;
    this.adminList = this.adminList.filter(a => a.id !== adminId);

    if (wasPrimary && this.adminList.length > 0) {
      this.adminList[0].isPrimary = true;
    }

    this.saveAdminList();
    this.renderUserAccessHeader();
    this.renderOwnerAdminList();
    if (this.currentEventId) {
      const ev = this.events.find(x => x.id === this.currentEventId);
      if (ev) this.generateShareSummary(ev);
    }
    this.showToast(`Admin ${admin.name} berhasil dihapus.`, 'info');
  }

  handleExportDataBackup() {
    const eventsToBackup = this.events || [];
    const backupData = {
      exportDate: new Date().toISOString(),
      type: 'mahligai_events_backup',
      version: 'v20.4',
      totalEvents: eventsToBackup.length,
      events: eventsToBackup
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahligai-daftar-acara-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast(`✅ Cadangan ${eventsToBackup.length} daftar acara berhasil diunduh!`, 'success');
  }

  handleImportDataBackup(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!data || typeof data !== 'object') {
          throw new Error('Format JSON tidak valid');
        }

        let importedEvents = null;
        if (Array.isArray(data.events)) {
          importedEvents = data.events;
        } else if (Array.isArray(data)) {
          importedEvents = data;
        }

        if (!importedEvents) {
          throw new Error('Berkas tidak berisi daftar acara pernikahan yang valid.');
        }

        // Fokus murni memulihkan daftar acara saja, setelan admin/brand/kru/katalog tetap aman
        this.events = importedEvents;
        this.saveEvents();
        this.render();

        this.showToast(`✅ Berhasil memulihkan ${importedEvents.length} data acara pernikahan!`, 'success');
      } catch (err) {
        console.error('Import error:', err);
        this.showToast(`Gagal memulihkan cadangan: ${err.message || 'File cadangan tidak valid atau rusak'}`, 'danger');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  handleFactoryReset() {
    if (confirm('PERINGATAN: Seluruh data acara, kru, dan admin akan direset ke data awal resmi Mahligai WO. Lanjutkan?')) {
      localStorage.clear();
      this.events = getInitialEvents();
      this.masterCrew = getInitialMasterCrew();
      this.adminList = getInitialAdminList();
      this.brandConfig = getDefaultBrandConfig();

      this.saveEvents();
      this.saveMasterCrew();
      this.saveAdminList();
      this.saveBrandConfig(this.brandConfig);

      this.applyBrandSettings();
      this.renderUserAccessHeader();
      this.renderOwnerAdminList();
      this.loadBrandFormValues();
      this.render();
      this.showToast('Aplikasi berhasil direset ke setelan awal Mahligai WO!', 'success');
      this.closeOwnerAdminModal();
    }
  }

  initPwaInstall() {
    let deferredPrompt = null;
    const btnPwa = document.getElementById('btnPwaInstall');

    // Detect if already running as installed standalone PWA
    const isStandalone =
      (typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches) ||
      window.navigator.standalone === true;

    if (isStandalone && btnPwa) {
      btnPwa.style.display = 'none';
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (btnPwa) btnPwa.style.display = 'inline-flex';
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      if (btnPwa) btnPwa.style.display = 'none';
      this.showToast('Aplikasi Mahligai WO berhasil terpasang dan siap digunakan 100% Offline!', 'success');
    });

    window.addEventListener('offline', () => {
      this.showToast('Mode Offline PWA Aktif — Aplikasi tetap berjalan penuh tanpa koneksi internet.', 'info');
    });

    window.addEventListener('online', () => {
      this.showToast('Koneksi internet terhubung kembali.', 'success');
    });

    if (btnPwa) {
      btnPwa.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
          });
        } else {
          const modal = document.getElementById('iosInstallModal');
          if (modal) modal.classList.add('active');
        }
      });
    }

    const btnGotIt = document.getElementById('btnGotItIosInstall');
    if (btnGotIt) {
      btnGotIt.addEventListener('click', () => {
        const modal = document.getElementById('iosInstallModal');
        if (modal) modal.classList.remove('active');
      });
    }
  }

  // ==================== NOTIFICATIONS H-3 ====================
  checkH3Notifications() {
    const upcoming = this.events.filter(e => !e.isArchived && this.calculateCountdown(e.date).daysDiff >= 0);
    const h3List = upcoming.filter(e => {
      const diff = this.calculateCountdown(e.date).daysDiff;
      return diff >= 0 && diff <= 3;
    });

    if (this.headerNotificationCount) {
      if (h3List.length > 0) {
        this.headerNotificationCount.textContent = h3List.length;
        this.headerNotificationCount.classList.remove('hidden');
      } else {
        this.headerNotificationCount.classList.add('hidden');
      }
    }

    if (this.h3UrgentBanner) {
      if (h3List.length > 0) {
        this.h3UrgentBanner.classList.remove('hidden');
        const h3Title = document.getElementById('h3BannerTitle');
        if (h3Title) h3Title.textContent = `Perhatian Admin: Ada ${h3List.length} Acara Pernikahan H-3!`;
      } else {
        this.h3UrgentBanner.classList.add('hidden');
      }
    }

    if (this.notificationDropdownList) {
      if (h3List.length === 0) {
        this.notificationDropdownList.innerHTML = '<div style="padding:14px; text-align:center; color:var(--ink-secondary); font-size:0.85rem;">Tidak ada acara mendekati H-3.</div>';
      } else {
        this.notificationDropdownList.innerHTML = h3List.map(ev => {
          const diff = this.calculateCountdown(ev.date).daysDiff;
          return `
            <div style="padding:10px 14px; border-bottom:1px solid #F1F5F9; cursor:pointer;" onclick="window.app.switchToDetail('${ev.id}')">
              <div style="font-weight:700; color:var(--ink-primary); font-size:0.88rem;">${ev.coupleName}</div>
              <div style="font-size:0.78rem; color:#D97706; font-weight:700;">H-${diff} Hari (${this.formatDateIndonesian(ev.date)})</div>
            </div>
          `;
        }).join('');
      }
    }
  }

  dismissH3Banner() {
    if (this.h3UrgentBanner) this.h3UrgentBanner.classList.add('hidden');
  }

  requestWebNotification() {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.showToast('Notifikasi desktop aktif!', 'success');
          new Notification('Mahligai Wedding Organizer', {
            body: 'Sistem pengingat acara H-3 siap memantau jadwal pernikahan.',
            icon: 'icons/icon-192.png'
          });
        } else {
          this.showToast('Izin notifikasi tidak diberikan.', 'warning');
        }
      });
    }
  }

  // ==================== HELPERS ====================
  calculateCountdown(dateString) {
    if (!dateString) return { daysDiff: -999, badgeText: '-', badgeClass: 'expired' };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateString);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const daysDiff = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return { daysDiff, badgeText: `Lewat ${Math.abs(daysDiff)} Hari`, badgeClass: 'expired' };
    } else if (daysDiff === 0) {
      return { daysDiff, badgeText: 'HARI H (H-0)', badgeClass: 'h0' };
    } else if (daysDiff === 1) {
      return { daysDiff, badgeText: 'BESOK (H-1)', badgeClass: 'urgent' };
    } else if (daysDiff <= 3) {
      return { daysDiff, badgeText: `MENDESAK (H-${daysDiff})`, badgeClass: 'urgent' };
    } else if (daysDiff <= 7) {
      return { daysDiff, badgeText: `H-${daysDiff} Hari`, badgeClass: 'soon' };
    } else {
      return { daysDiff, badgeText: `H-${daysDiff} Hari`, badgeClass: 'normal' };
    }
  }

  formatDateIndonesian(dateString) {
    if (!dateString) return '-';
    try {
      const d = new Date(dateString + 'T00:00:00');
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch (e) {
      return dateString;
    }
  }

  formatWhatsAppPhone(phone) {
    if (!phone) return '';
    let digits = phone.replace(/[^0-9]/g, '');
    if (digits.startsWith('0')) digits = '62' + digits.substring(1);
    if (!digits.startsWith('62') && digits.length >= 9) digits = '62' + digits;
    return digits;
  }


  // ==================== HARVY EXCEL DATABASE MANAGEMENT ====================
  loadHarvyDatabase() {
    try {
      const customPkgs = localStorage.getItem(this.STORAGE_KEY_HARVY_PACKAGES);
      if (customPkgs) {
        const parsed = JSON.parse(customPkgs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.harvyPackages = parsed.map(p => {
            if (typeof this.classifyPackageLines === 'function') {
              const c = this.classifyPackageLines(p);
              return {
                ...p,
                decor: c.decorItems.join('\n'),
                effects: [...c.entertainmentItems, ...c.henaItems].join('\n'),
                docs: c.docItems.join('\n'),
                makeup: c.attireItems.join('\n'),
                flowers: c.flowerItems.join('\n'),
                equipment: c.equipmentItems.join('\n'),
                otherItems: ''
              };
            }
            return p;
          });
        } else {
          this.harvyPackages = HARVY_PACKAGES;
        }
      } else {
        this.harvyPackages = HARVY_PACKAGES;
      }
    } catch (e) {
      this.harvyPackages = HARVY_PACKAGES;
    }

    try {
      const customRentals = localStorage.getItem(this.STORAGE_KEY_HARVY_RENTALS);
      if (customRentals) {
        const parsed = JSON.parse(customRentals);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.harvyRentals = parsed;
        } else {
          this.harvyRentals = HARVY_RENTALS;
        }
      } else {
        this.harvyRentals = HARVY_RENTALS;
      }
    } catch (e) {
      this.harvyRentals = HARVY_RENTALS;
    }

    // Keep global HARVY_CATALOG in sync
    HARVY_CATALOG.packages = this.harvyPackages;
    HARVY_CATALOG.rentals = this.harvyRentals;
  }

  renderOperationalPackageDropdowns() {
    // 1. Render selectOperationalPackageTemplate
    if (this.selectOperationalPackageTemplate) {
      const prevVal = this.selectOperationalPackageTemplate.value;
      const pkgs = this.harvyPackages || HARVY_PACKAGES;

      const areas = {};
      pkgs.forEach(p => {
        const a = p.area || 'Lainnya';
        if (!areas[a]) areas[a] = [];
        areas[a].push(p);
      });

      let html = '<option value="">-- Pilih Paket Harvy untuk Auto-Fill Briefing --</option>';
      for (const areaName of Object.keys(areas)) {
        html += `<optgroup label="📍 ${areaName.toUpperCase()}">`;
        areas[areaName].forEach(p => {
          const priceFmt = (p.price || 0).toLocaleString('id-ID');
          const descShort = p.desc ? ` - ${p.desc}` : '';
          html += `<option value="${p.id}">${p.name} (Rp ${priceFmt})${descShort}</option>`;
        });
        html += '</optgroup>';
      }
      this.selectOperationalPackageTemplate.innerHTML = html;
      if (prevVal) this.selectOperationalPackageTemplate.value = prevVal;
    }

    // 2. Render selectQuickRentalAddon
    if (this.selectQuickRentalAddon) {
      const prevRentalVal = this.selectQuickRentalAddon.value;
      const rentals = this.harvyRentals || HARVY_RENTALS;

      const cats = {};
      rentals.forEach(r => {
        const c = r.category || 'Sewa Perlengkapan';
        if (!cats[c]) cats[c] = [];
        cats[c].push(r);
      });

      let html = '<option value="">-- Pilih Item Sewa Tambahan --</option>';
      for (const catName of Object.keys(cats)) {
        html += `<optgroup label="🏷️ ${catName.toUpperCase()}">`;
        cats[catName].forEach(r => {
          const priceFmt = (r.price || 0).toLocaleString('id-ID');
          const unitStr = r.unit && r.unit !== 'unit' ? ` / ${r.unit}` : '';
          const optVal = `${r.name} (${r.category}) - Rp ${priceFmt}${unitStr}`;
          html += `<option value="${optVal}">${r.name} (+Rp ${priceFmt}${unitStr})</option>`;
        });
        html += '</optgroup>';
      }
      this.selectQuickRentalAddon.innerHTML = html;
      if (prevRentalVal) this.selectQuickRentalAddon.value = prevRentalVal;
    }
  }

  renderExcelDatabaseStats() {
    const pkgs = this.harvyPackages || HARVY_PACKAGES;
    const rentals = this.harvyRentals || HARVY_RENTALS;

    if (this.statExcelPackageCount) this.statExcelPackageCount.textContent = `${pkgs.length} Paket`;
    if (this.statExcelPackageAreas) {
      const distinctAreas = new Set(pkgs.map(p => (p.area || '').toLowerCase().replace(/^area\s+/i, '').trim()).filter(Boolean));
      this.statExcelPackageAreas.textContent = `${distinctAreas.size} Wilayah Operasional`;
    }
    if (this.statExcelRentalCount) this.statExcelRentalCount.textContent = `${rentals.length} Item`;

    let meta = null;
    try {
      const metaRaw = localStorage.getItem(this.STORAGE_KEY_HARVY_SYNC_META);
      if (metaRaw) meta = JSON.parse(metaRaw);
    } catch (e) {}

    const isCustom = localStorage.getItem(this.STORAGE_KEY_HARVY_PACKAGES) !== null;

    if (this.statExcelDbSource) {
      this.statExcelDbSource.textContent = isCustom ? 'Excel Kustom Admin' : 'Bawaan Harvy Wedding';
      if (this.statExcelDbSource.style) this.statExcelDbSource.style.color = isCustom ? 'var(--gold-dark)' : '#166534';
    }
    if (this.statExcelDbLastSync) {
      if (meta && meta.lastUpdated) {
        this.statExcelDbLastSync.textContent = `Tersinkron: ${meta.lastUpdated} (${meta.fileName || 'Excel'})`;
      } else {
        this.statExcelDbLastSync.textContent = 'Versi Resmi Excel Standar';
      }
    }
    if (this.badgeExcelDbStatus) {
      this.badgeExcelDbStatus.innerHTML = isCustom
        ? '⚡ Database Kustom Sinkron'
        : '🟢 Database Standar Aktif';
    }

    // Update live item counts on .excel-tab-btn
    const normalizeArea = (a) => (a || '').toLowerCase().replace(/^area\s+/i, '').trim();
    const tabLabels = {
      'Area Sekitar': `🌸 Area Sekitar (${pkgs.filter(p => normalizeArea(p.area) === 'sekitar').length})`,
      'Area Gresik': `🏵️ Gresik (${pkgs.filter(p => normalizeArea(p.area) === 'gresik').length})`,
      'Area Lamongan': `🍃 Lamongan (${pkgs.filter(p => normalizeArea(p.area) === 'lamongan').length})`,
      'Area Luar Kota': `✨ Luar Kota (${pkgs.filter(p => normalizeArea(p.area) === 'luar kota').length})`,
      'Perlengkapan': `🎪 Perlengkapan (${rentals.length})`
    };
    document.querySelectorAll('.excel-tab-btn').forEach(btn => {
      const areaKey = btn.getAttribute('data-excel-area');
      if (areaKey && tabLabels[areaKey]) {
        btn.textContent = tabLabels[areaKey];
      }
    });

    this.renderExcelPreviewTable(this.activeExcelPreviewArea || 'Area Sekitar');
  }

  async handleExcelDatabaseUpload(file) {
    if (!file) return;

    try {
      this.showToast(`Memproses sinkronisasi berkas "${file.name}"...`, 'info');

      const fileNameLower = file.name.toLowerCase();
      let extracted = null;

      if (fileNameLower.endsWith('.json') || (file.type && file.type.includes('json'))) {
        const text = await file.text();
        const json = JSON.parse(text);
        if (json.packages && Array.isArray(json.packages)) {
          extracted = { packages: json.packages, rentals: json.rentals || [] };
        } else if (Array.isArray(json)) {
          extracted = { packages: json, rentals: [] };
        }
      } else {
        const arrayBuf = await file.arrayBuffer();
        const wb = await this.parseXlsxBuffer(arrayBuf);
        extracted = this.extractHarvyDataFromWorkbook(wb);
      }

      if (!extracted || (!extracted.packages.length && !extracted.rentals.length)) {
        throw new Error('Tidak ada data paket pengantin atau daftar sewa yang dapat diekstrak dari berkas ini. Pastikan berkas menggunakan template standar Harvy Wedding (.xlsx).');
      }

      if (extracted.packages.length > 0) {
        this.harvyPackages = extracted.packages;
        localStorage.setItem(this.STORAGE_KEY_HARVY_PACKAGES, JSON.stringify(this.harvyPackages));
      }
      if (extracted.rentals.length > 0) {
        this.harvyRentals = extracted.rentals;
        localStorage.setItem(this.STORAGE_KEY_HARVY_RENTALS, JSON.stringify(this.harvyRentals));
      }

      HARVY_CATALOG.packages = this.harvyPackages;
      HARVY_CATALOG.rentals = this.harvyRentals;

      const now = new Date();
      const meta = {
        lastUpdated: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
                     now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        fileName: file.name,
        packageCount: this.harvyPackages.length,
        rentalCount: this.harvyRentals.length,
        source: 'Excel Import'
      };
      localStorage.setItem(this.STORAGE_KEY_HARVY_SYNC_META, JSON.stringify(meta));

      this.renderOperationalPackageDropdowns();
      this.renderExcelDatabaseStats();

      this.showToast(`✅ Sinkronisasi sukses! ${this.harvyPackages.length} Paket & ${this.harvyRentals.length} Item Logistik kini aktif.`, 'success');
    } catch (err) {
      console.error('Excel sync error:', err);
      this.showToast(`Gagal sinkronisasi: ${err.message || 'Format berkas tidak dikenali'}`, 'danger');
    }
  }

  handleResetExcelDatabase() {
    if (confirm('Kembalikan database paket & logistik ke data standar Harvy Wedding bawaan? Seluruh perubahan kustom dari file Excel akan dihapus.')) {
      localStorage.removeItem(this.STORAGE_KEY_HARVY_PACKAGES);
      localStorage.removeItem(this.STORAGE_KEY_HARVY_RENTALS);
      localStorage.removeItem(this.STORAGE_KEY_HARVY_SYNC_META);

      this.harvyPackages = HARVY_PACKAGES;
      this.harvyRentals = HARVY_RENTALS;
      HARVY_CATALOG.packages = this.harvyPackages;
      HARVY_CATALOG.rentals = this.harvyRentals;

      this.renderOperationalPackageDropdowns();
      this.renderExcelDatabaseStats();

      this.showToast('🔄 Database paket & logistik berhasil dikembalikan ke standar bawaan Harvy.', 'info');
    }
  }

  // ==================== PURE JS XLSX PARSER ====================
  async parseXlsxBuffer(buffer) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Browser Anda tidak mendukung dekompresi data Excel secara langsung. Silakan gunakan peramban Google Chrome, Microsoft Edge, atau Safari versi terbaru.');
    }

    // Normalisasi input agar mendukung ArrayBuffer murni (dari file.arrayBuffer()), Uint8Array, maupun Node Buffer
    let u8;
    if (buffer instanceof ArrayBuffer) {
      u8 = new Uint8Array(buffer);
    } else if (ArrayBuffer.isView(buffer)) {
      u8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else {
      u8 = new Uint8Array(buffer);
    }

    const rawBuffer = u8.buffer;
    const baseOffset = u8.byteOffset;
    const totalLength = u8.byteLength;

    if (totalLength < 22) {
      throw new Error('Ukuran berkas terlalu kecil untuk berkas Excel (.xlsx) yang valid.');
    }

    const view = new DataView(rawBuffer, baseOffset, totalLength);

    // 1. Locate End of Central Directory Record (0x06054b50)
    let eocdOffset = -1;
    for (let i = totalLength - 22; i >= 0; i--) {
      if (view.getUint32(i, true) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset === -1) {
      throw new Error('Format berkas bukan file Excel (.xlsx / zip) yang valid.');
    }

    const cdOffset = view.getUint32(eocdOffset + 16, true);
    const cdCount = view.getUint16(eocdOffset + 10, true);

    const entries = {};
    let curr = cdOffset;
    for (let k = 0; k < cdCount; k++) {
      if (curr + 46 > totalLength) break;
      if (view.getUint32(curr, true) !== 0x02014b50) break;

      const compression = view.getUint16(curr + 10, true);
      const compSize = view.getUint32(curr + 20, true);
      const fnLen = view.getUint16(curr + 28, true);
      const extraLen = view.getUint16(curr + 30, true);
      const commentLen = view.getUint16(curr + 32, true);
      const localHeaderOffset = view.getUint32(curr + 42, true);

      const fileNameBytes = new Uint8Array(rawBuffer, baseOffset + curr + 46, fnLen);
      const fileName = new TextDecoder('utf-8').decode(fileNameBytes);

      if (localHeaderOffset + 30 <= totalLength) {
        const localView = new DataView(rawBuffer, baseOffset + localHeaderOffset);
        if (localView.getUint32(0, true) === 0x04034b50) {
          const localFnLen = localView.getUint16(26, true);
          const localExtraLen = localView.getUint16(28, true);
          const dataOffset = localHeaderOffset + 30 + localFnLen + localExtraLen;

          if (dataOffset + compSize <= totalLength) {
            const compressedData = new Uint8Array(rawBuffer, baseOffset + dataOffset, compSize);

            let fileContent = '';
            if (compression === 0) {
              fileContent = new TextDecoder('utf-8').decode(compressedData);
            } else if (compression === 8) {
              try {
                const ds = new DecompressionStream('deflate-raw');
                const writer = ds.writable.getWriter();
                writer.write(compressedData);
                writer.close();
                const reader = ds.readable.getReader();
                const chunks = [];
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  chunks.push(value);
                }
                const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
                const full = new Uint8Array(totalLen);
                let pos = 0;
                for (const c of chunks) {
                  full.set(c, pos);
                  pos += c.length;
                }
                fileContent = new TextDecoder('utf-8').decode(full);
              } catch (decompErr) {
                console.warn('Gagal dekompresi entri zip:', fileName, decompErr);
              }
            }
            entries[fileName] = fileContent;
          }
        }
      }
      curr += 46 + fnLen + extraLen + commentLen;
    }

    // 2. Parse Shared Strings (xl/sharedStrings.xml)
    const sharedStrings = [];
    const sstXml = entries['xl/sharedStrings.xml'];
    if (sstXml) {
      const siRegex = /<si(?:\s[^>]*)?>([\s\S]*?)<\/si>/gi;
      let mSi;
      while ((mSi = siRegex.exec(sstXml)) !== null) {
        const siBody = mSi[1];
        const tRegex = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/gi;
        let mT;
        let text = '';
        while ((mT = tRegex.exec(siBody)) !== null) {
          text += mT[1];
        }
        text = text
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
          .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
        sharedStrings.push(text);
      }
    }

    // 3. Map sheet relationship IDs (xl/_rels/workbook.xml.rels)
    const relsXml = entries['xl/_rels/workbook.xml.rels'];
    const relMap = {};
    if (relsXml) {
      const relRegex = /<Relationship(?:\s+([^>]*?))?\/?>/gi;
      let mRel;
      while ((mRel = relRegex.exec(relsXml)) !== null) {
        const attrs = mRel[1] || '';
        const idMatch = /Id="([^"]+)"/.exec(attrs);
        const targetMatch = /Target="([^"]+)"/.exec(attrs);
        if (idMatch && targetMatch) {
          let target = targetMatch[1];
          if (!target.startsWith('xl/')) {
            target = 'xl/' + target.replace(/^\/?/, '');
          }
          relMap[idMatch[1]] = target;
        }
      }
    }

    // 4. Map sheets from xl/workbook.xml
    const wbXml = entries['xl/workbook.xml'];
    const sheets = [];
    if (wbXml) {
      const sheetRegex = /<sheet(?:\s+([^>]*?))?\/?>/gi;
      let mSheet;
      while ((mSheet = sheetRegex.exec(wbXml)) !== null) {
        const attrs = mSheet[1] || '';
        const nameMatch = /name="([^"]+)"/.exec(attrs);
        const idMatch = /sheetId="([^"]+)"/.exec(attrs);
        const rIdMatch = /(?:r:)?id="([^"]+)"/i.exec(attrs);
        const name = nameMatch ? nameMatch[1] : '';
        const sheetId = idMatch ? idMatch[1] : '';
        const rId = rIdMatch ? rIdMatch[1] : ('rId' + sheetId);
        const fileTarget = relMap[rId] || `xl/worksheets/sheet${sheetId || (sheets.length + 1)}.xml`;
        sheets.push({ name, target: fileTarget, sheetId });
      }
    }

    if (sheets.length === 0) {
      const sheetFiles = Object.keys(entries).filter(k => k.startsWith('xl/worksheets/sheet') && k.endsWith('.xml'));
      sheetFiles.sort();
      sheetFiles.forEach((f, idx) => {
        sheets.push({ name: `Sheet${idx + 1}`, target: f, sheetId: String(idx + 1) });
      });
    }

    // 5. Parse cell contents for each worksheet
    function parseSheetData(sheetXml) {
      if (!sheetXml) return [];
      const rows = [];
      const rowRegex = /<row(?:\s+([^>]*?))?>([\s\S]*?)<\/row>/gi;
      let mRow;
      while ((mRow = rowRegex.exec(sheetXml)) !== null) {
        const attrs = mRow[1] || '';
        const rowIdxMatch = /r="(\d+)"/.exec(attrs);
        const rowIdx = rowIdxMatch ? parseInt(rowIdxMatch[1], 10) : rows.length + 1;
        const rowContent = mRow[2];
        const rowData = {};

        const cellRegex = /<c(?:\s+([^>]*?))?(?:\/>|>([\s\S]*?)<\/c>)/gi;
        let mCell;
        while ((mCell = cellRegex.exec(rowContent)) !== null) {
          const cAttrs = mCell[1] || '';
          const cellBody = mCell[2] || '';

          const rMatch = /r="([A-Z]+)(\d+)"/.exec(cAttrs);
          if (!rMatch) continue;
          const colLetter = rMatch[1];
          const tMatch = /t="([^"]+)"/.exec(cAttrs);
          const cellType = tMatch ? tMatch[1] : '';

          let cellVal = '';
          if (cellType === 's') {
            const vMatch = /<v>(\d+)<\/v>/.exec(cellBody);
            if (vMatch) {
              const sIdx = parseInt(vMatch[1], 10);
              cellVal = sharedStrings[sIdx] || '';
            }
          } else if (cellType === 'inlineStr' || cellType === 'str') {
            const tMatch2 = /<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/gi;
            let mText;
            while ((mText = tMatch2.exec(cellBody)) !== null) {
              cellVal += mText[1];
            }
            if (!cellVal) {
              const vMatch = /<v>([\s\S]*?)<\/v>/.exec(cellBody);
              if (vMatch) cellVal = vMatch[1];
            }
          } else {
            const vMatch = /<v>([\s\S]*?)<\/v>/.exec(cellBody);
            if (vMatch) cellVal = vMatch[1];
          }
          cellVal = cellVal
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(parseInt(d, 10)))
            .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
            .trim();
          rowData[colLetter] = cellVal;
        }
        rows.push({ rowIdx, cells: rowData });
      }
      return rows;
    }

    const parsedSheets = {};
    for (const s of sheets) {
      const xml = entries[s.target] || entries['xl/' + s.target] || entries[s.target.replace(/^xl\//, '')];
      parsedSheets[s.name] = parseSheetData(xml);
    }
    return { sheets, parsedSheets };
  }

  extractHarvyDataFromWorkbook(workbookData) {
    const packages = [];
    const rentals = [];

    const sheetNames = Object.keys(workbookData.parsedSheets);
    for (let sIdx = 0; sIdx < sheetNames.length; sIdx++) {
      const sheetName = sheetNames[sIdx];
      const rows = workbookData.parsedSheets[sheetName];
      if (!rows || rows.length < 2) continue;

      const lowerName = sheetName.toLowerCase().trim();
      const isPerlengkapan = lowerName.includes('perlengkap') || 
                             lowerName.includes('sewa') || 
                             lowerName.includes('rental') ||
                             (sIdx === sheetNames.length - 1 && sheetNames.length === 5);

      if (isPerlengkapan) {
        for (let i = 1; i < rows.length; i++) {
          const c = rows[i].cells;
          const category = c['B'] || c['A'] || 'Sewa Perlengkapan';
          const itemName = c['C'] || c['B'] || '';
          const priceRaw = (c['D'] || c['C'] || '').replace(/[^0-9]/g, '');
          const unit = c['E'] || (category.toLowerCase().includes('4 x 6') ? 'plong' : 'unit');

          if (itemName && itemName !== 'Item' && itemName !== 'Nama Item' && itemName !== 'Nama') {
            const price = parseInt(priceRaw, 10) || 0;
            const displayName = (category.toLowerCase().includes('4 x 6') && !itemName.toLowerCase().includes('terop'))
              ? `Terop 4x6 ${itemName}`
              : itemName;

            const slug = displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            const id = `rent-${slug}-${i}`;

            rentals.push({
              id,
              category: category || 'Sewa Perlengkapan',
              name: displayName,
              price,
              unit: unit || 'unit'
            });
          }
        }
      } else {
        let area = 'Area Sekitar';
        if (lowerName.includes('gresik')) area = 'Area Gresik';
        else if (lowerName.includes('lamongan')) area = 'Area Lamongan';
        else if (lowerName.includes('luar')) area = 'Area Luar Kota';
        else if (lowerName.includes('sekitar')) area = 'Area Sekitar';
        else if (sIdx === 0) area = 'Area Sekitar';
        else if (sIdx === 1) area = 'Area Gresik';
        else if (sIdx === 2) area = 'Area Lamongan';
        else if (sIdx === 3) area = 'Area Luar Kota';

        for (let i = 1; i < rows.length; i++) {
          const c = rows[i].cells;
          const pkgName = c['B'] || '';
          if (!pkgName || pkgName === 'Nama Paket' || pkgName === 'Paket') continue;

          const price = parseInt((c['C'] || '').replace(/[^0-9]/g, ''), 10) || 0;
          const desc = c['D'] || '';
          const decor = c['E'] || '';
          const effects = c['F'] || '';
          const docs = c['G'] || '';
          const makeup = c['H'] || '';
          const flowers = c['I'] || '';
          const equipment = c['J'] || '';
          const otherItems = c['K'] || '';
          const extraCost = c['L'] || '';
          const notes = c['M'] || '';

          const rawPkg = {
            decor,
            effects,
            docs,
            makeup,
            flowers,
            equipment,
            otherItems
          };
          const classified = this.classifyPackageLines(rawPkg);

          const slug = pkgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const areaCode = area.toLowerCase().includes('gresik') ? 'gresik' : area.toLowerCase().includes('lamongan') ? 'lamongan' : area.toLowerCase().includes('luar') ? 'luar' : 'sekitar';
          const id = `pkg-${areaCode}-${slug}`;

          packages.push({
            id,
            area,
            name: pkgName,
            price,
            desc,
            decor: classified.decorItems.join('\n'),
            effects: [...classified.entertainmentItems, ...classified.henaItems].join('\n'),
            docs: classified.docItems.join('\n'),
            makeup: classified.attireItems.join('\n'),
            flowers: classified.flowerItems.join('\n'),
            equipment: classified.equipmentItems.join('\n'),
            otherItems: '',
            extraCost: (extraCost || '').replace(/\r/g, ''),
            notes: (notes || '').replace(/\r/g, '')
          });
        }
      }
    }
    return { packages, rentals };
  }


  renderExcelPreviewTable(selectedArea = 'Area Sekitar') {
    const container = document.getElementById('containerExcelTablePreview');
    if (!container) return;

    this.activeExcelPreviewArea = selectedArea;

    // Update active tab buttons
    document.querySelectorAll('.excel-tab-btn').forEach(btn => {
      const btnArea = btn.getAttribute('data-excel-area') || (btn.dataset ? btn.dataset.excelArea : '');
      btn.classList.toggle('active', btnArea === selectedArea);
    });

    const pkgs = this.harvyPackages || HARVY_PACKAGES;
    const rentals = this.harvyRentals || HARVY_RENTALS;

    if (selectedArea === 'Perlengkapan') {
      let html = `
        <table class="excel-preview-table">
          <thead>
            <tr>
              <th style="width:40px;">No</th>
              <th>Kategori</th>
              <th>Item</th>
              <th>Harga (Rp)</th>
              <th>Satuan</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
      `;

      rentals.forEach((r, idx) => {
        const priceFmt = (r.price || 0).toLocaleString('id-ID');
        html += `
          <tr>
            <td>${idx + 1}</td>
            <td>${this.escapeHtml(r.category || '')}</td>
            <td>${this.escapeHtml(r.name || '')}</td>
            <td>${r.price ? `Rp ${priceFmt}` : '-'}</td>
            <td>${this.escapeHtml(r.unit || '-')}</td>
            <td>-</td>
          </tr>
        `;
      });

      html += `
        </tbody>
      </table>`;
      container.innerHTML = html;
    } else {
      const normalizeArea = (a) => (a || '').toLowerCase().replace(/^area\s+/i, '').trim();
      const targetNorm = normalizeArea(selectedArea);
      const areaPkgs = pkgs.filter(p => normalizeArea(p.area) === targetNorm);
      let html = `
        <table class="excel-preview-table">
          <thead>
            <tr>
              <th style="width:40px;">No</th>
              <th>Nama Paket</th>
              <th>Harga (Rp)</th>
              <th>Deskripsi</th>
              <th>Dekor</th>
              <th>Efek &amp; Hiburan</th>
              <th>Dokumentasi &amp; Acara</th>
              <th>Rias Pengantin</th>
              <th>Bunga</th>
              <th>Perlengkapan</th>
              <th>Biaya Tambahan</th>
              <th>Catatan / Ketentuan</th>
            </tr>
          </thead>
          <tbody>
      `;

      areaPkgs.forEach((p, idx) => {
        const priceFmt = (p.price || 0).toLocaleString('id-ID');
        html += `
          <tr>
            <td>${idx + 1}</td>
            <td>${this.escapeHtml(p.name || '')}</td>
            <td>Rp ${priceFmt}</td>
            <td>${this.escapeHtml(p.desc || '-')}</td>
            <td>${this.escapeHtml(p.decor || '-')}</td>
            <td>${this.escapeHtml(p.effects || '-')}</td>
            <td>${this.escapeHtml(p.docs || '-')}</td>
            <td>${this.escapeHtml(p.makeup || '-')}</td>
            <td>${this.escapeHtml(p.flowers || '-')}</td>
            <td>${this.escapeHtml(p.equipment || '-')}</td>
            <td>${this.escapeHtml(p.extraCost || '-')}</td>
            <td>${this.escapeHtml(p.notes || '-')}</td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      container.innerHTML = html;
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global bootstrap
function bootMahligaiApp() {
  if (!window.app) {
    window.app = new WeddingApp();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js?v=21.5', { scope: './' })
      .then((reg) => {
        reg.update();
        console.log('Mahligai WO PWA Service Worker aktif: ', reg.scope);
      })
      .catch((err) => {
        console.log('SW registration note:', err);
      });
  }

  if (window.location.hash.startsWith('#edit-')) {
    const eventId = window.location.hash.substring(6);
    const ev = window.app.events.find(x => x.id === eventId);
    if (ev) window.app.openEventModal('edit', eventId);
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    bootMahligaiApp();
  } else {
    document.addEventListener('DOMContentLoaded', bootMahligaiApp);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WeddingApp,
    HARVY_CATALOG,
    getDefaultBrandConfig,
    getInitialAdminList,
    getInitialMasterCrew,
    getInitialEvents
  };
}
