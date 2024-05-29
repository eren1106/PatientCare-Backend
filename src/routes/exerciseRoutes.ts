import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from '../controllers/exerciseController';

const router = Router();

router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export { router as exerciseRoutes };