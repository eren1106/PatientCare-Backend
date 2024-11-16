import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';
import { sendNotification } from '../services/notifications.service';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

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

interface PatientExerciseDTO {
  patientId: string,
  exerciseId: string,
  reps: number,
  sets: number,
  frequency: number,
  duration: number,
}
export const createPatientExercise = async (req: Request, res: Response) => {
  // const {patientId} = req.params;
  const dto: PatientExerciseDTO = req.body;
  try {
    const newPatientExercise = await prisma.patientExercise.create({
      data: dto,
      include: { exercise: true }  // to display the exercise title in notification
    });
    const newDailyPatientExercise = await prisma.dailyPatientExercise.create({
      data: {
        patientExerciseId: newPatientExercise.id,
        patientId: dto.patientId
      }
    });

    // create notification
    await sendNotification({
      userId: dto.patientId,
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
  const dto: PatientExerciseDTO = req.body;
  try {
    const updatedPatientExercise = await prisma.patientExercise.update({
      where: {
        id,
      },
      data: dto,
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
            exercise: {
              include: {
                exerciseCategory: true,
              }
            },
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

// get all time daily patient exercises (all, not just today)
export const getAllDailyPatientExercisesByPatientId = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const dailyPatientExercises = await prisma.dailyPatientExercise.findMany({
      where: {
        patientId,
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

// TODO: modify it so that can get any month
// get exercise completion summary of current month
export const getExerciseCompletionSummaryByPatientId = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    // Get the start and end of the current month
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    // Fetch all daily exercises within the current month for the specified patient
    const dailyExercises = await prisma.dailyPatientExercise.findMany({
      where: {
        patientId: patientId,
        createdDatetime: {
          gte: start,
          lte: end,
        },
      },
    });

    // Map the exercises by day
    const dayMap = dailyExercises.reduce((acc, exercise) => {
      const day = format(exercise.createdDatetime, 'd'); // Day of the month
      if (!acc[day]) {
        acc[day] = { total: 0, completed: 0 };
      }
      acc[day].total += 1;
      if (exercise.isCompleted) {
        acc[day].completed += 1;
      }
      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    // Calculate percentages for each day in the month
    const daysInMonth = eachDayOfInterval({ start, end });
    const results = daysInMonth.map((date) => {
      const day = format(date, 'd');
      const dayData = dayMap[day] || { total: 0, completed: 0 };
      const percentage = dayData.total ? (dayData.completed / dayData.total) * 100 : 0;
      return {
        day: parseInt(day, 10),
        percentage: Math.round(percentage),
      };
    });

    return apiResponse({
      res,
      result: results,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};