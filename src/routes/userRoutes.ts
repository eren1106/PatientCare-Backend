import { Router } from 'express';
import { getAllPatients, getAllPatientsByDoctorId } from '../controllers/userController';

const router = Router();

router.get('/patients', getAllPatients);
router.get('/patients/:doctorId', getAllPatientsByDoctorId);

export { router as userRoutes };