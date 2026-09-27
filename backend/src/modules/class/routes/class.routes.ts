import { Router } from 'express';
import { requireAuth } from '../../../middlewares/auth';
import { getClasses, getClassById } from '../controller/class.controller';

const router = Router();

router.use(requireAuth);

router.get('/', getClasses);
router.get('/:id', getClassById);

export default router;
