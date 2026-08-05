const Joi = require('joi');

const mentionNotificationSchema = Joi.object({
  documentId: Joi.string().required(),
  mentionedUserId: Joi.string().required(),
  mentionedByUserId: Joi.string().required(),
  contextSnippet: Joi.string().max(200).optional()
});

module.exports = { mentionNotificationSchema };
