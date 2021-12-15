
module.exports.get = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Get a todo'
      }
    ),
  };
  return response;
}
