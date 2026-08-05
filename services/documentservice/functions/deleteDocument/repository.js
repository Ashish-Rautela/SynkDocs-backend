const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class DeleteDocumentRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async deleteDocument(documentId) {
    return await DynamoClient.delete(DOCUMENTS_TABLE, { documentId });
  }
}

module.exports = DeleteDocumentRepository;
