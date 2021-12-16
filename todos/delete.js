const { StatusCodes } = require('http-status-codes');

const { Response } = require('../libs/response');
const Todo = require('../libs/todos/todo');

module.exports.delete = async (event, context, callback) => {
  try {
    await Todo.deleteItem(event.pathParameters.sk);

    return Response(StatusCodes.OK, { message: 'Successfully Deleted!' });
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException')
      return Response(StatusCodes.BAD_REQUEST, {
        message: 'Could not update a non-existing todo!',
      });

    return Response(err.statusCode, { message: err.message });
  }
};
