const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { restoreSnapshotSchema } = require('./validation');

const logger = new Logger('RestoreSnapshotHandler');

class RestoreSnapshotHandler {
  constructor(restoreSnapshotService) {
    this.restoreSnapshotService = restoreSnapshotService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const documentId = event.pathParameters?.id;
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(restoreSnapshotSchema, { ...body, documentId });

      const result = await this.restoreSnapshotService.restoreSnapshot(userContext, validatedData);

      const response = ApiResponse.success(result, 'Snapshot restored successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RestoreSnapshotHandler;
