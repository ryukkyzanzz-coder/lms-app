import mongoose from 'mongoose';
import { PengumpulanTugas, IPengumpulanTugasDocument } from './model/PengumpulanTugas';
import { Tugas } from '../assignment/model/Tugas';
import { Guru } from '../core/model/Guru';
import { Pengampu } from '../core/model/Pengampu';
import { Kelas } from '../core/model/Kelas';
import { Siswa } from '../core/model/Siswa';
import { MataPelajaran } from '../core/model/MataPelajaran';
import { Nilai } from '../core/model/Nilai';
import { AppError } from '../../shared/errors/AppError';

export interface IListSubmissionsQuery {
  search?: string;
  status?: 'ALL' | 'SUBMITTED' | 'GRADED' | 'RESUBMITTED' | 'UNSUBMITTED';
  isLate?: 'ALL' | 'true' | 'false';
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ISubmitAssignmentInput {
  siswaId: string;
  files?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];
  linkUrl?: string;
  catatanSiswa?: string;
  submittedAt?: Date;
}

export class SubmissionService {
  /**
   * Helper to verify that the assignment exists, belongs to the authenticated teacher,
   * and the teacher has active teaching authorization for the assignment's class & subject.
   */
  static async verifyTeacherOwnsAssignment(userId: string, assignmentId: string) {
    const guru = await Guru.findOne({ userId });
    if (!guru) {
      throw new AppError('Profil Guru tidak ditemukan', 404, 'NOT_FOUND');
    }

    const assignment = await Tugas.findById(assignmentId);
    if (!assignment) {
      throw new AppError('Tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    if (assignment.guruId.toString() !== guru._id.toString()) {
      throw new AppError('Akses ditolak: Tugas ini bukan milik Anda', 403, 'FORBIDDEN');
    }

    const pengampu = await Pengampu.findOne({
      guruId: guru._id,
      kelasId: assignment.kelasId,
      mataPelajaranId: assignment.mapelId,
      status: 'Aktif',
    });

    if (!pengampu) {
      throw new AppError(
        'Akses ditolak: Penugasan mengajar Anda untuk kelas/mapel tugas ini sudah tidak aktif',
        403,
        'FORBIDDEN'
      );
    }

    return { guru, assignment, pengampu };
  }

  /**
   * List submissions for a specific assignment with full class roster reconciliation,
   * metrics breakdown (total, submitted, unsubmitted, late, graded), searching, and pagination.
   */
  static async listSubmissions(userId: string, assignmentId: string, query: IListSubmissionsQuery) {
    const { assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    // Retrieve class and subject metadata for context
    const [kelas, mapel] = await Promise.all([
      Kelas.findById(assignment.kelasId),
      MataPelajaran.findById(assignment.mapelId),
    ]);

    const enrolledSiswaIds = kelas?.siswaIds || [];
    const totalStudents = enrolledSiswaIds.length;

    // Fetch all enrolled students details
    const enrolledStudents = await Siswa.find({
      _id: { $in: enrolledSiswaIds },
    }).lean();

    // Fetch all submissions for this assignment
    const allSubmissions = await PengumpulanTugas.find({
      tugasId: assignment._id,
    }).lean();

    // Compute stats
    const submittedCount = allSubmissions.length;
    const unsubmittedCount = Math.max(0, totalStudents - submittedCount);
    const lateCount = allSubmissions.filter((s) => s.isLate === true).length;
    const gradedCount = allSubmissions.filter((s) => s.status === 'GRADED').length;

    const stats = {
      totalStudents,
      submittedCount,
      unsubmittedCount,
      lateCount,
      gradedCount,
    };

    // Map submissions by siswaId for O(1) lookup
    const submissionMap = new Map<string, any>();
    for (const sub of allSubmissions) {
      submissionMap.set(sub.siswaId.toString(), sub);
    }

    // Build unified student roster
    let roster = enrolledStudents.map((siswa) => {
      const sub = submissionMap.get(siswa._id.toString());
      return {
        siswa: {
          _id: siswa._id,
          nama: siswa.nama,
          nisn: siswa.nisn,
          jenisKelamin: siswa.jenisKelamin,
          status: siswa.status,
        },
        hasSubmitted: !!sub,
        submission: sub
          ? {
              _id: sub._id,
              tugasId: sub.tugasId,
              status: sub.status,
              isLate: sub.isLate,
              submittedAt: sub.submittedAt,
              files: sub.files,
              linkUrl: sub.linkUrl,
              catatanSiswa: sub.catatanSiswa,
              nilai: sub.nilai,
              catatanGuru: sub.catatanGuru,
              gradedAt: sub.gradedAt,
              createdAt: sub.createdAt,
              updatedAt: sub.updatedAt,
            }
          : null,
      };
    });

    // Apply search filter (nama or nisn)
    if (query.search) {
      const q = query.search.trim().toLowerCase();
      roster = roster.filter(
        (item) =>
          item.siswa.nama.toLowerCase().includes(q) ||
          item.siswa.nisn.toLowerCase().includes(q)
      );
    }

    // Apply status filter
    if (query.status && query.status !== 'ALL') {
      if (query.status === 'UNSUBMITTED') {
        roster = roster.filter((item) => !item.hasSubmitted);
      } else {
        roster = roster.filter(
          (item) => item.submission && item.submission.status === query.status
        );
      }
    }

    // Apply isLate filter
    if (query.isLate && query.isLate !== 'ALL') {
      const wantLate = query.isLate === 'true';
      roster = roster.filter(
        (item) => item.submission && item.submission.isLate === wantLate
      );
    }

    // Sorting
    const sort = query.sort || 'submittedAt:desc';
    roster.sort((a, b) => {
      if (sort === 'nama:asc') {
        return a.siswa.nama.localeCompare(b.siswa.nama);
      }
      if (sort === 'nama:desc') {
        return b.siswa.nama.localeCompare(a.siswa.nama);
      }
      if (sort === 'submittedAt:asc') {
        const timeA = a.submission?.submittedAt ? new Date(a.submission.submittedAt).getTime() : 0;
        const timeB = b.submission?.submittedAt ? new Date(b.submission.submittedAt).getTime() : 0;
        return timeA - timeB;
      }
      // default: submittedAt:desc
      const timeA = a.submission?.submittedAt ? new Date(a.submission.submittedAt).getTime() : 0;
      const timeB = b.submission?.submittedAt ? new Date(b.submission.submittedAt).getTime() : 0;
      return timeB - timeA;
    });

    // Pagination
    const page = query.page || 1;
    const limit = query.limit || 20;
    const total = roster.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedRoster = roster.slice(startIndex, startIndex + limit);

    return {
      assignment: {
        id: assignment._id,
        judul: assignment.judul,
        deskripsi: assignment.deskripsi,
        deadline: assignment.deadline,
        maxScore: assignment.maxScore,
        status: assignment.status,
        version: assignment.version,
        kelas: {
          id: assignment.kelasId,
          nama: kelas?.nama || 'Unknown Kelas',
        },
        mapel: {
          id: assignment.mapelId,
          nama: mapel?.nama || 'Unknown Mapel',
        },
      },
      stats,
      data: paginatedRoster,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Get single submission detail
   */
  static async getSubmissionDetail(userId: string, assignmentId: string, submissionId: string) {
    const { assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    const submission = await PengumpulanTugas.findOne({
      _id: submissionId,
      tugasId: assignment._id,
    }).populate('siswaId');

    if (!submission) {
      throw new AppError('Pengumpulan tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    const [kelas, mapel] = await Promise.all([
      Kelas.findById(assignment.kelasId),
      MataPelajaran.findById(assignment.mapelId),
    ]);

    return {
      submission,
      assignment: {
        id: assignment._id,
        judul: assignment.judul,
        deadline: assignment.deadline,
        maxScore: assignment.maxScore,
        status: assignment.status,
        kelas: {
          id: assignment.kelasId,
          nama: kelas?.nama || 'Unknown Kelas',
        },
        mapel: {
          id: assignment.mapelId,
          nama: mapel?.nama || 'Unknown Mapel',
        },
      },
    };
  }

  /**
   * Submit an assignment (used for simulated student submissions and integration testing).
   * Determines isLate based on submittedAt > assignment.deadline.
   * Upserts the submission document per student per task.
   */
  static async submitTask(assignmentId: string, input: ISubmitAssignmentInput) {
    const assignment = await Tugas.findById(assignmentId);
    if (!assignment) {
      throw new AppError('Tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    if (assignment.status !== 'published') {
      throw new AppError(
        'Tugas belum dipublikasikan atau sudah ditutup, tidak dapat mengumpulkan',
        400,
        'BAD_REQUEST'
      );
    }

    const siswa = await Siswa.findById(input.siswaId);
    if (!siswa) {
      throw new AppError('Data Siswa tidak ditemukan', 404, 'NOT_FOUND');
    }

    // Verify student is enrolled in class
    const kelas = await Kelas.findById(assignment.kelasId);
    if (!kelas || !kelas.siswaIds.some((id) => id.toString() === input.siswaId)) {
      throw new AppError('Siswa tidak terdaftar pada kelas tugas ini', 400, 'BAD_REQUEST');
    }

    const submittedAt = input.submittedAt ? new Date(input.submittedAt) : new Date();
    const isLate = submittedAt.getTime() > new Date(assignment.deadline).getTime();

    // Check if previously submitted
    const existingSubmission = await PengumpulanTugas.findOne({
      tugasId: assignment._id,
      siswaId: siswa._id,
    });

    let submission: IPengumpulanTugasDocument;

    if (existingSubmission) {
      if (input.files) existingSubmission.files = input.files;
      if (input.linkUrl !== undefined) existingSubmission.linkUrl = input.linkUrl;
      if (input.catatanSiswa !== undefined) existingSubmission.catatanSiswa = input.catatanSiswa;
      existingSubmission.submittedAt = submittedAt;
      existingSubmission.isLate = isLate;
      existingSubmission.status = existingSubmission.status === 'GRADED' ? 'RESUBMITTED' : 'SUBMITTED';
      await existingSubmission.save();
      submission = existingSubmission;
    } else {
      submission = await PengumpulanTugas.create({
        tugasId: assignment._id,
        siswaId: siswa._id,
        status: 'SUBMITTED',
        isLate,
        submittedAt,
        files: input.files || [],
        linkUrl: input.linkUrl,
        catatanSiswa: input.catatanSiswa,
      });
    }

    return submission;
  }

  /**
   * Grade a submission (Teacher only).
   * Updates PengumpulanTugas and upserts Nilai document for cross-role grade synchronization.
   */
  static async gradeSubmission(
    userId: string,
    assignmentId: string,
    submissionId: string,
    input: { nilai: number; catatanGuru?: string }
  ) {
    const { guru, assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    const submission = await PengumpulanTugas.findOne({
      _id: submissionId,
      tugasId: assignment._id,
    });

    if (!submission) {
      throw new AppError('Pengumpulan tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    if (input.nilai < 0 || (assignment.maxScore && input.nilai > assignment.maxScore)) {
      throw new AppError(
        `Nilai harus berada di antara 0 dan ${assignment.maxScore || 100}`,
        400,
        'INVALID_SCORE'
      );
    }

    submission.nilai = input.nilai;
    submission.catatanGuru = input.catatanGuru;
    submission.gradedAt = new Date();
    submission.gradedBy = guru._id;
    submission.status = 'GRADED';
    await submission.save();

    // Synchronize to Nilai collection for permanent academic grading source of truth
    await Nilai.findOneAndUpdate(
      { tugasId: assignment._id, siswaId: submission.siswaId },
      {
        tugasId: assignment._id,
        siswaId: submission.siswaId,
        guruId: guru._id,
        pengumpulanId: submission._id,
        nilai: input.nilai,
        feedback: input.catatanGuru,
        gradedAt: new Date(),
        $inc: { version: 1 },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return submission;
  }
}
