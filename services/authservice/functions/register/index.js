const RegisterRepository = require('./repository');
const RegisterService = require('./service');
const RegisterHandler = require('./handler');

const repository = new RegisterRepository();
const service = new RegisterService(repository);
const handlerInstance = new RegisterHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
