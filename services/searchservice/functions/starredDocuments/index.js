const StarredDocumentsRepository = require('./repository');
const StarredDocumentsService = require('./service');
const StarredDocumentsHandler = require('./handler');

const repository = new StarredDocumentsRepository();
const service = new StarredDocumentsService(repository);
const handlerInstance = new StarredDocumentsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
