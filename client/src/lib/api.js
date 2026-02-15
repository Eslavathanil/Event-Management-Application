// Configure your backend base URL here
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  const user = JSON.parse(localStorage.getItem("bellcorp_user") || "null");
  return user?.token || null;
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// Auth
export const authApi = {
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
};

// Events
export const eventsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/events${query ? `?${query}` : ""}`);
  },
  getById: (id) => request(`/events/${id}`),
};

// Registrations
export const registrationApi = {
  register: (eventId) => request("/registrations", { method: "POST", body: JSON.stringify({ eventId }) }),
  cancel: (eventId) => request(`/registrations/${eventId}`, { method: "DELETE" }),
  getMyRegistrations: () => request("/registrations/me"),
};
