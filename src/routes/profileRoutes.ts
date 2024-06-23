import { Router } from 'express';
import { deleteProfile, getProfileById, updateProfile } from '../controllers/profileController';

const router = Router();

router.get('/:id', getProfileById);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export { router as profileRoutes };