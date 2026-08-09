const { v4: uuidv4 } = require('uuid');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS, ROLES } = require('../../../../shared/constants');

class CreateDocumentService {
  constructor(repository) {
    this.repository = repository;
  }

  async createDocument(userContext, { title, content }) {
    const documentId = `doc_${uuidv4()}`;
    const timestamp = new Date().toISOString();

    const documentRecord = {
      documentId,
      ownerId: userContext.userId,
      title: title || 'Untitled Document',
      content: content || '',
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await this.repository.saveDocument(documentRecord);

    // Save owner permission
    await this.repository.savePermission({
      documentId,
      userId: userContext.userId,
      role: ROLES.OWNER,
      createdAt: timestamp
    });

    // Emit DocumentCreated Event
    await EventBridgeUtil.publishEvent(EVENTS.DOCUMENT_CREATED, {
      documentId,
      ownerId: userContext.userId,
      title: documentRecord.title,
      timestamp
    });

    return documentRecord;
  }
}

module.exports = CreateDocumentService;
