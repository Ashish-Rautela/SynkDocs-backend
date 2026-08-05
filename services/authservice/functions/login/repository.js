const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class LoginRepository {
  async findByEmail(email) {
    const result = await DynamoClient.query({
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email }
    });
    return result.items[0] || null;
  }
}

module.exports = LoginRepository;
