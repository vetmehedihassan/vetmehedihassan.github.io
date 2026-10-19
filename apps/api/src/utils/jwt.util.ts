import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  accessTokenExpires: Date;
  refreshToken: string;
  refreshTokenExpires: Date;
}

const ACCESS_TOKEN_TTL_MINUTES = 15;
const REFRESH_TOKEN_TTL_DAYS = 7;

export function generateTokenPair(payload: TokenPayload): TokenPair {
  const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: `${ACCESS_TOKEN_TTL_MINUTES}m`,
  });
  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d`,
  });

  return {
    accessToken,
    accessTokenExpires: new Date(Date.now() + ACCESS_TOKEN_TTL_MINUTES * 60 * 1000),
    refreshToken,
    refreshTokenExpires: new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000),
  };
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtRefreshSecret) as TokenPayload;
}
