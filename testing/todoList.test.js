const Todo = require('../classes/Todo');
const TodoList = require('../classes/TodoList');

describe('TodoList class', () => {
  let todo1, todo2, todo3, list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first returns the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns the first todo item', () => {
    const initialLength = list.toArray().length;
    const todo = list.shift();
    const newLength = list.toArray().length;
    expect(todo).toEqual(todo1);
    expect(newLength + 1).toBe(initialLength);
    expect(list.toArray()).not.toContain(todo);
  });

  test('pop removes and returns the last todo item', () => {
    const initialLength = list.toArray().length;
    const todo = list.pop();
    const newLength = list.toArray().length;
    expect(todo).toEqual(todo3);
    expect(newLength + 1).toBe(initialLength);
    expect(list.toArray()).not.toContain(todo);
  });

  test('isDone returns true when all items in the list are done, or false otherwise', () => {
    expect(list.isDone()).toBe(false);
    [todo1, todo2, todo3].forEach((todo) => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('add throws a TypeError with non-Todo objects', () => {
    expect(() => list.add('take out the trash')).toThrow(TypeError);
  });

  test('itemAt returns a Todo object if index is in range, or throws a ReferenceError', () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(2)).toBe(todo3);
    expect(() => list.itemAt(10)).toThrow(ReferenceError);
  });

  test('markDoneAt marks a Todo object as done if index is in range, else throws a ReferenceError', () => {
    expect(() => list.markDoneAt(10)).toThrow(ReferenceError);
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('markUndoneAt marks a Todo object as not done if index is in range, else throws a ReferenceError', () => {
    expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
    list.markUndoneAt(2);
    expect(todo3.isDone()).toBe(false);
  });

  test('markAllDone marks all Todo objects as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
  });

  test('removeAt removes the Todo at the passed index if in range, else throws a ReferenceError', () => {
    expect(() => list.removeAt(10)).toThrow(ReferenceError);
    list.removeAt(1);
    expect(list.toArray().length).not.toContain(todo2);
  });

  test('toString returns string representation of the list', () => {
    const str = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(str);
  });

  test('toString returns correct string with one todo done', () => {
    todo1.markDone();
    const str = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(str);
  });

  test('toString returns correct string with all todos done', () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    const str = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(str);
  });

  test('forEach runs the callback for each list element', () => {
    const cb = list.forEach((todo) => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter returns an array of elements matching the condition', () => {
    const condition = (todo) => todo.title.endsWith('m');
    expect(list.filter(condition).toArray()).toEqual([todo2, todo3]);
  });

  test('regex match works', () => {
    const str = 'hello world.'
    const regex = / world\./;
    expect(str).toMatch(regex);
  });
});