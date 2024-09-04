"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tasks = [];

function promptUser() {
  var action = prompt('What would you like to do? (new/pending/completed)');

  if (action === 'new') {
    addTask();
  } else if (action === 'pending') {
    filterTasks('pending');
  } else if (action === 'completed') {
    filterTasks('completed');
  } else {
    alert('Invalid option. Please enter "new", "pending", or "completed".');
  }
}

function addTask() {
  var taskInput = document.getElementById('taskInput');
  var dateInput = document.getElementById('dateInput');
  var timeInput = document.getElementById('timeInput');

  if (taskInput.value.trim() !== '' && dateInput.value && timeInput.value) {
    var task = {
      id: Date.now(),
      text: taskInput.value,
      date: dateInput.value,
      time: timeInput.value,
      completed: false
    };
    tasks.push(task);
    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    renderTasks();
  }
}

function renderTasks() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  var filteredTasks = tasks.filter(function (task) {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
  });
  filteredTasks.forEach(function (task) {
    var li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = "\n            <span>".concat(task.text, "</span>\n            <span>").concat(task.date, " ").concat(task.time, "</span>\n            <div>\n                <button class=\"edit\" onclick=\"editTask(").concat(task.id, ")\">Edit</button>\n                <button class=\"complete\" onclick=\"toggleComplete(").concat(task.id, ")\">").concat(task.completed ? 'Undo' : 'Complete', "</button>\n                <button onclick=\"deleteTask(").concat(task.id, ")\">Delete</button>\n            </div>\n        ");
    taskList.appendChild(li);
  });
}

function editTask(id) {
  var task = tasks.find(function (task) {
    return task.id === id;
  });
  var newText = prompt('Edit your task:', task.text);
  var newDate = prompt('Edit the date:', task.date);
  var newTime = prompt('Edit the time:', task.time);

  if (newText && newDate && newTime) {
    tasks = tasks.map(function (task) {
      return task.id === id ? _objectSpread({}, task, {
        text: newText,
        date: newDate,
        time: newTime
      }) : task;
    });
    renderTasks();
  }
}

function toggleComplete(id) {
  tasks = tasks.map(function (task) {
    return task.id === id ? _objectSpread({}, task, {
      completed: !task.completed
    }) : task;
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

function filterTasks(filter) {
  renderTasks(filter);
} // Call promptUser to start the interaction


promptUser();
//# sourceMappingURL=script.dev.js.map
