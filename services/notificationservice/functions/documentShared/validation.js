const Joi = require('joi');

const documentSharedEventSchema = Joi.object({
  documentId: Joi.string().required(),
  targetUserId: Joi.string().required(),
  role: Joi.string().required(),
  sharedBy: Joi.string().required(),
  timestamp: Joi.string().required()
});

module.exports = { documentSharedEventSchema };
