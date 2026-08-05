const LogoutRepository = require('./repository');
const LogoutService = require('./service');
const LogoutHandler = require('./handler');

const repository = new LogoutRepository();
const service = new LogoutService(repository);
const handlerInstance = new LogoutHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
