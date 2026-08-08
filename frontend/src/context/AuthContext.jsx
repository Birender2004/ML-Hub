import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as loginRequest, register as registerRequest } from "../services/authService.js";

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mlhub_token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    getCurrentUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("mlhub_token");
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  async function login(credentials) {
    const response = await loginRequest(credentials);
    const accessToken = response.data.access_token;
    localStorage.setItem("mlhub_token", accessToken);
    setToken(accessToken);
    return response.data;
  }

  async function register(payload) {
    return registerRequest(payload);
  }

  function logout() {
    localStorage.removeItem("mlhub_token");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
