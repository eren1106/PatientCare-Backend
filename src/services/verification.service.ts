import crypto from 'crypto';
import prisma from '../lib/prisma';
import { sendEmail } from './emails.service';

export class VerificationService {
  // Generate a secure random token
  static generateVerificationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Send verification email
  static async sendVerificationEmail({email, userId}: {email: string, userId: string }): Promise<void> {
    const token = this.generateVerificationToken();

    await prisma.user.update({
      where: { id: userId },
      data: { verificationToken: token }
    });

    await sendEmail({
      recipientEmail: email,
      subject: 'Verify Your Email',
      textPart: `Click the link below to verify your email: ${process.env.CLIENT_URL}/auth/verify-email?token=${token}`,
      htmlPart: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${process.env.CLIENT_URL}/auth/verify-email?token=${token}">Verify Email</a>
      `
    })
  }

  // Verify email token
  static async verifyEmail(token: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { verificationToken: token }
    });

    if (!user) return false;

    await prisma.user.update({
      where: { id: user.id },
      data: { 
        isVerified: true, 
        verificationToken: null 
      }
    });

    return true;
  }
}