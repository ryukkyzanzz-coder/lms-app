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
import { Tugas } from '../src/modules/assignment/model/Tugas';
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
let createdAssignmentId: string;

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
  await Tugas.deleteMany({});

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
    username: 'guru_tugas_1',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru1 = await Guru.create({
    userId: user1._id,
    nip: 'NIP_GURU_TUGAS_1',
    nama: 'Guru Satu Tugas',
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

  // Assignment for Guru 1 (XII RPL 1 - Pemrograman Web)
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
    username: 'guru_tugas_2',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru2 = await Guru.create({
    userId: user2._id,
    nip: 'NIP_GURU_TUGAS_2',
    nama: 'Guru Dua Tugas',
  });
  guru2Id = guru2._id.toString();

  const mapel2 = await MataPelajaran.create({
    kode: 'BD101',
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

  // Assignment for Guru 2 (XII RPL 2 - Basis Data)
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
    .send({ username: 'guru_tugas_1', password: 'password123' });
  tokenGuru1 = resLogin1.body.data.token || resLogin1.body.data.accessToken;

  const resLogin2 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_tugas_2', password: 'password123' });
  tokenGuru2 = resLogin2.body.data.token || resLogin2.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Phase 2.4 — Assignment (Tugas) Domain', () => {
  // 1. Authorization: List assignments
  it('should list assignments for authorized teacher', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(0);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.total).toBe(0);
  });

  // 2. Authorization: 403 Forbidden for unauthorized class/subject
  it('should return 403 when trying to list assignments for an unauthorized class/subject', async () => {
    // Guru 1 tries to access Guru 2's class/subject
    const res = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas2Id}/subjects/${mapel2Id}/assignments`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  // 3. Create assignment
  it('should create an assignment with draft status, version 1, and default score 100', async () => {
    const deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const payload = {
      judul: 'Tugas 01: Analisis Kebutuhan Sistem LMS',
      deskripsi: 'Buatlah dokumen SRS ringkas untuk modul tugas',
      instruksi: 'Format PDF, maksimal 5 halaman, font Inter 11pt',
      deadline,
      maxScore: 100,
      status: 'draft',
    };

    const res = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.judul).toBe(payload.judul);
    expect(res.body.data.status).toBe('draft');
    expect(res.body.data.version).toBe(1);
    expect(res.body.data.maxScore).toBe(100);

    createdAssignmentId = res.body.data._id;
  });

  // 4. Create assignment unauthorized
  it('should return 403 when unauthorized teacher tries to create an assignment', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments`)
      .set('Authorization', `Bearer ${tokenGuru2}`)
      .send({
        judul: 'Tugas Hacker',
        deskripsi: 'Deskripsi tidak sah',
        deadline: new Date().toISOString(),
      });

    expect(res.status).toBe(403);
  });

  // 5. Get assignment detail
  it('should get assignment detail with populated references', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(createdAssignmentId);
    expect(res.body.data.judul).toBe('Tugas 01: Analisis Kebutuhan Sistem LMS');
    expect(res.body.data.kelasId.nama).toBe('XII RPL 1');
    expect(res.body.data.mapelId.kode).toBe('WEB101');
  });

  // 6. Update assignment with correct version (atomic increment)
  it('should update assignment with matching version and increment version to 2', async () => {
    const res = await request(app)
      .patch(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        version: 1,
        judul: 'Tugas 01: Analisis Kebutuhan Sistem LMS (Revisi)',
        maxScore: 90,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.judul).toBe('Tugas 01: Analisis Kebutuhan Sistem LMS (Revisi)');
    expect(res.body.data.maxScore).toBe(90);
    expect(res.body.data.version).toBe(2);
  });

  // 7. Optimistic concurrency conflict (409)
  it('should return 409 Conflict when updating with a stale version', async () => {
    const res = await request(app)
      .patch(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        version: 1, // Stale! Document is already at version 2
        judul: 'Tugas Stale Update',
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VERSION_CONFLICT');
    expect(res.body.error.message).toContain('Data tugas telah berubah');
  });

  // 8. Update from unauthorized teacher returns 403
  it('should return 403 when another teacher attempts to update the assignment', async () => {
    const res = await request(app)
      .patch(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru2}`)
      .send({
        version: 2,
        judul: 'Unauthorized Update',
      });

    expect(res.status).toBe(403);
  });

  // 9. Publish assignment
  it('should publish assignment, setting status="published", publishedAt, and incrementing version', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/assignments/${createdAssignmentId}/publish`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('published');
    expect(res.body.data.publishedAt).toBeDefined();
    expect(res.body.data.version).toBe(3);
  });

  // 10. Unpublish assignment
  it('should unpublish assignment, setting status="draft" and incrementing version', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/assignments/${createdAssignmentId}/unpublish`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('draft');
    expect(res.body.data.version).toBe(4);
  });

  // 11. Reject unpublish if status is closed
  it('should reject unpublishing if assignment is closed (400)', async () => {
    // Manually set status to 'closed'
    await Tugas.findByIdAndUpdate(createdAssignmentId, { status: 'closed' });

    const res = await request(app)
      .post(`/api/v1/teachers/me/assignments/${createdAssignmentId}/unpublish`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 12. Delete assignment
  it('should delete assignment when authorized', async () => {
    const res = await request(app)
      .delete(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // 13. Verify deleted assignment returns 404
  it('should return 404 when querying deleted assignment', async () => {
    const res = await request(app)
      .get(`/api/v1/teachers/me/assignments/${createdAssignmentId}`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(404);
  });

  // 14. Search, filter, and pagination
  it('should support search, status filter, and pagination', async () => {
    const deadline = new Date(Date.now() + 86400000);
    // Create 3 assignments
    await Tugas.create([
      {
        guruId: new mongoose.Types.ObjectId(guru1Id),
        kelasId: new mongoose.Types.ObjectId(kelas1Id),
        mapelId: new mongoose.Types.ObjectId(mapel1Id),
        judul: 'Algoritma Searching',
        deskripsi: 'Deskripsi Algoritma',
        deadline,
        status: 'published',
        version: 1,
      },
      {
        guruId: new mongoose.Types.ObjectId(guru1Id),
        kelasId: new mongoose.Types.ObjectId(kelas1Id),
        mapelId: new mongoose.Types.ObjectId(mapel1Id),
        judul: 'Algoritma Sorting',
        deskripsi: 'Deskripsi Sorting',
        deadline,
        status: 'draft',
        version: 1,
      },
      {
        guruId: new mongoose.Types.ObjectId(guru1Id),
        kelasId: new mongoose.Types.ObjectId(kelas1Id),
        mapelId: new mongoose.Types.ObjectId(mapel1Id),
        judul: 'Struktur Data Graph',
        deskripsi: 'Deskripsi Graph',
        deadline,
        status: 'published',
        version: 1,
      },
    ]);

    // Search by title "Algoritma"
    const resSearch = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments?search=Algoritma`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resSearch.status).toBe(200);
    expect(resSearch.body.data.length).toBe(2);

    // Filter by status "published"
    const resStatus = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments?status=published`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resStatus.status).toBe(200);
    expect(resStatus.body.data.length).toBe(2);

    // Pagination limit=1
    const resPage = await request(app)
      .get(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments?page=1&limit=1`)
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(resPage.status).toBe(200);
    expect(resPage.body.data.length).toBe(1);
    expect(resPage.body.pagination.total).toBe(3);
    expect(resPage.body.pagination.totalPages).toBe(3);
  });

  // 15. Invalid MongoDB ObjectId (400)
  it('should return 400 when given an invalid MongoDB ObjectId', async () => {
    const res = await request(app)
      .get('/api/v1/teachers/me/assignments/invalid-id')
      .set('Authorization', `Bearer ${tokenGuru1}`);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 16. Invalid payload validation (400)
  it('should return 400 when missing required fields on assignment creation', async () => {
    const res = await request(app)
      .post(`/api/v1/teachers/me/classes/${kelas1Id}/subjects/${mapel1Id}/assignments`)
      .set('Authorization', `Bearer ${tokenGuru1}`)
      .send({
        judul: '', // Empty judul
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
