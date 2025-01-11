const testData = [
    {
        "id": 1,
        "name": "Технология переработки пластика",
        "assignment": "Утилизация пластика",
        "characteristic": "Процесс термического разложения пластика",
        "useCase": "Используется для производства топлива",
        "expertConclusion": "Одобрено. Экспертное заключение №123 от 01.01.2023",
        "fkko": [
            {
                "code": "11412881711",
                "name": "Пестициды на основе хлорорганических соединений в смеси, содержащие грунт и остатки упаковки"
            },
            {
                "code": "11412891711",
                "name": "Отходы средств защиты растений неустановленного состава в смеси, содержащие грунт и остатки упаковки"
            }
        ]
    },
    {
        "id": 2,
        "name": "Технология переработки стекла",
        "assignment": "Обезвреживание стеклянных отходов",
        "characteristic": "Дробление и переработка стекла",
        "useCase": "Используется для дорожного строительства",
        "expertConclusion": "Одобрено. Экспертное заключение №456 от 02.02.2023",
        "fkko": [
            { "code": "11101100000", "name": "Описание для 11101100000" },
            { "code": "11101100043", "name": "Описание для 11101100043" },
            { "code": "11101100052", "name": "Описание для 11101100052" }
        ]
    },
    {
        "id": 3,
        "name": "Технология переработки тухлых овощей",
        "assignment": "Обезвреживание стеклянных отходов",
        "characteristic": "Дробление и переработка овощей",
        "useCase": "Используется для дорожного строительства",
        "expertConclusion": "Одобрено. Экспертное заключение №456 от 02.02.2023",
        "fkko": [
            { "code": "11101100000", "name": "Описание для 11101100000" },
            { "code": "11101100043", "name": "Описание для 11101100043" },
            { "code": "11101100031", "name": "Описание для 11101100031" }
        ]
    },
    {
        "id": 4,
        "name": "Технология переработки бумаги",
        "assignment": "Утилизация бумажных отходов",
        "characteristic": "Разрыв и компостирование бумаги",
        "useCase": "Используется для производства компоста",
        "expertConclusion": "Одобрено. Экспертное заключение №101 от 04.04.2023",
        "fkko": [
            { "code": "11101100072", "name": "Описание для 11101100072" },
            { "code": "11101100093", "name": "Описание для 11101100093" }
        ]
    },
    {
        "id": 5,
        "name": "Технология переработки электроники",
        "assignment": "Обработка электронных отходов",
        "characteristic": "Разбор и извлечение ценных материалов",
        "useCase": "Используется для производства новых электронных компонентов",
        "expertConclusion": "Одобрено. Экспертное заключение №202 от 05.05.2023",
        "fkko": [
            { "code": "11101100112", "name": "Описание для 11101100112" },
            { "code": "11101100134", "name": "Описание для 11101100134" }
        ]
    },
    {
        "id": 6,
        "name": "Технология переработки батареек",
        "assignment": "Утилизация химических отходов",
        "characteristic": "Разбор и безопасное захоронение батареек",
        "useCase": "Используется для производства безопасных материалов",
        "expertConclusion": "Одобрено. Экспертное заключение №303 от 06.06.2023",
        "fkko": [
            { "code": "11101100151", "name": "Описание для 11101100151" },
            { "code": "11101100170", "name": "Описание для 11101100170" }
        ]
    },
    {
        "id": 7,
        "name": "Технология переработки пластиковых пакетов",
        "assignment": "Утилизация полиэтиленовых мешков",
        "characteristic": "Разрыв и переработка пластиковых пакетов",
        "useCase": "Используется для производства новых пакетов",
        "expertConclusion": "Одобрено. Экспертное заключение №404 от 07.07.2023",
        "fkko": [
            { "code": "11101100200", "name": "Описание для 11101100200" },
            { "code": "11101100222", "name": "Описание для 11101100222" },
            { "code": "11101100244", "name": "Описание для 11101100244" }
        ]
    },
    {
        "id": 8,
        "name": "Технология переработки старых шин",
        "assignment": "Обработка резиновых отходов",
        "characteristic": "Разбор и переработка старых автомобильных шин",
        "useCase": "Используется для производства новых резиновых изделий",
        "expertConclusion": "Одобрено. Экспертное заключение №505 от 08.08.2023",
        "fkko": [
            { "code": "11101100244", "name": "Описание для 11101100244" },
            { "code": "11101100262", "name": "Описание для 11101100262" }
        ]
    },
    {
        "id": 9,
        "name": "Технология переработки старых компьютеров",
        "assignment": "Утилизация старых компьютеров и электроники",
        "characteristic": "Разбор и извлечение ценных компонентов",
        "useCase": "Используется для производства новых электронных устройств",
        "expertConclusion": "Одобрено. Экспертное заключение №606 от 09.09.2023",
        "fkko": [
            { "code": "11101100281", "name": "Описание для 11101100281" },
            { "code": "11101100331", "name": "Описание для 11101100331" }
        ]
    },
    {
        "id": 10,
        "name": "Технология переработки бутылок из пластика",
        "assignment": "Обработка пластиковых бутылок",
        "characteristic": "Разбор и переработка пластиковых бутылок",
        "useCase": "Используется для производства новых бутылок",
        "expertConclusion": "Одобрено. Экспертное заключение №707 от 10.10.2023",
        "fkko": [
            { "code": "11101100332", "name": "Описание для 11101100332" },
            { "code": "11101100354", "name": "Описание для 11101100354" }
        ]
    },
    {
        "id": 11,
        "name": "Технология переработки старых мобильных телефонов",
        "assignment": "Утилизация старых мобильных телефонов",
        "characteristic": "Разбор и извлечение ценных компонентов",
        "useCase": "Используется для производства новых мобильных устройств",
        "expertConclusion": "Одобрено. Экспертное заключение №808 от 11.11.2023",
        "fkko": [
            { "code": "11101100420", "name": "Описание для 11101100420" }
        ]
    },
]


  

async function fetchTableData(page = 1, search = "") {
    const searchLower = search.toLowerCase();

    const filteredData = testData.filter((item) => {
        // Поиск по строковым полям
        const matchesBasicFields =
            item.name.toLowerCase().includes(searchLower) || // Поиск по названию
            item.assignment.toLowerCase().includes(searchLower) || // Поиск по назначению
            item.characteristic.toLowerCase().includes(searchLower);

        // Поиск по кодам и наименованиям ФККО
        const matchesFkko = item.fkko.some(
            (fkkoItem) =>
                fkkoItem.code.toLowerCase().includes(searchLower) || // Поиск по коду
                fkkoItem.name.toLowerCase().includes(searchLower) // Поиск по наименованию
        );

        return matchesBasicFields || matchesFkko;
    });

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;

    return {
        data: filteredData.slice(startIndex, startIndex + itemsPerPage),
        total: filteredData.length,
    };
}


export default fetchTableData;