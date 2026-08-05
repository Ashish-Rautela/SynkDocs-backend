class MentionNotificationService {
  constructor(repository) {
    this.repository = repository;
  }

  async processMention(data) {
    const payload = {
      type: 'USER_MENTIONED',
      documentId: data.documentId,
      recipientUserId: data.mentionedUserId,
      actorUserId: data.mentionedByUserId,
      snippet: data.contextSnippet || 'You were mentioned in a comment'
    };

    await this.repository.publishMention(payload);
    return payload;
  }
}

module.exports = MentionNotificationService;
