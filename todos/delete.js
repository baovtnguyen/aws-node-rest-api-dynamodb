const { StatusCodes } = require('http-status-codes');

const { Response } = require('../libs/response');
const Todo = require('../libs/todos/todo');

module.exports.delete = async (event, context, callback) => {
  try {
    const res = await Todo.deleteItem(event.pathParameters.content);
    if (!res.Attributes)
      return Response(StatusCodes.BAD_REQUEST, {
        message: 'Could not delete a non-existing item!',
      });

    return Response(StatusCodes.OK, { message: 'Successfully Deleted!' });
  } catch (err) {
    return Response(err.statusCode, { message: err.message });
  }
};
