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
import { Siswa } from '../src/modules/core/model/Siswa';

import { MongoMemoryServer } from 'mongodb-memory-server';

let tokenGuru1: string;
let guru1Id: string;
let kelas1Id: string;
let kelas2Id: string;
let mongoServer: MongoMemoryServer;

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

  const user1 = await User.create({ username: 'guru1', passwordHash: 'password123', role: Role.GURU });
  const guru1 = await Guru.create({ userId: user1._id, nip: 'GURU1', nama: 'Guru Satu' });
  guru1Id = guru1._id.toString();

  const user2 = await User.create({ username: 'guru2', passwordHash: 'password123', role: Role.GURU });
  const guru2 = await Guru.create({ userId: user2._id, nip: 'GURU2', nama: 'Guru Dua' });

  const ta = await TahunAjaran.create({ nama: '2026/2027', tahunMulai: 2026, tahunSelesai: 2027, status: 'Aktif' });
  const smt = await Semester.create({ tahunAjaranId: ta._id, nama: 'Ganjil', status: 'Aktif' });
  
  const mapel = await MataPelajaran.create({ kode: 'M1', nama: 'Mapel 1', kelompok: 'A' });

  const kelas1 = await Kelas.create({ nama: 'Kelas 1', tingkat: 'X', program: 'RPL', tahunAjaranId: ta._id, siswaIds: [] });
  kelas1Id = kelas1._id.toString();

  const kelas2 = await Kelas.create({ nama: 'Kelas 2', tingkat: 'X', program: 'RPL', tahunAjaranId: ta._id, siswaIds: [] });
  kelas2Id = kelas2._id.toString();

  await Pengampu.create({ guruId: guru1._id, mataPelajaranId: mapel._id, kelasId: kelas1._id, tahunAjaranId: ta._id, semesterId: smt._id });

  // Get token
  const res = await request(app).post('/api/v1/auth/login').send({ username: 'guru1', password: 'password123' });
  if (!res.body.data) console.log(res.body);
  tokenGuru1 = res.body.data.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Guru API', () => {
  it('1. Health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('2. GET /teachers/me', async () => {
    const res = await request(app).get('/api/v1/teachers/me').set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(200);
    expect(res.body.data.nip).toBe('GURU1');
    expect(res.body.data._id).toBe(guru1Id);
  });

  it('3. GET /teachers/me/classes', async () => {
    const res = await request(app).get('/api/v1/teachers/me/classes').set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].nama).toBe('Kelas 1');
  });

  it('4. Guru dapat mengakses kelas yang diampu', async () => {
    const res = await request(app).get(`/api/v1/classes/${kelas1Id}`).set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(200);
    expect(res.body.data.nama).toBe('Kelas 1');
  });

  it('5. Guru tidak dapat mengakses kelas Guru lain', async () => {
    const res = await request(app).get(`/api/v1/classes/${kelas2Id}`).set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('6. Invalid ObjectId', async () => {
    const res = await request(app).get(`/api/v1/classes/invalidid`).set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('INVALID_ID');
  });

  it('7. Unauthorized request', async () => {
    const res = await request(app).get(`/api/v1/teachers/me`);
    expect(res.status).toBe(401);
  });

  it('8. GET /teachers/me/assignments (regression test for MissingSchemaError)', async () => {
    const res = await request(app).get('/api/v1/teachers/me/assignments').set('Authorization', `Bearer ${tokenGuru1}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].kelasId).toBeDefined();
    expect(res.body.data[0].kelasId.nama).toBe('Kelas 1');
    expect(res.body.data[0].mataPelajaranId).toBeDefined();
    expect(res.body.data[0].mataPelajaranId.kode).toBe('M1');
    expect(res.body.data[0].tahunAjaranId).toBeDefined();
    expect(res.body.data[0].tahunAjaranId.nama).toBe('2026/2027');
    expect(res.body.data[0].semesterId).toBeDefined();
    expect(res.body.data[0].semesterId.nama).toBe('Ganjil');
  });
});
