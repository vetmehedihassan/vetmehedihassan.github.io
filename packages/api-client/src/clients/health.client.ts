import { BaseClient } from './base.client';

export interface HealthStatus {
  status: string;
  timestamp: string;
}

export class HealthClient extends BaseClient {
  check(): Promise<HealthStatus> {
    return this.get<HealthStatus>('/health');
  }
}
