const { StatusCodes } = require('http-status-codes');

const { Err } = require('../response');

const CONTENT_KEY = 'content';
const COMPLETED_KEY = 'completed';
const SUPPORTED_KEYS = [CONTENT_KEY, COMPLETED_KEY];
const REQUIRED_KEYS = [CONTENT_KEY];

const validateTodoData = (data) => {
  if (!data) throw Err(StatusCodes.BAD_REQUEST, 'You must provide body');

  const has = Object.prototype.hasOwnProperty;

  // if data contains any key which is not supported
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (!SUPPORTED_KEYS.includes(key))
      throw Err(StatusCodes.BAD_REQUEST, `Key '${key}' is not supported.`);
  });
};

// validate data for /POST create a new todo
const validatePostData = (data) => {
  data[COMPLETED_KEY] =
    data[COMPLETED_KEY] !== undefined ? data[COMPLETED_KEY] : false;
  validateTodoData(data);
  validateData(data, CONTENT_KEY, 'string');
};

// validate data for /PUT update a new todo
const validatePutData = (data) => {
  validateTodoData(data);

  if (data[CONTENT_KEY] !== undefined)
    validateData(data, CONTENT_KEY, 'string');
  if (data[COMPLETED_KEY] !== undefined)
    validateData(data, COMPLETED_KEY, 'boolean');
};

const validateData = (data, key, type) => {
  if (data[key] === undefined) throw Err(StatusCodes.BAD_REQUEST, `Missing '${key}' field!`);

  if (typeof data[key] !== type)
    throw Err(StatusCodes.BAD_REQUEST, `${key}: is not ${type}`);
};

module.exports = {
  CONTENT_KEY,
  COMPLETED_KEY,
  SUPPORTED_KEYS,
  validatePostData,
  validatePutData,
};
