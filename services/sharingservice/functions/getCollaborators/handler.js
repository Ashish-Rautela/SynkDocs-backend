const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { getCollaboratorsSchema } = require('./validation');

const logger = new Logger('GetCollaboratorsHandler');

class GetCollaboratorsHandler {
  constructor(getCollaboratorsService) {
    this.getCollaboratorsService = getCollaboratorsService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const validatedData = Validator.validate(getCollaboratorsSchema, { documentId });

      const result = await this.getCollaboratorsService.getCollaborators(userContext, validatedData.documentId);

      const response = ApiResponse.success(result, 'Collaborators fetched successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = GetCollaboratorsHandler;
