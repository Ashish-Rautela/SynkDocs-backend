const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const EXPENSES_TABLE = process.env.EXPENSES_TABLE || 'SynkDocs-Expenses';

class ExpenseRepository {
  async putExpense(item) {
    return await DynamoClient.put(EXPENSES_TABLE, item);
  }

  async queryByDateRange(userPhone, startTimestamp, endTimestamp) {
    const result = await DynamoClient.query({
      TableName: EXPENSES_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK BETWEEN :skStart AND :skEnd',
      ExpressionAttributeValues: {
        ':pk': `USER#${userPhone}`,
        ':skStart': `EXPENSE#${startTimestamp}`,
        ':skEnd': `EXPENSE#${endTimestamp}~`
      },
      ScanIndexForward: true
    });
    return result.items;
  }
}

module.exports = ExpenseRepository;
