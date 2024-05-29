import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { apiResponse, errorResponse } from '../utils/api-response.util';

const prisma = new PrismaClient();

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await prisma.exercise.findMany();
    return apiResponse({
      res,
      result: exercises
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const exercise = await prisma.exercise.findUnique({
      where: { exerciseId: Number(id) },
    });
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    return apiResponse({
      res,
      result: exercise
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  const {
    exerciseCategoryId,
    thumbnail,
    title,
    description,
    duration,
    difficulty,
    content,
    videoUrl,
  } = req.body;
  try {
    const newExercise = await prisma.exercise.create({
      data: {
        exerciseCategoryId,
        thumbnail,
        title,
        description,
        duration,
        difficulty,
        content,
        videoUrl,
      },
    });
    return apiResponse({
      res,
      result: newExercise,
      message: "Exercise created"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    exerciseCategoryId,
    thumbnail,
    title,
    description,
    duration,
    difficulty,
    content,
    videoUrl,
  } = req.body;
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { exerciseId: Number(id) },
      data: {
        exerciseCategoryId,
        thumbnail,
        title,
        description,
        duration,
        difficulty,
        content,
        videoUrl,
      },
    });
    return apiResponse({
      res,
      result: updatedExercise,
      message: "Exercise updated"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedExercise = await prisma.exercise.delete({
      where: { exerciseId: Number(id) },
    });
    return apiResponse({
      res,
      result: deletedExercise,
      message: "Exercise deleted"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
