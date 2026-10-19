import { z } from 'zod';
import { ExperienceType } from '../models/experience.model';
import { ContentStatus } from '../../shared/constants/content-status';

export const experienceSchema = z.object({
  type: z.nativeEnum(ExperienceType),
  title: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  isCurrent: z.boolean().default(false),
  bullets: z.array(z.string()).default([]),
  order: z.number().default(0),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});
