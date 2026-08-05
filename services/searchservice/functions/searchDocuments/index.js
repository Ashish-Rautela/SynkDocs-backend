const SearchDocumentsRepository = require('./repository');
const SearchDocumentsService = require('./service');
const SearchDocumentsHandler = require('./handler');

const repository = new SearchDocumentsRepository();
const service = new SearchDocumentsService(repository);
const handlerInstance = new SearchDocumentsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
