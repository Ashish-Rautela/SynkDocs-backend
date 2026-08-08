const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('AICallHandler');

class AICallHandler {
  constructor(aiCallService) {
    this.aiCallService = aiCallService;
  }

  async handle(event) {
    logger.info('Full Raw Incoming Request', { event });
    try {
      // Robust body parsing — handles normal, double-stringified, and object bodies
      let body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      logger.info('Parsed Request Body', { body });

      const { text } = body;

      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return ApiResponse.error(
          'Missing or empty "text" field in request body',
          'VALIDATION_ERROR',
          HTTP_STATUS.BAD_REQUEST
        );
      }

      const result = await this.aiCallService.extractExpense(text.trim());

      const response = ApiResponse.success(result, 'Expense extracted successfully', HTTP_STATUS.OK);
      logger.info('Full Outgoing Response', { response });
      return response;
    } catch (err) {
      const errResponse = errorMiddleware(err, logger);
      logger.info('Full Error Outgoing Response', { response: errResponse });
      return errResponse;
    }
  }
}

module.exports = AICallHandler;
