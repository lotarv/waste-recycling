import "./Table.css"
function Table({ columns, data, modifier }) {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor}>{col.Header}</th>
                        ))}
                        {modifier == "techDetails" && <th>Ознакомиться подробнее</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {
                                columns.map((col) => (
                                    <td key={col.accessor}>
                                    {Array.isArray(row[col.accessor])
                                        ? row[col.accessor].join(" ") // Обработка массивов
                                        : row[col.accessor] //Обычные значения
                                    }
                                </td>
                                ))
                            }
                            {console.log(row.id)}
                            {modifier == "techDetails" && <td> <a href={`/details/${row.id}`}>Подробнее</a></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;