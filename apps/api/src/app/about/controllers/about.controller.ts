import { Hono } from 'hono';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { aboutService } from '../services/about.service';
import { upsertAboutSchema } from '../validations/about.validation';

export const aboutController = new Hono();

aboutController.get('/', async (c) => {
  const about = await aboutService.getAbout();
  return c.json(about);
});

aboutController.patch('/', requireAuth, async (c) => {
  const body = upsertAboutSchema.parse(await c.req.json());
  const about = await aboutService.upsertAbout(body);
  return c.json(about);
});
