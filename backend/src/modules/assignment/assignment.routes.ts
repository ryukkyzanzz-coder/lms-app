import { Router } from 'express';
import { AssignmentController } from './assignment.controller';

const router = Router();

// Routes for assignments scoped under class & subject
router.get(
  '/classes/:kelasId/subjects/:mapelId/assignments',
  AssignmentController.listAssignments
);
router.post(
  '/classes/:kelasId/subjects/:mapelId/assignments',
  AssignmentController.createAssignment
);

// Routes for specific assignment by ID
router.get('/assignments/:assignmentId', AssignmentController.getAssignmentDetail);
router.patch('/assignments/:assignmentId', AssignmentController.updateAssignment);
router.delete('/assignments/:assignmentId', AssignmentController.deleteAssignment);
router.post('/assignments/:assignmentId/publish', AssignmentController.publishAssignment);
router.post('/assignments/:assignmentId/unpublish', AssignmentController.unpublishAssignment);

export default router;
