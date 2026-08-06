class ExpenseService {
  constructor(repository) {
    this.repository = repository;
  }

  async logExpense({ userPhone, expenseType, expenseMode, expenseAmount, expenseDate, description }) {
    const timestamp = new Date(expenseDate).getTime();
    const expenseId = `EXP_${Date.now()}${Math.floor(Math.random() * 10000)}`;

    const item = {
      PK: `USER#${userPhone}`,
      SK: `EXPENSE#${timestamp}#${expenseId}`,
      expense_id: expenseId,
      expense_type: expenseType,
      expense_mode: expenseMode,
      expense_amount: expenseAmount,
      expense_date: expenseDate,
      description: description || '',
      created_at: new Date().toISOString()
    };

    await this.repository.putExpense(item);

    return { expenseId };
  }

  async getExpensesByDateRange({ userPhone, startDate, endDate }) {
    const startTimestamp = new Date(startDate).getTime();
    // Set end date to end of day (23:59:59.999)
    const endTimestamp = new Date(endDate).getTime() + 86399999;

    const expenses = await this.repository.queryByDateRange(userPhone, startTimestamp, endTimestamp);

    // Aggregate calculations
    let totalSpent = 0;
    let totalOnline = 0;
    let totalCash = 0;
    const categoryBreakdown = {};
    const modeBreakdown = { ONLINE: 0, CASH: 0 };

    const formattedExpenses = expenses.map((item) => {
      const amount = item.expense_amount;
      totalSpent += amount;

      // Mode aggregation
      if (item.expense_mode === 'ONLINE') {
        totalOnline += amount;
        modeBreakdown.ONLINE += amount;
      } else {
        totalCash += amount;
        modeBreakdown.CASH += amount;
      }

      // Category aggregation
      const category = item.expense_type;
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + amount;

      return {
        expenseId: item.expense_id,
        expenseType: item.expense_type,
        expenseMode: item.expense_mode,
        expenseAmount: item.expense_amount,
        expenseDate: item.expense_date,
        description: item.description
      };
    });

    return {
      userPhone,
      startDate,
      endDate,
      totalSpent: Math.round(totalSpent * 100) / 100,
      totalOnline: Math.round(totalOnline * 100) / 100,
      totalCash: Math.round(totalCash * 100) / 100,
      count: formattedExpenses.length,
      categoryBreakdown,
      modeBreakdown,
      expenses: formattedExpenses
    };
  }
}

module.exports = ExpenseService;
