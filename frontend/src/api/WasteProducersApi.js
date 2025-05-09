// const producersData = [
//     {
//         location: "Городской округ - город Армавир",
//         name: "Экология Юг",
//         fkko: {
//             code: "47110101522",
//             name: "Отходы ламп ртутных"
//         },
//         hazardClass: "2",
//     },
//     {
//         location: "Городской округ - город Армавир",
//         name: "Чистый город",
//         fkko: {
//             code: "48121102533",
//             name: "Отходы стеклянной продукции"
//         },
//         hazardClass: "3",
//     },
//     {
//         location: "Городской округ - город Армавир",
//         name: "Экопром",
//         fkko: {
//             code: "49210101531",
//             name: "Отходы батареек"
//         },
//         hazardClass: "1",
//     },
//     {
//         location: "Городской округ - город Армавир",
//         name: "Зеленый мир",
//         fkko: {
//             code: "48121102524",
//             name: "Строительный мусор"
//         },
//         hazardClass: "4",
//     },
//     {
//         location: "Городской округ - город Армавир",
//         name: "Чистый край",
//         fkko: {
//             code: "49210101512",
//             name: "Отходы пищевой промышленности"
//         },
//         hazardClass: "2",
//     },
//     {
//         location: "Городской округ - город Армавир",
//         name: "Эко-транс",
//         fkko: {
//             code: "49210101591",
//             name: "Опасные химические отходы"
//         },
//         hazardClass: "1",
//     },
// ];


// export async function fetchProducersData(page = 1, search = "") {
//     const filteredData = producersData.filter((item) =>
//         item.location.toLowerCase().includes(search.toLowerCase()) || // Поиск по местоположению
//         item.name.toLowerCase().includes(search.toLowerCase()) || // Поиск по названию организации
//         item.fkko.code.includes(search) || // Поиск по коду ФККО
//         item.fkko.name.toLowerCase().includes(search.toLowerCase()) // Поиск по наименованию ФККО
//     );

//     const itemsPerPage = 5;
//     const startIndex = (page - 1) * itemsPerPage;

//     return {
//         data: filteredData.slice(startIndex, startIndex + itemsPerPage),
//         total: filteredData.length,
//     };
// }

// export default fetchProducersData;


export async function fetchProducersData(page = 1, search = "") {
    const apiUrl = `http://localhost:8080/producers?filter=${encodeURIComponent(search)}&page=${page - 1}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
        }

        const result = await response.json(); // Ожидаем JSON-ответ от сервера
        return {
            data: result.producers, // Если API возвращает массив
            total: result.amount, // Если API возвращает объект с общим количеством
        };
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error.message);
        return {
            data: [],
            total: 0,
        };
    }
}

export default fetchProducersData;
