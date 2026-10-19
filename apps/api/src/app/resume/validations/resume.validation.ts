import { z } from 'zod';

export const upsertResumeSchema = z.object({
  driveUrl: z.string().url(),
});
