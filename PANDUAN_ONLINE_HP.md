# Panduan Online & Pasang di HP — Harvy Wedding Organizer

Link aplikasi: **https://ronyaliantara.github.io/Admin-Wedding/**

## 1. Update aplikasi ke GitHub
Setiap ada perubahan di folder `D:\Wedding\Wedding`, jalankan di terminal:

```powershell
cd D:\Wedding\Wedding
git add .
git commit -m "Update aplikasi Harvy WO"
git push origin main
```

GitHub Pages akan memperbarui link dalam ±1 menit. Jika mengubah file, naikkan juga nomor versi di `sw.js` (`harvy-wo-v22` → `v23`) dan di `index.html` (`?v=22`) supaya HP mengambil versi baru.

## 2. Pasang sebagai aplikasi (sekali saja per perangkat)
Buka **https://ronyaliantara.github.io/Admin-Wedding/** saat ada internet, lalu:
- **Android (Chrome)**: ketuk tombol **Pasang** di kartu atas Dashboard (atau menu ⋮ → **Instal aplikasi**).
- **iPhone / iPad (Safari)**: tombol **Bagikan** → **Tambah ke Layar Utama**.
- **Laptop (Chrome / Edge)**: tombol **Pasang** di Dashboard, atau ikon **Instal** di kolom alamat.

Setelah terpasang, ikon **Harvy WO** ada di layar utama / menu Start, terbuka seperti aplikasi biasa (tanpa kolom alamat), dan **tetap jalan tanpa internet**. Tekan lama ikonnya untuk pintasan *Acara baru*, *Daftar acara*, *Arsip*.

Saat ada pembaruan, aplikasi menampilkan **"Versi baru tersedia → Muat ulang"**. Data tidak hilang karena tersimpan di perangkat. Versi aplikasi terlihat di **Pengaturan → Usaha**.
## 3. Kirim ke grup WhatsApp
Buka acara → bagian **Pesan untuk grup WA**:
- Di HP: **Kirim / Bagikan** → pilih WhatsApp → pilih grup.
- Di laptop: **Salin teks** → tempel di WhatsApp Web / Desktop.

## 4. Backup & pindah data antar perangkat
Data tersimpan di masing-masing perangkat. Untuk berjaga-jaga atau memindahkan:
1. **Pengaturan → Data & Backup → Download backup** (file `Backup Harvy Wedding <tanggal jam>.json`).
2. Kirim file itu ke perangkat lain (misalnya lewat WhatsApp).
3. Di perangkat tujuan: **Pulihkan dari backup** → pilih **Gabungkan** (tambah yang belum ada) atau **Ganti semua** (pindah HP / laptop).

## 5. Excel
- **Export ke Excel (.xlsx)**: sheet *Info, Acara, Tim, Paket, Perlengkapan* — rapi, bisa difilter, siap dicetak.
- Data bisa diedit di Excel / Google Sheets lalu **Import dari Excel** lagi. Jangan ubah judul kolom & kolom *ID*; baris baru cukup dikosongkan ID-nya. Di kolom isi (Gaun, Dekor, Tim, …) satu item per baris (Alt+Enter di Excel).
- File **Database_Harvy_Wedding.xlsx** asli juga bisa di-import untuk memperbarui paket & perlengkapan.