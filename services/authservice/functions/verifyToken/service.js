const JwtHelper = require('../../../../shared/jwt/jwtHelper');

class VerifyTokenService {
  constructor(repository) {
    this.repository = repository;
  }

  async verifyToken(token) {
    const isBlacklisted = await this.repository.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return { valid: false, reason: 'Token has been revoked' };
    }

    const decoded = JwtHelper.verifyAccessToken(token);
    return {
      valid: true,
      claims: decoded
    };
  }
}

module.exports = VerifyTokenService;
