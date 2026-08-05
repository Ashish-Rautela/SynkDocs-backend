const GetCollaboratorsRepository = require('./repository');
const GetCollaboratorsService = require('./service');
const GetCollaboratorsHandler = require('./handler');

const repository = new GetCollaboratorsRepository();
const service = new GetCollaboratorsService(repository);
const handlerInstance = new GetCollaboratorsHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
