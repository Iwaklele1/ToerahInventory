import React, { createContext, useState, useEffect } from "react";

interface User {
  email: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // buat akun admin default kalau belum ada
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    if (existingUsers.length === 0) {
      const defaultAdmin = {
        email: "admin@toerah.com",
        password: "admin123",
        role: "admin",
      };
      localStorage.setItem("users", JSON.stringify([defaultAdmin]));
    }

    // cek session login
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const currentUser = { email: foundUser.email, role: foundUser.role };
      setUser(currentUser);
      localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
