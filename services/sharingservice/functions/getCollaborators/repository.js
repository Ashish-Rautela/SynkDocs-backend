const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';

class GetCollaboratorsRepository {
  async getCollaborators(documentId) {
    const result = await DynamoClient.query({
      TableName: PERMISSIONS_TABLE,
      KeyConditionExpression: 'documentId = :documentId',
      ExpressionAttributeValues: { ':documentId': documentId }
    });
    return result.items;
  }
}

module.exports = GetCollaboratorsRepository;
