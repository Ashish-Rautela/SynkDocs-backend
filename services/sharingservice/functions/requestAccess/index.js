const RequestAccessRepository = require('./repository');
const RequestAccessService = require('./service');
const RequestAccessHandler = require('./handler');

const repository = new RequestAccessRepository();
const service = new RequestAccessService(repository);
const handlerInstance = new RequestAccessHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
