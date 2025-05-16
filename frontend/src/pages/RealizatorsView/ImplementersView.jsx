import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ImplementersView.css";

// Массив реализаторов (можно вынести в отдельный файл)
import mockImplementers from "../../data/mockImplementers";

const ITEMS_PER_PAGE = 10;

function ImplementersView() {
  const { auth } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  // Фильтрация по полям
  useEffect(() => {
    const lower = search.toLowerCase();
    const result = mockImplementers.filter((item) =>
      item.wasteName.toLowerCase().includes(lower) ||
      item.technology.toLowerCase().includes(lower) ||
      item.organization.toLowerCase().includes(lower) ||
      item.region.toLowerCase().includes(lower) ||
      item.fkkoCode.replace(/\s/g, "").includes(lower.replace(/\s/g, ""))
    );
    setFilteredData(result);
    setPage(1); // сброс на первую страницу при новом поиске
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const recommendedFilter = (impl) =>
  impl.technology === "Переработка бумаги" &&
  impl.region === "Новосибирская область";

  const sortedData = filteredData
    .map((item) => ({
      ...item,
      isRecommended: recommendedFilter(item),
    }))
    .sort((a, b) => Number(b.isRecommended) - Number(a.isRecommended));

  const paginatedData = sortedData.slice( // именно отсюда!
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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
      <p>Найдите подходящих реализаторов для переработки ваших отходов по коду ФККО, региону или названию отходов.</p>

      <SearchBar value={search} onChange={setSearch} placeholder="Поиск по ФККО, технологии, отходам, региону" />

      <div className="card">
        <h2>Список организаций-реализаторов технологий переработки</h2>
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
              {paginatedData.map((impl) => (
                <tr key={impl.id} className={auth.role === "producer" && impl.isRecommended ? "recommended-row" : ""}>
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

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>{"<"}</button>
            <span>{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}>{">"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImplementersView;
