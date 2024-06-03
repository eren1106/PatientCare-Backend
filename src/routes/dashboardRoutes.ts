import { Router } from 'express';
import { getAllUsers } from '../controllers/dashboardController';
const router = Router();


/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - dashboard
 *     responses:
 *       200:
 *         description: A list of registered users
 */

router.get('/', getAllUsers);

// Manage patient record
router.get('/patients')
router.delete('/patients')

// Manage patient details
router.get('/patients/:id')
//router.put() router.edit



export { router as dashboardRoutes };