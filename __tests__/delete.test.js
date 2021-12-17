require('dotenv').config();

const { deleteTodo } = require('../todos/deleteTodo');
const Todo = require('../libs/todos/todo');

let todo;

beforeEach(async () => {
  todo = new Todo('Create unit test for delete');
  await todo.save();
});

afterAll(async () => {
  await Todo.deleteAll();
})

test('Should delete a todo', async () => {
  const event = {
    pathParameters: {
      sk: todo.sk,
    },
  };
  const response = await deleteTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(200);
  expect(data.message).toEqual('Successfully Deleted!');
});


test('Should not delete a non-existent todo', async () => {
  const event = {
    pathParameters: {
      sk: '1234',
    },
  };
  const response = await deleteTodo(event);
  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(400);
});
