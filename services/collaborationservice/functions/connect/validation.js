const Joi = require('joi');

const connectSchema = Joi.object({
  connectionId: Joi.string().required(),
  documentId: Joi.string().required(),
  userId: Joi.string().required()
});

module.exports = { connectSchema };
