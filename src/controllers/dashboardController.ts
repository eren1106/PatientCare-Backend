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
        where: { 
          doctorId : doctorId,
          isDelete : false
        },
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
            updatedDatetime: true
          }
        }
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
   patientId,
   ic_no,
   age,
   gender,
   weight,
   height
  } = req.body.patientRecord;

  const doctorId = req.params.id;
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
        patientId,
        ic_no,
        age,
        gender,
        weight,
        height,
        isDelete: false, // Ensure to set this field if required, with a default value
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



export const getPatientRecordsDetails = async (req: Request, res: Response) => {
  const patientRecordId = req.params.id;
  try {
    const patients = await prisma.patientRecord.findUnique({
      where: {
        id: patientRecordId
      },
      include: {
        doctor: true,
        patient: true,
        appointment: true,
        assessment: true,
        exercise: true,
        injuries: true
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

export const updatePatientRecordsDetails = async (req: Request, res: Response) => {
  console.log("Request body update patient record",req.body);
  const { id, ic_no, age, gender, weight, height } = req.body;
  
  try {
    // Find the existing PatientRecord
    const existingRecord = await prisma.patientRecord.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return errorResponse({ res, error: 'PatientRecord not found' });
    }

    // Update the PatientRecord
    const updatedPatientRecord = await prisma.patientRecord.update({
      where: { id },
      data: {
        ic_no,
        age,
        gender,
        weight,
        height,
        updatedDatetime: new Date(), 
      }
    });

    // Send the updated records in the response
    return apiResponse({ res, result: updatedPatientRecord });
  } catch (error) {
    console.error('Error updating PatientRecord:', error);
    return errorResponse({ res, error });
  }
};

export const deletePatientRecord = async (req: Request, res: Response) => {
  const patientRecordId = req.params.id;
  try {
   
    const deletedPatientRecord = await prisma.patientRecord.update({
      where: {
        id: patientRecordId
      },
      data: {
        isDelete: true
      }
    });

    return apiResponse({
      res,
      result: deletedPatientRecord,
      message: "Patient record deleted"
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
