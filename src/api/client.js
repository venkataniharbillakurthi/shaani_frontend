const TOKEN_KEY = "shaani-admin-token";
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  if (!API_URL) return path;
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (response.status === 204) return null;
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(data?.message || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function uploadFile(path, file) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(apiUrl(path), { method: "POST", headers, body });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(data?.message || "Upload failed");
    error.status = response.status;
    throw error;
  }
  return data;
}
