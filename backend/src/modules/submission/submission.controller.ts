import { Request, Response, NextFunction } from 'express';
import { SubmissionService } from './submission.service';
import {
  objectIdSchema,
  listSubmissionsQuerySchema,
  submitAssignmentSchema,
} from './submission.validation';

export class SubmissionController {
  /**
   * GET /api/v1/teachers/me/assignments/:assignmentId/submissions
   */
  static async listSubmissions(req: Request, res: Response, next: NextFunction) {
    try {
      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const query = listSubmissionsQuerySchema.parse(req.query);

      const result = await SubmissionService.listSubmissions(
        req.user!.userId,
        assignmentId,
        query
      );

      res.status(200).json({
        success: true,
        data: result.data,
        stats: result.stats,
        assignment: result.assignment,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/teachers/me/assignments/:assignmentId/submissions/:submissionId
   */
  static async getSubmissionDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const submissionId = objectIdSchema.parse(req.params.submissionId);

      const result = await SubmissionService.getSubmissionDetail(
        req.user!.userId,
        assignmentId,
        submissionId
      );

      res.status(200).json({
        success: true,
        data: result.submission,
        assignment: result.assignment,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/assignments/:assignmentId/submissions
   * (Submits or updates a student submission)
   */
  static async submitAssignment(req: Request, res: Response, next: NextFunction) {
    try {
      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const input = submitAssignmentSchema.parse(req.body);

      const submission = await SubmissionService.submitTask(assignmentId, input);

      res.status(201).json({
        success: true,
        message: 'Pengumpulan tugas berhasil diproses',
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/assignments/:assignmentId/submissions/:submissionId/grade
   */
  static async gradeSubmission(req: Request, res: Response, next: NextFunction) {
    try {
      const assignmentId = objectIdSchema.parse(req.params.assignmentId);
      const submissionId = objectIdSchema.parse(req.params.submissionId);
      const { nilai, catatanGuru } = req.body;

      if (typeof nilai !== 'number' || isNaN(nilai)) {
        return res.status(400).json({ success: false, message: 'Nilai harus berupa angka valid' });
      }

      const submission = await SubmissionService.gradeSubmission(
        req.user!.userId,
        assignmentId,
        submissionId,
        { nilai: Number(nilai), catatanGuru }
      );

      res.status(200).json({
        success: true,
        message: 'Penilaian tugas berhasil disimpan',
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  }
}
