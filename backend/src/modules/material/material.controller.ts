import { Request, Response, NextFunction } from 'express';
import { MaterialService } from './material.service';
import {
  objectIdSchema,
  listMaterialsQuerySchema,
  createMaterialSchema,
  updateMaterialSchema,
} from './material.validation';
import { sendSuccess } from '../../shared/utils/response';
import { AppError } from '../../shared/errors/AppError';

export class MaterialController {
  /**
   * GET /api/v1/teachers/me/classes/:kelasId/subjects/:mapelId/materials
   */
  static async listMaterials(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const kelasId = objectIdSchema.parse(req.params.kelasId);
      const mapelId = objectIdSchema.parse(req.params.mapelId);
      const validQuery = listMaterialsQuerySchema.parse(req.query);

      const result = await MaterialService.listMaterials(
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
   * GET /api/v1/teachers/me/materials/:materiId
   */
  static async getMaterialDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const materiId = objectIdSchema.parse(req.params.materiId);
      const materi = await MaterialService.getMaterialDetail(userId, materiId);

      return sendSuccess(res, materi);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/classes/:kelasId/subjects/:mapelId/materials
   */
  static async createMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const kelasId = objectIdSchema.parse(req.params.kelasId);
      const mapelId = objectIdSchema.parse(req.params.mapelId);
      const validBody = createMaterialSchema.parse(req.body);

      const created = await MaterialService.createMaterial(
        userId,
        kelasId,
        mapelId,
        validBody
      );

      return sendSuccess(res, created, undefined, 201);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * PATCH /api/v1/teachers/me/materials/:materiId
   */
  static async updateMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const materiId = objectIdSchema.parse(req.params.materiId);
      const validBody = updateMaterialSchema.parse(req.body);

      const updated = await MaterialService.updateMaterial(
        userId,
        materiId,
        validBody
      );

      return sendSuccess(res, updated);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * DELETE /api/v1/teachers/me/materials/:materiId
   */
  static async deleteMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const materiId = objectIdSchema.parse(req.params.materiId);
      const result = await MaterialService.deleteMaterial(userId, materiId);

      return sendSuccess(res, result);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/materials/:materiId/publish
   */
  static async publishMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const materiId = objectIdSchema.parse(req.params.materiId);
      const updated = await MaterialService.publishMaterial(userId, materiId);

      return sendSuccess(res, updated);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /api/v1/teachers/me/materials/:materiId/unpublish
   */
  static async unpublishMaterial(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
      }

      const materiId = objectIdSchema.parse(req.params.materiId);
      const updated = await MaterialService.unpublishMaterial(userId, materiId);

      return sendSuccess(res, updated);
    } catch (error) {
      return next(error);
    }
  }
}
