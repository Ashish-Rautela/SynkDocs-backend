const JwtHelper = require('../../../../shared/jwt/jwtHelper');
const { UnauthorizedError } = require('../../../../shared/errors');

class RefreshTokenService {
  constructor(repository) {
    this.repository = repository;
  }

  async refreshToken(token) {
    const decoded = JwtHelper.verifyRefreshToken(token);
    const user = await this.repository.findUserById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError('User associated with refresh token not found');
    }

    const payload = {
      userId: user.userId,
      email: user.email,
      name: user.name
    };

    const newAccessToken = JwtHelper.generateAccessToken(payload);
    const newRefreshToken = JwtHelper.generateRefreshToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }
}

module.exports = RefreshTokenService;
