const { HTTP_STATUS, ERROR_CODES } = require('../constants');

class AppError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, code = ERROR_CODES.INTERNAL_ERROR, data = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
