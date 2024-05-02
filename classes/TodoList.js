const { Todo } = require('./Todo');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(...args) {
    const isTodo = (value) => value instanceof Todo;
    const validTodos = args.filter(isTodo);
    this.todos.push(...validTodos);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  #validateIndex(index) {
    if (!(index in this.todos)) throw new Error(`Index ${index} is invalid or out of range`);
  }

  itemAt(index) {
    this.#validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this.#validateIndex(index);
    this.todos.splice(index, 1);
  }

  toString() {
    const titleLine = `---- ${this.title} ----`;
    const entries = this.todos.map((todo) => todo.toString());
    const lines = [titleLine, ...entries];
    return lines.join('\n');
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(test) {
    const matches = [];
    this.forEach((todo) => {
      if (test(todo)) matches.push(todo);
    });

    return new TodoList(this.title).add(...matches);
  }

  findByTitle(title) {
    let result;
    this.todos.forEach((todo) => {
      if (todo.title === title) result = todo;
    });
    return result;
  }

  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  markDone(title) {
    const todo = this.findByTitle(title);
    if (todo === undefined) return;
    todo.markDone();
  }

  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }

  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }

  toArray() {
    return [...this.todos];
  }
}

const list = new TodoList("Today's Todos");

const todo1 = new Todo('Buy milk');
const todo2 = new Todo('Clean room');
const todo3 = new Todo('Go to the gym');
const todo4 = new Todo('Go shopping');
const todo5 = new Todo('Feed the cats');
const todo6 = new Todo('Study for Launch School');

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

// console.log(list);
list.forEach((todo) => console.log(todo.toString()));

module.exports = { TodoList };
