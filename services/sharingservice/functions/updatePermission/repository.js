const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class UpdatePermissionRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async updateRole(documentId, userId, role, updatedAt) {
    return await DynamoClient.update({
      TableName: PERMISSIONS_TABLE,
      Key: { documentId, userId },
      UpdateExpression: 'SET #r = :role, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#r': 'role' },
      ExpressionAttributeValues: {
        ':role': role,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    });
  }
}

module.exports = UpdatePermissionRepository;
