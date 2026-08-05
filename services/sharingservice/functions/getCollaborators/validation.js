const Joi = require('joi');

const getCollaboratorsSchema = Joi.object({
  documentId: Joi.string().required()
});

module.exports = { getCollaboratorsSchema };
