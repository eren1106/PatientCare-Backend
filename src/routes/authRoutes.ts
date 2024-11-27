import { Router } from 'express';
import { login, register, verifyEmail } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify-email', verifyEmail);

export { router as authRoutes };