const RefreshTokenRepository = require('./repository');
const RefreshTokenService = require('./service');
const RefreshTokenHandler = require('./handler');

const repository = new RefreshTokenRepository();
const service = new RefreshTokenService(repository);
const handlerInstance = new RefreshTokenHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
