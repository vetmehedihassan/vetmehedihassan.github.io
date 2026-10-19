import { z } from 'zod';
import { ContentStatus } from '../../shared/constants/content-status';

export const educationSchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  startYear: z.number(),
  endYear: z.number(),
  order: z.number().default(0),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});
