import mongoose from 'mongoose';
import { Materi, IMateriDocument } from './model/Materi';
import { Guru } from '../core/model/Guru';
import { Pengampu } from '../core/model/Pengampu';
import { Bab } from '../core/model/Bab';
import { AppError } from '../../shared/errors/AppError';

export interface IListMaterialsQuery {
  search?: string;
  babId?: string;
  tipe?: 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  status?: 'draft' | 'published' | 'archived';
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ICreateMaterialInput {
  judul: string;
  deskripsi?: string;
  tipe: 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  babId?: string;
  konten?: string;
  file?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  };
  urutan?: number;
  status?: 'draft' | 'published' | 'archived';
}

export interface IUpdateMaterialInput {
  version: number;
  judul?: string;
  deskripsi?: string;
  tipe?: 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  babId?: string;
  konten?: string;
  file?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  };
  urutan?: number;
  status?: 'draft' | 'published' | 'archived';
}

export class MaterialService {
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
   * Helper to verify that the material exists, belongs to the authenticated teacher,
   * and the teacher has active teaching authorization for the material's class & subject.
   */
  static async verifyTeacherOwnsMaterial(userId: string, materiId: string) {
    const guru = await Guru.findOne({ userId });
    if (!guru) {
      throw new AppError('Profil Guru tidak ditemukan', 404, 'NOT_FOUND');
    }

    const materi = await Materi.findById(materiId);
    if (!materi) {
      throw new AppError('Materi tidak ditemukan', 404, 'NOT_FOUND');
    }

    if (materi.guruId.toString() !== guru._id.toString()) {
      throw new AppError('Akses ditolak: Materi ini bukan milik Anda', 403, 'FORBIDDEN');
    }

    // Also verify active pengampu authorization for this class & subject
    const pengampu = await Pengampu.findOne({
      guruId: guru._id,
      kelasId: materi.kelasId,
      mataPelajaranId: materi.mapelId,
      status: 'Aktif',
    });

    if (!pengampu) {
      throw new AppError(
        'Akses ditolak: Anda tidak lagi memiliki penugasan aktif untuk materi ini',
        403,
        'FORBIDDEN'
      );
    }

    return { guru, materi, pengampu };
  }

  /**
   * List materials for a specific class and subject with pagination, filtering, and sorting.
   */
  static async listMaterials(
    userId: string,
    kelasId: string,
    mapelId: string,
    query: IListMaterialsQuery
  ) {
    const { guru } = await this.verifyTeacherTeaching(userId, kelasId, mapelId);

    const filter: Record<string, any> = {
      kelasId: new mongoose.Types.ObjectId(kelasId),
      mapelId: new mongoose.Types.ObjectId(mapelId),
      guruId: guru._id,
    };

    if (query.search && query.search.trim()) {
      filter.judul = { $regex: query.search.trim(), $options: 'i' };
    }

    if (query.babId) {
      filter.babId = new mongoose.Types.ObjectId(query.babId);
    }

    if (query.tipe) {
      filter.tipe = query.tipe;
    }

    if (query.status) {
      filter.status = query.status;
    }

    // Determine sort
    let sortOption: Record<string, any> = { urutan: 1, createdAt: -1 };
    if (query.sort === '-createdAt') {
      sortOption = { createdAt: -1 };
    } else if (query.sort === 'createdAt') {
      sortOption = { createdAt: 1 };
    } else if (query.sort === 'judul') {
      sortOption = { judul: 1 };
    } else if (query.sort === '-judul') {
      sortOption = { judul: -1 };
    } else if (query.sort === '-urutan') {
      sortOption = { urutan: -1, createdAt: -1 };
    } else if (query.sort === 'urutan') {
      sortOption = { urutan: 1, createdAt: -1 };
    }

    const page = Math.max(1, query.page || 1);
    const limit = Math.min(50, Math.max(1, query.limit || 10));
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      Materi.countDocuments(filter),
      Materi.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .populate('babId', 'judul urutan')
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
   * Get single material detail by ID.
   */
  static async getMaterialDetail(userId: string, materiId: string) {
    const { materi } = await this.verifyTeacherOwnsMaterial(userId, materiId);
    const populated = await Materi.findById(materi._id)
      .populate('babId', 'judul urutan')
      .populate('kelasId', 'nama tingkat')
      .populate('mapelId', 'nama kode')
      .lean();
    return populated || materi;
  }

  /**
   * Create new material.
   */
  static async createMaterial(
    userId: string,
    kelasId: string,
    mapelId: string,
    input: ICreateMaterialInput
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

    // Determine safe urutan default if not provided
    let urutan = input.urutan;
    if (urutan === undefined) {
      const last = (await Materi.findOne({
        kelasId: new mongoose.Types.ObjectId(kelasId),
        mapelId: new mongoose.Types.ObjectId(mapelId),
        guruId: guru._id,
      })
        .sort({ urutan: -1 })
        .select('urutan')
        .lean()) as any;
      urutan = (last?.urutan || 0) + 1;
    }

    const status = input.status || 'draft';
    const publishedAt = status === 'published' ? new Date() : undefined;

    const newMaterial = await Materi.create({
      guruId: guru._id,
      kelasId: new mongoose.Types.ObjectId(kelasId),
      mapelId: new mongoose.Types.ObjectId(mapelId),
      babId: input.babId ? new mongoose.Types.ObjectId(input.babId) : undefined,
      judul: input.judul,
      deskripsi: input.deskripsi,
      tipe: input.tipe,
      konten: input.konten,
      file: input.file,
      urutan,
      status,
      version: 1,
      publishedAt,
    });

    return newMaterial;
  }

  /**
   * Update material with atomic optimistic concurrency.
   * Throws 409 Conflict if version does not match.
   */
  static async updateMaterial(userId: string, materiId: string, input: IUpdateMaterialInput) {
    const { guru, materi } = await this.verifyTeacherOwnsMaterial(userId, materiId);

    const { version, ...updates } = input;

    // If babId is updated, verify it
    if (updates.babId) {
      const pengampu = await Pengampu.findOne({
        guruId: guru._id,
        kelasId: materi.kelasId,
        mataPelajaranId: materi.mapelId,
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
    if (updates.status === 'published' && !materi.publishedAt) {
      updateDoc.publishedAt = new Date();
    }

    // Atomic update matching _id, guruId, AND version
    const updated = await Materi.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(materiId),
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
      const current = await Materi.findOne({
        _id: new mongoose.Types.ObjectId(materiId),
        guruId: guru._id,
      });

      if (current && current.version !== version) {
        throw new AppError(
          'Data materi telah berubah. Muat ulang data sebelum menyimpan perubahan.',
          409,
          'VERSION_CONFLICT'
        );
      }

      throw new AppError('Materi tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }

  /**
   * Delete material after verifying ownership and teaching assignment.
   */
  static async deleteMaterial(userId: string, materiId: string) {
    const { guru } = await this.verifyTeacherOwnsMaterial(userId, materiId);

    await Materi.deleteOne({
      _id: new mongoose.Types.ObjectId(materiId),
      guruId: guru._id,
    });

    return { message: 'Materi berhasil dihapus' };
  }

  /**
   * Publish material: sets status = 'published', publishedAt = now, increments version.
   */
  static async publishMaterial(userId: string, materiId: string) {
    const { guru } = await this.verifyTeacherOwnsMaterial(userId, materiId);

    const updated = await Materi.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(materiId),
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
      throw new AppError('Materi tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }

  /**
   * Unpublish material: sets status = 'draft', increments version.
   */
  static async unpublishMaterial(userId: string, materiId: string) {
    const { guru } = await this.verifyTeacherOwnsMaterial(userId, materiId);

    const updated = await Materi.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(materiId),
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
      throw new AppError('Materi tidak ditemukan', 404, 'NOT_FOUND');
    }

    return updated;
  }
}
