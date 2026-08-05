const VerifyTokenRepository = require('./repository');
const VerifyTokenService = require('./service');
const VerifyTokenHandler = require('./handler');

const repository = new VerifyTokenRepository();
const service = new VerifyTokenService(repository);
const handlerInstance = new VerifyTokenHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
