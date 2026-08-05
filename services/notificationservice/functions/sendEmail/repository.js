class SendEmailRepository {
  async dispatchEmail(recipient, subject, body) {
    // Integration point with SES / SendGrid
    console.log(`[EMAIL DISPATCHED] To: ${recipient} | Subject: ${subject} | Body: ${body}`);
    return { sent: true };
  }
}

module.exports = SendEmailRepository;
