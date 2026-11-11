"use strict";
const SEED = window.HARVY_SEED;
const LOGO_DEFAULT = "icons/logo.jpg";
const APP_VERSION = "65";
const KEY = "harvy_wo_db_v1";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clone = x => JSON.parse(JSON.stringify(x));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ic = (n, cls = "") => `<svg class="i ${cls}"><use href="#i-${n}"/></svg>`;
const num = v => { const n = parseInt(String(v ?? "").replace(/[^\d-]/g, ""), 10); return isNaN(n) ? 0 : n; };
const rp = n => "Rp " + (Number(n) || 0).toLocaleString("id-ID");
const rpShort = n => { n = Number(n) || 0; if (Math.abs(n) >= 1e9) return "Rp " + (n / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " M"; if (Math.abs(n) >= 1e6) return "Rp " + (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt"; return rp(n); };
const pad = n => String(n).padStart(2, "0");
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayStr = () => ymd(new Date());
/* tanggal yang sama bulan depan (mis. 11 Nov → 11 Des) */
const sebulanLagi = () => { const n = new Date(); return ymd(new Date(n.getFullYear(), n.getMonth() + 1, n.getDate())); };
const parseD = s => { if (!s) return null; const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const fmtD = (s, o = { weekday: "long", day: "numeric", month: "long", year: "numeric" }) => s ? parseD(s).toLocaleDateString("id-ID", o) : "Belum ada tanggal";
const daysTo = s => s ? Math.round((parseD(s) - parseD(todayStr())) / 864e5) : null;
const lines = t => String(t || "").split("\n").map(x => x.trim()).filter(Boolean);
const ROLES = ["MUA", "Asisten", "Crew Rias", "Admin", "MC", "Foto", "Video", "Hena", "Dry Smoke", "Cucuk Lampah", "Electone", "Dekor", "Sopir", "Lainnya"];
/* Daftar tim Harvy (bisa diubah di Pengaturan → Tim) */
const ROSTER = {
  "MUA": ["Harvy"],
  "Asisten": ["Puput", "Nanda"],
  "Crew Rias": ["Buk Um", "Sari", "Maya", "Nisaul", "Isti", "Rina", "Lany", "Marisna", "Lia", "Dewi", "Nadin", "Isa", "Kosna", "Tiya"],
  "Admin": ["Yenny", "Efi", "Gita"],
  "MC": ["Syafi'i", "Rozy", "Rully", "Shofi", "Supandi", "Andik", "Mudi", "Yazid", "Teguh", "Dimas", "Sukir", "Siti", "Sony", "Malik", "Adhim"],
  "Foto": ["Harry Photografer", "Zubeth", "Aang Angkasa", "Panoramic", "Bey (JRA)", "Jeck Potret"],
  "Video": ["Cloudy", "MD"],
  "Dry Smoke": ["Bram"],
  "Cucuk Lampah": ["Adjie Asmoro"],
  "Electone": ["Thony"]
};
const NAMA_SAMA = { lani: "lany" }; // ejaan lain untuk orang yang sama
const normNama = s => { const k = String(s || "").toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/^(pak|bu|buk|bapak|ibu|om|mas|mbak|kak|cow\.?)\s+/, "").replace(/[^a-z0-9']/g, ""); return NAMA_SAMA[k] || k; };
const rosterList = () => Object.entries(ROSTER).flatMap(([peran, names]) => names.map(nama => ({ id: uid(), nama, peran, hp: "", aktif: true })));
/* Ubah isian lama MC/Foto/Shot/Hena (teks) menjadi anggota tim yang dipilih */
function linkLegacy(d, o) {
  o.crew = o.crew || [];
  [["mc", "MC"], ["foto", "Foto"], ["shot", "Video"], ["hena", "Hena"]].forEach(([f, peran]) => {
    const v = String(o[f] || "").trim(); o[f] = "";
    if (!v || v === "-") return;
    let m = d.tim.find(x => normNama(x.nama) === normNama(v));
    if (!m) { m = { id: uid(), nama: v.replace(/\s*\(.*\)\s*$/, "").trim() || v, peran, hp: "", aktif: true }; d.tim.push(m); }
    if (!o.crew.includes(m.id)) o.crew.push(m.id);
    const ket = v.match(/\((.*?)\)/); if (ket) o.nb = [o.nb, `${peran}: ${ket[1]}`].filter(Boolean).join("\n");
  });
}
const logoSrc = () => (db && db.settings.logo) || LOGO_DEFAULT;

/* ---------- DATA ---------- */
function defaultDB() {
  const tim = rosterList();
  return {
    v: 1,
    settings: {
      bizName: "Harvy Wedding", tagline: "Profesional Makeup & Wedding Planner",
      alamat: "Jln. Raya Takerharjo RT 01 / RW 01, Solokuro, Lamongan",
      hpOwner: "082141145500", hpAdmin: "085549034700", ig: "Harvy_wedding_luthfiyah_z", fb: "Luthfiyah harvy wedding III",
      theme: "auto",
      footer: "• *Buat semuanya jgn lupa absen kehadiran ya 😊😊*\n• *Buat crew, besok smpai lokasi jgn lupa  langsung cek perlengkapan ya kak  🙏🏻*\n• *Sebelum pulang jgn lupa cek perlengkapan lagi, biar tidak ada yg ketinggalan 🙏😊*",
      waFormat: "briefing",
      waShow: { tanggal: true, ig: true, tiktok: true, ortu: true, hp: true, alamat: true, maps: true, paket: false, admin: true }
    },
    wilayah: clone(SEED.wilayah), paket: clone(SEED.paket), addons: clone(SEED.addons), tim,
    katalog: {
      nb: ["Ada prosesi injak telur", "Ada prosesi sungkem", "Ada kirab", "Ada pesan & kesan dari bridesmaid", "Pengapit cowok 1 & cewek 1", "Ada jagrak foto", "Tanpa akad, langsung resepsi", "Tanpa acara malam", "Ada acara malam", "Seluruh kru standby 2 jam sebelum acara", "Bongkar malam"],
      makeup: ["Manten siap dimake up jam … pagi", "Terima tamu dll siap dimake up jam … pagi", "Orang tua & besan dimake up jam … pagi", "Retouch make up resepsi jam …"],
      gaun: ["Putih kebaya", "Navy jarik", "Navy new jarik", "Emerald green", "Ivory new", "Reza jarik sorot"],
      pasangan: ["Blangkon", "Jas putih", "Jas ivory", "Jas emerald green", "Jas navy", "Beskap"],
      hijab: ["Hijab solo", "Hijab modern", "Hijab simple", "Tanpa hijab"],
      melati: ["Solo Putri", "Sunda Siger", "Biasa (bukan adat)"]
    },
    orders: [] // mulai kosong — data acara tersimpan di perangkat masing-masing
  };
}
let db;
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); return migrate(d); } } catch (e) { console.warn(e); }
  const d = defaultDB();
  try { importOldApp(d); } catch (e) { console.warn("Import data lama gagal", e); }
  d.orders.forEach(o => linkLegacy(d, o));
  removeDemoPeople(d); mergeDupes(d);
  d.settings.rosterV3 = true;
  return d;
}
/* Pindahkan data dari versi lama (Mahligai WO) yang tersimpan di perangkat ini — hanya sekali */
const OLD_ROLE = { "Asisten": "Asisten", "Perias": "MUA", "Fotografer": "Foto", "Videografer": "Video", "MC": "MC", "Sopir Logistik": "Sopir", "Admin WO & Koordinator": "Admin" };
const OLD_DEMO = ["event-rifqi-nabila-2026", "event-dimas-anggi-2026"];
const OLD_DEMO_PEOPLE = ["sarahmaharani", "rudi"]; // contoh bawaan aplikasi lama (Sarah Maharani, Mas Rudi) — bukan tim Harvy
/* gabungkan anggota tim yang namanya sama (mis. "Cow. Rozy" & "Pak Rozy" = Rozy) */
function mergeDupes(d) {
  const keep = new Map(), alias = {};
  const resmi = new Set(Object.values(ROSTER).flat()), urut = [...d.tim].sort((a, b) => resmi.has(b.nama) - resmi.has(a.nama)); // nama dari daftar resmi Harvy diutamakan
  urut.forEach(x => { const k = normNama(x.nama); if (!k) return; if (keep.has(k)) { const m = keep.get(k); alias[x.id] = m.id; if (!m.hp && x.hp) m.hp = x.hp; } else keep.set(k, x); });
  if (!Object.keys(alias).length) return;
  d.tim = d.tim.filter(x => !alias[x.id]);
  d.orders.forEach(o => { o.crew = [...new Set((o.crew || []).map(id => alias[id] || id))]; });
}
function removeDemoPeople(d) {
  const ids = d.tim.filter(x => OLD_DEMO_PEOPLE.includes(normNama(x.nama))).map(x => x.id);
  if (!ids.length) return;
  d.tim = d.tim.filter(x => !ids.includes(x.id));
  d.orders.forEach(o => { o.crew = (o.crew || []).filter(id => !ids.includes(id)); });
}
function importOldApp(d) {
  const rd = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch { return null; } };
  const oldCrew = rd("mahligai_master_crew_v2"), oldEv = rd("mahligai_wedding_events_fresh_v2"), oldBrand = rd("mahligai_brand_config_v2");
  if (!Array.isArray(oldCrew) && !Array.isArray(oldEv)) return;
  const findOrAdd = (nama, role) => {
    nama = String(nama || "").trim(); if (!nama) return null;
    let t = d.tim.find(x => normNama(x.nama) === normNama(nama));
    if (!t) { t = { id: uid(), nama, peran: OLD_ROLE[role] || role || "Crew Rias", hp: "", aktif: true }; d.tim.push(t); }
    return t;
  };
  (oldCrew || []).filter(c => !OLD_DEMO_PEOPLE.includes(normNama(c.name))).forEach(c => { const t = findOrAdd(c.name, c.role); if (t && c.phone && !t.hp) t.hp = c.phone; });
  const strip = s => String(s || "").replace(/^\s*[-•*]\s*/, "").trim();
  let n = 0;
  (oldEv || []).filter(e => e && !OLD_DEMO.includes(e.id)).forEach(e => {
    const locs = e.locations || [], ak = locs.find(l => l.isAkad), rs = locs.find(l => l.isReception) || locs[0] || {};
    const jam = l => l ? (l.time || [l.startTime, l.endTime].filter(Boolean).join(" - ")) : "";
    const o = blankOrder();
    o._oldLocs = locs.map(l => ({ jenis: l.isAkad && l.isReception ? "both" : l.isAkad ? "akad" : l.isReception ? "resepsi" : "lain", namaAcara: l.eventName || l.name || l.label || "", jamAkad: l.isAkad ? jam(l) : "", jamResepsi: l.isReception ? jam(l) : "", jam: jam(l), tempat: l.venueName || l.venueType || "", alamat: l.venueAddress || "", maps: "" }));
    Object.assign(o, {
      tanggal: e.date || "", nama: e.coupleName || "", ig: e.clientIg || "", hp: e.clientPhone || "", bapak: e.fatherName || "", ibu: e.motherName || "",
      mc: e.vendorMc || "", foto: e.vendorPhoto || "", shot: e.vendorVideo || "", hena: e.vendorHenna || "",
      jamAkad: e.akadTime || jam(ak), lokasiAkad: ak ? (ak.venueName || ak.venueType || "") : "", jamResepsi: e.resepsiTime || (rs.isReception ? jam(rs) : ""),
      alamatLain: rs.venueAddress || (ak && ak.venueAddress) || "", nb: e.specialNotes || "", gaun: [], wilayahId: d.wilayah[0]?.id || ""
    });
    lines(e.makeupNotes).forEach(x => o.jadwalMakeup += (o.jadwalMakeup ? "\n" : "") + strip(x));
    const cat = [];
    lines(e.attireNotes).forEach(x => {
      const m = x.match(/^\d+[.)]\s*(.*)$/); const mel = strip(x).match(/^melati\s*:\s*(.*)$/i);
      if (m) o.gaun.push({ baju: m[1], pasangan: "", hijab: "", harga: 0 }); else if (mel) o.melati = mel[1]; else cat.push(strip(x));
    });
    o.gaunCatatan = cat.join("; ");
    o.perlengkapan = lines(e.logisticsNotes).filter(x => !/untuk paket/i.test(x)).map(strip).join("\n");
    (e.crew || []).forEach(c => { if (["MC", "Fotografer", "Videografer"].includes(c.role)) return; const t = findOrAdd(c.name, c.role); if (t && !o.crew.includes(t.id)) o.crew.push(t.id); });
    d.orders.push(o); n++;
  });
  if (oldBrand && typeof oldBrand.logoUrl === "string" && oldBrand.logoUrl.startsWith("data:")) d.settings.logo = oldBrand.logoUrl;
  d._imported = n;
}
function migrate(d) {
  const def = defaultDB();
  const needRoster = !(d.settings && d.settings.rosterV3);
  for (const k of ["wilayah", "paket", "addons", "tim", "orders"]) if (!Array.isArray(d[k])) d[k] = def[k];
  d.settings = Object.assign({}, def.settings, d.settings || {});
  d.settings.waShow = Object.assign({}, def.settings.waShow, d.settings.waShow || {});
  d.katalog = Object.assign({}, def.katalog, d.katalog || {});
  removeDemoPeople(d); mergeDupes(d);
  d.tim.forEach(x => { if (x.peran === "Crew") x.peran = "Crew Rias"; if (!ROLES.includes(x.peran)) x.peran = "Lainnya"; });
  if (!d.settings.fakeNail) { // istilah "nail art" diganti "fake nail" (sekali)
    const fx = s => typeof s === "string" ? s.replace(/nail art/gi, m => m[0] === "N" ? "Fake nail" : "fake nail") : s;
    d.paket.forEach(pk => { pk.isi = fx(pk.isi); pk.deskripsi = fx(pk.deskripsi); });
    d.orders.forEach(o => { (o.kotak || []).forEach(b => { b.isi = fx(b.isi); }); o.isiPaket = fx(o.isiPaket); });
    d.settings.fakeNail = true;
  }
  if (needRoster) { rosterList().forEach(r => { if (!d.tim.some(x => normNama(x.nama) === normNama(r.nama))) d.tim.push(r); }); d.settings.rosterV3 = true; }
  d.orders.forEach(o => linkLegacy(d, o));
  canonTim(d);
  return d;
}
/* samakan nama & peran dengan daftar resmi Harvy, dan urutkan sesuai daftar itu (orang tambahan sendiri di belakang) */
function canonTim(d) {
  const resmi = Object.entries(ROSTER).flatMap(([peran, names]) => names.map(nama => ({ nama, peran })));
  const pos = x => resmi.findIndex(r => normNama(r.nama) === normNama(x.nama));
  d.tim.forEach(x => { const i = pos(x); if (i >= 0) { x.nama = resmi[i].nama; x.peran = resmi[i].peran; } });
  d.tim.sort((a, b) => { const i = pos(a), j = pos(b); return (i < 0 ? 1e6 : i) - (j < 0 ? 1e6 : j); });
}
/* ---------- PENYIMPANAN: IndexedDB (database bawaan perangkat) + cadangan localStorage ---------- */
const idb = (() => {
  let opening = null;
  const open = () => opening || (opening = new Promise((res, rej) => {
    if (typeof indexedDB === "undefined") return rej(new Error("IndexedDB tidak tersedia"));
    const r = indexedDB.open("harvy_wo", 1);
    r.onupgradeneeded = () => { const d = r.result; if (!d.objectStoreNames.contains("data")) d.createObjectStore("data"); if (!d.objectStoreNames.contains("snap")) d.createObjectStore("snap"); };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); r.onblocked = () => rej(new Error("IndexedDB terblokir"));
  }));
  const run = (store, mode, fn) => open().then(d => new Promise((res, rej) => {
    const tx = d.transaction(store, mode), req = fn(tx.objectStore(store));
    tx.oncomplete = () => res(req ? req.result : undefined); tx.onerror = () => rej(tx.error); tx.onabort = () => rej(tx.error);
  }));
  return {
    get: (s, k) => run(s, "readonly", st => st.get(k)), put: (s, k, v) => run(s, "readwrite", st => st.put(v, k)),
    del: (s, k) => run(s, "readwrite", st => st.delete(k)), all: s => run(s, "readonly", st => st.getAll())
  };
})();
const store = { idb: typeof indexedDB !== "undefined", mirror: true, ready: false };
let _idbQueue = Promise.resolve();
function save() {
  db.savedAt = Date.now();
  const json = JSON.stringify(db);
  if (store.mirror) { try { localStorage.setItem(KEY, json); } catch (e) { store.mirror = false; try { localStorage.removeItem(KEY); } catch {} } }
  if (store.idb && store.ready) _idbQueue = _idbQueue.then(() => idb.put("data", "db", json)).catch(e => { console.warn(e); store.idb = false; if (!store.mirror) toast("Gagal menyimpan — penyimpanan HP penuh. Download backup & hapus arsip lama."); });
  else if (!store.mirror && store.ready) toast("Gagal menyimpan — penyimpanan HP penuh. Download backup & hapus arsip lama.");
}
/* titik pulih: harian (7 hari) + sebelum hapus / reset / import / pulihkan (5 terakhir) */
async function snapshot(label, manual) {
  if (!store.idb || !store.ready) return;
  try {
    const at = Date.now(), id = manual ? "m-" + at : "d-" + todayStr();
    await idb.put("snap", id, { id, at, label: label || "Otomatis harian", ringkasan: { acara: db.orders.length, tim: db.tim.length, paket: db.paket.length }, data: JSON.stringify(db) });
    const all = await idb.all("snap"), by = pre => all.filter(r => r.id.startsWith(pre)).sort((a, b) => b.at - a.at);
    for (const r of [...by("d-").slice(7), ...by("m-").slice(5)]) await idb.del("snap", r.id);
  } catch (e) { console.warn("snapshot", e); }
}
db = load();

/* ---------- helpers ---------- */
const timById = id => db.tim.find(t => t.id === id);
const wilById = id => db.wilayah.find(w => w.id === id);
const paketById = id => db.paket.find(p => p.id === id);
/* ---------- LOKASI: satu acara bisa punya Lokasi 1, 2, dst ---------- */
const LJENIS = [["both", "Akad & resepsi"], ["akad", "Akad"], ["resepsi", "Resepsi"], ["lain", "Acara lain"]];
const newLok = (x = {}) => Object.assign({ id: uid(), jenis: "both", namaAcara: "", jamAkad: "", jamResepsi: "", jam: "", tempat: "", tempatAkad: "", alamat: "", maps: "" }, x);
const lokOf = o => (Array.isArray(o.lokasi) && o.lokasi.length ? o.lokasi : []);
const lokJudul = l => l.jenis === "lain" ? (String(l.namaAcara || "").trim() || "Acara lain") : (LJENIS.find(x => x[0] === l.jenis) || LJENIS[0])[1];
const akadDi = l => String(l.tempatAkad || "").trim() ? ` (di ${String(l.tempatAkad).trim().replace(/^di\s+/i, "")})` : "";
/* jam dipilih dengan pemilih jam ("07:00"); isian lama berupa teks tetap dipakai apa adanya */
const isJam = v => /^\d{1,2}:\d{2}$/.test(String(v || "").trim());
const jamFmt = v => isJam(v) ? String(v).trim().padStart(5, "0").replace(":", ".") + " WIB" : String(v || "").trim();
const normJam = v => { if (typeof v === "number" && v >= 0 && v < 1) { const m = Math.round(v * 1440); return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; } const s = String(v ?? "").trim(), x = s.match(/^(\d{1,2})[:.](\d{2})(?:\s*WIB)?$/i); return x ? `${x[1].padStart(2, "0")}:${x[2]}` : s; };
const lokJam = l => l.jenis === "both" ? [["Akad", jamFmt(l.jamAkad) + akadDi(l)], ["Resepsi", jamFmt(l.jamResepsi)]] : l.jenis === "akad" ? [["Akad", jamFmt(l.jamAkad) + akadDi(l)]] : l.jenis === "resepsi" ? [["Resepsi", jamFmt(l.jamResepsi)]] : [[lokJudul(l), jamFmt(l.jam)]];
const lokKe = o => String(o.lokasiKe || "").trim();
const lokLabel = o => "LOKASI" + (lokKe(o) ? " " + lokKe(o) : "");
const lokTempat = l => [l.tempat, l.alamat].map(x => String(x || "").trim()).filter(Boolean).join(", ");
/* alamat lama (sebelum ada Lokasi 1/2) */
function alamatLama(o) {
  if (o.alamatLain && o.alamatLain.trim()) return o.alamatLain.trim();
  const a = [];
  if (o.dsn) a.push("Dsn. " + o.dsn);
  const desa = o.desa ? "Desa " + o.desa : "", rtrw = [o.rt && "RT " + o.rt, o.rw && "RW " + o.rw].filter(Boolean).join(" / ");
  if (desa || rtrw) a.push([desa, rtrw].filter(Boolean).join(" "));
  if (o.kec) a.push(o.kec); if (o.kab) a.push(o.kab);
  return a.join(", ");
}
/* satu acara = satu lokasi (akad & resepsi bisa di lokasi yang sama). Data lama / data yang sempat terpecah digabung jadi satu. */
function toLokasi(o) {
  if (Array.isArray(o._oldLocs) && o._oldLocs.length && !lokOf(o).length) o.lokasi = o._oldLocs.map(x => newLok(x));
  delete o._oldLocs;
  if (!lokOf(o).length) {
    const a = String(o.jamAkad || o.lokasiAkad || "").trim(), r = String(o.jamResepsi || "").trim();
    const j = o.jenisAcara || (a && !r ? "akad" : r && !a ? "resepsi" : "both");
    o.lokasi = [newLok({ jenis: j, jamAkad: o.jamAkad || "", jamResepsi: o.jamResepsi || "", tempatAkad: j === "both" ? String(o.lokasiAkad || "").trim() : "", tempat: j === "akad" ? String(o.lokasiAkad || "").trim().replace(/^di\s+/i, "") : "", alamat: alamatLama(o), maps: String(o.mapsLink || "").trim() })];
  }
  if (o.lokasi.length > 1) {
    const L = o.lokasi, ak = L.find(l => l.jenis === "akad" || l.jenis === "both"), rs = L.find(l => l.jenis === "resepsi" || l.jenis === "both");
    const main = rs || ak || L[0], jenis = ak && rs ? "both" : ak ? "akad" : rs ? "resepsi" : main.jenis;
    const beda = ak && rs && ak !== rs ? lokTempat(ak) : "";
    const sisa = L.filter(l => l !== main && l !== ak && l !== rs);
    o.lokasi = [newLok({ ...main, jenis, jamAkad: ak ? ak.jamAkad : "", jamResepsi: rs ? rs.jamResepsi : "", tempatAkad: beda || main.tempatAkad || "", maps: main.maps || (L.find(l => l.maps) || {}).maps || "" })];
    // lokasi lain (mis. acara lain) jangan hilang: simpan ke catatan
    if (sisa.length) o.nb = [o.nb, ...sisa.map(l => `${lokJudul(l)}: ${[l.jam || l.jamAkad || l.jamResepsi, lokTempat(l)].filter(Boolean).join(" — ")}`)].filter(Boolean).join("\n");
  }
  o.lokasi.forEach(l => { if (!("tempatAkad" in l)) l.tempatAkad = ""; });
  return o;
}
const alamatStr = o => lokOf(o).map(lokTempat).filter(Boolean).join(" | ");
function acaraStr(o) {
  const p = lokOf(o).map(l => lokJam(l).map(([n, j]) => [n, j].filter(x => String(x || "").trim()).join(" ")).join(", "));
  if (o.acaraMalam) p.push("ada acara malam");
  return p.join(" · ");
}
/* Apa yang masih kosong supaya jadwal siap dikirim ke grup */
function missing(o) {
  const m = [], L = lokOf(o);
  if (!o.tanggal) m.push("tanggal");
  if (!L.length) m.push("lokasi");
  L.forEach(l => {
    if (!lokTempat(l)) m.push("alamat");
    lokJam(l).forEach(([nm, j]) => { if (!String(j || "").replace(/\(di .*\)$/, "").trim()) m.push(`jam ${nm.toLowerCase()}`); });
  });
  if (!(o.crew || []).length) m.push("crew");
  return m;
}
function statusOf(o) {
  if (o.batal) return ["Batal", "bad"];
  const m = missing(o);
  if (m.length) return ["Belum lengkap", "warn"];
  return [`${(o.crew || []).length} kru`, "ok"];
}
const WA_FIELDS = [["tanggal", "Tanggal"], ["ig", "IG"], ["tiktok", "TikTok"], ["ortu", "Orang tua"], ["hp", "No HP"], ["alamat", "Alamat"], ["maps", "Link lokasi"], ["paket", "Paket"], ["admin", "Kontak admin"]];
const roleIdx = r => { const i = ROLES.indexOf(r); return i < 0 ? 99 : i; };
const teamOf = o => (o.crew || []).map(id => timById(id)).filter(Boolean).sort((a, b) => roleIdx(a.peran) - roleIdx(b.peran));
const NON_CREW = ["MC", "Foto", "Video", "Hena", "Dry Smoke", "Cucuk Lampah", "Electone"];
const crewNames = o => teamOf(o).filter(t => !NON_CREW.includes(t.peran)).map(t => t.nama);
const roleNames = (o, r) => teamOf(o).filter(t => t.peran === r).map(t => t.nama).join(", ");
const teamLine = t => `${t.nama} - ${t.peran}${t.hp ? ` (${t.hp})` : ""}`;
const initials = n => String(n || "?").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
const ambilLink = s => { const m = String(s || "").match(/https?:\/\/\S+/); return m ? m[0].replace(/[).,]+$/, "") : String(s || "").trim(); };
const paketLabel = o => { const p = paketById(o.paketId); if (p && o.paketMode !== "") return `${p.nama} · ${wilById(p.wilayahId)?.nama || ""}`; return String(o.paketNama || "").trim() || (String(o.isiPaket || "").trim() ? "Paket custom" : "-"); };
const activeOrders = () => db.orders.filter(o => !o.batal);
const sortByDate = arr => arr.sort((a, b) => (a.tanggal || "9999").localeCompare(b.tanggal || "9999"));
const conflicts = (crewId, tanggal, exceptId) => tanggal ? db.orders.filter(o => !o.batal && o.id !== exceptId && o.tanggal === tanggal && (o.crew || []).includes(crewId)) : [];

/* ---------- WA text ---------- */
/* pratinjau: tampilkan *tebal* dan _miring_ seperti di WhatsApp */
let curWA = "";
const waFmt = t => esc(t).replace(/\*([^*\n]+)\*/g, "<b>$1</b>").replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,]|$)/gm, "$1<i>$2</i>");
const waCrew = (o, show = db.settings.waShow) => db.settings.waFormat === "klasik" ? waKlasik(o, show) : waBriefing(o, show);
const isi = x => { const s = String(x ?? "").trim(); return s && s !== "-" ? s : ""; };
const waNum = p => { p = String(p || "").replace(/\D/g, ""); return p.startsWith("0") ? "62" + p.slice(1) : p; };
/* Format briefing rapi ber-emoji (bawaan) */
function waBriefing(o, show = db.settings.waShow) {
  const s = db.settings, GAR = "----------------------------------------", L = [];
  const sec = (judul, rows) => { rows = rows.filter(Boolean); if (rows.length) { L.push(GAR); L.push(judul); rows.forEach(r => L.push(r)); L.push(""); } };
  L.push("*BRIEFING ACARA PERNIKAHAN*");
  L.push(`*${s.bizName.toUpperCase()}*`);
  L.push(GAR);
  if (show.tanggal) L.push(`📅 *TANGGAL:* ${o.tanggal ? fmtD(o.tanggal) : "-"}`, "");
  L.push(`✨ *MEMPELAI:* ${o.nama || "-"}`);
  if (show.ig && isi(o.ig)) L.push(`📸 *IG MANTEN:* ${o.ig}`);
  if (show.tiktok && isi(o.tiktok)) L.push(`🎵 *TIKTOK:* ${o.tiktok}`);
  if (show.ortu) { const ot = [isi(o.bapak) && "Bpk. " + o.bapak, isi(o.ibu) && "Ibu " + o.ibu].filter(Boolean).join(" & "); if (ot) L.push(`👥 *ORANG TUA:* ${ot}`); }
  if (show.hp && isi(o.hp)) L.push(`📱 *NO. HP/WA:* ${o.hp}`);
  L.push("");
  lokOf(o).forEach(l => sec(`📍 *${lokLabel(o)} — ${lokJudul(l).toUpperCase()}*`, [
    ...lokJam(l).map(([n, j]) => `• ${n}: ${isi(j) || "-"}`),
    isi(l.tempat) && `• Tempat: ${l.tempat}`,
    show.alamat && isi(l.alamat) && `• Alamat: ${l.alamat}`,
    show.maps && isi(l.maps) && `• Google Maps: ${l.maps}`
  ]));
  if (o.acaraMalam) sec("🌙 *ACARA MALAM:*", ["• Ada acara malam"]);
  sec("💄 *JADWAL MAKE UP:*", kisi(o, "makeup").map(x => "• " + x));
  sec("👗 *URUTAN GAUN & BUSANA:*", [
    ...kisi(o, "gaun").map((x, i) => `${i + 1}. ${x}`),
    kisi(o, "melati").length && `🌼 Melati: ${kisi(o, "melati").join(", ")}`
  ]);
  sec("🎪 *PAKET & FASILITAS:*", [
    show.paket && paketLabel(o) !== "-" && `• Paket: ${paketLabel(o)}`,
    ...otherBoxes(o).map(b => `▪️ *${b.judul || "Lainnya"}:* ${lines(b.isi).map(x => x.replace(BUL, "")).join(", ")}`)
  ]);
  sec("🚚 *PERLENGKAPAN DIBAWA:*", kisi(o, "perlengkapan").map((x, i) => `${i + 1}. ${x}`));
  sec("👥 *TIM KRU BERTUGAS:*", teamOf(o).map((t, i) => `${i + 1}. ${teamLine(t)}`));
  sec("📝 *KETERANGAN:*", kisi(o, "nb").map(x => "• " + x));
  if (s.footer.trim()) { L.push(GAR); L.push(s.footer.trim()); L.push(""); }
  const adm = s.hpAdmin || s.hpOwner;
  if (show.admin && adm) { L.push(GAR); L.push("📞 *NARAHUBUNG ADMIN WO:*"); L.push(`Admin ${s.bizName} (${adm})`); L.push(`Chat WA: https://wa.me/${waNum(adm)}`); }
  L.push(`— Tim ${s.bizName.toUpperCase()}.`);
  return L.join("\n").replace(/\n{3,}/g, "\n\n");
}
/* Format klasik (seperti pesan grup lama) */
function waKlasik(o, show = db.settings.waShow) {
  const L = [], v = x => (x && String(x).trim()) ? x : "-";
  if (show.tanggal) L.push(`*Tanggal*      : ${o.tanggal ? fmtD(o.tanggal) : "-"}`);
  L.push(`*Nama*        : ${v(o.nama)}`);
  if (show.ig) L.push(`*IG Manten* : ${v(o.ig)}`);
  if (show.tiktok) L.push(`*Tik tok*       : ${v(o.tiktok)}`);
  if (show.ortu) { L.push(`*Bapak*        : ${v(o.bapak)}`); L.push(`*Ibu*             : ${v(o.ibu)}`); }
  if (show.hp) L.push(`*No. Hp*      : ${v(o.hp)}`);
  const lk = lokOf(o)[0] || {};
  if (lokKe(o)) L.push(`*Lokasi*        : ${lokKe(o)}`);
  if (show.alamat) L.push(`*Alamat*      : ${v(lokTempat(lk))}`);
  if (show.maps && isi(lk.maps)) L.push(`*Maps*          : ${lk.maps}`);
  L.push(`*Acara*        : ${v(acaraStr(o))}`);
  if (show.paket) L.push(`*Paket*        : ${v(paketLabel(o))}`);
  L.push(`*MC*             : ${v(roleNames(o, "MC"))}`);
  L.push(`*Foto*           : ${v(roleNames(o, "Foto"))}`);
  L.push(`*Shot*           : ${v(roleNames(o, "Video"))}`);
  ["Dry Smoke", "Cucuk Lampah", "Electone"].forEach(r => { if (roleNames(o, r)) L.push(`*${r}* : ${roleNames(o, r)}`); });
  const g = kisi(o, "gaun");
  L.push(`*Gaun*          : ${g.length ? "" : "-"}`);
  g.forEach((x, i) => L.push(` ${i + 1}. ${x}`));
  L.push("");
  L.push(`*Melati*         : ${v(kisi(o, "melati").join(", "))}`);
  const c = crewNames(o);
  L.push(`*Crew*           :${c.length ? "" : " -"}`);
  c.forEach((n, i) => L.push(`                           ${i + 1}. ${n}`));
  L.push(`*Hena*           : ${v(roleNames(o, "Hena"))}`);
  otherBoxes(o).forEach(b => L.push(`*${b.judul || "Lainnya"}* : ${lines(b.isi).map(x => x.replace(BUL, "")).join(", ")}`));
  const nb = kisi(o, "nb");
  if (nb.length) { L.push(""); L.push("Nb :"); nb.forEach(x => L.push(`- ${x}`)); }
  const jm = kisi(o, "makeup");
  if (jm.length) { L.push(""); jm.forEach(x => L.push(`- ${x}`)); }
  const pl = kisi(o, "perlengkapan");
  if (pl.length) { L.push(""); L.push(`- *Untuk paket yg ikut dr ${db.settings.bizName.split(" ")[0].toLowerCase()} :*`); pl.forEach(x => L.push(`- ${x}`)); }
  if (db.settings.footer.trim()) { L.push(""); L.push(db.settings.footer.trim()); }
  return L.join("\n");
}
function waRekap(list, judul) {
  const L = [`*${judul}*`, ""];
  if (!list.length) L.push("Belum ada acara.");
  list.forEach((o, i) => {
    L.push(`*${i + 1}. ${o.nama}* — ${o.tanggal ? fmtD(o.tanggal, { weekday: "long", day: "numeric", month: "long" }) : "tgl belum ada"}`);
    lokOf(o).forEach(l => {
      L.push(`   📍 ${lokKe(o) ? `Lokasi ${lokKe(o)} · ` : ""}${lokJam(l).map(([n, jm]) => [n, jm].filter(x => isi(x)).join(" ")).join(", ")}${lokTempat(l) ? " — " + lokTempat(l) : ""}`);
      L.push(`   🗺️ ${isi(l.maps) || "link lokasi belum ada"}`);
    });
    if (o.acaraMalam) L.push("   🌙 ada acara malam");
    const tm = teamOf(o); L.push(`   👥 ${tm.length ? tm.map(t => `${t.nama} (${t.peran})`).join(", ") : "-"}`);
    L.push("");
  });
  if (db.settings.footer.trim()) L.push(db.settings.footer.trim());
  return L.join("\n");
}
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); }
  catch { const ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
  toast("Teks disalin — tinggal tempel di grup WA");
}
function waLink(text, phone) {
  let p = String(phone || "").replace(/\D/g, ""); if (p.startsWith("0")) p = "62" + p.slice(1);
  return `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
}
async function shareText(text) {
  if (navigator.share) { try { await navigator.share({ text }); return; } catch (e) { if (e.name === "AbortError") return; } }
  window.open(waLink(text), "_blank");
}

/* ---------- UI helpers ---------- */
function toast(msg) { $$(".toast").forEach(t => t.remove()); const t = document.createElement("div"); t.className = "toast"; t.innerHTML = ic("check") + esc(msg); document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
function modal(html, onMount) {
  const bg = document.createElement("div"); bg.className = "modal-bg"; bg.innerHTML = `<div class="modal" role="dialog">${html}</div>`;
  const close = () => bg.remove();
  bg.addEventListener("click", e => { if (e.target === bg || e.target.closest("[data-close]")) close(); });
  document.body.appendChild(bg); onMount && onMount(bg.firstElementChild, close); return close;
}
function confirmBox(msg, okLabel = "Hapus") {
  return new Promise(res => {
    modal(`<h2>Yakin?</h2><p>${esc(msg)}</p><div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn" data-close>Batal</button><button class="btn gold" id="okc">${esc(okLabel)}</button></div>`,
      (m, close) => { $("#okc", m).onclick = () => { close(); res(true); }; m.parentElement.addEventListener("click", e => { if (e.target.closest("[data-close]") || e.target === m.parentElement) res(false); }); });
  });
}
function applyTheme() {
  const t = db.settings.theme; if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = t;
  $("#logo1").src = logoSrc(); $("#bizName1").textContent = db.settings.bizName;
}
const NAV = [["dashboard", "Dashboard", "home"], ["acara", "Acara", "list"], ["arsip", "Arsip", "arsip"], ["kalender", "Kalender", "cal"], ["tim", "Tim", "users"], ["pengaturan", "Pengaturan", "set"]];
const navBy = k => NAV.find(x => x[0] === k);
function renderNav(cur) {
  $("#nav").innerHTML = NAV.map(([k, l, i]) => `<a href="#/${k}" class="${cur === k ? "on" : ""}">${ic(i)}${l}</a>`).join("");
  const tb = [navBy("dashboard"), navBy("acara"), ["acara/baru", "Baru", "plus"], navBy("kalender"), navBy("pengaturan")];
  $("#tabbar").innerHTML = tb.map(([k, l, i]) => k === "acara/baru"
    ? `<a href="#/acara/baru" class="fab"><span class="c">${ic(i)}</span></a>`
    : `<a href="#/${k}" class="${cur === k ? "on" : ""}">${ic(i)}<span>${l}</span></a>`).join("");
}
const mtop = () => `<div class="mtop"><img src="${esc(logoSrc())}" alt=""><b>${esc(db.settings.bizName)}</b></div>`;
function evRow(o, extra = "") {
  const d = parseD(o.tanggal), [ps, pc] = statusOf(o), dt = daysTo(o.tanggal);
  const hd = o.tanggal ? (dt === 0 ? "Hari ini" : dt === 1 ? "Besok" : dt > 0 ? `H-${dt}` : "") : "";
  return `<a class="ev" href="#/acara/${esc(o.id)}">
    <div class="date ${d ? "" : "none"}">${d ? `<small>${d.toLocaleDateString("id-ID", { month: "short" })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString("id-ID", { weekday: "short" })}</small>` : `<b>?</b><small>tgl</small>`}</div>
    <div class="grow" style="min-width:0"><div class="t">${esc(o.nama || "Tanpa nama")}</div>
      <div class="m"><span>${ic("pin")}${esc(alamatStr(o) || "Alamat belum diisi")}</span>${acaraStr(o) ? `<span>${ic("clock")}${esc(acaraStr(o))}</span>` : ""}${extra}</div></div>
    <div class="r">${hd ? `<span class="pill gold">${hd}</span>` : ""}<span class="pill ${pc}">${esc(ps)}</span>${(() => { const L = lokOf(o), withMaps = L.map((l, i) => [l, i]).filter(([l]) => isi(l.maps)); return `${lokKe(o) ? `<span class="pill gold">Lokasi ${esc(lokKe(o))}</span>` : ""}${withMaps.length ? withMaps.map(([l, i]) => `<span class="pill maps" role="button" data-act="openmaps" data-id="${esc(o.id)}" data-li="${i}" title="Buka di Google Maps">${ic("pin")}Maps</span>`).join("") : (o.tanggal && o.tanggal >= todayStr() && !o.batal ? `<span class="pill">tanpa link lokasi</span>` : "")}`; })()}</div></a>`;
}

/* ---------- VIEWS ---------- */
function vDashboard() {
  const t = todayStr(), now = new Date();
  const act = activeOrders();
  const upcoming = sortByDate(act.filter(o => o.tanggal && o.tanggal >= t && !o.selesai));
  const mKey = t.slice(0, 7);
  const thisMonth = act.filter(o => (o.tanggal || "").startsWith(mKey));
  const wEnd = sebulanLagi();
  const week = upcoming.filter(o => o.tanggal <= wEnd);
  const kurang = upcoming.filter(o => missing(o).length);
  const kruMinggu = new Set(week.flatMap(o => o.crew || [])).size;
  const nodate = act.filter(o => !o.tanggal);
  const next = upcoming[0];
  const hr = now.getHours(), salam = hr < 11 ? "Selamat pagi" : hr < 15 ? "Selamat siang" : hr < 18 ? "Selamat sore" : "Selamat malam";
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(now.getFullYear(), now.getMonth() + i, 1); const k = ymd(d).slice(0, 7); return { l: d.toLocaleDateString("id-ID", { month: "short" }), n: act.filter(o => (o.tanggal || "").startsWith(k)).length }; });
  const mx = Math.max(1, ...months.map(m => m.n));
  return `${mtop()}${installCard()}${backupReminder()}<div class="top"><div><h1>${salam} ✨</h1><p>${fmtD(t)}</p></div>
    <div class="row noprint"><button class="btn" data-act="rekap">${ic("wa")}Rekap 1 bulan ke depan</button><a class="btn gold" href="#/acara/baru">${ic("plus")}Acara Baru</a></div></div>
  ${next ? `<div class="card today" style="margin-bottom:16px"><div class="lbl">${daysTo(next.tanggal) === 0 ? "Acara hari ini" : "Acara terdekat · H-" + daysTo(next.tanggal)}</div>
    <h2 class="sec-h">${esc(next.nama)}</h2><div class="muted">${fmtD(next.tanggal)} · ${esc(alamatStr(next) || "-")}</div>
    <div class="muted small" style="margin-top:4px">${esc(acaraStr(next) || "")}${crewNames(next).length ? " · Crew: " + esc(crewNames(next).join(", ")) : ""}</div>
    <div class="row" style="margin-top:14px;position:relative;z-index:1"><a class="btn sm gold" href="#/acara/${next.id}">Lihat detail</a><button class="btn sm wa" data-act="sendcrew" data-id="${next.id}">${ic("wa")}Kirim ke grup</button></div></div>` : ""}
  <div class="grid g4" style="margin-bottom:16px">
    <div class="card stat hero"><div class="k">${ic("cal")}Bulan ini</div><div class="v">${thisMonth.length}</div><div class="s">acara · ${now.toLocaleDateString("id-ID", { month: "long" })}</div></div>
    <div class="card stat"><div class="k">${ic("clock")}1 bulan ke depan</div><div class="v">${week.length}</div><div class="s">acara s/d ${fmtD(wEnd, { day: "numeric", month: "short" })}</div></div>
    <div class="card stat"><div class="k">${ic("users")}Kru 1 bulan ke depan</div><div class="v">${kruMinggu}</div><div class="s">orang bertugas</div></div>
    <div class="card stat"><div class="k">${ic("edit")}Perlu dilengkapi</div><div class="v">${kurang.length + nodate.length}</div><div class="s">acara belum lengkap</div></div>
  </div>
  <div class="grid dash">
    <div class="card"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2 style="margin:0">Jadwal mendatang</h2><a href="#/acara" class="small">Semua →</a></div>
      ${upcoming.length ? upcoming.slice(0, 8).map(o => evRow(o)).join("") : `<div class="empty">${ic("cal")}<div>Belum ada acara mendatang.</div><a class="btn gold sm" style="margin-top:10px" href="#/acara/baru">Tambah acara</a></div>`}
      ${nodate.length ? `<div class="hr"></div><h3>Belum ada tanggal (${nodate.length})</h3>${nodate.map(o => evRow(o)).join("")}` : ""}
    </div>
    <div class="grid" style="align-content:start">
      <div class="card"><h2>6 bulan ke depan</h2><div class="bars">${months.map(m => `<div class="b"><em>${m.n || ""}</em><i class="${m.n ? "" : "z"}" style="height:${Math.max(4, m.n / mx * 100)}%"></i><span>${m.l}</span></div>`).join("")}</div></div>
      <div class="card"><h2>Perlu dilengkapi</h2>${kurang.length + nodate.length ? [...kurang, ...nodate].slice(0, 8).map(o => `<a class="li" href="#/acara/${esc(o.id)}/edit" style="text-decoration:none;color:inherit"><div class="grow"><div class="t">${esc(o.nama)}</div><div class="small muted">${o.tanggal ? fmtD(o.tanggal, { day: "numeric", month: "short", year: "numeric" }) : "tanggal belum ada"}</div></div><span class="pill warn">belum: ${esc(missing(o).join(", "))}</span></a>`).join("") : `<div class="empty small">Semua jadwal sudah lengkap 👍</div>`}</div>
    </div>
  </div>`;
}

let listState = { q: "", f: "mendatang" };
function vAcara() {
  const t = todayStr();
  let arr = db.orders.slice();
  const q = listState.q.toLowerCase().trim();
  if (q) arr = arr.filter(o => [o.nama, alamatStr(o), o.hp, o.ig, o.tiktok, o.ibu, o.bapak, teamOf(o).map(x => x.nama).join(" ")].join(" ").toLowerCase().includes(q));
  const f = listState.f;
  if (f === "mendatang") arr = arr.filter(o => !isArsip(o));
  if (f === "belum") arr = arr.filter(o => !isArsip(o) && missing(o).length);
  sortByDate(arr);
  const groups = {};
  arr.forEach(o => { const k = o.tanggal ? o.tanggal.slice(0, 7) : "zz"; (groups[k] = groups[k] || []).push(o); });
  const F = [["mendatang", "Mendatang"], ["belum", "Perlu dilengkapi"], ["semua", "Semua"], ["arsip", `Arsip (${db.orders.filter(isArsip).length}) →`]];
  return `${mtop()}<div class="top"><div><h1>Acara</h1><p>${db.orders.length} data calon pengantin</p></div><div class="row"><button class="btn" data-act="exportxlsx">${ic("down")}Excel</button><a class="btn gold" href="#/acara/baru">${ic("plus")}Acara Baru</a></div></div>
  <div class="row" style="margin-bottom:12px"><div class="search">${ic("search")}<input class="in" id="q" placeholder="Cari nama, desa, no HP…" value="${esc(listState.q)}"></div></div>
  <div class="tabs">${F.map(([k, l]) => `<button class="tab ${f === k ? "on" : ""}" data-filter="${k}">${l}</button>`).join("")}</div>
  <div id="listwrap">${arr.length ? Object.keys(groups).sort().map(k => `<div class="month-h"><span>${k === "zz" ? "Belum ada tanggal" : parseD(k + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</span><span>${groups[k].length} acara</span></div><div class="card" style="padding:6px">${groups[k].map(o => evRow(o)).join("")}</div>`).join("") : `<div class="card empty">${ic("search")}<div>Tidak ada acara yang cocok.</div></div>`}</div>`;
}

function vDetail(id) {
  const o = db.orders.find(x => x.id === id); if (!o) return `<div class="card empty">Data tidak ditemukan. <a href="#/acara">Kembali</a></div>`;
  const [ps, pc] = statusOf(o), s = db.settings.waShow;
  const kv = (k, v) => `<dt>${k}</dt><dd>${esc(v || "-")}</dd>`;
  const cl = checklistItems(o);
  const cekDone = cl.filter(x => o.cek?.[x]?.d).length, cekPulang = cl.filter(x => o.cek?.[x]?.p).length;
  const crew = (o.crew || []).map(id => timById(id)).filter(Boolean);
  return `${mtop()}<a class="back noprint" href="#/acara">${ic("left")}Acara</a>
  <div class="top"><div><h1>${esc(o.nama || "Tanpa nama")}</h1><p>${fmtD(o.tanggal)} &nbsp;<span class="pill ${pc}">${esc(ps)}</span></p></div>
    <div class="row noprint">${lokOf(o).map((l, i) => isi(l.maps) ? `<button class="btn wa" data-act="openmaps" data-id="${esc(o.id)}" data-li="${i}">${ic("pin")}Buka lokasi</button>` : "").join("")}<button class="btn" data-act="dup" data-id="${esc(o.id)}">${ic("dup")}Duplikat</button><a class="btn gold" href="#/acara/${esc(o.id)}/edit">${ic("edit")}Edit</a></div></div>
  <div class="grid dash">
    <div class="grid" style="align-content:start">
      <div class="card"><h2>Jadwal untuk grup WA</h2>
        <div class="row small noprint" style="gap:14px;margin-bottom:10px">${WA_FIELDS.map(([k, l]) => `<label class="toggle"><input type="checkbox" data-wshow="${k}" ${s[k] ? "checked" : ""}>${l}</label>`).join("")}</div>
        <div class="wa-prev"><div class="bubble" id="watext">${waFmt(curWA = waCrew(o))}</div></div>
        <div class="row noprint" style="margin-top:12px"><button class="btn wa grow" data-act="share" data-id="${esc(o.id)}">${ic("share")}Kirim / Bagikan</button><button class="btn grow" data-act="copy">${ic("copy")}Salin teks</button></div>
        <p class="small muted" style="margin:8px 0 0">Di HP: tekan <b>Kirim / Bagikan</b> lalu pilih WhatsApp → grup. Di laptop: <b>Salin teks</b> lalu tempel di WhatsApp Web.</p>
      </div>
      <div class="card"><h2>Data pengantin</h2><dl class="kv">
        ${kv("IG", o.ig)}${kv("TikTok", o.tiktok)}${kv("Bapak", o.bapak)}${kv("Ibu", o.ibu)}${kv("No. HP", o.hp)}${lokOf(o).map(l => kv(lokKe(o) ? `Lokasi ${esc(lokKe(o))}` : "Lokasi", [lokJudul(l) + ": " + lokJam(l).map(([n, j]) => [n, j].filter(x => isi(x)).join(" ")).join(", "), l.tempat, l.alamat, isi(l.maps) || "link lokasi belum ada"].filter(x => isi(x)).join("\n"))).join("")}${o.acaraMalam ? kv("Acara malam", "Ada") : ""}${kv("Paket", paketLabel(o))}
        ${kv("Tim", teamOf(o).map(teamLine).join("\n"))}${(o.kotak || []).filter(b => lines(b.isi).length).map(b => kv(esc(b.judul || "Lainnya"), lines(b.isi).map(x => x.replace(BUL, "")).join("\n"))).join("")}</dl></div>
    </div>
    <div class="grid" style="align-content:start">
${missing(o).length ? `      <div class="card" style="border-color:var(--warn)"><h2>Belum lengkap</h2><p class="small muted" style="margin:0 0 10px">Masih kosong: <b>${esc(missing(o).join(", "))}</b></p><a class="btn sm gold" href="#/acara/${esc(o.id)}/edit">${ic("edit")}Lengkapi</a></div>` : ""}
      <div class="card"><div class="row" style="justify-content:space-between;margin-bottom:10px"><h2 style="margin:0">Tim & absen</h2><button class="btn sm gold noprint" data-act="pickteam-detail" data-id="${esc(o.id)}">${ic("users")}Atur tim</button></div>${crew.length ? `<div class="checks">${crew.map(t => `<label class="ck ${o.absen?.[t.id] ? "done" : ""}"><input type="checkbox" data-absen="${t.id}" ${o.absen?.[t.id] ? "checked" : ""}><div class="avatar" style="width:30px;height:30px;font-size:12px">${esc(t.nama[0])}</div><span>${esc(t.nama)}</span><span class="pill" style="margin-left:auto">${esc(t.peran)}</span></label>`).join("")}</div><div class="small muted" style="margin-top:6px">${crew.filter(x => o.absen?.[x.id]).length}/${crew.length} hadir</div>` : `<div class="muted small">Belum ada crew dipilih.</div>`}</div>
      <div class="card"><h2>Cek perlengkapan</h2>${cl.length ? `<div class="cl-row small muted" style="font-weight:600"><span>Item</span><span style="text-align:center">Datang</span><span style="text-align:center">Pulang</span></div>${cl.map(x => `<div class="cl-row"><span>${esc(x)}</span><input type="checkbox" data-cek="${esc(x)}" data-k="d" ${o.cek?.[x]?.d ? "checked" : ""}><input type="checkbox" data-cek="${esc(x)}" data-k="p" ${o.cek?.[x]?.p ? "checked" : ""}></div>`).join("")}<div class="small muted" style="margin-top:8px">Datang ${cekDone}/${cl.length} · Pulang ${cekPulang}/${cl.length}</div>` : `<div class="muted small">Isi kotak “Perlengkapan dibawa” di form untuk membuat checklist.</div>`}</div>
      <div class="row noprint"><button class="btn sm" data-act="pdf1" data-id="${esc(o.id)}">${ic("down")}Download PDF</button><button class="btn sm" data-act="selesai" data-id="${esc(o.id)}">${o.selesai ? "Kembalikan dari arsip" : `${ic("arsip")}Tandai selesai`}</button><button class="btn sm ${o.batal ? "" : "danger"}" data-act="batal" data-id="${esc(o.id)}">${o.batal ? "Aktifkan lagi" : "Tandai batal"}</button><button class="btn sm danger" data-act="del" data-id="${esc(o.id)}">${ic("trash")}Hapus</button></div>
    </div>
  </div>`;
}
function checklistItems(o) {
  const set = new Set([...kisi(o, "perlengkapan").map(x => x.replace(/\.$/, "")), ...(o.tambahan || []).map(t => t.nama + (num(t.qty) > 1 ? " ×" + t.qty : ""))]);
  return [...set].filter(Boolean);
}

/* ---------- FORM ---------- */
let draft = null;
function blankOrder() {
  return { id: uid(), dibuat: Date.now(), tanggal: "", nama: "", ig: "", tiktok: "", bapak: "", ibu: "", hp: "", dsn: "", rt: "", rw: "", desa: "", kec: "", kab: "", lokasiAkad: "", jamAkad: "", jamResepsi: "", acaraMalam: false, lokasiKe: "", lokasi: null, kotak: null, paketMode: "", jenisAcara: "both", alamatLain: "", mapsLink: "", wilayahId: (db && db.wilayah[0]?.id) || "w1", paketId: "", paketNama: "", hargaPaket: 0, isiPaket: "", dekor: "", gaun: [{ baju: "", pasangan: "", hijab: "" }], gaunCatatan: "", melati: "", melatiReq: "", melatiHarga: 0, mc: "", foto: "", shot: "", hena: "", crew: [], tambahan: [], potongan: [], transport: 0, bayar: [], nb: "", jadwalMakeup: "", perlengkapan: "", batal: false, absen: {}, cek: {} };
}
const fi = (k, label, ph = "", type = "text", extra = "") => `<label class="f">${label}<input class="in" data-b="${k}" type="${type}" value="${esc(draft[k])}" placeholder="${esc(ph)}" ${extra}></label>`;
const dl = (id, arr) => `<datalist id="${id}">${[...new Set(arr)].map(x => `<option value="${esc(x)}">`).join("")}</datalist>`;
function vForm(id) {
  if (!draft || draft._for !== (id || "new")) {
    const src = id ? db.orders.find(o => o.id === id) : null;
    if (id && !src) return `<div class="card empty">Data tidak ditemukan.</div>`;
    draft = src ? JSON.parse(JSON.stringify(src)) : blankOrder(); draft._for = id || "new";
  }
  draft._open = draft._open || {}; ensureKotak(draft); if (!lokOf(draft).length) draft.lokasi = [newLok()];
  const byRole = r => db.tim.filter(t => t.aktif !== false && t.peran === r).map(t => t.nama);
  const has = (...k) => k.some(x => { const v = draft[x]; return Array.isArray(v) ? v.length : (typeof v === "number" ? v : String(v || "").trim()); });
  // Bagian yang bisa dilipat: terbuka bila sudah ada isinya, atau sesuai pilihan terakhir pengguna
  const sec = (key, n, t, body, open = true, hint = "") => `<details class="card fsec" data-sec="${key}" ${(draft._open[key] ?? open) ? "open" : ""}><summary class="hd"><span class="n">${n}</span><h2>${t}</h2>${hint ? `<span class="muted small hint">${hint}</span>` : ""}<svg class="i chev"><use href="#i-right"/></svg></summary>${body}</details>`;
  return `${mtop()}<a class="back" href="${id ? "#/acara/" + id : "#/dashboard"}">${ic("left")}${id ? "Detail" : "Dashboard"}</a>
  <div class="top"><div><h1>${id ? "Edit acara" : "Acara baru"}</h1><p>Isi yang perlu saja — sisanya bisa dilengkapi nanti.</p></div></div>
  <form id="oform" autocomplete="off" onsubmit="return false">
  ${sec("p", 1, "Pengantin", `<div class="fs"><div class="grid g3">${fi("nama", "Nama manten", "mis. Ana & Rois")}${fi("tanggal", "Tanggal acara", "", "date")}${fi("hp", "No. HP / WA", "08xx", "tel")}</div>
    <div class="grid g4">${fi("ig", "IG manten", "@username")}${fi("tiktok", "TikTok", "@username")}${fi("bapak", "Bapak")}${fi("ibu", "Ibu")}</div></div>`)}
  ${sec("a", 2, "Lokasi & jadwal acara", `<div id="lokasiBox">${lokasiFields()}</div>
    <label class="toggle" style="margin-top:12px"><input type="checkbox" data-b="acaraMalam" ${draft.acaraMalam ? "checked" : ""}>Ada acara malam</label>
    ${dl("dl-tempat", ["Kediaman mempelai wanita", "Kediaman mempelai pria", "Masjid", "Gedung", "KUA", ...db.orders.flatMap(o => lokOf(o).map(l => l.tempat)).filter(Boolean)])}`)}
  ${sec("k", 3, "Paket & isi acara", `<div id="paketBox">${paketFields()}</div>`)}
  ${sec("t", 4, "Tim bertugas", `<div id="timBox">${timFields()}</div>`)}
  <div class="card fsec" id="hasilCard"><div class="hd"><span class="n">${ic("wa")}</span><h2>Hasil untuk grup WA</h2></div>
    <div class="wa-prev"><div class="bubble" id="formWA"></div></div>
    <div class="row" style="margin-top:12px"><button class="btn wa grow" type="button" data-act="formshare">${ic("share")}Kirim / Bagikan</button><button class="btn grow" type="button" data-act="formcopy">${ic("copy")}Salin teks</button></div>
    <p class="small muted" style="margin:8px 0 0">Hasil ini ikut berubah saat Anda mengisi form. Jangan lupa <b>Simpan</b>.</p></div>
  <div class="savebar"><div class="tot grow" id="totbox"></div><button class="btn" data-act="cancelform">Batal</button><button class="btn gold" data-act="saveform">${ic("check")}Simpan</button></div>
  </form>`;
}
const groupBy = (arr, k) => arr.reduce((a, x) => ((a[x[k] || "Lainnya"] = a[x[k] || "Lainnya"] || []).push(x), a), {});
const jamIn = (i, f, label) => { const v = draft.lokasi[i][f] || ""; return `<label class="f">${label}<input class="in" type="time" step="300" data-lk="${i}.${f}" value="${isJam(v) ? esc(normJam(v)) : ""}">${v && !isJam(v) ? `<span class="small muted" style="font-weight:400">Isian lama: “${esc(v)}” — pilih jam untuk mengganti</span>` : ""}</label>`; };
const lin = (i, f, label, ph, extra = "") => `<label class="f">${label}<input class="in" data-lk="${i}.${f}" value="${esc(draft.lokasi[i][f] || "")}" placeholder="${esc(ph)}" ${extra}></label>`;
function lokasiFields() {
  const l = draft.lokasi[0], i = 0;
  const lain = draft.tanggal ? db.orders.filter(o => o.id !== draft.id && !o.batal && o.tanggal === draft.tanggal) : [];
  return `<div class="lok">
    <div class="grid g3" style="margin-bottom:12px">
      <label class="f">Lokasi ke- (isi manual)<input class="in" data-b="lokasiKe" inputmode="numeric" value="${esc(draft.lokasiKe || "")}" placeholder="${lain.length ? `mis. ${lain.length + 1}` : "mis. 1"}"></label>
      <div class="f small muted" style="grid-column:span 2;justify-content:flex-end;padding-bottom:6px">${lain.length ? `Di tanggal ini sudah ada ${lain.length} acara lain: ${lain.map(o => `<b>${esc(o.nama)}</b>${lokKe(o) ? ` (Lokasi ${esc(lokKe(o))})` : ""}`).join(", ")}` : "Nomor urut pelanggan di hari yang sama (Lokasi 1, 2, 3…). Muncul di judul pesan grup."}</div>
    </div>
    <div class="chips" style="margin-bottom:12px">${LJENIS.map(([k, n]) => `<span class="chip ${l.jenis === k ? "on" : ""}" data-ljenis="${i}.${k}">${l.jenis === k ? ic("check") : ""}${n}</span>`).join("")}</div>
    <div class="grid g3">
      ${l.jenis === "lain" ? lin(i, "namaAcara", "Nama acara", "mis. Ngunduh mantu") + jamIn(i, "jam", "Jam") : ""}
      ${l.jenis === "both" || l.jenis === "akad" ? jamIn(i, "jamAkad", "Jam akad") : ""}
      ${l.jenis === "both" || l.jenis === "resepsi" ? jamIn(i, "jamResepsi", "Jam resepsi") : ""}
      ${l.jenis === "both" ? lin(i, "tempatAkad", "Tempat akad (kalau beda)", "mis. masjid") : ""}
    </div>
    <div class="grid g2" style="margin-top:12px">${lin(i, "tempat", "Tempat", "mis. Kediaman mempelai wanita", 'list="dl-tempat"')}${lin(i, "alamat", "Alamat", "mis. Desa Sawu RT 17 / RW 8, Dukun, Gresik")}</div>
    <div class="row" style="align-items:flex-end;margin-top:12px">${lin(i, "maps", "Link Google Maps dari pelanggan — untuk sopir", "Tempel link yang dikirim pelanggan", 'type="url"').replace('class="f"', 'class="f grow"')}<button class="btn gold" type="button" data-act="pastemaps" data-li="${i}">${ic("copy")}Tempel</button><button class="btn" type="button" data-act="cekmaps" data-li="${i}">${ic("pin")}Cek</button></div>
  </div>`;
}
/* Isi paket di Excel: "Judul\n• item\n\nJudul 2\n• item" */
const BUL = /^[•\-*]\s?/;
function parseIsi(text) {
  return String(text || "").split(/\n\s*\n/).map(b => b.split("\n").map(x => x.trim()).filter(Boolean)).filter(b => b.length)
    .map(b => { const head = BUL.test(b[0]) ? "" : b[0]; return { head, items: (head ? b.slice(1) : b).map(x => x.replace(BUL, "")) }; });
}
/* ---------- KOTAK: semua isian acara berupa kotak tulisan (1 baris = 1 item) ---------- */
const KOTAK = [
  ["gaun", "Gaun & busana", "Putih kebaya + Blangkon, (Hijab solo)\nNavy jarik + Blangkon, (Hijab solo)"],
  ["melati", "Melati", "Solo putri (request monte silver + tutup sanggul)"],
  ["dekor", "Dekor", "Pintu masuk\nTumbang"],
  ["efek", "Efek & hiburan", "Hena + fake nail\nMC"],
  ["dok", "Dokumentasi & acara", "Foto 3 roll\nVideo cinematic"],
  ["rias", "Rias pengantin", "Rias terima tamu 4 orang\nRias orang tua & besan"],
  ["bunga", "Bunga", "Buket asli"],
  ["perlengkapan", "Perlengkapan dibawa", "Terop VVIP 2 plong\nKursi 200 + bungkus\nKipas 2"],
  ["makeup", "Jadwal make up", "Manten siap dimake up jam 2 pagi\nTerima tamu jam 5/6 pagi"],
  ["nb", "Catatan (Nb)", "Ada prosesi injak telur\nPengapit cowok 1 & cewek 1"]
];
const PAKET_KEYS = ["dekor", "efek", "dok", "rias", "bunga", "perlengkapan"];
const HEAD2KEY = { "dekor": "dekor", "efek & hiburan": "efek", "dokumentasi & acara": "dok", "rias pengantin": "rias", "bunga": "bunga", "perlengkapan": "perlengkapan" };
const SPECIAL = ["gaun", "melati", "perlengkapan", "makeup", "nb"];
const kot = (o, k) => (o.kotak || []).find(x => x.k === k);
const kisi = (o, k) => lines((kot(o, k) || {}).isi).map(x => x.replace(BUL, ""));
const otherBoxes = o => (o.kotak || []).filter(b => !SPECIAL.includes(b.k) && lines(b.isi).length);
function ensureKotak(o) {
  const old = Array.isArray(o.kotak) ? o.kotak : [];
  const std = KOTAK.map(([k, j]) => old.find(x => x.k === k) || { k, judul: j, isi: "" });
  o.kotak = [...std, ...old.filter(x => !KOTAK.some(([k]) => k === x.k))];
  return o;
}
/* pindahkan isian lama (gaun, melati, dekor, isi paket, perlengkapan, nb, jadwal make up) ke kotak — sekali saja */
function toKotak(o) {
  if (Array.isArray(o.kotak)) return ensureKotak(o);
  ensureKotak(o);
  const set = (k, arr) => { const b = kot(o, k); b.isi = [...new Set([...lines(b.isi), ...arr.filter(Boolean)])].join("\n"); };
  set("gaun", [...(o.gaun || []).filter(g => g.baju || g.pasangan).map(g => [g.baju, g.pasangan].filter(Boolean).join(" + ") + (g.hijab ? `, (${g.hijab})` : "")), o.gaunCatatan]);
  if (String(o.melati || "").trim()) set("melati", [o.melati + (o.melatiReq ? ` (request ${o.melatiReq})` : "")]);
  set("dekor", [o.dekor]);
  parseIsi(o.isiPaket).forEach(b => {
    const k = HEAD2KEY[b.head.toLowerCase()];
    if (k) set(k, b.items); else o.kotak.push({ k: "c_" + uid(), judul: b.head || "Lainnya", isi: b.items.join("\n"), dariPaket: true });
  });
  set("perlengkapan", lines(o.perlengkapan));
  set("makeup", lines(o.jadwalMakeup).map(x => x.replace(BUL, "")));
  set("nb", lines(o.nb));
  return o;
}
function fillFromPaket(o, p) {
  clearPaket(o);
  parseIsi(p.isi).forEach(b => {
    const k = HEAD2KEY[b.head.toLowerCase()];
    if (k) kot(o, k).isi = b.items.join("\n"); else o.kotak.push({ k: "c_" + uid(), judul: b.head || "Lainnya", isi: b.items.join("\n"), dariPaket: true });
  });
}
function clearPaket(o) { ensureKotak(o); PAKET_KEYS.forEach(k => { kot(o, k).isi = ""; }); o.kotak = o.kotak.filter(b => !b.dariPaket); }
const paketMode = o => o.paketMode || (paketById(o.paketId) ? "paket" : String(o.paketNama || "").trim() ? "custom" : "");
/* Pilihan bantuan untuk tiap kotak, diambil dari database (paket Excel, perlengkapan, katalog) */
function sectionCatalog() {
  const m = new Map();
  db.paket.forEach(p => parseIsi(p.isi).forEach(b => { const k = (b.head || "Lainnya").toLowerCase(); if (!m.has(k)) m.set(k, new Set()); b.items.forEach(x => m.get(k).add(x)); }));
  return m;
}
const optList = (label, arr, pre = "n") => { arr = [...new Set(arr.filter(Boolean))]; return arr.length ? [{ label, pre, items: arr }] : []; };
const addonLabel = a => /^Sewa \d/.test(a.kategori) ? `Terop ${a.item} (${a.kategori.replace(/^Sewa /, "")})` : a.item;
function kotakOpts(b) {
  const m = sectionCatalog(), K = db.katalog, from = h => [...(m.get(h) || [])];
  const addon = kat => db.addons.filter(a => a.kategori !== "Biaya Tambahan" && (!kat || kat.includes(a.kategori))).map(addonLabel);
  switch (b.k) {
    case "gaun": return [...optList("Gaun — jadi baris baru", K.gaun), ...optList("+ Pasangan / aksesoris — disambung ke gaun terakhir", K.pasangan, "p"), ...optList("Hijab — disambung ke gaun terakhir", K.hijab, "h")];
    case "melati": return [...optList("Jenis melati — jadi baris baru", K.melati), ...optList("Request — disambung ke melati terakhir", ["monte silver", "tutup sanggul", "ronce melati tibo dodo"], "r")];
    case "dekor": return [...optList("Dekor dari paket", from("dekor")), ...optList("Paket tambahan", addon(["Paket Tambahan"]))];
    case "efek": return optList("Efek & hiburan dari paket", from("efek & hiburan"));
    case "dok": return optList("Dokumentasi dari paket", from("dokumentasi & acara"));
    case "rias": return optList("Rias dari paket", from("rias pengantin"));
    case "bunga": return optList("Bunga dari paket", from("bunga"));
    case "perlengkapan": return [...optList("Perlengkapan dari paket", from("perlengkapan")), ...Object.entries(groupBy(db.addons.filter(a => a.kategori !== "Biaya Tambahan"), "kategori")).flatMap(([k, arr]) => optList(k, arr.map(addonLabel)))];
    case "makeup": return optList("Jadwal make up", K.makeup || []);
    case "nb": return optList("Catatan yang sering dipakai", K.nb || []);
    default: return [...[...m.entries()].flatMap(([k, v]) => optList(k.replace(/\b\w/g, c => c.toUpperCase()), [...v])), ...optList("Perlengkapan & sewa", addon())];
  }
}
/* tambahkan pilihan ke kotak: baris baru, atau sambung ke baris terakhir (pasangan / hijab / request) */
function applyOpt(b, val) {
  const i = val.indexOf("|"), kind = val.slice(0, i), x = val.slice(i + 1), L = lines(b.isi);
  if (kind === "n" || !L.length) L.push(kind === "p" ? x : kind === "h" ? `(${x})` : x);
  else if (kind === "p") L[L.length - 1] += ` + ${x}`;
  else if (kind === "h") L[L.length - 1] += `, (${x})`;
  else if (kind === "r") L[L.length - 1] = /\(request /.test(L[L.length - 1]) ? L[L.length - 1].replace(/\)$/, ` + ${x})`) : L[L.length - 1] + ` (request ${x})`;
  b.isi = L.join("\n");
}
/* Pilih isi kotak: daftar tetap terbuka, bisa ketuk banyak item berturut-turut */
function pickKotak(i) {
  const b = draft.kotak[i], groups = kotakOpts(b), riwayat = []; let q = "";
  modal(`<div class="row" style="justify-content:space-between;margin-bottom:6px"><h2 style="margin:0">${esc(b.judul || "Isi kotak")}</h2><button type="button" class="btn gold" data-close>${ic("check")}Selesai</button></div>
    <div class="kp-prev" id="kpPrev"></div>
    <div class="row" style="margin:10px 0"><div class="search">${ic("search")}<input class="in" id="kpq" placeholder="Cari…" autocomplete="off"></div><button type="button" class="btn" id="kpUndo">Batalkan</button></div>
    <div class="kp-list" id="kpList"></div>`, (m, close) => {
    const prev = () => { const L = lines(b.isi); $("#kpPrev", m).innerHTML = L.length ? L.map((x, n) => `<div><b>${n + 1}.</b> ${esc(x.replace(BUL, ""))}</div>`).join("") : `<span class="muted">Belum ada isi — ketuk pilihan di bawah.</span>`; $("#kpUndo", m).disabled = !riwayat.length; };
    const draw = () => {
      const qq = q.toLowerCase().trim(), ada = new Set(lines(b.isi).map(x => x.replace(BUL, "").toLowerCase()));
      $("#kpList", m).innerHTML = groups.map((g, gi) => { const items = g.items.filter(x => !qq || x.toLowerCase().includes(qq)); return items.length ? `<div class="kp-h">${esc(g.label)}</div><div class="kp-chips">${items.map(x => `<button type="button" class="chip ${g.pre === "n" && ada.has(x.toLowerCase()) ? "on" : ""}" data-kv="${gi}" data-kx="${esc(x)}">${g.pre === "p" ? "+ " : ""}${esc(x)}</button>`).join("")}</div>` : ""; }).join("") || `<div class="empty small">Tidak ada yang cocok — tulis langsung di kotaknya.</div>`;
    };
    const sync = () => { const ta = $(`[data-kotak="${i}"]`); if (ta) { ta.value = b.isi; ta.closest(".kotak").classList.toggle("isi", !!b.isi.trim()); grow(ta); } updatePreview(); };
    prev(); draw();
    $("#kpq", m).oninput = e => { q = e.target.value; draw(); };
    $("#kpList", m).onclick = e => {
      const c = e.target.closest("[data-kv]"); if (!c) return;
      const g = groups[+c.dataset.kv]; riwayat.push(b.isi); applyOpt(b, `${g.pre}|${c.dataset.kx}`);
      prev(); draw(); sync(); c.classList.add("tap"); setTimeout(() => c.classList.remove("tap"), 250);
    };
    $("#kpUndo", m).onclick = () => { if (!riwayat.length) return; b.isi = riwayat.pop(); prev(); draw(); sync(); };
  });
}
function kotakFields() {
  return draft.kotak.map((b, i) => { const std = KOTAK.find(([k]) => k === b.k); return `<div class="kotak ${lines(b.isi).length ? "isi" : ""}">
    <div class="kotak-h">${std ? `<span>${esc(b.judul)}</span>` : `<input class="kh" data-kj="${i}" value="${esc(b.judul)}" placeholder="Nama kotak">`}${kotakOpts(b).length ? `<button type="button" class="kdd" data-kpick="${i}" title="Pilih dari database">＋ Pilih</button>` : ""}${std ? "" : `<button type="button" class="mx" title="Hapus kotak" data-delkotak="${i}">${ic("x")}</button>`}</div>
    <textarea class="kt" rows="2" data-kotak="${i}" placeholder="${esc(std ? "mis. " + std[2].split("\n").join(" / ") : "Tulis isinya, 1 baris = 1 item")}">${esc(b.isi)}</textarea></div>`; }).join("");
}
function paketFields() {
  const mode = paketMode(draft), sp = paketById(draft.paketId);
  const val = mode === "paket" && sp ? sp.id : mode === "custom" ? "__custom" : "";
  return `<div class="fs">
    <div class="grid g2"><label class="f">Paket<select class="in" id="paketSel">
      <option value="" ${val === "" ? "selected" : ""}>— Tanpa paket —</option>
      <option value="__custom" ${val === "__custom" ? "selected" : ""}>✏️ Custom (isi sendiri)</option>
      ${db.wilayah.map(w => `<optgroup label="${esc(w.nama)}">${db.paket.filter(p => p.wilayahId === w.id).map(p => `<option value="${p.id}" ${p.id === val ? "selected" : ""}>${esc(p.nama)}</option>`).join("")}</optgroup>`).join("")}
    </select></label>
    ${mode === "custom" ? fi("paketNama", "Nama paket (boleh kosong)", "mis. Paket custom") : sp ? `<div class="f small muted" style="justify-content:flex-end;padding-bottom:6px">Isi ${esc(sp.nama)} sudah masuk ke kotak di bawah — tinggal ubah yang beda. <button class="btn sm ghost" type="button" data-act="resetisi">Kembalikan isi asli</button></div>` : `<div class="f small muted" style="justify-content:flex-end;padding-bottom:6px">Pilih paket untuk mengisi kotak otomatis, atau langsung tulis di kotak.</div>`}</div>
    <div class="kotak-grid" id="kotakBox">${kotakFields()}</div>
    <div class="row"><button class="btn" type="button" data-act="addkotak">${ic("plus")}Tambah kotak</button></div></div>`;
}
function timFields() {
  const team = teamOf(draft);
  return `${team.length ? `<div class="team">${team.map(m => { const cf = conflicts(m.id, draft.tanggal, draft.id); return `<div class="tm"><div class="avatar">${esc(initials(m.nama))}</div><div class="grow" style="min-width:0"><div class="t">${esc(m.nama)}</div><div class="small muted">${esc(m.peran)}${m.hp ? " · " + esc(m.hp) : ""}${cf.length ? ` · <b style="color:var(--warn)">bentrok: ${esc(cf.map(x => x.nama).join(", "))}</b>` : ""}</div></div><button class="btn icon ghost danger" type="button" title="Hapus dari acara" data-uncrew="${m.id}">${ic("x")}</button></div>`; }).join("")}</div>` : `<div class="muted small" style="margin-bottom:6px">Belum ada tim dipilih.</div>`}
  <div class="row" style="margin-top:12px"><button class="btn gold" type="button" data-act="pickteam">${ic("users")}Pilih tim${team.length ? ` (${team.length})` : ""}</button><button class="btn ghost" type="button" data-act="quickcrew">${ic("plus")}Orang baru</button></div>`;
}
/* Pemilih tim cepat: cari, saring per peran, centang, simpan (seperti versi lama) */
function pickTeam(ids, tanggal, exceptId, onSave) {
  const sel = new Set(ids); let q = "", role = "Semua";
  const roles = ["Semua", ...ROLES.filter(r => db.tim.some(t => t.peran === r && t.aktif !== false))];
  modal(`<h2>Pilih tim bertugas</h2>
    <div class="search" style="margin-bottom:10px">${ic("search")}<input class="in" id="pq" placeholder="Cari nama…" autocomplete="off"></div>
    <div class="tabs" id="pr">${roles.map(r => `<button type="button" class="tab ${r === role ? "on" : ""}" data-r="${esc(r)}">${esc(r)}</button>`).join("")}</div>
    <div id="pl" class="picklist"></div>
    <div class="row" style="margin-top:12px"><b class="grow" id="pc"></b><button type="button" class="btn sm ghost" id="pall">Pilih semua</button><button type="button" class="btn sm ghost" id="pnone">Kosongkan</button></div>
    <div class="row" style="margin-top:10px;justify-content:flex-end"><button type="button" class="btn" data-close>Batal</button><button type="button" class="btn gold" id="pok">${ic("check")}Simpan pilihan</button></div>`, (m, close) => {
    const list = () => db.tim.filter(t => t.aktif !== false && (role === "Semua" || t.peran === role) && (!q || (t.nama + " " + t.peran).toLowerCase().includes(q))).sort((a, b) => roleIdx(a.peran) - roleIdx(b.peran));
    const count = () => { $("#pc", m).textContent = `${sel.size} orang terpilih`; };
    const draw = () => {
      let last = "";
      $("#pl", m).innerHTML = list().map(t => { const cf = conflicts(t.id, tanggal, exceptId); const hd = role === "Semua" && t.peran !== last ? `<div class="pick-h">${esc(last = t.peran)}</div>` : ""; return `${hd}<label class="pick ${sel.has(t.id) ? "on" : ""}"><input type="checkbox" value="${t.id}" ${sel.has(t.id) ? "checked" : ""}><div class="grow"><div class="t">${esc(t.nama)}</div><div class="small muted">${esc(t.peran)}${t.hp ? " · " + esc(t.hp) : ""}</div></div>${cf.length ? `<span class="pill warn" title="Sudah bertugas di ${esc(cf.map(x => x.nama).join(", "))}">bentrok</span>` : ""}</label>`; }).join("") || `<div class="empty small">Tidak ada yang cocok.</div>`;
      count();
    };
    draw(); setTimeout(() => $("#pq", m).focus(), 50);
    $("#pq", m).oninput = e => { q = e.target.value.toLowerCase().trim(); draw(); };
    $("#pr", m).onclick = e => { const b = e.target.closest("[data-r]"); if (!b) return; role = b.dataset.r; $$("#pr .tab", m).forEach(x => x.classList.toggle("on", x === b)); draw(); };
    $("#pl", m).onchange = e => { const v = e.target.value; e.target.checked ? sel.add(v) : sel.delete(v); e.target.closest(".pick").classList.toggle("on", e.target.checked); count(); };
    $("#pall", m).onclick = () => { list().forEach(t => sel.add(t.id)); draw(); };
    $("#pnone", m).onclick = () => { list().forEach(t => sel.delete(t.id)); draw(); };
    $("#pok", m).onclick = () => { const keep = ids.filter(id => sel.has(id)), add = [...sel].filter(id => !ids.includes(id)); onSave([...keep, ...add]); close(); toast(`${sel.size} orang ditugaskan`); };
  });
}
function updTotal() {
  const el = $("#totbox"); if (!el) return; const m = missing(draft);
  updatePreview();
  el.innerHTML = m.length ? `<button type="button" class="miss" data-act="showmiss" title="${esc(m.join(", "))}">⚠ ${m.length} belum diisi</button>` : `<span class="ok-mini">✓ Siap dikirim</span>`;
}
let _pv = 0;
function updatePreview() { clearTimeout(_pv); _pv = setTimeout(() => { const el = $("#formWA"); if (el && draft) el.innerHTML = waFmt(waCrew(draft)); }, 120); }
function rerenderPart(id, fn) { const el = $("#" + id); if (el) { el.innerHTML = fn(); growAll(el); } if (draft) updatePreview(); }
/* kotak isi paket ikut memanjang sesuai tulisan */
const grow = el => { el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; };
const growAll = (root = document) => $$("textarea.kt", root).forEach(grow);
function saveForm() {
  if (!draft.nama.trim()) { toast("Isi nama manten dulu"); $('[data-b="nama"]')?.focus(); return; }
  const o = JSON.parse(JSON.stringify(draft)); delete o._for; delete o._open;
  const i = db.orders.findIndex(x => x.id === o.id);
  if (i >= 0) db.orders[i] = o; else db.orders.push(o);
  save(); draft = null; toast("Tersimpan"); location.hash = "#/acara/" + o.id;
}

/* ---------- CALENDAR ---------- */
let calState = { y: new Date().getFullYear(), m: new Date().getMonth(), sel: todayStr() };
function vKalender() {
  const { y, m } = calState, first = new Date(y, m, 1), start = new Date(y, m, 1 - ((first.getDay() + 6) % 7));
  const t = todayStr(), by = groupBy(activeOrders().filter(o => o.tanggal), "tanggal");
  const days = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const selList = by[calState.sel] || [];
  const monthList = sortByDate(activeOrders().filter(o => (o.tanggal || "").startsWith(`${y}-${pad(m + 1)}`)));
  return `${mtop()}<div class="top"><div><h1>Kalender</h1><p>${monthList.length} acara di ${first.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</p></div>
    <div class="row"><button class="btn icon" data-cal="-1">${ic("left")}</button><button class="btn sm" data-cal="0">Hari ini</button><button class="btn icon" data-cal="1">${ic("right")}</button><button class="btn" data-act="rekapbulan">${ic("wa")}Rekap bulan</button></div></div>
  <div class="grid dash"><div class="card"><div class="cal">${["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(d => `<div class="dw">${d}</div>`).join("")}
    ${days.map(d => { const k = ymd(d), ev = by[k] || []; return `<button class="d ${d.getMonth() !== m ? "out" : ""} ${k === t ? "today" : ""} ${k === calState.sel ? "sel" : ""}" data-day="${k}"><span class="num">${d.getDate()}</span>${ev.slice(0, 2).map(o => `<span class="nm">${esc(o.nama)}</span>`).join("")}<span class="dots">${ev.map(() => "<i></i>").join("")}</span></button>`; }).join("")}</div></div>
    <div class="card"><h2>${fmtD(calState.sel, { weekday: "long", day: "numeric", month: "long" })}</h2>${selList.length ? selList.map(o => evRow(o)).join("") : `<div class="empty small">Tidak ada acara.<br><a class="btn sm gold" style="margin-top:10px" href="#/acara/baru?tgl=${calState.sel}">${ic("plus")}Buat acara di tanggal ini</a></div>`}</div></div>`;
}

/* ---------- TIM ---------- */
function vTim() {
  const t = todayStr();
  const jobs = id => sortByDate(activeOrders().filter(o => (o.crew || []).includes(id)));
  const byRole = groupBy(db.tim, "peran");
  return `${mtop()}<div class="top"><div><h1>Tim</h1><p>Jadwal tugas tiap anggota tim</p></div><button class="btn gold" data-act="addtim">${ic("plus")}Anggota baru</button></div>
  ${db.tim.length ? "" : `<div class="card empty">${ic("users")}<div>Belum ada anggota tim.</div><div class="small">Tekan <b>Anggota baru</b>, import dari Excel, atau Pengaturan → Data & Backup → <b>Kembalikan data awal Harvy</b>.</div></div>`}
  <div class="grid g2">${ROLES.filter(r => byRole[r]).map(r => `<div class="card"><h3>${r}</h3>${byRole[r].map(p => { const j = jobs(p.id), up = j.filter(o => o.tanggal >= t); return `<div class="li"><div class="avatar">${esc(p.nama[0] || "?")}</div><div class="grow"><div class="t">${esc(p.nama)} ${p.aktif === false ? '<span class="pill">nonaktif</span>' : ""}</div><div class="small muted">${up.length ? `Berikutnya: ${esc(up[0].nama)} · ${fmtD(up[0].tanggal, { day: "numeric", month: "short" })}` : "Belum ada jadwal"} · ${j.length} total tugas</div></div><button class="btn sm" data-act="timjobs" data-id="${p.id}">Jadwal</button><button class="btn icon ghost" data-act="edittim" data-id="${p.id}">${ic("edit")}</button></div>`; }).join("")}</div>`).join("")}</div>`;
}
function timModal(p) {
  const isNew = !p; p = p || { id: uid(), nama: "", peran: "Crew Rias", hp: "", aktif: true };
  modal(`<h2>${isNew ? "Anggota baru" : "Edit anggota"}</h2><div class="fs">
    <label class="f">Nama<input class="in" id="tn" value="${esc(p.nama)}"></label>
    <label class="f">Peran<select class="in" id="tr">${ROLES.map(r => `<option ${r === p.peran ? "selected" : ""}>${r}</option>`).join("")}</select></label>
    <label class="f">No. HP<input class="in" id="th" type="tel" value="${esc(p.hp)}"></label>
    <label class="toggle"><input type="checkbox" id="ta" ${p.aktif !== false ? "checked" : ""}>Aktif</label></div>
    <div class="row" style="margin-top:16px">${isNew ? "" : `<button class="btn danger" id="tdel">${ic("trash")}Hapus</button>`}<span class="grow"></span><button class="btn" data-close>Batal</button><button class="btn gold" id="tsave">Simpan</button></div>`,
    (m, close) => {
      $("#tn", m).focus();
      $("#tsave", m).onclick = () => { const nama = $("#tn", m).value.trim(); if (!nama) return toast("Nama wajib diisi"); Object.assign(p, { nama, peran: $("#tr", m).value, hp: $("#th", m).value.trim(), aktif: $("#ta", m).checked }); if (isNew) db.tim.push(p); save(); close(); toast("Tim tersimpan"); if (draft && location.hash.includes("acara")) { if (isNew && !draft.crew.includes(p.id)) draft.crew.push(p.id); rerenderPart("timBox", timFields); } else route(); };
      $("#tdel", m) && ($("#tdel", m).onclick = async () => { close(); if (await confirmBox(`Hapus ${p.nama} dari tim?`)) { db.tim = db.tim.filter(x => x.id !== p.id); save(); route(); } });
    });
}

/* ---------- SETTINGS ---------- */
let setTab = "usaha";
function vSettings() {
  const T = [["usaha", "Usaha"], ["paket", "Paket"], ["addons", "Perlengkapan"], ["tim", "Tim"], ["katalog", "Katalog"], ["wa", "Template WA"], ["data", "Data & Backup"]];
  let body = "";
  const s = db.settings;
  if (setTab === "usaha") body = `${installCard(true)}<div class="card" style="margin-bottom:14px"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Aplikasi</h2><span class="pill gold">Versi ${APP_VERSION}</span></div><p class="small muted" style="margin:8px 0 0">${isStandalone() ? "Terpasang sebagai aplikasi di perangkat ini ✓" : "Sedang dibuka lewat browser."} Data tersimpan di perangkat ini — rutin <a href="#/pengaturan" data-settab="data">backup</a>.</p></div><div class="card"><h2>Profil usaha</h2><div class="fs">
    <div class="grid g2">${sIn("bizName", "Nama usaha")}${sIn("tagline", "Tagline")}</div>${sIn("alamat", "Alamat")}
    <div class="grid g2">${sIn("hpOwner", "WA Owner")}${sIn("hpAdmin", "WA Admin")}</div><div class="grid g2">${sIn("ig", "Instagram")}${sIn("fb", "Facebook")}</div>

    <div class="row"><img src="${esc(logoSrc())}" alt="Logo" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:1px solid var(--line)"><label class="btn sm">${ic("up")}Ganti logo<input type="file" accept="image/*" id="logoFile" hidden></label>${s.logo ? `<button class="btn sm ghost" data-act="logoreset">Pakai logo bawaan</button>` : ""}</div>
    <label class="f">Tampilan<select class="in" data-s="theme">${[["auto", "Ikuti perangkat"], ["light", "Terang"], ["dark", "Gelap (hitam-emas)"]].map(([v, l]) => `<option value="${v}" ${s.theme === v ? "selected" : ""}>${l}</option>`).join("")}</select></label></div></div>`;
  if (setTab === "paket") body = db.wilayah.map(w => `<div class="card" style="margin-bottom:14px"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2 style="margin:0">${esc(w.nama)}</h2><div class="row"><button class="btn sm ghost" data-act="editwil" data-id="${w.id}">${ic("edit")}Ganti nama</button><button class="btn sm" data-act="addpaket" data-id="${w.id}">${ic("plus")}Paket</button></div></div>
    ${db.paket.filter(p => p.wilayahId === w.id).map(p => `<div class="li"><div class="grow"><div class="t">${esc(p.nama)}</div><div class="small muted">${esc(p.deskripsi || "")}</div></div><b>${rpShort(p.harga)}</b><button class="btn icon ghost" data-act="editpaket" data-id="${p.id}">${ic("edit")}</button></div>`).join("") || `<div class="muted small">Belum ada paket.</div>`}</div>`).join("") + `<button class="btn" data-act="addwil">${ic("plus")}Tambah wilayah</button>`;
  if (setTab === "addons") body = `<div class="row" style="margin-bottom:12px"><button class="btn gold" data-act="addaddon">${ic("plus")}Item baru</button></div>` + Object.entries(groupBy(db.addons, "kategori")).map(([k, arr]) => `<div class="card" style="margin-bottom:14px"><h3>${esc(k)}</h3>${arr.map(a => `<div class="li"><div class="grow"><div class="t">${esc(a.item)}</div><div class="small muted">${esc([a.satuan, a.ket].filter(Boolean).join(" · "))}</div></div><b>${rp(a.harga)}</b><button class="btn icon ghost" data-act="editaddon" data-id="${a.id}">${ic("edit")}</button></div>`).join("")}</div>`).join("");
  if (setTab === "tim") body = `<div class="card"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2 style="margin:0">Anggota tim (${db.tim.length})</h2><div class="row"><a class="btn sm" href="#/tim">${ic("cal")}Jadwal tim</a><button class="btn gold sm" data-act="addtim">${ic("plus")}Anggota</button></div></div>${db.tim.map(p => `<div class="li"><div class="avatar">${esc(p.nama[0] || "?")}</div><div class="grow"><div class="t">${esc(p.nama)}</div><div class="small muted">${esc(p.peran)}${p.hp ? " · " + esc(p.hp) : ""}${p.aktif === false ? " · nonaktif" : ""}</div></div><button class="btn icon ghost" data-act="edittim" data-id="${p.id}">${ic("edit")}</button></div>`).join("")}</div>`;
  if (setTab === "katalog") body = `<div class="card"><h2>Pilihan cepat di form</h2><p class="small muted">Muncul di tombol <b>＋ Pilih</b> pada kotak-kotak form acara. Satu baris = satu pilihan.</p><div class="grid g2">${[["gaun", "Gaun"], ["pasangan", "Pasangan / aksesoris"], ["hijab", "Hijab / keterangan"], ["melati", "Jenis melati"], ["nb", "Catatan (Nb) yang sering dipakai"], ["makeup", "Jadwal make up yang sering dipakai"]].map(([k, l]) => `<label class="f">${l}<textarea class="in" rows="7" data-kat="${k}">${esc(db.katalog[k].join("\n"))}</textarea></label>`).join("")}</div></div>`;
  if (setTab === "wa") body = `<div class="card" style="margin-bottom:14px"><h2>Bentuk pesan grup</h2><label class="f">Format<select class="in" data-s="waFormat"><option value="briefing" ${s.waFormat !== "klasik" ? "selected" : ""}>Briefing rapi ber-emoji (📅 ✨ 📍 👗 👥)</option><option value="klasik" ${s.waFormat === "klasik" ? "selected" : ""}>Klasik (*Nama* : … seperti pesan grup lama)</option></select></label></div><div class="card"><h2>Penutup pesan grup</h2><p class="small muted">Ditempel otomatis di bawah setiap pesan untuk grup kru. Pakai *tebal* dan _miring_ ala WhatsApp.</p><textarea class="in" rows="6" data-s="footer">${esc(s.footer)}</textarea>
    <div class="hr"></div><h3>Kolom yang tampil di pesan grup (bawaan)</h3><div class="row" style="gap:16px">${WA_FIELDS.map(([k, l]) => `<label class="toggle"><input type="checkbox" data-wshow="${k}" ${s.waShow[k] ? "checked" : ""}>${l}</label>`).join("")}</div></div>`;
  if (setTab === "data") body = `${keamananCard()}<div class="grid g2"><div class="card"><h2>Excel</h2><p class="small muted">File Excel rapi berisi sheet <b>Acara, Tim, Paket, Perlengkapan</b>. Bisa dibuka & diedit di Excel / Google Sheets, lalu di-import lagi. File <b>Database_Harvy_Wedding.xlsx</b> asli juga bisa di-import untuk memperbarui paket & perlengkapan.</p><div class="row"><button class="btn gold" data-act="exportxlsx">${ic("down")}Export ke Excel (.xlsx)</button><label class="btn">${ic("up")}Import dari Excel<input type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="importXlsx" hidden></label></div></div>
    <div class="card"><h2>Backup</h2><p class="small muted">Simpan salinan semua data (acara, tim, paket, pengaturan) dalam satu file. Pakai untuk berjaga-jaga atau memindahkan data ke HP / iPad / laptop lain.${s.lastBackup ? `<br>Backup terakhir: <b>${esc(new Date(s.lastBackup).toLocaleString("id-ID"))}</b>` : "<br><b>Belum pernah backup.</b>"}</p><div class="row"><button class="btn gold" data-act="backup">${ic("down")}Download backup</button><label class="btn">${ic("up")}Pulihkan dari backup<input type="file" accept=".json,application/json" id="restore" hidden></label></div></div>
    <div class="card"><h2>Ringkasan</h2><dl class="kv"><dt>Acara</dt><dd>${db.orders.length}</dd><dt>Paket</dt><dd>${db.paket.length}</dd><dt>Perlengkapan</dt><dd>${db.addons.length}</dd><dt>Tim</dt><dd>${db.tim.length}</dd><dt>Ukuran</dt><dd>${(JSON.stringify(db).length / 1024).toFixed(1)} KB</dd></dl></div>
    <div class="card" style="grid-column:1/-1"><h2>Hapus & reset</h2><p class="small muted">Data yang dihapus tidak bisa dikembalikan — <b>download backup dulu</b>.</p>
      <div class="reset-list">
        <div class="reset-it"><div class="grow"><b>Hapus semua acara</b><div class="small muted">${db.orders.length} acara (termasuk arsip) dihapus. Tim, paket & perlengkapan tetap.</div></div><button class="btn danger" data-act="wipeacara">${ic("trash")}Hapus acara</button></div>
        <div class="reset-it"><div class="grow"><b>Kosongkan semua data</b><div class="small muted">Acara, tim, paket, wilayah & perlengkapan dihapus semua — mulai dari kosong. Profil usaha, logo & template pesan tetap.</div></div><button class="btn danger" data-act="wipe">${ic("trash")}Kosongkan semua</button></div>
        <div class="reset-it"><div class="grow"><b>Kembalikan data awal Harvy</b><div class="small muted">Isi ulang daftar tim resmi Harvy + paket & perlengkapan dari Excel awal. Acara tidak dihapus.</div></div><button class="btn" data-act="resetdb">Kembalikan</button></div>
      </div></div></div>`;
  return `${mtop()}<div class="top"><div><h1>Pengaturan</h1><p>Atur database, kru, template pesan & backup</p></div></div>
  <div class="tabs">${T.map(([k, l]) => `<button class="tab ${setTab === k ? "on" : ""}" data-settab="${k}">${l}</button>`).join("")}</div>${body}`;
}
const sIn = (k, l) => `<label class="f">${l}<input class="in" data-s="${k}" value="${esc(db.settings[k])}"></label>`;
function paketModal(p, wilId) {
  const isNew = !p; p = p || { id: uid(), wilayahId: wilId, nama: "", harga: 0, deskripsi: "", isi: "", biayaTambahan: "", catatan: "" };
  modal(`<h2>${isNew ? "Paket baru" : "Edit paket"}</h2><div class="fs">
    <div class="grid g2"><label class="f">Nama paket<input class="in" id="pn" value="${esc(p.nama)}"></label><label class="f">Harga<input class="in" id="ph" data-money inputmode="numeric" value="${num(p.harga).toLocaleString("id-ID")}"></label></div>
    <label class="f">Wilayah<select class="in" id="pw">${db.wilayah.map(w => `<option value="${w.id}" ${w.id === p.wilayahId ? "selected" : ""}>${esc(w.nama)}</option>`).join("")}</select></label>
    <label class="f">Deskripsi singkat<input class="in" id="pd" value="${esc(p.deskripsi)}"></label>
    <label class="f">Isi paket<textarea class="in" id="pi" rows="9">${esc(p.isi)}</textarea></label>
    <label class="f">Biaya tambahan<textarea class="in" id="pb" rows="3">${esc(p.biayaTambahan)}</textarea></label>
    <label class="f">Catatan / ketentuan<input class="in" id="pc" value="${esc(p.catatan)}"></label></div>
    <div class="row" style="margin-top:16px">${isNew ? "" : `<button class="btn danger" id="pdel">${ic("trash")}Hapus</button>`}<span class="grow"></span><button class="btn" data-close>Batal</button><button class="btn gold" id="psave">Simpan</button></div>`,
    (m, close) => {
      $("#psave", m).onclick = () => { const nama = $("#pn", m).value.trim(); if (!nama) return toast("Nama paket wajib"); Object.assign(p, { nama, harga: num($("#ph", m).value), wilayahId: $("#pw", m).value, deskripsi: $("#pd", m).value, isi: $("#pi", m).value, biayaTambahan: $("#pb", m).value, catatan: $("#pc", m).value }); if (isNew) db.paket.push(p); save(); close(); route(); toast("Paket tersimpan"); };
      $("#pdel", m) && ($("#pdel", m).onclick = async () => { close(); if (await confirmBox(`Hapus paket ${p.nama}?`)) { db.paket = db.paket.filter(x => x.id !== p.id); save(); route(); } });
    });
}
function addonModal(a) {
  const isNew = !a; a = a || { id: uid(), kategori: "Paket Tambahan", item: "", harga: 0, satuan: "", ket: "" };
  const kats = [...new Set(db.addons.map(x => x.kategori))];
  modal(`<h2>${isNew ? "Item baru" : "Edit item"}</h2><div class="fs">
    <label class="f">Kategori<input class="in" id="ak" list="dl-kat" value="${esc(a.kategori)}">${dl("dl-kat", kats)}</label>
    <label class="f">Nama item<input class="in" id="ai" value="${esc(a.item)}"></label>
    <div class="grid g2"><label class="f">Harga<input class="in" id="ah" data-money inputmode="numeric" value="${num(a.harga).toLocaleString("id-ID")}"></label><label class="f">Satuan<input class="in" id="as" value="${esc(a.satuan)}" placeholder="per buah / per meter"></label></div>
    <label class="f">Keterangan<input class="in" id="ax" value="${esc(a.ket)}"></label></div>
    <div class="row" style="margin-top:16px">${isNew ? "" : `<button class="btn danger" id="adel">${ic("trash")}Hapus</button>`}<span class="grow"></span><button class="btn" data-close>Batal</button><button class="btn gold" id="asave">Simpan</button></div>`,
    (m, close) => {
      $("#asave", m).onclick = () => { const item = $("#ai", m).value.trim(); if (!item) return toast("Nama item wajib"); Object.assign(a, { kategori: $("#ak", m).value.trim() || "Lainnya", item, harga: num($("#ah", m).value), satuan: $("#as", m).value, ket: $("#ax", m).value }); if (isNew) db.addons.push(a); save(); close(); route(); toast("Item tersimpan"); };
      $("#adel", m) && ($("#adel", m).onclick = async () => { close(); if (await confirmBox(`Hapus ${a.item}?`)) { db.addons = db.addons.filter(x => x.id !== a.id); save(); route(); } });
    });
}
function promptModal(title, val, cb) {
  modal(`<h2>${esc(title)}</h2><input class="in" id="pv" value="${esc(val)}"><div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn" data-close>Batal</button><button class="btn gold" id="pok">Simpan</button></div>`,
    (m, close) => { $("#pv", m).focus(); $("#pok", m).onclick = () => { const v = $("#pv", m).value.trim(); if (v) { cb(v); close(); } }; });
}
function download(name, data, type) {
  const b = data instanceof Blob ? data : new Blob([data], { type }), a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
}
/* ================= EXCEL & BACKUP ================= */
const sv = v => v === null || v === undefined ? "" : String(v).trim();
const yaTidak = v => /^(y|ya|yes|true|1|v|✓)/i.test(sv(v));
const JENIS_LABEL = { "akad & resepsi": "both", "akad dan resepsi": "both", "akad": "akad", "resepsi": "resepsi" };
const isiKotak = b => lines((b || {}).isi).map(x => x.replace(BUL, "")).join("\n");
// Excel sering membuang angka 0 di depan nomor HP (0812… jadi 812…) — kembalikan
const hpText = v => { const s = typeof v === "number" ? String(Math.round(v)) : sv(v); return /^8\d{7,12}$/.test(s) ? "0" + s : s; };
/* Kolom sheet "Acara" — dipakai untuk export dan import (judul kolom = kunci) */
function acaraCols() {
  const L = o => lokOf(o)[0] || newLok();
  const setL = (o, f, v) => { L(o); if (!lokOf(o).length) o.lokasi = [newLok()]; o.lokasi[0][f] = sv(v); };
  return [
    { h: "Tanggal", w: 12, type: "date", get: o => o.tanggal, set: (o, v) => { o.tanggal = XLSX.toYmd(v); } },
    { h: "Hari", w: 9, get: o => o.tanggal ? fmtD(o.tanggal, { weekday: "long" }) : "" },
    { h: "Lokasi ke", w: 8, get: o => lokKe(o), set: (o, v) => { o.lokasiKe = sv(v); } },
    { h: "Nama manten", w: 22, get: o => o.nama, set: (o, v) => { o.nama = sv(v); } },
    { h: "No HP", w: 15, get: o => o.hp, set: (o, v) => { o.hp = hpText(v); } },
    { h: "IG", w: 18, get: o => o.ig, set: (o, v) => { o.ig = sv(v); } },
    { h: "TikTok", w: 18, get: o => o.tiktok, set: (o, v) => { o.tiktok = sv(v); } },
    { h: "Bapak", w: 16, get: o => o.bapak, set: (o, v) => { o.bapak = sv(v); } },
    { h: "Ibu", w: 16, get: o => o.ibu, set: (o, v) => { o.ibu = sv(v); } },
    { h: "Acara", w: 15, get: o => lokJudul(L(o)), set: (o, v) => { const k = JENIS_LABEL[sv(v).toLowerCase()]; setL(o, "jenis", k || (sv(v) ? "lain" : "both")); if (!k && sv(v)) o.lokasi[0].namaAcara = sv(v); } },
    { h: "Jam akad", w: 13, get: o => L(o).jamAkad, set: (o, v) => setL(o, "jamAkad", normJam(v)) },
    { h: "Tempat akad (kalau beda)", w: 16, get: o => L(o).tempatAkad, set: (o, v) => setL(o, "tempatAkad", v) },
    { h: "Jam resepsi", w: 13, get: o => L(o).jamResepsi, set: (o, v) => setL(o, "jamResepsi", normJam(v)) },
    { h: "Jam acara lain", w: 13, get: o => L(o).jenis === "lain" ? L(o).jam : "", set: (o, v) => setL(o, "jam", normJam(v)) },
    { h: "Tempat", w: 22, type: "wrap", get: o => L(o).tempat, set: (o, v) => setL(o, "tempat", v) },
    { h: "Alamat", w: 34, type: "wrap", get: o => L(o).alamat, set: (o, v) => setL(o, "alamat", v) },
    { h: "Link Google Maps", w: 30, get: o => L(o).maps, set: (o, v) => setL(o, "maps", ambilLink(v)) },
    { h: "Acara malam", w: 10, get: o => o.acaraMalam ? "Ya" : "", set: (o, v) => { o.acaraMalam = yaTidak(v); } },
    { h: "Wilayah paket", w: 14, get: o => { const p = paketById(o.paketId); return p && paketMode(o) === "paket" ? (wilById(p.wilayahId) || {}).nama || "" : ""; } },
    { h: "Paket", w: 18, get: o => { const p = paketById(o.paketId); return p && paketMode(o) === "paket" ? p.nama : sv(o.paketNama); }, set: (o, v, rec) => {
        const nama = sv(v), wil = sv(rec["Wilayah paket"]).toLowerCase();
        const p = db.paket.find(x => x.nama.toLowerCase() === nama.toLowerCase() && (!wil || (wilById(x.wilayahId) || {}).nama?.toLowerCase() === wil)) || db.paket.find(x => x.nama.toLowerCase() === nama.toLowerCase());
        if (p) Object.assign(o, { paketMode: "paket", paketId: p.id, paketNama: p.nama, wilayahId: p.wilayahId });
        else Object.assign(o, { paketMode: nama ? "custom" : "", paketId: "", paketNama: nama });
      } },
    ...KOTAK.map(([k, j]) => ({ h: j, w: k === "gaun" ? 34 : 26, type: "wrap", get: o => isiKotak(kot(o, k)), set: (o, v) => { ensureKotak(o); kot(o, k).isi = sv(v); } })),
    { h: "Kotak lain", w: 30, type: "wrap", get: o => (o.kotak || []).filter(b => !KOTAK.some(([k]) => k === b.k) && lines(b.isi).length).map(b => `${b.judul || "Lainnya"}:\n${isiKotak(b)}`).join("\n\n"),
      set: (o, v) => { ensureKotak(o); o.kotak = o.kotak.filter(b => KOTAK.some(([k]) => k === b.k)); sv(v).split(/\n\s*\n/).forEach(bl => { const L2 = lines(bl); if (!L2.length) return; const head = /:$/.test(L2[0]) ? L2.shift().replace(/:$/, "") : "Lainnya"; o.kotak.push({ k: "c_" + uid(), judul: head, isi: L2.join("\n") }); }); } },
    ...ROLES.map(r => ({ h: "Tim: " + r, w: 18, type: "wrap", role: r, get: o => teamOf(o).filter(t => t.peran === r).map(t => t.nama).join("\n") })),
    { h: "Status", w: 14, get: o => statusOf(o)[0] },
    { h: "Selesai (arsip)", w: 10, get: o => o.selesai ? "Ya" : "", set: (o, v) => { o.selesai = yaTidak(v); } },
    { h: "Dibatalkan", w: 10, get: o => o.batal ? "Ya" : "", set: (o, v) => { o.batal = yaTidak(v); } },
    { h: "ID (jangan diubah)", w: 16, get: o => o.id }
  ];
}
const TIM_COLS = [["Peran", 14], ["Nama", 22], ["No HP", 16], ["Aktif", 8], ["ID (jangan diubah)", 16]];
const PAKET_COLS = [["Wilayah", 14], ["Nama paket", 22], ["Harga", 14, "num"], ["Deskripsi", 30, "wrap"], ["Isi paket", 46, "wrap"], ["Biaya tambahan", 34, "wrap"], ["Catatan", 26, "wrap"], ["ID (jangan diubah)", 16]];
const ADDON_COLS = [["Kategori", 18], ["Item", 26], ["Harga", 14, "num"], ["Satuan", 12], ["Keterangan", 30, "wrap"], ["ID (jangan diubah)", 16]];
const toCols = arr => arr.map(([h, w, type]) => ({ h, w, type }));

function exportExcel() {
  if (!window.XLSX) return toast("Modul Excel belum termuat — muat ulang aplikasi");
  const now = new Date(), A = acaraCols(), orders = sortByDate(db.orders.slice());
  const sheets = [
    { name: "Info", noFilter: true, noFreeze: true, cols: [{ h: "Keterangan", w: 26 }, { h: "Isi", w: 70, type: "wrap" }], rows: [
      ["Aplikasi", db.settings.bizName + " — Organizer"], ["Diekspor", now.toLocaleString("id-ID")],
      ["Jumlah acara", String(db.orders.length)], ["Jumlah tim", String(db.tim.length)], ["Jumlah paket", String(db.paket.length)], ["Jumlah perlengkapan", String(db.addons.length)],
      ["Cara import", "Ubah data di sheet Acara / Tim / Paket / Perlengkapan, simpan, lalu buka aplikasi → Pengaturan → Data & Backup → Import dari Excel.\nJangan ubah judul kolom. Kolom “ID (jangan diubah)” dipakai untuk mencocokkan data; baris baru cukup dikosongkan ID-nya.\nKolom isi (Gaun, Dekor, dll.): 1 baris = 1 item (Alt+Enter untuk baris baru di Excel).\nKolom Tim: satu nama per baris."]] },
    { name: "Acara", cols: A.map(({ h, w, type }) => ({ h, w, type })), rows: orders.map(o => A.map(c => c.get(o))) },
    { name: "Tim", cols: toCols(TIM_COLS), rows: [...db.tim].sort((a, b) => roleIdx(a.peran) - roleIdx(b.peran)).map(t => [t.peran, t.nama, t.hp, t.aktif === false ? "Tidak" : "Ya", t.id]) },
    { name: "Paket", cols: toCols(PAKET_COLS), rows: db.paket.map(p => [(wilById(p.wilayahId) || {}).nama || "", p.nama, num(p.harga), p.deskripsi, p.isi, p.biayaTambahan, p.catatan, p.id]) },
    { name: "Perlengkapan", cols: toCols(ADDON_COLS), rows: db.addons.map(a => [a.kategori, a.item, num(a.harga), a.satuan, a.ket, a.id]) }
  ];
  download(`${db.settings.bizName} - Data ${todayStr()}.xlsx`, XLSX.build(sheets));
  toast("File Excel diunduh");
}

/* rows → [{judul kolom: nilai}] dari sheet yang baris pertamanya judul kolom */
function sheetRecords(rows, need) {
  if (!rows || !rows.length) return null;
  const hi = rows.findIndex(r => r && need.every(n => r.some(c => sv(c).toLowerCase() === n.toLowerCase())));
  if (hi < 0) return null;
  const head = rows[hi].map(sv);
  return rows.slice(hi + 1).filter(r => r && r.some(c => sv(c))).map(r => Object.fromEntries(head.map((h, i) => [h, r[i]]).filter(([h]) => h)));
}
const findSheet = (S, re) => Object.keys(S).find(n => re.test(n));
/* File Database_Harvy_Wedding.xlsx asli: sheet per wilayah + 5_Perlengkapan */
function fromOriginalDb(S) {
  const paket = [], wilayah = [], addons = [];
  const LBL = [["Dekor", "Dekor"], ["Efek & Hiburan", "Efek & Hiburan"], ["Dokumentasi & Acara", "Dokumentasi & Acara"], ["Rias Pengantin", "Rias Pengantin"], ["Bunga", "Bunga"], ["Perlengkapan", "Perlengkapan"], ["Isi Paket Lainnya", "Lainnya"]];
  Object.keys(S).forEach(name => {
    const recs = sheetRecords(S[name], ["Nama Paket"]);
    if (recs) {
      const wn = name.replace(/^\d+_?/, "").replace(/_/g, " ").trim() || name;
      const w = db.wilayah.find(x => x.nama.toLowerCase() === wn.toLowerCase()) || { id: uid(), nama: wn };
      if (!wilayah.includes(w)) wilayah.push(w);
      recs.forEach(r => { if (!sv(r["Nama Paket"])) return;
        const isi = LBL.map(([col, lbl]) => { const L2 = lines(sv(r[col])).map(x => x.replace(/4\s*[–x×]\s*8/, "4 x 8")); return L2.length ? lbl + "\n" + L2.map(x => "• " + x.replace(BUL, "")).join("\n") : ""; }).filter(Boolean).join("\n\n");
        const old = db.paket.find(x => x.wilayahId === w.id && x.nama.toLowerCase() === sv(r["Nama Paket"]).toLowerCase());
        paket.push({ id: old ? old.id : uid(), wilayahId: w.id, nama: sv(r["Nama Paket"]), harga: num(r["Harga (Rp)"]), deskripsi: sv(r["Deskripsi"]), isi, biayaTambahan: sv(r["Biaya Tambahan"]), catatan: sv(r["Catatan / Ketentuan"]) });
      });
    }
    const ar = sheetRecords(S[name], ["Kategori", "Item"]);
    if (ar) ar.forEach(r => { if (!sv(r["Item"]) || /catatan/i.test(sv(r["Kategori"]))) return; const old = db.addons.find(x => x.item.toLowerCase() === sv(r["Item"]).toLowerCase() && x.kategori === sv(r["Kategori"])); addons.push({ id: old ? old.id : uid(), kategori: sv(r["Kategori"]), item: sv(r["Item"]), harga: num(r["Harga (Rp)"] ?? r["Harga"]), satuan: sv(r["Satuan"]), ket: sv(r["Keterangan"]) }); });
  });
  return { paket: paket.length ? paket : null, wilayah, addons: addons.length ? addons : null };
}
async function importExcel(file) {
  let S;
  try { S = await XLSX.read(file); } catch (e) { return toast(e.message || "File tidak bisa dibaca"); }
  const A = acaraCols(), ID = "ID (jangan diubah)";
  const acara = sheetRecords(S[findSheet(S, /^acara$/i)], ["Nama manten"]);
  const tim = sheetRecords(S[findSheet(S, /^tim$/i)], ["Peran", "Nama"]);
  let paketRecs = sheetRecords(S[findSheet(S, /^paket$/i)], ["Nama paket", "Isi paket"]);
  let addonRecs = sheetRecords(S[findSheet(S, /^perlengkapan$/i)], ["Kategori", "Item"]);
  let paket = null, wilayah = null, addons = null, asal = "app";
  if (paketRecs) { wilayah = []; paket = paketRecs.filter(r => sv(r["Nama paket"])).map(r => { const wn = sv(r["Wilayah"]) || "Lainnya"; let w = wilayah.find(x => x.nama.toLowerCase() === wn.toLowerCase()) || db.wilayah.find(x => x.nama.toLowerCase() === wn.toLowerCase()); if (!w) w = { id: uid(), nama: wn }; if (!wilayah.includes(w)) wilayah.push(w); const id = sv(r[ID]); return { id: db.paket.some(p => p.id === id) || /^[\w-]+$/.test(id) ? id || uid() : uid(), wilayahId: w.id, nama: sv(r["Nama paket"]), harga: num(r["Harga"]), deskripsi: sv(r["Deskripsi"]), isi: sv(r["Isi paket"]), biayaTambahan: sv(r["Biaya tambahan"]), catatan: sv(r["Catatan"]) }; }); }
  if (addonRecs) addons = addonRecs.filter(r => sv(r["Item"])).map(r => { const id = sv(r[ID]); return { id: /^[\w-]+$/.test(id) ? id : uid(), kategori: sv(r["Kategori"]) || "Lainnya", item: sv(r["Item"]), harga: num(r["Harga"]), satuan: sv(r["Satuan"]), ket: sv(r["Keterangan"]) }; });
  if (!acara && !tim && !paket && !addons) { const o = fromOriginalDb(S); paket = o.paket; wilayah = o.wilayah; addons = o.addons; asal = "database"; }
  if (!acara && !tim && !paket && !addons) return toast("Tidak ada sheet yang dikenali (Acara / Tim / Paket / Perlengkapan)");
  const acaraBaru = (acara || []).filter(r => sv(r["Nama manten"]) && !db.orders.some(o => o.id === sv(r[ID]))).length, acaraUbah = (acara || []).filter(r => db.orders.some(o => o.id === sv(r[ID]))).length;
  const timBaru = (tim || []).filter(r => sv(r["Nama"]) && !db.tim.some(t => t.id === sv(r[ID]) || normNama(t.nama) === normNama(r["Nama"]))).length, timUbah = (tim || []).length - timBaru;
  const opt = (id, on, judul, ket) => `<label class="ck" style="align-items:flex-start"><input type="checkbox" id="${id}" ${on ? "checked" : ""}><span><b>${judul}</b><br><span class="small muted">${ket}</span></span></label>`;
  modal(`<h2>Import dari Excel</h2><p class="small muted" style="margin-top:-6px">${esc(file.name)}${asal === "database" ? " — dikenali sebagai file Database (paket & perlengkapan)" : ""}</p><div class="checks">
    ${acara ? opt("imA", true, `Acara: ${acaraBaru} baru, ${acaraUbah} diperbarui`, "Acara yang ID-nya cocok diperbarui, sisanya ditambahkan. Acara lain di aplikasi tidak dihapus.") : ""}
    ${tim ? opt("imT", true, `Tim: ${timBaru} baru, ${timUbah} diperbarui`, "Nama, peran, no HP & status aktif.") : ""}
    ${paket ? opt("imP", true, `Paket: ${paket.length} paket (${wilayah.length} wilayah)`, "Daftar paket di aplikasi diganti dengan isi file.") : ""}
    ${addons ? opt("imD", true, `Perlengkapan: ${addons.length} item`, "Daftar perlengkapan di aplikasi diganti dengan isi file.") : ""}
    </div><p class="small muted">Saran: download backup dulu sebelum import.</p>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" data-close>Batal</button><button class="btn gold" id="imGo">${ic("up")}Import</button></div>`, (m, close) => {
    $("#imGo", m).onclick = async () => {
      await snapshot("Sebelum import Excel", true);
      const on = id => $("#" + id, m)?.checked; const hasil = [];
      if (paket && on("imP")) { wilayah.forEach(w => { if (!db.wilayah.some(x => x.id === w.id)) db.wilayah.push(w); }); db.paket = paket; hasil.push(`${paket.length} paket`); }
      if (addons && on("imD")) { db.addons = addons; hasil.push(`${addons.length} perlengkapan`); }
      if (tim && on("imT")) { tim.forEach(r => { if (!sv(r["Nama"])) return; const id = sv(r[ID]); let t = db.tim.find(x => x.id === id) || db.tim.find(x => normNama(x.nama) === normNama(r["Nama"])); if (!t) { t = { id: uid(), nama: "", peran: "Lainnya", hp: "", aktif: true }; db.tim.push(t); } Object.assign(t, { nama: sv(r["Nama"]), peran: ROLES.includes(sv(r["Peran"])) ? sv(r["Peran"]) : "Lainnya", hp: hpText(r["No HP"]), aktif: !/^t/i.test(sv(r["Aktif"])) }); }); hasil.push(`${tim.length} anggota tim`); }
      if (acara && on("imA")) {
        let n = 0;
        acara.forEach(rec => {
          if (!sv(rec["Nama manten"]) && !sv(rec[ID])) return;
          let o = db.orders.find(x => x.id === sv(rec[ID])); const baru = !o;
          if (!o) { o = blankOrder(); if (/^[\w-]+$/.test(sv(rec[ID]))) o.id = sv(rec[ID]); }
          toKotak(o); toLokasi(o); ensureKotak(o);
          A.forEach(c => { if (c.set && c.h in rec) c.set(o, rec[c.h], rec); });
          const roleCols = A.filter(c => c.role && c.h in rec);
          if (roleCols.length) {
            o.crew = [];
            roleCols.forEach(c => lines(sv(rec[c.h]).replace(/,/g, "\n")).forEach(nama => { let t = db.tim.find(x => normNama(x.nama) === normNama(nama)); if (!t) { t = { id: uid(), nama, peran: c.role, hp: "", aktif: true }; db.tim.push(t); } if (!o.crew.includes(t.id)) o.crew.push(t.id); }));
          }
          if (baru) db.orders.push(o); n++;
        });
        hasil.push(`${n} acara`);
      }
      canonTim(db); save(); close(); route(); toast(hasil.length ? "Berhasil import: " + hasil.join(", ") : "Tidak ada yang di-import");
    };
  });
}

function backupData() {
  const now = new Date();
  const isi = { aplikasi: "Harvy Wedding Organizer", jenis: "backup", format: 2, dibuat: now.toISOString(), dibuatTeks: now.toLocaleString("id-ID"),
    ringkasan: { acara: db.orders.length, tim: db.tim.length, paket: db.paket.length, perlengkapan: db.addons.length }, data: db };
  download(`Backup ${db.settings.bizName} ${todayStr()} ${pad(now.getHours())}.${pad(now.getMinutes())}.json`, JSON.stringify(isi, null, 2), "application/json");
  db.settings.lastBackup = now.toISOString(); save();
  toast("Backup diunduh — simpan file ini di tempat aman");
}
async function restoreData(file) {
  let j; try { j = JSON.parse(await file.text()); } catch { return toast("File backup tidak valid"); }
  const d = j && j.data && j.data.orders ? j.data : j;
  if (!d || !Array.isArray(d.orders) || !d.settings) return toast("Ini bukan file backup aplikasi ini");
  const kapan = j.dibuat ? new Date(j.dibuat).toLocaleString("id-ID") : "tidak diketahui (format lama)";
  modal(`<h2>Pulihkan backup</h2><dl class="kv"><dt>File</dt><dd>${esc(file.name)}</dd><dt>Dibuat</dt><dd>${esc(kapan)}</dd><dt>Isi</dt><dd>${d.orders.length} acara · ${(d.tim || []).length} tim · ${(d.paket || []).length} paket · ${(d.addons || []).length} perlengkapan</dd><dt>Di perangkat ini</dt><dd>${db.orders.length} acara · ${db.tim.length} tim</dd></dl>
    <div class="checks" style="margin-top:12px">
      <label class="ck" style="align-items:flex-start"><input type="radio" name="rmode" value="gabung" checked><span><b>Gabungkan</b><br><span class="small muted">Tambahkan acara, tim, paket & perlengkapan yang belum ada. Data di perangkat ini tidak diubah.</span></span></label>
      <label class="ck" style="align-items:flex-start"><input type="radio" name="rmode" value="ganti"><span><b>Ganti semua</b><br><span class="small muted">Semua data di perangkat ini diganti isi backup (untuk pindah HP / laptop).</span></span></label></div>
    <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn" data-close>Batal</button><button class="btn gold" id="rGo">Pulihkan</button></div>`, (m, close) => {
    $("#rGo", m).onclick = async () => {
      await snapshot("Sebelum pulihkan backup", true);
      const mode = $('input[name="rmode"]:checked', m).value;
      const b = migrate(JSON.parse(JSON.stringify(d))); b.orders.forEach(o => { toKotak(o); toLokasi(o); });
      if (mode === "ganti") db = b;
      else {
        let n = 0;
        b.wilayah.forEach(w => { if (!db.wilayah.some(x => x.id === w.id)) db.wilayah.push(w); });
        b.paket.forEach(p => { if (!db.paket.some(x => x.id === p.id)) db.paket.push(p); });
        b.addons.forEach(a => { if (!db.addons.some(x => x.id === a.id)) db.addons.push(a); });
        const peta = {}; b.tim.forEach(t => { const ada = db.tim.find(x => x.id === t.id || normNama(x.nama) === normNama(t.nama)); if (ada) peta[t.id] = ada.id; else db.tim.push(t); });
        b.orders.forEach(o => { if (db.orders.some(x => x.id === o.id)) return; o.crew = (o.crew || []).map(id => peta[id] || id); db.orders.push(o); n++; });
        canonTim(db); toast(`${n} acara ditambahkan dari backup`);
      }
      save(); applyTheme(); close(); route(); if (mode === "ganti") toast("Data berhasil dipulihkan");
    };
  });
}

/* ---------- ARSIP: acara yang sudah lewat / ditandai selesai / batal ---------- */
const isArsip = o => !!(o.selesai || o.batal || (o.tanggal && o.tanggal < todayStr()));
let arsipState = { q: "", sel: new Set(), bulan: "" };
function vArsip() {
  const st = arsipState, q = st.q.toLowerCase().trim();
  let arr = db.orders.filter(isArsip);
  const bulanList = [...new Set(arr.map(o => (o.tanggal || "").slice(0, 7)).filter(Boolean))].sort().reverse();
  if (st.bulan) arr = arr.filter(o => (o.tanggal || "").startsWith(st.bulan));
  if (q) arr = arr.filter(o => [o.nama, alamatStr(o), o.hp, teamOf(o).map(x => x.nama).join(" ")].join(" ").toLowerCase().includes(q));
  sortByDate(arr).reverse();
  st.sel = new Set([...st.sel].filter(id => db.orders.some(o => o.id === id && isArsip(o))));
  const groups = {}; arr.forEach(o => { const k = o.tanggal ? o.tanggal.slice(0, 7) : "zz"; (groups[k] = groups[k] || []).push(o); });
  const nSel = st.sel.size, semua = arr.length && arr.every(o => st.sel.has(o.id));
  const row = o => { const d = parseD(o.tanggal), on = st.sel.has(o.id); return `<div class="arow ${on ? "on" : ""}"><label class="acheck"><input type="checkbox" data-asel="${esc(o.id)}" ${on ? "checked" : ""}></label>
    <a class="ev grow" href="#/acara/${esc(o.id)}"><div class="date ${d ? "" : "none"}">${d ? `<small>${d.toLocaleDateString("id-ID", { month: "short" })}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString("id-ID", { weekday: "short" })}</small>` : `<b>?</b><small>tgl</small>`}</div>
    <div class="grow" style="min-width:0"><div class="t">${esc(o.nama || "Tanpa nama")}</div><div class="m"><span>${ic("pin")}${esc(alamatStr(o) || "-")}</span><span>${ic("users")}${teamOf(o).length} orang</span></div></div>
    <div class="r">${o.batal ? `<span class="pill bad">Batal</span>` : `<span class="pill ok">Selesai</span>`}</div></a></div>`; };
  return `${mtop()}<div class="top"><div><h1>Arsip</h1><p>${db.orders.filter(isArsip).length} acara selesai / batal — bisa di-download PDF atau dihapus</p></div></div>
  <div class="row" style="margin-bottom:12px"><div class="search">${ic("search")}<input class="in" id="aq" placeholder="Cari nama, alamat, tim…" value="${esc(st.q)}"></div>
    <select class="in" id="abulan" style="width:auto;min-width:170px"><option value="">Semua bulan</option>${bulanList.map(b => `<option value="${b}" ${b === st.bulan ? "selected" : ""}>${parseD(b + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</option>`).join("")}</select></div>
  <div class="card abar"><label class="toggle"><input type="checkbox" id="aall" ${semua ? "checked" : ""}>Pilih semua (${arr.length})</label><b class="grow small">${nSel} dipilih</b>
    <button class="btn sm gold" data-act="apdf" ${nSel ? "" : "disabled"}>${ic("down")}PDF</button><button class="btn sm danger" data-act="adel" ${nSel ? "" : "disabled"}>${ic("trash")}Hapus</button></div>
  <div id="alist">${arr.length ? Object.keys(groups).sort().reverse().map(k => `<div class="month-h"><span>${k === "zz" ? "Tanpa tanggal" : parseD(k + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</span><button class="btn sm ghost" data-abulanpilih="${k}">Pilih bulan ini</button></div><div class="card" style="padding:6px">${groups[k].map(row).join("")}</div>`).join("") : `<div class="card empty">${ic("arsip")}<div>Belum ada acara di arsip.</div><div class="small">Acara otomatis masuk ke sini setelah tanggalnya lewat, atau saat ditandai selesai / batal.</div></div>`}</div>`;
}

/* ---------- KEAMANAN DATA ---------- */
function keamananCard() {
  const lb = db.settings.lastBackup ? new Date(db.settings.lastBackup) : null;
  return `<div class="card" style="margin-bottom:16px"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Keamanan data</h2><span class="pill ${store.idb ? "ok" : "warn"}">${store.idb ? "Database perangkat aktif" : "Mode cadangan"}</span></div>
    <dl class="kv" style="margin-top:12px"><dt>Penyimpanan</dt><dd>${store.idb ? "Database bawaan perangkat (IndexedDB)" + (store.mirror ? " + salinan cadangan" : "") : "Penyimpanan sederhana browser (localStorage)"}</dd>
    <dt>Izin permanen</dt><dd id="persistInfo">memeriksa…</dd><dt>Terpakai</dt><dd id="usageInfo">memeriksa…</dd>
    <dt>Backup terakhir</dt><dd>${lb ? esc(lb.toLocaleString("id-ID")) + (Date.now() - lb > 7 * 864e5 ? " — <b>sudah lebih dari seminggu</b>" : "") : "<b>belum pernah</b>"}</dd></dl>
    <div class="row" style="margin-top:10px"><button class="btn gold sm" data-act="backup">${ic("down")}Download backup sekarang</button><button class="btn sm" data-act="persist">Minta izin penyimpanan permanen</button></div>
    <div class="hr"></div><h3>Titik pulih otomatis</h3><p class="small muted" style="margin-top:-4px">Disimpan di perangkat ini: 1 per hari (7 hari terakhir) + sebelum setiap hapus / reset / import / pulihkan. Pakai kalau ada data yang terhapus tidak sengaja.</p>
    <div id="snapList" class="small muted">Memuat…</div></div>`;
}
async function loadKeamanan() {
  const el = $("#snapList"); if (!el) return;
  try {
    const p = navigator.storage && navigator.storage.persisted ? await navigator.storage.persisted() : null;
    const pi = $("#persistInfo"); if (pi) pi.innerHTML = p ? "Diizinkan ✓ — browser tidak akan menghapus data otomatis" : p === false ? (isIOS ? "Di iPhone/iPad: pasang ke Layar Utama agar data tidak dihapus otomatis" : "Belum — tekan tombol di bawah, atau pasang aplikasinya") : "Tidak didukung browser ini";
    const est = navigator.storage && navigator.storage.estimate ? await navigator.storage.estimate() : null;
    const ui = $("#usageInfo"); if (ui) ui.textContent = est ? `${(est.usage / 1048576).toFixed(1)} MB dari ±${Math.round(est.quota / 1048576)} MB tersedia` : `${(JSON.stringify(db).length / 1024).toFixed(0)} KB data`;
  } catch {}
  if (!store.idb) { el.textContent = "Titik pulih memerlukan database perangkat (tidak tersedia di mode ini)."; return; }
  try {
    const all = (await idb.all("snap")).sort((a, b) => b.at - a.at);
    el.innerHTML = all.length ? all.map(r => `<div class="li"><div class="grow"><div class="t">${esc(r.label)}</div><div class="small muted">${esc(new Date(r.at).toLocaleString("id-ID"))} · ${r.ringkasan.acara} acara · ${r.ringkasan.tim} tim</div></div><button class="btn sm" data-act="snaprestore" data-id="${esc(r.id)}">Pulihkan</button></div>`).join("") : "Belum ada titik pulih — dibuat otomatis mulai hari ini.";
  } catch { el.textContent = "Titik pulih tidak bisa dibaca."; }
}
/* pengingat backup di Dashboard */
function backupReminder() {
  if (!db.orders.length) return "";
  try { if (+localStorage.getItem("harvy_bk_hide") > Date.now()) return ""; } catch {}
  const lb = db.settings.lastBackup ? new Date(db.settings.lastBackup) : null, hari = lb ? Math.floor((Date.now() - lb) / 864e5) : null;
  if (lb && hari < 7) return "";
  return `<div class="card install"><div class="avatar" style="width:46px;height:46px">${ic("down")}</div><div class="grow"><b>${lb ? `Sudah ${hari} hari belum backup` : "Data belum pernah di-backup"}</b><div class="small muted">Simpan salinan data ke file supaya aman kalau HP rusak / ganti HP.</div></div><button class="btn gold" data-act="backup">Backup</button><button class="btn icon ghost" data-act="bkhide" title="Nanti">${ic("x")}</button></div>`;
}

/* ---------- PDF laporan acara (kop surat + ringkasan + rincian) ---------- */
async function logoJpeg() {
  try {
    const src = db.settings.logo && db.settings.logo.startsWith("data:image/jpeg") ? db.settings.logo : null;
    if (src) { const bin = atob(src.split(",")[1]); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; }
    return new Uint8Array(await (await fetch(LOGO_DEFAULT)).arrayBuffer());
  } catch { return null; }
}
function pdfAcara(list, judul, logo) {
  if (!window.PDF) { toast("Modul PDF belum termuat — muat ulang aplikasi"); return null; }
  const s = db.settings, d = PDF.create(), M = 42, CW = d.PW - M * 2, LAB = 118;
  const INK = [27, 25, 22], MUT = [110, 102, 90], GOLD = [176, 131, 47], GOLDD = [138, 100, 32], SOFT = [247, 240, 225], ZEB = [251, 249, 245], LINE = [226, 218, 203], DARK = [24, 22, 18];
  const img = logo ? d.addJpeg(logo) : null;
  const now = new Date(), noDok = `${list.length > 1 ? "ARS" : "ACR"}/${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}/${pad(now.getHours())}${pad(now.getMinutes())}`;
  const tgl = list.map(o => o.tanggal).filter(Boolean).sort();
  const pend = { day: "numeric", month: "short", year: "numeric" };
  const periode = tgl.length ? (tgl[0] === tgl.at(-1) ? fmtD(tgl[0], { day: "numeric", month: "long", year: "numeric" }) : `${fmtD(tgl[0], pend)} – ${fmtD(tgl.at(-1), pend)}`) : "-";
  const kontak = [s.hpOwner && "WA Owner " + s.hpOwner, s.hpAdmin && "Admin " + s.hpAdmin, s.ig && "IG @" + String(s.ig).replace(/^@/, "")].filter(Boolean).join("   •   ");
  d.title = judul;
  let y = 0;
  const kopBesar = () => {
    if (img) { d.rrect(M - 2, 30, 66, 66, 33, null, GOLD, 1.2); d.image(M + 1, 33, 60, 60, img, { circle: true }); }
    const x = M + (img ? 78 : 0);
    d.text(x, 34, s.bizName.toUpperCase(), { size: 20, bold: true, color: INK, spacing: 0.6 });
    d.text(x, 58, s.tagline || "Profesional Makeup & Wedding Planner", { size: 10, italic: true, color: GOLDD });
    if (s.alamat) d.text(x, 73, d.fit(s.alamat, 8.5, false, CW - (x - M)), { size: 8.5, color: MUT });
    if (kontak) d.text(x, 85, d.fit(kontak, 8.5, false, CW - (x - M)), { size: 8.5, color: MUT });
    d.rect(M, 104, CW, 2.2, GOLD); d.rect(M, 108.5, CW, 0.6, GOLD);
    y = 124;
  };
  const kopKecil = () => {
    if (img) d.image(M, 22, 24, 24, img, { circle: true });
    const x = M + (img ? 32 : 0);
    d.text(x, 25, s.bizName.toUpperCase(), { size: 10.5, bold: true, color: INK, spacing: 0.4 });
    d.text(x, 38, s.tagline || "", { size: 7.5, italic: true, color: GOLDD });
    d.text(M + CW, 25, judul, { size: 8.5, bold: true, color: MUT, align: "right" });
    d.text(M + CW, 38, "No. " + noDok, { size: 7.5, color: MUT, align: "right" });
    d.rect(M, 54, CW, 1.4, GOLD);
    y = 70;
  };
  const newPage = () => { d.addPage(); kopKecil(); };
  const need = h => { if (y + h > d.PH - 64) newPage(); };
  const sectionTitle = t => { need(30); d.text(M, y, t.toUpperCase(), { size: 8, bold: true, color: GOLDD, spacing: 0.8 }); d.line(M, y + 12, M + CW, y + 12, LINE, 0.6); y += 18; };
  let zebra = false;
  const row = (label, value, o = {}) => {
    const val = String(value ?? "").trim(); if (!val) return;
    const L = d.wrap(val, 9.3, false, CW - LAB - 16), h = L.length * 12.5 + 8;
    need(Math.min(h, 70));
    const hh = Math.min(h, d.PH - 64 - y);
    if (zebra) d.rect(M, y, CW, hh, ZEB); zebra = !zebra;
    d.text(M + 8, y + 4.5, label, { size: 8.3, bold: true, color: MUT });
    let yy = y + 4;
    L.forEach((ln, i) => {
      if (yy + 12.5 > d.PH - 64) { y = yy; newPage(); yy = y + 4; }
      d.text(M + LAB, yy, ln, { size: 9.3, color: o.link ? [29, 78, 216] : INK });
      if (o.link && i === 0) d.link(M + LAB, yy, Math.min(CW - LAB, d.width(ln, 9.3)), 12, o.link);
      yy += 12.5;
    });
    y = yy + 4; d.line(M, y, M + CW, y, LINE, 0.4);
  };
  const pill = (xRight, yy, text, fg, bg) => { const w = d.width(text, 7.5, true) + 14; d.rrect(xRight - w, yy, w, 15, 7.5, bg); d.text(xRight - w / 2, yy + 4, text, { size: 7.5, bold: true, color: fg, align: "center" }); return w; };
  const statusOf2 = o => o.batal ? ["BATAL", [176, 64, 44], [249, 226, 220]] : isArsip(o) ? ["SELESAI", [37, 110, 66], [223, 240, 228]] : ["TERJADWAL", GOLDD, SOFT];

  // ---------- halaman 1: kop + judul dokumen ----------
  kopBesar();
  d.text(d.PW / 2, y, (list.length > 1 ? "ARSIP DATA ACARA PERNIKAHAN" : "DATA ACARA PERNIKAHAN"), { size: 13, bold: true, color: INK, align: "center", spacing: 1 });
  d.text(d.PW / 2, y + 18, `No. ${noDok}`, { size: 8.5, color: MUT, align: "center" });
  y += 40;
  // info dokumen
  const info = [["Periode acara", periode], ["Jumlah acara", `${list.length} acara`], ["Dicetak", `${now.toLocaleDateString("id-ID", pend)}, ${pad(now.getHours())}.${pad(now.getMinutes())}`]];
  d.rrect(M, y, CW, 50, 6, SOFT);
  info.forEach(([k, v], i) => { const x = M + 14 + i * (CW / 3); d.text(x, y + 11, k.toUpperCase(), { size: 7, bold: true, color: GOLDD, spacing: 0.6 }); d.text(x, y + 25, d.fit(v, 9.5, true, CW / 3 - 20), { size: 9.5, bold: true, color: INK }); });
  y += 66;

  // ---------- ringkasan (tabel) ----------
  if (list.length > 1) {
    sectionTitle("Ringkasan");
    const C = [[24, "No"], [80, "Tanggal"], [126, "Nama manten"], [146, "Lokasi"], [52, "Tim"], [83, "Status"]];
    const head = () => { d.rect(M, y, CW, 18, DARK); let x = M; C.forEach(([w, h]) => { d.text(x + 6, y + 5, h, { size: 8, bold: true, color: [236, 211, 155] }); x += w; }); y += 18; };
    head();
    list.forEach((o, i) => {
      if (y + 18 > d.PH - 64) { newPage(); head(); }
      if (i % 2) d.rect(M, y, CW, 18, ZEB);
      const [st, fg] = statusOf2(o), cells = [String(i + 1), o.tanggal ? fmtD(o.tanggal, { day: "2-digit", month: "short", year: "numeric" }) : "-", o.nama || "-", lokTempat(lokOf(o)[0] || {}) || "-", `${teamOf(o).length} orang`, st];
      let x = M; C.forEach(([w], ci) => { d.text(x + 6, y + 5, d.fit(cells[ci], 8.5, ci === 2 || ci === 5, w - 10), { size: 8.5, bold: ci === 2 || ci === 5, color: ci === 5 ? fg : INK }); x += w; });
      y += 18; d.line(M, y, M + CW, y, LINE, 0.4);
    });
    y += 20;
  }

  // ---------- rincian tiap acara ----------
  list.forEach((o, n) => {
    if (list.length > 1 || n > 0) need(150);
    const l = lokOf(o)[0] || {}, team = teamOf(o), [st, fg, bg] = statusOf2(o);
    // judul acara
    d.rect(M, y, CW, 34, DARK);
    d.rrect(M + 10, y + 8, 26, 18, 4, GOLD);
    d.text(M + 23, y + 12, String(n + 1).padStart(2, "0"), { size: 9, bold: true, color: [255, 255, 255], align: "center" });
    d.text(M + 46, y + 7, d.fit(o.nama || "Tanpa nama", 13, true, CW - 230), { size: 13, bold: true, color: [255, 255, 255] });
    d.text(M + 46, y + 22, o.tanggal ? fmtD(o.tanggal) : "Tanggal belum ada", { size: 8.5, color: [214, 200, 170] });
    const pw = pill(M + CW - 10, y + 10, st, fg, bg);
    if (lokKe(o)) pill(M + CW - 16 - pw, y + 10, "LOKASI " + lokKe(o), GOLDD, SOFT);
    y += 44; zebra = false;

    sectionTitle("Jadwal & lokasi");
    row("Acara", lokJam(l).map(([nm, j]) => [nm, j].filter(x => String(x || "").trim()).join(" ")).join("\n") + (o.acaraMalam ? "\nAda acara malam" : ""));
    row("Tempat", l.tempat); row("Alamat", l.alamat);
    if (isi(l.maps)) row("Google Maps", l.maps, { link: l.maps });
    y += 8; zebra = false;

    sectionTitle("Data pengantin");
    row("No. HP / WA", o.hp); row("Instagram", o.ig); row("TikTok", o.tiktok);
    row("Orang tua", [isi(o.bapak) && "Bpk. " + o.bapak, isi(o.ibu) && "Ibu " + o.ibu].filter(Boolean).join("  &  "));
    y += 8; zebra = false;

    const boxes = (o.kotak || []).filter(b => lines(b.isi).length);
    if (boxes.length || paketLabel(o) !== "-") {
      sectionTitle("Paket & isi acara");
      row("Paket", paketLabel(o) !== "-" ? paketLabel(o) : "");
      boxes.forEach(b => row(b.judul || "Lainnya", lines(b.isi).map(x => "•  " + x.replace(BUL, "")).join("\n")));
      y += 8; zebra = false;
    }
    if (team.length) {
      sectionTitle("Tim bertugas");
      const byR = {}; team.forEach(t => (byR[t.peran] = byR[t.peran] || []).push(t.nama + (t.hp ? `  (${t.hp})` : "")));
      Object.entries(byR).forEach(([r, ns]) => row(r, ns.join("\n")));
      const hadir = team.filter(t => o.absen?.[t.id]);
      if (hadir.length) row("Absen", `${hadir.length} dari ${team.length} hadir` + (team.length > hadir.length ? `\nTidak tercatat: ${team.filter(t => !o.absen?.[t.id]).map(t => t.nama).join(", ")}` : ""));
      const cl = checklistItems(o);
      if (cl.some(x => o.cek?.[x]?.d || o.cek?.[x]?.p)) { const kp = cl.filter(x => !o.cek?.[x]?.p); row("Cek perlengkapan", `Datang ${cl.filter(x => o.cek?.[x]?.d).length}/${cl.length}  ·  Pulang ${cl.length - kp.length}/${cl.length}` + (kp.length ? `\nBelum dicek pulang: ${kp.join(", ")}` : "")); }
      y += 8;
    }
    y += 14;
  });

  // ---------- tanda tangan ----------
  need(96);
  const sx = M + CW - 170;
  d.text(sx + 85, y, `${(s.alamat || "").split(",").pop().trim() || "Lamongan"}, ${now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`, { size: 9, color: INK, align: "center" });
  d.text(sx + 85, y + 13, "Admin " + s.bizName, { size: 9, bold: true, color: INK, align: "center" });
  d.text(sx + 85, y + 72, "( ................................................ )", { size: 9, color: MUT, align: "center" });

  // ---------- footer tiap halaman ----------
  const total = d.count();
  for (let i = 0; i < total; i++) {
    d.onPage(i);
    d.line(M, d.PH - 46, M + CW, d.PH - 46, LINE, 0.6);
    d.text(M, d.PH - 38, `${s.bizName}  •  ${judul}  •  No. ${noDok}`, { size: 7.5, color: MUT });
    d.text(M + CW, d.PH - 38, `Halaman ${i + 1} dari ${total}`, { size: 7.5, bold: true, color: MUT, align: "right" });
  }
  return d.blob();
}
async function downloadPdf(list, nama, judul) {
  if (!list.length) return toast("Tidak ada acara dipilih");
  const logo = await logoJpeg();
  const b = pdfAcara(sortByDate(list.slice()), judul, logo); if (!b) return;
  download(nama.replace(/[\\/:*?"<>|]+/g, "-") + ".pdf", b); toast("PDF diunduh");
}

/* ---------- ROUTER ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, "") || "dashboard";
  const [path, qs] = h.split("?"); const parts = path.split("/");
  let html, cur = parts[0];
  if (parts[0] !== "acara" || (parts[1] !== "baru" && parts[2] !== "edit")) draft = null;
  if (parts[0] === "acara" && parts[1] && parts[1] !== "baru" && isArsip(db.orders.find(o => o.id === parts[1]) || {})) cur = "arsip";
  if (parts[0] === "acara" && parts[1] === "baru") { if (!draft) { draft = blankOrder(); draft._for = "new"; const tg = new URLSearchParams(qs).get("tgl"); if (tg) draft.tanggal = tg; } html = vForm(); }
  else if (parts[0] === "acara" && parts[2] === "edit") html = vForm(parts[1]);
  else if (parts[0] === "acara" && parts[1]) html = vDetail(parts[1]);
  else if (parts[0] === "acara") html = vAcara();
  else if (parts[0] === "arsip") html = vArsip();
  else if (parts[0] === "kalender") html = vKalender();
  else if (parts[0] === "tim") html = vTim();
  else if (parts[0] === "pengaturan") html = vSettings();
  else { cur = "dashboard"; html = vDashboard(); }
  renderNav(cur);
  $("#view").innerHTML = html; growAll();
  if ($("#snapList")) loadKeamanan();
  if (draft) { updTotal(); updatePreview(); }
}
window.addEventListener("hashchange", () => { $$(".modal-bg").forEach(m => m.remove()); route(); window.scrollTo(0, 0); });

/* ---------- EVENTS ---------- */
document.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "aq") { arsipState.q = t.value; const w = $("#alist"), tmp = document.createElement("div"); tmp.innerHTML = vArsip(); const nw = $("#alist", tmp); if (w && nw) w.innerHTML = nw.innerHTML; return; }
  if (t.id === "q") { listState.q = t.value; const w = $("#listwrap"), tmp = document.createElement("div"); tmp.innerHTML = vAcara(); const nw = $("#listwrap", tmp); if (w && nw) w.innerHTML = nw.innerHTML; return; }
  if (draft && t.dataset.b) { draft[t.dataset.b] = t.type === "checkbox" ? t.checked : t.hasAttribute("data-money") ? num(t.value) : t.value; if (t.dataset.b === "tanggal") { rerenderPart("timBox", timFields); rerenderPart("lokasiBox", lokasiFields); } updTotal(); }
  if (draft && t.dataset.lk) { const [i, f] = t.dataset.lk.split("."); draft.lokasi[+i][f] = t.value; updTotal(); return; }
  if (draft && t.dataset.kotak !== undefined) { draft.kotak[+t.dataset.kotak].isi = t.value; t.closest(".kotak").classList.toggle("isi", !!t.value.trim()); grow(t); updatePreview(); return; }
  if (draft && t.dataset.kj !== undefined) { draft.kotak[+t.dataset.kj].judul = t.value; updatePreview(); return; }
  if (t.dataset.s) { db.settings[t.dataset.s] = t.value; save(); if (t.dataset.s === "theme" || t.dataset.s === "bizName") applyTheme(); }
  if (t.dataset.kat) { db.katalog[t.dataset.kat] = lines(t.value); save(); }
});
document.addEventListener("change", async e => {
  const t = e.target;
  if (t.id === "paketSel" && draft) {
    const v = t.value, p = paketById(v), prev = paketById(draft.paketId);
    const isiSekarang = PAKET_KEYS.map(k => kot(draft, k).isi.trim()).join("|") + draft.kotak.filter(b => b.dariPaket).map(b => b.isi).join("|");
    const asli = prev ? (() => { const tmp = ensureKotak({ kotak: [] }); fillFromPaket(tmp, prev); return PAKET_KEYS.map(k => kot(tmp, k).isi.trim()).join("|") + tmp.kotak.filter(b => b.dariPaket).map(b => b.isi).join("|"); })() : "";
    const diubah = isiSekarang.replace(/\|/g, "").trim() && isiSekarang !== asli;
    if (p && diubah && !(await confirmBox(`Isi kotak Dekor, Efek, Dokumentasi, Rias, Bunga & Perlengkapan akan diganti dengan isi ${p.nama}. Lanjutkan?`, "Ganti"))) { t.value = prev ? prev.id : paketMode(draft) === "custom" ? "__custom" : ""; return; }
    if (p) { Object.assign(draft, { paketMode: "paket", paketId: p.id, paketNama: p.nama, wilayahId: p.wilayahId, isiPaket: "" }); fillFromPaket(draft, p); toast(`Isi ${p.nama} masuk ke kotak — ubah yang beda`); }
    else if (v === "__custom") { Object.assign(draft, { paketMode: "custom", paketId: "", paketNama: "", isiPaket: "" }); draft.kotak.forEach(b => { delete b.dariPaket; }); toast("Custom: isi kotak tetap, silakan ubah sendiri"); }
    else { Object.assign(draft, { paketMode: "", paketId: "", paketNama: "", isiPaket: "" }); clearPaket(draft); toast("Paket & isinya dihapus dari acara ini"); }
    rerenderPart("paketBox", paketFields); updTotal();
  }
  if (t.dataset.wshow) { db.settings.waShow[t.dataset.wshow] = t.checked; save(); const w = $("#watext"); if (w) { const id = location.hash.split("/")[2]; w.innerHTML = waFmt(curWA = waCrew(db.orders.find(o => o.id === id))); } }
  if (t.dataset.absen) { const o = curOrder(); o.absen = o.absen || {}; o.absen[t.dataset.absen] = t.checked; save(); route(); }
  if (t.dataset.cek) { const o = curOrder(); o.cek = o.cek || {}; o.cek[t.dataset.cek] = o.cek[t.dataset.cek] || {}; o.cek[t.dataset.cek][t.dataset.k] = t.checked; save(); route(); }
  if (t.id === "logoFile" && t.files[0]) {
    const img = new Image(), url = URL.createObjectURL(t.files[0]);
    img.onload = () => { const s = 256, cv = document.createElement("canvas"); cv.width = cv.height = s; const k = Math.max(s / img.width, s / img.height), w = img.width * k, h = img.height * k; cv.getContext("2d").drawImage(img, (s - w) / 2, (s - h) / 2, w, h); db.settings.logo = cv.toDataURL("image/jpeg", 0.88); URL.revokeObjectURL(url); save(); applyTheme(); route(); toast("Logo diganti"); };
    img.src = url;
  }
  if (t.id === "abulan") { arsipState.bulan = t.value; arsipState.sel.clear(); route(); }
  if (t.dataset && t.dataset.asel) { t.checked ? arsipState.sel.add(t.dataset.asel) : arsipState.sel.delete(t.dataset.asel); route(); }
  if (t.id === "aall") { const vis = [...document.querySelectorAll("[data-asel]")].map(x => x.dataset.asel); vis.forEach(id => t.checked ? arsipState.sel.add(id) : arsipState.sel.delete(id)); route(); }
  if (t.id === "restore" && t.files[0]) { const f = t.files[0]; t.value = ""; restoreData(f); }
  if (t.id === "importXlsx" && t.files[0]) { const f = t.files[0]; t.value = ""; importExcel(f); }
});
// ingat bagian form mana yang sedang dibuka / dilipat
document.addEventListener("toggle", e => { if (draft && e.target.dataset && e.target.dataset.sec) { draft._open = draft._open || {}; draft._open[e.target.dataset.sec] = e.target.open; } }, true);
document.addEventListener("change", e => { const t = e.target; if (draft && t.dataset && t.dataset.lk && t.dataset.lk.endsWith(".maps")) { const l = ambilLink(t.value); if (l !== t.value) { t.value = l; draft.lokasi[+t.dataset.lk.split(".")[0]].maps = l; updTotal(); } } });
document.addEventListener("focusout", e => { const t = e.target; if (t.hasAttribute && t.hasAttribute("data-money")) { const n = num(t.value); t.value = n ? n.toLocaleString("id-ID") : ""; } });
const curOrder = () => db.orders.find(o => o.id === location.hash.split("/")[2]);
document.addEventListener("click", async e => {
  const t = e.target.closest("[data-act],[data-kpick],[data-abulanpilih],[data-filter],[data-uncrew],[data-delkotak],[data-ljenis],[data-cal],[data-day],[data-settab]"); if (!t) return;
  const d = t.dataset;
  if (draft && d.delkotak !== undefined) { const b = draft.kotak[+d.delkotak]; if (!lines(b.isi).length || await confirmBox(`Hapus kotak "${b.judul || "tanpa nama"}" beserta isinya?`)) { draft.kotak.splice(+d.delkotak, 1); rerenderPart("kotakBox", kotakFields); } return; }
  if (d.uncrew && draft) { draft.crew = draft.crew.filter(x => x !== d.uncrew); rerenderPart("timBox", timFields); updTotal(); return; }
  if (d.ljenis && draft) { const [i, k] = d.ljenis.split("."); draft.lokasi[+i].jenis = k; if (k !== "both") draft.lokasi[+i].tempatAkad = ""; rerenderPart("lokasiBox", lokasiFields); updTotal(); return; }
  if (d.kpick !== undefined && draft) { pickKotak(+d.kpick); return; }
  if (d.abulanpilih) { db.orders.filter(o => isArsip(o) && (d.abulanpilih === "zz" ? !o.tanggal : (o.tanggal || "").startsWith(d.abulanpilih))).forEach(o => arsipState.sel.add(o.id)); route(); return; }
  if (d.filter === "arsip") { location.hash = "#/arsip"; return; }
  if (d.filter) { listState.f = d.filter; route(); return; }
  if (d.settab) { setTab = d.settab; route(); return; }

  if (d.cal) { if (d.cal === "0") { const n = new Date(); calState = { y: n.getFullYear(), m: n.getMonth(), sel: todayStr() }; } else { const n = new Date(calState.y, calState.m + Number(d.cal), 1); calState.y = n.getFullYear(); calState.m = n.getMonth(); } route(); return; }
  if (d.day) { calState.sel = d.day; const dd = parseD(d.day); calState.y = dd.getFullYear(); calState.m = dd.getMonth(); route(); return; }
  const id = d.id;
  switch (d.act) {
    case "resetisi": { const p = paketById(draft.paketId); if (p) { fillFromPaket(draft, p); rerenderPart("kotakBox", kotakFields); toast("Isi paket dikembalikan"); } break; }
    case "addkotak": { draft.kotak.push({ k: "c_" + uid(), judul: "", isi: "" }); rerenderPart("kotakBox", kotakFields); $(`[data-kj="${draft.kotak.length - 1}"]`)?.focus(); break; }
    case "formcopy": copyText(waCrew(draft)); break;
    case "formshare": shareText(waCrew(draft)); break;
    case "quickcrew": timModal(); break;
    case "pickteam": pickTeam(draft.crew, draft.tanggal, draft.id, ids => { if (!draft) return; draft.crew = ids; rerenderPart("timBox", timFields); updTotal(); }); break;
    case "pickteam-detail": { const o = db.orders.find(x => x.id === id); pickTeam(o.crew || [], o.tanggal, o.id, ids => { o.crew = ids; save(); route(); }); break; }
    case "openmaps": { e.preventDefault(); e.stopPropagation(); const o = db.orders.find(x => x.id === id), l = o && lokOf(o)[+(d.li || 0)]; if (l && /^https?:\/\//i.test(isi(l.maps))) window.open(l.maps, "_blank"); break; }
    case "cekmaps": { const l = isi(draft.lokasi[+d.li].maps); if (!/^https?:\/\//i.test(l)) { toast("Belum ada link — tempel dulu link dari pelanggan"); break; } window.open(l, "_blank"); break; }
    case "pastemaps": {
      const li = +d.li, el = $(`[data-lk="${li}.maps"]`);
      try { const txt = await navigator.clipboard.readText(); const l = ambilLink(txt); if (!/^https?:/.test(l)) { toast("Yang tersalin bukan link — salin link dari chat pelanggan"); break; } draft.lokasi[li].maps = l; el.value = l; updTotal(); toast(`Link Lokasi ${li + 1} ditempel`); }
      catch { el.focus(); toast("Tekan lama kolomnya lalu pilih Tempel / Paste"); }
      break; }
    case "saveform": saveForm(); break;
    case "cancelform": { const back = draft && draft._for !== "new" ? "#/acara/" + draft._for : "#/dashboard"; draft = null; location.hash = back; break; }
    case "copy": copyText(curWA); break;
    case "share": shareText(curWA); break;
    case "sendcrew": shareText(waCrew(db.orders.find(o => o.id === id))); break;
    case "rekap": { const t = todayStr(), e2 = sebulanLagi(); const l = sortByDate(activeOrders().filter(o => o.tanggal && o.tanggal >= t && o.tanggal <= e2 && !o.selesai)); const f = { day: "numeric", month: "short", year: "numeric" }; rekapModal(waRekap(l, `Jadwal 1 bulan ke depan (${fmtD(t, f)} – ${fmtD(e2, f)})`)); break; }
    case "rekapbulan": { const k = `${calState.y}-${pad(calState.m + 1)}`; const l = sortByDate(activeOrders().filter(o => (o.tanggal || "").startsWith(k))); rekapModal(waRekap(l, "Jadwal " + parseD(k + "-01").toLocaleDateString("id-ID", { month: "long", year: "numeric" }))); break; }
    case "dup": { const o = JSON.parse(JSON.stringify(db.orders.find(x => x.id === id))); Object.assign(o, { id: uid(), dibuat: Date.now(), nama: o.nama + " (salinan)", tanggal: "", lokasiKe: "", batal: false, selesai: false, absen: {}, cek: {} }); db.orders.push(o); save(); location.hash = "#/acara/" + o.id + "/edit"; toast("Diduplikat — silakan ubah datanya"); break; }
    case "del": if (await confirmBox("Data acara ini akan dihapus permanen.")) { await snapshot(`Sebelum hapus acara ${(db.orders.find(o => o.id === id) || {}).nama || ""}`, true); db.orders = db.orders.filter(o => o.id !== id); save(); location.hash = "#/acara"; toast("Acara dihapus"); } break;
    case "batal": { const o = db.orders.find(x => x.id === id); o.batal = !o.batal; save(); route(); break; }
    case "exportcsv": case "exportxlsx": exportExcel(); break;
    case "logoreset": delete db.settings.logo; save(); applyTheme(); route(); break;
    case "backup": backupData(); route(); break;
    case "showmiss": if (draft) toast("Belum diisi: " + missing(draft).join(", ")); break;
    case "bkhide": try { localStorage.setItem("harvy_bk_hide", String(Date.now() + 3 * 864e5)); } catch {} route(); break;
    case "persist": { const ok = navigator.storage && navigator.storage.persist ? await navigator.storage.persist() : false; toast(ok ? "Izin penyimpanan permanen diberikan ✓" : isIOS ? "Di iPhone/iPad: pasang aplikasi ke Layar Utama" : "Browser belum memberi izin — pasang aplikasinya lalu coba lagi"); loadKeamanan(); break; }
    case "snaprestore": { const r = await idb.get("snap", id); if (!r) { toast("Titik pulih tidak ditemukan"); break; }
      if (await confirmBox(`Kembalikan data ke "${r.label}" (${new Date(r.at).toLocaleString("id-ID")}) — ${r.ringkasan.acara} acara, ${r.ringkasan.tim} tim? Data sekarang disimpan dulu sebagai titik pulih.`, "Pulihkan")) {
        await snapshot("Sebelum pulihkan titik pulih", true); db = migrate(JSON.parse(r.data)); db.orders.forEach(o => { toKotak(o); toLokasi(o); }); save(); applyTheme(); route(); toast("Data dipulihkan"); }
      break; }
    case "install": if (installEvt) { installEvt.prompt(); const r = await installEvt.userChoice; installEvt = null; if (r.outcome !== "accepted") toast("Pemasangan dibatalkan"); route(); } break;
    case "installhide": try { localStorage.setItem("harvy_install_hide", String(Date.now() + 14 * 864e5)); } catch {} route(); break;
    case "pdf1": { const o = db.orders.find(x => x.id === id); downloadPdf([o], `Data Acara ${o.nama} ${o.tanggal || ""}`.trim(), "Data acara"); break; }
    case "selesai": { const o = db.orders.find(x => x.id === id); o.selesai = !o.selesai; save(); route(); toast(o.selesai ? "Ditandai selesai — masuk Arsip" : "Dikembalikan ke daftar acara"); break; }
    case "apdf": { const list = db.orders.filter(o => arsipState.sel.has(o.id)); downloadPdf(list, `Arsip ${db.settings.bizName} (${list.length} acara) ${todayStr()}`, "Arsip acara"); break; }
    case "adel": { const list = db.orders.filter(o => arsipState.sel.has(o.id)); if (!list.length) break;
      if (await confirmBox(`${list.length} acara akan dihapus permanen dari perangkat ini. Titik pulih otomatis dibuat dulu (Pengaturan → Data & Backup).`, `Hapus ${list.length} acara`)) { await snapshot(`Sebelum hapus ${list.length} acara arsip`, true); const ids = new Set(list.map(o => o.id)); db.orders = db.orders.filter(o => !ids.has(o.id)); arsipState.sel.clear(); save(); route(); toast(`${list.length} acara dihapus`); }
      break; }
    case "addtim": timModal(); break;
    case "edittim": timModal(timById(id)); break;
    case "timjobs": { const p = timById(id), t = todayStr(); const j = sortByDate(activeOrders().filter(o => (o.crew || []).includes(id)));
      modal(`<h2>Jadwal ${esc(p.nama)}</h2>${j.length ? j.map(o => `<div style="${o.tanggal && o.tanggal < t ? "opacity:.5" : ""}">${evRow(o)}</div>`).join("") : `<div class="empty small">Belum ada jadwal.</div>`}<div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn" data-close>Tutup</button></div>`, (m, close) => m.addEventListener("click", ev => { if (ev.target.closest("a.ev")) close(); })); break; }
    case "addpaket": paketModal(null, id); break;
    case "editpaket": paketModal(paketById(id)); break;
    case "addaddon": addonModal(); break;
    case "editaddon": addonModal(db.addons.find(a => a.id === id)); break;
    case "addwil": promptModal("Wilayah baru", "", v => { db.wilayah.push({ id: uid(), nama: v }); save(); route(); }); break;
    case "editwil": { const w = wilById(id); promptModal("Nama wilayah", w.nama, v => { w.nama = v; save(); route(); }); break; }
    case "resetdb": if (await confirmBox("Daftar tim resmi Harvy, paket, wilayah & perlengkapan dikembalikan ke data awal (Excel). Tim/paket buatan sendiri dihapus. Acara tidak dihapus.", "Kembalikan")) {
        await snapshot("Sebelum kembalikan data awal", true);
        const tim0 = rosterList(); db.orders.forEach(o => { o.crew = (o.crew || []).map(id => { const t0 = timById(id), m = t0 && tim0.find(x => normNama(x.nama) === normNama(t0.nama)); return m ? m.id : null; }).filter(Boolean); });
        db.tim = tim0; db.wilayah = clone(SEED.wilayah); db.paket = clone(SEED.paket); db.addons = clone(SEED.addons); db.settings.rosterV3 = true; save(); route(); toast("Data awal Harvy dikembalikan"); } break;
    case "wipeacara": if (await confirmBox(`${db.orders.length} acara (termasuk arsip) akan dihapus permanen. Sudah backup?`, "Hapus semua acara")) { await snapshot("Sebelum hapus semua acara", true); db.orders = []; arsipState.sel.clear(); save(); route(); toast("Semua acara dihapus"); } break;
    case "wipe": if (await confirmBox("SEMUA acara, tim, paket, wilayah & perlengkapan akan dihapus permanen — aplikasi mulai dari kosong. Sudah backup?", "Kosongkan semua")) {
        await snapshot("Sebelum kosongkan semua data", true);
        Object.assign(db, { orders: [], tim: [], paket: [], wilayah: [], addons: [] }); db.settings.rosterV3 = true; arsipState.sel.clear(); save(); route(); toast("Semua data dikosongkan"); } break;
  }
});
function rekapModal(text) {
  modal(`<h2>Rekap jadwal</h2><div class="wa-prev"><div class="bubble" id="rk">${waFmt(text)}</div></div><div class="row" style="margin-top:12px"><button class="btn wa grow" id="rs">${ic("share")}Kirim / Bagikan</button><button class="btn grow" id="rc">${ic("copy")}Salin</button><button class="btn" data-close>Tutup</button></div>`,
    m => { $("#rs", m).onclick = () => shareText(text); $("#rc", m).onclick = () => copyText(text); });
}

/* ---------- PASANG APLIKASI (PWA) & VERSI BARU ---------- */
let installEvt = null;
const isStandalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const installHidden = () => { try { return +localStorage.getItem("harvy_install_hide") > Date.now(); } catch { return false; } };
function installCard(force) {
  if (isStandalone() || (!force && installHidden())) return "";
  const tutup = force ? "" : `<button class="btn icon ghost" data-act="installhide" title="Sembunyikan">${ic("x")}</button>`;
  if (installEvt) return `<div class="card install"><img src="icons/icon-192.png?v=${APP_VERSION}" alt=""><div class="grow"><b>Pasang aplikasi Harvy WO</b><div class="small muted">Muncul di layar utama seperti aplikasi biasa & tetap jalan tanpa internet.</div></div><button class="btn gold" data-act="install">${ic("down")}Pasang</button>${tutup}</div>`;
  if (isIOS) return `<div class="card install"><img src="icons/icon-192.png?v=${APP_VERSION}" alt=""><div class="grow"><b>Pasang di iPhone / iPad</b><div class="small muted">Buka lewat <b>Safari</b> → ketuk tombol <b>Bagikan</b> ${ic("share")} → pilih <b>Tambah ke Layar Utama</b>.</div></div>${tutup}</div>`;
  return force ? `<div class="card install"><img src="icons/icon-192.png?v=${APP_VERSION}" alt=""><div class="grow"><b>Pasang aplikasi</b><div class="small muted">Buka link aplikasi di <b>Chrome / Edge</b> lalu pilih <b>Instal aplikasi</b> / <b>Tambahkan ke layar utama</b> dari menu ⋮.</div></div></div>` : "";
}
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (/dashboard|pengaturan|^#?\/?$/.test(location.hash)) route(); });
window.addEventListener("appinstalled", () => { installEvt = null; route(); toast("Aplikasi terpasang di perangkat ini"); });
function showUpdate() {
  if ($("#updbar")) return;
  const b = document.createElement("div"); b.id = "updbar"; b.className = "updbar";
  b.innerHTML = `${ic("spark2")}<span class="grow">Versi baru aplikasi tersedia.</span><button class="btn sm gold" id="updgo">Muat ulang</button>`;
  document.body.appendChild(b); $("#updgo").onclick = () => { if (draft) { toast("Simpan form dulu, lalu muat ulang"); return; } location.reload(); };
}

/* ---------- INIT ---------- */
(async function boot() {
  // ambil data dari database perangkat (IndexedDB); pakai yang paling baru antara IndexedDB & cadangan localStorage
  if (store.idb) {
    try { const rec = await idb.get("data", "db"); if (rec) { const d = JSON.parse(rec); if ((d.savedAt || 0) >= (db.savedAt || 0)) db = migrate(d); } }
    catch (e) { console.warn("IndexedDB", e); store.idb = false; }
  }
  store.ready = true;
  db.orders.forEach(o => { toKotak(o); toLokasi(o); }); save();
  applyTheme();
  route();
  if (db._imported) { const n = db._imported; delete db._imported; save(); setTimeout(() => toast(`${n} acara & data kru dari versi lama sudah dipindahkan`), 400); }
  if (db.orders.length || db.tim.length) { try { if (!(await idb.get("snap", "d-" + todayStr()))) await snapshot(); } catch {} }
})();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").then(reg => {
    reg.addEventListener("updatefound", () => { const w = reg.installing; if (w) w.addEventListener("statechange", () => { if (w.state === "installed" && navigator.serviceWorker.controller) showUpdate(); }); });
    setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000); // cek versi baru tiap 30 menit saat online
  }).catch(() => {});
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => p || navigator.storage.persist()).catch(() => {});
