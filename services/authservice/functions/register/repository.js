const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class RegisterRepository {
  async findByEmail(email) {
    const result = await DynamoClient.query({
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    });
    return result.items[0] || null;
  }

  async createUser(userRecord) {
    return await DynamoClient.put(USERS_TABLE, userRecord);
  }
}

module.exports = RegisterRepository;
