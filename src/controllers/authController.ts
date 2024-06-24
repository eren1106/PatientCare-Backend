import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { STATUS_CODES } from "../constants";

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