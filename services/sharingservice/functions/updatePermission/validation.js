const Joi = require('joi');
const { ROLES } = require('../../../../shared/constants');

const updatePermissionSchema = Joi.object({
  documentId: Joi.string().required(),
  targetUserId: Joi.string().required(),
  role: Joi.string().valid(ROLES.OWNER, ROLES.EDITOR, ROLES.VIEWER, ROLES.COMMENTER).required()
});

module.exports = { updatePermissionSchema };
