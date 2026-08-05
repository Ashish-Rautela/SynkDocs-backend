const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');

class GetDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async getDocument(userContext, documentId) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      const permission = await this.repository.getPermission(documentId, userContext.userId);
      if (!permission) {
        throw new ForbiddenError('You do not have access to view this document');
      }
    }

    return doc;
  }
}

module.exports = GetDocumentService;
