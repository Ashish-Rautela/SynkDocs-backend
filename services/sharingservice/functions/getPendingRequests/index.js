const GetPendingRequestsRepository = require('./repository');
const GetPendingRequestsService = require('./service');
const GetPendingRequestsHandler = require('./handler');

const repository = new GetPendingRequestsRepository();
const service = new GetPendingRequestsService(repository);
const handlerInstance = new GetPendingRequestsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
