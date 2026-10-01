import { Router } from 'express';
import { login, getMe } from '../controller/auth.controller';
import { requireAuth } from '../../../middlewares/auth';

const router = Router();

router.post('/login', login);
router.get('/me', requireAuth, getMe);

export default router;

