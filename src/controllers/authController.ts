import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse, customResponse, errorResponse } from "../utils/api-response.util";
import { SALT_ROUNDS, STATUS_CODES } from "../constants";
import { DoctorRegistrationStatus, Gender, SignInMethod, UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import { VerificationService } from "../services/verification.service";
import crypto from 'crypto';
import { sendEmail } from "../services/emails.service";

export const login = async (req: Request, res: Response) => {
  const {
    email,
    password,
  } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    }
  });

  if (!user || user.isDelete) return errorResponse({
    res,
    error: "No User Found!",
    statusCode: STATUS_CODES.NOT_FOUND
  });

  if (!user.isVerified) return errorResponse({
    res,
    error: "Please verify your email first!",
    statusCode: STATUS_CODES.BAD_REQUEST
  });

  // Implement bcrypt to check hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return errorResponse({
    res,
    error: "Incorrect Password!",
    statusCode: STATUS_CODES.UNAUTHORIZED
  });

  // Check if the user is a doctor and their registration status is not approved
  if (user.role === UserRole.DOCTOR && user.doctorRegistrationStatus === (DoctorRegistrationStatus.PENDING || DoctorRegistrationStatus.REJECTED)) {
    return errorResponse({
      res,
      error: "Doctor registration is still pending for admin approval or rejected",
      statusCode: STATUS_CODES.UNAUTHORIZED,
    });
  }

  return apiResponse({
    res,
    result: user,
  });
}

interface RegisterUserDTO {
  email: string;
  password: string;
  username: string;
  fullname: string;
  role: UserRole;
  ic: string;
  age: number;
  gender: Gender;
  registrationNumber?: string;
}

export const register = async (req: Request, res: Response) => {
  const data: RegisterUserDTO = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { ic: data.ic },
        { username: data.username },
      ],
    },
  });

  if (existingUser) return errorResponse({
    res,
    error: "User already exists!",
    statusCode: STATUS_CODES.CONFLICT
  });

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      username: data.username,
      fullname: data.fullname,
      role: data.role,
      ic: data.ic,
      age: data.age,
      gender: data.gender,
      signinMethod: SignInMethod.EMAILPASSWORD,
      doctorRegistrationStatus: data.role === UserRole.DOCTOR ? DoctorRegistrationStatus.PENDING : null,
    },
  });

  if (data.role === UserRole.DOCTOR) {
    await prisma.doctorValidation.create({
      data: {
        doctorId: user.id,
        registrationNumber: data.registrationNumber!,
      },
    });
  }

  // Send verification email
  await VerificationService.sendVerificationEmail({
    email: user.email,
    userId: user.id,
  });

  return apiResponse({
    res,
    result: user,
  });
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    console.log("TOKENN", token);

    if (!token) return errorResponse({
      res,
      error: "Token is required!",
      statusCode: STATUS_CODES.BAD_REQUEST
    });

    const isVerified = await VerificationService.verifyEmail(token as string);

    if (!isVerified) return errorResponse({
      res,
      error: "Invalid Token!",
      statusCode: STATUS_CODES.UNAUTHORIZED
    });
    



    return apiResponse({
      res,
      result: {
        isVerified
      },
      message: "Email Verified Successfully!",
    });
  }
  catch (e) {
    return errorResponse({
      res, error: e
    });
  }
}

export const requestResetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return errorResponse({
      res,
      error: "Email is required!",
      statusCode: STATUS_CODES.BAD_REQUEST
    });

    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) return errorResponse({
      res,
      error: "No User Found!",
      statusCode: STATUS_CODES.NOT_FOUND
    });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    await sendEmail({
      recipientEmail: email,
      subject: 'Reset Password',
      htmlPart: `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        `
    });

    return customResponse({
      res,
      message: "Reset Password Email Sent Successfully!",
    });
  }
  catch (e) {
    return errorResponse({
      res, error: e
    });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) return errorResponse({
      res,
      error: "Token and Password are required!",
      statusCode: STATUS_CODES.BAD_REQUEST
    });

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(), // gte = greater than or equal to
        },
      }
    });

    if (!user) return errorResponse({
      res,
      error: "Invalid or Expired Token!",
      statusCode: STATUS_CODES.UNAUTHORIZED
    });

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      }
    });

    return customResponse({
      res,
      message: "Password Reset Successfully!",
    });
  }
  catch (e) {
    return errorResponse({
      res, error: e
    });
  }
}
