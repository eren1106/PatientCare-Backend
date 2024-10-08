import { Router } from 'express';
import { findUsersForNewConversation, getAllChatsForUser, getChatMessages, sendMessage } from '../controllers/chatController';


const router = Router();

router.get('/all/:id', getAllChatsForUser);
router.get('/messages/:fromUserId/:toUserId', getChatMessages);
router.post('/send', sendMessage);
router.get('/newconversation/:userId', findUsersForNewConversation);

/**
 * @swagger
 * /api/chat/newconversation/{userId}:
 *   get:
 *     summary: Find users available for new conversation
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the current user
 *     responses:
 *       200:
 *         description: Successfully retrieved available users
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
 *                       id:
 *                         type: string
 *                       fullname:
 *                         type: string
 *                       profileImageUrl:
 *                         type: string
 *                         nullable: true
 *                       role:
 *                         type: string
 *                         enum: [PATIENT, DOCTOR, ADMIN]
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/chat/all/{id}:
 *   get:
 *     summary: Get all chat history for a user
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved chat history
 */

/**
 * @swagger
 * /api/chat/messages/{fromUserId}/{toUserId}:
 *   get:
 *     summary: Get messages between two users
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: fromUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user sending messages
 *       - in: path
 *         name: toUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user receiving messages
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a new message
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
 *               - message
 *             properties:
 *               fromUserId:
 *                 type: string
 *                 description: ID of the user sending the message
 *               toUserId:
 *                 type: string
 *                 description: ID of the user receiving the message
 *               message:
 *                 type: string
 *                 description: Content of the message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Server error
 */



export { router as chatRoutes };
