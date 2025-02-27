import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';

// Get all notifications by user id
export const getNotificationsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdDatetime: 'desc'
      }
    });
    return apiResponse({
      res,
      result: notifications
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// Get notification by ID
export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    return apiResponse({
      res,
      result: notification,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
  const {
    userId,
    title,
    message,
    redirectUrl,
  } = req.body;
  try {
    const newNotification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        redirectUrl,
      },
    });

    return apiResponse({
      res,
      result: newNotification,
      message: "Notification created"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// update notification to read
export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
    return apiResponse({
      res,
      result: updatedNotification,
      message: "Notification updated"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// update notifications to read by userId
export const markNotificationsAsReadByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const updatedNotifications = await prisma.notification.updateMany({
      where: { 
        userId,
        // isRead: false,
        isClicked: false
       },
      data: {
        // isRead: true,
        isClicked: true
      },
    });

    return apiResponse({
      res,
      result: updatedNotifications,
      message: "Notifications updated"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// update notification to clicked
export const markNotificationAsClicked = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        isClicked: true,
      },
    });
    return apiResponse({
      res,
      result: updatedNotification,
      message: "Notification updated"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedNotification = await prisma.notification.delete({
      where: { id: id },
    });
    return apiResponse({
      res,
      result: deletedNotification,
      message: "Notification deleted"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};


