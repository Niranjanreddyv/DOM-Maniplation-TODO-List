function loadTodos(){
    // this function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    // console.log(todos);
    return todos;
}

function refreshTodo(todos){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoLocalStorage(todo){
    const todos = loadTodos();
    // console.log("this todoList object", todo);
    // console.log("this is all todos object",todos);
    todos.todoList.push({...todo});
    localStorage.setItem("todos", JSON.stringify(todos));

}


function executeFilterAction(event){
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    // console.log(value);
    todoList.innerHTML='';
    const todos = loadTodos();
    if(value == "all"){
        console.log(todoList);
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        })
    }else if(value == "pending"){
        todos.todoList.forEach(todo => {
            if(todo.isCompleted !== true)
                appendTodoInHtml(todo);
        })

    }else{
        todos.todoList.forEach(todo => {
            if(todo.isCompleted === true)
                appendTodoInHtml(todo);
        })
    }
}


function appendTodoInHtml(todo){

    const todoList = document.getElementById("todoList");

    const todoIteam = document.createElement("li");

    todoIteam.setAttribute("data-id", todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted){
        textDiv.classList.add("completed")
    }

    textDiv.textContent = todo.text;
    todoIteam.classList.add("todoIteam");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todosButtons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompleted) ? "Rest" :"Complete";
    completedBtn.classList.add("completeBtn");
    completedBtn.addEventListener("click",toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoIteam.appendChild(textDiv);
    todoIteam.appendChild(wrapper);

    todoList.appendChild(todoIteam);
}

function restHTMLTodos(todos){
    const todoList = document.getElementById("todoList");
    todoList.innerHTML="";
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

function toggleTodo(event){
    console.log("toggled");
    const todoIteam = event.target.parentElement.parentElement;
    const todoId = todoIteam.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if(todo.id == todoId){
            todo.isCompleted = !todo.isCompleted;
        }
    });

    console.log(todos);

    refreshTodo(todos);
    // console.log(todos);
    restHTMLTodos(todos);
    

}

function deleteTodo(event){
    console.log("deleteing");
    const todoIteam = event.target.parentElement.parentElement;
    const todoId = todoIteam.getAttribute("data-id");
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id != todoId);
    refreshTodo(todos);
    restHTMLTodos(todos);

}

document.addEventListener("DOMContentLoaded", ()=>{
    
    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    let todos = loadTodos();


    const todoList = document.getElementById("todoList");



    const filterBtn = document.getElementsByClassName("filterBtn");
   
    // console.log(filterBtn);

    for(const btn of filterBtn){
        // console.log(btn);
        btn.addEventListener("click", executeFilterAction)
    }

   

    submitButton.addEventListener('click', (event)=>{
        const todoText = todoInput.value;
        if(todoText == ""){
            alert("Please write something for the todo");
        }else{
            todos = loadTodos();
            const id = todos.todoList.length;
            addTodoLocalStorage({text:todoText, isCompleted:false, id:id});
            appendTodoInHtml({text:todoText, isCompleted:false, id:id});
            todoInput.value = "";
        }
    })

    todoInput.addEventListener("change", (event)=>{

        const todoText = event.target.value;

        event.target.value = todoText.trim();
        // console.log(event.target.value);

    })

    

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

    

});



