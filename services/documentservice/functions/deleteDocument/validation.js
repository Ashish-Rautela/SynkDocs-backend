const Joi = require('joi');

const deleteDocumentSchema = Joi.object({
  documentId: Joi.string().required()
});

module.exports = { deleteDocumentSchema };
