import { Request, Response } from "express";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import prisma from "../lib/prisma";
import { STATUS_CODES } from "../constants";

interface Injury {
  painRegion: string;
  duration: string;
  painScore: number;
  description: string;
  is_recurrent: string;
}

export const getAllPatients = async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  try {
    // Get all patients in the hospital
    const patients = await prisma.user.findMany({
      where: {
        role: "PATIENT",
      },
    });

    // Get all patients that is under managed by the doctor already
    const managedPatientIds = await prisma.patientRecord.findMany({
      where: {
        doctorId: doctorId,
        isDelete: false,
      },
      select: { patientId: true },
    });

    const managedIdsSet = new Set(
      managedPatientIds.map((record) => record.patientId)
    );
    const availablePatients = patients.filter(
      (patient) => !managedIdsSet.has(patient.id)
    );

    return apiResponse({
      res,
      result: availablePatients,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getAllPatientRecords = async (req: Request, res: Response) => {
  const doctorId = req.params.id;
  try {
    const patients = await prisma.patientRecord.findMany({
      where: {
        doctorId: doctorId,
        isDelete: false,
      },
      select: {
        id: true,
        doctorId: true,
        patientId: true,
        appointment: true,
        patient: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            profileImageUrl: true,
            lastLoginDatetime: true,
            createdDatetime: true,
            updatedDatetime: true,
          },
        },
      },
    });
    return apiResponse({
      res,
      result: patients,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const insertPatientRecord = async (req: Request, res: Response) => {
  const { patientId, weight, height, injury } = req.body.patientRecord;

  const doctorId = req.params.id;
  try {
    // Check if the doctor exists
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId, role: "DOCTOR" },
    });

    if (!doctor)
      return errorResponse({
        res,
        error: new Error("No Doctor Found"),
        statusCode: STATUS_CODES.NOT_FOUND,
      });

    // Check if the patient exists
    const patient = await prisma.user.findUnique({
      where: { id: patientId, role: "PATIENT" },
    });

    if (!patient)
      return errorResponse({
        res,
        error: new Error("No Patient Found"),
        statusCode: STATUS_CODES.NOT_FOUND,
      });

    // Check if the patient record already exists
    const existingRecord = await prisma.patientRecord.findUnique({
      where: {
        doctorId_patientId: {
          doctorId: doctorId,
          patientId: patientId,
        },
      },
    });

    let newRecord;

    if (existingRecord) {
      // Update the existing record's isDelete field to false
      newRecord = await prisma.patientRecord.update({
        where: { id: existingRecord.id },
        data: {
          isDelete: false,
          weight,
          height,
          doctorId,
        },
      });
    } else {
      // Create a new patient record
      newRecord = await prisma.patientRecord.create({
        data: {
          doctorId,
          patientId,
          weight,
          height,
          isDelete: false, // Ensure to set this field if required, with a default value
        },
      });
    }

    // Handle injuries if provided
    if (injury && injury.length > 0) {
      await prisma.injury.createMany({
        data: injury.map((injury : Injury) => ({
          patientRecordId: newRecord.id,
          ...injury,
        })),
      });
    }
    return apiResponse({
      res,
      result: newRecord,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getPatientRecordsDetails = async (req: Request, res: Response) => {
  const patientRecordId = req.params.id;
  try {
    const patients = await prisma.patientRecord.findUnique({
      where: {
        id: patientRecordId,
      },
      include: {
        doctor: true,
        patient: true,
        appointment: true,
        assessment: true,
        exercise: true,
        injuries: true,
      },
    });
    return apiResponse({
      res,
      result: patients,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const updatePatientRecordsDetails = async (
  req: Request,
  res: Response
) => {
  console.log("Request body update patient record", req.body);
  const { id, weight, height } = req.body;

  try {
    // Find the existing PatientRecord
    const existingRecord = await prisma.patientRecord.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return errorResponse({ res, error: "PatientRecord not found" });
    }

    // Update the PatientRecord
    const updatedPatientRecord = await prisma.patientRecord.update({
      where: { id },
      data: {
        weight,
        height,
        updatedDatetime: new Date(),
      },
    });

    // Send the updated records in the response
    return apiResponse({ res, result: updatedPatientRecord });
  } catch (error) {
    console.error("Error updating PatientRecord:", error);
    return errorResponse({ res, error });
  }
};

export const deletePatientRecord = async (req: Request, res: Response) => {
  const patientRecordId = req.params.id;
  try {
    const deletedPatientRecord = await prisma.patientRecord.update({
      where: {
        id: patientRecordId,
      },
      data: {
        isDelete: true,
      },
    });

    return apiResponse({
      res,
      result: deletedPatientRecord,
      message: "Patient record deleted",
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};


// Create new injury
export const createInjury = async (req: Request, res: Response) => {
  const { patientRecordId, painRegion, duration, painScore, description, is_recurrent } = req.body;
  try {
    const injury = await prisma.injury.create({
      data: {
        patientRecordId,
        painRegion,
        duration,
        painScore,
        description,
        is_recurrent,
      },
    });
    return apiResponse({ res, result: injury, message: "Patient new injury created", });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// Update injury
export const updateInjury = async (req: Request, res: Response) => {
  const injuryId = req.params.id;
  const { painRegion, duration, painScore, description, is_recurrent } = req.body;
  try {
    const updatedInjury = await prisma.injury.update({
      where: { id: injuryId },
      data: {
        painRegion,
        duration,
        painScore,
        description,
        is_recurrent,
      },
    });
    return apiResponse({ res, result: updatedInjury });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

// Delete injury
export const deleteInjury = async (req: Request, res: Response) => {
  const injuryId = req.params.id;
  try {
    await prisma.injury.delete({
      where: { id: injuryId },
    });
    return res.status(204).send();
  } catch (error) {
    return errorResponse({ res, error });
  }
};