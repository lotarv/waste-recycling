import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./ImplementersView.css";

const mockImplementers = [
  {
    id: 1,
    fkkoCode: "1 11 111 11 11 5",
    wasteName: "Бумага и картон отходы",
    technology: "Переработка бумаги",
    organization: "ЭкоПереработка",
    region: "Москва",
    volume: "100 тонн/месяц",
    contact: "info@ecopere.ru, +7 (495) 123-45-67",
  },
  {
    id: 2,
    fkkoCode: "4 81 201 01 52 4",
    wasteName: "Пластиковые отходы",
    technology: "Переработка пластика",
    organization: "ПластРесайкл",
    region: "Краснодарский край",
    volume: "50 тонн/месяц",
    contact: "contact@plastrecycle.ru, +7 (861) 987-65-43",
  },
  {
    id: 3,
    fkkoCode: "7 31 110 01 21 5",
    wasteName: "Отработанные батареи",
    technology: "Переработка батареек",
    organization: "БатарейкаЭко",
    region: "Санкт-Петербург",
    volume: "10 тонн/месяц",
    contact: "eco@battery.ru, +7 (812) 555-55-55",
  },
];

function ImplementersView() {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return (
      <div className="implementers-view">
        <h1>Реализаторы технологий переработки</h1>
        <div className="info-block">
          <h2>Доступ ограничен</h2>
          <p>
            Для просмотра информации о реализаторах технологий переработки отходов необходимо авторизоваться.
          </p>
          <Link to="/login" className="auth-link">Перейти к авторизации</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="implementers-view">
      <h1>Реализаторы технологий переработки</h1>
      <p>Найдите подходящих реализаторов для переработки ваших отходов по коду ФККО.</p>

      <div className="card">
        <h2>Список реализаторов</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Код ФККО</th>
                <th>Название отхода</th>
                <th>Технология</th>
                <th>Организация</th>
                <th>Регион</th>
                <th>Объем переработки</th>
                {auth.role === "producer" && <th>Контакты</th>}
              </tr>
            </thead>
            <tbody>
              {mockImplementers.map((impl) => (
                <tr key={impl.id}>
                  <td>{impl.fkkoCode}</td>
                  <td>{impl.wasteName}</td>
                  <td>{impl.technology}</td>
                  <td>{impl.organization}</td>
                  <td>{impl.region}</td>
                  <td>{impl.volume}</td>
                  {auth.role === "producer" && <td>{impl.contact}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ImplementersView;