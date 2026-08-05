const HeartbeatRepository = require('./repository');
const HeartbeatService = require('./service');
const HeartbeatHandler = require('./handler');

const repository = new HeartbeatRepository();
const service = new HeartbeatService(repository);
const handlerInstance = new HeartbeatHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
