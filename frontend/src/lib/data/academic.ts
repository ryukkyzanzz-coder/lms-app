// Shared Domain Data & Types for LMS Akademik (SMK CITRA NEGARA)
// Serves as the Technical & Shared Data Source of Truth across all roles (Admin, Guru, Siswa, Kurikulum, Kepsek).

export interface TahunAjaranInfo {
  id: string;
  tahun: string;
  semester: 'Ganjil' | 'Genap';
  kurikulumDefault: string;
  status: 'Aktif' | 'Selesai';
  tanggalMulai: string;
  tanggalSelesai: string;
}

export interface Kelas {
  id: string;
  kode: string;
  nama: string;
  tingkat: 'X' | 'XI' | 'XII';
  fase: 'Fase E' | 'Fase F';
  jurusan: 'Rekayasa Perangkat Lunak' | 'Teknik Komputer & Jaringan' | 'Desain Komunikasi Visual';
  jurusanSingkat: 'RPL' | 'TJKT' | 'DKV';
  waliKelas: string;
  waliKelasNip: string;
  kapasitas: number;
  terisi: number;
  ruangFisik: string;
  status: 'Aktif (Siap KBM)' | 'Aktif (Penuh)' | 'Persiapan';
}

export interface Siswa {
  id: string;
  nisn: string;
  nis: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tingkat: 'X' | 'XI' | 'XII';
  jurusanSingkat: 'RPL' | 'TJKT' | 'DKV';
  kelasId: string;
  kelasNama: string;
  status: 'Aktif' | 'Mutasi Masuk' | 'Alumni' | 'Non-Aktif';
  statusDapodik: 'Terverifikasi' | 'Sinkron';
}

export interface Guru {
  id: string;
  nip: string;
  nama: string;
  gelar: string;
  inisial: string;
  bidang: 'Kejuruan RPL' | 'Kejuruan TJKT' | 'Kejuruan DKV' | 'Umum' | 'BK';
  mapelUtama: string;
  rombelDiampu: string[];
  totalJp: number;
  status: 'Aktif (Mengajar)' | 'Cuti' | 'Tugas Luar';
  statusSertifikasi: boolean;
  statusSk: 'SK Tervalidasi' | 'Menunggu SK';
}

export interface MataPelajaran {
  id: string;
  kode: string;
  nama: string;
  tingkat: 'X' | 'XI' | 'XII';
  fase: 'Fase E' | 'Fase F';
  jurusanSingkat: 'RPL' | 'TJKT' | 'DKV' | 'UMUM';
  guruPengampuNama: string;
  guruPengampuNip: string;
  rombelTarget: string[];
  jpPerMinggu: number;
  statusSk: 'Tervalidasi' | 'Draft';
  kategori: 'Kejuruan' | 'Muatan Nasional' | 'Muatan Kewilayahan';
}

export interface PengampuRelation {
  id: string;
  guruId: string;
  guruNama: string;
  guruNip: string;
  mapelId: string;
  mapelNama: string;
  mapelKode: string;
  rombelTarget: string[];
  alokasiJp: number;
  statusSk: 'Tervalidasi' | 'Revisi';
  noSk: string;
}

export interface BabStruktur {
  nomor: number;
  judul: string;
  totalTopik: number;
  topikList: string[];
}

export interface StrukturKurikulumMapel {
  mapelId: string;
  mapelNama: string;
  mapelKode: string;
  tingkat: 'X' | 'XI' | 'XII';
  fase: 'Fase E' | 'Fase F';
  jurusanSingkat: 'RPL' | 'TJKT' | 'DKV';
  totalBab: number;
  totalTopik: number;
  totalCp: number;
  babList: BabStruktur[];
  cpList: string[];
}

export interface AktivitasOperasional {
  id: string;
  judul: string;
  waktu: string;
  jam: string;
  pelaksana: string;
  deskripsi: string;
  kategori: 'Siswa' | 'Guru' | 'Mapel' | 'Fasilitas' | 'Dapodik';
  noReferensi?: string;
}

export interface StatusKesiapanData {
  kategori: string;
  total: number;
  valid: number;
  satuan: string;
  deskripsi: string;
  status: 'Lengkap' | 'Terhubung' | 'Perlu Perhatian';
  persen: number;
}

// ==========================================
// MASTER ACTIVE DATA
// ==========================================

export const TAHUN_AJARAN_AKTIF: TahunAjaranInfo = {
  id: 'ta-2026-ganjil',
  tahun: '2026/2027',
  semester: 'Ganjil',
  kurikulumDefault: 'Kurikulum Merdeka',
  status: 'Aktif',
  tanggalMulai: '14 Juli 2026',
  tanggalSelesai: '18 Desember 2026',
};

export const MASTER_KELAS: Kelas[] = [
  {
    id: 'k-xii-rpl-1',
    kode: 'RPL-XII-1',
    nama: 'XII RPL 1',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Budi Pratama, S.Kom.',
    waliKelasNip: '19850412 201001 1 014',
    kapasitas: 36,
    terisi: 34,
    ruangFisik: 'Lab Software 1 (Gd. B Lt. 2)',
    status: 'Aktif (Siap KBM)',
  },
  {
    id: 'k-xii-rpl-2',
    kode: 'RPL-XII-2',
    nama: 'XII RPL 2',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Siti Rahma, S.Kom.',
    waliKelasNip: '19890723 201403 2 005',
    kapasitas: 36,
    terisi: 34,
    ruangFisik: 'Lab Software 2 (Gd. B Lt. 2)',
    status: 'Aktif (Siap KBM)',
  },
  {
    id: 'k-xi-rpl-1',
    kode: 'RPL-XI-1',
    nama: 'XI RPL 1',
    tingkat: 'XI',
    fase: 'Fase F',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Drs. Hendra Setiawan',
    waliKelasNip: '19850412 201001 1 018',
    kapasitas: 36,
    terisi: 36,
    ruangFisik: 'R. Teori 301 (Gd. A Lt. 3)',
    status: 'Aktif (Penuh)',
  },
  {
    id: 'k-xi-rpl-2',
    kode: 'RPL-XI-2',
    nama: 'XI RPL 2',
    tingkat: 'XI',
    fase: 'Fase F',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Budi Pratama, S.Kom.',
    waliKelasNip: '19850412 201001 1 014',
    kapasitas: 36,
    terisi: 35,
    ruangFisik: 'R. Teori 302 (Gd. A Lt. 3)',
    status: 'Aktif (Siap KBM)',
  },
  {
    id: 'k-x-pplg-1',
    kode: 'PPLG-X-1',
    nama: 'X PPLG 1',
    tingkat: 'X',
    fase: 'Fase E',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Nurul Hidayati, M.T.',
    waliKelasNip: '19920311 201801 2 003',
    kapasitas: 36,
    terisi: 36,
    ruangFisik: 'R. Teori 105 (Gd. C Lt. 1)',
    status: 'Aktif (Penuh)',
  },
  {
    id: 'k-x-pplg-2',
    kode: 'PPLG-X-2',
    nama: 'X PPLG 2',
    tingkat: 'X',
    fase: 'Fase E',
    jurusan: 'Rekayasa Perangkat Lunak',
    jurusanSingkat: 'RPL',
    waliKelas: 'Eko Prasetyo, S.Kom.',
    waliKelasNip: '19910515 201502 1 004',
    kapasitas: 36,
    terisi: 35,
    ruangFisik: 'R. Teori 106 (Gd. C Lt. 1)',
    status: 'Aktif (Siap KBM)',
  },
  {
    id: 'k-xii-tjkt-1',
    kode: 'TJKT-XII-1',
    nama: 'XII TJKT 1',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusan: 'Teknik Komputer & Jaringan',
    jurusanSingkat: 'TJKT',
    waliKelas: 'Andi Saputra, S.Kom.',
    waliKelasNip: '19871109 201202 1 006',
    kapasitas: 36,
    terisi: 36,
    ruangFisik: 'Lab Cisco & Jaringan (Gd. D Lt. 1)',
    status: 'Aktif (Penuh)',
  },
  {
    id: 'k-xii-tjkt-2',
    kode: 'TJKT-XII-2',
    nama: 'XII TJKT 2',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusan: 'Teknik Komputer & Jaringan',
    jurusanSingkat: 'TJKT',
    waliKelas: 'Farhan Maulana, S.T.',
    waliKelasNip: '19890218 201501 1 007',
    kapasitas: 36,
    terisi: 35,
    ruangFisik: 'Lab Mikrotik & Cloud (Gd. D Lt. 2)',
    status: 'Aktif (Siap KBM)',
  },
  {
    id: 'k-xii-dkv-1',
    kode: 'DKV-XII-1',
    nama: 'XII DKV 1',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusan: 'Desain Komunikasi Visual',
    jurusanSingkat: 'DKV',
    waliKelas: 'Rahmat Hidayat, S.Sn.',
    waliKelasNip: '19840615 200902 1 008',
    kapasitas: 36,
    terisi: 36,
    ruangFisik: 'Studio Animasi & Render (Gd. E Lt. 1)',
    status: 'Aktif (Penuh)',
  },
];

export const MASTER_GURU: Guru[] = [
  {
    id: 'g-budi-pratama',
    nip: '19850412 201001 1 014',
    nama: 'Budi Pratama, S.Kom.',
    gelar: 'S.Kom., M.Kom.',
    inisial: 'BP',
    bidang: 'Kejuruan RPL',
    mapelUtama: 'Pemrograman Web dan Perangkat Bergerak',
    rombelDiampu: ['XII RPL 1', 'XII RPL 2', 'XI RPL 2'],
    totalJp: 16,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
  {
    id: 'g-siti-rahma',
    nip: '19890723 201403 2 005',
    nama: 'Siti Rahma, S.Kom.',
    gelar: 'S.Kom.',
    inisial: 'SR',
    bidang: 'Kejuruan RPL',
    mapelUtama: 'Basis Data dan SQL Terdistribusi',
    rombelDiampu: ['XII RPL 1', 'XII RPL 2'],
    totalJp: 12,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
  {
    id: 'g-hendra-setiawan',
    nip: '19850412 201001 1 018',
    nama: 'Drs. Hendra Setiawan',
    gelar: 'Drs., M.Kom.',
    inisial: 'HS',
    bidang: 'Kejuruan RPL',
    mapelUtama: 'Pemrograman Berorientasi Objek (PBO)',
    rombelDiampu: ['XI RPL 1', 'XI RPL 2'],
    totalJp: 14,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
  {
    id: 'g-andi-saputra',
    nip: '19871109 201202 1 006',
    nama: 'Andi Saputra, S.Kom.',
    gelar: 'S.Kom.',
    inisial: 'AS',
    bidang: 'Kejuruan TJKT',
    mapelUtama: 'Administrasi Infrastruktur Jaringan',
    rombelDiampu: ['XII TJKT 1', 'XII TJKT 2'],
    totalJp: 16,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
  {
    id: 'g-rahmat-hidayat',
    nip: '19840615 200902 1 008',
    nama: 'Rahmat Hidayat, S.Sn.',
    gelar: 'S.Sn.',
    inisial: 'RH',
    bidang: 'Kejuruan DKV',
    mapelUtama: 'Desain Grafis Percetakan & UI/UX',
    rombelDiampu: ['XII DKV 1', 'XII DKV 2'],
    totalJp: 12,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
  {
    id: 'g-nurul-hidayati',
    nip: '19920311 201801 2 003',
    nama: 'Nurul Hidayati, M.T.',
    gelar: 'M.T.',
    inisial: 'NH',
    bidang: 'Kejuruan RPL',
    mapelUtama: 'Dasar-Dasar Pengembangan Perangkat Lunak',
    rombelDiampu: ['X PPLG 1', 'X PPLG 2'],
    totalJp: 14,
    status: 'Aktif (Mengajar)',
    statusSertifikasi: true,
    statusSk: 'SK Tervalidasi',
  },
];

export const MASTER_MATA_PELAJARAN: MataPelajaran[] = [
  {
    id: 'mp-rpl-pwpb-12',
    kode: 'RPL-PWPB-12',
    nama: 'Pemrograman Web dan Perangkat Bergerak',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    guruPengampuNama: 'Budi Pratama, S.Kom.',
    guruPengampuNip: '19850412 201001 1 014',
    rombelTarget: ['XII RPL 1', 'XII RPL 2'],
    jpPerMinggu: 8,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
  {
    id: 'mp-rpl-bd-12',
    kode: 'RPL-BD-12',
    nama: 'Basis Data dan SQL Terdistribusi',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    guruPengampuNama: 'Siti Rahma, S.Kom.',
    guruPengampuNip: '19890723 201403 2 005',
    rombelTarget: ['XII RPL 1', 'XII RPL 2'],
    jpPerMinggu: 6,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
  {
    id: 'mp-rpl-pbo-11',
    kode: 'RPL-PBO-11',
    nama: 'Pemrograman Berorientasi Objek (PBO)',
    tingkat: 'XI',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    guruPengampuNama: 'Drs. Hendra Setiawan',
    guruPengampuNip: '19850412 201001 1 018',
    rombelTarget: ['XI RPL 1', 'XI RPL 2'],
    jpPerMinggu: 6,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
  {
    id: 'mp-tjkt-aij-12',
    kode: 'TJKT-AIJ-12',
    nama: 'Administrasi Infrastruktur Jaringan',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'TJKT',
    guruPengampuNama: 'Andi Saputra, S.Kom.',
    guruPengampuNip: '19871109 201202 1 006',
    rombelTarget: ['XII TJKT 1', 'XII TJKT 2'],
    jpPerMinggu: 8,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
  {
    id: 'mp-dkv-dg-12',
    kode: 'DKV-DG-12',
    nama: 'Desain Grafis Percetakan & UI/UX',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'DKV',
    guruPengampuNama: 'Rahmat Hidayat, S.Sn.',
    guruPengampuNip: '19840615 200902 1 008',
    rombelTarget: ['XII DKV 1'],
    jpPerMinggu: 6,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
  {
    id: 'mp-pplg-dasar-10',
    kode: 'PPLG-DAS-10',
    nama: 'Dasar-Dasar Pengembangan Perangkat Lunak',
    tingkat: 'X',
    fase: 'Fase E',
    jurusanSingkat: 'RPL',
    guruPengampuNama: 'Nurul Hidayati, M.T.',
    guruPengampuNip: '19920311 201801 2 003',
    rombelTarget: ['X PPLG 1', 'X PPLG 2'],
    jpPerMinggu: 7,
    statusSk: 'Tervalidasi',
    kategori: 'Kejuruan',
  },
];

export const MASTER_SISWA_SAMPEL: Siswa[] = [
  {
    id: 's-0061234567',
    nisn: '0061234567',
    nis: '22231001',
    nama: 'Dafiand',
    jenisKelamin: 'L',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-1',
    kelasNama: 'XII RPL 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234568',
    nisn: '0061234568',
    nis: '22231002',
    nama: 'Dimas Prasetyo',
    jenisKelamin: 'L',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-1',
    kelasNama: 'XII RPL 1',
    status: 'Mutasi Masuk',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234569',
    nisn: '0061234569',
    nis: '22231003',
    nama: 'Aditia Nugraha',
    jenisKelamin: 'L',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-1',
    kelasNama: 'XII RPL 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234570',
    nisn: '0061234570',
    nis: '22231004',
    nama: 'Alisha Zahra',
    jenisKelamin: 'P',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-1',
    kelasNama: 'XII RPL 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234571',
    nisn: '0061234571',
    nis: '22231005',
    nama: 'Bima Satria',
    jenisKelamin: 'L',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-2',
    kelasNama: 'XII RPL 2',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234572',
    nisn: '0061234572',
    nis: '22231006',
    nama: 'Citra Kirana',
    jenisKelamin: 'P',
    tingkat: 'XII',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xii-rpl-2',
    kelasNama: 'XII RPL 2',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234573',
    nisn: '0061234573',
    nis: '23241010',
    nama: 'Dian Permata',
    jenisKelamin: 'P',
    tingkat: 'XI',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xi-rpl-1',
    kelasNama: 'XI RPL 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234574',
    nisn: '0061234574',
    nis: '23241011',
    nama: 'Erlangga Putra',
    jenisKelamin: 'L',
    tingkat: 'XI',
    jurusanSingkat: 'RPL',
    kelasId: 'k-xi-rpl-1',
    kelasNama: 'XI RPL 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234575',
    nisn: '0061234575',
    nis: '24251020',
    nama: 'Fahri Ramadhan',
    jenisKelamin: 'L',
    tingkat: 'X',
    jurusanSingkat: 'RPL',
    kelasId: 'k-x-pplg-1',
    kelasNama: 'X PPLG 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
  {
    id: 's-0061234576',
    nisn: '0061234576',
    nis: '22232001',
    nama: 'Gilang Pratama',
    jenisKelamin: 'L',
    tingkat: 'XII',
    jurusanSingkat: 'TJKT',
    kelasId: 'k-xii-tjkt-1',
    kelasNama: 'XII TJKT 1',
    status: 'Aktif',
    statusDapodik: 'Terverifikasi',
  },
];

export const STRUKTUR_KURIKULUM_RELASI: StrukturKurikulumMapel[] = [
  {
    mapelId: 'mp-rpl-pwpb-12',
    mapelNama: 'Pemrograman Web dan Perangkat Bergerak',
    mapelKode: 'RPL-PWPB-12',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    totalBab: 12,
    totalTopik: 48,
    totalCp: 6,
    babList: [
      {
        nomor: 1,
        judul: 'Arsitektur Frontend Modern & Next.js React App Router',
        totalTopik: 4,
        topikList: ['Server Components & Client Components', 'Routing & Layouting Hierarchy', 'Data Fetching & Cache Revalidation', 'State Management'],
      },
      {
        nomor: 2,
        judul: 'Backend REST API & Autentikasi JWT Middleware',
        totalTopik: 4,
        topikList: ['Desain Endpoint RESTful API', 'JSON Web Token (JWT) Strategy', 'Middleware Interceptor', 'CORS & Security Best Practices'],
      },
      {
        nomor: 3,
        judul: 'Integrasi Basis Data & ORM / Driver Terdistribusi',
        totalTopik: 4,
        topikList: ['Data Modeling & Relasi Skema', 'CRUD Query Operations', 'Indexing & Optimasi Performa', 'Data Integrity & Migration'],
      },
    ],
    cpList: [
      'CP 01: Menerapkan konsep arsitektur aplikasi berbasis web modern dan scalable.',
      'CP 02: Membangun antarmuka interaktif yang memenuhi standar aksesibilitas dan responsif.',
      'CP 03: Mengimplementasikan sistem autentikasi aman berbasis JWT dan RBAC.',
      'CP 04: Mengintegrasikan frontend dengan backend serverless/RESTful API.',
      'CP 05: Mengoptimalkan performa pemuatan data dan caching.',
      'CP 06: Menerapkan continuous testing dan deployment aplikasi web.',
    ],
  },
  {
    mapelId: 'mp-rpl-bd-12',
    mapelNama: 'Basis Data dan SQL Terdistribusi',
    mapelKode: 'RPL-BD-12',
    tingkat: 'XII',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    totalBab: 10,
    totalTopik: 36,
    totalCp: 5,
    babList: [
      {
        nomor: 1,
        judul: 'Normalisasi & Perancangan Skema Relasional Komprehensif',
        totalTopik: 4,
        topikList: ['1NF, 2NF, 3NF Rule', 'Foreign Key & Cascading', 'ERD Construction', 'Physical Schema DDL'],
      },
      {
        nomor: 2,
        judul: 'Query Kompleks: DML, Join, View & Subquery',
        totalTopik: 4,
        topikList: ['Inner, Left, Right Outer Join', 'Aggregate Functions & Grouping', 'Materialized View', 'Window Functions'],
      },
    ],
    cpList: [
      'CP 01: Merancang Entity Relationship Diagram (ERD) dan skema relasional ternormalisasi.',
      'CP 02: Menulis kueri SQL lanjutan untuk pengolahan dataset besar.',
      'CP 03: Mengelola transaksi ACID (Atomicity, Consistency, Isolation, Durability).',
      'CP 04: Mengonfigurasi replikasi dan backup berkala database sekolah.',
      'CP 05: Menjaga integritas data referensial antar entitas akademik.',
    ],
  },
  {
    mapelId: 'mp-rpl-pbo-11',
    mapelNama: 'Pemrograman Berorientasi Objek (PBO)',
    mapelKode: 'RPL-PBO-11',
    tingkat: 'XI',
    fase: 'Fase F',
    jurusanSingkat: 'RPL',
    totalBab: 11,
    totalTopik: 42,
    totalCp: 6,
    babList: [
      {
        nomor: 1,
        judul: 'Fondasi Paradigma Berorientasi Objek: Class & Object',
        totalTopik: 4,
        topikList: ['Encapsulation & Access Modifiers', 'Constructor & Overloading', 'Static Attributes & Methods', 'Memory Allocation'],
      },
      {
        nomor: 2,
        judul: 'Hierarki Penurunan: Inheritance & Polymorphism',
        totalTopik: 4,
        topikList: ['Superclass & Subclass Extends', 'Method Overriding & Dynamic Binding', 'Abstract Classes', 'Interface Contracts'],
      },
    ],
    cpList: [
      'CP 01: Menganalisis masalah nyata ke dalam model objek perangkat lunak.',
      'CP 02: Mengimplementasikan enkapsulasi dan pewarisan kode secara modular.',
      'CP 03: Memanfaatkan interface untuk mencapai loose coupling arsitektur.',
      'CP 04: Menangani runtime error dengan Exception Handling terstruktur.',
      'CP 05: Menerapkan Design Patterns umum (Factory, Singleton, Repository).',
      'CP 06: Membangun aplikasi console/GUI berbasis OOP yang kokoh.',
    ],
  },
];

export const STATUS_KESIAPAN_AKADEMIK: StatusKesiapanData[] = [
  {
    kategori: 'Data Master Kelas (Rombel)',
    total: 24,
    valid: 24,
    satuan: 'Rombel',
    deskripsi: 'Semua rombel memiliki Wali Kelas resmi dan alokasi ruang belajar fisik.',
    status: 'Lengkap',
    persen: 100,
  },
  {
    kategori: 'Data Induk Siswa (Peserta Didik)',
    total: 864,
    valid: 864,
    satuan: 'Siswa',
    deskripsi: '100% NISN tervalidasi aktif dan terpetakan pada masing-masing rombel.',
    status: 'Lengkap',
    persen: 100,
  },
  {
    kategori: 'Data Tenaga Pendidik (Guru)',
    total: 48,
    valid: 48,
    satuan: 'Guru',
    deskripsi: '48 GTK memiliki NIP/NUPTK aktif dan SK Pembagian Beban Mengajar.',
    status: 'Lengkap',
    persen: 100,
  },
  {
    kategori: 'Penugasan Pengampu Mapel',
    total: 38,
    valid: 38,
    satuan: 'Mapel',
    deskripsi: 'Seluruh 38 mata pelajaran kurikulum telah dialokasikan pengampunya.',
    status: 'Lengkap',
    persen: 100,
  },
  {
    kategori: 'Sinkronisasi Struktur Kurikulum',
    total: 100,
    valid: 100,
    satuan: '% Sinkron',
    deskripsi: 'Kurikulum Merdeka 2026/2027 tersinkron dari Tim Kurikulum tanpa disparitas.',
    status: 'Terhubung',
    persen: 100,
  },
];

export const AKTIVITAS_OPERASIONAL_TERKINI: AktivitasOperasional[] = [
  {
    id: 'akt-001',
    judul: 'Pendaftaran Siswa Mutasi Masuk',
    waktu: 'Hari ini',
    jam: '09:32 WIB',
    pelaksana: 'Admin TU (Bambang Sudarmono)',
    deskripsi: 'Menambahkan siswa mutasi an. Dimas Prasetyo ke rombel XII RPL 1 berdasarkan disposisi Kepala Sekolah.',
    kategori: 'Siswa',
    noReferensi: '421.5/082/SMK-N/IX/2026',
  },
  {
    id: 'akt-002',
    judul: 'Pembaruan Berkas Profil Pendidik',
    waktu: 'Hari ini',
    jam: '09:10 WIB',
    pelaksana: 'Admin TU',
    deskripsi: 'Memperbarui nomor kontak dan status sertifikasi pendidik Drs. Hendra Setiawan.',
    kategori: 'Guru',
  },
  {
    id: 'akt-003',
    judul: 'Penyesuaian SK Penugasan Mapel',
    waktu: 'Hari ini',
    jam: '08:45 WIB',
    pelaksana: 'Admin Akademik',
    deskripsi: 'Penyesuaian alokasi beban mengajar Mapel Pemrograman Web (Budi Pratama, S.Kom.) pada rombel XII RPL 2.',
    kategori: 'Mapel',
    noReferensi: 'SK-KUR/2026/041',
  },
  {
    id: 'akt-004',
    judul: 'Penetapan Daya Tampung Lab Praktik',
    waktu: 'Kemarin',
    jam: '14:15 WIB',
    pelaksana: 'Kepala Tata Usaha',
    deskripsi: 'Pembaruan daya tampung Lab Komputer Rekayasa Perangkat Lunak 1 menjadi 36 workstation aktif.',
    kategori: 'Fasilitas',
  },
  {
    id: 'akt-005',
    judul: 'Sinkronisasi Otomatis Pusdatin / Dapodik',
    waktu: 'Kemarin',
    jam: '10:00 WIB',
    pelaksana: 'Sistem Terjadwal',
    deskripsi: 'Sinkronisasi batch data NISN siswa baru angkatan 2026/2027 berhasil dengan status 100% konsisten.',
    kategori: 'Dapodik',
  },
];
