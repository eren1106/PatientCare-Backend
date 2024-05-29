import { Router, Request, Response } from 'express';
import { exerciseRoutes } from './exerciseRoutes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API');
});

router.use('/exercises', exerciseRoutes);

export default router;
