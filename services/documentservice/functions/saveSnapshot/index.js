const SaveSnapshotRepository = require('./repository');
const SaveSnapshotService = require('./service');
const SaveSnapshotHandler = require('./handler');

const repository = new SaveSnapshotRepository();
const service = new SaveSnapshotService(repository);
const handlerInstance = new SaveSnapshotHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
