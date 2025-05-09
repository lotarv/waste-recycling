import "./Table.css";

function TechnologiesTable({ columns, data }) {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor}>{col.Header}</th>
                        ))}
                        <th>Ознакомиться подробнее</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col) => (
                                <td key={col.accessor}>
                                    {Array.isArray(row[col.accessor])
                                        ? row[col.accessor]
                                            .map((item) => `${item.code}`)
                                            .join(", ") // Преобразование массива объектов в строку
                                        : row[col.accessor] // Для обычных значений
                                    }
                                </td>
                            ))}

                            <td>
                                <a href={`/details/${row.id}`}>Подробнее</a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TechnologiesTable;
