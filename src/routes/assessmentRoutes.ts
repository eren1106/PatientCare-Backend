import { Router } from 'express';
import { createOrUpdateAssessmentResponses, getAllAssessmentByPatientId, getAssessmentDetails } from '../controllers/assessmentController';

const router = Router();

/**
 * @swagger
 * /api/assessment/patient/{id}:
 *   get:
 *     summary: Get all assessments by patient ID
 *     description: Retrieve all assessments for a specific patient, including the questionnaire details, status, doctor ID, profile image URL, and assigned date.
 *     tags:
 *       - Assessment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Successfully retrieved the assessments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionnaireName:
 *                         type: string
 *                       questionnaireType:
 *                         type: string
 *                       questionnaireIndex:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [Assigned, In Progress, Completed]
 *                       doctorName:
 *                         type: string
 *                       profileImageUrl:
 *                         type: string
 *                       assignedDate:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/patient/:id', getAllAssessmentByPatientId);

/**
 * @swagger
 * /api/assessment/{id}/details:
 *   get:
 *     summary: Get assessment details
 *     description: Retrieve the details of an assessment, including the questionnaire title, description, sections, questions, options, and answers.
 *     tags:
 *       - Assessment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assessment
 *     responses:
 *       200:
 *         description: Successfully retrieved the assessment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           sectionId:
 *                             type: string
 *                           sectionName:
 *                             type: string
 *                           sectionDescription:
 *                             type: string
 *                           questions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 title:
 *                                   type: string
 *                                 options:
 *                                   type: array
 *                                   items:
 *                                     type: object
 *                                     properties:
 *                                       option_id:
 *                                         type: string
 *                                       scaleValue:
 *                                         type: integer
 *                                       content:
 *                                         type: string
 *                                 answer:
 *                                   type: string
 *       404:
 *         description: Assessment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:id/details', getAssessmentDetails);



router.post('/response', createOrUpdateAssessmentResponses);

export { router as assessmentRoutes };