const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE || 'SynkDocs-Connections';

class HeartbeatRepository {
  async updateLastSeen(connectionId, lastSeen) {
    return await DynamoClient.update({
      TableName: CONNECTIONS_TABLE,
      Key: { connectionId },
      UpdateExpression: 'SET lastSeen = :lastSeen',
      ExpressionAttributeValues: { ':lastSeen': lastSeen },
      ReturnValues: 'ALL_NEW'
    });
  }
}

module.exports = HeartbeatRepository;
