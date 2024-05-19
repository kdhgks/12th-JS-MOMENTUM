const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDolist = document.getElementById("todo-list");

// function handleToDoSubmit(event) {
//     event.preventDefault();
//     toDoInput.value = "";
// }

toDoForm.addEventListener("submit", handleToDoSubmit);

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    console.log(toDos)
    saveToDos();
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    li.id = newToDo.id;
    span.innerText = newToDo.text;
    deleteButton.innerText = "X";
    editButton.classText = "Edit";

    deleteButton.className = "button-name";
    editButton.className = "button-name";

    deleteButton.addEventListener("click", deleteToDo)
    editButton.addEventListner("click", editToDo);

    toDolist.appendChild(li);
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
}

function editToDo(event) {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Edit the to-do:", span.innerText);
    if (newText !== null && newText.trim() !== "") {
        const todoId = parseInt(li.id);
        toDos = toDos.map((toDo) => {
            if (toDo.id === todoId) {
                toDo.text = newText;
            }
            return toDo;
        });
        span.innerText = newText;
        saveToDos();
    }
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}