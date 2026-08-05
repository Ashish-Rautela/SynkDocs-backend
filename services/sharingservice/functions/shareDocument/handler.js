const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { shareDocumentSchema } = require('./validation');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('ShareDocumentHandler');

class ShareDocumentHandler {
  constructor(shareDocumentService) {
    this.shareDocumentService = shareDocumentService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(shareDocumentSchema, body);

      const result = await this.shareDocumentService.shareDocument(userContext, validatedData);

      const response = ApiResponse.success(result, 'Document shared successfully', HTTP_STATUS.CREATED);
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = ShareDocumentHandler;
