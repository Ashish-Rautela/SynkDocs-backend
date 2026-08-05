class HeartbeatService {
  constructor(repository) {
    this.repository = repository;
  }

  async recordHeartbeat(connectionId) {
    const lastSeen = new Date().toISOString();
    await this.repository.updateLastSeen(connectionId, lastSeen);
    return { connectionId, lastSeen };
  }
}

module.exports = HeartbeatService;
