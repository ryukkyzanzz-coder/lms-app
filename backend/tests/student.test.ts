import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User, Role } from '../src/modules/core/model/User';
import { Guru } from '../src/modules/core/model/Guru';
import { Siswa } from '../src/modules/core/model/Siswa';
import { Kelas } from '../src/modules/core/model/Kelas';
import { Pengampu } from '../src/modules/core/model/Pengampu';
import { MataPelajaran } from '../src/modules/core/model/MataPelajaran';
import { TahunAjaran } from '../src/modules/core/model/TahunAjaran';
import { Semester } from '../src/modules/core/model/Semester';
import { Materi } from '../src/modules/core/model/Materi';
import { Tugas } from '../src/modules/core/model/Tugas';
import { Pengumuman } from '../src/modules/core/model/Pengumuman';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let tokenSiswa: string;
let tokenGuru: string;
let siswaId: string;
let guruId: string;
let kelasId: string;
let mapelId: string;
let tugasId: string;
let materiId: string;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Clean DB
  await User.deleteMany({});
  await Guru.deleteMany({});
  await Siswa.deleteMany({});
  await Kelas.deleteMany({});
  await Pengampu.deleteMany({});
  await MataPelajaran.deleteMany({});
  await TahunAjaran.deleteMany({});
  await Semester.deleteMany({});
  await Materi.deleteMany({});
  await Tugas.deleteMany({});
  await Pengumuman.deleteMany({});

  // 1. Create Academic Setup
  const ta = await TahunAjaran.create({ nama: '2026/2027', tahunMulai: 2026, tahunSelesai: 2027, status: 'Aktif' });
  const smt = await Semester.create({ tahunAjaranId: ta._id, nama: 'Ganjil', status: 'Aktif' });
  const mapel = await MataPelajaran.create({ kode: 'PWB', nama: 'Pemrograman Web', kelompok: 'C' });
  mapelId = mapel._id.toString();

  // 2. Create Teacher
  const userGuru = await User.create({ username: 'guru_test', passwordHash: 'password123', role: Role.GURU });
  const guru = await Guru.create({ userId: userGuru._id, nip: 'GURU_TEST_01', nama: 'Budi Pratama, S.Kom.' });
  guruId = guru._id.toString();

  // 3. Create Student
  const userSiswa = await User.create({ username: 'siswa_test', passwordHash: 'password123', role: Role.SISWA });
  const siswa = await Siswa.create({
    userId: userSiswa._id,
    nisn: '2204128',
    nama: 'Dafiand',
    jenisKelamin: 'L',
    status: 'Aktif',
  });
  siswaId = siswa._id.toString();

  // 4. Create Class with Student Enrolled
  const kelas = await Kelas.create({
    nama: 'XII RPL 1',
    tingkat: 'XII',
    program: 'Rekayasa Perangkat Lunak',
    tahunAjaranId: ta._id,
    waliKelasId: guru._id,
    siswaIds: [siswa._id],
    status: 'Aktif',
  });
  kelasId = kelas._id.toString();

  // 5. Create Pengampu
  const pengampu = await Pengampu.create({
    guruId: guru._id,
    mataPelajaranId: mapel._id,
    kelasId: kelas._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // 6. Create Published Material
  const materi = await Materi.create({
    guruId: guru._id,
    kelasId: kelas._id,
    mapelId: mapel._id,
    judul: 'Modul 08: RESTful API Express',
    deskripsi: 'Arsitektur REST dan setup Node.js Express',
    status: 'published',
    publishedAt: new Date(),
    urutan: 1,
  });
  materiId = materi._id.toString();

  // 7. Create Published Assignment
  const tugas = await Tugas.create({
    guruId: guru._id,
    kelasId: kelas._id,
    mapelId: mapel._id,
    judul: 'Tugas 03: Implementasi JWT',
    deskripsi: 'Buat auth controller dengan JWT dan middleware',
    deadline: new Date(Date.now() + 86400000 * 3), // 3 days from now
    maxScore: 100,
    status: 'published',
    publishedAt: new Date(),
  });
  tugasId = tugas._id.toString();

  // 8. Create Announcement
  await Pengumuman.create({
    pengampuId: pengampu._id,
    judul: 'Perubahan Jadwal Praktikum Lab',
    konten: 'Praktikum Web dipindah ke Lab 2.',
    status: 'Dipublikasikan',
    tipe: 'Resmi Penting',
    tanggalRilis: new Date(),
    isPinned: true,
  });

  // 9. Login Both Roles
  const resLoginSiswa = await request(app).post('/api/v1/auth/login').send({ username: 'siswa_test', password: 'password123' });
  tokenSiswa = resLoginSiswa.body.data.accessToken;

  const resLoginGuru = await request(app).post('/api/v1/auth/login').send({ username: 'guru_test', password: 'password123' });
  tokenGuru = resLoginGuru.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Student Module E2E & Cross-Role Flows', () => {
  it('GET /api/v1/students/me returns student profile', async () => {
    const res = await request(app)
      .get('/api/v1/students/me')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nama).toBe('Dafiand');
    expect(res.body.data.nisn).toBe('2204128');
  });

  it('GET /api/v1/students/me/dashboard returns dynamic dashboard data', async () => {
    const res = await request(app)
      .get('/api/v1/students/me/dashboard')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.siswa.nama).toBe('Dafiand');
    expect(res.body.data.kelas.nama).toBe('XII RPL 1');
    expect(res.body.data.tugasTerdekat.length).toBeGreaterThan(0);
    expect(res.body.data.pengumuman.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/students/me/classes returns enrolled classes', async () => {
    const res = await request(app)
      .get('/api/v1/students/me/classes')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].nama).toBe('XII RPL 1');
  });

  it('GET /api/v1/students/me/classes/:kelasId returns class detail with subjects', async () => {
    const res = await request(app)
      .get(`/api/v1/students/me/classes/${kelasId}`)
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.nama).toBe('XII RPL 1');
    expect(res.body.data.subjects.length).toBe(1);
    expect(res.body.data.subjects[0].nama).toBe('Pemrograman Web');
  });

  it('GET /api/v1/students/me/materials returns published materials', async () => {
    const res = await request(app)
      .get('/api/v1/students/me/materials')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].judul).toBe('Modul 08: RESTful API Express');
  });

  it('GET /api/v1/students/me/materials/:materialId returns single material detail', async () => {
    const res = await request(app)
      .get(`/api/v1/students/me/materials/${materiId}`)
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.judul).toBe('Modul 08: RESTful API Express');
  });

  it('GET /api/v1/students/me/assignments returns published assignments', async () => {
    const res = await request(app)
      .get('/api/v1/students/me/assignments')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].judul).toBe('Tugas 03: Implementasi JWT');
    expect(res.body.data[0].hasSubmitted).toBe(false);
  });

  it('Cross-Role: Student submits assignment -> Teacher grades -> Student sees grade in Nilai', async () => {
    // 1. Student submits assignment
    const submitRes = await request(app)
      .post(`/api/v1/students/me/assignments/${tugasId}/submit`)
      .set('Authorization', `Bearer ${tokenSiswa}`)
      .send({
        linkUrl: 'https://github.com/dafiand/jwt-auth-lab',
        catatanSiswa: 'Sudah selesai dengan unit tests.',
      });

    expect(submitRes.status).toBe(201);
    expect(submitRes.body.success).toBe(true);
    expect(submitRes.body.data.status).toBe('SUBMITTED');
    const submissionId = submitRes.body.data._id;

    // 2. Teacher views submissions roster
    const rosterRes = await request(app)
      .get(`/api/v1/teachers/me/assignments/${tugasId}/submissions`)
      .set('Authorization', `Bearer ${tokenGuru}`);

    expect(rosterRes.status).toBe(200);
    expect(rosterRes.body.stats.submittedCount).toBe(1);

    // 3. Teacher grades the submission
    const gradeRes = await request(app)
      .post(`/api/v1/teachers/me/assignments/${tugasId}/submissions/${submissionId}/grade`)
      .set('Authorization', `Bearer ${tokenGuru}`)
      .send({
        nilai: 92,
        catatanGuru: 'Sangat baik, middleware JWT terimplementasi dengan benar.',
      });

    expect(gradeRes.status).toBe(200);
    expect(gradeRes.body.success).toBe(true);
    expect(gradeRes.body.data.status).toBe('GRADED');
    expect(gradeRes.body.data.nilai).toBe(92);

    // 4. Student sees grade in GET /students/me/grades
    const gradesRes = await request(app)
      .get('/api/v1/students/me/grades')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(gradesRes.status).toBe(200);
    expect(gradesRes.body.data.gradedSubmissions.length).toBe(1);
    expect(gradesRes.body.data.gradedSubmissions[0].nilai).toBe(92);
    expect(gradesRes.body.data.gradedSubmissions[0].catatanGuru).toBe(
      'Sangat baik, middleware JWT terimplementasi dengan benar.'
    );

    // 5. Teacher student progress endpoint reflects real calculated grade without Math.random()
    const progressRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelasId}/students-progress`)
      .set('Authorization', `Bearer ${tokenGuru}`);

    expect(progressRes.status).toBe(200);
    expect(progressRes.body.data.length).toBe(1);
    expect(progressRes.body.data[0].avgGrade).toBe(92);
    expect(progressRes.body.data[0].name).toBe('Dafiand');
  });

  it('GET /api/v1/students/me/announcements returns published announcements', async () => {
    const res = await request(app)
      .get('/api/v1/students/me/announcements')
      .set('Authorization', `Bearer ${tokenSiswa}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].judul).toBe('Perubahan Jadwal Praktikum Lab');
  });
});
