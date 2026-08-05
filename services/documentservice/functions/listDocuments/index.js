const ListDocumentsRepository = require('./repository');
const ListDocumentsService = require('./service');
const ListDocumentsHandler = require('./handler');

const repository = new ListDocumentsRepository();
const service = new ListDocumentsService(repository);
const handlerInstance = new ListDocumentsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
