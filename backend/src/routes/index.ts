import { Router } from 'express';
import authRoutes from '../modules/auth/routes/auth.routes';
import teacherRoutes from '../modules/teacher/routes/teacher.routes';
import classRoutes from '../modules/class/routes/class.routes';
import subjectRoutes from '../modules/subject/routes/subject.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/teachers', teacherRoutes);
router.use('/classes', classRoutes);
router.use('/subjects', subjectRoutes);

export default router;
