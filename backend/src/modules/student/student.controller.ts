import { Request, Response, NextFunction } from 'express';
import { StudentService } from './student.service';
import { sendSuccess } from '../../shared/utils/response';

// ──────────────────────────────────────────────────
// GET /students/me
// ──────────────────────────────────────────────────
export const getStudentProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentService.getMyProfile(req.user!.userId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/dashboard
// ──────────────────────────────────────────────────
export const getStudentDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentService.getMyDashboard(req.user!.userId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/classes
// ──────────────────────────────────────────────────
export const getStudentClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentService.getMyClasses(req.user!.userId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/classes/:kelasId
// ──────────────────────────────────────────────────
export const getStudentClassDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId } = req.params;
    const data = await StudentService.getMyClassDetail(req.user!.userId, kelasId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/materials or GET /students/me/classes/:kelasId/materials
// ──────────────────────────────────────────────────
export const getStudentMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const kelasId = req.params.kelasId || (req.query.kelasId as string | undefined);
    const query = {
      search: req.query.search as string | undefined,
      mapelId: req.query.mapelId as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    };
    const result = await StudentService.getMyMaterials(req.user!.userId, kelasId, query);
    return sendSuccess(res, result.data, undefined, 200, result.pagination);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/materials/:materialId or GET /students/me/classes/:kelasId/materials/:materialId
// ──────────────────────────────────────────────────
export const getStudentMaterialDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId, materialId } = req.params;
    const data = await StudentService.getMyMaterialDetail(req.user!.userId, materialId, kelasId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/assignments or GET /students/me/classes/:kelasId/assignments
// ──────────────────────────────────────────────────
export const getStudentAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const kelasId = req.params.kelasId || (req.query.kelasId as string | undefined);
    const query = {
      search: req.query.search as string | undefined,
      status: req.query.status as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    };
    const result = await StudentService.getMyAssignments(req.user!.userId, kelasId, query);
    return sendSuccess(res, result.data, undefined, 200, result.pagination);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/assignments/:tugasId or GET /students/me/classes/:kelasId/assignments/:tugasId
// ──────────────────────────────────────────────────
export const getStudentAssignmentDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId, tugasId } = req.params;
    const data = await StudentService.getMyAssignmentDetail(req.user!.userId, tugasId, kelasId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// POST /students/me/assignments/:tugasId/submit or POST /students/me/classes/:kelasId/assignments/:tugasId/submit
// ──────────────────────────────────────────────────
export const submitStudentAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { kelasId, tugasId } = req.params;
    const { files, catatanSiswa, linkUrl } = req.body as {
      files?: { name: string; url: string; mimeType: string; size: number }[];
      catatanSiswa?: string;
      linkUrl?: string;
    };

    const submission = await StudentService.submitAssignment(
      req.user!.userId,
      tugasId,
      { files, catatanSiswa, linkUrl },
      kelasId
    );

    return sendSuccess(res, submission, 'Tugas berhasil dikumpulkan', 201);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/announcements
// ──────────────────────────────────────────────────
export const getStudentAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = {
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    };
    const result = await StudentService.getMyAnnouncements(req.user!.userId, query);
    return sendSuccess(res, result.data, undefined, 200, result.pagination);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/announcements/:announcementId
// ──────────────────────────────────────────────────
export const getStudentAnnouncementDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { announcementId } = req.params;
    const data = await StudentService.getMyAnnouncementDetail(req.user!.userId, announcementId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};

// ──────────────────────────────────────────────────
// GET /students/me/grades
// ──────────────────────────────────────────────────
export const getStudentGrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentService.getMyGrades(req.user!.userId);
    return sendSuccess(res, data);
  } catch (err) {
    return next(err);
  }
};
