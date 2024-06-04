import { Request, Response } from 'express';
import { apiResponse, errorResponse } from '../utils/api-response.util';
import prisma from '../lib/prisma';
import { STATUS_CODES } from '../constants';


export const getAllPatients = async (req: Request, res: Response) => {
    const doctorId = req.params.id;
    try {

      // Get all patients in the hospital
      const patients = await prisma.user.findMany({
        where: {
            role: 'PATIENT'
        }
      });

      // Get all patients that is under managed by the doctor already
      const managedPatientIds = await prisma.patientRecord.findMany({
        where: { doctorId },
        select: { patientId: true } 
      });

      const managedIdsSet = new Set(managedPatientIds.map(record => record.patientId));
      const availablePatients = patients.filter(patient => !managedIdsSet.has(patient.id));

      return apiResponse({
        res,
        result: availablePatients
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
        doctorId: doctorId
      },
      include: {
        doctor: true,
        patient: true,
        appointment: true,
        assessment: true,
        exercise: true
      }
    });
    return apiResponse({
      res,
      result: patients
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};


export const insertPatientRecord = async (req: Request, res: Response) => {
  const {
   doctorId,
   patientId
  } = req.body;
  try {
    // Check if the doctor exists
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId, role: "DOCTOR" },
    });

    if (!doctor) return errorResponse({
        res,
        error: new Error('No Doctor Found'),
        statusCode: STATUS_CODES.NOT_FOUND,
    })
    

    // Check if the patient exists
    const patient = await prisma.user.findUnique({
      where: { id: patientId, role: "PATIENT" },
    });

    if (!patient) return errorResponse({
      res,
      error: new Error('No Patient Found'),
      statusCode: STATUS_CODES.NOT_FOUND,
    });
    

    const newRecord = await prisma.patientRecord.create({
      data: {
        doctorId,
        patientId
      },
    });
    return apiResponse({
      res,
      result: newRecord,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};




// export const deletePatientRecord = async (req: Request, res: Response) => {
//   const patientRecordId  = req.params.id;

//   try {
//     const patientRecord = await prisma.patientRecord.delete({
//       where: {
//         id: patientRecordId
//       }
//     })
//   } catch (error) {
//     return errorResponse({ res, error });
//   }
// }