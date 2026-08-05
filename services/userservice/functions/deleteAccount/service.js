class DeleteAccountService {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteAccount(userContext) {
    await this.repository.deleteUser(userContext.userId);
    return { accountDeleted: true, userId: userContext.userId };
  }
}

module.exports = DeleteAccountService;
