import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { corsMiddleware } from './shared/middleware/cors';
import { healthRoutes } from './app/health/routes/health.routes';
import { authRoutes } from './app/auth/routes/auth.routes';
import { aboutRoutes } from './app/about/routes/about.routes';
import { experienceRoutes } from './app/experience/routes/experience.routes';
import { expertiseRoutes } from './app/expertise/routes/expertise.routes';
import { educationRoutes } from './app/education/routes/education.routes';
import { achievementRoutes } from './app/achievements/routes/achievement.routes';
import { resumeRoutes } from './app/resume/routes/resume.routes';
import { blogRoutes } from './app/blogs/routes/blog.routes';
import { appointmentRoutes } from './app/appointments/routes/appointment.routes';
import { contactRoutes } from './app/contact/routes/contact.routes';

export const app = new Hono();

app.use('*', corsMiddleware);

app.route('/api/v1/health', healthRoutes);
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/about', aboutRoutes);
app.route('/api/v1/experience', experienceRoutes);
app.route('/api/v1/expertise', expertiseRoutes);
app.route('/api/v1/education', educationRoutes);
app.route('/api/v1/achievements', achievementRoutes);
app.route('/api/v1/resume', resumeRoutes);
app.route('/api/v1/blogs', blogRoutes);
app.route('/api/v1/appointments', appointmentRoutes);
app.route('/api/v1/contact', contactRoutes);

interface ServiceError {
  type: string;
  message: string;
  statusCode: number;
}

function isServiceError(err: unknown): err is ServiceError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'statusCode' in err &&
    'message' in err &&
    typeof (err as ServiceError).statusCode === 'number'
  );
}

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  if (err instanceof ZodError) {
    return c.json({ error: 'Validation failed', issues: err.issues }, 400);
  }
  // Service-layer errors are thrown as plain objects (see e.g. auth.service.ts),
  // not Error instances, so they need their own check here.
  if (isServiceError(err)) {
    return c.json({ error: err.message, type: err.type }, err.statusCode as never);
  }
  console.error(err);
  return c.json({ error: 'Internal server error' }, 500);
});
