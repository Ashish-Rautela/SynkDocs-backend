const DeleteAccountRepository = require('./repository');
const DeleteAccountService = require('./service');
const DeleteAccountHandler = require('./handler');

const repository = new DeleteAccountRepository();
const service = new DeleteAccountService(repository);
const handlerInstance = new DeleteAccountHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
