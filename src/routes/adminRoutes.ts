import { Router } from 'express';
import { getDoctors, updateDoctorRegistrationStatus } from '../controllers/adminController';

const router = Router();

router.get('/doctor', getDoctors);
router.put('/doctor', updateDoctorRegistrationStatus);


export { router as adminRoutes };