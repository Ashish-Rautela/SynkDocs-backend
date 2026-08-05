const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { refreshTokenSchema } = require('./validation');

const logger = new Logger('AuthRefreshTokenHandler');

class RefreshTokenHandler {
  constructor(refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(refreshTokenSchema, body);

      const result = await this.refreshTokenService.refreshToken(validatedData.refreshToken);

      const response = ApiResponse.success(result, 'Token refreshed successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RefreshTokenHandler;
