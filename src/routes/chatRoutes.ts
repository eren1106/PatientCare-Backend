import { Router } from 'express';
import { createCallHistory, deleteMessage, findUsersForNewConversation, getAllChatsForUser, getCallHistory, getChatMessages, sendMessage } from '../controllers/chatController';


const router = Router();

router.get('/all/:id', getAllChatsForUser);
router.get('/messages/:fromUserId/:toUserId', getChatMessages);
router.post('/send', sendMessage);
router.get('/newconversation/:userId', findUsersForNewConversation);
router.get('/callHistory/:fromUserId/:toUserId', getCallHistory);
router.post('/callHistory', createCallHistory);
router.delete('/message/:messageId', deleteMessage);

/**
 * @swagger
 * /api/chat/callHistory:
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
/**
 * @swagger
 * /api/chat/call-history/{fromUserId}/{toUserId}:
 *   get:
 *     summary: Get call history between two users
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: fromUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user viewing the call history
 *       - in: path
 *         name: toUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the other user in the call history
 *     responses:
 *       200:
 *         description: Successfully retrieved call history
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
 *                       type:
 *                         type: string
 *                         enum: [Incoming, Outgoing]
 *                       status:
 *                         type: string
 *                       createdDatetime:
 *                         type: string
 *                         format: date-time
 *                       duration:
 *                         type: integer
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/chat/message/{messageId}:
 *   delete:
 *     summary: Delete a specific message
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: messageId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the message to delete
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Message deleted successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server error
 */


export { router as chatRoutes };
