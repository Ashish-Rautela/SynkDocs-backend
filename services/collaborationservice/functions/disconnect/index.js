const DisconnectRepository = require('./repository');
const DisconnectService = require('./service');
const DisconnectHandler = require('./handler');

const repository = new DisconnectRepository();
const service = new DisconnectService(repository);
const handlerInstance = new DisconnectHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
