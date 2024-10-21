import { Router } from 'express';
import { createNotification, deleteNotification, getNotificationById, getNotificationsByUserId, markNotificationAsClicked, markNotificationAsRead, markNotificationsAsReadByUserId } from '../controllers/notificationController';

const router = Router();

router.get('/user/:userId', getNotificationsByUserId);
router.get('/:id', getNotificationById);
router.post('/', createNotification);
router.put('/:id/mark-as-read', markNotificationAsRead);
router.put('/user/:userId/mark-as-read', markNotificationsAsReadByUserId);
router.put('/:id/mark-as-clicked', markNotificationAsClicked);
router.delete('/:id', deleteNotification);

export { router as notificationRoutes };

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Get all notifications for a user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotificationRequest'
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/notifications/{id}/mark-as-read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The notification ID
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Notification ID
 *         userId:
 *           type: string
 *           description: User ID associated with the notification
 *         title:
 *           type: string
 *           description: Title of the notification
 *         message:
 *           type: string
 *           description: Message content of the notification
 *         redirectUrl:
 *           type: string
 *           description: URL for redirection when notification is clicked
 *         isRead:
 *           type: boolean
 *           description: Indicates if the notification has been read
 *
 *     CreateNotificationRequest:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - message
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID associated with the notification
 *         title:
 *           type: string
 *           description: Title of the notification
 *         message:
 *           type: string
 *           description: Message content of the notification
 *         redirectUrl:
 *           type: string
 *           description: URL for redirection when notification is clicked
 */