const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';
const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class ShareDocumentRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async findUserByEmail(email) {
    const result = await DynamoClient.query({
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    });
    return result.items[0] || null;
  }

  async savePermission(permRecord) {
    return await DynamoClient.put(PERMISSIONS_TABLE, permRecord);
  }
}

module.exports = ShareDocumentRepository;
