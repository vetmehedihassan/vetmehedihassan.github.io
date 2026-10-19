import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { verifyAccessToken } from '../../utils/jwt.util';

export interface AuthContext {
  userId: string;
  email: string;
  role: string;
}

declare module 'hono' {
  interface ContextVariableMap {
    auth: AuthContext;
  }
}

export const requireAuth = createMiddleware(async (c, next) => {
  const header = c.req.header('Authorization');
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;

  if (!token) {
    throw new HTTPException(401, { message: 'Missing access token' });
  }

  try {
    const payload = verifyAccessToken(token);
    c.set('auth', { userId: payload.sub, email: payload.email, role: payload.role });
  } catch {
    throw new HTTPException(401, { message: 'Invalid or expired access token' });
  }

  await next();
});
