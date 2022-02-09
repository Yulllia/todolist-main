import { addTodoCompleted } from "./addTodoItem";
import {
  saveTodoToSStorageCompleted,
  STATECOMPLETED,
  removeCompletedTodoFromSStorage,
  STATEUNCOMPLETED,
} from "./stateSessionStorage";

const SELECT_OPTIONS = {
  COMPLETED: "completed",
  UNCOMPLETED: "uncompleted",
  ALL: "all",
};

export function getTodoListItems(todoSelectWrapper) {
  let todoCompletedButton;
  let todoValue;
  let todoText;
  console.log(todoSelectWrapper);
  todoCompletedButton = document.querySelector(".todo-check-button");
  todoText = document.querySelector(".todo-text");

  return {
    todoCompletedButton,
    todoValue,
    todoText,
  };
}

export function filterTodoItems(todoItems, optionValue) {
  if (todoItems.length) {
    todoItems.forEach((todoItem, todoText) => {
      switch (optionValue) {
        case SELECT_OPTIONS.COMPLETED:
          if (todoItem.classList.contains("todo-item_completed")) {
            todoItem.style.display = "flex";
            addTodoCompleted(todoText);
            saveTodoToSStorageCompleted(todoItem.innerHTML, STATECOMPLETED);
          } else {
            todoItem.style.display = "none";
            removeCompletedTodoFromSStorage(todoItem.innerHTML, STATECOMPLETED);
          }
          break;
        case SELECT_OPTIONS.UNCOMPLETED:
          if (!todoItem.classList.contains("todo-item_completed")) {
            todoItem.style.display = "flex";
            saveTodoToSStorageCompleted(todoItem.innerHTML, STATEUNCOMPLETED);
          } else {
            todoItem.style.display = "none";
            removeCompletedTodoFromSStorage(
              todoItem.innerHTML,
              STATEUNCOMPLETED
            );
          }
          break;
        case SELECT_OPTIONS.ALL:
        default:
          todoItem.style.display = "flex";
          return;
      }
    });
  }
}
