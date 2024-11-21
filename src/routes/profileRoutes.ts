import { Router } from 'express';
import { deleteProfile, getProfileById, updateProfile } from '../controllers/profileController';
import multer from 'multer';

// Set up multer for file handling
const upload = multer();

const router = Router();

router.get('/:id', getProfileById);
router.put('/:id', upload.single('imageFile'), updateProfile);
router.delete('/:id', deleteProfile);

export { router as profileRoutes };