const UpdatePermissionRepository = require('./repository');
const UpdatePermissionService = require('./service');
const UpdatePermissionHandler = require('./handler');

const repository = new UpdatePermissionRepository();
const service = new UpdatePermissionService(repository);
const handlerInstance = new UpdatePermissionHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
