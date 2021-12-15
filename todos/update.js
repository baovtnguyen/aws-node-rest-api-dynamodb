
module.exports.update = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Update todo'
      }
    ),
  };
  return response;
}
