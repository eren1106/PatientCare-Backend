import { Router } from 'express';
import { createInjury, updateInjury, deleteInjury, deletePatientRecord, getAllPatientRecords, getAllPatients, getPatientRecordsDetails, insertPatientRecord, updatePatientRecordsDetails } from '../controllers/dashboardController';
const router = Router();


/**
 * @swagger
 * /api/dashboard/{id}:
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
 * /api/dashboard/doctors/{id}:
 *   post:
 *     summary: Insert a new patient record
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - weight
 *               - height
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the patient
 *               height:
 *                 type: number
 *                 format: float
 *                 description: The height of the patient
 *     responses:
 *       200:
 *         description: New patient record created
 */
router.post('/doctors/:id', insertPatientRecord)


/**
 * @swagger
 * /api/dashboard/doctors/deleterecords/{id}:
 *   post:
 *     summary: Delete a patient record
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
router.put('/doctors/deleterecords/:id', deletePatientRecord)


router.get('/records/:id', getPatientRecordsDetails)
/**
 * @swagger
 * /api/dashboard/records/{id}:
 *   get:
 *     summary: Get patient records by ID
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
 *         description: Patient record details
 *       404:
 *         description: Patient record not found
 */


/**
 * @swagger
 * /api/dashboard/records:
 *   put:
 *     summary: Update patient record
 *     tags:
 *       - dashboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - ic_no
 *               - age
 *               - gender
 *               - weight
 *               - height
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the patient
 *               ic_no:
 *                 type: string
 *                 description: The IC number of the patient
 *               age:
 *                 type: integer
 *                 description: The age of the patient
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *                 description: The gender of the patient
 *               weight:
 *                 type: number
 *                 format: float
 *                 description: The weight of the patient
 *               height:
 *                 type: number
 *                 format: float
 *                 description: The height of the patient
 *     responses:
 *       200:
 *         description: New patient record created
 */
router.put('/records', updatePatientRecordsDetails)


/**
 * @swagger
 * /api/dashboard/injury:
 *   post:
 *     summary: Create a new injury
 *     tags:
 *       - dashboard
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientRecordId:
 *                 type: string
 *               painRegion:
 *                 type: string
 *               duration:
 *                 type: string
 *               painScore:
 *                 type: integer
 *               description:
 *                 type: string
 *               is_recurrent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Injury created successfully
 */
router.post('/injury', createInjury);

/**
 * @swagger
 * /api/dashboard/injury/{id}:
 *   put:
 *     summary: Update an existing injury
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               painRegion:
 *                 type: string
 *               duration:
 *                 type: string
 *               painScore:
 *                 type: integer
 *               description:
 *                 type: string
 *               is_recurrent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Injury updated successfully
 */
router.put('/injury/:id', updateInjury);

/**
 * @swagger
 * /api/dashboard/injury/{id}:
 *   delete:
 *     summary: Delete an injury
 *     tags:
 *       - dashboard
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Injury deleted successfully
 */
router.delete('/injury/:id', deleteInjury);

export { router as dashboardRoutes };