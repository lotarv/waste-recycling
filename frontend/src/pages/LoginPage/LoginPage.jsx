import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(loginForm.login, loginForm.password);
    if (success) {
      setError("");
      setLoginForm({ login: "", password: "" });
      navigate("/");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Авторизация</h1>
        <p>Войдите, чтобы получить доступ к реализаторам и профилю производителя.</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="login">Логин</label>
            <input
              type="text"
              id="login"
              name="login"
              value={loginForm.login}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">Войти</button>
        </form>
        <p>
          Нет аккаунта? <Link to="/" className="home-link">Вернуться на главную</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;