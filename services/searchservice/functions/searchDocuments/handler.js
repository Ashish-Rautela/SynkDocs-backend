const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { searchDocumentsSchema } = require('./validation');

const logger = new Logger('SearchDocumentsHandler');

class SearchDocumentsHandler {
  constructor(searchDocumentsService) {
    this.searchDocumentsService = searchDocumentsService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const queryParams = event.queryStringParameters || {};
      const validatedData = Validator.validate(searchDocumentsSchema, queryParams);

      const result = await this.searchDocumentsService.search(userContext, validatedData);

      const response = ApiResponse.success(result, 'Search query executed successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = SearchDocumentsHandler;
