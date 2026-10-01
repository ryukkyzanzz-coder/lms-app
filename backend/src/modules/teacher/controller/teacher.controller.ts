import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Guru } from '../../core/model/Guru';
import { Pengampu } from '../../core/model/Pengampu';
import { Tugas } from '../../core/model/Tugas';
import { PengumpulanTugas } from '../../core/model/PengumpulanTugas';
import { Bab } from '../../core/model/Bab';
import { Materi } from '../../core/model/Materi';
import { Pengumuman } from '../../core/model/Pengumuman';
import { Kelas } from '../../core/model/Kelas';
import { Siswa } from '../../core/model/Siswa';

// Explicit model imports for Mongoose .populate() registration
import '../../core/model/MataPelajaran';
import '../../core/model/TahunAjaran';
import '../../core/model/Semester';

import { sendSuccess } from '../../../shared/utils/response';
import { AppError } from '../../../shared/errors/AppError';

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) {
      return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));
    }

    sendSuccess(res, guru);
  } catch (error) {
    next(error);
  }
};

export const getMyClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const assignments = await Pengampu.find({ guruId: guru._id, status: 'Aktif' }).populate('kelasId');
    
    // Extract unique classes
    const classMap = new Map();
    assignments.forEach(a => {
      if (a.kelasId && !classMap.has(a.kelasId._id.toString())) {
        classMap.set(a.kelasId._id.toString(), a.kelasId);
      }
    });

    sendSuccess(res, Array.from(classMap.values()));
  } catch (error) {
    next(error);
  }
};

export const getMySubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const assignments = await Pengampu.find({ guruId: guru._id, status: 'Aktif' }).populate('mataPelajaranId');
    
    // Extract unique subjects
    const subjectMap = new Map();
    assignments.forEach(a => {
      if (a.mataPelajaranId && !subjectMap.has(a.mataPelajaranId._id.toString())) {
        subjectMap.set(a.mataPelajaranId._id.toString(), a.mataPelajaranId);
      }
    });

    sendSuccess(res, Array.from(subjectMap.values()));
  } catch (error) {
    next(error);
  }
};

export const getMyAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const assignments = await Pengampu.find({ guruId: guru._id })
      .populate('kelasId')
      .populate('mataPelajaranId')
      .populate('tahunAjaranId')
      .populate('semesterId');
      
    sendSuccess(res, assignments);
  } catch (error) {
    next(error);
  }
};

export const getMyDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const pengampuList = await Pengampu.find({ guruId: guru._id, status: 'Aktif' })
      .populate('kelasId')
      .populate('mataPelajaranId');

    const pengampuIds = pengampuList.map(p => p._id);

    // Perlu Tindakan
    const tugasAktif = await Tugas.find({ pengampuId: { $in: pengampuIds }, status: 'Aktif' });
    const tugasAktifIds = tugasAktif.map(t => t._id);
    const belumDiperiksa = await PengumpulanTugas.countDocuments({ tugasId: { $in: tugasAktifIds }, status: { $in: ['Dikumpulkan', 'SUBMITTED', 'RESUBMITTED'] } });
    const belumKumpul = await PengumpulanTugas.countDocuments({ tugasId: { $in: tugasAktifIds }, status: { $in: ['Belum'] } });

    // Kelas stats
    const kelasStats = await Promise.all(pengampuList.map(async (p) => {
      const kelas = p.kelasId as any;
      const jumlahSiswa = kelas?.siswaIds?.length || 0;
      
      const babs = await Bab.find({ pengampuId: p._id });
      const babSelesai = babs.filter(b => b.status === 'Selesai').length;
      const ketuntasanModul = babs.length > 0 ? Math.round((babSelesai / babs.length) * 100) : 0;
      
      const tugas = await Tugas.countDocuments({ pengampuId: p._id, status: 'Aktif' });

      return {
        pengampuId: p._id,
        kelasId: kelas?._id,
        kelas: kelas?.nama || 'Unknown',
        mapel: (p.mataPelajaranId as any)?.nama || 'Unknown',
        jumlahSiswa,
        ketuntasanModul,
        tugasAktif: tugas,
      };
    }));

    sendSuccess(res, {
      jadwalHariIni: [],
      perluTindakan: {
        belumDiperiksa,
        belumKumpul
      },
      kelas: kelasStats,
      kurikulum: {
        kosp: 'Kurikulum Operasional Satuan Pendidikan (KOSP) 2026/2027',
        targetPenyelesaian: '75%'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTeacherMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const { kelasId, mapelId } = req.params;
    const pengampu = await Pengampu.findOne({ guruId: guru._id, kelasId, mataPelajaranId: mapelId });
    if (!pengampu) return next(new AppError('Anda tidak mengajar mata pelajaran ini di kelas tersebut', 403, 'FORBIDDEN'));

    const babs = await Bab.find({ pengampuId: pengampu._id }).sort({ urutan: 1 }).lean();
    const result = await Promise.all(babs.map(async (bab) => {
      const materiList = await Materi.find({ babId: bab._id }).sort({ urutan: 1 }).lean();
      return { ...bab, materi: materiList };
    }));

    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getTeacherAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const { kelasId } = req.params;
    let filter: any = { guruId: guru._id };
    if (kelasId && kelasId !== 'undefined' && mongoose.Types.ObjectId.isValid(kelasId)) {
      filter.kelasId = new mongoose.Types.ObjectId(kelasId);
    }
    const pengampuList = await Pengampu.find(filter);
    if (!pengampuList.length) {
      return sendSuccess(res, []);
    }

    const pengampuIds = pengampuList.map((p) => p._id);
    const announcements = await Pengumuman.find({ pengampuId: { $in: pengampuIds } })
      .populate({
        path: 'pengampuId',
        populate: [
          { path: 'mataPelajaranId', select: 'kode nama' },
          { path: 'kelasId', select: 'nama tingkat' },
        ],
      })
      .sort({ tanggalRilis: -1, createdAt: -1 })
      .lean();

    sendSuccess(res, announcements);
  } catch (error) {
    next(error);
  }
};

export const createTeacherAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const { kelasId } = req.params;
    const { judul, konten, tipe, status, isPinned, lampiran } = req.body;

    if (!judul || !konten) {
      return next(new AppError('Judul dan konten pengumuman wajib diisi', 400, 'BAD_REQUEST'));
    }

    let filter: any = { guruId: guru._id, status: 'Aktif' };
    if (kelasId && kelasId !== 'undefined' && mongoose.Types.ObjectId.isValid(kelasId)) {
      filter.kelasId = new mongoose.Types.ObjectId(kelasId);
    }

    const pengampuList = await Pengampu.find(filter);
    if (!pengampuList.length) {
      return next(new AppError('Anda tidak memiliki penugasan mengajar aktif di kelas ini', 403, 'FORBIDDEN'));
    }

    const announcement = await Pengumuman.create({
      pengampuId: pengampuList[0]._id,
      judul,
      konten,
      tipe: tipe || 'Umum',
      status: status || 'Dipublikasikan',
      isPinned: !!isPinned,
      tanggalRilis: new Date(),
      lampiran: lampiran || [],
    });

    sendSuccess(res, announcement, 'Pengumuman berhasil dibuat', 201);
  } catch (error) {
    next(error);
  }
};

export const getTeacherStudentProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const { kelasId } = req.params;
    let filter: any = { guruId: guru._id };
    if (kelasId && kelasId !== 'undefined' && mongoose.Types.ObjectId.isValid(kelasId)) {
      filter.kelasId = new mongoose.Types.ObjectId(kelasId);
    }

    const pengampuList = await Pengampu.find(filter).populate('kelasId');
    if (!pengampuList.length) {
      return sendSuccess(res, []);
    }

    const kelas = pengampuList[0].kelasId as any;
    const enrolledSiswaIds = kelas?.siswaIds || [];

    // 1. Fetch real enrolled students
    const siswaList = await Siswa.find({ _id: { $in: enrolledSiswaIds } }).lean();

    // 2. Fetch tasks and materials published for this class
    const [tugasList, materiList] = await Promise.all([
      Tugas.find({ kelasId: kelas._id, status: { $in: ['published', 'closed'] } }).select('_id judul').lean(),
      Materi.find({ kelasId: kelas._id, status: 'published' }).select('_id judul').lean(),
    ]);

    const tugasIds = tugasList.map((t) => t._id);
    const totalTugasCount = tugasList.length;
    const totalMateriCount = materiList.length;

    // 3. Fetch all submissions for these tasks
    const allSubmissions = await PengumpulanTugas.find({
      tugasId: { $in: tugasIds },
      siswaId: { $in: enrolledSiswaIds },
    }).lean();

    // Group submissions by student
    const studentSubmissionMap = new Map<string, any[]>();
    for (const sub of allSubmissions) {
      const sId = sub.siswaId.toString();
      if (!studentSubmissionMap.has(sId)) {
        studentSubmissionMap.set(sId, []);
      }
      studentSubmissionMap.get(sId)!.push(sub);
    }

    const progress = siswaList.map((siswa, idx) => {
      const subs = studentSubmissionMap.get(siswa._id.toString()) || [];
      const submittedCount = subs.length;
      const lateCount = subs.filter((s) => s.isLate).length;
      
      const gradedSubs = subs.filter((s) => typeof s.nilai === 'number');
      const avgGrade =
        gradedSubs.length > 0
          ? Math.round(gradedSubs.reduce((acc, s) => acc + (s.nilai || 0), 0) / gradedSubs.length)
          : submittedCount > 0 ? 80 : 0;

      const completionPercent = totalTugasCount > 0
        ? Math.round((submittedCount / totalTugasCount) * 100)
        : totalMateriCount > 0 ? 100 : 0;

      const isGood = avgGrade >= 75 || (totalTugasCount === 0 && submittedCount === 0);
      const initials = (siswa.nama || 'S')
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return {
        siswaId: siswa._id,
        nis: siswa.nisn || `2204${String(idx + 1).padStart(3, '0')}`,
        no: `#${String(idx + 1).padStart(2, '0')}`,
        name: siswa.nama,
        initials: initials || 'S',
        classInfo: `${kelas.nama || 'Kelas'} • Hadir Penuh`,
        materiProgress: completionPercent,
        materiCount: `${Math.min(submittedCount, totalMateriCount || submittedCount)} / ${totalMateriCount || totalTugasCount || 1} Modul`,
        assignmentSubmissions: `${submittedCount}/${totalTugasCount || 1}`,
        assignmentStatus: lateCount > 0 ? `${lateCount} Terlambat` : 'Tepat Waktu',
        assignmentVariant: lateCount > 0 ? ('destructive' as const) : ('default' as const),
        avgGrade,
        lastActivityTime: 'Hari ini',
        lastActivityAction: 'Aktivitas Kelas',
        status: isGood ? 'Baik' : 'Perlu Perhatian',
        category: isGood ? 'baik' : 'perhatian',
      };
    });

    sendSuccess(res, progress);
  } catch (error) {
    next(error);
  }
};

export const getMyClassDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(kelasId)) {
      return next(new AppError('Format ID kelas tidak valid', 400, 'INVALID_ID'));
    }

    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const kelas = await Kelas.findById(kelasId)
      .populate('waliKelasId', 'nama nip')
      .populate('tahunAjaranId', 'nama status')
      .lean();

    if (!kelas) {
      return next(new AppError('Kelas tidak ditemukan', 404, 'NOT_FOUND'));
    }

    // Verify through the existing teaching assignment relationship
    const assignments = await Pengampu.find({
      guruId: guru._id,
      kelasId: kelas._id,
      status: 'Aktif',
    })
      .populate('mataPelajaranId')
      .populate('semesterId')
      .lean();

    if (assignments.length === 0) {
      return next(
        new AppError('Akses ditolak: Anda tidak memiliki penugasan aktif untuk kelas ini', 403, 'FORBIDDEN')
      );
    }

    // Extract unique subjects taught by Guru in this class
    const subjectMap = new Map();
    assignments.forEach((a: any) => {
      if (a.mataPelajaranId && !subjectMap.has(a.mataPelajaranId._id.toString())) {
        subjectMap.set(a.mataPelajaranId._id.toString(), {
          id: a.mataPelajaranId._id.toString(),
          kode: a.mataPelajaranId.kode,
          nama: a.mataPelajaranId.nama,
        });
      }
    });

    const data = {
      id: kelas._id.toString(),
      nama: kelas.nama,
      tingkat: kelas.tingkat,
      program: kelas.program,
      waliKelas: kelas.waliKelasId
        ? {
            id: (kelas.waliKelasId as any)._id.toString(),
            nama: (kelas.waliKelasId as any).nama,
          }
        : null,
      tahunAjaran: kelas.tahunAjaranId
        ? {
            id: (kelas.tahunAjaranId as any)._id.toString(),
            nama: (kelas.tahunAjaranId as any).nama,
          }
        : null,
      semester: assignments[0]?.semesterId
        ? {
            id: (assignments[0].semesterId as any)._id.toString(),
            nama: (assignments[0].semesterId as any).nama,
          }
        : null,
      jumlahSiswa: kelas.siswaIds?.length || 0,
      subjects: Array.from(subjectMap.values()),
    };

    return sendSuccess(res, data);
  } catch (error) {
    return next(error);
  }
};

export const getMyClassStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(kelasId)) {
      return next(new AppError('Format ID kelas tidak valid', 400, 'INVALID_ID'));
    }

    const guru = await Guru.findOne({ userId: req.user?.userId });
    if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

    const kelas = await Kelas.findById(kelasId).select('siswaIds').lean();
    if (!kelas) {
      return next(new AppError('Kelas tidak ditemukan', 404, 'NOT_FOUND'));
    }

    // Verify through the existing teaching assignment relationship
    const isAssigned = await Pengampu.exists({
      guruId: guru._id,
      kelasId: kelas._id,
      status: 'Aktif',
    });

    if (!isAssigned) {
      return next(
        new AppError('Akses ditolak: Anda tidak memiliki penugasan aktif untuk kelas ini', 403, 'FORBIDDEN')
      );
    }

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 30));
    const skip = (page - 1) * limit;
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';

    if (!kelas.siswaIds || kelas.siswaIds.length === 0) {
      return sendSuccess(res, [], undefined, 200, {
        page: 1,
        limit,
        total: 0,
        totalPages: 1,
      });
    }

    const filter: Record<string, any> = { _id: { $in: kelas.siswaIds } };
    if (search) {
      filter.$or = [
        { nama: { $regex: search, $options: 'i' } },
        { nisn: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption: Record<string, any> = { nama: 1 };
    if (req.query.sort === '-nama') sortOption = { nama: -1 };
    else if (req.query.sort === 'nisn') sortOption = { nisn: 1 };
    else if (req.query.sort === '-nisn') sortOption = { nisn: -1 };

    const [total, students] = await Promise.all([
      Siswa.countDocuments(filter),
      Siswa.find(filter)
        .select('_id nisn nama jenisKelamin status')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;
    const data = students.map((s: any) => ({
      id: s._id.toString(),
      nisn: s.nisn,
      nama: s.nama,
      jenisKelamin: s.jenisKelamin || 'L',
      avatar: null,
      status: s.status || 'Aktif',
    }));

    return sendSuccess(res, data, undefined, 200, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    return next(error);
  }
};

