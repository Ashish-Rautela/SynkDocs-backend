class GetCollaboratorsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getCollaborators(userContext, documentId) {
    const collaborators = await this.repository.getCollaborators(documentId);
    return {
      documentId,
      collaborators
    };
  }
}

module.exports = GetCollaboratorsService;
