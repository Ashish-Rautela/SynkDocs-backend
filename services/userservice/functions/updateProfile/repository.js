const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class UpdateProfileRepository {
  async updateProfile(userId, { name, bio, avatarUrl }, updatedAt) {
    let updateExpression = 'SET updatedAt = :updatedAt';
    const expressionAttributeValues = { ':updatedAt': updatedAt };
    const expressionAttributeNames = {};

    if (name) {
      updateExpression += ', #n = :name';
      expressionAttributeNames['#n'] = 'name';
      expressionAttributeValues[':name'] = name;
    }

    if (bio !== undefined) {
      updateExpression += ', bio = :bio';
      expressionAttributeValues[':bio'] = bio;
    }

    if (avatarUrl !== undefined) {
      updateExpression += ', avatarUrl = :avatarUrl';
      expressionAttributeValues[':avatarUrl'] = avatarUrl;
    }

    return await DynamoClient.update({
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });
  }
}

module.exports = UpdateProfileRepository;
