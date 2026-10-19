import { z } from 'zod';
import { AppointmentStatus, ServiceType } from '../models/appointment.model';

export const createAppointmentSchema = z.object({
  petName: z.string().min(1),
  species: z.string().min(1),
  ownerName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  serviceType: z.nativeEnum(ServiceType),
  preferredNote: z.string().optional(),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.nativeEnum(AppointmentStatus),
});
