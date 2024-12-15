import { Router } from 'express';
import { generateCallToken, handleVoiceResponse } from '../controllers/callController';
import { createCallHistory } from '../controllers/chatController';

const router = Router();

// TODO: uncomment it
router.get('/token/:id', generateCallToken);
/**
 * @swagger
 * /api/call/token/{id}:
 *   get:
 *     summary: Generate a Twilio call token for a user
 *     tags: [Call]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully generated call token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 identity:
 *                   type: string
 *                   description: The username of the user
 *                 token:
 *                   type: string
 *                   description: The generated Twilio JWT token
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to generate token
 */
router.post('/callHistory', createCallHistory);
/**
 * @swagger
 * /api/call/callHistory:
 *   post:
 *     summary: Create a new call history record
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromUserId
 *               - toUserId
 *               - status
 *             properties:
 *               fromUserId:
 *                 type: string
 *                 description: ID of the user initiating the call
 *               toUserId:
 *                 type: string
 *                 description: ID of the user receiving the call
 *               status:
 *                 type: string
 *                 description: Status of the call (e.g., 'COMPLETED', 'MISSED', 'REJECTED')
 *               duration:
 *                 type: integer
 *                 description: Duration of the call in seconds (default is 0)
 *     responses:
 *       201:
 *         description: Successfully created call history record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [Outgoing]
 *                     status:
 *                       type: string
 *                     createdDatetime:
 *                       type: string
 *                       format: date-time
 *                     duration:
 *                       type: integer
 *       500:
 *         description: Server error
 */

router.post('/voice', handleVoiceResponse);

export { router as callRoutes };
