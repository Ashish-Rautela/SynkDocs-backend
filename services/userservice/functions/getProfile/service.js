const { NotFoundError } = require('../../../../shared/errors');

class GetProfileService {
  constructor(repository) {
    this.repository = repository;
  }

  async getProfile(userContext) {
    const user = await this.repository.getUserById(userContext.userId);
    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    const { passwordHash, ...safeProfile } = user;
    return safeProfile;
  }
}

module.exports = GetProfileService;
