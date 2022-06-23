const btnAdd = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete-all');
const filterBtns = document.querySelectorAll('.filter-btn');
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

        if(this.completed) {
            text.classList.add('done');
            checkbox.checked = true;
        };

        item.append(checkbox);
        item.append(text);
        item.append(deleteBtn);
        taskInner.append(item);


        deleteBtn.addEventListener('click', this.deleteTask)
        checkbox.addEventListener('click', this.changeStatus)

        if(input) input.value = '';
    }

    deleteTask = (e) => {
        const res = tasks.filter(item => item.id !== this.id);
        tasks = res;
        e.target.parentNode.remove();
    }

    changeStatus = (e) => {
        e.target.parentNode.querySelector('span').classList.toggle('done');
        
        tasks.map(item => {
            if(item.id === this.id) item.completed = !item.completed;
        })
    }
}

const filterTasks = (e) => {
    let res = [];
    taskInner.innerHTML = '';
    const id = e ? e.target.id : null;

    switch(id) {
        case 'select-completed': 
            res = tasks.filter(item => item.completed);
            break;
        case 'select-not-completed': 
            res = tasks.filter(item => !item.completed);
            break;
        default:
            res = tasks;
    }

    res.forEach(item => item.innerHTML());
}

const addTask = () => {
    const addInput = document.getElementById('add-input');
    const value = addInput.value;

    filterTasks();

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
filterBtns.forEach(btn => btn.addEventListener('click', filterTasks))
