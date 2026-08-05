const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { deleteDocumentSchema } = require('./validation');

const logger = new Logger('DeleteDocumentHandler');

class DeleteDocumentHandler {
  constructor(deleteDocumentService) {
    this.deleteDocumentService = deleteDocumentService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const validatedData = Validator.validate(deleteDocumentSchema, { documentId });

      const result = await this.deleteDocumentService.deleteDocument(userContext, validatedData.documentId);

      const response = ApiResponse.success(result, 'Document deleted successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = DeleteDocumentHandler;
