const Joi = require('joi');
const { ROLES } = require('../../../../shared/constants');

const requestAccessSchema = Joi.object({
  documentId: Joi.string().required(),
  role: Joi.string().valid(ROLES.EDITOR, ROLES.VIEWER, ROLES.COMMENTER).default(ROLES.VIEWER)
});

module.exports = { requestAccessSchema };
