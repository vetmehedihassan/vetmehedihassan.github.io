import { Hono } from 'hono';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { appointmentService } from '../services/appointment.service';
import { createAppointmentSchema, updateAppointmentStatusSchema } from '../validations/appointment.validation';

export const appointmentController = new Hono();

appointmentController.post('/', async (c) => {
  const body = createAppointmentSchema.parse(await c.req.json());
  const appointment = await appointmentService.create(body);
  return c.json(appointment, 201);
});

appointmentController.get('/', requireAuth, async (c) => {
  const appointments = await appointmentService.listAll();
  return c.json(appointments);
});

appointmentController.patch('/:id/status', requireAuth, async (c) => {
  const body = updateAppointmentStatusSchema.parse(await c.req.json());
  const appointment = await appointmentService.updateStatus(c.req.param('id'), body.status);
  return c.json(appointment);
});
