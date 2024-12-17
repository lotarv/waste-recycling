import { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchTableData from "../../api/TechnologyApi";

function TechnologiesTableView() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)

    const columns = [
        { Header: "Наименование технологии", accessor: "name" },
        { Header: "Назначение технологии", accessor: "purpose" },
        { Header: "Краткая характеристика процесса", accessor: "description" },
        { Header: "Коды по ФККО перерабатываемых элементов", accessor: "fkkoCodes" },
        { Header: "Применение технологии", accessor: "application" },
        { Header: "Основной вывод заключения", accessor: "conclusion" },
    ]

    useEffect(() => {
        async function loadData() {
            const result = await fetchTableData(page, search);
            console.log(result);
            setData(result.data);
            setTotal(result.total);
        }
        loadData();
    }, [page, search])
    console.log(total, page)
    console.log(data)
    return (
        <div>
            <div className="info-block">
                <h1>Таблица технологий переработки отходов</h1>
                <p>Эта таблица содержит информацию о существующих технологиях переработки отходов, включая их наименование, назначение, описание, коды ФККО, и другую ключевую информацию. Для подробного ознакомления с каждой технологией нажмите на ссылку "подробнее"</p>
            </div>
            <SearchBar value={search} onChange={setSearch}></SearchBar>
            <Table columns={columns} data={data} modifier="techDetails"></Table>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>{"<"}</button>
                <span style={{ fontWeight: "bold" }}>{page} / {total > 10 ? Math.round(total / 5) : 1}</span>
                <button onClick={() => setPage((p) => (p * 5 < total ? p + 1 : p))}>{">"}</button>
            </div>
        </div>
    )
}

export default TechnologiesTableView;