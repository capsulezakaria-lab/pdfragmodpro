export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 400,
    public details?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401)
    this.name = "UnauthorizedError"
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(message, 404)
    this.name = "NotFoundError"
  }
}

export class RateLimitError extends ApiError {
  constructor(message = "Too many requests") {
    super(message, 429)
    this.name = "RateLimitError"
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(message, 422, details)
    this.name = "ValidationError"
  }
}
