const ApiResponse = require('../../../../shared/responses/apiResponse');
const Logger = require('../../../../shared/logger/logger');
const Validator = require('../../../../shared/validation/validator');
const errorMiddleware = require('../../../../shared/middleware/errorMiddleware');
const { logExpenseSchema, getExpensesSchema } = require('./validation');
const { HTTP_STATUS } = require('../../../../shared/constants');

const logger = new Logger('ExpenseHandler');

class ExpenseHandler {
  constructor(expenseService) {
    this.expenseService = expenseService;
  }

  async handle(event) {
    logger.info('Full Raw Incoming Request', { event });
    try {
      let body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      logger.info('Parsed Request Body', { body });
      const { operation } = body;

      let response;
      switch (operation) {
        case 'LOG_EXPENSE':
          response = await this._handleLogExpense(body);
          break;
        case 'GET_EXPENSES_BY_DATE_RANGE':
          response = await this._handleGetExpenses(body);
          break;
        default:
          response = ApiResponse.error(
            `Unknown operation: ${operation}. Supported: LOG_EXPENSE, GET_EXPENSES_BY_DATE_RANGE`,
            'INVALID_OPERATION',
            HTTP_STATUS.BAD_REQUEST
          );
      }
      logger.info('Full Outgoing Response', { response });
      return response;
    } catch (err) {
      const errResponse = errorMiddleware(err, logger);
      logger.info('Full Error Outgoing Response', { response: errResponse });
      return errResponse;
    }
  }

  async _handleLogExpense(body) {
    const validatedData = Validator.validate(logExpenseSchema, body);
    const result = await this.expenseService.logExpense(validatedData);
    const response = ApiResponse.success(result, 'Expense logged successfully', HTTP_STATUS.OK);
    return response;
  }

  async _handleGetExpenses(body) {
    const validatedData = Validator.validate(getExpensesSchema, body);
    const result = await this.expenseService.getExpensesByDateRange(validatedData);
    const response = ApiResponse.success(result, 'Expenses retrieved successfully', HTTP_STATUS.OK);
    return response;
  }
}

module.exports = ExpenseHandler;
