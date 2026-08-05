const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { activeUsersSchema } = require('./validation');

const logger = new Logger('ActiveUsersHandler');

class ActiveUsersHandler {
  constructor(activeUsersService) {
    this.activeUsersService = activeUsersService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const validatedData = Validator.validate(activeUsersSchema, { documentId });

      const result = await this.activeUsersService.getActiveUsers(validatedData.documentId);

      const response = ApiResponse.success(result, 'Active collaborators fetched');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = ActiveUsersHandler;
