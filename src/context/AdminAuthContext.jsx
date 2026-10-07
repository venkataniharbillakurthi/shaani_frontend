import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, setToken } from "../api/client";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      setReady(true);
      return;
    }
    api("/api/auth/me", { auth: true })
      .then((data) => setUsername(data.username))
      .catch(() => {
        setToken(null);
        setUsername("");
      })
      .finally(() => setReady(true));
  }, []);

  const login = async (name, password) => {
    const data = await api("/api/auth/login", { method: "POST", body: { username: name, password } });
    setToken(data.token);
    setUsername(data.username);
  };

  const logout = () => {
    setToken(null);
    setUsername("");
  };

  const value = useMemo(() => ({ username, ready, login, logout }), [username, ready]);
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return value;
}
