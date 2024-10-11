import { UserRole } from "@prisma/client";
import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { Request, Response } from "express";

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.user.findMany({
      where: {
        role: UserRole.PATIENT,
        isDelete: false,
      }
    });
    return apiResponse({
      res,
      result: patients,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getAllPatientsByDoctorId = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  try {
    const patients = await prisma.user.findMany({
      where: {
        role: UserRole.PATIENT,
        isDelete: false,
        patientRecordPatient: {
          some: {
            doctorId,
          },
        },
      }
    });

    return apiResponse({
      res,
      result: patients,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};