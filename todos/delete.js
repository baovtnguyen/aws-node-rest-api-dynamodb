
module.exports.delete = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Delete a todo'
      }
    ),
  };
  return response;
}
