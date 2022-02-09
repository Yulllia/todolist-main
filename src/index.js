import "./style/style.css";
import "../index.html";
import { getTodoItem } from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage } from "./sessionStorage";
import { filterTodoItems } from "./filterTodoItem";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
} from "./todoInput";
import {
  STATECOMPLETED,
  STATEUNCOMPLETED,
  saveTodoToSStorageCompleted,
} from "./stateSessionStorage";
import { TODOS } from "./sessionStorage";

const todoInputWrapper = document.querySelector(".todo-input-wrapper");
let { todoInput, todoButton } = getTodoInputItems(todoInputWrapper);
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", () => validateTodoInput(todoInputWrapper));
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", removeDisabled);
todoSelect.addEventListener("change", filterTodos);
todoSelect.addEventListener("change", addDisabled);

function onDOMLoaded() {
  renderTodosFromSStorage();
  validateTodoInput(todoInputWrapper);
  sessionStorage.setItem(STATECOMPLETED, []);
  if (sessionStorage.getItem(TODOS)) {
    sessionStorage.setItem(STATEUNCOMPLETED, sessionStorage.getItem(TODOS));
  }
}

function renderTodosFromSStorage() {
  let todos = getTodosFromSStorage();

  todos.forEach((todoValue) => {
    const todoItem = getTodoItem(todoValue);

    // Add todo item to list
    todoList.appendChild(todoItem);
  });
}

function addTodo(event) {
  event.preventDefault();

  saveTodoToSStorage(todoInput.value);
  saveTodoToSStorageCompleted(todoInput.value, STATEUNCOMPLETED);

  const todoItem = getTodoItem(todoInput.value);
  todoList.appendChild(todoItem);

  clearTodoInput(todoInputWrapper);
}

function removeDisabled() {
  if (todoList.hasChildNodes()) {
    todoSelect.removeAttribute("disabled");
  }
}
export function addDisabled() {
  setTimeout(() => {
    {
      if (!todoList.hasChildNodes()) {
        todoSelect.setAttribute("disabled", true);
      }
    }
  }, 300);
}
function filterTodos(e) {
  const todoItems = todoList.childNodes;
  filterTodoItems(todoItems, e.target.value);
}
addDisabled();
removeDisabled();
