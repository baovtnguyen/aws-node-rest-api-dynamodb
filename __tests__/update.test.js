require('dotenv').config();

const { updateTodo } = require('../todos/updateTodo');
const Todo = require('../libs/todos/todo');

let todo;

beforeEach(async () => {
  todo = new Todo({
    content: 'Create unit test for update.',
  });
  await todo.save();
});

afterAll(async () => {
  await Todo.deleteAll();
})

test('Should update todo with a new content', async () => {
  const content = "Create unit test for update. Updated!"
  const event = {
    body: `{
      "content": "${content}"
    }`,
    pathParameters: {
      sk: todo.sk,
    },
  };

  const response = await updateTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(200);
  expect(data.content).toEqual(content);
});

test('Should update todo with a new completed set to true', async () => {
  const event = {
    body: `{
      "completed": true
    }`,
    pathParameters: {
      sk: todo.sk,
    },
  };

  const response = await updateTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(200);
  expect(data.completed).toEqual(true);
});
