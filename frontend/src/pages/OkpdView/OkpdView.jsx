import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./OkpdView.css";

// Генерация заглушки для данных ОКПД2
const generateOkpdData = () => {
    const names = [
        "Услуги почтовой связи",
        "Производство офисной мебели",
        "Ски-пары из текстильных материалов",
        "Услуги по ремонту автомобилей",
        "Производство пластиковых изделий",
        "Услуги по складированию",
        "Программное обеспечение",
        "Строительные работы",
        "Услуги общественного питания",
        "Производство стеклянной тары",
        "Финансовые услуги",
        "Услуги по утилизации отходов",
        "Производство металлических конструкций",
        "Транспортные услуги",
        "Издательская деятельность",
        "Производство электрооборудования",
        "Услуги по ремонту зданий",
        "Производство бумажных изделий",
        "Медицинские услуги",
        "Производство химической продукции",
    ];

    const okpdData = [];
    for (let i = 0; i < 50; i++) {
        // Генерация кода: 6–9 цифр в формате XX.XX.XX.XXX
        const classCode = Math.floor(10 + Math.random() * 90);
        const subclassCode = Math.floor(Math.random() * 10);
        const groupCode = Math.floor(10 + Math.random() * 90);
        const subgroupCode = Math.floor(Math.random() * 1000);
        const code = `${classCode}.${subclassCode}${subclassCode}.${groupCode}.${subgroupCode.toString().padStart(3, "0")}`;
        const name = names[i % names.length];
        okpdData.push({ name, code });
    }
    return okpdData;
};

// Функция-заглушка для запроса
const fetchOkpdData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateOkpdData());
        }, 500); // Имитация задержки сети
    });
};

function OkpdView() {
    const [okpdData, setOkpdData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        fetchOkpdData().then((data) => {
            setOkpdData(data);
            setFilteredData(data);
        });
    }, []);

    // Обработка поиска
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            setFilteredData(okpdData);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = okpdData.filter(
                (item) =>
                    item.name.toLowerCase().includes(lowerQuery) ||
                    item.code.replace(/\./g, "").includes(lowerQuery.replace(/\./g, ""))
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="okpd-view">
            <div className="info-block">
                <h1>Коды ОКПД</h1>
                <p>Список кодов ОКПД(Общероссийский классификатор продукции) и наименований продукции с функцией поиска по коду или названию для быстрого доступа к информации.</p>
                <div className="search-bar-container">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Поиск по наименованию или коду ОКПД"
                    />
                </div>
            </div>
            <table className="okpd-table">
                <thead>
                    <tr>
                        <th>Код ОКПД</th>
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

export default OkpdView;