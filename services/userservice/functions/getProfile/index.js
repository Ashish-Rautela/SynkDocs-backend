const GetProfileRepository = require('./repository');
const GetProfileService = require('./service');
const GetProfileHandler = require('./handler');

const repository = new GetProfileRepository();
const service = new GetProfileService(repository);
const handlerInstance = new GetProfileHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
