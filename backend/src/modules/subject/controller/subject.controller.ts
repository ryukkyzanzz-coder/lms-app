import { Request, Response, NextFunction } from 'express';
import { MataPelajaran } from '../../core/model/MataPelajaran';
import { Guru } from '../../core/model/Guru';
import { Pengampu } from '../../core/model/Pengampu';
import { sendSuccess } from '../../../shared/utils/response';
import { AppError } from '../../../shared/errors/AppError';
import { Role } from '../../core/model/User';

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
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

      const assignments = await Pengampu.find({ guruId: guru._id }).select('mataPelajaranId');
      const subjectIds = assignments.map(a => a.mataPelajaranId);
      
      query._id = { $in: subjectIds };
    }

    const total = await MataPelajaran.countDocuments(query);
    const subjects = await MataPelajaran.find(query)
      .skip(skip)
      .limit(limit);

    sendSuccess(res, subjects, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjectId = req.params.id;

    if (req.user?.role === Role.GURU) {
      const guru = await Guru.findOne({ userId: req.user.userId });
      if (!guru) return next(new AppError('Guru profile not found', 404, 'NOT_FOUND'));

      const isAssigned = await Pengampu.exists({ guruId: guru._id, mataPelajaranId: subjectId });
      if (!isAssigned) {
        return next(new AppError('Forbidden. You do not have access to this subject.', 403, 'FORBIDDEN'));
      }
    }

    const subject = await MataPelajaran.findById(subjectId);
      
    if (!subject) {
      return next(new AppError('Subject not found', 404, 'NOT_FOUND'));
    }

    sendSuccess(res, subject);
  } catch (error) {
    next(error);
  }
};
