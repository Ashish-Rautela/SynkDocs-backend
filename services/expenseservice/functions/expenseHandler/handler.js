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
      const body = JSON.parse(event.body || '{}');
      logger.info('Parsed Request Body', { body });
      const { operation } = body;

      switch (operation) {
        case 'LOG_EXPENSE':
          return await this._handleLogExpense(body);
        case 'GET_EXPENSES_BY_DATE_RANGE':
          return await this._handleGetExpenses(body);
        default:
          return ApiResponse.error(
            `Unknown operation: ${operation}. Supported: LOG_EXPENSE, GET_EXPENSES_BY_DATE_RANGE`,
            'INVALID_OPERATION',
            HTTP_STATUS.BAD_REQUEST
          );
      }
    } catch (err) {
      return errorMiddleware(err, logger);
    }
  }

  async _handleLogExpense(body) {
    const validatedData = Validator.validate(logExpenseSchema, body);
    const result = await this.expenseService.logExpense(validatedData);
    const response = ApiResponse.success(result, 'Expense logged successfully', HTTP_STATUS.OK);
    logger.logResponse(response);
    return response;
  }

  async _handleGetExpenses(body) {
    const validatedData = Validator.validate(getExpensesSchema, body);
    const result = await this.expenseService.getExpensesByDateRange(validatedData);
    const response = ApiResponse.success(result, 'Expenses retrieved successfully', HTTP_STATUS.OK);
    logger.logResponse(response);
    return response;
  }
}

module.exports = ExpenseHandler;
