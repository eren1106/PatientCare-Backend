import { Router } from 'express';
import { createAppointment, deleteAppointment, getAppointmentById, getAppointmentsByUserId, updateAppointment } from '../controllers/appointmentController';

const router = Router();

router.get('/user/:id', getAppointmentsByUserId);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export { router as appointmentRoutes };