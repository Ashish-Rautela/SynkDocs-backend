const Joi = require('joi');

const saveSnapshotSchema = Joi.object({
  documentId: Joi.string().required(),
  snapshotContent: Joi.alternatives().try(Joi.object(), Joi.string()).required()
});

module.exports = { saveSnapshotSchema };
