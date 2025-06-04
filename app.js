 const todoForm = document.querySelector('form');
 const todoInput = document.querySelector('#todo-input');
 const todoListUL = document.querySelector('#todo-list');

 let allTodos =[];

 todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
 })

    function addTodo() {
        const todoText = todoInput.value.trim();
    }