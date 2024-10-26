import Mailjet from 'node-mailjet';

interface SendEmailProps {
  recipientEmail: string;
  subject: string;
  textPart: string;
  htmlPart: string;
}

export const sendEmail = async ({ recipientEmail, subject, textPart, htmlPart }: SendEmailProps) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC as string,
    process.env.MJ_APIKEY_PRIVATE as string
  );

  const res = await mailjet
    .post("send", { version: 'v3.1' })
    .request({
      Messages: [{
        From: {
          Email: process.env.APP_EMAIL,
        },
        To: [{
          Email: recipientEmail,
        }],
        Subject: subject,
        TextPart: textPart,
        HTMLPart: htmlPart,
      }]
    });
}