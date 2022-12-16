let API_URL = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:3050/tasks/";
} else {
  API_URL = "https://server-to-do-react.vercel.app/";
}

export async function createTask(data) {
  return await fetch(API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readTaskList() {
  return await fetch(`${API_URL}`, { method: "GET" });
}

export async function readTaskListById(id) {
  return await fetch(`${API_URL}/${id}`);
}

export async function updateTask(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateTaskStatus(id, status) {
  return await fetch(`${API_URL}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export async function deleteTask(id) {
  return await fetch(`${API_URL}/deleteTask`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(id),
  });
}
