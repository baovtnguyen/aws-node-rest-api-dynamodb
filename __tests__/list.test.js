require('dotenv').config();

const { listTodo} = require('../handlers/index');
const Todo = require('../libs/todos/todo');

const contents = ['First Todo', 'Second Todo', 'Third Todo'];

beforeEach(async () => {

  for(const content of contents) {
    const newTodo = new Todo({ content });
    await newTodo.save();
  }
});

afterAll(async () => {
  await Todo.deleteAll();
})

test('Should list all todos', async () => {
  const response = await listTodo();

  const data = JSON.parse(response.body);
  expect(response.statusCode).toBe(200);
  expect(data.length).toBe(contents.length);
})
