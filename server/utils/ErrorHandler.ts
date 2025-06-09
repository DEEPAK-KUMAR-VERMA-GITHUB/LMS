class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  static wrongCredentials(message: string) {
    return new ErrorHandler(message, 400);
  }
  static unAuthorized(message: string) {
    return new ErrorHandler(message, 401);
  }
  static forbidden(message: string) {
    return new ErrorHandler(message, 403);
  }
  static notFound(message: string) {
    return new ErrorHandler(message, 404);
  }
  static conflict(message: string) {
    return new ErrorHandler(message, 409);
  }
  static validationError(message: string) {
    return new ErrorHandler(message, 422);
  }
  static serverError(message: string) {
    return new ErrorHandler(message, 500);
  }
}

export default ErrorHandler;
