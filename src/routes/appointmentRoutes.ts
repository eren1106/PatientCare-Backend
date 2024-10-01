import { Router } from 'express';
import { createAppointment, deleteAppointment, getAppointmentById, getAppointmentsByDoctorId, updateAppointment } from '../controllers/appointmentController';

const router = Router();

router.get('/doctor/:doctorId', getAppointmentsByDoctorId);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export { router as appointmentRoutes };