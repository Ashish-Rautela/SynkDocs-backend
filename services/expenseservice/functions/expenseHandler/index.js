const ExpenseRepository = require('./repository');
const ExpenseService = require('./service');
const ExpenseHandler = require('./handler');

const repository = new ExpenseRepository();
const service = new ExpenseService(repository);
const handlerInstance = new ExpenseHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
