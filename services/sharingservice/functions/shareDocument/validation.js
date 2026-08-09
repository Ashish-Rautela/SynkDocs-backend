const Joi = require('joi');
const { ROLES } = require('../../../../shared/constants');

const shareDocumentSchema = Joi.object({
  documentId: Joi.string().required(),
  targetUserId: Joi.string().optional(),
  email: Joi.string().email().optional(),
  targetEmail: Joi.string().email().optional(),
  role: Joi.string().valid(ROLES.EDITOR, ROLES.VIEWER, ROLES.COMMENTER, ROLES.OWNER).default(ROLES.VIEWER)
}).or('targetUserId', 'email', 'targetEmail');

module.exports = { shareDocumentSchema };
