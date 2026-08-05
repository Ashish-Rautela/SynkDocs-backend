const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { uploadAvatarSchema } = require('./validation');

const logger = new Logger('UploadAvatarHandler');

class UploadAvatarHandler {
  constructor(uploadAvatarService) {
    this.uploadAvatarService = uploadAvatarService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(uploadAvatarSchema, body);

      const result = await this.uploadAvatarService.generateAvatarUploadUrl(userContext, validatedData);

      const response = ApiResponse.success(result, 'Avatar upload URL generated');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = UploadAvatarHandler;
