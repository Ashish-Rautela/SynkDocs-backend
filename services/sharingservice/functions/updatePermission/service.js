const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class UpdatePermissionService {
  constructor(repository) {
    this.repository = repository;
  }

  async updatePermission(userContext, { documentId, targetUserId, role }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('Only document owner can update permissions');
    }

    const updatedAt = new Date().toISOString();
    const updatedPerm = await this.repository.updateRole(documentId, targetUserId, role, updatedAt);

    // Emit PermissionUpdated Event
    await EventBridgeUtil.publishEvent(EVENTS.PERMISSION_UPDATED, {
      documentId,
      targetUserId,
      newRole: role,
      updatedBy: userContext.userId,
      timestamp: updatedAt
    });

    return updatedPerm;
  }
}

module.exports = UpdatePermissionService;
