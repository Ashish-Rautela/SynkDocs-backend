const Joi = require('joi');

const revokeAccessSchema = Joi.object({
  documentId: Joi.string().required(),
  targetUserId: Joi.string().required()
});

module.exports = { revokeAccessSchema };
