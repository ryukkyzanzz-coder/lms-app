import { Router } from 'express';
import { requireAuth } from '../../../middlewares/auth';
import { getSubjects, getSubjectById } from '../controller/subject.controller';

const router = Router();

router.use(requireAuth);

router.get('/', getSubjects);
router.get('/:id', getSubjectById);

export default router;
