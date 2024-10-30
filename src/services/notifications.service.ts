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
    htmlPart: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.title}</title>
</head>
<body>
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h1 style="color: #333366;">${data.title}</h1>
    <p>${data.message}</p>
    <p style="text-align: center; margin-top: 20px; font-size: 0.9em; color: #777;">Thank you for your interest in GuinPen. We look forward to bringing you along on our journey!</p>
</div>
</body>
</html>
`,
  });

  io.emit(`notification-${data.userId}`, newNotification); // for real time purpose
}