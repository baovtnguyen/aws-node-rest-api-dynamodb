const { v4: uuidv4 } = require('uuid');

const dynamodb = require('../dynamodb/dynamodb');
const { DYNAMODB_TABLE_NAME, TODO_APP_PK } = require('../env');

const { CONTENT_KEY } = require('./todoValidator');

class Todo {
  constructor(content) {
    this.pk = TODO_APP_PK;
    this.sk = uuidv4();
    this.content = content;
    this.completed = false;
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
      KeyConditionExpression: 'pk = :pk AND sk = :sk',
      ExpressionAttributeValues: {
        ':pk': TODO_APP_PK,
        ':sk': sk,
      },
    };

    return await dynamodb.query(params).promise();
  }

  static async updateOne(sk, newContent) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ConditionExpression: 'attribute_exists(pk) AND attribute_exists(sk)',
      UpdateExpression: 'SET #content = :content',
      ExpressionAttributeNames: {
        '#content': CONTENT_KEY,
      },
      ExpressionAttributeValues: {
        ':content': newContent,
      },
      ReturnValues: 'ALL_NEW',
    };

    return await dynamodb.update(params).promise();
  }

  static async deleteItem(sk) {
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
}

module.exports = Todo;
