const RenameDocumentRepository = require('./repository');
const RenameDocumentService = require('./service');
const RenameDocumentHandler = require('./handler');

const repository = new RenameDocumentRepository();
const service = new RenameDocumentService(repository);
const handlerInstance = new RenameDocumentHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
