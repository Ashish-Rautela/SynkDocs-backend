const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';
const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';

class ListDocumentsRepository {
  async listUserDocuments(userId, limit = 20) {
    // 1. Fetch owned documents
    const ownedResult = await DynamoClient.query({
      TableName: DOCUMENTS_TABLE,
      IndexName: 'OwnerIndex',
      KeyConditionExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: { ':ownerId': userId },
      Limit: limit
    });

    const ownedDocs = (ownedResult.items || []).map((doc) => ({
      ...doc,
      isShared: false,
      role: 'OWNER'
    }));

    const ownedDocIds = new Set(ownedDocs.map((doc) => doc.documentId));

    // 2. Fetch shared documents via UserPermissionsIndex
    let sharedDocs = [];
    try {
      const permResult = await DynamoClient.query({
        TableName: PERMISSIONS_TABLE,
        IndexName: 'UserPermissionsIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId }
      });

      const sharedPerms = (permResult.items || []).filter(
        (perm) => !ownedDocIds.has(perm.documentId)
      );

      const fetchedShared = await Promise.all(
        sharedPerms.map(async (perm) => {
          const doc = await DynamoClient.get(DOCUMENTS_TABLE, { documentId: perm.documentId });
          if (doc) {
            return {
              ...doc,
              isShared: true,
              role: perm.role || 'VIEWER'
            };
          }
          return null;
        })
      );

      sharedDocs = fetchedShared.filter(Boolean);
    } catch (e) {
      console.warn('Failed to query UserPermissionsIndex:', e.message);
    }

    const allDocs = [...ownedDocs, ...sharedDocs];
    return {
      items: allDocs,
      lastEvaluatedKey: ownedResult.lastEvaluatedKey
    };
  }
}

module.exports = ListDocumentsRepository;
