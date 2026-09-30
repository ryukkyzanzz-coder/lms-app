# LMS Application — Modular Architecture

Proyek ini adalah platform Learning Management System (LMS) multi-peran (Admin, Guru, Siswa, Kepala Sekolah, dan Kurikulum) yang dibangun dengan pemisahan fisik antara Frontend dan Backend.

## Struktur Project

```text
LMS
├── frontend/             # Next.js Application (Port 3000)
├── backend/              # Express.js Application (Port 5000 / API)
├── scratch/              # Stitch design & mockup references
├── AGENTS.md             # Development guidelines
├── CLAUDE.md
├── projects.txt
└── README.md
```

## Teknologi yang Digunakan

- **Frontend (`frontend/`):**
  - Next.js (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Lucide React

- **Backend (`backend/`):**
  - Node.js & Express.js
  - TypeScript
  - MongoDB & Mongoose
  - JSON Web Tokens (JWT) & bcrypt
  - Jest & Supertest

---

## Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js (v18+)
- MongoDB Atlas cluster atau MongoDB lokal

---

### Opsi A: Menggunakan Root Convenience Scripts (Disarankan)

1. Jalankan development server Backend:
   ```bash
   npm run dev:backend
   ```
2. Di terminal terpisah, jalankan development server Frontend:
   ```bash
   npm run dev:frontend
   ```

Tersedia juga skrip orkestrasi lainnya dari root:
- `npm run test:backend` : Menjalankan test suite backend
- `npm run typecheck:frontend` : Memvalidasi tipe TypeScript frontend
- `npm run typecheck:backend` : Memvalidasi tipe TypeScript backend
- `npm run build:frontend` : Membangun bundle produksi Next.js
- `npm run build:backend` : Mengompilasi TypeScript Express ke `backend/dist`

---

### Opsi B: Menjalankan Per Direktori

#### 1. Menjalankan Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Konfigurasi environment:
   Salin `.env.example` menjadi `.env` dan lengkapi konfigurasi database Anda.
4. (Opsional) Injeksi data awal / seed database:
   ```bash
   npm run seed
   ```
5. Jalankan server backend (development mode):
   ```bash
   npm run dev
   ```
   Backend aktif di: `http://localhost:5000`  
   API Base URL: `http://localhost:5000/api/v1`  
   Health check: `http://localhost:5000/api/health`

#### 2. Menjalankan Frontend
1. Buka terminal baru dan masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Instal dependencies:
   ```bash
   npm install
   ```
3. Konfigurasi environment:
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Pastikan variabel `NEXT_PUBLIC_API_URL` mengarah ke backend API:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```
4. Jalankan server frontend (development mode):
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## Endpoint API & Port

| Komponen | Host & Port | Keterangan |
|---|---|---|
| Frontend Web | `http://localhost:3000` | Antarmuka pengguna LMS |
| Backend Server | `http://localhost:5000` | Express REST API server |
| Backend API | `http://localhost:5000/api/v1` | Endpoint API v1 (Auth, Teachers, Classes, Subjects) |
| Health Check | `http://localhost:5000/api/health` | Status monitoring server |
