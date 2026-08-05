const SendOperationRepository = require('./repository');
const SendOperationService = require('./service');
const SendOperationHandler = require('./handler');

const repository = new SendOperationRepository();
const service = new SendOperationService(repository);
const handlerInstance = new SendOperationHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
