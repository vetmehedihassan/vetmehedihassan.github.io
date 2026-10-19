export interface LoginRequest {
  email: string;
  password: string;
}

export enum AuthErrorType {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export interface AuthServiceError {
  type: AuthErrorType;
  message: string;
  statusCode: number;
}
