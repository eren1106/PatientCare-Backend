import { Router } from 'express';
import { confirmAppointment, createAppointment, deleteAppointment, getAppointmentById, getAppointmentsByUserId, updateAppointment } from '../controllers/appointmentController';

const router = Router();

router.get('/user/:id', getAppointmentsByUserId);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
router.put('/:id/confirm', confirmAppointment);

export { router as appointmentRoutes };