import prisma from "../lib/prisma";
import { apiResponse, errorResponse } from "../utils/api-response.util";
import { Request, Response } from 'express';
import { copyDay, formatDate, formatTime } from "../utils/utils";
import { io } from "..";
import { sendNotification } from "../services/notifications.service";

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [
          { doctorId: id },
          { patientId: id },
        ]
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        patient: true,
        doctor: true,
      }
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

  const convertedStartTime = copyDay(startTime, date);
  const convertedEndTime = copyDay(endTime, date);

  try {
    // Check if there's any appointment that overlaps with the provided time for the same doctor
    const overlappingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        OR: [
          {
            startTime: {
              lte: convertedEndTime,
            },
            endTime: {
              gte: convertedStartTime,
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
        startTime: convertedStartTime,
        endTime: convertedEndTime,
        doctorId,
        patientId,
      },
    });

    // create notification
    await sendNotification({
      userId: patientId,
      title: "You have a new appointment!",
      message: `New appointment is scheduled for ${formatDate(date)} from ${formatTime(startTime)} to ${formatTime(endTime)}.`,
      redirectUrl: `/appointments`
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

  const convertedStartTime = copyDay(startTime, date);
  const convertedEndTime = copyDay(endTime, date);

  try {
    // Check if there's any appointment that overlaps with the provided time for the same doctor
    const overlappingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        id: { not: id }, // Exclude the current appointment being updated
        OR: [
          {
            startTime: {
              lte: convertedEndTime,
            },
            endTime: {
              gte: convertedStartTime,
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

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        startTime: convertedStartTime,
        endTime: convertedEndTime,
        doctorId,
        patientId,
        updatedDatetime: new Date(),
      },
    });

    // create notification
    await sendNotification({
      userId: patientId,
      title: "One of your appointment has been updated!",
      message: `The updated appointment is scheduled for ${formatDate(date)} from ${formatTime(startTime)} to ${formatTime(endTime)}.`,
      redirectUrl: `/appointments`
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

    // create notification
    await sendNotification({
      userId: deletedAppointment.patientId,
      title: "One of your appointment has been cancelled!",
      message: `The appointment for ${formatDate(deletedAppointment.date)} from ${formatTime(deletedAppointment.startTime)} to ${formatTime(deletedAppointment.endTime)} has been cancelled`,
      redirectUrl: `/appointments`
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


