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

export interface ITugas {
  _id: string;
  guruId: string;
  kelasId: string | { _id: string; nama: string; tingkat?: string };
  mapelId: string | { _id: string; nama: string; kode?: string };
  babId?: string | { _id: string; judul: string; urutan?: number };
  judul: string;
  deskripsi: string;
  instruksi?: string;
  lampiran?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];
  deadline: string;
  maxScore: number;
  status: 'draft' | 'published' | 'closed';
  version: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssignmentPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ISubmissionFile {
  name: string;
  url: string;
  mimeType: string;
  size: number;
}

export interface IPengumpulanTugas {
  _id: string;
  tugasId: string;
  siswaId: string | TeacherStudent;
  status: 'SUBMITTED' | 'GRADED' | 'RESUBMITTED' | string;
  isLate: boolean;
  submittedAt: string;
  files: ISubmissionFile[];
  catatanSiswa?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionStats {
  totalStudents: number;
  submittedCount: number;
  unsubmittedCount: number;
  lateCount: number;
  gradedCount: number;
}

export interface SubmissionRosterItem {
  siswa: {
    _id: string;
    nama: string;
    nisn: string;
    jenisKelamin: 'L' | 'P' | string;
    status: string;
  };
  hasSubmitted: boolean;
  submission: IPengumpulanTugas | null;
}

export interface AssignmentSubmissionsResponse {
  assignment: {
    id: string;
    judul: string;
    deskripsi?: string;
    deadline: string;
    maxScore: number;
    status: 'draft' | 'published' | 'closed';
    version: number;
    kelas: { id: string; nama: string };
    mapel: { id: string; nama: string };
  };
  stats: SubmissionStats;
  data: SubmissionRosterItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

