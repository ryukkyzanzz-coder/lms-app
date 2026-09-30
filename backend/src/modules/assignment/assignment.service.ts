import mongoose from 'mongoose';
import { Tugas, ITugasDocument } from './model/Tugas';
import { Guru } from '../core/model/Guru';
import { Pengampu } from '../core/model/Pengampu';
import { Bab } from '../core/model/Bab';
import { AppError } from '../../shared/errors/AppError';

export interface IListAssignmentsQuery {
  search?: string;
  babId?: string;
  status?: 'draft' | 'published' | 'closed';
  deadlineFrom?: string;
  deadlineTo?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ICreateAssignmentInput {
  judul: string;
  deskripsi: string;
  instruksi?: string;
  babId?: string;
  deadline: Date;
  maxScore?: number;
  status?: 'draft' | 'published' | 'closed';
  lampiran?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];
}

export interface IUpdateAssignmentInput {
  version: number;
  judul?: string;
  deskripsi?: string;
  instruksi?: string;
  babId?: string;
  deadline?: Date;
  maxScore?: number;
  status?: 'draft' | 'published' | 'closed';
  lampiran?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];
}

export class AssignmentService {
  /**
   * Helper to verify that the authenticated teacher is actively assigned
   * to teach the specified class and subject.
   */
  static async verifyTeacherTeaching(userId: string, kelasId: string, mapelId: string) {
    const guru = await Guru.findOne({ userId });
    if (!guru) {
      throw new AppError('Profil Guru tidak ditemukan', 404, 'NOT_FOUND');
    }

    const pengampu = await Pengampu.findOne({
      guruId: guru._id,
      kelasId: new mongoose.Types.ObjectId(kelasId),
      mataPelajaranId: new mongoose.Types.ObjectId(mapelId),
      status: 'Aktif',
    });

    if (!pengampu) {
      throw new AppError(
        'Akses ditolak: Anda tidak memiliki penugasan mengajar aktif untuk kelas dan mata pelajaran ini',
        403,
        'FORBIDDEN'
      );
    }

    return { guru, pengampu };
  }

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

    // Also verify active pengampu authorization for this class & subject
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
   * List assignments for a specific class and subject taught by the teacher.
   */
  static async listAssignments(
    userId: string,
    kelasId: string,
    mapelId: string,
    query: IListAssignmentsQuery
  ) {
    const { guru } = await this.verifyTeacherTeaching(userId, kelasId, mapelId);

    const filter: Record<string, any> = {
      guruId: guru._id,
      kelasId: new mongoose.Types.ObjectId(kelasId),
      mapelId: new mongoose.Types.ObjectId(mapelId),
    };

    if (query.status) {
      filter.status = query.status;
    }

    if (query.babId) {
      filter.babId = new mongoose.Types.ObjectId(query.babId);
    }

    if (query.search && query.search.trim()) {
      const searchRegex = new RegExp(query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.judul = { $regex: searchRegex };
    }

    if (query.deadlineFrom || query.deadlineTo) {
      filter.deadline = {};
      if (query.deadlineFrom) {
        filter.deadline.$gte = new Date(query.deadlineFrom);
      }
      if (query.deadlineTo) {
        filter.deadline.$lte = new Date(query.deadlineTo);
      }
    }

    const page = Math.max(1, query.page || 1);
    const limit = Math.min(50, Math.max(1, query.limit || 10));
    const skip = (page - 1) * limit;

    // Sorting definition
    let sortOptions: Record<string, any> = { deadline: 1 };
    if (query.sort) {
      if (query.sort === 'deadline:desc' || query.sort === '-deadline') {
        sortOptions = { deadline: -1 };
      } else if (query.sort === 'deadline:asc' || query.sort === 'deadline') {
        sortOptions = { deadline: 1 };
      } else if (query.sort === 'createdAt:desc' || query.sort === '-createdAt') {
        sortOptions = { createdAt: -1 };
      } else if (query.sort === 'createdAt:asc' || query.sort === 'createdAt') {
        sortOptions = { createdAt: 1 };
      } else if (query.sort === 'judul:asc' || query.sort === 'judul') {
        sortOptions = { judul: 1 };
      }
    }

    const [total, data] = await Promise.all([
      Tugas.countDocuments(filter),
      Tugas.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('babId', 'judul urutan')
        .populate('kelasId', 'nama tingkat')
        .populate('mapelId', 'nama kode')
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  /**
   * Get single assignment detail by ID.
   */
  static async getAssignmentDetail(userId: string, assignmentId: string) {
    const { assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    const populated = await Tugas.findById(assignment._id)
      .populate('babId', 'judul urutan')
      .populate('kelasId', 'nama tingkat')
      .populate('mapelId', 'nama kode')
      .lean();

    return populated || assignment;
  }

  /**
   * Create new assignment.
   */
  static async createAssignment(
    userId: string,
    kelasId: string,
    mapelId: string,
    input: ICreateAssignmentInput
  ) {
    const { guru, pengampu } = await this.verifyTeacherTeaching(userId, kelasId, mapelId);

    // If babId is provided, verify it belongs to this teaching assignment
    if (input.babId) {
      const bab = await Bab.findOne({
        _id: new mongoose.Types.ObjectId(input.babId),
        pengampuId: pengampu._id,
      });
      if (!bab) {
        throw new AppError('Bab yang dipilih tidak valid untuk penugasan ini', 400, 'BAD_REQUEST');
      }
    }

    const status = input.status || 'draft';
    const publishedAt = status === 'published' ? new Date() : undefined;

    const newAssignment = await Tugas.create({
      guruId: guru._id,
      kelasId: new mongoose.Types.ObjectId(kelasId),
      mapelId: new mongoose.Types.ObjectId(mapelId),
      babId: input.babId ? new mongoose.Types.ObjectId(input.babId) : undefined,
      judul: input.judul,
      deskripsi: input.deskripsi,
      instruksi: input.instruksi,
      lampiran: input.lampiran || [],
      deadline: input.deadline,
      maxScore: input.maxScore ?? 100,
      status,
      version: 1,
      publishedAt,
    });

    return newAssignment;
  }

  /**
   * Update assignment with atomic optimistic concurrency.
   * Throws 409 Conflict if version does not match.
   */
  static async updateAssignment(userId: string, assignmentId: string, input: IUpdateAssignmentInput) {
    const { guru, assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    const { version, ...updates } = input;

    // If babId is updated, verify it
    if (updates.babId) {
      const pengampu = await Pengampu.findOne({
        guruId: guru._id,
        kelasId: assignment.kelasId,
        mataPelajaranId: assignment.mapelId,
        status: 'Aktif',
      });
      const bab = await Bab.findOne({
        _id: new mongoose.Types.ObjectId(updates.babId),
        pengampuId: pengampu?._id,
      });
      if (!bab) {
        throw new AppError('Bab yang dipilih tidak valid untuk penugasan ini', 400, 'BAD_REQUEST');
      }
    }

    const updateDoc: Record<string, any> = { ...updates };
    if (updates.status === 'published' && !assignment.publishedAt) {
      updateDoc.publishedAt = new Date();
    }

    // Atomic update matching _id, guruId, AND version
    const updated = await Tugas.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(assignmentId),
        guruId: guru._id,
        version: version,
      },
      {
        $set: updateDoc,
        $inc: { version: 1 },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      // Check if document exists with a different version -> Stale Version / Conflict
      const current = await Tugas.findOne({
        _id: new mongoose.Types.ObjectId(assignmentId),
        guruId: guru._id,
      });

      if (current && current.version !== version) {
        throw new AppError(
          'Data tugas telah berubah. Muat ulang data sebelum menyimpan perubahan.',
          409,
          'VERSION_CONFLICT'
        );
      }

      throw new AppError('Tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }

  /**
   * Delete assignment after verifying ownership.
   */
  static async deleteAssignment(userId: string, assignmentId: string) {
    const { guru } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    await Tugas.deleteOne({
      _id: new mongoose.Types.ObjectId(assignmentId),
      guruId: guru._id,
    });

    return { message: 'Tugas berhasil dihapus' };
  }

  /**
   * Publish assignment: sets status = 'published', publishedAt = now, increments version.
   */
  static async publishAssignment(userId: string, assignmentId: string) {
    const { guru } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    const updated = await Tugas.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(assignmentId),
        guruId: guru._id,
      },
      {
        $set: {
          status: 'published',
          publishedAt: new Date(),
        },
        $inc: { version: 1 },
      },
      {
        new: true,
      }
    );

    if (!updated) {
      throw new AppError('Tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }

  /**
   * Unpublish assignment: sets status = 'draft', increments version.
   * If status = 'closed', does not allow reopening directly to draft.
   */
  static async unpublishAssignment(userId: string, assignmentId: string) {
    const { guru, assignment } = await this.verifyTeacherOwnsAssignment(userId, assignmentId);

    if (assignment.status === 'closed') {
      throw new AppError(
        'Tugas yang sudah ditutup tidak dapat diubah statusnya menjadi draf secara langsung',
        400,
        'BAD_REQUEST'
      );
    }

    const updated = await Tugas.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(assignmentId),
        guruId: guru._id,
      },
      {
        $set: {
          status: 'draft',
        },
        $inc: { version: 1 },
      },
      {
        new: true,
      }
    );

    if (!updated) {
      throw new AppError('Tugas tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }
}
