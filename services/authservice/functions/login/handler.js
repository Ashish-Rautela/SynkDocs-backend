const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { loginSchema } = require('./validation');

const logger = new Logger('AuthLoginHandler');

class LoginHandler {
  constructor(loginService) {
    this.loginService = loginService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(loginSchema, body);

      const result = await this.loginService.login(validatedData);

      const response = ApiResponse.success(result, 'Login successful');
      logger.logResponse(response);
      return response;
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }
}

module.exports = LoginHandler;
