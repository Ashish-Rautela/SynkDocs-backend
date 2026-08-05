const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { getDocumentSchema } = require('./validation');

const logger = new Logger('GetDocumentHandler');

class GetDocumentHandler {
  constructor(getDocumentService) {
    this.getDocumentService = getDocumentService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const validatedData = Validator.validate(getDocumentSchema, { documentId });

      const result = await this.getDocumentService.getDocument(userContext, validatedData.documentId);

      const response = ApiResponse.success(result, 'Document fetched successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = GetDocumentHandler;
