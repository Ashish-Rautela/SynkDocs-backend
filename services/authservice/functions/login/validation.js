const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email address is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  })
});

module.exports = { loginSchema };
