const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class RenameDocumentRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async updateTitle(documentId, title, updatedAt) {
    return await DynamoClient.update({
      TableName: DOCUMENTS_TABLE,
      Key: { documentId },
      UpdateExpression: 'SET title = :title, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':title': title,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    });
  }
}

module.exports = RenameDocumentRepository;
