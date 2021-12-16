const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const dynamodb = require('../dynamodb/dynamodb');
const { DYNAMODB_TABLE_NAME, TODO_APP_PK } = require('../env');

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { CONTENT_KEY } = require('./todoValidator');

class Todo {
  constructor(content) {
    this.pk = TODO_APP_PK;
    this.sk = uuidv4();
    this.content = content;
    this.completed = false;
    this.createdAt = moment(new Date()).format(DATETIME_FORMAT);
    this.updatedAt = moment(new Date()).format(DATETIME_FORMAT);
  }

  async save() {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        ...this,
      },
      ConditionExpression: 'attribute_not_exists(pk) AND attribute_not_exists(sk)',
    };

    return await dynamodb.put(params).promise();
  }

  static async findOne(content) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Item: {
        pk: TODO_APP_PK,
      },
    };

    return await dynamodb.query(params).promise();
  }

  static async deleteItem(sk) {
    const params = {
      TableName: DYNAMODB_TABLE_NAME,
      Key: {
        pk: TODO_APP_PK,
        sk,
      },
      ReturnValues: 'ALL_OLD',
    };

    return await dynamodb.delete(params).promise();
  }

  // static async find() {
  //   const params = {
  //     TableName: DYNAMODB_TABLE_NAME,
  //     Key: {
  //       id,
  //     },
  //     ReturnValues: 'ALL_OLD',
  //   };

  //   return await dynamodb.query();
  // }

  static async todoExists(content) {
    const todo = Todo.findOne(content);
  }
}

module.exports = Todo;
