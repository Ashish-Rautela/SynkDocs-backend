const Joi = require('joi');

const restoreSnapshotSchema = Joi.object({
  documentId: Joi.string().required(),
  version: Joi.string().required()
});

module.exports = { restoreSnapshotSchema };
