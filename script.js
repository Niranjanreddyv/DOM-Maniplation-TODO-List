function loadTodos(){
    // this function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function addTodoLocalStorage(todo){
    const todos = loadTodos();
    console.log("this todoList object", todo);
    console.log("this is all todos object",todos);
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

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "Complete";
    completedBtn.classList.add("completeBtn");

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoIteam.appendChild(textDiv);
    todoIteam.appendChild(wrapper);

    todoList.appendChild(todoIteam);
}


document.addEventListener("DOMContentLoaded", ()=>{
    
    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    let todos = loadTodos();

    const todoList = document.getElementById("todoList");

    const filterBtn = document.getElementsByClassName("filterBtn");
   
    console.log(filterBtn);
    for(const btn of filterBtn){
        console.log(btn);
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
        console.log(event.target.value);

    })

    

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    })

});



