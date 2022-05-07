export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response: string
  ) {
    super(response);

    Error.captureStackTrace(this, HttpError);
  }
}