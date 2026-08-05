const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const region = process.env.AWS_REGION || 'ap-south-1';
const s3Client = new S3Client({ region });
const SNAPSHOT_BUCKET = process.env.SNAPSHOT_BUCKET_NAME || 'synkdocs-document-snapshots';

class S3Util {
  static async uploadSnapshot(key, body, contentType = 'application/json') {
    const command = new PutObjectCommand({
      Bucket: SNAPSHOT_BUCKET,
      Key: key,
      Body: typeof body === 'string' ? body : JSON.stringify(body),
      ContentType: contentType
    });
    await s3Client.send(command);
    return `s3://${SNAPSHOT_BUCKET}/${key}`;
  }

  static async getSignedUploadUrl(bucket, key, expiresIn = 3600) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  }

  static async getSignedDownloadUrl(bucket, key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  }

  static async getSnapshot(key) {
    const command = new GetObjectCommand({
      Bucket: SNAPSHOT_BUCKET,
      Key: key
    });
    const response = await s3Client.send(command);
    const str = await response.Body.transformToString();
    return JSON.parse(str);
  }
}

module.exports = S3Util;
