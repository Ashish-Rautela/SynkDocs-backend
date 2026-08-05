const Joi = require('joi');

const deleteAccountSchema = Joi.object({
  confirmation: Joi.string().valid('DELETE').required()
});

module.exports = { deleteAccountSchema };
