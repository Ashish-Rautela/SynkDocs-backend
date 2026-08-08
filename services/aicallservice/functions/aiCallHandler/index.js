const AICallService = require('./service');
const AICallHandler = require('./handler');

const service = new AICallService();
const handlerInstance = new AICallHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
