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
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message
      }));
      throw new ValidationError('Validation failed for request data', details);
    }

    return value;
  }
}

module.exports = Validator;
