const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class GetPendingRequestsRepository {
  async getOwnedDocuments(userId) {
    const result = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: { ':ownerId': userId }
    });
    return result.items || [];
  }

  async getPermissionsForDocument(documentId) {
    const result = await DynamoClient.query({
      TableName: PERMISSIONS_TABLE,
      KeyConditionExpression: 'documentId = :documentId',
      ExpressionAttributeValues: { ':documentId': documentId }
    });
    return result.items || [];
  }
}

module.exports = GetPendingRequestsRepository;
