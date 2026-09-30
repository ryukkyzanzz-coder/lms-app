import { Request, Response, NextFunction } from 'express';
import { AssignmentService } from './assignment.service';
import {
  objectIdSchema,
  listAssignmentsQuerySchema,
  createAssignmentSchema,
  updateAssignmentSchema,
} from './assignment.validation';
import { sendSuccess } from '../../shared/utils/response';
import { AppError } from '../../shared/errors/AppError';

export class AssignmentController {
  /**
   * GET /api/v1/teachers/me/classes/:kelasId/subjects/:mapelId/assignments
   */
  static async listAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const kelasId = objectIdSchema.parse(req.params.kelasId);
      const mapelId = objectIdSchema.parse(req.params.mapelId);
      const validQuery = listAssignmentsQuerySchema.parse(req.query);

      const result = await AssignmentService.listAssignments(
        userId,
        kelasId,
        mapelId,
        validQuery
      );

      return sendSuccess(res, result.data, undefined, 200, result.pagination);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * GET /api/v1/teachers/me/assignments/:assignmentId
   */
  static async getAssignmentDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const assignment = await AssignmentService.getAssignmentDetail(userId, assignmentId);

      return sendSuccess(res, assignment);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/classes/:kelasId/subjects/:mapelId/assignments
   */
  static async createAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const kelasId = objectIdSchema.parse(req.params.kelasId);
      const mapelId = objectIdSchema.parse(req.params.mapelId);
      const input = createAssignmentSchema.parse(req.body);

      const newAssignment = await AssignmentService.createAssignment(
        userId,
        kelasId,
        mapelId,
        input
      );

      return sendSuccess(res, newAssignment, 'Tugas berhasil dibuat', 201);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * PATCH /api/v1/teachers/me/assignments/:assignmentId
   */
  static async updateAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const input = updateAssignmentSchema.parse(req.body);

      const updated = await AssignmentService.updateAssignment(
        userId,
        assignmentId,
        input
      );

      return sendSuccess(res, updated, 'Tugas berhasil diperbarui');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * DELETE /api/v1/teachers/me/assignments/:assignmentId
   */
  static async deleteAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const result = await AssignmentService.deleteAssignment(userId, assignmentId);

      return sendSuccess(res, result, 'Tugas berhasil dihapus');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/assignments/:assignmentId/publish
   */
  static async publishAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const updated = await AssignmentService.publishAssignment(userId, assignmentId);

      return sendSuccess(res, updated, 'Tugas berhasil dipublikasikan');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/assignments/:assignmentId/unpublish
   */
  static async unpublishAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const updated = await AssignmentService.unpublishAssignment(userId, assignmentId);

      return sendSuccess(res, updated, 'Tugas berhasil dialihkan menjadi draf');
    } catch (error) {
      return next(error);
    }
  }
}
