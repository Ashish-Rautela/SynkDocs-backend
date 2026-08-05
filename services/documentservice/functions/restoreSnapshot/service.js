const { NotFoundError } = require('../../../../shared/errors');

class RestoreSnapshotService {
  constructor(repository) {
    this.repository = repository;
  }

  async restoreSnapshot(userContext, { documentId, version }) {
    const versionRecord = await this.repository.getVersionRecord(documentId, version);
    if (!versionRecord) {
      throw new NotFoundError(`Version ${version} for document ${documentId} not found`);
    }

    const s3Key = `snapshots/${documentId}/${version}.json`;
    const snapshotContent = await this.repository.fetchSnapshotContent(s3Key);

    const updatedAt = new Date().toISOString();
    const updatedDocument = await this.repository.updateDocumentContent(documentId, snapshotContent, updatedAt);

    return {
      restoredVersion: version,
      document: updatedDocument
    };
  }
}

module.exports = RestoreSnapshotService;
