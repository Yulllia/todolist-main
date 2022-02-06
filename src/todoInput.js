export function getTodoInputItems(todoInputWrapper) {
  console.log(todoInputWrapper);
  const todoInput = document.querySelector(".todo-input");
  const todoHelper = document.querySelector(".todo-helper");
  const todoButton = document.querySelector(".todo-button");
  return {
    todoInput,
    todoHelper,
    todoButton,
  };
}

export function validateTodoInput(todoInputWrapper) {
  const { todoInput, todoHelper, todoButton } =
    getTodoInputItems(todoInputWrapper);
  // disableEnterClick(todoButton);
  console.log(todoInput.value);
  if (todoInput.value?.length >= 3) {
    todoButton.classList.remove("todo-button_disabled");
    todoHelper.classList.remove("todo-helper_visible");
  } else {
    todoButton.classList.add("todo-button_disabled");
    todoInput.addEventListener("keypress", function disableEnterClick(e) {
      if (e.key === "Enter" && todoInput.value?.length < 3) {
        e.preventDefault();
        return false;
      }
    });
    todoInput.addEventListener("focus", function () {
      todoHelper.classList.add("todo-helper_visible");
    });
  }
}

export function clearTodoInput(todoInputWrapper) {
  const { todoInput, todoHelper, todoButton } =
    getTodoInputItems(todoInputWrapper);

  todoInput.value = "";
  todoButton.classList.add("todo-button_disabled");
  todoHelper.classList.add("todo-helper_visible");
}
