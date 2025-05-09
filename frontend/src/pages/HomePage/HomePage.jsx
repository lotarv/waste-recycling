import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <h1>Добро пожаловать в систему управления отходами</h1>
        <p>Выберите направление, которое вас интересует:</p>
        <div className="homepage-links">
          <Link to="/technologyView" className="homepage-link">
            Технологии переработки отходов
          </Link>
          <Link to="/wasteProducersView" className="homepage-link">
            Производители отходов
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
