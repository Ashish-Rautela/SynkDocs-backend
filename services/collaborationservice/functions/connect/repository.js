const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const CONNECTIONS_TABLE = process.env.CONNECTIONS_TABLE || 'SynkDocs-Connections';

class ConnectRepository {
  async saveConnection(connectionRecord) {
    return await DynamoClient.put(CONNECTIONS_TABLE, connectionRecord);
  }
}

module.exports = ConnectRepository;
