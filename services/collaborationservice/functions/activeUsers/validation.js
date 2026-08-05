const Joi = require('joi');

const activeUsersSchema = Joi.object({
  documentId: Joi.string().required()
});

module.exports = { activeUsersSchema };
