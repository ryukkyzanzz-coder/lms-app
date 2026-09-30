import { Router } from 'express';
import { SubmissionController } from './submission.controller';

const router = Router();

// Submissions under a specific assignment
router.get(
  '/assignments/:assignmentId/submissions',
  SubmissionController.listSubmissions
);

router.post(
  '/assignments/:assignmentId/submissions',
  SubmissionController.submitAssignment
);

router.get(
  '/assignments/:assignmentId/submissions/:submissionId',
  SubmissionController.getSubmissionDetail
);

export default router;
