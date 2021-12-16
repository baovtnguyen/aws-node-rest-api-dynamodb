const { StatusCodes } = require('http-status-codes');

const { Err } = require('../response');

const CONTENT_KEY = 'content';
const SUPPORTED_KEYS = [CONTENT_KEY];

const validateTodoData = (data) => {
  const has = Object.prototype.hasOwnProperty;

  // if data contains any key which is not supported
  Object.keys(data).forEach((key) => {
    if (!SUPPORTED_KEYS.includes(key))
      throw Err(StatusCodes.BAD_REQUEST, `Key '${key}' is not supported.`);
  });

  validateContent(data[CONTENT_KEY]);
};
const validateContent = (content) => {
  if (typeof content !== 'string')
    throw Err(StatusCodes.BAD_REQUEST, 'content: is not a string');
};

module.exports = {
  CONTENT_KEY,
  SUPPORTED_KEYS,
  validateTodoData,
};
