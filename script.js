function loadTodos(){
    // this function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function addTodoLocalStorage(todoText){
    const todos = loadTodos();
    todos.todoList.push(todoText);
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function appendTodoInHtml(todoText){

    const todoList = document.getElementById("todoList");

    const todoLi = document.createElement("li");

    todoLi.textContent = todoText;

    todoList.appendChild(todoLi);

}


document.addEventListener("DOMContentLoaded", ()=>{
    
    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");


    submitButton.addEventListener('click', (event)=>{
        const todoText = todoInput.value;
        if(todoText == ""){
            alert("Please write something for the todo");
        }else{
            addTodoLocalStorage(todoText);
            appendTodoInHtml(todoText);
            todoInput.value = "";
        }
    })

    todoInput.addEventListener("change", (event)=>{

        const todoText = event.target.value;

        event.target.value = todoText.trim();
        console.log(event.target.value);

    })

    const todos = loadTodos();

    todos.todoList.forEach(todo => {
        const newTodoElement = document.createElement("li");
        newTodoElement.textContent = todo;
        todoList.appendChild(newTodoElement);
    })

});

