# LMS Application

Proyek ini adalah sebuah aplikasi Learning Management System (LMS) komprehensif yang dirancang untuk memfasilitasi kegiatan belajar mengajar dengan peran pengguna untuk Admin, Guru, dan Siswa.

## Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan arsitektur modern yang memisahkan antara frontend dan backend:

- **Frontend (Web):**
  - [Next.js](https://nextjs.org/) (React Framework)
  - TypeScript
  - Tailwind CSS

- **Backend (API):**
  - [Node.js](https://nodejs.org/) dengan [Express.js](https://expressjs.com/)
  - TypeScript
  - MongoDB dengan [Mongoose](https://mongoosejs.com/)

## Struktur Direktori

- `/src`: Berisi kode untuk Frontend Next.js (halaman untuk admin, guru, komponen UI, dll).
- `/backend`: Berisi kode untuk Backend Node.js API (controller, model Mongoose, routing, middleware).

## Cara Menjalankan Aplikasi Secara Lokal

### 1. Menjalankan Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Copy file konfigurasi environment (jika ada file contoh `.env.example`, silakan copy menjadi `.env` dan atur URI MongoDB).
4. Jalankan server backend (development mode):
   ```bash
   npm run dev
   ```

### 2. Menjalankan Frontend
1. Buka terminal baru dan masuk ke direktori utama proyek:
   ```bash
   cd lms-dafiand
   ```
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Jalankan server frontend:
   ```bash
   npm run dev
   ```
4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
