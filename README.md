# Harvy Wedding Organizer — Aplikasi Offline (PWA)

Aplikasi admin **Harvy Wedding** (Solokuro, Lamongan) untuk menyusun jadwal acara dan mengirim briefing ke grup WhatsApp kru. Bisa dipakai di HP, iPad, dan laptop, dan tetap jalan tanpa internet setelah dipasang.

- 🔗 **Link aplikasi (GitHub Pages)**: https://ronyaliantara.github.io/Admin-Wedding/
- 📦 **Repository**: https://github.com/ronyaliantara/Admin-Wedding

## Fitur
- **Dashboard di halaman awal**: acara terdekat (H-n) dengan tombol *Kirim ke grup*, jumlah acara bulan ini & 7 hari ke depan, kru yang bertugas minggu ini, daftar acara yang **perlu dilengkapi**.
- **Form acara**
  - Pengantin & keluarga.
  - **Lokasi & jadwal**: *Lokasi ke-* (nomor urut pelanggan di hari yang sama, diisi manual), Akad & resepsi / Akad / Resepsi / Acara lain, jam, tempat akad kalau beda, tempat, alamat, **link Google Maps dari pelanggan** (tombol *Tempel* & *Cek*) untuk sopir.
  - **Paket & isi acara**: pilih paket (dari Excel) → isinya otomatis masuk ke kotak-kotak: Gaun & busana, Melati, Dekor, Efek & hiburan, Dokumentasi, Rias, Bunga, Perlengkapan dibawa, Jadwal make up, Catatan. Setiap kotak punya **＋ Pilih** untuk mengisi dari database, dan bisa diketik bebas. **＋ Tambah kotak** untuk isian lain. Paket dibatalkan → isi paket ikut terhapus.
  - **Tim bertugas**: pilih dari satu daftar (cari, saring per peran, centang, simpan), ada tanda *bentrok* bila sudah bertugas di acara lain hari itu.
  - **Hasil untuk grup WA** tampil langsung di bawah form.
- **Pesan WhatsApp**: format *briefing* ber-emoji (bawaan) atau *klasik*; rekap jadwal mingguan / bulanan untuk grup & sopir (dengan link lokasi).
- **Hari H**: absen tim, checklist perlengkapan (datang & pulang).
- **Arsip**: acara yang sudah lewat / ditandai selesai / batal otomatis masuk Arsip — pilih (satu, per bulan, semua) lalu **download PDF** atau **hapus**. Tiap acara juga bisa di-download PDF dari halaman detailnya.
- **Kalender** dan **jadwal tiap anggota tim**.
- **Pengaturan**: profil usaha & logo, paket per wilayah, perlengkapan/sewa, tim (MUA, Crew Rias, Asisten, Admin, MC, Foto, Video, Dry Smoke, Cucuk Lampah, Electone, …), pilihan cepat (gaun, hijab, melati, catatan, jadwal make up), teks penutup pesan, mode terang/gelap, backup & pulihkan (gabungkan / ganti semua), export & import Excel (.xlsx) — termasuk import file Database Excel asli.

## Struktur file
| File | Isi |
|---|---|
| `index.html` | Kerangka halaman |
| `css/style.css` | Tampilan (tema hitam-emas sesuai logo) |
| `js/data.js` | Database awal paket & perlengkapan dari `Database_Harvy_Wedding.xlsx` |
| `js/app.js` | Logika aplikasi |
| `js/excel.js` | Membuat & membaca file Excel (.xlsx) tanpa internet |
| `js/pdf.js` | Membuat file PDF tanpa internet |
| `sw.js`, `manifest.json`, `icons/` | Mode offline & ikon aplikasi |

Data tersimpan di perangkat masing-masing (`localStorage`). Untuk pindah perangkat pakai **Pengaturan → Data & Backup**. Data dari versi lama (Mahligai WO) di perangkat yang sama dipindahkan otomatis saat pertama kali dibuka.

**Saat mengubah file**: naikkan nomor versi `?v=` di `index.html` dan `CACHE_NAME` di `sw.js` supaya HP mengambil versi terbaru.

Panduan memasang di HP: [PANDUAN_ONLINE_HP.md](./PANDUAN_ONLINE_HP.md).
