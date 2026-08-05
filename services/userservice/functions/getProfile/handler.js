const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');

const logger = new Logger('GetProfileHandler');

class GetProfileHandler {
  constructor(getProfileService) {
    this.getProfileService = getProfileService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const result = await this.getProfileService.getProfile(userContext);

      const response = ApiResponse.success(result, 'Profile retrieved successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = GetProfileHandler;
