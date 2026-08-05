const Joi = require('joi');

const commentNotificationSchema = Joi.object({
  documentId: Joi.string().required(),
  commentId: Joi.string().required(),
  authorUserId: Joi.string().required(),
  commentText: Joi.string().required()
});

module.exports = { commentNotificationSchema };
