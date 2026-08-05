const Joi = require('joi');

const sendEmailSchema = Joi.object({
  type: Joi.string().required(),
  recipientUserId: Joi.string().required(),
  message: Joi.string().required()
});

module.exports = { sendEmailSchema };
