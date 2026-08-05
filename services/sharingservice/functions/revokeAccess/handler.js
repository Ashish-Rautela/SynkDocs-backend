const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { revokeAccessSchema } = require('./validation');

const logger = new Logger('RevokeAccessHandler');

class RevokeAccessHandler {
  constructor(revokeAccessService) {
    this.revokeAccessService = revokeAccessService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(revokeAccessSchema, body);

      const result = await this.revokeAccessService.revokeAccess(userContext, validatedData);

      const response = ApiResponse.success(result, 'Access revoked successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RevokeAccessHandler;
