const Joi = require('joi');

const logoutSchema = Joi.object({
  refreshToken: Joi.string().optional()
});

module.exports = { logoutSchema };
