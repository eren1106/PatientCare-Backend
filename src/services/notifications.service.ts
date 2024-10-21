import { io } from "..";
import prisma from "../lib/prisma";

interface NotificationDTO {
  userId: string,
  title: string,
  message: string,
  redirectUrl?: string,
}

export const sendNotification = async (data: NotificationDTO) => {
  const newNotification = await prisma.notification.create({
    data,
  });

  io.emit(`notification-${data.userId}`, newNotification); // for real time purpose
}