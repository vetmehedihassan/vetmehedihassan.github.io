import { Hono } from 'hono';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { resumeService } from '../services/resume.service';
import { upsertResumeSchema } from '../validations/resume.validation';

export const resumeController = new Hono();

resumeController.get('/', async (c) => {
  const resume = await resumeService.getResume();
  return c.json(resume);
});

resumeController.patch('/', requireAuth, async (c) => {
  const body = upsertResumeSchema.parse(await c.req.json());
  const resume = await resumeService.upsertResume(body.driveUrl);
  return c.json(resume);
});
