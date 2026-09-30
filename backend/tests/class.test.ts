import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User, Role } from '../src/modules/core/model/User';
import { Guru } from '../src/modules/core/model/Guru';
import { Kelas } from '../src/modules/core/model/Kelas';
import { Siswa } from '../src/modules/core/model/Siswa';
import { Pengampu } from '../src/modules/core/model/Pengampu';
import { MataPelajaran } from '../src/modules/core/model/MataPelajaran';
import { TahunAjaran } from '../src/modules/core/model/TahunAjaran';
import { Semester } from '../src/modules/core/model/Semester';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let tokenGuru1: string;
let tokenGuru2: string;
let guru1Id: string;
let guru2Id: string;
let kelas1Id: string;
let kelas2Id: string;
let mapel1Id: string;
let mapel2Id: string;
let siswa1Nisn: string;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Clean DB
  await User.deleteMany({});
  await Guru.deleteMany({});
  await Siswa.deleteMany({});
  await Kelas.deleteMany({});
  await Pengampu.deleteMany({});
  await MataPelajaran.deleteMany({});
  await TahunAjaran.deleteMany({});
  await Semester.deleteMany({});

  // 1. Tahun Ajaran & Semester
  const ta = await TahunAjaran.create({
    nama: '2026/2027',
    tahunMulai: 2026,
    tahunSelesai: 2027,
    status: 'Aktif',
  });
  const smt = await Semester.create({
    tahunAjaranId: ta._id,
    nama: 'Ganjil',
    status: 'Aktif',
  });

  // 2. Teachers
  const user1 = await User.create({
    username: 'guru_class_1',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru1 = await Guru.create({
    userId: user1._id,
    nip: 'NIP_GURU_1',
    nama: 'Guru Satu Kelas',
  });
  guru1Id = guru1._id.toString();

  const user2 = await User.create({
    username: 'guru_class_2',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru2 = await Guru.create({
    userId: user2._id,
    nip: 'NIP_GURU_2',
    nama: 'Guru Dua Kelas',
  });
  guru2Id = guru2._id.toString();

  // 3. Subjects
  const mapel1 = await MataPelajaran.create({
    kode: 'RPL-WEB',
    nama: 'Pemrograman Web',
    kelompok: 'Kejuruan',
  });
  mapel1Id = mapel1._id.toString();

  const mapel2 = await MataPelajaran.create({
    kode: 'RPL-DB',
    nama: 'Basis Data Terdistribusi',
    kelompok: 'Kejuruan',
  });
  mapel2Id = mapel2._id.toString();

  // 4. Siswa Records (5 students)
  const siswaIds: mongoose.Types.ObjectId[] = [];
  for (let i = 1; i <= 5; i++) {
    const userSiswa = await User.create({
      username: `006000000${i}`,
      passwordHash: 'password123',
      role: Role.SISWA,
    });
    const s = await Siswa.create({
      userId: userSiswa._id,
      nisn: `006000000${i}`,
      nama: `Siswa Bintang ${i}`,
      jenisKelamin: i % 2 === 0 ? 'P' : 'L',
      status: 'Aktif',
    });
    siswaIds.push(s._id);
    if (i === 1) siswa1Nisn = s.nisn;
  }

  // 5. Classes
  const kelas1 = await Kelas.create({
    nama: 'XII RPL 1',
    tingkat: 'XII',
    program: 'Rekayasa Perangkat Lunak',
    tahunAjaranId: ta._id,
    waliKelasId: guru1._id,
    siswaIds,
    status: 'Aktif',
  });
  kelas1Id = kelas1._id.toString();

  const kelas2 = await Kelas.create({
    nama: 'XII RPL 2',
    tingkat: 'XII',
    program: 'Rekayasa Perangkat Lunak',
    tahunAjaranId: ta._id,
    waliKelasId: guru2._id,
    siswaIds: [],
    status: 'Aktif',
  });
  kelas2Id = kelas2._id.toString();

  // 6. Teaching Assignments (Pengampu)
  // Guru 1 teaches both Pemrograman Web and Basis Data in Kelas 1
  await Pengampu.create({
    guruId: guru1._id,
    mataPelajaranId: mapel1._id,
    kelasId: kelas1._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });
  await Pengampu.create({
    guruId: guru1._id,
    mataPelajaranId: mapel2._id,
    kelasId: kelas1._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // Guru 2 teaches Basis Data in Kelas 2
  await Pengampu.create({
    guruId: guru2._id,
    mataPelajaranId: mapel2._id,
    kelasId: kelas2._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // Login tokens
  const resLogin1 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_class_1', password: 'password123' });
  tokenGuru1 = resLogin1.body.data.accessToken;

  const resLogin2 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_class_2', password: 'password123' });
  tokenGuru2 = resLogin2.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Phase 2.3 — Guru Kelas & Siswa Module Test Suite', () => {
  it('1. Authorized Guru can access class detail', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(kelas1Id);
    expect(res.body.data.nama).toBe('XII RPL 1');
    expect(res.body.data.tingkat).toBe('XII');
    expect(res.body.data.program).toBe('Rekayasa Perangkat Lunak');
    expect(res.body.data.waliKelas).toBeDefined();
    expect(res.body.data.waliKelas.nama).toBe('Guru Satu Kelas');
    expect(res.body.data.tahunAjaran.nama).toBe('2026/2027');
    expect(res.body.data.semester.nama).toBe('Ganjil');
  });

  it('2. Unauthorized Guru receives 403 on class detail and roster', async () => {
    // Guru 2 tries to access Kelas 1 (not assigned)
    const detailRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}`)
      .set('Authorization', `Bearer ${tokenGuru2}`);

    expect(detailRes.status).toBe(403);
    expect(detailRes.body.success).toBe(false);
    expect(detailRes.body.error.code).toBe('FORBIDDEN');

    // Guru 2 tries to access students of Kelas 1
    const studentsRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students`)
      .set('Authorization', `Bearer ${tokenGuru2}`);

    expect(studentsRes.status).toBe(403);
    expect(studentsRes.body.success).toBe(false);
    expect(studentsRes.body.error.code).toBe('FORBIDDEN');
  });

  it('3. Unknown class receives 404', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();

    const detailRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${nonExistentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(detailRes.status).toBe(404);
    expect(detailRes.body.error.code).toBe('NOT_FOUND');

    const studentsRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${nonExistentId}/students`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(studentsRes.status).toBe(404);
    expect(studentsRes.body.error.code).toBe('NOT_FOUND');
  });

  it('4. Class detail returns correct student count', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.data.jumlahSiswa).toBe(5);
  });

  it('5. Class detail returns active subjects taught by Guru', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.subjects)).toBe(true);
    expect(res.body.data.subjects.length).toBe(2);

    const codes = res.body.data.subjects.map((s: any) => s.kode);
    expect(codes).toContain('RPL-WEB');
    expect(codes).toContain('RPL-DB');
  });

  it('6. Student roster returns real students with formatted fields', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(5);

    const s1 = res.body.data[0];
    expect(s1.id).toBeDefined();
    expect(s1.nisn).toBeDefined();
    expect(s1.nama).toBeDefined();
    expect(s1.jenisKelamin).toBeDefined();
    expect(s1.avatar).toBeNull();
    expect(s1.status).toBe('Aktif');
  });

  it('7. Student roster pagination works', async () => {
    // Page 1, limit 2
    const resPage1 = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students?page=1&limit=2`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resPage1.status).toBe(200);
    expect(resPage1.body.data.length).toBe(2);
    expect(resPage1.body.pagination.page).toBe(1);
    expect(resPage1.body.pagination.limit).toBe(2);
    expect(resPage1.body.pagination.total).toBe(5);
    expect(resPage1.body.pagination.totalPages).toBe(3);

    // Page 2, limit 2
    const resPage2 = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students?page=2&limit=2`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resPage2.status).toBe(200);
    expect(resPage2.body.data.length).toBe(2);
    expect(resPage2.body.pagination.page).toBe(2);
  });

  it('8. Student search works by name and NISN', async () => {
    // Search by name
    const resName = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students?search=Bintang 1`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resName.status).toBe(200);
    expect(resName.body.data.length).toBe(1);
    expect(resName.body.data[0].nama).toBe('Siswa Bintang 1');

    // Search by NISN
    const resNisn = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/students?search=${siswa1Nisn}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resNisn.status).toBe(200);
    expect(resNisn.body.data.length).toBe(1);
    expect(resNisn.body.data[0].nisn).toBe(siswa1Nisn);
  });

  it('9. Invalid class ObjectId is rejected with 400', async () => {
    const resDetail = await request(app)
      .get('/api/v1/teachers/me/classes/not-a-valid-id')
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resDetail.status).toBe(400);
    expect(resDetail.body.error.code).toBe('INVALID_ID');

    const resStudents = await request(app)
      .get('/api/v1/teachers/me/classes/not-a-valid-id/students')
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resStudents.status).toBe(400);
    expect(resStudents.body.error.code).toBe('INVALID_ID');
  });
});
