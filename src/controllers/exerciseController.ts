import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { getYouTubeThumbnail } from '../utils/utils';

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
      where: { id: id },
      include: {
        exerciseCategory: true,
      }
    });
    return apiResponse({
      res,
      result: exercise,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const createExercise = async (req: Request, res: Response) => {
  const {
    exerciseCategoryId,
    // thumbnail,
    title,
    description,
    // duration,
    difficulty,
    content,
    videoUrl,
  } = req.body;
  try {
    const thumbnailUrl = getYouTubeThumbnail(videoUrl);
    const newExercise = await prisma.exercise.create({
      data: {
        exerciseCategoryId,
        thumbnailUrl,
        title,
        description,
        duration: 666, // TODO: determine to put duration in exercise or patientExercise
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
    thumbnailUrl,
    title,
    description,
    // duration,
    difficulty,
    content,
    videoUrl,
  } = req.body;
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id: id },
      data: {
        exerciseCategoryId,
        thumbnailUrl,
        title,
        description,
        // duration,
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
    // check whether got patient exercise refer to this exercise
    const findPatientExercise = await prisma.patientExercise.findFirst({
      where: {
        exerciseId: id,
      }
    });
    if (findPatientExercise) return errorResponse({
      res,
      error: "Unable to delete this exercise because got patient exercise referring to this exercise",
    })
    const deletedExercise = await prisma.exercise.delete({
      where: { id: id },
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

export const getAllExerciseCategories = async (req: Request, res: Response) => {
  try {
    const exerciseCategories = await prisma.exerciseCategory.findMany();
    return apiResponse({
      res,
      result: exerciseCategories
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
}
