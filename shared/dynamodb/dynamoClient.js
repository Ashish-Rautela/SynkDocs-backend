const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb');

const region = process.env.AWS_REGION || 'ap-south-1';
const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true
  }
});

class DynamoClient {
  static async get(tableName, key) {
    const command = new GetCommand({
      TableName: tableName,
      Key: key
    });
    const response = await docClient.send(command);
    return response.Item || null;
  }

  static async put(tableName, item) {
    const command = new PutCommand({
      TableName: tableName,
      Item: item
    });
    await docClient.send(command);
    return item;
  }

  static async query(params) {
    const command = new QueryCommand(params);
    const response = await docClient.send(command);
    return {
      items: response.Items || [],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  }

  static async update(params) {
    const command = new UpdateCommand(params);
    const response = await docClient.send(command);
    return response.Attributes;
  }

  static async delete(tableName, key) {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key
    });
    await docClient.send(command);
    return true;
  }

  static async scan(tableName, options = {}) {
    const command = new ScanCommand({
      TableName: tableName,
      ...options
    });
    const response = await docClient.send(command);
    return {
      items: response.Items || [],
      lastEvaluatedKey: response.LastEvaluatedKey
    };
  }
}

module.exports = DynamoClient;
