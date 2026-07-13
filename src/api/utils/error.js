import resultCodes from "../config/result-codes.js";

export class AppError extends Error {
  constructor(resultCode, statusCode, message, errorMessage, field) {
    super(message);
    this.resultCode = resultCode;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.field = field;
  }
}

class ServerError extends Error {
  constructor(resultCode, statusCode, message) {
    super(message);
    this.resultCode = resultCode;
    this.statusCode = statusCode;
  }
}

export const serverError = new ServerError(
  resultCodes.INTERNAL_SERVER_ERROR.code,
  resultCodes.INTERNAL_SERVER_ERROR.statusCode,
  resultCodes.INTERNAL_SERVER_ERROR.message,
);
