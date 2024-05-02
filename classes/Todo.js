class Todo {
  static hasTodoKeys(value) {
    const isObject = typeof value === 'object' && value !== null;
    if (!isObject) return false;
    const todoKeys = Object.keys(new Todo());
    const valueKeys = Object.keys(value);
    return todoKeys.every((key) => valueKeys.includes(key));
  }

  static DONE_MARKER = 'X';

  static UNDONE_MARKER = ' ';

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    const marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// const todo1 = new Todo('Buy milk');
// const todo2 = new Todo('Clean room');
// const todo3 = new Todo('Go to the gym');

// todo1.markDone();

// console.log(todo1.toString());
// console.log(todo2.toString());
// console.log(todo3.toString());

// console.log(Object.keys(new Todo()));
// console.log(Object.keys('3'));

module.exports = { Todo };
