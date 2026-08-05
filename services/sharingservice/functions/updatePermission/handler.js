const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { updatePermissionSchema } = require('./validation');

const logger = new Logger('UpdatePermissionHandler');

class UpdatePermissionHandler {
  constructor(updatePermissionService) {
    this.updatePermissionService = updatePermissionService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(updatePermissionSchema, body);

      const result = await this.updatePermissionService.updatePermission(userContext, validatedData);

      const response = ApiResponse.success(result, 'Permission updated successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = UpdatePermissionHandler;
