const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');

const logger = new Logger('HealthCheckHandler');

class HealthHandler {
  constructor(healthService) {
    this.healthService = healthService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const result = await this.healthService.checkHealth();
      const response = ApiResponse.success(result, 'SynkDocs Backend System Operational');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = HealthHandler;
