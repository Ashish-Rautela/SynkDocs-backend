const LoginRepository = require('./repository');
const LoginService = require('./service');
const LoginHandler = require('./handler');

const repository = new LoginRepository();
const service = new LoginService(repository);
const handlerInstance = new LoginHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
