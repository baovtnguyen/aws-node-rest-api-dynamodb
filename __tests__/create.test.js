require('dotenv').config();

const { createTodo } = require('../handlers/index');
const Todo = require( '../libs/todos/todo');

afterAll(async () => {
  await Todo.deleteAll();
})

test('Should create a new todo', async () => {
  const event = {
    body: `{
      "content": "Hello World!"
    }`,
  };
  const response = await createTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(201);
  expect(data).toHaveProperty('content');
  expect(data.content).toEqual('Hello World!');
});

test('Should create a new todo with default completed set to false', async () => {
  const event = {
    body: `{
      "content": "Hello World!"
    }`,
  };
  const response = await createTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(201);
  expect(data.completed).toBe(false);
});

test('Should throw error if content is not a string', async () => {
  const event = {
    body: `{
      "content": 1234
    }`,
  };
  const response = await createTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(400);
  expect(data.message).toEqual('content: is not string');
});

test('Should throw error with non-supported keys', async () => {
  const somekey = 'somekey';
  const event = {
    body: `{
      "${somekey}": "This should fail"
    }`,
  };
  const response = await createTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(400);
  expect(data.message).toEqual(`Key '${somekey}' is not supported.`);
});

test('Should create a new todo with completed field set to true', async () => {
  const event = {
    body: `{
      "content": "Hello World!",
      "completed": true
    }`,
  };
  const response = await createTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(201);
  expect(data.completed).toBe(true);
});
