const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let todos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((val) => {
    return val.id !== parseInt(li.id);
  });
  saveToDos();
}

function paintToDo(todoObj) {
  const li = document.createElement("li");
  li.id = todoObj.id;
  const span = document.createElement("span");
  span.innerText = `  ${todoObj.text}`;

  const check = document.createElement("input");
  check.name = "check";
  check.type = "checkbox";
  if (todoObj.check === true) {
    check.checked = true;
    span.classList.add("crossout");
  } else {
    check.checked = false;
    span.classList.remove("crossout");
  }

  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.addEventListener("click", deleteTodo);
  li.appendChild(check);
  li.appendChild(span);
  li.append(btn);
  todoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
    check: false,
  };
  todos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
  handleCheck();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function handleCheckBox(event) {
  const li = event.target.parentElement;
  const listText = li.querySelector("span:nth-child(2)");

  for (let i = 0; todos.length; i++) {
    if (todos[i].id === parseInt(li.id)) {
      if (todos[i].check === true) {
        todos[i].check = false;
        listText.classList.remove("crossout");
        saveToDos();
      } else {
        todos[i].check = true;
        listText.classList.add("crossout");
        saveToDos();
      }
    }
  }
}

function handleCheck() {
  const todoCheck = todoList.querySelectorAll("input");
  for (let i = 0; i < todoCheck.length; i++) {
    todoCheck[i].addEventListener("click", handleCheckBox);
  }
}

handleCheck();
