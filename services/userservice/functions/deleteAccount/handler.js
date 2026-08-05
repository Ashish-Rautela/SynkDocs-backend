const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const authMiddleware = require('../../../../shared/middleware/authMiddleware');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { deleteAccountSchema } = require('./validation');

const logger = new Logger('DeleteAccountHandler');

class DeleteAccountHandler {
  constructor(deleteAccountService) {
    this.deleteAccountService = deleteAccountService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const userContext = authMiddleware(event);
      const body = JSON.parse(event.body || '{}');
      Validator.validate(deleteAccountSchema, body);

      const result = await this.deleteAccountService.deleteAccount(userContext);

      const response = ApiResponse.success(result, 'Account deleted successfully');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = DeleteAccountHandler;
