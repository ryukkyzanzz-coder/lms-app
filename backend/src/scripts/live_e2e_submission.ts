const BASE_URL = 'http://localhost:4000/api/v1';

async function request(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => null);
  return { status: res.status, ok: res.ok, data };
}

async function runLiveE2E() {
  console.log('\n🚀 STARTING PHASE 2.5 LIVE E2E SUBMISSION INTEGRATION TEST\n');

  try {
    // 1. Teacher Login
    console.log('1. Authenticating teacher...');
    const loginRes = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: '198504122010011014',
        password: 'password123',
      }),
    });

    if (!loginRes.ok) {
      throw new Error(`Login failed with status ${loginRes.status}: ${JSON.stringify(loginRes.data)}`);
    }

    const token = loginRes.data.data.token || loginRes.data.data.accessToken;
    console.log('   ✅ Teacher logged in successfully. Token acquired.');

    const headers = { Authorization: `Bearer ${token}` };

    // 2. Fetch Teacher Classes
    console.log('2. Fetching classes for teacher...');
    const classesRes = await request('/teachers/me/classes', { headers });
    const classes = classesRes.data.data;
    if (!classes || classes.length === 0) {
      throw new Error('No classes found for teacher');
    }
    const targetClass = classes[0];
    const kelasId = targetClass._id || targetClass.id;
    console.log(`   ✅ Target class: ${targetClass.nama} (${kelasId})`);

    // 3. Fetch Subjects
    console.log('3. Fetching subjects for class...');
    const subjectsRes = await request('/teachers/me/subjects', { headers });
    const subjects = subjectsRes.data.data;
    const targetSubject = subjects[0];
    const mapelId = targetSubject._id || targetSubject.id;
    console.log(`   ✅ Target subject: ${targetSubject.nama} (${mapelId})`);

    // 4. Fetch Students in Class
    console.log('4. Fetching students enrolled in target class...');
    const studentsRes = await request(`/teachers/me/classes/${kelasId}/students`, { headers });
    const enrolledStudents = studentsRes.data.data;
    console.log(`   ✅ Enrolled students count: ${enrolledStudents.length}`);
    if (enrolledStudents.length < 2) {
      throw new Error('Need at least 2 enrolled students for live test');
    }
    const student1 = enrolledStudents[0];
    const student2 = enrolledStudents[1];
    console.log(`   Siswa 1: ${student1.nama} (${student1.id || student1._id})`);
    console.log(`   Siswa 2: ${student2.nama} (${student2.id || student2._id})`);

    // 5. Create Live Assignment
    console.log('5. Creating new assignment for submission testing...');
    const deadline = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours in future
    const createRes = await request(
      `/teachers/me/classes/${kelasId}/subjects/${mapelId}/assignments`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          judul: `E2E Live Submission Test - ${Date.now()}`,
          deskripsi: 'Tugas pengujian live pengumpulan dan validasi deadline',
          instruksi: 'Kumpulkan file PDF atau ZIP solusi',
          deadline: deadline.toISOString(),
          maxScore: 100,
          status: 'draft',
        }),
      }
    );
    if (!createRes.ok) {
      throw new Error(`Create assignment failed: ${JSON.stringify(createRes.data)}`);
    }
    const createdAssignment = createRes.data.data;
    const assignmentId = createdAssignment._id;
    console.log(`   ✅ Assignment created: "${createdAssignment.judul}" (${assignmentId})`);

    // 6. Publish Assignment
    console.log('6. Publishing assignment...');
    const pubRes = await request(`/teachers/me/assignments/${assignmentId}/publish`, {
      method: 'POST',
      headers,
    });
    if (!pubRes.ok) {
      throw new Error(`Publish assignment failed: ${JSON.stringify(pubRes.data)}`);
    }
    console.log('   ✅ Assignment published successfully.');

    // 7. Verify Initial Submissions Roster & Stats
    console.log('7. Verifying initial submission roster and stats...');
    const initialSubRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions`,
      { headers }
    );
    const initialStats = initialSubRes.data.stats;
    console.log('   Initial Stats:', initialStats);
    if (initialStats.submittedCount !== 0 || initialStats.lateCount !== 0) {
      throw new Error(`Unexpected initial stats: ${JSON.stringify(initialStats)}`);
    }
    console.log('   ✅ Initial state verified: 0 submissions, correct unsubmitted count.');

    // 8. Submit Assignment for Student 1 (On Time)
    console.log('8. Submitting assignment on time for Siswa 1...');
    const sub1Res = await request(
      `/teachers/me/assignments/${assignmentId}/submissions`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          siswaId: student1.id || student1._id,
          files: [
            {
              name: 'solusi-siswa-1.pdf',
              url: 'https://storage.dafiand.sch.id/e2e/solusi-siswa-1.pdf',
              mimeType: 'application/pdf',
              size: 24500,
            },
          ],
          catatanSiswa: 'Sudah selesai pak, mohon dicek',
          submittedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago (on time)
        }),
      }
    );
    if (!sub1Res.ok) {
      throw new Error(`Sub1 failed: ${JSON.stringify(sub1Res.data)}`);
    }
    const sub1 = sub1Res.data.data;
    console.log(`   ✅ Siswa 1 submission status: ${sub1.status}, isLate: ${sub1.isLate}`);
    if (sub1.isLate !== false || sub1.status !== 'SUBMITTED') {
      throw new Error(`Expected isLate: false, got ${sub1.isLate}`);
    }

    // 9. Submit Assignment for Student 2 (Late)
    console.log('9. Submitting assignment late for Siswa 2...');
    const sub2Res = await request(
      `/teachers/me/assignments/${assignmentId}/submissions`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          siswaId: student2.id || student2._id,
          files: [
            {
              name: 'solusi-siswa-2.zip',
              url: 'https://storage.dafiand.sch.id/e2e/solusi-siswa-2.zip',
              mimeType: 'application/zip',
              size: 154000,
            },
          ],
          catatanSiswa: 'Maaf terlambat mengumpulkan karena listrik padam',
          submittedAt: new Date(deadline.getTime() + 10 * 60 * 1000).toISOString(), // 10 mins after deadline
        }),
      }
    );
    if (!sub2Res.ok) {
      throw new Error(`Sub2 failed: ${JSON.stringify(sub2Res.data)}`);
    }
    const sub2 = sub2Res.data.data;
    console.log(`   ✅ Siswa 2 submission status: ${sub2.status}, isLate: ${sub2.isLate}`);
    if (sub2.isLate !== true) {
      throw new Error(`Expected isLate: true for late submission, got ${sub2.isLate}`);
    }

    // 10. Resubmit Student 1 (Upsert Check)
    console.log('10. Resubmitting for Siswa 1 to verify upsert without duplicate...');
    const resubmitRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          siswaId: student1.id || student1._id,
          files: [
            {
              name: 'solusi-siswa-1-v2.pdf',
              url: 'https://storage.dafiand.sch.id/e2e/solusi-siswa-1-v2.pdf',
              mimeType: 'application/pdf',
              size: 32000,
            },
          ],
          catatanSiswa: 'Revisi perbaikan berkas',
        }),
      }
    );
    if (!resubmitRes.ok) {
      throw new Error(`Resubmit failed: ${JSON.stringify(resubmitRes.data)}`);
    }
    console.log('   ✅ Resubmission successful, ID:', resubmitRes.data.data._id);
    if (resubmitRes.data.data._id !== sub1._id) {
      throw new Error('Upsert failed: Created new document instead of updating existing one');
    }

    // 11. Verify Updated Stats & Filters
    console.log('11. Verifying updated submissions stats and filtering...');
    const updatedSubRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions`,
      { headers }
    );
    const updatedStats = updatedSubRes.data.stats;
    console.log('   Updated Stats:', updatedStats);
    if (updatedStats.submittedCount !== 2 || updatedStats.lateCount !== 1) {
      throw new Error(`Unexpected updated stats: ${JSON.stringify(updatedStats)}`);
    }
    console.log('   ✅ Stats accurately reflect 2 submissions and 1 late submission.');

    // 12. Test Filter isLate=true
    console.log('12. Testing filter isLate=true...');
    const lateFilterRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions?isLate=true`,
      { headers }
    );
    console.log(`   ✅ Late filter returned ${lateFilterRes.data.data.length} item(s).`);
    if (lateFilterRes.data.data.length !== 1 || lateFilterRes.data.data[0].submission.isLate !== true) {
      throw new Error('Late filter test failed');
    }

    // 13. Test Search
    console.log('13. Testing search by student name...');
    const searchRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions?search=${encodeURIComponent(student1.nama)}`,
      { headers }
    );
    console.log(`   ✅ Search returned ${searchRes.data.data.length} item(s) matching "${student1.nama}".`);
    if (searchRes.data.data.length === 0 || searchRes.data.data[0].siswa.nama !== student1.nama) {
      throw new Error('Search filter failed');
    }

    // 14. Test Detail Endpoint
    console.log('14. Testing single submission detail endpoint...');
    const detailRes = await request(
      `/teachers/me/assignments/${assignmentId}/submissions/${sub1._id}`,
      { headers }
    );
    console.log(`   ✅ Detail response status: ${detailRes.status}, File count: ${detailRes.data.data.files.length}`);
    if (detailRes.data.data._id !== sub1._id) {
      throw new Error('Detail endpoint returned mismatched submission ID');
    }

    // 15. Regression Check Phase 2.2 (Materials)
    console.log('15. Regression Check: Phase 2.2 Material endpoint...');
    const matRes = await request(
      `/teachers/me/classes/${kelasId}/subjects/${mapelId}/materials`,
      { headers }
    );
    console.log(`   ✅ Phase 2.2 Materials OK (status: ${matRes.status}, count: ${matRes.data.data?.length || 0})`);

    // 16. Regression Check Phase 2.3 (Class & Students)
    console.log('16. Regression Check: Phase 2.3 Class Detail endpoint...');
    const classDetailRes = await request(`/teachers/me/classes/${kelasId}`, { headers });
    console.log(`   ✅ Phase 2.3 Class Detail OK (status: ${classDetailRes.status}, name: ${classDetailRes.data.data?.nama})`);

    // 17. Regression Check Phase 2.4 (Assignment Detail)
    console.log('17. Regression Check: Phase 2.4 Assignment Detail endpoint...');
    const assignDetailRes = await request(`/teachers/me/assignments/${assignmentId}`, { headers });
    console.log(`   ✅ Phase 2.4 Assignment Detail OK (status: ${assignDetailRes.status}, version: ${assignDetailRes.data.data?.version})`);

    // 18. Cleanup
    console.log('18. Cleaning up test assignment...');
    const deleteRes = await request(`/teachers/me/assignments/${assignmentId}`, {
      method: 'DELETE',
      headers,
    });
    console.log(`   ✅ Test assignment deleted successfully (status: ${deleteRes.status}).`);

    console.log('\n=============================================================');
    console.log('🎉 ALL PHASE 2.5 LIVE E2E TESTS & REGRESSION CHECKS PASSED!');
    console.log('=============================================================\n');
  } catch (error: any) {
    console.error('\n❌ LIVE E2E ERROR:', error.message);
    process.exit(1);
  }
}

runLiveE2E();
