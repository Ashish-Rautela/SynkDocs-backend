const DeleteDocumentRepository = require('./repository');
const DeleteDocumentService = require('./service');
const DeleteDocumentHandler = require('./handler');

const repository = new DeleteDocumentRepository();
const service = new DeleteDocumentService(repository);
const handlerInstance = new DeleteDocumentHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
