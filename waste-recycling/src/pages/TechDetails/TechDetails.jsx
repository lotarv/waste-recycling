import React from "react";
import { useParams } from "react-router-dom";
import Table from "../../components/Table/Table";
const TechDetails = () => {
    const { id } = useParams();

    // Здесь нужно загрузить данные о записи по ID с помощью API
    const testData = {
        name: "Технология переработки пластика",
        purpose: "Утилизация отходов",
        description: "Процесс термического разложения пластика",
        resources: {
            energy: 150,
            water: 100,
            disposal: 500
        },
        waste_to_recycle: [
            {
                fkkoCode: "11101100000",
                fkkoName: "Отходы от предпосевной подготовки семян зерновых культур",
            }
        ],
        secondaryWasteOkpd: [
            {
                okpdCode: 19,
                okpdName: "Кокс и нефтепродукты"
            },
            {
                okpdCode:22,
                okpdName: "Изделия резиновые и пластмассовые"
            }
        ],
        productivity: "500 тонн/год",
        secondaryWaste: [
            {
                mass: 400,
                volume: 100,
                fkkoCode: "1111111103",
                fkkoName: "УГОЛЬНАЯ ПЫЛЬ",
            },
            {
                mass: 300,
                volume: 150,
                fkkoCode: "1111111118",
                fkkoName: "ДИОКСИД НАТРИЯ",
            },
        ],
        developerInfo: {
            adress: "ул.Столовая 95",
            phone: "+79886765531",
            site: "https://superchel.ru"
        },
        userInfo: {
            adress: "ул.Магнитная 44",
            phone: "+7999955531",
            site: "https://wowowow.ru"
        },
        conclusion: "Одобрено. Экспертное заключение №123 от 01.01.2023",

    }

    const columnsResources = [
        { Header: "Энергопотребление (кВт/ч):", accessor: "energy" },
        { Header: "Водопотребление (м/c):", accessor: "water" },
        { Header: "Использование в год(м^3):", accessor: "disposal" },
    ]

    const wasteColumns = [
        {Header: "код по ФККО", accessor: "fkkoCode"},
        {Header: "наименование по ФККО", accessor: "fkkoName"},
    ]

    const secondaryWasteOkpdColumns = [
        {Header: "код по ОКПД", accessor: "okpdCode"},
        {Header: "наименование по ОКПД", accessor: "okpdName"},
    ]

    const secondaryWasteColumns = [
        {Header: "код по ФККО", accessor: "fkkoCode"},
        {Header: "наименование по ФККО", accessor: "fkkoName"},
        {Header: "Масса", accessor: "mass"},
        {Header: "Объем", accessor: "volume"},
    ]

    const developerColumns = [
        {Header: "Адрес", accessor: "adress"},
        {Header: "Телефон", accessor: "phone"},
        {Header: "Веб-сайт", accessor: "site"},
    ]

    const userColumns = [
        {Header: "Адрес", accessor: "adress"},
        {Header: "Телефон", accessor: "phone"},
        {Header: "Веб-сайт", accessor: "site"},
    ]

    return (
        <div>
            <h1>Подробная информация о технологии</h1>
            <p><strong>Наименование технологии:</strong> {testData.name}</p>
            <p><strong>Назначение технологии:</strong> {testData.purpose}</p>
            <p><strong>Краткая характеристика технологического процесса:</strong> {testData.description}</p>
            <p><strong>Потребляемые ресурсы и отходы:</strong></p>
            <Table columns={columnsResources} data={[testData.resources]}></Table>
            <p><strong>Наименование и код по ФККО используемых и(или) обезвреживаемых отходов:</strong></p>
            <Table columns={wasteColumns} data = {testData.waste_to_recycle}></Table>
            <p><strong>Наименование и код по ОКПД получаемой вторичной продукции:</strong> </p>
            <Table columns={secondaryWasteOkpdColumns} data = {testData.secondaryWasteOkpd}></Table>
            <p><strong>Производительность при получении вторичной продукции:</strong> {testData.productivity}</p>
            <p><strong>масса (объем), наименование и код по ФККО вторичных отходов, образующихся за год:</strong></p>
            <Table columns={secondaryWasteColumns} data={testData.secondaryWaste}></Table>
            <p><strong>Информация о разработчике технологии:</strong></p>
            <Table columns = {developerColumns} data = {[testData.developerInfo]}></Table>
            <p><strong>Информация о юридических лицах (индивидуальных предпринимателях), применяющихтехнологию:</strong></p>
            <Table columns = {userColumns} data = {[testData.userInfo]}></Table>
            <p><strong>применение технологии:</strong> {testData.id}</p>
            <p><strong>основной вывод заключения государственной экологической экспертизы на технологию, его дата и номер, наименование органа, выдавшего заключение:</strong></p>
            {testData.conclusion}

        </div>
    );
};

export default TechDetails;
