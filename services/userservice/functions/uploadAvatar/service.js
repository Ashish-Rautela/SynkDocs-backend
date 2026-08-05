class UploadAvatarService {
  constructor(repository) {
    this.repository = repository;
  }

  async generateAvatarUploadUrl(userContext, { contentType }) {
    const fileExtension = contentType.split('/')[1] || 'jpg';
    const s3Key = `avatars/${userContext.userId}.${fileExtension}`;

    const uploadUrl = await this.repository.getPresignedUploadUrl(s3Key);

    return {
      uploadUrl,
      s3Key,
      expiresIn: 3600
    };
  }
}

module.exports = UploadAvatarService;
