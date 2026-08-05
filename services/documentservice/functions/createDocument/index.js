const CreateDocumentRepository = require('./repository');
const CreateDocumentService = require('./service');
const CreateDocumentHandler = require('./handler');

const repository = new CreateDocumentRepository();
const service = new CreateDocumentService(repository);
const handlerInstance = new CreateDocumentHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
