import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { STATUS_CODES } from "../constants";
import { DoctorRegistrationStatus, Gender, SignInMethod, UserRole } from "@prisma/client";

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

  // Check if the user is a doctor and their registration status is not approved
  if (user.role === UserRole.DOCTOR && user.doctorRegistrationStatus === (DoctorRegistrationStatus.PENDING || DoctorRegistrationStatus.REJECTED)) {
    return errorResponse({
      res,
      error: "Doctor registration is still pending for admin approval or rejected",
      statusCode: STATUS_CODES.UNAUTHORIZED,
    });
  }

  // TODO: implement bcrypt to hash password
  // TODO: implement jwt
  if(password !== user.password) return errorResponse({
    res,
    error: "Wrong Password!",
    statusCode: STATUS_CODES.UNAUTHORIZED
  });

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
  registrationNumber? : string;
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

  if(existingUser) return errorResponse({
    res,
    error: "User already exists!",
    statusCode: STATUS_CODES.CONFLICT
  });

  // TODO: implement bcrypt to hash password
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
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

  return apiResponse({
    res,
    result: user,
  });
}
