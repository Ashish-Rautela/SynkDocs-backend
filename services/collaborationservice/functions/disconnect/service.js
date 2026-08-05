class DisconnectService {
  constructor(repository) {
    this.repository = repository;
  }

  async handleDisconnect(connectionId) {
    await this.repository.removeConnection(connectionId);
    return { disconnected: true, connectionId };
  }
}

module.exports = DisconnectService;
