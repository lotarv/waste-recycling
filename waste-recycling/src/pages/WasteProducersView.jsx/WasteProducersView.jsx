import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducersData from "../../api/WasteProducersApi";

function WasteProducersView() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const columns = [
        { Header: "Муниципальное образование", accessor: "municipality" },
        { Header: "Название организации", accessor: "organization" },
        { Header: "Код ФККО", accessor: "fkkoCode" },
        { Header: "Вид отходов", accessor: "wasteTypes" }, // wasteTypes — массив
        { Header: "Класс опасности", accessor: "hazardClass" },
    ];

    useEffect(() => {
        async function loadData() {
            const result = await fetchProducersData(page, search);
            setData(result.data);
            setTotal(result.total);
        }
        loadData();
    }, [page, search]);

    return (
        <div>
            <div className="info-block">
                <h1>Таблица организаций, производящих отходы</h1>
                <p>Эта таблица предоставляет информацию о муниципальных образованиях и организациях, производящих отходы, включая их наименование, коды ФККО, виды отходов и класс опасности.</p>
            </div>
            <SearchBar value={search} onChange={setSearch} />
            <Table
                columns={columns}
                data={data.map((item) => ({
                    ...item,
                    wasteTypes: item.wasteTypes.map((w) => w.type).join(", "), // Преобразуем массив в строку
                }))}
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
