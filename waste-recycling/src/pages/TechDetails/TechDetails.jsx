import React from "react";
import { useParams } from "react-router-dom";
import Table from "../../components/Table/Table";
import "./TechDetails.css";

const TechDetails = () => {
    const { id } = useParams();

    // Здесь нужно загрузить данные о записи по ID с помощью API
    const testData = {
        id: 1,
        name: "Технология переработки пластика",
        assignment: "Утилизация отходов",
        characteristic: "Процесс термического разложения пластика",
        resources: {
            energy: 123.0,
            water: 124.1,
            usingPerYear: 125.2
        },
        fkko: [
            {
                name: "Пестициды на основе хлорорганических соединений",
                code: "11101100011"
            },
            {
                name: "Отходы средств защиты растений",
                code: "11101100012"
            }
        ],
        okpd: [
            {
                name: "Кокс и нефтепродукты",
                code: "19"
            },
            {
                name: "Изделия резиновые и пластмассовые",
                code: "22"
            }
        ],
        performance: 500.0,
        secondaryWaste: [
            {
                fkko: {
                    name: "Угольная пыль",
                    code: "1111111103"
                },
                mass: 400.0,
                volume: 100.0
            },
            {
                fkko: {
                    name: "Диоксид натрия",
                    code: "1111111118"
                },
                mass: 300.0,
                volume: 150.0
            }
        ],
        developer: {
            address: "ул. Столовая 95",
            phone: "+79886765531",
            fax: "123456",
            site: "https://superchel.ru"
        },
        users: [
            {
                address: "ул. Магнитная 44",
                phone: "+7999955531",
                fax: "654321",
                site: "https://wowowow.ru"
            },
        ],
        useCase: "Используется для производства топлива",
        expertInfo: {
            conclusion: "Одобрено",
            date: "2023-01-01",
            name: "Экспертное заключение №123"
        }
    };

    const columnsResources = [
        { Header: "Энергопотребление (кВт/ч):", accessor: "energy" },
        { Header: "Водопотребление (м/с):", accessor: "water" },
        { Header: "Использование в год (м^3):", accessor: "usingPerYear" }
    ];

    const fkkoColumns = [
        { Header: "Код по ФККО", accessor: "code" },
        { Header: "Наименование", accessor: "name" }
    ];

    const okpdColumns = [
        { Header: "Код по ОКПД", accessor: "code" },
        { Header: "Наименование", accessor: "name" }
    ];

    const secondaryWasteColumns = [
        { Header: "Код по ФККО", accessor: "code" },
        { Header: "Наименование по ФККО", accessor: "name" },
        { Header: "Масса (кг)", accessor: "mass" },
        { Header: "Объем (м^3)", accessor: "volume" }
    ];

    const developerColumns = [
        { Header: "Адрес", accessor: "address" },
        { Header: "Телефон", accessor: "phone" },
        { Header: "Факс", accessor: "fax" },
        { Header: "Веб-сайт", accessor: "site" }
    ];

    const userColumns = [
        { Header: "Адрес", accessor: "address" },
        { Header: "Телефон", accessor: "phone" },
        { Header: "Факс", accessor: "fax" },
        { Header: "Веб-сайт", accessor: "site" }
    ];

    const secondaryWasteDataModified = testData.secondaryWaste.map(obj => {
        return {
            code: obj.fkko.code,
            name:obj.fkko.name,
            mass:obj.mass,
            volume:obj.volume,
        }
    })

    console.log(secondaryWasteDataModified)

    console.log(testData.secondaryWaste[0]["fkko.code"])
    return (
        <div className="tech-details">
            <h1>Подробная информация о технологии</h1>
            <p><strong>Наименование технологии:</strong> {testData.name}</p>
            <p><strong>Назначение технологии:</strong> {testData.assignment}</p>
            <p><strong>Краткая характеристика технологического процесса:</strong> {testData.characteristic}</p>
            <p><strong>Потребляемые ресурсы:</strong></p>
            <Table columns={columnsResources} data={[testData.resources]} />
            <p><strong>Наименование и код по ФККО используемых отходов:</strong></p>
            <Table columns={fkkoColumns} data={testData.fkko} />
            <p><strong>Наименование и код по ОКПД получаемой продукции:</strong></p>
            <Table columns={okpdColumns} data={testData.okpd} />
            <p><strong>Производительность при получении продукции (тонн/год):</strong> {testData.performance}</p>
            <p><strong>Масса, объем, наименование и код по ФККО вторичных отходов:</strong></p>
            <Table columns={secondaryWasteColumns} data={secondaryWasteDataModified} />
            <p><strong>Информация о разработчике технологии:</strong></p>
            <Table columns={developerColumns} data={[testData.developer]} />
            <p><strong>Информация о юридических лицах, применяющих технологию:</strong></p>
            <Table columns={userColumns} data={testData.users} />
            <p><strong>Применение технологии:</strong> {testData.useCase}</p>
            <p><strong>Экспертная информация:</strong></p>
            <p>{testData.expertInfo.name}, {testData.expertInfo.date}, {testData.expertInfo.conclusion}</p>
        </div>
    );
};

export default TechDetails;
