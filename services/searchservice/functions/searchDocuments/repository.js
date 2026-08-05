const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class SearchDocumentsRepository {
  async searchUserDocuments(userId, queryTerm, limit) {
    const result = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      FilterExpression: 'contains(#title, :q)',
      ExpressionAttributeNames: { '#title': 'title' },
      ExpressionAttributeValues: {
        ':ownerId': userId,
        ':q': queryTerm
      },
      Limit: limit
    });
    return result.items;
  }
}

module.exports = SearchDocumentsRepository;
