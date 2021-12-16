require('dotenv').config();

const { create } = require('../todos/create');

beforeEach(async () => {
})

test('Should create a new todo', async () => {
  const event = {
    body: `{
      "text": "Hello World!"
    }`,
  };
  const response = await create(event);
  expect(response.statusCode).toBe(201);
});

