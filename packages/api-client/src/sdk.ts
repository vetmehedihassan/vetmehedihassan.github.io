import { HealthClient } from './clients/health.client';

export interface ApiClientConfig {
  baseUrl: string;
  getToken?: () => string | null | undefined;
}

export function createApiClient(config: ApiClientConfig) {
  return {
    health: new HealthClient(config.baseUrl, config.getToken),
    // Additional per-resource clients (projects/experience/blogs/appointments/...)
    // are added here as the API grows those resources.
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
