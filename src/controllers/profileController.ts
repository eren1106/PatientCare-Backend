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
        patientRecordDoctor: true,
        patientExercise: true,
        doctorValidation: true,
      }
    });
    if (!user || user.isDelete) return errorResponse({ res, error: "No Result Found", statusCode: STATUS_CODES.NOT_FOUND });
    if (user.role === UserRole.PATIENT) {
      const { patientRecordPatient, patientRecordDoctor, doctorValidation, ...patient } = user;
      const patientResult: any = patient;
      patientResult.patientRecord = patientRecordPatient[0];
      return apiResponse({
        res,
        result: patientResult,
      });
    }

    // USER ROLE IS DOCTOR
    const { patientRecordPatient, patientRecordDoctor, patientExercise, ...doctor } = user;
    const doctorResult: any = doctor;
    doctorResult.patientRecord = patientRecordDoctor;
    return apiResponse({
      res,
      result: doctorResult,
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

export const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isDelete: true,
      }
    });

    return apiResponse({
      res,
      result: deletedUser,
      message: "Deleted Account Successfully"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};