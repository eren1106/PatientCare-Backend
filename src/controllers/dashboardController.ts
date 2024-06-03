import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      return apiResponse({
        res,
        result: users
      });
    } catch (error) {
      return errorResponse({ res, error });
    }
};


