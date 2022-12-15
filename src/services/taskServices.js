const API_URL = "http://localhost:3050/tasks";

export function createTask(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function readTaskList() {
  return fetch(`${API_URL}?_sort=id&_order=desc`);
}

export function readTaskListById(id) {
  return fetch(`${API_URL}/${id}`);
}

export function updateTask(data) {
  return fetch(`${API_URL}/${data.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateTaskStatus(id, status) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export function deleteTask(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
