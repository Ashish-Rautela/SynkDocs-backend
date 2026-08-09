const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';
const USERS_TABLE = process.env.USERS_TABLE || 'SynkDocs-Users';

class GetCollaboratorsRepository {
  async getCollaborators(documentId) {
    const result = await DynamoClient.query({
      TableName: PERMISSIONS_TABLE,
      KeyConditionExpression: 'documentId = :documentId',
      ExpressionAttributeValues: { ':documentId': documentId }
    });

    const collaborators = await Promise.all(
      result.items.map(async (item) => {
        if (!item.name || !item.email) {
          const user = await DynamoClient.get(USERS_TABLE, { userId: item.userId });
          if (user) {
            return {
              ...item,
              name: user.name || item.name,
              email: user.email || item.email
            };
          }
        }
        return item;
      })
    );

    return collaborators;
  }
}

module.exports = GetCollaboratorsRepository;
