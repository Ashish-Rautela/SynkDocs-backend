const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class ListDocumentsRepository {
  async listUserDocuments(userId, limit = 20) {
    const result = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: { ':ownerId': userId },
      Limit: limit
    });
    return result;
  }
}

module.exports = ListDocumentsRepository;
