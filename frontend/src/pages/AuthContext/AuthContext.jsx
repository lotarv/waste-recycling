import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null, // "user" или "producer"
    producerData: null,
  });

  // Проверка localStorage при загрузке
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Тестовые пользователи (имитация базы данных)
  const testUsers = [
    { login: "user1", password: "pass1", role: "user" },
    { login: "producer1", password: "pass2", role: "producer" },
  ];

  // Авторизация
  const login = (login, password) => {
    const user = testUsers.find(
      (u) => u.login === login && u.password === password
    );
    if (user) {
      const newAuth = {
        isAuthenticated: true,
        user: login,
        role: user.role,
        producerData: user.role === "producer" ? {
          location: "Новосибирская область",
          name: "ООО «ЭкоПром»",
          fkko: { code: "3 10 112 01 42 4", name: "Отходы бумаги и картона, загрязнённые" },
          hazardClass: "IV",
        } : null
      };
      setAuth(newAuth);
      localStorage.setItem("auth", JSON.stringify(newAuth));
      return true;
    }
    return false;
  };

  // Выход
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      producerData: null,
    });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
