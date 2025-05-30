import { useState, useEffect } from "react";
import TechnologiesTable from "../../components/Table/TechnologiesTable.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import fetchTableData from "../../api/TechnologyApi.js";

function TechnologiesTableView() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const columns = [
        { Header: "Наименование технологии", accessor: "name" },
        { Header: "Назначение технологии", accessor: "assignment" },
        { Header: "Краткая характеристика процесса", accessor: "characteristic" },
        { Header: "Коды по ФККО перерабатываемых элементов", accessor: "fkko" },
        { Header: "Применение технологии", accessor: "useCase" },
        { Header: "Основной вывод заключения", accessor: "expertConclusion" },
    ]

    useEffect(() => {
        async function loadData() {
            try {
                const result = await fetchTableData(page, search); // Запрос к API
                console.log(result);
                setData(result.data);
                setTotal(result.total);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                setData([]); // Если произошла ошибка, сбрасываем данные
                setTotal(0); // Сбрасываем общее количество
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [page, search]);

    if (loading) {
        return <div>Загрузка данных...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    if (data == null || data.length == 0) {
        return <div style={{display:"flex", flexDirection:"column"}}>
            <div className="info-block">
                <h1>Таблица технологий переработки отходов</h1>
                <p>Эта таблица содержит информацию о существующих технологиях переработки отходов, включая их наименование, назначение, описание, коды ФККО, и другую ключевую информацию. Для подробного ознакомления с каждой технологией нажмите на ссылку "подробнее"</p>
            </div>
            <SearchBar value={search} onChange={setSearch}></SearchBar>
            <div style={{marginTop:"20px", alignSelf:"center"}}>Данные по вашему запросу отстутствуют</div>
        </div>
    }
    return (
        <div>
            <div className="info-block">
                <h1>Таблица технологий переработки отходов</h1>
                <p>Эта таблица содержит информацию о существующих технологиях переработки отходов, включая их наименование, назначение, описание, коды ФККО, и другую ключевую информацию. Для подробного ознакомления с каждой технологией нажмите на ссылку "подробнее"</p>
            </div>
            <SearchBar value={search} onChange={setSearch}></SearchBar>
            <TechnologiesTable columns={columns} data={data}></TechnologiesTable>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>{"<"}</button>
                <span style={{ fontWeight: "bold" }}>{page} / {total > 5 ? Math.ceil(total / 5) : 1}</span>
                <button onClick={() => setPage((p) => (p * 5 < total ? p + 1 : p))}>{">"}</button>
            </div>
        </div>
    )
}

export default TechnologiesTableView;