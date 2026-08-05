class UpdateProfileService {
  constructor(repository) {
    this.repository = repository;
  }

  async updateProfile(userContext, profileData) {
    const updatedAt = new Date().toISOString();
    const updatedUser = await this.repository.updateProfile(userContext.userId, profileData, updatedAt);

    const { passwordHash, ...safeProfile } = updatedUser;
    return safeProfile;
  }
}

module.exports = UpdateProfileService;
