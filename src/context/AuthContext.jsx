import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoggedIn(!!token);
    const handleStorage = () => {
      setLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setLoggedIn(true);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser({});
  };

  return <AuthContext.Provider value={{ loggedIn, login, logout, token, user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
