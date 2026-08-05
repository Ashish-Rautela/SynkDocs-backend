const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE || 'SynkDocs-Connections';

class DisconnectRepository {
  async removeConnection(connectionId) {
    return await DynamoClient.delete(CONNECTIONS_TABLE, { connectionId });
  }
}

module.exports = DisconnectRepository;
