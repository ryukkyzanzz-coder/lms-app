import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { User, Role } from '../src/modules/core/model/User';
import { Guru } from '../src/modules/core/model/Guru';
import { Siswa } from '../src/modules/core/model/Siswa';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

jest.setTimeout(30000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await User.deleteMany({});
  await Guru.deleteMany({});
  await Siswa.deleteMany({});

  // 1. Guru
  const userGuru = await User.create({
    username: '198504122010011014',
    passwordHash: 'password123',
    role: Role.GURU,
  });
  await Guru.create({
    userId: userGuru._id,
    nip: '198504122010011014',
    nama: 'Budi Pratama, S.Kom.',
  });

  // 2. Siswa
  const userSiswa = await User.create({
    username: '0061234567',
    passwordHash: 'password123',
    role: Role.SISWA,
  });
  await Siswa.create({
    userId: userSiswa._id,
    nisn: '0061234567',
    nama: 'Dafiand',
  });

  // 3. Admin
  await User.create({
    username: 'admin',
    passwordHash: 'password123',
    role: Role.ADMIN,
  });

  // 4. Kepala Sekolah
  await User.create({
    username: '196803151993031004',
    passwordHash: 'password123',
    role: Role.KEPALA_SEKOLAH,
  });

  // 5. Kurikulum
  await User.create({
    username: '197508202000121002',
    passwordHash: 'password123',
    role: Role.KURIKULUM,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Phase 1 — Multi-Role Authentication & Authorization Suite', () => {
  let tokenGuru: string;
  let tokenSiswa: string;
  let tokenAdmin: string;
  let tokenKepsek: string;
  let tokenKurikulum: string;

  it('1. Guru login succeeds with Role.GURU and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '198504122010011014', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe(Role.GURU);
    expect(res.body.data.user.profile.nama).toBe('Budi Pratama, S.Kom.');

    tokenGuru = res.body.data.accessToken;
  });

  it('2. Siswa login succeeds with Role.SISWA and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '0061234567', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe(Role.SISWA);
    expect(res.body.data.user.profile.nama).toBe('Dafiand');

    tokenSiswa = res.body.data.accessToken;
  });

  it('3. Admin login succeeds with Role.ADMIN and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'admin', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe(Role.ADMIN);
    expect(res.body.data.user.profile.roleSub).toBe('Kepala Tata Usaha');

    tokenAdmin = res.body.data.accessToken;
  });

  it('4. Kepala Sekolah login succeeds with Role.KEPALA_SEKOLAH and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '196803151993031004', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe(Role.KEPALA_SEKOLAH);
    expect(res.body.data.user.profile.nama).toBe('Drs. H. Wardoyo, M.Pd.');

    tokenKepsek = res.body.data.accessToken;
  });

  it('5. Kurikulum login succeeds with Role.KURIKULUM and profile', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: '197508202000121002', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.role).toBe(Role.KURIKULUM);
    expect(res.body.data.user.profile.roleSub).toBe('Waka Kurikulum');

    tokenKurikulum = res.body.data.accessToken;
  });

  it('6. Invalid credentials rejected with 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'admin', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('7. GET /api/v1/auth/me returns current user for all roles', async () => {
    // Check Guru
    const resGuru = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${tokenGuru}`);
    expect(resGuru.status).toBe(200);
    expect(resGuru.body.data.user.role).toBe(Role.GURU);

    // Check Siswa
    const resSiswa = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${tokenSiswa}`);
    expect(resSiswa.status).toBe(200);
    expect(resSiswa.body.data.user.role).toBe(Role.SISWA);

    // Check Admin
    const resAdmin = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(resAdmin.status).toBe(200);
    expect(resAdmin.body.data.user.role).toBe(Role.ADMIN);

    // Check Kepsek
    const resKepsek = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${tokenKepsek}`);
    expect(resKepsek.status).toBe(200);
    expect(resKepsek.body.data.user.role).toBe(Role.KEPALA_SEKOLAH);

    // Check Kurikulum
    const resKurikulum = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${tokenKurikulum}`);
    expect(resKurikulum.status).toBe(200);
    expect(resKurikulum.body.data.user.role).toBe(Role.KURIKULUM);
  });

  it('8. GET /api/v1/auth/me without token returns 401', async () => {
    const res = await request(app).get('/api/v1/auth/me');
    expect(res.status).toBe(401);
  });

  it('9. Cross-role enforcement: Siswa and Admin cannot access /api/v1/teachers/me (403)', async () => {
    const resSiswaToGuru = await request(app)
      .get('/api/v1/teachers/me')
      .set('Authorization', `Bearer ${tokenSiswa}`);
    expect(resSiswaToGuru.status).toBe(403);

    const resAdminToGuru = await request(app)
      .get('/api/v1/teachers/me')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(resAdminToGuru.status).toBe(403);
  });

  it('10. Guru CAN access /api/v1/teachers/me (200)', async () => {
    const res = await request(app)
      .get('/api/v1/teachers/me')
      .set('Authorization', `Bearer ${tokenGuru}`);
    expect(res.status).toBe(200);
    expect(res.body.data.nama).toBe('Budi Pratama, S.Kom.');
  });
});
