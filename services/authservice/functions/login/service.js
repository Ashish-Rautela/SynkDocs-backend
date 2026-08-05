const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../../../../shared/errors');
const JwtHelper = require('../../../../shared/jwt/jwtHelper');

class LoginService {
  constructor(repository) {
    this.repository = repository;
  }

  async login({ email, password }) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = {
      userId: user.userId,
      email: user.email,
      name: user.name
    };

    const accessToken = JwtHelper.generateAccessToken(payload);
    const refreshToken = JwtHelper.generateRefreshToken(payload);

    return {
      user: {
        userId: user.userId,
        email: user.email,
        name: user.name
      },
      tokens: {
        accessToken,
        refreshToken
      }
    };
  }
}

module.exports = LoginService;
