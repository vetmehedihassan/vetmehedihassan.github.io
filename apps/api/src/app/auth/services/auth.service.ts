import { generateTokenPair, verifyRefreshToken } from '../../../utils/jwt.util';
import { verifyPassword } from '../../../utils/password.util';
import RefreshToken from '../../users/models/refresh-token.model';
import { usersService } from '../../users/services/users.service';
import { AuthErrorType, AuthServiceError, LoginRequest } from '../interfaces/auth.interface';

class AuthService {
  async login(data: LoginRequest, userAgent?: string, ipAddress?: string) {
    const { email, password } = data;

    const user = await usersService.findByEmail(email);
    if (!user) {
      throw this.error(AuthErrorType.INVALID_CREDENTIALS, 'Invalid email or password', 401);
    }

    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword) {
      throw this.error(AuthErrorType.INVALID_CREDENTIALS, 'Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw this.error(AuthErrorType.ACCOUNT_DISABLED, 'Account has been disabled', 403);
    }

    const tokenPair = generateTokenPair({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    await RefreshToken.create({
      user: user._id,
      token: tokenPair.refreshToken,
      expiresAt: tokenPair.refreshTokenExpires,
      userAgent,
      ipAddress,
    });

    return {
      user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
      ...tokenPair,
    };
  }

  async logout(refreshToken: string, userId: string): Promise<void> {
    await RefreshToken.updateOne({ token: refreshToken, user: userId }, { isRevoked: true });
  }

  async refreshAccessToken(refreshToken: string, userAgent?: string, ipAddress?: string) {
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw this.error(AuthErrorType.INVALID_TOKEN, 'Invalid or expired refresh token', 401);
    }

    const storedToken = await RefreshToken.findValidToken(refreshToken);
    if (!storedToken) {
      throw this.error(AuthErrorType.INVALID_TOKEN, 'Refresh token has been revoked', 401);
    }

    const user = await usersService.findById(decoded.sub);
    if (!user || !user.isActive) {
      throw this.error(AuthErrorType.ACCOUNT_DISABLED, 'Account not found or disabled', 401);
    }

    const tokenPair = generateTokenPair({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    await RefreshToken.updateOne({ _id: storedToken._id }, { isRevoked: true });
    await RefreshToken.create({
      user: user._id,
      token: tokenPair.refreshToken,
      expiresAt: tokenPair.refreshTokenExpires,
      userAgent,
      ipAddress,
    });

    return tokenPair;
  }

  async getCurrentUser(userId: string) {
    const user = await usersService.findById(userId);
    if (!user) {
      throw this.error(AuthErrorType.USER_NOT_FOUND, 'User not found', 404);
    }
    return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
  }

  private error(type: AuthErrorType, message: string, statusCode: number): AuthServiceError {
    return { type, message, statusCode };
  }
}

export const authService = new AuthService();
