let tasks = [];

function promptUser() {
    const action = prompt('What would you like to do? (new/pending/completed)');
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
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');

    if (taskInput.value.trim() !== '' && dateInput.value && timeInput.value) {
        const task = {
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

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <span>${task.date} ${task.time}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);
    const newDate = prompt('Edit the date:', task.date);
    const newTime = prompt('Edit the time:', task.time);

    if (newText && newDate && newTime) {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newText, date: newDate, time: newTime } : task);
        renderTasks();
    }
}

function toggleComplete(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}

// Call promptUser to start the interaction
promptUser();
