const { v4: uuidv4 } = require('uuid');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class SaveSnapshotService {
  constructor(repository) {
    this.repository = repository;
  }

  async saveSnapshot(userContext, { documentId, snapshotContent }) {
    const versionId = `v_${Date.now()}_${uuidv4().substring(0, 8)}`;
    const s3Key = `snapshots/${documentId}/${versionId}.json`;

    const snapshotLocation = await this.repository.uploadSnapshotToS3(s3Key, snapshotContent);

    const versionRecord = {
      documentId,
      version: versionId,
      snapshotLocation,
      createdBy: userContext.userId,
      createdAt: new Date().toISOString()
    };

    await this.repository.saveVersionRecord(versionRecord);

    // Emit VersionCreated Event
    await EventBridgeUtil.publishEvent(EVENTS.VERSION_CREATED, {
      documentId,
      version: versionId,
      createdBy: userContext.userId,
      snapshotLocation
    });

    return versionRecord;
  }
}

module.exports = SaveSnapshotService;
