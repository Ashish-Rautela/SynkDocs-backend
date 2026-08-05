const CommentNotificationRepository = require('./repository');
const CommentNotificationService = require('./service');
const CommentNotificationHandler = require('./handler');

const repository = new CommentNotificationRepository();
const service = new CommentNotificationService(repository);
const handlerInstance = new CommentNotificationHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
