import { useState, useEffect } from "react";
import ProducersTable from "../../components/Table/ProducersTable.jsx";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducersData from "../../api/WasteProducersApi";

function WasteProducersView() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const columns = [
        { Header: "Муниципальное образование", accessor: "location" },
        { Header: "Название организации", accessor: "name" },
        { Header: "Код ФККО", accessor: "fkko.code" },
        { Header: "Наименование по ФККО", accessor: "fkko.name" },
        { Header: "Класс опасности", accessor: "hazardClass" },
    ];

    useEffect(() => {
        async function loadData() {
            try {
                const result = await fetchProducersData(page, search); // Запрос к API
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
                <h1>Таблица организаций, производящих отходы</h1>
                <p>Эта таблица предоставляет информацию о муниципальных образованиях и организациях, производящих отходы, включая их наименование, коды и наименование ФККО, а также класс опасности.</p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            <div style={{marginTop:"20px", alignSelf:"center"}}>Данные по вашему запросу отстутствуют</div>
        </div>
    }
    return (
        <div>
            <div className="info-block">
                <h1>Таблица организаций, производящих отходы</h1>
                <p>Эта таблица предоставляет информацию о муниципальных образованиях и организациях, производящих отходы, включая их наименование, коды и наименование ФККО, а также класс опасности.</p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            <ProducersTable
                columns={columns}
                data={data}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                    {"<"}
                </button>
                <span style={{ fontWeight: "bold", margin: "0 10px" }}>
                    {page} / {Math.ceil(total / 5)}
                </span>
                <button onClick={() => setPage((p) => (p * 5 < total ? p + 1 : p))}>
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default WasteProducersView;
