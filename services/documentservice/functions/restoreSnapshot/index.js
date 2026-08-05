const RestoreSnapshotRepository = require('./repository');
const RestoreSnapshotService = require('./service');
const RestoreSnapshotHandler = require('./handler');

const repository = new RestoreSnapshotRepository();
const service = new RestoreSnapshotService(repository);
const handlerInstance = new RestoreSnapshotHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
