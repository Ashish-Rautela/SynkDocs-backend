const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class RecentDocumentsRepository {
  async getRecentUserDocuments(userId, limit) {
    const result = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: { ':ownerId': userId },
      ScanIndexForward: false,
      Limit: limit
    });
    return result.items;
  }
}

module.exports = RecentDocumentsRepository;
