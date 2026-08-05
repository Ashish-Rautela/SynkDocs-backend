const Joi = require('joi');

const createDocumentSchema = Joi.object({
  title: Joi.string().min(1).max(255).default('Untitled Document'),
  content: Joi.string().allow('').optional()
});

module.exports = { createDocumentSchema };
