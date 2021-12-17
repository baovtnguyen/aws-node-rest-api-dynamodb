const { StatusCodes } = require('http-status-codes');

const { Response } = require('../libs/response');
const { validatePostData } = require('../libs/todos/todoValidator');
const Todo = require('../libs/todos/todo');

module.exports.create = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  try {
    validatePostData(data);
    const todo = new Todo(data);
    await todo.save();

    return Response(StatusCodes.CREATED, todo);
  } catch (err) {
    return Response(err.statusCode, { message: err.message });
  }
};
