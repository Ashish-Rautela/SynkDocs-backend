class SendEmailService {
  constructor(repository) {
    this.repository = repository;
  }

  async sendNotificationEmail(data) {
    const subject = `SynkDocs Notification: ${data.type}`;
    const body = data.message;

    return await this.repository.dispatchEmail(data.recipientUserId, subject, body);
  }
}

module.exports = SendEmailService;
