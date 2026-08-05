const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { registerSchema } = require('./validation');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('AuthRegisterHandler');

class RegisterHandler {
  constructor(registerService) {
    this.registerService = registerService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(registerSchema, body);

      const result = await this.registerService.registerUser(validatedData);

      const response = ApiResponse.success(result, 'User registered successfully', HTTP_STATUS.CREATED);
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = RegisterHandler;
