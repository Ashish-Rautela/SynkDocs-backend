const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { starredDocumentsSchema } = require('./validation');

const logger = new Logger('StarredDocumentsHandler');

class StarredDocumentsHandler {
  constructor(starredDocumentsService) {
    this.starredDocumentsService = starredDocumentsService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const queryParams = event.queryStringParameters || {};
      const validatedData = Validator.validate(starredDocumentsSchema, queryParams);

      const result = await this.starredDocumentsService.getStarred(userContext, validatedData);

      const response = ApiResponse.success(result, 'Starred documents fetched successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = StarredDocumentsHandler;
