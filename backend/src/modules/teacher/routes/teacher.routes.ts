import { Router } from 'express';
import { requireAuth, requireRole } from '../../../middlewares/auth';
import { Role } from '../../core/model/User';
import { 
  getMyProfile, 
  getMyClasses, 
  getMySubjects, 
  getMyAssignments,
  getMyDashboard,
  getTeacherMaterials,
  getTeacherAnnouncements,
  getTeacherStudentProgress
} from '../controller/teacher.controller';

const router = Router();

// Protect all teacher routes
router.use(requireAuth);
router.use(requireRole(Role.GURU));

router.get('/me', getMyProfile);
router.get('/me/dashboard', getMyDashboard);
router.get('/me/classes', getMyClasses);
router.get('/me/subjects', getMySubjects);
router.get('/me/assignments', getMyAssignments);

router.get('/me/classes/:kelasId/subjects/:mapelId/materials', getTeacherMaterials);
router.get('/me/classes/:kelasId/announcements', getTeacherAnnouncements);
router.get('/me/classes/:kelasId/students-progress', getTeacherStudentProgress);

export default router;
