const DynamoClient = require('../../../../shared/dynamodb/dynamoClient');

const EXPENSES_TABLE = process.env.EXPENSES_TABLE || 'SynkDocs-Expenses';

class ExpenseRepository {
  async putExpense(item) {
    return await DynamoClient.put(EXPENSES_TABLE, item);
  }

  async queryByUser(userPhone) {
    const result = await DynamoClient.query({
      TableName: EXPENSES_TABLE,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userPhone}`,
        ':skPrefix': 'EXPENSE#'
      },
      ScanIndexForward: true
    });
    return result.items || [];
  }
}

module.exports = ExpenseRepository;
