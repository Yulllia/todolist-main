export const STATECOMPLETED = "completed";
export const STATEUNCOMPLETED = "uncompleted";

export function removeCompletedTodoFromSStorage(todoItem, store) {
  const storeString = sessionStorage.getItem(store);
  let storeArray = storeString
    .substring(1, storeString.length - 1)
    .replace(/"/g, "")
    .split(",");
  storeArray = storeArray.filter((el) => el !== todoItem);
  sessionStorage.removeItem(store);
  if (storeArray[0]?.length !== 0) {
    sessionStorage.setItem(store, JSON.stringify(storeArray));
  }
}

export function saveTodoToSStorageCompleted(todo, store) {
  let completed = getTodosCompletedFromSStorage(store);
  completed.push(todo);
  sessionStorage.setItem(store, JSON.stringify(completed));
}

export function getTodosCompletedFromSStorage(store) {
  const storageState = sessionStorage.getItem(store);
  console.log(storageState);
  return storageState ? JSON.parse(storageState) : [];
}
