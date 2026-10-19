import { z } from 'zod';
import { ContentStatus } from '../../shared/constants/content-status';

export const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  status: z.nativeEnum(ContentStatus).default(ContentStatus.DRAFT),
  publishedAt: z.coerce.date().nullable().optional(),
});
