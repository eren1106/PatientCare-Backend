import { Router } from 'express';
import { getAllPatientRecords, getAllPatients, insertPatientRecord } from '../controllers/dashboardController';
const router = Router();


/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of registered users
 */
router.get('/:id', getAllPatients);


/**
 * @swagger
 * /api/dashboard/doctors/{id}:
 *   get:
 *     summary: Get patient records by doctor ID
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of patient records
 */
router.get('/doctors/:id', getAllPatientRecords)


/**
 * @swagger
 * /api/dashboard/doctors:
 *   post:
 *     summary: Insert a new patient record
 *     tags:
 *       - dashboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - patientId
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The ID of the doctor
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *     responses:
 *       200:
 *         description: The newly created patient record
 */
router.post('/doctors', insertPatientRecord)

// Manage patient details
router.get('/patients/:id')
//router.put() router.edit



export { router as dashboardRoutes };