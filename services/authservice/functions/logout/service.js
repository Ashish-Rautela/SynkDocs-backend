class LogoutService {
  constructor(repository) {
    this.repository = repository;
  }

  async logoutUser(userContext) {
    await this.repository.revokeSession(userContext.userId);
    return { loggedOut: true };
  }
}

module.exports = LogoutService;
