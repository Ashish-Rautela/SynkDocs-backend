const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { commentNotificationSchema } = require('./validation');

const logger = new Logger('CommentNotificationHandler');

class CommentNotificationHandler {
  constructor(service) {
    this.service = service;
  }

  async handle(event) {
    logger.info('Processing CommentAdded EventBridge event', { event });
    try {
      const detail = event.detail || {};
      const validatedData = Validator.validate(commentNotificationSchema, detail);

      const result = await this.service.processCommentNotification(validatedData);

      logger.info('Comment notification sent to SNS', result);
      return { success: true };
    } catch (err) {
      logger.logError(err);
      throw err;
    }
  }
}

module.exports = CommentNotificationHandler;
