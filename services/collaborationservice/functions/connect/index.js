const ConnectRepository = require('./repository');
const ConnectService = require('./service');
const ConnectHandler = require('./handler');

const repository = new ConnectRepository();
const service = new ConnectService(repository);
const handlerInstance = new ConnectHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
