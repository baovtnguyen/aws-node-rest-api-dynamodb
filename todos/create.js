const dynamodb = require('../libs/dynamodb/dynamodb');
const { v4: uuidv4 } = require('uuid');

const { Response } = require('../libs/response');

module.exports.create = async (event, context, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuidv4(),
      text: 'Hello World!',
    },
  };

  try {
    await dynamodb.put(params).promise();

    return Response(201, params.Item);
  } catch (err) {
    return Response(err.statusCode, { message: err.message });
  }
};
