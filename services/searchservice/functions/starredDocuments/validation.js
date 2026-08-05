const Joi = require('joi');

const starredDocumentsSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(50).default(20)
});

module.exports = { starredDocumentsSchema };
