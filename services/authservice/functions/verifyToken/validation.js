const Joi = require('joi');

const verifyTokenSchema = Joi.object({
  token: Joi.string().required()
});

module.exports = { verifyTokenSchema };
