import { Router } from 'express';
import { getProfileById } from '../controllers/profileController';

const router = Router();

router.get('/:id', getProfileById);

export { router as profileRoutes };