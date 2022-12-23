export function setUser(data) {
  return { type: "SET_USER", payload: data };
}

export function removeUser() {
  return { type: "REMOVE_USER" };
}
