export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export class BaseClient {
  constructor(
    protected baseUrl: string,
    protected getToken?: () => string | null | undefined
  ) {}

  protected async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders(),
    });
    return this.handle<T>(res);
  }

  protected async getNullable<T>(path: string): Promise<T | null> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.buildHeaders(),
    });
    if (res.status === 404) return null;
    return this.handle<T>(res);
  }

  protected async send<T>(path: string, method: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...this.buildHeaders() },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return this.handle<T>(res);
  }

  private buildHeaders(): Record<string, string> {
    const token = this.getToken?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async handle<T>(res: Response): Promise<T> {
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: res.statusText }));
      throw new ApiClientError(body.error ?? res.statusText, res.status);
    }
    return res.json() as Promise<T>;
  }
}
