import { Router } from 'express';
import { MaterialController } from './material.controller';

const router = Router();

// Routes for materials scoped under class & subject
router.get(
  '/classes/:kelasId/subjects/:mapelId/materials',
  MaterialController.listMaterials
);
router.post(
  '/classes/:kelasId/subjects/:mapelId/materials',
  MaterialController.createMaterial
);

// Routes for specific material by ID
router.get('/materials/:materiId', MaterialController.getMaterialDetail);
router.patch('/materials/:materiId', MaterialController.updateMaterial);
router.delete('/materials/:materiId', MaterialController.deleteMaterial);
router.post('/materials/:materiId/publish', MaterialController.publishMaterial);
router.post('/materials/:materiId/unpublish', MaterialController.unpublishMaterial);

export default router;
