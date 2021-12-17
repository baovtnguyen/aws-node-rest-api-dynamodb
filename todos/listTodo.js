const { StatusCodes } = require('http-status-codes');

const { Response } = require('../libs/response');
const Todo = require('../libs/todos/todo');

module.exports.listTodo = async (event, context, callback) => {
  try {
    const res = await Todo.findAll();

    return Response(StatusCodes.OK, res.Items);
  } catch (err) {
    return Response(err.statusCode, { message: err.message });
  }
};
