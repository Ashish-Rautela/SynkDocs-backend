const Joi = require('joi');

const renameDocumentSchema = Joi.object({
  documentId: Joi.string().required(),
  title: Joi.string().min(1).max(255).required()
});

module.exports = { renameDocumentSchema };
