const Joi = require('joi');

const disconnectSchema = Joi.object({
  connectionId: Joi.string().required()
});

module.exports = { disconnectSchema };
