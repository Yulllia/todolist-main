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

const todoInputWrapper = document.querySelector(".todo-input-wrapper");
const { todoInput, todoButton } = getTodoInputItems(todoInputWrapper);
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", validateTodoInput);
todoButton.addEventListener("click", addTodo);
todoButton.addEventListener("click", removeDisabled);
todoSelect.addEventListener("change", filterTodos);
todoSelect.addEventListener("change", addDisabled);

function onDOMLoaded() {
  renderTodosFromSStorage();
  validateTodoInput(todoInputWrapper);
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

  const todoItem = getTodoItem(todoInput.value);
  todoList.appendChild(todoItem);

  clearTodoInput(todoInputWrapper);
}
function removeDisabled() {
  console.log(todoList.hasChildNodes());
  if (todoList.hasChildNodes()) {
    todoSelect.removeAttribute("disabled");
  }
}
export function addDisabled() {
  setTimeout(() => {
    {
      console.log(todoList.hasChildNodes());
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
