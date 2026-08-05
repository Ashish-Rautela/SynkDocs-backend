const GetDocumentRepository = require('./repository');
const GetDocumentService = require('./service');
const GetDocumentHandler = require('./handler');

const repository = new GetDocumentRepository();
const service = new GetDocumentService(repository);
const handlerInstance = new GetDocumentHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
