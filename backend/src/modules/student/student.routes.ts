import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth';
import { Role } from '../core/model/User';
import {
  getStudentProfile,
  getStudentDashboard,
  getStudentClasses,
  getStudentClassDetail,
  getStudentMaterials,
  getStudentMaterialDetail,
  getStudentAssignments,
  getStudentAssignmentDetail,
  submitStudentAssignment,
  getStudentAnnouncements,
  getStudentAnnouncementDetail,
  getStudentGrades,
} from './student.controller';

const router = Router();

// Protect all student routes: must be authenticated AND be SISWA role
router.use(requireAuth);
router.use(requireRole(Role.SISWA));

// Profile & Dashboard
router.get('/me', getStudentProfile);
router.get('/me/dashboard', getStudentDashboard);

// Classes
router.get('/me/classes', getStudentClasses);
router.get('/me/classes/:kelasId', getStudentClassDetail);

// Materials (scoped and general)
router.get('/me/materials', getStudentMaterials);
router.get('/me/materials/:materialId', getStudentMaterialDetail);
router.get('/me/classes/:kelasId/materials', getStudentMaterials);
router.get('/me/classes/:kelasId/materials/:materialId', getStudentMaterialDetail);

// Assignments (scoped and general)
router.get('/me/assignments', getStudentAssignments);
router.get('/me/assignments/:tugasId', getStudentAssignmentDetail);
router.get('/me/classes/:kelasId/assignments', getStudentAssignments);
router.get('/me/classes/:kelasId/assignments/:tugasId', getStudentAssignmentDetail);

// Student Submission (student-scoped, does NOT use teacher's submission route)
router.post('/me/assignments/:tugasId/submit', submitStudentAssignment);
router.post('/me/classes/:kelasId/assignments/:tugasId/submit', submitStudentAssignment);

// Announcements
router.get('/me/announcements', getStudentAnnouncements);
router.get('/me/announcements/:announcementId', getStudentAnnouncementDetail);

// Grades (submitted + graded)
router.get('/me/grades', getStudentGrades);

export default router;
