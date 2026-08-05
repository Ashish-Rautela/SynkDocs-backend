const Joi = require('joi');

const searchDocumentsSchema = Joi.object({
  q: Joi.string().min(1).required(),
  limit: Joi.number().integer().min(1).max(50).default(20)
});

module.exports = { searchDocumentsSchema };
