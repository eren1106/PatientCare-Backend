import { Router } from 'express';
import { createAssessment, createOptionTemplate, createQuestionnaire, deleteAssessment, deleteOptionTemplate, deleteQuestionnaire, getAllAssessmentByPatientRecordId, getAllOptions, getAllOptionTemplates, getAllQuestionnaires, getAssessmentResult, getQuestionnaireById, updateOptionTemplate, updateQuestionnaire } from '../controllers/questionnaireController';

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
 * /api/questionnaire/optionTemplate:
 *   get:
 *     summary: Get all option templates
 *     description: Retrieve all option templates with their associated options.
 *     tags:
 *       - OptionTemplate
 *     responses:
 *       200:
 *         description: Successfully retrieved all option templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
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
router.get('/optionTemplate', getAllOptionTemplates);

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
router.get('/patient/:id', getAllAssessmentByPatientRecordId);



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

router.get('/assessment/:id/result', getAssessmentResult);
/**
 * @swagger
 * /api/questionnaire/assessment/{id}/result:
 *   get:
 *     summary: Get the result of a questionnaire assessment
 *     description: Retrieve the result of a questionnaire assessment, including the questionnaire details, status, section scores, total score, and responses.
 *     tags:
 *       - questionnaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the assessment
 *     responses:
 *       200:
 *         description: Successfully retrieved the assessment result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionnaireName:
 *                   type: string
 *                 questionnaireType:
 *                   type: string
 *                 questionnaireIndex:
 *                   type: string
 *                 questionnaireStatus:
 *                   type: string
 *                   enum: [Assigned, In Progress, Completed]
 *                 sectionScores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sectionName:
 *                         type: string
 *                       sectionScore:
 *                         type: string
 *                 totalScore:
 *                   type: string
 *                 responses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       option:
 *                         type: string
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

/**
 * @swagger
 * /api/questionnaire/optionTemplate:
 *   post:
 *     summary: Create a new option template
 *     description: Create a new option template with associated options.
 *     tags:
 *       - OptionTemplate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scaleType:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     scaleValue:
 *                       type: integer
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Option template created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
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
router.post('/optionTemplate', createOptionTemplate);




/**
 * @swagger
 * /api/questionnaire/optionTemplate/{id}:
 *   put:
 *     summary: Update an option template
 *     description: Update an existing option template and its associated options.
 *     tags:
 *       - OptionTemplate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the option template to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scaleType:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     scaleValue:
 *                       type: integer
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Option template updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
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
router.put('/optionTemplate/:id', updateOptionTemplate);


/**
 * @swagger
 * /api/questionnaire/optionTemplate/{id}:
 *   delete:
 *     summary: Delete an option template
 *     description: Delete an option template if it is not referenced elsewhere.
 *     tags:
 *       - OptionTemplate
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the option template to delete
 *     responses:
 *       200:
 *         description: Option template deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                 message:
 *                   type: string
 *       400:
 *         description: Cannot delete option template as it is referenced in questions or options
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
router.delete('/optionTemplate/:id', deleteOptionTemplate);



export { router as questionnaireRoutes };