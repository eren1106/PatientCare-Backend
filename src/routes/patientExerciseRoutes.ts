import { Router } from 'express';
import { completePatientExercise, createPatientExercise, deletePatientExerciseById, getPatientExerciseById, getPatientExercises, getTodayPatientExercises, updatePatientExerciseById } from '../controllers/patientExerciseController';

const router = Router();

router.get('/', getPatientExercises);
router.get('/today', getTodayPatientExercises);
router.get('/:id', getPatientExerciseById);
router.post('/', createPatientExercise);
router.put('/:id', updatePatientExerciseById);
router.put('/:id/complete-exercise', completePatientExercise);
router.delete('/:id', deletePatientExerciseById)

export { router as patientExerciseRoutes };