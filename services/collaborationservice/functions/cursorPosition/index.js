const CursorPositionRepository = require('./repository');
const CursorPositionService = require('./service');
const CursorPositionHandler = require('./handler');

const repository = new CursorPositionRepository();
const service = new CursorPositionService(repository);
const handlerInstance = new CursorPositionHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
