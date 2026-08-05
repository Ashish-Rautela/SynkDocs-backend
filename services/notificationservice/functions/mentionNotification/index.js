const MentionNotificationRepository = require('./repository');
const MentionNotificationService = require('./service');
const MentionNotificationHandler = require('./handler');

const repository = new MentionNotificationRepository();
const service = new MentionNotificationService(repository);
const handlerInstance = new MentionNotificationHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
