import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';

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

export const completePatientExercise = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const patientExercise = await prisma.patientExercise.findUnique({
      where: {
        id: Number(id)
      },
    });

    if (!patientExercise) return errorResponse({
      res,
      error: "No Patient Exercise found!",
      statusCode: STATUS_CODES.NOT_FOUND,
    })

    if (patientExercise?.isCompleted) return apiResponse({
      res,
      result: "Exercise already completed",
    });

    const updatedPatientExercise = await prisma.patientExercise.update({
      where: {
        id: Number(id)
      },
      data: {
        isCompleted: true,
      }
    });

    return apiResponse({
      res,
      result: updatedPatientExercise,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};