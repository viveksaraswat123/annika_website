
const API = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "annika_admin_token";

export async function adminLogin(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials. Please try again.");
  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.access_token);
  return data.access_token;
}

export function adminLogout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  try {
    // Check expiry from JWT payload (no library needed)
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Authenticated fetch wrapper — use this instead of plain fetch for admin routes
export async function authFetch(url, options = {}) {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}