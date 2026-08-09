const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';
const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class RequestAccessRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async getUser(userId) {
    return await DynamoClient.get(USERS_TABLE, { userId });
  }

  async getPermission(documentId, userId) {
    return await DynamoClient.get(PERMISSIONS_TABLE, { documentId, userId });
  }

  async savePermission(permRecord) {
    return await DynamoClient.put(PERMISSIONS_TABLE, permRecord);
  }
}

module.exports = RequestAccessRepository;
