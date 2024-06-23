import { Router } from 'express';
import { getProfileById, updateProfile } from '../controllers/profileController';

const router = Router();

router.get('/:id', getProfileById);
router.put('/:id', updateProfile);

export { router as profileRoutes };