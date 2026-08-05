const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class RevokeAccessService {
  constructor(repository) {
    this.repository = repository;
  }

  async revokeAccess(userContext, { documentId, targetUserId }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('Only document owner can revoke access');
    }

    await this.repository.deletePermission(documentId, targetUserId);

    // Emit AccessRevoked Event
    await EventBridgeUtil.publishEvent(EVENTS.ACCESS_REVOKED, {
      documentId,
      targetUserId,
      revokedBy: userContext.userId,
      timestamp: new Date().toISOString()
    });

    return { revoked: true, documentId, targetUserId };
  }
}

module.exports = RevokeAccessService;
