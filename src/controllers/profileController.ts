import { Request, Response } from "express";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import prisma from "../lib/prisma";
import { UserRole } from "@prisma/client";
import { STATUS_CODES } from "../constants";

export const getProfileById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        patientRecordPatient: {
          include: {
            doctor: true,
          }
        },
        patientExercise: true,
      }
    });
    if (!user) return errorResponse({ res, error: "No Result Found", statusCode: STATUS_CODES.NOT_FOUND });
    if (user.role === UserRole.PATIENT) {
      const { patientRecordPatient, ...patient } = user;
      const patientResult: any = patient;
      patientResult.patientRecord = patientRecordPatient[0];
      return apiResponse({
        res,
        result: patientResult,
      });
    }

    // USER ROLE IS DOCTOR
    return apiResponse({
      res,
      result: user,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    fullname,
    gender,
    age,
    ic,
  } = req.body;
  try {
    const updatedProfile = await prisma.user.update({
      where: { id: id },
      data: {
        fullname,
        gender,
        age,
        ic,
      },
    });
    return apiResponse({
      res,
      result: updatedProfile,
      message: "Profile updated"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};