import { Router } from 'express';
import { getPatientExerciseById, getPatientExercises } from '../controllers/patientExerciseController';

const router = Router();

router.get('/', getPatientExercises);
router.get('/:id', getPatientExerciseById);

export { router as patientExerciseRoutes };