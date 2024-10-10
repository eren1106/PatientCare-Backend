import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { Request, Response } from 'express';

export const getAppointmentsByDoctorId = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
      },
    });
    return apiResponse({
      res,
      result: appointments,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      return errorResponse({ res, error: 'Appointment not found' });
    }
    return apiResponse({
      res,
      result: appointment,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const { title, description, date, startTime, endTime, doctorId, patientId } = req.body;

  try {
    // Check if there's any appointment that overlaps with the provided time for the same doctor
    const overlappingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        OR: [
          {
            startTime: {
              lte: new Date(endTime),
            },
            endTime: {
              gte: new Date(startTime),
            },
          },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      return errorResponse({
        res,
        error: 'Appointment time clashes with an existing appointment.',
      });
    }

    // Proceed with appointment creation
    const newAppointment = await prisma.appointment.create({
      data: {
        title,
        description,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        doctorId,
        patientId,
      },
    });

    return apiResponse({
      res,
      result: newAppointment,
      message: 'Appointment created',
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date, startTime, endTime, doctorId, patientId } = req.body;

  try {
    // Check if there's any other appointment that overlaps with the provided time for the same doctor
    const overlappingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        id: { not: id }, // Exclude the current appointment being updated
        OR: [
          {
            startTime: {
              lte: new Date(endTime),
            },
            endTime: {
              gte: new Date(startTime),
            },
          },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      return errorResponse({
        res,
        error: 'Appointment time clashes with an existing appointment.',
      });
    }

    // Proceed with appointment update
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        doctorId,
        patientId,
        updatedDatetime: new Date(),
      },
    });

    return apiResponse({
      res,
      result: updatedAppointment,
      message: 'Appointment updated',
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};


export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await prisma.appointment.delete({
      where: { id },
    });
    return apiResponse({
      res,
      result: deletedAppointment,
      message: 'Appointment deleted',
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};


