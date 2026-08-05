const UploadAvatarRepository = require('./repository');
const UploadAvatarService = require('./service');
const UploadAvatarHandler = require('./handler');

const repository = new UploadAvatarRepository();
const service = new UploadAvatarService(repository);
const handlerInstance = new UploadAvatarHandler(service);

exports.handler = async (event) => {
  return await handlerInstance.handle(event);
};
