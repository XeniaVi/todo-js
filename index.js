const btnAdd = document.getElementById('add');
const deleteAllBtn = document.getElementById('delete-all');
const filterBtns = document.querySelectorAll('.filter-btn');
const taskInner = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

class Task {
    constructor(value, id) {
        this.id = id;
        this.value = value;
        this.completed = false;
    }
}

const innerHTML = (task) => {
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const text = document.createElement('span');
    const deleteBtn = document.createElement('button');

    item.setAttribute('id', task.id)
    checkbox.type = 'checkbox';
    text.innerHTML = task.value;
    deleteBtn.innerHTML = 'Delete';

    item.classList.add('task-item');

    if(task.completed) {
        text.classList.add('done');
        checkbox.checked = true;
    };

    item.append(checkbox);
    item.append(text);
    item.append(deleteBtn);
    taskInner.append(item);


    deleteBtn.addEventListener('click', deleteTask)
    checkbox.addEventListener('click', changeStatus)
}

const deleteTask = (e) => {
    const id = Number(e.target.parentNode.id);

    tasks = tasks.filter(item => item.id !== id);
    e.target.parentNode.remove();

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const changeStatus = (e) => {
    const id = Number(e.target.parentNode.id);
    e.target.parentNode.querySelector('span').classList.toggle('done');
    
    tasks.map(item => {
        if(item.id === id) item.completed = !item.completed;
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const filterTasks = (e) => {
    let res = [];
    const id = e ? e.target.id : null;

    taskInner.innerHTML = '';

    filterBtns.forEach(btn => btn.classList.remove('select-btn'));

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

    e ? e.target.classList.add('select-btn') : filterBtns[0].classList.add('select-btn');

    res.forEach(item => innerHTML(item));
}


const addTask = () => {
    const addInput = document.getElementById('add-input');
    const value = addInput.value;

    filterTasks();

    if (value) {
        const id = Date.now();
        const newTask = new Task(value, id);

        tasks.push(newTask);
        innerHTML(newTask);
    }

    addInput.value = '';

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const deleteAllTasks = () => {
    tasks = [];

    taskInner.innerHTML = '';

    filterBtns.forEach(btn => btn.classList.remove('select-btn'));
    filterBtns[0].classList.add('select-btn');

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

tasks.forEach(item => innerHTML(item));

btnAdd.addEventListener('click', addTask)
deleteAllBtn.addEventListener('click', deleteAllTasks)
filterBtns.forEach(btn => btn.addEventListener('click', filterTasks))
