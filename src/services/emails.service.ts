import Mailjet from 'node-mailjet';

interface EmailTemplateProps {
  messageContent: string;
}

const generateEmailTemplate = ({
  messageContent
}: EmailTemplateProps): { html: string; text: string } => {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PatientCare</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 0;">
                <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0066cc; padding: 24px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">PatientCare</h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            ${messageContent}
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 24px; text-align: center; font-size: 14px;">
                            <p style="margin: 0; color: #666666;">This email was sent from PatientCare, a healthcare communication platform.</p>
                            <p style="margin: 8px 0 0 0; color: #666666;">Please do not reply directly to this email.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;

  const textTemplate = `
${messageContent.replace(/<[^>]*>/g, '')}

---
This email was sent from PatientCare, a patient rehabilitation platform.
Please do not reply directly to this email.
  `.trim();

  return {
    html: htmlTemplate.trim(),
    text: textTemplate
  };
};

interface SendEmailProps {
  recipientEmail: string;
  subject: string;
  textPart?: string;
  htmlPart: string;
}

export const sendEmail = async ({ recipientEmail, subject, textPart, htmlPart }: SendEmailProps) => {
  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC as string,
    process.env.MJ_APIKEY_PRIVATE as string
  );

  await mailjet
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
        HTMLPart: generateEmailTemplate({ messageContent: htmlPart }).html,
      }]
    });
}