const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class ShareDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async shareDocument(userContext, { documentId, targetUserId, email, targetEmail, role }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('Only document owner can share permissions');
    }

    let resolvedTargetId = targetUserId;
    let targetUserObj = null;

    const emailToSearch = email || targetEmail || (targetUserId && targetUserId.includes('@') ? targetUserId : null);

    if (emailToSearch) {
      targetUserObj = await this.repository.findUserByEmail(emailToSearch);
      if (!targetUserObj) {
        throw new NotFoundError(`User with email '${emailToSearch}' not found`);
      }
      resolvedTargetId = targetUserObj.userId;
    }

    if (!resolvedTargetId) {
      throw new NotFoundError('Target user could not be resolved');
    }

    const timestamp = new Date().toISOString();
    const permRecord = {
      documentId,
      userId: resolvedTargetId,
      userEmail: targetUserObj ? targetUserObj.email : (emailToSearch || undefined),
      userName: targetUserObj ? targetUserObj.name : undefined,
      role,
      grantedBy: userContext.userId,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await this.repository.savePermission(permRecord);

    // Emit DocumentShared Event
    await EventBridgeUtil.publishEvent(EVENTS.DOCUMENT_SHARED, {
      documentId,
      targetUserId: resolvedTargetId,
      role,
      sharedBy: userContext.userId,
      timestamp
    });

    return permRecord;
  }
}

module.exports = ShareDocumentService;
