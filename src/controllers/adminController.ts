import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { STATUS_CODES } from "../constants";
import { DoctorRegistrationStatus } from "@prisma/client";
import { sendEmail } from "../services/emails.service";


export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        isDelete: false,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        age: true,
        gender: true,
        profileImageUrl: true,
        doctorRegistrationStatus: true,
        lastLoginDatetime: true,
        createdDatetime: true,
        updatedDatetime: true,
        doctorValidation: {
          select: {
            id: true,
            registrationNumber: true,
            identityImageUrl: true,
          },
        },
      },
    });

    return apiResponse({
      res,
      result: doctors,
    });
  } catch (error: any) {
    return errorResponse({
      res,
      error: error.message,
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateDoctorRegistrationStatus = async (req: Request, res: Response) => {
    const { doctorId, status } = req.body;
  
    try {
      const updatedDoctor = await prisma.user.update({
        where: { id: doctorId },
        data: {
          doctorRegistrationStatus: status,
        },
      });

      await sendEmail({
        recipientEmail: updatedDoctor.email,
        subject: 'Doctor Registration Completed',
        htmlPart: `
          <h1>Doctor Registration Completed</h1>
          <p>Your email has been successfully verified and your registration as a doctor is complete.</p>
        `
      });
  
      return apiResponse({
        res,
        result: updatedDoctor,
      });
    } catch (error: any) {
      return errorResponse({
        res,
        error: error.message,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
};