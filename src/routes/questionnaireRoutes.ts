import { Router } from 'express';
import { createAssessment, createQuestionnaire, deleteAssessment, deleteQuestionnaire, getAllAssessmentByPatientId, getAllOptions, getAllQuestionnaires, getQuestionnaireById, updateQuestionnaire } from '../controllers/questionnaireController';

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
 * /api/questionnaire/options:
 *   get:
 *     summary: Get all options for questions
 *     tags:
 *       - questionnaires
 *     responses:
 *       200:
 *         description: A list of options
 */
router.get('/options', getAllOptions);

/**
 * @swagger
 * /api/questionnaire/{id}:
 *   get:
 * 
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
 * /api/questionnaire/{id}:
 *   put:
 *     summary: Update a questionnaire
 *     description: Update an existing questionnaire, including nested sections and questions.
 *     tags:
 *       - questionnaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the questionnaire to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           optionId:
 *                             type: string
 *     responses:
 *       200:
 *         description: Questionnaire updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           questions:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 title:
 *                                   type: string
 *                                 optionId:
 *                                   type: string
 *       400:
 *         description: Error updating questionnaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

router.put('/:id', updateQuestionnaire);

/**
 * @swagger
 * /api/questionnaire/patient/{id}:
 *   get:
 *     summary: Get questionnaires assgined to patient
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
router.get('/patient/:id', getAllAssessmentByPatientId);

/**
 * @swagger
 * /api/questionnaire/create:
 *   post:
 *     summary: Create a new questionnaire with sections and questions
 *     description: This endpoint creates a new questionnaire, including its sections and questions. Each question links to an option template via optionId.
 *     tags:
 *       - questionnaires
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the questionnaire
 *                 example: Sample Questionnaire
 *               description:
 *                 type: string
 *                 description: The description of the questionnaire
 *                 example: This is a sample questionnaire
 *               type:
 *                 type: string
 *                 description: The type of the questionnaire
 *                 example: Survey
 *               index:
 *                 type: string
 *                 description: The index of the questionnaire
 *                 example: 1
 *               authorId:
 *                 type: string
 *                 description: The ID of the author creating the questionnaire
 *                 example: user-id
 *               sections:
 *                 type: array
 *                 description: List of sections, each containing a name, description, and questions
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the section
 *                       example: Section 1
 *                     description:
 *                       type: string
 *                       description: A description of the section
 *                       example: Description of Section 1
 *                     questions:
 *                       type: array
 *                       description: List of questions in the section
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the question
 *                             example: Question 1
 *                           optionId:
 *                             type: string
 *                             description: The ID of the option template for the question
 *                             example: option-template-id-1
 *     responses:
 *       200:
 *         description: Successfully created questionnaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Questionnaire created successfully
 *                 result:
 *                   type: object
 *                   description: The created questionnaire with sections and questions
 *       400:
 *         description: Bad request, invalid or missing data
 *       500:
 *         description: Internal server error
 */

// Test sample createQuestionnaire

// {
//     "title": "Sample Questionnaire",
//     "description": "This is a sample questionnaire",
//     "type": "Survey",
//     "index": "1",
//     "authorId": "user-id",
//     "sections": [
//       {
//         "name": "Section 1",
//         "description": "Description of Section 1",
//         "questions": [
//           {
//             "title": "Question 1",
//             "optionId": "option-template-id-1"
//           },
//           {
//             "title": "Question 2",
//             "optionId": "option-template-id-2"
//           }
//         ]
//       },
//       {
//         "name": "Section 2",
//         "description": "Description of Section 2",
//         "questions": [
//           {
//             "title": "Question 3",
//             "optionId": "option-template-id-3"
//           }
//         ]
//       }
//     ]
// }
  
router.post('/create', createQuestionnaire);

router.post('/assessment', createAssessment);



/**
 * @swagger
 * /api/questionnaire/{id}:
 *   delete:
 *     summary: Delete a questionnaire by marking it as deleted
 *     description: Updates the questionnaire's `isDelete` field to `true`, effectively marking it as deleted without removing it from the database.
 *     tags:
 *       - questionnaires
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the questionnaire to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the questionnaire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: The deleted questionnaire object
 *                 message:
 *                   type: string
 *                   example: Questionnaire deleted
 *       404:
 *         description: Questionnaire not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', deleteQuestionnaire);

router.delete('/assessment/:id', deleteAssessment);

//router.put('/update', updateQuestionnaire);


export { router as questionnaireRoutes };