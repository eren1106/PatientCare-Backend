import { Router } from 'express';
import { completePatientExercise, createPatientExercise, deletePatientExerciseById, getAllDailyPatientExercisesByPatientId, getExerciseCompletionSummaryByPatientId, getPatientExerciseById, getPatientExercises, getTodayPatientExerciseById, getTodayPatientExercises, updatePatientExerciseById } from '../controllers/patientExerciseController';

const router = Router();

router.get('/:patientId', getPatientExercises);
router.get('/:patientId/today', getTodayPatientExercises);
router.get('/:patientId/all-daily', getAllDailyPatientExercisesByPatientId);
router.get('/:patientId/completion-summary', getExerciseCompletionSummaryByPatientId);
// router.get('/today/:id', getTodayPatientExerciseById);
router.get('/:id/today', getTodayPatientExerciseById);
router.get('/:id', getPatientExerciseById);
router.post('/', createPatientExercise);
router.put('/:id', updatePatientExerciseById);
router.put('/:id/complete-exercise', completePatientExercise);
router.delete('/:id', deletePatientExerciseById)

export { router as patientExerciseRoutes };