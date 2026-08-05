const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class ShareDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async shareDocument(userContext, { documentId, targetUserId, role }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('Only document owner can share permissions');
    }

    const timestamp = new Date().toISOString();
    const permRecord = {
      documentId,
      userId: targetUserId,
      role,
      grantedBy: userContext.userId,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await this.repository.savePermission(permRecord);

    // Emit DocumentShared Event
    await EventBridgeUtil.publishEvent(EVENTS.DOCUMENT_SHARED, {
      documentId,
      targetUserId,
      role,
      sharedBy: userContext.userId,
      timestamp
    });

    return permRecord;
  }
}

module.exports = ShareDocumentService;
