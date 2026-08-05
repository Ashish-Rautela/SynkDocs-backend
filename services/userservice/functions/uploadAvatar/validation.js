const Joi = require('joi');

const uploadAvatarSchema = Joi.object({
  contentType: Joi.string().valid('image/jpeg', 'image/png', 'image/webp').default('image/jpeg')
});

module.exports = { uploadAvatarSchema };
