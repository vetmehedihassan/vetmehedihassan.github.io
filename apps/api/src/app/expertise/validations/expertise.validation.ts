import { z } from 'zod';
import { ContentStatus } from '../../shared/constants/content-status';

export const expertiseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().default(0),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});
