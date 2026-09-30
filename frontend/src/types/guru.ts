export interface TeacherDashboardStats {
  jadwalHariIni: any[];
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
