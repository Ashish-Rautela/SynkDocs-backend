const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class RefreshTokenRepository {
  async findUserById(userId) {
    return await DynamoClient.get(USERS_TABLE, { userId });
  }
}

module.exports = RefreshTokenRepository;
