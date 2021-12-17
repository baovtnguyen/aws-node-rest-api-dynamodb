const { v4: uuidv4 } = require('uuid');

const dynamodb = require('../dynamodb/dynamodb');
const { DYNAMODB_TABLE_NAME, TODO_APP_PK } = require('../env');

const { CONTENT_KEY, COMPLETED_KEY } = require('./todoValidator');

class Todo {
  constructor(data) {
    this.pk = TODO_APP_PK;
    this.sk = uuidv4();
    this.content = data.content;
    this.completed = data.completed ? data.completed : false;
  }

  async save() {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        ...this,
      },
      ConditionExpression:
        'attribute_not_exists(pk) AND attribute_not_exists(sk)',
    };

    return await dynamodb.put(params).promise();
  }

  static async findOne(sk) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
    };

    return await dynamodb.get(params).promise();
  }

  static async updateOne(sk, data) {
    const updateAttributes = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    if (data.content !== undefined) {
      updateAttributes.push('#content = :content');
      expressionAttributeNames['#content'] = CONTENT_KEY;
      expressionAttributeValues[':content'] = data.content;
    }
    if (data.completed !== undefined) {
      updateAttributes.push('#completed = :completed');
      expressionAttributeNames['#completed'] = COMPLETED_KEY;
      expressionAttributeValues[':completed'] = data.completed;
    }

    const updateExpression = 'SET ' + updateAttributes.join(',');

    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)',
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    return await dynamodb.update(params).promise();
  }

  static async deleteOne(sk) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)',
    };

    return await dynamodb.delete(params).promise();
  }

  static async findAll() {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      KeyConditionExpression: `pk = :pk`,
      ExpressionAttributeValues: {
        ':pk': TODO_APP_PK,
      },
    };

    return await dynamodb.query(params).promise();
  }

  static async deleteAll() {
    const res = await Todo.findAll();
    const todos = res.Items;
    for (const todo of todos) {
      await Todo.deleteOne(todo.sk);
    }
  }
}

module.exports = Todo;
