const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE || 'SynkDocs-Connections';

class SendOperationRepository {
  async getDocumentConnections(documentId) {
    const result = await DynamoClient.query({
      TableName: CONNECTIONS_TABLE,
      IndexName: 'DocumentConnectionsIndex',
      KeyConditionExpression: 'documentId = :documentId',
      ExpressionAttributeValues: { ':documentId': documentId }
    });
    return result.items;
  }
}

module.exports = SendOperationRepository;
