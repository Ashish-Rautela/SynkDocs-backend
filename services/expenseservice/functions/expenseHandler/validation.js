const Joi = require('joi');

const EXPENSE_TYPES = ['GROCERIES', 'UTILITIES', 'DINING', 'RENT', 'FUEL', 'OTHER'];
const EXPENSE_MODES = ['ONLINE', 'CASH'];

const logExpenseSchema = Joi.object({
  operation: Joi.string().valid('LOG_EXPENSE').required(),
  userPhone: Joi.string().pattern(/^\d{10,15}$/).required()
    .messages({ 'string.pattern.base': 'userPhone must be 10-15 digits (e.g. 919876543210)' }),
  expenseType: Joi.string().valid(...EXPENSE_TYPES).required()
    .messages({ 'any.only': `expenseType must be one of: ${EXPENSE_TYPES.join(', ')}` }),
  expenseMode: Joi.string().valid(...EXPENSE_MODES).required()
    .messages({ 'any.only': `expenseMode must be one of: ${EXPENSE_MODES.join(', ')}` }),
  expenseAmount: Joi.number().positive().required()
    .messages({ 'number.positive': 'expenseAmount must be a positive number' }),
  expenseDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    .messages({ 'string.pattern.base': 'expenseDate must be in YYYY-MM-DD format' }),
  description: Joi.string().max(500).allow('').optional()
});

const getExpensesSchema = Joi.object({
  operation: Joi.string().valid('GET_EXPENSES_BY_DATE_RANGE').required(),
  userPhone: Joi.string().pattern(/^\d{10,15}$/).required()
    .messages({ 'string.pattern.base': 'userPhone must be 10-15 digits (e.g. 919876543210)' }),
  startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    .messages({ 'string.pattern.base': 'startDate must be in YYYY-MM-DD format' }),
  endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
    .messages({ 'string.pattern.base': 'endDate must be in YYYY-MM-DD format' })
});

module.exports = { logExpenseSchema, getExpensesSchema };
