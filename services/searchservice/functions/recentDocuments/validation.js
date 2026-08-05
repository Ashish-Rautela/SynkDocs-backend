const Joi = require('joi');

const recentDocumentsSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(50).default(10)
});

module.exports = { recentDocumentsSchema };
