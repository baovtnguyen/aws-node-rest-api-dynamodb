
module.exports.list = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'List todos'
      }
    ),
  };
  return response;
}
