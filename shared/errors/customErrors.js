const AppError = require('./appError');
const { HTTP_STATUS, ERROR_CODES } = require('../constants');

class NotFoundError extends AppError {
  constructor(message = 'Resource not found', data = null) {
    super(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, data);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', code = ERROR_CODES.UNAUTHORIZED, data = null) {
    super(message, HTTP_STATUS.UNAUTHORIZED, code, data);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden', data = null) {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN, data);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed', data = null) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR, data);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Resource conflict', data = null) {
    super(message, HTTP_STATUS.CONFLICT, ERROR_CODES.CONFLICT, data);
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  ConflictError
};
