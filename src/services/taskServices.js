import API_URL from "./config";

export async function createTask(newTask, data) {
  return await fetch(`${API_URL}tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "authorization-token": data.token,
    },
    body: JSON.stringify(newTask),
  });
}

export async function readTaskList(data) {
  return await fetch(`${API_URL}tasks/${data.id}`, {
    method: "GET",
    headers: { "authorization-token": data.token },
  });
}

export async function readTaskListById(id, data) {
  return await fetch(`${API_URL}tasks/${id}`, {
    method: "GET",
    headers: { "authorization-token": data.token },
  });
}

export async function updateTask(task, data) {
  return await fetch(`${API_URL}tasks`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "authorization-token": data.token,
    },
    body: JSON.stringify(task),
  });
}

export async function updateTaskStatus(id, status, data) {
  return await fetch(`${API_URL}tasks`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      "authorization-token": data.token,
    },
    body: JSON.stringify({ id, status }),
  });
}

export async function deleteTask(id, data) {
  return await fetch(`${API_URL}tasks/deleteTask`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "authorization-token": data.token,
    },
    body: JSON.stringify(id),
  });
}
