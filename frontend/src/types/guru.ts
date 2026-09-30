export interface TeacherDashboardStats {
  jadwalHariIni: unknown[];
  perluTindakan: {
    belumDiperiksa: number;
    belumKumpul: number;
  };
  kelas: {
    pengampuId: string;
    kelasId: string;
    kelas: string;
    mapel: string;
    jumlahSiswa: number;
    ketuntasanModul: number;
    tugasAktif: number;
  }[];
  kurikulum: {
    kosp: string;
    targetPenyelesaian: string;
  };
}

export interface TeacherProfile {
  _id: string;
  userId: string;
  nip: string;
  nama: string;
  email?: string;
  nomorTelepon?: string;
  status: 'Aktif' | 'Cuti' | 'Pensiun';
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherClass {
  _id: string;
  nama: string;
  tingkat: string;
  program: string;
  siswaIds?: string[];
  status?: 'Aktif' | 'Non-Aktif' | string;
  waliKelasId?: string;
  tahunAjaranId?: string;
}

export interface TeacherSubject {
  _id: string;
  kode: string;
  nama: string;
  kelompok: string;
}

export interface TeacherMaterial {
  _id: string;
  urutan: number;
  judul: string;
  deskripsi: string;
  status: string;
  materi: {
    _id: string;
    urutan: number;
    judul: string;
    tipe: string;
    status: string;
    tanggalRilis?: string;
    fileSize?: string;
    aksesSiswa?: { total: number; membaca: number };
  }[];
}

export interface TeacherAnnouncement {
  _id: string;
  judul: string;
  konten: string;
  status: string;
  tipe: string;
  tanggalRilis?: string;
  isPinned: boolean;
  aksesSiswa?: { total: number; membaca: number };
}

export interface TeacherStudentProgress {
  siswaId: string;
  ketuntasanMateri: number;
  pengumpulanTugas: string;
  rataRataNilai: number;
  status: string;
}

export interface IMateri {
  _id: string;
  guruId: string;
  kelasId: string;
  mapelId: string;
  babId?: {
    _id: string;
    judul: string;
    urutan: number;
  } | string;
  judul: string;
  deskripsi?: string;
  tipe: 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  konten?: string;
  file?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  };
  urutan: number;
  status: 'draft' | 'published' | 'archived';
  version: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TeacherClassDetail {
  id: string;
  nama: string;
  tingkat: string;
  program: string;
  waliKelas: {
    id: string;
    nama: string;
  } | null;
  tahunAjaran: {
    id: string;
    nama: string;
  } | null;
  semester: {
    id: string;
    nama: string;
  } | null;
  jumlahSiswa: number;
  subjects: {
    id: string;
    kode: string;
    nama: string;
  }[];
}

export interface TeacherStudent {
  id: string;
  nisn: string;
  nama: string;
  jenisKelamin: 'L' | 'P' | string;
  avatar: string | null;
  status: 'Aktif' | 'Lulus' | 'Pindah' | 'Drop Out' | string;
}

export interface StudentPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

