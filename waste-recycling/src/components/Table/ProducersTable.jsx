import "./Table.css";

function ProducersTable({ columns, data, modifier }) {
    const getNestedValue = (obj, accessor) => {
        // Разбиваем accessor (например, "fkko.code") и проходим по вложенности объекта
        return accessor.split(".").reduce((value, key) => value?.[key], obj);
    };

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor}>{col.Header}</th>
                        ))}
                        {modifier === "techDetails" && <th>Ознакомиться подробнее</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            {columns.map((col) => (
                                <td key={col.accessor}>
                                    {Array.isArray(getNestedValue(row, col.accessor))
                                        ? getNestedValue(row, col.accessor)
                                              .map((item) => `${item}`)
                                              .join(", ") // Преобразование массива объектов в строку
                                        : getNestedValue(row, col.accessor) || "—" // Для обычных значений
                                    }
                                </td>
                            ))}
                            {modifier === "techDetails" && (
                                <td>
                                    <a href={`/details/${row.id}`}>Подробнее</a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProducersTable;
