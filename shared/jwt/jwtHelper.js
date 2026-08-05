const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { ERROR_CODES } = require('../constants');

const JWT_SECRET = process.env.JWT_SECRET || 'synkdocs_default_jwt_secret_dev_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'synkdocs_default_refresh_secret_key';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

class JwtHelper {
  static generateAccessToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Access token has expired', ERROR_CODES.TOKEN_EXPIRED);
      }
      throw new UnauthorizedError('Invalid access token', ERROR_CODES.INVALID_TOKEN);
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Refresh token has expired', ERROR_CODES.TOKEN_EXPIRED);
      }
      throw new UnauthorizedError('Invalid refresh token', ERROR_CODES.INVALID_TOKEN);
    }
  }
}

module.exports = JwtHelper;
