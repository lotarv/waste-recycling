import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../pages/AuthContext/AuthContext";
import "./Header.css";

function Header() {
  const { auth } = useContext(AuthContext);

  return (
    <header className="header">
      <Link to="/">
        <h1>Система управления отходами</h1>
      </Link>
      <nav className="header-nav">
        <ul>
          <li className="dropdown">
            <span className="nav-link dropdown-toggle">Справочники</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/fkkoView" className="dropdown-item">
                  Коды ФККО
                </Link>
              </li>
              <li>
                <Link to="/okpdView" className="dropdown-item">
                  Коды ОКПД
                </Link>
              </li>
              <li>
                <Link to="/technologyView" className="dropdown-item">
                  Технологии переработки отходов
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/statisticsView" className="nav-link">
              Статистика
            </Link>
          </li>
          <li>
            <Link to="/realizatorsView" className="nav-link">
              Реализаторы технологий
            </Link>
          </li>
          <li className="auth-section">
            <Link to={auth.isAuthenticated ? "/profile" : "/login"} className="nav-link">
              {auth.isAuthenticated ? "Профиль" : "Авторизоваться"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;