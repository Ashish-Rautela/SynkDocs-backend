const ShareDocumentRepository = require('./repository');
const ShareDocumentService = require('./service');
const ShareDocumentHandler = require('./handler');

const repository = new ShareDocumentRepository();
const service = new ShareDocumentService(repository);
const handlerInstance = new ShareDocumentHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
