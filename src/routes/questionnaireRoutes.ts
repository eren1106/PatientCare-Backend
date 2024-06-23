import { Router } from 'express';
import { createQuestionnaire, deleteQuestionnaire, getAllQuestionnaires, getQuestionnaireById } from '../controllers/questionnaireController';

const router = Router();

/**
 * @swagger
 * /api/questionnaire:
 *   get:
 *     summary: Get all questionnaires
 *     tags:
 *       - questionnaires
 *     responses:
 *       200:
 *         description: A list of questionnaires
 */
router.get('/', getAllQuestionnaires);

/**
 * @swagger
 * /api/questionnaire/{id}:
 *   get:
 *     summary: Get questionnaires by id
 *     tags:
 *       - questionnaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of questionnaires
 */
router.get('/:id', getQuestionnaireById);


/**
 * @swagger
 * /api/questionnaire/create:
 *   post:
 *     summary: Create a new questionnaire
 *     tags:
 *       - questionnaires
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionnaire:
 *                 type: object
 *                 required:
 *                   - title
 *                   - description
 *                   - type
 *                   - questions
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [General, Shoulder, Knee]
 *                   questions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       required:
 *                         - title
 *                         - type
 *                       properties:
 *                         title:
 *                           type: string
 *                         type:
 *                           type: string
 *                         options:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               content:
 *                                 type: string
 *               authorId:
 *                 type: string
 */
router.post('/create', createQuestionnaire);

router.put('/:id', deleteQuestionnaire);

export { router as questionnaireRoutes };