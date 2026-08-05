class ActiveUsersService {
  constructor(repository) {
    this.repository = repository;
  }

  async getActiveUsers(documentId) {
    const connections = await this.repository.getActiveConnections(documentId);
    const activeUsers = connections.map(conn => ({
      userId: conn.userId,
      connectionId: conn.connectionId,
      lastSeen: conn.lastSeen
    }));

    return {
      documentId,
      activeCount: activeUsers.length,
      activeUsers
    };
  }
}

module.exports = ActiveUsersService;
