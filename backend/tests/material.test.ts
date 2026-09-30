import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User, Role } from '../src/modules/core/model/User';
import { Guru } from '../src/modules/core/model/Guru';
import { Kelas } from '../src/modules/core/model/Kelas';
import { Pengampu } from '../src/modules/core/model/Pengampu';
import { MataPelajaran } from '../src/modules/core/model/MataPelajaran';
import { TahunAjaran } from '../src/modules/core/model/TahunAjaran';
import { Semester } from '../src/modules/core/model/Semester';
import { Materi } from '../src/modules/material/model/Materi';
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
let createdMateriId: string;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Clean DB
  await User.deleteMany({});
  await Guru.deleteMany({});
  await Kelas.deleteMany({});
  await Pengampu.deleteMany({});
  await MataPelajaran.deleteMany({});
  await TahunAjaran.deleteMany({});
  await Semester.deleteMany({});
  await Materi.deleteMany({});

  // Setup Academic Year & Semester
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

  // Setup Guru 1 & Classes & Mapel
  const user1 = await User.create({
    username: 'guru_materi_1',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru1 = await Guru.create({
    userId: user1._id,
    nip: 'NIP_GURU_1',
    nama: 'Guru Satu Materi',
  });
  guru1Id = guru1._id.toString();

  const mapel1 = await MataPelajaran.create({
    kode: 'WEB101',
    nama: 'Pemrograman Web',
    kelompok: 'C',
  });
  mapel1Id = mapel1._id.toString();

  const kelas1 = await Kelas.create({
    nama: 'XII RPL 1',
    tingkat: 'XII',
    program: 'RPL',
    tahunAjaranId: ta._id,
    siswaIds: [],
  });
  kelas1Id = kelas1._id.toString();

  // Assignment for Guru 1
  await Pengampu.create({
    guruId: guru1._id,
    mataPelajaranId: mapel1._id,
    kelasId: kelas1._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // Setup Guru 2 & Classes & Mapel
  const user2 = await User.create({
    username: 'guru_materi_2',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru2 = await Guru.create({
    userId: user2._id,
    nip: 'NIP_GURU_2',
    nama: 'Guru Dua Materi',
  });
  guru2Id = guru2._id.toString();

  const mapel2 = await MataPelajaran.create({
    kode: 'DB102',
    nama: 'Basis Data',
    kelompok: 'C',
  });
  mapel2Id = mapel2._id.toString();

  const kelas2 = await Kelas.create({
    nama: 'XII RPL 2',
    tingkat: 'XII',
    program: 'RPL',
    tahunAjaranId: ta._id,
    siswaIds: [],
  });
  kelas2Id = kelas2._id.toString();

  // Assignment for Guru 2
  await Pengampu.create({
    guruId: guru2._id,
    mataPelajaranId: mapel2._id,
    kelasId: kelas2._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // Generate auth tokens via login
  const resLogin1 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_materi_1', password: 'password123' });
  tokenGuru1 = resLogin1.body.data.accessToken;

  const resLogin2 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_materi_2', password: 'password123' });
  tokenGuru2 = resLogin2.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Phase 2.2 — Guru Materi Module Test Suite', () => {
  it('1. Create material with valid payload', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        judul: 'Pengantar HTML & CSS Modern',
        deskripsi: 'Panduan lengkap dasar struktur web semantik',
        tipe: 'DOCUMENT',
        konten: '# Modul 1\nBelajar HTML5 semantik.',
        urutan: 1,
        status: 'draft',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.judul).toBe('Pengantar HTML & CSS Modern');
    expect(res.body.data.tipe).toBe('DOCUMENT');
    expect(res.body.data.status).toBe('draft');
    expect(res.body.data.urutan).toBe(1);
    expect(res.body.data.version).toBe(1);
    expect(res.body.data.guruId).toBe(guru1Id);
    expect(res.body.data.kelasId).toBe(kelas1Id);
    expect(res.body.data.mapelId).toBe(mapel1Id);

    createdMateriId = res.body.data._id;
  });

  it('2. Authenticated Guru can list authorized materials with pagination', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0]._id).toBe(createdMateriId);

    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(10);
    expect(res.body.pagination.total).toBe(1);
    expect(res.body.pagination.totalPages).toBe(1);
  });

  it("3. Unauthorized Guru cannot access another Guru's class/subject material", async () => {
    // Guru 2 tries to list materials of Guru 1's class & subject
    const listRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru2}`);

    expect(listRes.status).toBe(403);
    expect(listRes.body.success).toBe(false);
    expect(listRes.body.error.code).toBe('FORBIDDEN');

    // Guru 2 tries to access detail of Guru 1's material
    const detailRes = await request(app)
      .get(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru2}`);

    expect(detailRes.status).toBe(403);
    expect(detailRes.body.success).toBe(false);
    expect(detailRes.body.error.code).toBe('FORBIDDEN');
  });

  it('4. Get material detail by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdMateriId);
    expect(res.body.data.judul).toBe('Pengantar HTML & CSS Modern');
    expect(res.body.data.version).toBe(1);
  });

  it('5. Update material with correct version', async () => {
    const res = await request(app)
      .patch(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        version: 1,
        judul: 'Pengantar HTML5, CSS3, & Modern UI',
        deskripsi: 'Deskripsi yang telah diperbarui',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.judul).toBe('Pengantar HTML5, CSS3, & Modern UI');
  });

  it('6. Version increments after update', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.data.version).toBe(2);
  });

  it('7. Stale version returns HTTP 409 Conflict', async () => {
    // Attempt update using stale version 1 (current is 2)
    const res = await request(app)
      .patch(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        version: 1,
        judul: 'Percobaan Update dengan Version Usang',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VERSION_CONFLICT');
    expect(res.body.error.message).toContain('Data materi telah berubah');
  });

  it('8. Publish material updates status, publishedAt, and increments version', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/materials/${createdMateriId}/publish`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('published');
    expect(res.body.data.publishedAt).toBeDefined();
    expect(res.body.data.version).toBe(3); // was 2, now 3
  });

  it('9. Unpublish material sets status to draft and increments version', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/materials/${createdMateriId}/unpublish`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('draft');
    expect(res.body.data.version).toBe(4); // was 3, now 4
  });

  it('10. Pagination works with safe bounds', async () => {
    // Seed 14 more materials to have 15 total
    const materialsToInsert = Array.from({ length: 14 }).map((_, i) => ({
      guruId: new mongoose.Types.ObjectId(guru1Id),
      kelasId: new mongoose.Types.ObjectId(kelas1Id),
      mapelId: new mongoose.Types.ObjectId(mapel1Id),
      judul: `Materi Pagination Batch #${i + 2}`,
      tipe: 'TEXT',
      urutan: i + 2,
      status: 'draft',
      version: 1,
    }));
    await Materi.insertMany(materialsToInsert);

    // Request page 1 with limit 5
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials?page=1&limit=5`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(5);
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(5);
    expect(res.body.pagination.total).toBe(15);
    expect(res.body.pagination.totalPages).toBe(3);

    // Request page 2 with limit 5
    const resPage2 = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials?page=2&limit=5`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resPage2.status).toBe(200);
    expect(resPage2.body.data.length).toBe(5);
    expect(resPage2.body.pagination.page).toBe(2);
  });

  it('11. Query & input validation rejects invalid requests', async () => {
    // Negative urutan in create
    const negUrutanRes = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        judul: 'Materi Negatif',
        tipe: 'DOCUMENT',
        urutan: -3,
      });
    expect(negUrutanRes.status).toBe(400);
    expect(negUrutanRes.body.error.code).toBe('VALIDATION_ERROR');

    // Empty title
    const emptyTitleRes = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        judul: '',
        tipe: 'DOCUMENT',
      });
    expect(emptyTitleRes.status).toBe(400);
    expect(emptyTitleRes.body.error.code).toBe('VALIDATION_ERROR');

    // Invalid material type
    const invalidTypeRes = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        judul: 'Tipe Invalid',
        tipe: 'UNSUPPORTED_TYPE',
      });
    expect(invalidTypeRes.status).toBe(400);

    // Oversized pagination limit (> 50)
    const oversizeLimitRes = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/materials?limit=100`)
      .set('Authorization', `Bearer ${tokenGuru1}`);
    expect(oversizeLimitRes.status).toBe(400);

    // Invalid ObjectId format in params
    const invalidIdRes = await request(app)
      .get(`/api/v1/teachers/me/classes/123invalid/subjects/${mapel1Id}/materials`)
      .set('Authorization', `Bearer ${tokenGuru1}`);
    expect(invalidIdRes.status).toBe(400);
  });

  it('12. Delete material removes it and prevents further access', async () => {
    // Delete the first created material
    const deleteRes = await request(app)
      .delete(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);

    // Confirm it is no longer found
    const getRes = await request(app)
      .get(`/api/v1/teachers/me/materials/${createdMateriId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(getRes.status).toBe(404);
    expect(getRes.body.error.code).toBe('NOT_FOUND');
  });
});
