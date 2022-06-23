const btnAdd = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete-all');
const taskInner = document.getElementById('task-list');
let tasks = [];

class Task {
    constructor(value, id) {
        this.id = id;
        this.value = value;
        this.completed = false;
    }

    innerHTML(input) {
        const item = document.createElement('li');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');
        const deleteBtn = document.createElement('button');

        checkbox.type = 'checkbox';
        text.innerHTML = this.value;
        deleteBtn.innerHTML = 'Delete';

        item.classList.add('task-item');

        item.append(checkbox);
        item.append(text);
        item.append(deleteBtn);
        taskInner.append(item);

        deleteBtn.addEventListener('click', this.deleteTask)

        input.value = '';
    }

    deleteTask(e) {
        const res = tasks.filter(item => item.id !== this.id);
        tasks = res;
        e.target.parentNode.remove();
    }
}

const addTask = () => {
    const addInput = document.getElementById('add-input');
    const value = addInput.value;
    if (value) {
        const id = Date.now();
        const newTask = new Task(value, id);
        tasks.push(newTask);
        newTask.innerHTML(addInput);
    }
}

const deleteAllTasks = () => {
    tasks = [];
    taskInner.innerHTML = '';
}

btnAdd.addEventListener('click', addTask)
deleteAllBtn.addEventListener('click', deleteAllTasks)
