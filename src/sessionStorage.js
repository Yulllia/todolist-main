export const TODOS = "todos";

export function removeTodoFromSStorage(todoItem, store = TODOS) {
  let todos = getTodosFromSStorage(store);

  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const filtredTodos = todos.filter((item) => item !== todoText.innerText);
    sessionStorage.setItem(store, JSON.stringify(filtredTodos));
  }
}

export function saveTodoToSStorage(todo) {
  let todos = getTodosFromSStorage();
  todos.push(todo);
  sessionStorage.setItem(TODOS, JSON.stringify(todos));
}

export function getTodosFromSStorage(store = TODOS) {
  const storageTodos = sessionStorage.getItem(store);
  return storageTodos ? JSON.parse(storageTodos) : [];
}
