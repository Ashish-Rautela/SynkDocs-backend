const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { mentionNotificationSchema } = require('./validation');

const logger = new Logger('MentionNotificationHandler');

class MentionNotificationHandler {
  constructor(service) {
    this.service = service;
  }

  async handle(event) {
    logger.info('Processing User Mention Event', { event });
    try {
      const detail = event.detail || {};
      const validatedData = Validator.validate(mentionNotificationSchema, detail);

      const result = await this.service.processMention(validatedData);

      logger.info('Mention notification processed', result);
      return { success: true };
    } catch (err) {
      logger.logError(err);
      throw err;
    }
  }
}

module.exports = MentionNotificationHandler;
