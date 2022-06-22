const addInput = document.getElementById('add-input');
const btnAdd = document.getElementById('add');
const taskInner = document.getElementById('task-list');
const tasks = [];

class Task {
    constructor(value) {
        this.value = value;
        this.completed = false;
    }

    innerHTML() {
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

        addInput.value = '';
    }
}

const addTask = () => {
    const value = addInput.value;
    if (value !== '') {
        const newTask = new Task(value);
        tasks.push(newTask);
        newTask.innerHTML();
    }
}

btnAdd.addEventListener('click', addTask)