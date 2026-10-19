import { z } from 'zod';
import { ContentStatus } from '../../shared/constants/content-status';

export const achievementSchema = z.object({
  title: z.string().min(1),
  issuingOrg: z.string().min(1),
  order: z.number().default(0),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
});
