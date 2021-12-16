const { StatusCodes } = require('http-status-codes');

const { Response, Err } = require('../libs/response');
const Todo = require('../libs/todos/todo');

module.exports.update = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  try {
    const res = await Todo.updateOne(event.pathParameters.sk, data.content);

    return Response(StatusCodes.OK, res.Attributes);
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException')
      return Response(StatusCodes.BAD_REQUEST, {
        message: 'Could not update a non-existing todo!',
      });

    return Response(err.statusCode, { message: err.message });
  }
};
