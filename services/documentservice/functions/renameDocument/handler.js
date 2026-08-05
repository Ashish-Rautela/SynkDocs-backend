const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { renameDocumentSchema } = require('./validation');

const logger = new Logger('RenameDocumentHandler');

class RenameDocumentHandler {
  constructor(renameDocumentService) {
    this.renameDocumentService = renameDocumentService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(renameDocumentSchema, { ...body, documentId });

      const result = await this.renameDocumentService.renameDocument(userContext, validatedData);

      const response = ApiResponse.success(result, 'Document renamed successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RenameDocumentHandler;
