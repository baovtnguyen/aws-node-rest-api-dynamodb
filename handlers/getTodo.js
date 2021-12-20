const { StatusCodes } = require('http-status-codes');

const { Response, Err } = require('../libs/response');
const Todo = require('../libs/todos/todo');

module.exports = async (event, context, callback) => {
  try {
    const res = await Todo.findOne(event.pathParameters.sk);

    if(!res.Item)
      throw Err(400, 'Todo does not exist.');

    return Response(StatusCodes.OK, res.Item);
  } catch (err) {
    return Response(err.statusCode, { message: err.message });
  }
};
