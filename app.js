const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');
console.log("todoListUL:", todoListUL);

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
        saveTodos(); // Save todos *before* updating the list
        updateTodoList(); // Update the list *after* saving
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
    todoItem.innerHTML = `<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"></path>
                    </svg>
                </label>

                <label for="${todoId}" class="todo-text">${todo.text} </label>
                <button class="delete-todo">
                    <img src="E:\\TO_DO_LIST\\icon\\delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="delete icon">
                </button>
            `;

    const deleteButton = todoItem.querySelector('.delete-todo');
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoItem.querySelector('input');
    checkbox.addEventListener('click', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoItem;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}