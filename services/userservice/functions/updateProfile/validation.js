const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  bio: Joi.string().max(500).allow('').optional(),
  avatarUrl: Joi.string().max(2048).allow('').optional()
});

module.exports = { updateProfileSchema };
