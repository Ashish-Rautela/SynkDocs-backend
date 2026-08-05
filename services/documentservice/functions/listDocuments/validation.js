const Joi = require('joi');

const listDocumentsSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  nextToken: Joi.string().optional()
});

module.exports = { listDocumentsSchema };
