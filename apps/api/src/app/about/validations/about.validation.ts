import { z } from 'zod';

export const upsertAboutSchema = z.object({
  summary: z.string().min(1),
  currentRole: z.string().min(1),
  clinicName: z.string().min(1),
  petsServedStat: z.string().min(1),
  yearsExperienceStat: z.string().min(1),
  bvcRegistrationNumber: z.string().min(1),
});
