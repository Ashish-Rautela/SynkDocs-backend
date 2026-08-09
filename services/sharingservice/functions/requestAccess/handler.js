const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { requestAccessSchema } = require('./validation');

const logger = new Logger('RequestAccessHandler');

class RequestAccessHandler {
  constructor(requestAccessService) {
    this.requestAccessService = requestAccessService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(requestAccessSchema, body);

      const result = await this.requestAccessService.requestAccess(userContext, validatedData);

      const response = ApiResponse.success(result, 'Access request sent successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RequestAccessHandler;
