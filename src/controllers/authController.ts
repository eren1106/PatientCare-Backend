import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { STATUS_CODES } from "../constants";
import { Gender, SignInMethod, UserRole } from "@prisma/client";

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
      ...data,
      signinMethod: SignInMethod.EMAILPASSWORD,
    },
  });

  return apiResponse({
    res,
    result: user,
  });
}
