const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');

const logger = new Logger('GetPendingRequestsHandler');

class GetPendingRequestsHandler {
  constructor(getPendingRequestsService) {
    this.getPendingRequestsService = getPendingRequestsService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);

      const result = await this.getPendingRequestsService.getPendingRequests(userContext);

      const response = ApiResponse.success(result, 'Pending requests fetched successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = GetPendingRequestsHandler;
