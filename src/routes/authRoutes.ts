import { Router } from 'express';
import { login, register, requestResetPassword, resetPassword, verifyEmail } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password', resetPassword);

export { router as authRoutes };