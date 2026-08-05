const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';
const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';

class GetDocumentRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async getPermission(documentId, userId) {
    return await DynamoClient.get(PERMISSIONS_TABLE, { documentId, userId });
  }
}

module.exports = GetDocumentRepository;
