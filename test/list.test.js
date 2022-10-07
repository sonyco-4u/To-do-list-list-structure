/**
 * @jest-environment jsdom
 */

import List from '../src/list.js';

document.body.innerHTML = `
  <section class="d-flex cols todo-list">
    <header class="header d-flex s-between">
        <h2>Today's To Do </h2>
        <span class="material-icons" id="delete-all">autorenew</span>
    </header>
    <form action="#" class="d-flex s-between" id="add-task">
        <input type="text" name="activity" placeholder="Add your List">
        <button type="submit">
            <span class="material-icons">keyboard_return</span>
        </button>
    </form>
    <ul id="list-items"></ul>
    <div class="d-flex clear-completed">
      Clear All Completed
    </div>
  </section>
`;
describe('Check add and remove functionality', () => {
  window.localStorage = Storage.prototype;
  test('Adding a task', () => {
    const todoList = new List();
    todoList.addActivity('Test');
    // Add test
    expect(todoList.list).toHaveLength(1);

    // Mocking local storage
    const storedData = JSON.parse(localStorage.getItem('todo-list'));
    // Local Storage Test 1
    expect(storedData).not.toBe(null);
    // Local Storage Test 2
    expect(localStorage).toHaveLength(1);
  });
  test('Removing a task', () => {
    const todoList = new List();
    // Clear all the tasks
    todoList.clearAll();
    todoList.addActivity('Test');
    todoList.addActivity('Test');
    todoList.addActivity('Test');
    todoList.deleteActivity(1);
    // Remove test
    expect(todoList.list).toHaveLength(2);
  });

  describe('Updating a task', () => {
    test('Update task status', () => {
      const todoList = new List();
      todoList.addActivity('Test');
      todoList.updateActivityStatus(1);
      expect(todoList.list[0].completed).toBe(true);
      todoList.clearAll();
    });
  });

  describe('Clearing completed items', () => {
    test('Clear completed tasks', () => {
      const todoList = new List();
      todoList.addActivity('Test 1');
      todoList.addActivity('Test 2');
      todoList.addActivity('Test 3');
      todoList.updateActivityStatus(1);
      todoList.clearCompleted();
      expect(todoList.list).toHaveLength(2);
    });
  });
});
