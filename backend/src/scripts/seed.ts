import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import { User, Role } from '../modules/core/model/User';
import { Guru } from '../modules/core/model/Guru';
import { Siswa } from '../modules/core/model/Siswa';
import { Kelas } from '../modules/core/model/Kelas';
import { MataPelajaran } from '../modules/core/model/MataPelajaran';
import { TahunAjaran } from '../modules/core/model/TahunAjaran';
import { Semester } from '../modules/core/model/Semester';
import { Pengampu } from '../modules/core/model/Pengampu';
import { Bab } from '../modules/core/model/Bab';
import { Materi } from '../modules/core/model/Materi';
import { Pengumuman } from '../modules/core/model/Pengumuman';
import { Tugas } from '../modules/core/model/Tugas';
import { PengumpulanTugas } from '../modules/core/model/PengumpulanTugas';
import { MateriProgress } from '../modules/core/model/MateriProgress';

const seedDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('🌱 Connected to MongoDB. Clearing old data...');

    await User.deleteMany({});
    await Guru.deleteMany({});
    await Siswa.deleteMany({});
    await Kelas.deleteMany({});
    await MataPelajaran.deleteMany({});
    await TahunAjaran.deleteMany({});
    await Semester.deleteMany({});
    await Pengampu.deleteMany({});
    await Bab.deleteMany({});
    await Materi.deleteMany({});
    await Pengumuman.deleteMany({});
    await Tugas.deleteMany({});
    await PengumpulanTugas.deleteMany({});
    await MateriProgress.deleteMany({});

    console.log('Data cleared.');

    // 1. Tahun Ajaran & Semester
    const ta = await TahunAjaran.create({
      nama: '2026/2027',
      tahunMulai: 2026,
      tahunSelesai: 2027,
      status: 'Aktif',
    });

    const semesterGanjil = await Semester.create({
      tahunAjaranId: ta._id,
      nama: 'Ganjil',
      status: 'Aktif',
    });

    // 2. Users & Guru
    const userGuru1 = await User.create({ username: '198504122010011014', passwordHash: 'password123', role: Role.GURU });
    const guru1 = await Guru.create({
      userId: userGuru1._id,
      nip: '198504122010011014',
      nama: 'Budi Pratama, S.Kom.',
      status: 'Aktif',
    });

    const userGuru2 = await User.create({ username: '198907232014032005', passwordHash: 'password123', role: Role.GURU });
    const guru2 = await Guru.create({
      userId: userGuru2._id,
      nip: '198907232014032005',
      nama: 'Siti Rahmawati, S.Kom.',
      status: 'Aktif',
    });

    // 3. Siswa
    const userSiswa1 = await User.create({ username: '0061234567', passwordHash: 'password123', role: Role.SISWA });
    const siswa1 = await Siswa.create({ userId: userSiswa1._id, nisn: '0061234567', nama: 'Rakha Arkana', status: 'Aktif' });

    const userSiswa2 = await User.create({ username: '0061234568', passwordHash: 'password123', role: Role.SISWA });
    const siswa2 = await Siswa.create({ userId: userSiswa2._id, nisn: '0061234568', nama: 'Andi Saputra', status: 'Aktif' });

    const userSiswa3 = await User.create({ username: '0061234569', passwordHash: 'password123', role: Role.SISWA });
    const siswa3 = await Siswa.create({ userId: userSiswa3._id, nisn: '0061234569', nama: 'Dewi Lestari', status: 'Aktif' });

    // 4. Kelas
    const kelasXII_Rpl1 = await Kelas.create({
      nama: 'XII RPL 1', tingkat: 'XII', program: 'RPL', tahunAjaranId: ta._id, waliKelasId: guru1._id, siswaIds: [siswa1._id, siswa2._id, siswa3._id],
    });

    // 5. Mata Pelajaran
    const mapelWeb = await MataPelajaran.create({ kode: 'RPL-WEB', nama: 'Pemrograman Web', kelompok: 'Kejuruan' });

    // 6. Pengampu
    const pengampuWeb = await Pengampu.create({
      guruId: guru1._id, mataPelajaranId: mapelWeb._id, kelasId: kelasXII_Rpl1._id, tahunAjaranId: ta._id, semesterId: semesterGanjil._id,
    });
    
    // 7. Bab & Materi
    const bab1 = await Bab.create({
      pengampuId: pengampuWeb._id,
      urutan: 1,
      judul: 'Dasar Pengembangan Web Modern',
      deskripsi: 'Memahami Arsitektur Client-Server, Web Standards',
      status: 'Selesai'
    });
    
    const materi1 = await Materi.create({
      babId: bab1._id,
      urutan: 1,
      judul: 'Pengenalan HTTP, Web Protocol',
      tipe: 'Dokumen PDF',
      status: 'Dipublikasikan',
      tanggalRilis: new Date(),
      fileSize: '4.2 MB',
      aksesSiswa: { total: 3, membaca: 3 }
    });
    
    const bab2 = await Bab.create({
      pengampuId: pengampuWeb._id,
      urutan: 2,
      judul: 'Pemrograman JavaScript Lanjut',
      status: 'Sedang Berjalan'
    });
    
    // 8. Pengumuman
    await Pengumuman.create({
      pengampuId: pengampuWeb._id,
      judul: 'Perubahan Jam Praktikum Lab',
      konten: 'Dialihkan ke Lab Komputer 2',
      status: 'Dipublikasikan',
      tipe: 'Resmi Penting',
      isPinned: true,
      tanggalRilis: new Date(),
      aksesSiswa: { total: 3, membaca: 2, belumMembaca: [siswa3._id] }
    });
    
    // 9. Tugas
    const tugas1 = await Tugas.create({
      pengampuId: pengampuWeb._id,
      judul: 'Tugas 03: Otentikasi JWT',
      deskripsi: 'Submission repositori git',
      tenggatWaktu: new Date(Date.now() + 86400000), // tomorrow
      status: 'Aktif'
    });
    
    await PengumpulanTugas.create({ tugasId: tugas1._id, siswaId: siswa1._id, status: 'Dikumpulkan' });
    await PengumpulanTugas.create({ tugasId: tugas1._id, siswaId: siswa2._id, status: 'Belum' });

    console.log('✅ Seed data successfully injected!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
