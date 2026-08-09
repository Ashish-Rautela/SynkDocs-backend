const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';

class RenameDocumentRepository {
  async getDocument(documentId) {
    return await DynamoClient.get(DOCUMENTS_TABLE, { documentId });
  }

  async getPermission(documentId, userId) {
    return await DynamoClient.get(PERMISSIONS_TABLE, { documentId, userId });
  }

  async updateTitle(documentId, title, updatedAt) {
    return this.updateDocument(documentId, { title }, updatedAt);
  }

  async updateDocument(documentId, { title, content }, updatedAt) {
    const updateExpressions = ['updatedAt = :updatedAt'];
    const expressionAttributeValues = { ':updatedAt': updatedAt };
    const expressionAttributeNames = {};

    if (title !== undefined) {
      updateExpressions.push('#t = :title');
      expressionAttributeNames['#t'] = 'title';
      expressionAttributeValues[':title'] = title;
    }

    if (content !== undefined) {
      updateExpressions.push('#c = :content');
      expressionAttributeNames['#c'] = 'content';
      expressionAttributeValues[':content'] = content;
    }

    const params = {
      TableName: DOCUMENTS_TABLE,
      Key: { documentId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    };

    if (Object.keys(expressionAttributeNames).length > 0) {
      params.ExpressionAttributeNames = expressionAttributeNames;
    }

    return await DynamoClient.update(params);
  }
}

module.exports = RenameDocumentRepository;
