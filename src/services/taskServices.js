import API_URL from "./config";

export async function createTask(data) {
  return await fetch(`${API_URL}tasks`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readTaskList() {
  return await fetch(`${API_URL}tasks`, { method: "GET" });
}

export async function readTaskListById(id) {
  return await fetch(`${API_URL}tasks/${id}`);
}

export async function updateTask(data) {
  return await fetch(`${API_URL}tasks`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateTaskStatus(id, status) {
  return await fetch(`${API_URL}tasks`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, status }),
  });
}

export async function deleteTask(id) {
  return await fetch(`${API_URL}tasks/deleteTask`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(id),
  });
}
