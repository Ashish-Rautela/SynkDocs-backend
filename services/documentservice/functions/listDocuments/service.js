class ListDocumentsService {
  constructor(repository) {
    this.repository = repository;
  }

  async listDocuments(userContext, { limit }) {
    const result = await this.repository.listUserDocuments(userContext.userId, limit);
    return {
      documents: result.items,
      nextToken: result.lastEvaluatedKey ? JSON.stringify(result.lastEvaluatedKey) : null
    };
  }
}

module.exports = ListDocumentsService;
