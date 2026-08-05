const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { createDocumentSchema } = require('./validation');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('CreateDocumentHandler');

class CreateDocumentHandler {
  constructor(createDocumentService) {
    this.createDocumentService = createDocumentService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(createDocumentSchema, body);

      const result = await this.createDocumentService.createDocument(userContext, validatedData);

      const response = ApiResponse.success(result, 'Document created successfully', HTTP_STATUS.CREATED);
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = CreateDocumentHandler;
