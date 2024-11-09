import { io } from "..";
import prisma from "../lib/prisma";
import { sendEmail } from "./emails.service";

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

  await sendEmail({
    recipientEmail: "erengaming1106@gmail.com", // TODO: change to user email
    subject: data.title,
    textPart: data.message,
    htmlPart: data.message,
  });

  io.emit(`notification-${data.userId}`, newNotification); // for real time purpose
}