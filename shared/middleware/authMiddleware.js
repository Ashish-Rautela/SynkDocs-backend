const JwtHelper = require('../jwt/jwtHelper');
const { UnauthorizedError } = require('../errors');

const authMiddleware = (event) => {
  const authHeader = event.headers?.Authorization || event.headers?.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('No authorization header provided');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new UnauthorizedError('Format is Authorization: Bearer <token>');
  }

  const token = parts[1];
  const decoded = JwtHelper.verifyAccessToken(token);

  return {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role
  };
};

module.exports = authMiddleware;
