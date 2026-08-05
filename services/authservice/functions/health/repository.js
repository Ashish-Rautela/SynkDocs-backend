class HealthRepository {
  async getSystemStatus() {
    return {
      database: 'OK',
      eventBridge: 'OK',
      s3: 'OK'
    };
  }
}

module.exports = HealthRepository;
