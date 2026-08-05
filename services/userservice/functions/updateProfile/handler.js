const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { updateProfileSchema } = require('./validation');

const logger = new Logger('UpdateProfileHandler');

class UpdateProfileHandler {
  constructor(updateProfileService) {
    this.updateProfileService = updateProfileService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(updateProfileSchema, body);

      const result = await this.updateProfileService.updateProfile(userContext, validatedData);

      const response = ApiResponse.success(result, 'Profile updated successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = UpdateProfileHandler;
