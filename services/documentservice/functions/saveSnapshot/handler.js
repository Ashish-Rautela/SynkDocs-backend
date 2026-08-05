const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { saveSnapshotSchema } = require('./validation');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('SaveSnapshotHandler');

class SaveSnapshotHandler {
  constructor(saveSnapshotService) {
    this.saveSnapshotService = saveSnapshotService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(saveSnapshotSchema, { ...body, documentId });

      const result = await this.saveSnapshotService.saveSnapshot(userContext, validatedData);

      const response = ApiResponse.success(result, 'Snapshot saved successfully', HTTP_STATUS.CREATED);
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = SaveSnapshotHandler;
