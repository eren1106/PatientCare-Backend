import { Router } from 'express';
import { completePatientExercise, createPatientExercise, deletePatientExerciseById, getAllDailyPatientExercisesByPatientId, getExerciseCompletionSummaryByPatientId, getPatientExerciseById, getPatientExercises, getTodayPatientExerciseById, getTodayPatientExercises, updatePatientExerciseById } from '../controllers/patientExerciseController';

const router = Router();

router.get('/', getPatientExercises);
router.get('/today', getTodayPatientExercises);
router.get('/today/:id', getTodayPatientExerciseById);
router.get('/all-daily', getAllDailyPatientExercisesByPatientId);
router.get('/completion-summary', getExerciseCompletionSummaryByPatientId);
router.get('/:id', getPatientExerciseById);
router.post('/', createPatientExercise);
router.put('/:id', updatePatientExerciseById);
router.put('/:id/complete-exercise', completePatientExercise);
router.delete('/:id', deletePatientExerciseById)

export { router as patientExerciseRoutes };