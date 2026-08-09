const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');

class RenameDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async renameDocument(userContext, { documentId, title, content }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      const permission = await this.repository.getPermission(documentId, userContext.userId);
      const isAllowed = permission && (permission.role === 'OWNER' || permission.role === 'EDITOR');
      if (!isAllowed) {
        throw new ForbiddenError('You do not have permission to edit this document');
      }
    }

    const updatedAt = new Date().toISOString();
    const updatedDocument = await this.repository.updateDocument(
      documentId,
      { title, content },
      updatedAt
    );

    return updatedDocument;
  }
}

module.exports = RenameDocumentService;
