class CommentNotificationService {
  constructor(repository) {
    this.repository = repository;
  }

  async processCommentNotification(data) {
    const payload = {
      type: 'COMMENT_ADDED',
      documentId: data.documentId,
      commentId: data.commentId,
      authorUserId: data.authorUserId,
      snippet: data.commentText.substring(0, 100)
    };

    await this.repository.publishSns(payload);
    return payload;
  }
}

module.exports = CommentNotificationService;
