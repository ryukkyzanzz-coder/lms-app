import { Router } from 'express';
import { requireAuth, requireRole } from '../../../middlewares/auth';
import { Role } from '../../core/model/User';
import { 
  getMyProfile, 
  getMyClasses, 
  getMyClassDetail,
  getMyClassStudents,
  getMySubjects, 
  getMyAssignments,
  getMyDashboard,
  getTeacherAnnouncements,
  getTeacherStudentProgress
} from '../controller/teacher.controller';
import materialRoutes from '../../material/material.routes';
import assignmentRoutes from '../../assignment/assignment.routes';
import submissionRoutes from '../../submission/submission.routes';

const router = Router();

// Protect all teacher routes
router.use(requireAuth);
router.use(requireRole(Role.GURU));

router.get('/me', getMyProfile);
router.get('/me/dashboard', getMyDashboard);
router.get('/me/classes', getMyClasses);
router.get('/me/classes/:kelasId', getMyClassDetail);
router.get('/me/classes/:kelasId/students', getMyClassStudents);
router.get('/me/subjects', getMySubjects);
router.get('/me/assignments', getMyAssignments);

// Mount material domain routes
router.use('/me', materialRoutes);

// Mount assignment domain routes
router.use('/me', assignmentRoutes);

// Mount submission domain routes
router.use('/me', submissionRoutes);


router.get('/me/classes/:kelasId/announcements', getTeacherAnnouncements);
router.get('/me/classes/:kelasId/students-progress', getTeacherStudentProgress);

export default router;
