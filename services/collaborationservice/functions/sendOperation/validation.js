const Joi = require('joi');

const sendOperationSchema = Joi.object({
  documentId: Joi.string().required(),
  operation: Joi.object().required()
});

module.exports = { sendOperationSchema };
