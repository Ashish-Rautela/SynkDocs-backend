const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { heartbeatSchema } = require('./validation');

const logger = new Logger('WebSocketHeartbeatHandler');

class HeartbeatHandler {
  constructor(heartbeatService) {
    this.heartbeatService = heartbeatService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const connectionId = event.requestContext.connectionId;
      const validatedData = Validator.validate(heartbeatSchema, { connectionId });

      await this.heartbeatService.recordHeartbeat(validatedData.connectionId);

      return { statusCode: 200, body: 'PONG' };
    } catch (err) {
      logger.logError(err);
      return { statusCode: 500, body: 'Heartbeat Error' };
    }
  }
}

module.exports = HeartbeatHandler;
