const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class DeleteAccountRepository {
  async deleteUser(userId) {
    return await DynamoClient.delete(USERS_TABLE, { userId });
  }
}

module.exports = DeleteAccountRepository;
