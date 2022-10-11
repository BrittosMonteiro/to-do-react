const API_URL = "http://localhost:3050";
const END_POINT = "status";
const API_URL_FULL = `${API_URL}/${END_POINT}`;

export function getStatus() {
  return fetch(API_URL_FULL);
}
