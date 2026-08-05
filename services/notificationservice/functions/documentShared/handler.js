const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { documentSharedEventSchema } = require('./validation');

const logger = new Logger('DocumentSharedNotificationHandler');

class DocumentSharedNotificationHandler {
  constructor(service) {
    this.service = service;
  }

  async handle(event) {
    logger.info('Processing EventBridge DocumentShared event', { event });
    try {
      const detail = event.detail || {};
      const validatedDetail = Validator.validate(documentSharedEventSchema, detail);

      const result = await this.service.processNotification(validatedDetail);

      logger.info('DocumentShared notification processed successfully', result);
      return { success: true };
    } catch (err) {
      logger.logError(err);
      throw err;
    }
  }
}

module.exports = DocumentSharedNotificationHandler;
