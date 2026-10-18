import { cors } from 'hono/cors';
import { env } from '../../config/env';

export const corsMiddleware = cors({
  origin: env.allowedOrigins.includes('*') ? '*' : env.allowedOrigins,
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
});
