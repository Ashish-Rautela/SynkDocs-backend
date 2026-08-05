const { NotFoundError, ForbiddenError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class DeleteDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteDocument(userContext, documentId) {
    const doc = await this.repository.getDocument(documentId);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }

    if (doc.ownerId !== userContext.userId) {
      throw new ForbiddenError('Only the document owner can delete this document');
    }

    await this.repository.deleteDocument(documentId);

    // Emit DocumentDeleted Event
    await EventBridgeUtil.publishEvent(EVENTS.DOCUMENT_DELETED, {
      documentId,
      ownerId: userContext.userId,
      timestamp: new Date().toISOString()
    });

    return { deleted: true, documentId };
  }
}

module.exports = DeleteDocumentService;
