const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');

const logger = new Logger('AuthLogoutHandler');

class LogoutHandler {
  constructor(logoutService) {
    this.logoutService = logoutService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const result = await this.logoutService.logoutUser(userContext);

      const response = ApiResponse.success(result, 'User logged out successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = LogoutHandler;
