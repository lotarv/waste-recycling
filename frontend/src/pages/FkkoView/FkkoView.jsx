import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./FkkoView.css";

// Генерация заглушки для данных ФККО
const generateFkkoData = () => {
    const names = [
        "Отходы бумаги и картона",
        "Масло моторное отработанное",
        "Отходы пластиковой упаковки",
        "Стеклянный бой",
        "Отходы древесины",
        "Текстильные отходы",
        "Отходы резины",
        "Металлический лом",
        "Органические отходы",
        "Батареи свинцовые отработанные",
        "Отходы лакокрасочных материалов",
        "Медицинские отходы",
        "Отходы полимеров",
        "Шламы нефтепереработки",
        "Строительный мусор",
        "Зола от сжигания угля",
        "Отходы пищевой промышленности",
        "Отходы химической промышленности",
        "Ртутные лампы отработанные",
        "Электронный лом",
    ];

    const fkkoData = [];
    for (let i = 0; i < 50; i++) {
        const code = Math.floor(10000000000 + Math.random() * 90000000000)
            .toString()
            .replace(/(\d{1})(\d{2})(\d{3})(\d{2})(\d{1})/, "$1 $2 $3 $4 $5");
        const name = names[i % names.length];
        fkkoData.push({ name, code });
    }
    return fkkoData;
};

// Функция-заглушка для запроса
const fetchFkkoData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateFkkoData());
        }, 500); // Имитация задержки сети
    });
};

function FkkoView() {
    const [fkkoData, setFkkoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        fetchFkkoData().then((data) => {
            setFkkoData(data);
            setFilteredData(data);
        });
    }, []);

    // Обработка поиска
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredData(fkkoData);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = fkkoData.filter(
                (item) =>
                    item.name.toLowerCase().includes(lowerQuery) ||
                    item.code.replace(/\s/g, "").includes(lowerQuery.replace(/\s/g, ""))
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="fkko-view">
            <div className="info-block">
                <h1>Коды ФККО</h1>
                <p>Перечень кодов ФККО(Федеральный классификационный каталог отходов) и наименований отходов с возможностью поиска по коду или названию. Используйте строку поиска для фильтрации данных.</p>
            </div>
            <div className="search-bar-container">
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Поиск по наименованию или коду ФККО"
                />
            </div>
            <table className="fkko-table">
                <thead>
                    <tr>
                        <th>Код ФККО</th>
                        <th>Наименование</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">Нет данных</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FkkoView;