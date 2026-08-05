const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');

class RenameDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async renameDocument(userContext, { documentId, title }) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('You do not have permission to rename this document');
    }

    const updatedAt = new Date().toISOString();
    const updatedDocument = await this.repository.updateTitle(documentId, title, updatedAt);

    return updatedDocument;
  }
}

module.exports = RenameDocumentService;
