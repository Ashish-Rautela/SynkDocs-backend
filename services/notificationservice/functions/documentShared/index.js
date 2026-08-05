const DocumentSharedNotificationRepository = require('./repository');
const DocumentSharedNotificationService = require('./service');
const DocumentSharedNotificationHandler = require('./handler');

const repository = new DocumentSharedNotificationRepository();
const service = new DocumentSharedNotificationService(repository);
const handlerInstance = new DocumentSharedNotificationHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
