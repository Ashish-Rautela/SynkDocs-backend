const RevokeAccessRepository = require('./repository');
const RevokeAccessService = require('./service');
const RevokeAccessHandler = require('./handler');

const repository = new RevokeAccessRepository();
const service = new RevokeAccessService(repository);
const handlerInstance = new RevokeAccessHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
