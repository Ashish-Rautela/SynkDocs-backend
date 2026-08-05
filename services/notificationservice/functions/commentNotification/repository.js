const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({ region: process.env.AWS_REGION || 'ap-south-1' });
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN || 'arn:aws:sns:ap-south-1:123456789012:SynkDocs-Topic';

class CommentNotificationRepository {
  async publishSns(payload) {
    const command = new PublishCommand({
      TopicArn: SNS_TOPIC_ARN,
      Message: JSON.stringify(payload),
      Subject: 'New Comment Notification'
    });
    return await snsClient.send(command);
  }
}

module.exports = CommentNotificationRepository;
