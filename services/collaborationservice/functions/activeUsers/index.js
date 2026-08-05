const ActiveUsersRepository = require('./repository');
const ActiveUsersService = require('./service');
const ActiveUsersHandler = require('./handler');

const repository = new ActiveUsersRepository();
const service = new ActiveUsersService(repository);
const handlerInstance = new ActiveUsersHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
