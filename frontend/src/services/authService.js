import api from "./api";

export function login({ email, password }) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  return api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function register(payload) {
  return api.post("/auth/register", payload);
}

export function getCurrentUser() {
  return api.get("/users/me");
}
