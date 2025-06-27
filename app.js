const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');
const addButton = document.querySelector('#add-button');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);
        saveTodos();
        updateTodoList();
        todoInput.value = '';
    }
}

function updateTodoList() {
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.appendChild(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoItem = document.createElement('li');
    todoItem.className = "todo";
    todoItem.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label class="custom-checkbox" for="${todoId}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"></path>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="delete-todo" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 6h-2.5l-1-1h-7l-1 1h-2.5v2h15v-2zm-3.5 12c0 1.1-.9 2-2 2s-2-.9-2-2v-8c0-1.1.9-2 2-2s2 .9 2 2v8zm4.5-10h-15v12c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-12z"></path>
            </svg>
        </button>
    `;

    const deleteButton = todoItem.querySelector('.delete-todo');
    deleteButton.addEventListener("click", () => {
        todoItem.classList.add('removing');
        setTimeout(() => {
            allTodos = allTodos.filter((_, i) => i !== todoIndex);
            saveTodos();
            updateTodoList();
        }, 400); // Match fadeOut animation
    });

    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
        updateTodoList();
    });

    return todoItem;
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}