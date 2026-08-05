const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');
const S3Util = require('../../../../shared/utils/s3Client');

const VERSIONS_TABLE = process.env.VERSIONS_TABLE || 'SynkDocs-Versions';
const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';

class RestoreSnapshotRepository {
  async getVersionRecord(documentId, version) {
    return await DynamoClient.get(VERSIONS_TABLE, { documentId, version });
  }

  async fetchSnapshotContent(s3Key) {
    return await S3Util.getSnapshot(s3Key);
  }

  async updateDocumentContent(documentId, content, updatedAt) {
    return await DynamoClient.update({
      TableName: DOCUMENTS_TABLE,
      Key: { documentId },
      UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':content': content,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    });
  }
}

module.exports = RestoreSnapshotRepository;
