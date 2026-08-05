const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { verifyTokenSchema } = require('./validation');

const logger = new Logger('AuthVerifyTokenHandler');

class VerifyTokenHandler {
  constructor(verifyTokenService) {
    this.verifyTokenService = verifyTokenService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(verifyTokenSchema, body);

      const result = await this.verifyTokenService.verifyToken(validatedData.token);

      const response = ApiResponse.success(result, 'Token verification complete');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = VerifyTokenHandler;
