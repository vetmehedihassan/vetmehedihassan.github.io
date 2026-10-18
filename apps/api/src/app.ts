import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { corsMiddleware } from './shared/middleware/cors';
import { healthRoutes } from './app/health/routes/health.routes';

export const app = new Hono();

app.use('*', corsMiddleware);

app.route('/api/v1/health', healthRoutes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  if (err instanceof ZodError) {
    return c.json({ error: 'Validation failed', issues: err.issues }, 400);
  }
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});
