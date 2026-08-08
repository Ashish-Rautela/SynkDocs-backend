class ExpenseService {
  constructor(repository) {
    this.repository = repository;
  }

  async logExpense({ userPhone, expenseType, expenseMode, expenseAmount, expenseDate, description }) {
    const numericAmount = Number(expenseAmount);
    const expenseId = `EXP_${Date.now()}${Math.floor(Math.random() * 10000)}`;

    const item = {
      PK: `USER#${userPhone}`,
      SK: `EXPENSE#${expenseDate}#${expenseId}`,
      expense_id: expenseId,
      expense_type: expenseType,
      expense_mode: expenseMode,
      expense_amount: numericAmount,
      expense_date: expenseDate,
      description: description || '',
      created_at: new Date().toISOString()
    };

    await this.repository.putExpense(item);

    return { expenseId };
  }

  async getExpensesByDateRange({ userPhone, startDate, endDate }) {
    const rawExpenses = await this.repository.queryByUser(userPhone);

    // Filter expenses within date range (YYYY-MM-DD string comparison)
    const expensesInRange = rawExpenses.filter((item) => {
      const itemDate = item.expense_date;
      if (!itemDate) return true; // fallback if missing
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Aggregate calculations
    let totalSpent = 0;
    let totalOnline = 0;
    let totalCash = 0;
    const categoryBreakdown = {};
    const modeBreakdown = { ONLINE: 0, CASH: 0 };

    const formattedExpenses = expensesInRange.map((item) => {
      const amount = Number(item.expense_amount) || 0;
      totalSpent += amount;

      // Mode aggregation
      const mode = (item.expense_mode || 'CASH').toUpperCase();
      if (mode === 'ONLINE') {
        totalOnline += amount;
        modeBreakdown.ONLINE += amount;
      } else {
        totalCash += amount;
        modeBreakdown.CASH += amount;
      }

      // Category aggregation
      const category = item.expense_type || 'OTHER';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + amount;

      return {
        expenseId: item.expense_id,
        expenseType: item.expense_type,
        expenseMode: item.expense_mode,
        expenseAmount: amount,
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
