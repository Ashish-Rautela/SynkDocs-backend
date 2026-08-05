const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { sendOperationSchema } = require('./validation');

const logger = new Logger('WebSocketSendOperationHandler');

class SendOperationHandler {
  constructor(sendOperationService) {
    this.sendOperationService = sendOperationService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const { domainName, stage, connectionId } = event.requestContext;
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(sendOperationSchema, body);

      const result = await this.sendOperationService.broadcastOperation(
        domainName,
        stage,
        connectionId,
        validatedData
      );

      logger.info('Operation broadcast complete', result);
      return { statusCode: 200, body: 'Operation Sent' };
    } catch (err) {
      logger.logError(err);
      return { statusCode: 500, body: 'Send Operation Error' };
    }
  }
}

module.exports = SendOperationHandler;
