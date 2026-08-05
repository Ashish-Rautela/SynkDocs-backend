const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const JwtHelper = require('../../../../shared/jwt/jwtHelper');
const { connectSchema } = require('./validation');

const logger = new Logger('WebSocketConnectHandler');

class ConnectHandler {
  constructor(connectService) {
    this.connectService = connectService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const connectionId = event.requestContext.connectionId;
      const queryParams = event.queryStringParameters || {};
      const token = queryParams.token;
      const documentId = queryParams.documentId;

      if (!token || !documentId) {
        return { statusCode: 400, body: 'Missing token or documentId query parameter' };
      }

      const decoded = JwtHelper.verifyAccessToken(token);
      const validatedData = Validator.validate(connectSchema, {
        connectionId,
        documentId,
        userId: decoded.userId
      });

      await this.connectService.handleConnect(validatedData);

      logger.info('WebSocket connection established', { connectionId, documentId, userId: decoded.userId });
      return { statusCode: 200, body: 'Connected' };
    } catch (err) {
      logger.logError(err);
      return { statusCode: 401, body: 'Unauthorized Connection' };
    }
  }
}

module.exports = ConnectHandler;
