import { Hono } from 'hono';
import { requireAuth } from '../../../shared/middleware/auth.middleware';
import { authService } from '../services/auth.service';
import { loginSchema, refreshSchema } from '../validations/auth.validation';

export const authController = new Hono();

authController.post('/login', async (c) => {
  const body = loginSchema.parse(await c.req.json());
  const userAgent = c.req.header('User-Agent');
  const ipAddress = c.req.header('x-forwarded-for');

  const result = await authService.login(body, userAgent, ipAddress);
  return c.json(result);
});

authController.post('/refresh', async (c) => {
  const body = refreshSchema.parse(await c.req.json());
  const userAgent = c.req.header('User-Agent');
  const ipAddress = c.req.header('x-forwarded-for');

  const result = await authService.refreshAccessToken(body.refreshToken, userAgent, ipAddress);
  return c.json(result);
});

authController.post('/logout', requireAuth, async (c) => {
  const body = refreshSchema.parse(await c.req.json());
  const auth = c.get('auth');

  await authService.logout(body.refreshToken, auth.userId);
  return c.json({ message: 'Logged out' });
});

authController.get('/me', requireAuth, async (c) => {
  const auth = c.get('auth');
  const user = await authService.getCurrentUser(auth.userId);
  return c.json(user);
});
