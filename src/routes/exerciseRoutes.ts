import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  getAllExerciseCategories,
  createExerciseCategory,
  updateExerciseCategory,
  deleteExerciseCategory,
} from '../controllers/exerciseController';

const router = Router();

router.get('/', getExercises);
router.get('/exercise-categories', getAllExerciseCategories);
router.post('/exercise-categories', createExerciseCategory);
router.put('/exercise-categories/:id', updateExerciseCategory);
router.delete('/exercise-categories/:id', deleteExerciseCategory);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export { router as exerciseRoutes };

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     responses:
 *       200:
 *         description: A list of exercises
 */
/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: Exercise details
 *       404:
 *         description: Exercise not found
 */
/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
 *     responses:
 *       201:
 *         description: Exercise created
 */
/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Update an exercise
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: Exercise updated
 *       404:
 *         description: Exercise not found
 */
/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: Exercise deleted
 *       404:
 *         description: Exercise not found
 */