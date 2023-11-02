export class CustomServerError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
  }
}
