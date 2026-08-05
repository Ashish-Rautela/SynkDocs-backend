const SendEmailRepository = require('./repository');
const SendEmailService = require('./service');
const SendEmailHandler = require('./handler');

const repository = new SendEmailRepository();
const service = new SendEmailService(repository);
const handlerInstance = new SendEmailHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
