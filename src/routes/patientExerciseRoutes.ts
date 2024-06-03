import { Router } from 'express';
import { completePatientExercise, getPatientExerciseById, getPatientExercises, getTodayPatientExercises } from '../controllers/patientExerciseController';

const router = Router();

router.get('/', getPatientExercises);
router.get('/today', getTodayPatientExercises);
router.get('/:id', getPatientExerciseById);
router.put('/:id/complete-exercise', completePatientExercise);

export { router as patientExerciseRoutes };