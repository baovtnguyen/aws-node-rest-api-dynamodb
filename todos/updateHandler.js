const { StatusCodes } = require('http-status-codes');

const { Response, Err } = require('../libs/response');
const { validatePutData } = require('../libs/todos/todoValidator');
const Todo = require('../libs/todos/todo');

module.exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  try {
    validatePutData(data);
    const res = await Todo.updateOne(event.pathParameters.sk, data);

    return Response(StatusCodes.OK, res.Attributes);
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException')
      return Response(StatusCodes.BAD_REQUEST, {
        message: 'Could not update a non-existent todo!',
      });

    return Response(err.statusCode, { message: err.message });
  }
};
