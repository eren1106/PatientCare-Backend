import { Router, Request, Response } from 'express';
import { exerciseRoutes } from './exerciseRoutes';
import { patientExerciseRoutes } from './patientExerciseRoutes';

import { dashboardRoutes } from './dashboardRoutes'
import { profileRoutes } from './profileRoutes';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

router.use('/exercises', exerciseRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/patients/:patientId/exercises', patientExerciseRoutes);
router.use('/profile', profileRoutes);

export default router;
