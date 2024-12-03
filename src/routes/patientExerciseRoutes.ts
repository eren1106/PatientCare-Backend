import { Router } from 'express';
import { completePatientExercise, createPatientExercise, deletePatientExerciseById, getAllDailyPatientExercisesByPatientId, getExerciseCompletionSummaryByPatientId, getPatientExerciseById, getPatientExercises, getTodayPatientExerciseById, getTodayPatientExercises, updatePatientExerciseById } from '../controllers/patientExerciseController';

const router = Router();

router.get('/patient/:patientId', getPatientExercises);
router.get('/patient/:patientId/today', getTodayPatientExercises);
router.get('/patient/:patientId/all-daily', getAllDailyPatientExercisesByPatientId);
router.get('/patient/:patientId/completion-summary', getExerciseCompletionSummaryByPatientId);
// router.get('/today/:id', getTodayPatientExerciseById);
router.get('/:id/today', getTodayPatientExerciseById);
router.get('/:id', getPatientExerciseById);
router.post('/patient/:patientId', createPatientExercise);
router.put('/:id', updatePatientExerciseById);
router.put('/:id/complete-exercise', completePatientExercise);
router.delete('/:id', deletePatientExerciseById)

export { router as patientExerciseRoutes };