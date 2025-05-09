import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-container">
        {/* Главный заголовок */}
        <h1>Платформа управления отходами</h1>
        <p className="intro-text">
          Добро пожаловать на <strong>Платформу управления отходами</strong> — ваш надежный агрегатор для поиска
          реализаторов технологий переработки отходов. Мы помогаем производителям отходов находить эффективные решения,
          предоставляем актуальные справочные данные и статистику, чтобы сделать управление отходами простым и экологичным.
        </p>

        {/* Основной блок с описанием */}
        <div className="info-block">
          <h2>Кому полезна наша платформа?</h2>
          <p>
            Наш сервис создан для <strong>производителей отходов</strong> — компаний и организаций, которые ищут надежных
            партнеров для переработки отходов. Независимо от того, являетесь ли вы небольшим предприятием или крупной
            компанией, мы поможем вам найти технологии и реализаторов, подходящих именно для ваших задач.
          </p>
        </div>

        {/* Блок с разделами */}
        <div className="info-block">
          <h2>Что вы найдете на платформе?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Справочники</h3>
              <p>
                Исследуйте актуальные справочники <strong>ФККО</strong>, <strong>ОКПД</strong> и <strong>технологий
                переработки отходов</strong>. Фильтруйте данные по кодам, названиям отходов или регионам, чтобы найти
                нужную информацию.
              </p>
              <Link to="/technologyView" className="feature-link">Перейти к справочникам</Link>
            </div>
            <div className="feature-item">
              <h3>Статистика</h3>
              <p>
                Анализируйте данные о переработке отходов в регионах России с помощью интерактивных карт и графиков.
                Узнайте, где и какие технологии наиболее востребованы.
              </p>
              <Link to="/statisticsView" className="feature-link">Посмотреть статистику</Link>
            </div>
            <div className="feature-item">
              <h3>Реализаторы технологий</h3>
              <p>
                Авторизованные пользователи могут искать реализаторов технологий переработки по коду ФККО, просматривать
                информацию об организациях и их возможностях.
              </p>
              <Link to="/wasteProducersView" className="feature-link">Найти реализаторов</Link>
            </div>
            <div className="feature-item">
              <h3>Реестр производителей</h3>
              <p>
                Зарегистрируйтесь как производитель отходов, чтобы получить доступ к контактам реализаторов и персонализированным
                рекомендациям по переработке.
              </p>
              <Link to="/wasteProducersView" className="feature-link">Стать производителем</Link>
            </div>
          </div>
        </div>

        {/* Блок с призывом к действию */}
        <div className="cta-block">
          <h2>Начните управлять отходами эффективно!</h2>
          <p>
            Зарегистрируйтесь на платформе, чтобы получить доступ к поиску реализаторов технологий переработки,
            рекомендациям и контактам проверенных организаций.
          </p>
          <button className="cta-button">Зарегистрируйтесь для поиска реализаторов</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;