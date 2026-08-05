const S3Util = require('../../../../shared/utils/s3Client');

const AVATARS_BUCKET = process.env.AVATARS_BUCKET_NAME || 'synkdocs-user-avatars';

class UploadAvatarRepository {
  async getPresignedUploadUrl(s3Key, expiresIn = 3600) {
    return await S3Util.getSignedUploadUrl(AVATARS_BUCKET, s3Key, expiresIn);
  }
}

module.exports = UploadAvatarRepository;
