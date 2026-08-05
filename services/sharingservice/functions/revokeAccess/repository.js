const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class RevokeAccessRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async deletePermission(documentId, userId) {
    return await DynamoClient.delete(PERMISSIONS_TABLE, { documentId, userId });
  }
}

module.exports = RevokeAccessRepository;
