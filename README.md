# 🇮🇩 Laris Manis - UMKM Marketplace

**"Platform digital yang menghubungkan Anda dengan produk berkualitas dari UMKM lokal Indonesia. Belanja mudah, dukung ekonomi lokal, tingkatkan kesejahteraan bersama!"**

Laris Manis adalah sebuah proyek marketplace React/TypeScript yang dirancang untuk mendukung Usaha Mikro, Kecil, dan Menengah (UMKM). Proyek ini berfokus pada pengalaman pengguna yang cepat, desain modern berbasis Tailwind CSS, dan fitur-fitur penting seperti peta interaktif toko dan manajemen produk bagi penjual.

## 🚀 Fitur Utama

Aplikasi ini menggunakan sistem *Role-Based Authentication* (Pembeli & Penjual) dan didukung oleh fitur-fitur modern:

| Role | Fitur | Deskripsi | Sumber Informasi |
| :--- | :--- | :--- | :--- |
| **Pembeli** | **Peta Interaktif Toko** | Navigasi dan temukan toko UMKM terdekat menggunakan Leaflet dan OpenStreetMap. Tanpa perlu API Key berbayar! | |
| **Pembeli** | **AI Chatbot (Gemini)** | Mendapatkan rekomendasi produk, mencari berdasarkan harga/kalori, atau mencari produk promo melalui asisten AI. | |
| **Pembeli** | **Jelajah Produk & Toko** | Filter produk berdasarkan kategori dan pencarian. Lacak pesanan (COD - Ambil di Toko) dan daftar produk favorit. | |
| **Penjual** | **Dashboard Penjual** | Mengelola informasi toko dan produk secara mandiri. | |
| **Penjual** | **Manajemen Produk (CRUD)** | Tambah, Edit, dan Hapus produk. Fitur diskon otomatis dan manajemen stok. | |
| **Sistem** | **Role-Based Auth** | Memisahkan jalur akses antara Pembeli (`/home`) dan Penjual (`/dashboard-seller`) dengan perlindungan rute. | |
| **Sistem** | **UI/UX Modern** | Menggunakan tema futuristik dan *glassmorphism* yang dibangun di atas Tailwind CSS. | |

## ⚙️ Teknologi & Dependencies

Proyek ini dibangun menggunakan stack modern:

| Kategori | Teknologi | Catatan |
| :--- | :--- | :--- |
| **Frontend** | `React` & `TypeScript` | Dikembangkan dengan `Vite` |
| **Styling** | `Tailwind CSS` & `PostCSS` | Menggunakan konfigurasi kustom untuk tema futuristik. |
| **Mapping** | `Leaflet` & `react-leaflet` | Migrasi dari Google Maps untuk fitur peta yang **gratis** dan *open-source*. |
| **State/Context** | `useAuth`, `useCart` (React Context) | Digunakan untuk manajemen sesi pengguna dan keranjang/favorit/order (lokal). |
| **API/Backend** | `Node.js` + `Express` (Hanya untuk Chatbot) | Endpoint `/api/chat` menggunakan Google GenAI SDK untuk fungsi chatbot. |
| **Database (Mock)** | `localStorage` | Data dummy dan perubahan dari Penjual disimpan sementara di Local Storage untuk persistence lokal. |

## 🖥️ Instalasi & Setup

Pastikan Anda memiliki Node.js (disarankan versi 18+) dan npm/yarn terinstal.

1.  **Clone Repository:**
    ```bash
    git clone [repository_url]
    cd larismanismia
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Jalankan Aplikasi:**
    Untuk menjalankan frontend (Vite) dan server backend (Express Chatbot API) secara bersamaan, gunakan *script* `dev:full`:
    ```bash
    npm run dev:full
    ```
    Aplikasi akan berjalan di `http://localhost:5173/`.

## 🔑 Akun Login Cepat untuk Testing

Semua akun dummy sudah otomatis diinisialisasi ke `localStorage` saat aplikasi dimuat.

| Role | Email | Password | Redirect Setelah Login |
| :--- | :--- | :--- | :--- |
| **Pembeli** | `buyer@gmail.com` | `password123` | `/home` |
| **Penjual** | `faridgamever@gmail.com` (Toko Jumbo Juice SWK) | `password123` | `/dashboard-seller` |

## 🏗️ Catatan Arsitektur (Backend)

Saat ini, data (produk, toko, user) disimpan secara lokal di `localStorage`. Untuk implementasi *production* dengan data yang persisten, disarankan migrasi ke arsitektur backend yang sesungguhnya.

Lihat `BACKEND_GUIDE.md` untuk panduan detail mengenai implementasi:
* Database Schema (Users, Stores, Products, Reviews)
* Rekomendasi Stack (Node.js + Express + MySQL)
* Daftar API Endpoints yang Perlu Dibuat (Auth, CRUD, Reviews)
