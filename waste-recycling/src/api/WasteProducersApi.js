const producersData = [
    {
        id: 1,
        municipality: "Городской округ - город Армавир",
        organization: "Экология Юг",
        fkkoCode: "47110101522",
        wasteTypes: [
            { type: "Лампы ртутные" },
            { type: "Металлические отходы" }
        ],
        hazardClass: "2",
    },
    {
        id: 2,
        municipality: "Городской округ - город Армавир",
        organization: "Чистый город",
        fkkoCode: "48121102533",
        wasteTypes: [
            { type: "Стекло" },
            { type: "Электронные отходы" }
        ],
        hazardClass: "3",
    },
    {
        id: 3,
        municipality: "Городской округ - город Армавир",
        organization: "Экопром",
        fkkoCode: "49210101531",
        wasteTypes: [
            { type: "Батарейки" },
            { type: "Пластик" }
        ],
        hazardClass: "1",
    },
    {
        id: 4,
        municipality: "Городской округ - город Армавир",
        organization: "Зеленый мир",
        fkkoCode: "48121102524",
        wasteTypes: [
            { type: "Строительный мусор" },
            { type: "Бытовые отходы" }
        ],
        hazardClass: "4",
    },
    {
        id: 5,
        municipality: "Городской округ - город Армавир",
        organization: "Чистый край",
        fkkoCode: "49210101512",
        wasteTypes: [
            { type: "Отходы пищевой промышленности" }
        ],
        hazardClass: "2",
    },
    {
        id: 6,
        municipality: "Городской округ - город Армавир",
        organization: "Эко-транс",
        fkkoCode: "49210101591",
        wasteTypes: [
            { type: "Опасные химические отходы" }
        ],
        hazardClass: "1",
    },
];

export async function fetchProducersData(page = 1, search = "") {
    const filteredData = producersData.filter((item) =>
        item.municipality.toLowerCase().includes(search.toLowerCase()) ||
        item.organization.toLowerCase().includes(search.toLowerCase()) ||
        item.fkkoCode.includes(search) ||
        item.wasteTypes.some((w) =>
            w.type.toLowerCase().includes(search.toLowerCase())
        )
    );

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;

    return {
        data: filteredData.slice(startIndex, startIndex + itemsPerPage),
        total: filteredData.length,
    };
}

export default fetchProducersData;
