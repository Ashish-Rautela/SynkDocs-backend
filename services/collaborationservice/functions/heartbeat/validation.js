const Joi = require('joi');

const heartbeatSchema = Joi.object({
  connectionId: Joi.string().required()
});

module.exports = { heartbeatSchema };
