const HealthRepository = require('./repository');
const HealthService = require('./service');
const HealthHandler = require('./handler');

const repository = new HealthRepository();
const service = new HealthService(repository);
const handlerInstance = new HealthHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
