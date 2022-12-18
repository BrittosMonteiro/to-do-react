import API_URL from "./config";

export async function createUserAccount(userData) {
  return fetch(`${API_URL}login/create-account`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export async function loginUser(userData) {
  return fetch(`${API_URL}login/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export async function updateUserPassword(userData) {
  return fetch(`${API_URL}login/update-password`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export async function deleteUserAccount(userData) {
  return fetch(`${API_URL}login/delete-account`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData),
  });
}
