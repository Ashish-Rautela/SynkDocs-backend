class DocumentSharedNotificationService {
  constructor(repository) {
    this.repository = repository;
  }

  async processNotification(eventDetail) {
    const notificationPayload = {
      type: 'DOCUMENT_SHARED',
      recipientUserId: eventDetail.targetUserId,
      actorUserId: eventDetail.sharedBy,
      documentId: eventDetail.documentId,
      role: eventDetail.role,
      message: `A document was shared with you as ${eventDetail.role}.`
    };

    await this.repository.publishSnsNotification(notificationPayload);
    return notificationPayload;
  }
}

module.exports = DocumentSharedNotificationService;
