const Joi = require('joi');
const { ROLES } = require('../../../../shared/constants');

const shareDocumentSchema = Joi.object({
  documentId: Joi.string().required(),
  targetUserId: Joi.string().required(),
  role: Joi.string().valid(ROLES.EDITOR, ROLES.VIEWER, ROLES.COMMENTER).default(ROLES.VIEWER)
});

module.exports = { shareDocumentSchema };
