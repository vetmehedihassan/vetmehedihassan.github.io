import { z } from 'zod';
import { ContactSubmissionStatus } from '../models/contact-submission.model';

export const createContactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export const updateContactStatusSchema = z.object({
  status: z.nativeEnum(ContactSubmissionStatus),
});
