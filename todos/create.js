const { StatusCodes } = require('http-status-codes');

const { Response } = require('../libs/response');
const { validateTodoData } = require('../libs/todos/todoValidator');
const Todo = require('../libs/todos/todo');

module.exports.create = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  try {
    validateTodoData(data);

    const todo = new Todo(data.content);
    await todo.save();

    return Response(StatusCodes.CREATED, todo);
  } catch (err) {
    if(err.code === 'ConditionalCheckFailedException')
      return Response(err.statusCode, {message: 'Content already exists!'})

    return Response(err.statusCode, { message: err.message });
  }
};
