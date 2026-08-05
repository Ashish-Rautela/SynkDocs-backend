const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { disconnectSchema } = require('./validation');

const logger = new Logger('WebSocketDisconnectHandler');

class DisconnectHandler {
  constructor(disconnectService) {
    this.disconnectService = disconnectService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const connectionId = event.requestContext.connectionId;
      const validatedData = Validator.validate(disconnectSchema, { connectionId });

      await this.disconnectService.handleDisconnect(validatedData.connectionId);

      logger.info('WebSocket connection disconnected', { connectionId });
      return { statusCode: 200, body: 'Disconnected' };
    } catch (err) {
      logger.logError(err);
      return { statusCode: 500, body: 'Disconnect Error' };
    }
  }
}

module.exports = DisconnectHandler;
