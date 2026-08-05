class RecentDocumentsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getRecent(userContext, { limit }) {
    const documents = await this.repository.getRecentUserDocuments(userContext.userId, limit);
    return {
      total: documents.length,
      documents
    };
  }
}

module.exports = RecentDocumentsService;
