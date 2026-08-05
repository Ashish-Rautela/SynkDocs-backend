class ConnectService {
  constructor(repository) {
    this.repository = repository;
  }

  async handleConnect({ connectionId, documentId, userId }) {
    const timestamp = new Date().toISOString();
    const connectionRecord = {
      connectionId,
      documentId,
      userId,
      lastSeen: timestamp,
      connectedAt: timestamp
    };

    await this.repository.saveConnection(connectionRecord);
    return connectionRecord;
  }
}

module.exports = ConnectService;
