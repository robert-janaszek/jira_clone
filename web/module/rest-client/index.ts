import { HttpError } from "./error";

export type RestClientOptions = Omit<RequestInit, 'body'> & {
  body?: any
}

export abstract class RestClient {
  protected async get<TResponse>(endpoint: string, options?: RestClientOptions) {
    return this.runRequest<TResponse>(endpoint, 'GET', options);
  }
  protected async post<TResponse>(endpoint: string, options?: RestClientOptions) {
    return this.runRequest<TResponse>(endpoint, 'POST', options);
  }
  protected async put<TResponse>(endpoint: string, options?: RestClientOptions) {
    return this.runRequest<TResponse>(endpoint, 'PUT', options);
  }
  protected async patch<TResponse>(endpoint: string, options?: RestClientOptions) {
    return this.runRequest<TResponse>(endpoint, 'PATCH', options);
  }
  protected async delete<TResponse>(endpoint: string, options?: RestClientOptions) {
    return this.runRequest<TResponse>(endpoint, 'DELETE', options);
  }

  private async runRequest<TResponse>(endpoint: string, method: string, options?: RestClientOptions) {
    const { body, headers, ...restOptions} = options ?? {};
    const contentType = this.getContentType(body);
    const transformedBody = this.transformBody(body, contentType);

    const response = await fetch(endpoint, {
      method,
      headers: {
        // fallback content-type - headers will overwrite it
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...headers,
      },
      ...restOptions,
      body: transformedBody,
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      throw new HttpError(response.status, response.statusText, errorBody);
    }

    try {
      return await response.json() as TResponse
    } catch (_) {
      // TODO: probably should log that TResponse should extend string
      return response.text() as unknown as TResponse
    }
  }

  // TODO: should take headers content-type into consideration first
  private getContentType(body?: BodyInit | null | undefined): string | undefined {
    if (!body) {
      return undefined
    }

    try {
      JSON.stringify(body)
      return 'application/json'
    } catch (_) {
      return 'text/plain'
    }
  }

  private transformBody(body: BodyInit | null | undefined, contentType: string | undefined) {
    if (!body) {
      return undefined;
    }

    if (contentType === 'application/json') {
      return JSON.stringify(body)
    }

    return body;
  }
}