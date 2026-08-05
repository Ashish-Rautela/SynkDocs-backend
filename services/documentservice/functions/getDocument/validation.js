const Joi = require('joi');

const getDocumentSchema = Joi.object({
  documentId: Joi.string().required()
});

module.exports = { getDocumentSchema };
