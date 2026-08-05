const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { ConflictError } = require('../../../../shared/errors');
const EventBridgeUtil = require('../../../../shared/utils/eventBridgeClient');
const { EVENTS } = require('../../../../shared/constants');

class RegisterService {
  constructor(repository) {
    this.repository = repository;
  }

  async registerUser({ email, password, name }) {
    const existing = await this.repository.findByEmail(email);
    if (existing) {
      throw new ConflictError('A user with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = `usr_${uuidv4()}`;
    const timestamp = new Date().toISOString();

    const newUser = {
      userId,
      email,
      name,
      passwordHash,
      verified: false,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await this.repository.createUser(newUser);

    // Emit event asynchronously
    await EventBridgeUtil.publishEvent(EVENTS.USER_REGISTERED, {
      userId,
      email,
      name,
      timestamp
    });

    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}

module.exports = RegisterService;
