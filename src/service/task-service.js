const API_URL = "http://localhost:3050";
const END_POINT = "task";
const API_URL_FULL = `${API_URL}/${END_POINT}`;

export function createTask(data) {
  return fetch(API_URL_FULL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function getTasks() {
  return fetch(API_URL_FULL);
}

export function getTaskById(id) {
  return fetch(`${API_URL_FULL}/${id}`);
}

export function updateTask(data) {
  console.log(data);
}

export function deleteTask(id) {
  return fetch(`${API_URL_FULL}/${id}`, {
    method: "DELETE",
  });
}
