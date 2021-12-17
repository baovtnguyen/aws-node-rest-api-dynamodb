require('dotenv').config();

const { getTodo } = require('../todos/getTodo');
const Todo = require('../libs/todos/todo');

let todo;

beforeEach(async () => {
  todo = new Todo({
    content: 'Create unit test for get',
    completed: false,
  });
  await todo.save();
});

afterAll(async () => {
  await Todo.deleteAll();
})

test('Should get a todo', async () => {
  const event = {
    pathParameters: {
      sk: todo.sk,
    },
  };
  const response = await getTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(200);
  expect(data.content).toEqual(todo.content)
});


test('Should throw error if get a non-existent todo', async () => {
  const event = {
    pathParameters: {
      sk: '1234',
    },
  };
  const response = await getTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(400);
});
