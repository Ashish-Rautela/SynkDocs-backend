const ApiResponse = require('../responses/apiResponse');
const { AppError } = require('../errors');
const { HTTP_STATUS, ERROR_CODES } = require('../constants');

const errorMiddleware = (error, logger) => {
  if (logger) {
    logger.logError(error);
  }

  if (error instanceof AppError) {
    return ApiResponse.error(error.message, error.code, error.statusCode, error.data);
  }

  // Fallback for unexpected errors
  return ApiResponse.error(
    error.message || 'An unexpected internal server error occurred',
    ERROR_CODES.INTERNAL_ERROR,
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === 'development' ? { stack: error.stack } : null
  );
};

module.exports = errorMiddleware;
