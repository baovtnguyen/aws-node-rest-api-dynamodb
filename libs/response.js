const Response = (statusCode, body) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});

const Err = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = {
  Response,
  Err,
}
