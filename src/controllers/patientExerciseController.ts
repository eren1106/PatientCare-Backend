import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';

export const getPatientExercises = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const patientExercises = await prisma.patientExercise.findMany({
      where: {
        patientId,
      },
      include: {
        exercise: true,
      }
    });
    return apiResponse({
      res,
      result: patientExercises
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getPatientExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patientExercise = await prisma.patientExercise.findUnique({
      where: {
        // patientId: patientId,
        id: Number(id)
     },
      include: {
        exercise: true,
      }
    });
    return apiResponse({
      res,
      result: patientExercise,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};