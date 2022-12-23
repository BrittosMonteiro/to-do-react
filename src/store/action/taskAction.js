export function setTaskList(list) {
  return { type: "SET_TASK_LIST", payload: list };
}

export function addTaskToList(task) {
  return { type: "ADD_TASK_TO_LIST", payload: task };
}

export function updateTaskOnList(task) {
  return { type: "UPDATE_TASK_ON_LIST", payload: task };
}

export function removeTaskFromList(id) {
  return { type: "REMOVE_TASK_FROM_LIST", payload: id };
}
