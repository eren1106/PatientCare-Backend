import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';
import { sendNotification } from '../services/notifications.service';

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
        id: id
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

export const createPatientExercise = async (req: Request, res: Response) => {
  // const {patientId} = req.params;
  const {
    patientId,
    exerciseId,
    sets
  } = req.body;
  try {
    const newPatientExercise = await prisma.patientExercise.create({
      data: {
        patientId,
        exerciseId,
        sets
      },
      include: { exercise: true }  // to display the exercise title in notification
    });
    const newDailyPatientExercise = await prisma.dailyPatientExercise.create({
      data: {
        patientExerciseId: newPatientExercise.id,
        patientId
      }
    });

    // create notification
    await sendNotification({
      userId: patientId,
      title: "A new exercise has been assigned to you!",
      message: `A new exercise (${newPatientExercise.exercise.title}) has been assigned to you`,
      redirectUrl: `/exercises/${newPatientExercise.id}`
    });

    return apiResponse({
      res,
      result: newPatientExercise,
      message: "Assigned the exercise to the patient successfully"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const updatePatientExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    exerciseId,
    sets
  } = req.body;
  try {
    const updatedPatientExercise = await prisma.patientExercise.update({
      where: {
        id,
      },
      data: {
        exerciseId,
        sets
      },
      include: { exercise: true }  // to display the exercise title in notification
    });

    // create notification
    await sendNotification({
      userId: updatedPatientExercise.patientId,
      title: "One of your assigned exercise has been updated",
      message: `Your assigned exercise (${updatedPatientExercise.exercise.title}) has been updated`,
      redirectUrl: `/exercises/${updatedPatientExercise.id}`
    });

    return apiResponse({
      res,
      result: updatedPatientExercise,
      message: "Update the exercise successfully"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const completePatientExercise = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const dailyPatientExercise = await prisma.dailyPatientExercise.findUnique({
      where: {
        id: id
      },
    });

    if (!dailyPatientExercise) return errorResponse({
      res,
      error: "No Patient Exercise found!",
      statusCode: STATUS_CODES.NOT_FOUND,
    })

    if (dailyPatientExercise?.isCompleted) return apiResponse({
      res,
      result: "Exercise already completed",
    });

    const updatedPatientExercise = await prisma.dailyPatientExercise.update({
      where: {
        id: id
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

export const getTodayPatientExercises = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const dailyPatientExercises = await prisma.dailyPatientExercise.findMany({
      where: {
        patientId,
        // TODO: uncomment this when want to deploy to cloud
        // createdDatetime: {
        //   gte: today.toISOString(),
        // }
      },
      include: {
        patientExercise: {
          include: {
            exercise: true,
          }
        },
      }
    });
    return apiResponse({
      res,
      result: dailyPatientExercises
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getTodayPatientExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const dailyPatientExercise = await prisma.dailyPatientExercise.findUnique({
      where: {
        id,
      },
      include: {
        patientExercise: {
          include: {
            exercise: true,
          }
        },
      }
    });
    return apiResponse({
      res,
      result: dailyPatientExercise
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const deletePatientExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // delete all daily patient exercises
    await prisma.dailyPatientExercise.deleteMany({
      where: {
        patientExerciseId: id,
      }
    });
    const deletedPatientExercise = await prisma.patientExercise.delete({
      where: { id: id },
      include: { exercise: true }  // to display the exercise title in notification
    });

    // create notification
    await sendNotification({
      userId: deletedPatientExercise.patientId,
      title: "One of your assigned exercise has been deleted",
      message: `Your assigned exercise (${deletedPatientExercise.exercise.title}) has been deleted`,
      redirectUrl: `/exercises/${deletedPatientExercise.id}`
    });

    return apiResponse({
      res,
      result: deletedPatientExercise,
      message: "Patient exercise removed successfully"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};