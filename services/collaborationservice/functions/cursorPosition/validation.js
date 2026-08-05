const Joi = require('joi');

const cursorPositionSchema = Joi.object({
  documentId: Joi.string().required(),
  cursor: Joi.object({
    index: Joi.number().integer().required(),
    length: Joi.number().integer().default(0)
  }).required()
});

module.exports = { cursorPositionSchema };
