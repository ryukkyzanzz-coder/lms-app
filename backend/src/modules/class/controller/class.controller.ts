import { Request, Response, NextFunction } from 'express';
import { Kelas } from '../../core/model/Kelas';
import { Guru } from '../../core/model/Guru';
import { Pengampu } from '../../core/model/Pengampu';
import { Siswa } from '../../core/model/Siswa';
import { sendSuccess } from '../../../shared/utils/response';
import { AppError } from '../../../shared/errors/AppError';
import { Role } from '../../core/model/User';

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.q as string;

    let query: any = {};
    if (search) {
      query.nama = { $regex: search, $options: 'i' };
    }

    if (req.user?.role === Role.GURU) {
      const guru = await Guru.findOne({ userId: req.user.userId });
      if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

      const assignments = await Pengampu.find({ guruId: guru._id }).select('kelasId');
      const classIds = assignments.map(a => a.kelasId);
      
      query._id = { $in: classIds };
    }

    const total = await Kelas.countDocuments(query);
    const classes = await Kelas.find(query)
      .populate('waliKelasId', 'nama nip')
      .skip(skip)
      .limit(limit);

    sendSuccess(res, classes, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = req.params.id;

    if (req.user?.role === Role.GURU) {
      const guru = await Guru.findOne({ userId: req.user.userId });
      if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

      const isAssigned = await Pengampu.exists({ guruId: guru._id, kelasId: classId });
      if (!isAssigned) {
        return next(new AppError('Forbidden. You do not have access to this class.', 403, 'FORBIDDEN'));
      }
    }

    const classData = await Kelas.findById(classId)
      .populate('waliKelasId', 'nama nip')
      .populate('siswaIds', 'nama nisn status');
      
    if (!classData) {
      return next(new AppError('Class not found', 404, 'NOT_FOUND'));
    }

    sendSuccess(res, classData);
  } catch (error) {
    next(error);
  }
};
