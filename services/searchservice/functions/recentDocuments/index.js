const RecentDocumentsRepository = require('./repository');
const RecentDocumentsService = require('./service');
const RecentDocumentsHandler = require('./handler');

const repository = new RecentDocumentsRepository();
const service = new RecentDocumentsService(repository);
const handlerInstance = new RecentDocumentsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
