class StarredDocumentsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getStarred(userContext, { limit }) {
    const documents = await this.repository.getStarredDocuments(userContext.userId, limit);
    return {
      total: documents.length,
      documents
    };
  }
}

module.exports = StarredDocumentsService;
