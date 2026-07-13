export default Object.freeze({
  SUCCESS: {
    code: 0,
    statusCode: 200,
    message: "Request completed successfully.",
  },

  VALIDATION_ERROR: {
    code: 1000,
    statusCode: 400,
    message: "Validation failed.",
  },

  INVALID_SERVICE_CODE: {
    code: 1001,
    statusCode: 400,
    message: "Invalid serviceCode.",
  },

  MISSING_REQUIRED_FIELD: {
    code: 1002,
    statusCode: 400,
    message: "A required field is missing.",
  },

  INVALID_GROSS_PAY: {
    code: 1003,
    statusCode: 400,
    message: "grossPay must be a number greater than 0.",
  },

  INVALID_CONTENT_TYPE: {
    code: 1004,
    statusCode: 400,
    message: "Content-Type must be application/json.",
  },

  METHOD_NOT_ALLOWED: {
    code: 1005,
    message: "HTTP method not allowed.",
  },

  INTERNAL_SERVER_ERROR: {
    code: 2000,
    statusCode: 500,
    message: "An unexpected error occurred.",
  },
});
