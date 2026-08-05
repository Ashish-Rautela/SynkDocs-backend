class HealthService {
  constructor(repository) {
    this.repository = repository;
  }

  async checkHealth() {
    const dependencies = await this.repository.getSystemStatus();
    return {
      status: 'UP',
      service: 'SynkDocs Backend Services',
      region: process.env.AWS_REGION || 'ap-south-1',
      environment: process.env.NODE_ENV || 'production',
      timestamp: new Date().toISOString(),
      dependencies
    };
  }
}

module.exports = HealthService;
