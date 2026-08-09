const { ValidationError } = require('../errors');

class Validator {
  static validate(schema, data) {
    if (!schema) {
      return data;
    }
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => {
        let msg = d.message.replace(/\"/g, '');
        if (d.path.length > 0) {
          const field = d.path.join('.');
          if (msg.startsWith(field)) {
            msg = field.charAt(0).toUpperCase() + field.slice(1) + msg.slice(field.length);
          }
        }
        return {
          field: d.path.join('.'),
          message: msg
        };
      });

      const primaryMessage = details.map((d) => d.message).join('. ');

      throw new ValidationError(primaryMessage || 'Validation failed for request data', details);
    }

    return value;
  }
}

module.exports = Validator;
