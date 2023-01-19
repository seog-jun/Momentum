const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDEEN_CLASSNAME = "hidden";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDEEN_CLASSNAME);
  const username = loginInput.value;
  greeting.innerText = `Hello! ${username}`;
  greeting.classList.remove(HIDEEN_CLASSNAME);
}
loginForm.addEventListener("submit", onLoginSubmit);
