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
import { Tugas } from '../src/modules/assignment/model/Tugas';
import { PengumpulanTugas } from '../src/modules/submission/model/PengumpulanTugas';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let tokenGuru1: string;
let tokenGuru2: string;
let guru1Id: string;
let guru2Id: string;
let kelas1Id: string;
let mapel1Id: string;
let siswa1Id: string;
let siswa2Id: string;
let siswa3Id: string;
let externalSiswaId: string;
let assignmentDraftId: string;
let assignmentPublishedId: string;
let deadlineDate: Date;

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
  await Tugas.deleteMany({});
  await PengumpulanTugas.deleteMany({});

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

  // Setup Guru 1 (Primary)
  const user1 = await User.create({
    username: 'guru_sub_1',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru1 = await Guru.create({
    userId: user1._id,
    nip: 'NIP_GURU_SUB_1',
    nama: 'Guru Satu Pengumpulan',
  });
  guru1Id = guru1._id.toString();

  // Setup Guru 2 (Unrelated / Unauthorized)
  const user2 = await User.create({
    username: 'guru_sub_2',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  const guru2 = await Guru.create({
    userId: user2._id,
    nip: 'NIP_GURU_SUB_2',
    nama: 'Guru Dua Pengumpulan',
  });
  guru2Id = guru2._id.toString();

  // Setup Students
  const userSiswa1 = await User.create({
    username: 'siswa_sub_1',
    passwordHash: 'password123',
    role: Role.SISWA,
  });
  const siswa1 = await Siswa.create({
    userId: userSiswa1._id,
    nisn: '0011223344',
    nama: 'Ahmad Siswa',
    jenisKelamin: 'L',
    status: 'Aktif',
  });
  siswa1Id = siswa1._id.toString();

  const userSiswa2 = await User.create({
    username: 'siswa_sub_2',
    passwordHash: 'password123',
    role: Role.SISWA,
  });
  const siswa2 = await Siswa.create({
    userId: userSiswa2._id,
    nisn: '0011223345',
    nama: 'Bunga Siswa',
    jenisKelamin: 'P',
    status: 'Aktif',
  });
  siswa2Id = siswa2._id.toString();

  const userSiswa3 = await User.create({
    username: 'siswa_sub_3',
    passwordHash: 'password123',
    role: Role.SISWA,
  });
  const siswa3 = await Siswa.create({
    userId: userSiswa3._id,
    nisn: '0011223346',
    nama: 'Citra Siswa',
    jenisKelamin: 'P',
    status: 'Aktif',
  });
  siswa3Id = siswa3._id.toString();

  // External student (not in class)
  const userExt = await User.create({
    username: 'siswa_ext',
    passwordHash: 'password123',
    role: Role.SISWA,
  });
  const siswaExt = await Siswa.create({
    userId: userExt._id,
    nisn: '0099999999',
    nama: 'External Siswa',
    jenisKelamin: 'L',
    status: 'Aktif',
  });
  externalSiswaId = siswaExt._id.toString();

  // Setup Class with 3 enrolled students
  const mapel1 = await MataPelajaran.create({
    kode: 'RPL_SUB',
    nama: 'Rekayasa Perangkat Lunak',
    kelompok: 'C',
  });
  mapel1Id = mapel1._id.toString();

  const kelas1 = await Kelas.create({
    nama: 'XII RPL A',
    tingkat: 'XII',
    program: 'RPL',
    tahunAjaranId: ta._id,
    siswaIds: [siswa1._id, siswa2._id, siswa3._id],
  });
  kelas1Id = kelas1._id.toString();

  // Pengampu for Guru 1
  await Pengampu.create({
    guruId: guru1._id,
    mataPelajaranId: mapel1._id,
    kelasId: kelas1._id,
    tahunAjaranId: ta._id,
    semesterId: smt._id,
    status: 'Aktif',
  });

  // Login tokens
  const resLogin1 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_sub_1', password: 'password123' });
  tokenGuru1 = resLogin1.body.data.token || resLogin1.body.data.accessToken;

  const resLogin2 = await request(app)
    .post('/api/v1/auth/login')
    .send({ username: 'guru_sub_2', password: 'password123' });
  tokenGuru2 = resLogin2.body.data.token || resLogin2.body.data.accessToken;

  // Deadline: tomorrow
  deadlineDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Create assignments
  const draftTask = await Tugas.create({
    guruId: guru1._id,
    kelasId: kelas1._id,
    mapelId: mapel1._id,
    judul: 'Tugas Draf Pertama',
    deskripsi: 'Deskripsi draf tugas',
    deadline: deadlineDate,
    maxScore: 100,
    status: 'draft',
    version: 1,
  });
  assignmentDraftId = draftTask._id.toString();

  const publishedTask = await Tugas.create({
    guruId: guru1._id,
    kelasId: kelas1._id,
    mapelId: mapel1._id,
    judul: 'Tugas Published Utama',
    deskripsi: 'Deskripsi tugas published',
    deadline: deadlineDate,
    maxScore: 100,
    status: 'published',
    version: 1,
    publishedAt: new Date(),
  });
  assignmentPublishedId = publishedTask._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('PHASE 2.5: GURU PENGUMPULAN TUGAS / SUBMISSION TEST SUITE', () => {
  let createdSubmissionId: string;

  describe('1. Security & Authorization Checks', () => {
    it('should return 401 UNAUTHORIZED when no token is provided', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`);

      expect(res.status).toBe(401);
    });

    it('should return 403 FORBIDDEN when accessed by a teacher who does not own the assignment', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru2}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('FORBIDDEN');
      expect(res.body.error.message).toContain('bukan milik Anda');
    });

    it('should return 404 NOT_FOUND when assignment does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${nonExistentId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('2. Empty State & Initial Roster Reconciliation', () => {
    it('should return 200 with 3 enrolled students, 0 submissions, and accurate initial stats', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.stats).toEqual({
        totalStudents: 3,
        submittedCount: 0,
        unsubmittedCount: 3,
        lateCount: 0,
        gradedCount: 0,
      });
      expect(res.body.data.length).toBe(3);
      expect(res.body.data[0].hasSubmitted).toBe(false);
      expect(res.body.data[0].submission).toBeNull();
      expect(res.body.assignment.judul).toBe('Tugas Published Utama');
      expect(res.body.assignment.kelas.nama).toBe('XII RPL A');
    });
  });

  describe('3. Submission Ingestion & Validation', () => {
    it('should reject submission with 400 if assignment is still in draft status', async () => {
      const res = await request(app)
        .post(`/api/v1/teachers/me/assignments/${assignmentDraftId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`)
        .send({
          siswaId: siswa1Id,
          files: [
            {
              name: 'tugas1.pdf',
              url: 'https://cdn.example.com/tugas1.pdf',
              mimeType: 'application/pdf',
              size: 2048,
            },
          ],
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('BAD_REQUEST');
      expect(res.body.error.message).toContain('belum dipublikasikan');
    });

    it('should reject submission with 400 if student is not enrolled in the class', async () => {
      const res = await request(app)
        .post(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`)
        .send({
          siswaId: externalSiswaId,
          files: [
            {
              name: 'ext.pdf',
              url: 'https://cdn.example.com/ext.pdf',
              mimeType: 'application/pdf',
              size: 1024,
            },
          ],
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('BAD_REQUEST');
      expect(res.body.error.message).toContain('tidak terdaftar pada kelas');
    });

    it('should successfully submit on time (isLate = false) for Siswa 1', async () => {
      const onTimeDate = new Date(deadlineDate.getTime() - 2 * 60 * 60 * 1000); // 2 hours before deadline
      const res = await request(app)
        .post(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`)
        .send({
          siswaId: siswa1Id,
          files: [
            {
              name: 'solusi-ahmad.pdf',
              url: 'https://cdn.example.com/solusi-ahmad.pdf',
              mimeType: 'application/pdf',
              size: 10240,
            },
          ],
          catatanSiswa: 'Selesai tepat waktu pak',
          submittedAt: onTimeDate,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('SUBMITTED');
      expect(res.body.data.isLate).toBe(false);
      expect(res.body.data.files.length).toBe(1);

      createdSubmissionId = res.body.data._id;
    });

    it('should successfully submit late (isLate = true) for Siswa 2', async () => {
      const lateDate = new Date(deadlineDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours after deadline
      const res = await request(app)
        .post(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`)
        .send({
          siswaId: siswa2Id,
          files: [
            {
              name: 'solusi-bunga.zip',
              url: 'https://cdn.example.com/solusi-bunga.zip',
              mimeType: 'application/zip',
              size: 51200,
            },
          ],
          catatanSiswa: 'Maaf terlambat karena kendala jaringan',
          submittedAt: lateDate,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('SUBMITTED');
      expect(res.body.data.isLate).toBe(true);
    });

    it('should update existing submission (upsert) without creating duplicate document when Siswa 1 resubmits', async () => {
      const res = await request(app)
        .post(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`)
        .send({
          siswaId: siswa1Id,
          files: [
            {
              name: 'solusi-ahmad-revisi.pdf',
              url: 'https://cdn.example.com/solusi-ahmad-revisi.pdf',
              mimeType: 'application/pdf',
              size: 15360,
            },
          ],
          catatanSiswa: 'Revisi berkas tugas',
          submittedAt: new Date(deadlineDate.getTime() - 1 * 60 * 60 * 1000),
        });

      expect(res.status).toBe(201);
      expect(res.body.data._id).toBe(createdSubmissionId);
      expect(res.body.data.files[0].name).toBe('solusi-ahmad-revisi.pdf');

      // Verify DB count remains exactly 2 submissions total
      const count = await PengumpulanTugas.countDocuments({ tugasId: assignmentPublishedId });
      expect(count).toBe(2);
    });
  });

  describe('4. Roster Reconciliation, Stats & Filtering', () => {
    it('should compute updated stats correctly: 3 total, 2 submitted, 1 unsubmitted, 1 late', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.stats).toEqual({
        totalStudents: 3,
        submittedCount: 2,
        unsubmittedCount: 1,
        lateCount: 1,
        gradedCount: 0,
      });
    });

    it('should filter roster by status=UNSUBMITTED returning only Citra Siswa', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?status=UNSUBMITTED`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].siswa.nama).toBe('Citra Siswa');
      expect(res.body.data[0].hasSubmitted).toBe(false);
    });

    it('should filter roster by status=SUBMITTED returning 2 submitted students', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?status=SUBMITTED`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data.every((item: any) => item.hasSubmitted === true)).toBe(true);
    });

    it('should filter roster by isLate=true returning only Bunga Siswa', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?isLate=true`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].siswa.nama).toBe('Bunga Siswa');
      expect(res.body.data[0].submission.isLate).toBe(true);
    });

    it('should search roster by student name keyword', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?search=Ahmad`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].siswa.nama).toBe('Ahmad Siswa');
    });

    it('should search roster by student NISN keyword', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?search=0011223346`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].siswa.nama).toBe('Citra Siswa');
    });

    it('should support pagination (page=1, limit=2)', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions?page=1&limit=2`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.pagination.total).toBe(3);
      expect(res.body.pagination.totalPages).toBe(2);
      expect(res.body.pagination.page).toBe(1);
    });
  });

  describe('5. Single Submission Detail Endpoint', () => {
    it('should return 200 with submission detail and student population', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions/${createdSubmissionId}`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(createdSubmissionId);
      expect(res.body.data.siswaId.nama).toBe('Ahmad Siswa');
      expect(res.body.data.files.length).toBe(1);
      expect(res.body.assignment.judul).toBe('Tugas Published Utama');
    });

    it('should return 404 if submissionId does not exist', async () => {
      const nonExistentSubId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions/${nonExistentSubId}`)
        .set('Authorization', `Bearer ${tokenGuru1}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('should return 403 if requested by unauthorized teacher', async () => {
      const res = await request(app)
        .get(`/api/v1/teachers/me/assignments/${assignmentPublishedId}/submissions/${createdSubmissionId}`)
        .set('Authorization', `Bearer ${tokenGuru2}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
