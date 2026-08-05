class SearchDocumentsService {
  constructor(repository) {
    this.repository = repository;
  }

  async search(userContext, { q, limit }) {
    const results = await this.repository.searchUserDocuments(userContext.userId, q, limit);
    return {
      query: q,
      total: results.length,
      documents: results
    };
  }
}

module.exports = SearchDocumentsService;
