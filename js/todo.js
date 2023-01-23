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
  span.innerText = todoObj.text;
  const btn = document.createElement("button");
  btn.innerText = "❌";
  btn.addEventListener("click", deleteTodo);
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
  };
  todos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  todos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
