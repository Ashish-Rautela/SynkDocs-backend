const UpdateProfileRepository = require('./repository');
const UpdateProfileService = require('./service');
const UpdateProfileHandler = require('./handler');

const repository = new UpdateProfileRepository();
const service = new UpdateProfileService(repository);
const handlerInstance = new UpdateProfileHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
