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
  const { title, description, startTime, endTime, doctorId, patientId } = req.body;

  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        title,
        description,
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
  const { title, description, startTime, endTime, doctorId, patientId } = req.body;

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        title,
        description,
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


