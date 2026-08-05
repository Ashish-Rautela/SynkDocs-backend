const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const DOCUMENTS_TABLE = process.env.DOCUMENTS_TABLE || 'SynkDocs-Documents';
const PERMISSIONS_TABLE = process.env.PERMISSIONS_TABLE || 'SynkDocs-Permissions';

class CreateDocumentRepository {
  async saveDocument(docRecord) {
    return await DynamoClient.put(DOCUMENTS_TABLE, docRecord);
  }

  async savePermission(permRecord) {
    return await DynamoClient.put(PERMISSIONS_TABLE, permRecord);
  }
}

module.exports = CreateDocumentRepository;
