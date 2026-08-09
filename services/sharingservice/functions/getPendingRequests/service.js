class GetPendingRequestsService {
  constructor(repository) {
    this.repository = repository;
  }

  async getPendingRequests(userContext) {
    const ownedDocs = await this.repository.getOwnedDocuments(userContext.userId);
    if (ownedDocs.length === 0) {
      return [];
    }

    const docMap = new Map(ownedDocs.map(d => [d.documentId, d.title]));
    const documentIds = ownedDocs.map(d => d.documentId);

    const pendingRequests = [];

    // Query permissions for each document
    for (const docId of documentIds) {
      const perms = await this.repository.getPermissionsForDocument(docId);
      const docTitle = docMap.get(docId) || 'Untitled Document';

      const docPending = perms
        .filter(p => p.role && p.role.startsWith('PENDING_'))
        .map(p => ({
          ...p,
          documentTitle: docTitle,
          // Extract requested role (e.g. PENDING_EDITOR -> EDITOR)
          requestedRole: p.role.replace('PENDING_', '')
        }));

      pendingRequests.push(...docPending);
    }

    // Sort by createdAt descending (newest requests first)
    return pendingRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

module.exports = GetPendingRequestsService;
