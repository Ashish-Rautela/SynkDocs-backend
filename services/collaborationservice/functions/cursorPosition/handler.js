const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { cursorPositionSchema } = require('./validation');

const logger = new Logger('WebSocketCursorPositionHandler');

class CursorPositionHandler {
  constructor(cursorPositionService) {
    this.cursorPositionService = cursorPositionService;
  }

  async handle(event) {
    logger.logRequest(event);
    try {
      const { domainName, stage, connectionId } = event.requestContext;
      const body = JSON.parse(event.body || '{}');
      const validatedData = Validator.validate(cursorPositionSchema, body);

      const result = await this.cursorPositionService.broadcastCursor(
        domainName,
        stage,
        connectionId,
        validatedData
      );

      logger.info('Cursor position broadcast complete', result);
      return { statusCode: 200, body: 'Cursor Updated' };
    } catch (err) {
      logger.logError(err);
      return { statusCode: 500, body: 'Cursor Position Error' };
    }
  }
}

module.exports = CursorPositionHandler;
