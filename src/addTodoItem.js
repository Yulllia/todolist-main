import { removeTodoFromSStorage } from "./sessionStorage";
import { addDisabled } from "./index";
import {
  saveTodoToSStorageCompleted,
  STATECOMPLETED,
  removeCompletedTodoFromSStorage,
  STATEUNCOMPLETED,
  getTodosCompletedFromSStorage,
} from "./stateSessionStorage";

export const getTodoItem = (text) => {
  // Create Todo Item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // Create and add Todo Text
  const todoText = document.createElement("span");
  todoText.innerText = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  // Create and add Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = "<i class='fas fa-check'></i>";
  checkButton.classList.add("todo-check-button");
  checkButton.addEventListener("click", toggleCheckButton(todoItem));
  todoItem.appendChild(checkButton);

  checkButton.addEventListener(
    "click",
    addTodoCompleted(todoText, STATECOMPLETED)
  );
  checkButton.addEventListener(
    "click",
    removeTodoCompleted(todoText, STATECOMPLETED)
  );
  // Create and add Remove button
  const removeButton = document.createElement("button");
  removeButton.innerHTML = "<i class='fas fa-trash'></i>";
  removeButton.classList.add("todo-remove-button");
  removeButton.addEventListener("click", removeTodoItem(todoItem));
  todoItem.appendChild(removeButton);

  return todoItem;
};

export function addTodoCompleted(todoItem) {
  return (e) => {
    e.preventDefault();
    if (
      getTodosCompletedFromSStorage(STATECOMPLETED).includes(todoItem.innerHTML)
    ) {
      saveTodoToSStorageCompleted(todoItem.innerHTML, STATEUNCOMPLETED);
      removeCompletedTodoFromSStorage(todoItem.innerHTML, STATECOMPLETED);
    } else {
      saveTodoToSStorageCompleted(todoItem.innerHTML, STATECOMPLETED);
      removeCompletedTodoFromSStorage(todoItem.innerHTML, STATEUNCOMPLETED);
    }
  };
}

function removeTodoCompleted(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.addEventListener("transitionend", function () {
      todoItem.remove();
    });
  };
}
function removeTodoItem(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.add("todo-item_fall");
    todoItem.addEventListener("transitionend", function () {
      removeTodoFromSStorage(todoItem);
      removeTodoFromSStorage(todoItem, STATECOMPLETED);
      removeTodoFromSStorage(todoItem, STATEUNCOMPLETED);
      todoItem.remove();
    });
    addDisabled();
  };
}
function toggleCheckButton(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.toggle("todo-item_completed");
  };
}
