# Panduan Publikasi GitHub Pages & Instalasi PWA Offline (`v21.5`)

Aplikasi **Mahligai Wedding Organizer (`v21.5`)** telah dihubungkan ke repository GitHub Anda:
- **Repository GitHub**: `https://github.com/ronyaliantara/Admin-Wedding.git`
- **URL Aplikasi GitHub Pages**: `https://ronyaliantara.github.io/Admin-Wedding/`

---

## 1. Cara Mengaktifkan Link GitHub Pages (Satu Kali Saja)

Setelah kode berhasil di-*push* ke repository `ronyaliantara/Admin-Wedding`:
1. Buka halaman pengaturan GitHub Pages repository Anda:
   👉 **[https://github.com/ronyaliantara/Admin-Wedding/settings/pages](https://github.com/ronyaliantara/Admin-Wedding/settings/pages)**
2. Pada bagian **Build and deployment → Source**:
   - Pilih **Deploy from a branch**, lalu pada bagian **Branch** pilih **`main`** dan folder **`/ (root)`**, kemudian klik **Save** *(atau pilih **GitHub Actions** untuk menggunakan workflow otomatis `.github/workflows/deploy-pages.yml`)*.
3. Tunggu sekitar **1 menit**, lalu segarkan halaman. Aplikasi Anda akan langsung online secara permanen di:
   👉 **[https://ronyaliantara.github.io/Admin-Wedding/](https://ronyaliantara.github.io/Admin-Wedding/)**

---

## 2. Cara Update Aplikasi ke GitHub di Kemudian Hari

Jika suatu saat ada perubahan kode di folder `d:\Wedding\Wedding`, cukup jalankan perintah berikut di terminal:

```powershell
cd d:\Wedding\Wedding
git add .
git commit -m "Update aplikasi Mahligai WO"
git push origin main
```

---

## 3. Cara Pasang Aplikasi (PWA Offline) di HP & Laptop

Setelah link **`https://ronyaliantara.github.io/Admin-Wedding/`** aktif:

### A. Android (Google Chrome)
1. Buka **`https://ronyaliantara.github.io/Admin-Wedding/`** di **Google Chrome**.
2. Ketuk tombol **"📲 Pasang Aplikasi"** di pojok kanan atas aplikasi (atau menu titik tiga Chrome `⋮` → **"Pasang aplikasi"** / **"Tambahkan ke Layar Utama"**).
3. Aplikasi **Mahligai WO** akan tampil di layar utama HP seperti aplikasi native dan siap digunakan **100% offline**.

### B. iPhone / iPad (Safari)
1. Buka **`https://ronyaliantara.github.io/Admin-Wedding/`** menggunakan browser **Safari**.
2. Ketuk tombol **Bagikan / Share** (ikon kotak dengan panah ke atas `⎋`) di bagian bawah layar.
3. Pilih **"Tambah ke Layar Utama" (Add to Home Screen)** ➕, lalu ketuk **Tambah**.

---

## 4. Cara Sinkronisasi Data Acara Antara Laptop & HP (`.json`)

- **Penyimpanan Lokal Aman**: Seluruh jadwal acara pernikahan, kru, admin, dan kustomisasi paket tersimpan di memori perangkat (`localStorage`).
- **Pindahkan Data Laptop ⇄ HP**:
  1. Buka **Pengaturan Admin (⚙️) → Tab Cadangkan Acara**.
  2. Klik **Cadangkan Data Acara (`.json`)** untuk mengunduh file cadangan jadwal acara.
  3. Kirim file `.json` tersebut via WhatsApp ke perangkat lain, lalu pilih **Pulihkan Data Acara (`.json`)**.
