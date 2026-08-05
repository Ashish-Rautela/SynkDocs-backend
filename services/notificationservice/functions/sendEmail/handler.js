const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const { sendEmailSchema } = require('./validation');

const logger = new Logger('SendEmailHandler');

class SendEmailHandler {
  constructor(service) {
    this.service = service;
  }

  async handle(event) {
    logger.info('Processing SNS Email notification trigger', { event });
    try {
      const records = event.Records || [];
      for (const record of records) {
        const messagePayload = JSON.parse(record.Sns?.Message || '{}');
        const validatedData = Validator.validate(sendEmailSchema, messagePayload);

        await this.service.sendNotificationEmail(validatedData);
      }

      logger.info('All SNS emails dispatched successfully');
      return { success: true };
    } catch (err) {
      logger.logError(err);
      throw err;
    }
  }
}

module.exports = SendEmailHandler;
