import { Router, Request, Response } from 'express';
import { exerciseRoutes } from './exerciseRoutes';
import { patientExerciseRoutes } from './patientExerciseRoutes';

import { dashboardRoutes } from './dashboardRoutes'
import { profileRoutes } from './profileRoutes';
import { questionnaireRoutes } from './questionnaireRoutes';
import { authRoutes } from './authRoutes';
import { chatRoutes } from './chatRoutes';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

router.use('/auth', authRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/questionnaire', questionnaireRoutes)
router.use('/patients/:patientId/exercises', patientExerciseRoutes);
router.use('/profile', profileRoutes);
router.use('/profile', profileRoutes);
router.use('/chat', chatRoutes);


export default router;
