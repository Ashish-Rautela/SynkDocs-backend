const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');
const S3Util = require('../../../../shared/utils/s3Client');

const VERSIONS_TABLE = process.env.VERSIONS_TABLE || 'SynkDocs-Versions';

class SaveSnapshotRepository {
  async uploadSnapshotToS3(key, content) {
    return await S3Util.uploadSnapshot(key, content);
  }

  async saveVersionRecord(versionRecord) {
    return await DynamoClient.put(VERSIONS_TABLE, versionRecord);
  }
}

module.exports = SaveSnapshotRepository;
