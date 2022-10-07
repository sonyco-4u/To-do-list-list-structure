import './style.css';
import List from './list.js';

const todoList = new List();
todoList.display();
// This line of code adds new Activity
document.querySelector('#add-task').addEventListener('submit', (e) => {
  e.preventDefault();
  const activity = e.target.elements.activity.value;
  todoList.addActivity(activity);
  e.target.reset();
});

// This line of clears completed Activities
document.querySelector('.clear-completed').addEventListener('click', () => {
  todoList.clearCompleted();
});

// This line of code clears all handler
document.querySelector('#delete-all').addEventListener('click', () => {
  todoList.clearAll();
});