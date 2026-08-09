const { NotFoundError, ConflictError } = require('../../../../shared/errors');

class RequestAccessService {
  constructor(repository) {
    this.repository = repository;
  }

  async requestAccess(userContext, { documentId, role }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    // Owner already has full access
    if (doc.ownerId === userContext.userId) {
      throw new ConflictError('You are the owner of this document');
    }

    const existingPermission = await this.repository.getPermission(documentId, userContext.userId);
    if (existingPermission) {
      if (!existingPermission.role.startsWith('PENDING_')) {
        throw new ConflictError('You already have active access to this document');
      }
    }

    const user = await this.repository.getUser(userContext.userId);
    const timestamp = new Date().toISOString();

    // Map role to PENDING equivalent
    const pendingRole = `PENDING_${role}`;

    const permRecord = {
      documentId,
      userId: userContext.userId,
      role: pendingRole,
      name: user ? user.name : userContext.name || 'User',
      email: user ? user.email : userContext.email,
      avatarUrl: user ? user.avatarUrl : undefined,
      status: 'PENDING',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await this.repository.savePermission(permRecord);
    return permRecord;
  }
}

module.exports = RequestAccessService;
