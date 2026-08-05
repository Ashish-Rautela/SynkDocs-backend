const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class StarredDocumentsRepository {
  async getStarredDocuments(userId, limit) {
    const result = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      FilterExpression: 'isStarred = :starred',
      ExpressionAttributeValues: {
        ':ownerId': userId,
        ':starred': true
      },
      Limit: limit
    });
    return result.items;
  }
}

module.exports = StarredDocumentsRepository;
