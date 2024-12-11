const testData = [
    {
        id: 1,
        name: "Технология переработки пластика",
        purpose: "Утилизация пластика",
        description: "Процесс термического разложения пластика",
        application: "Используется для производства топлива",
        conclusion: "Одобрено. Экспертное заключение №123 от 01.01.2023",
        fkkoCodes:["11101100000"]
    },
    {
        id:2,
        name: "Технология переработки стекла",
        purpose: "Обезвреживание стеклянных отходов",
        description: "Дробление и переработка стекла",
        application: "Используется для дорожного строительства",
        conclusion: "Одобрено. Экспертное заключение №456 от 02.02.2023",
        fkkoCodes:["11101100000","11101100043","11101100052"]

    },
    {
        id:3,
        name: "Технология переработки тухлых овощей",
        purpose: "Обезвреживание стеклянных отходов",
        description: "Дробление и переработка овощей",
        application: "Используется для дорожного строительства",
        conclusion: "Одобрено. Экспертное заключение №456 от 02.02.2023",
        fkkoCodes:["11101100000","11101100043","11101100031"]
    },
    {
        
        name: "Технология переработки листьев",
        purpose: "Обезвреживание стеклянных отходов",
        description: "Дробление и переработка листьев",
        application: "Используется для дорожного строительства",
        conclusion: "Одобрено. Экспертное заключение №456 от 02.02.2023",
        fkkoCodes:["11101100000","11101100417","11101100223"]
      },

];

  

async function fetchTableData(page = 1, search = "") {
    const filteredData = testData.filter((item) => {
        return item.fkkoCodes.some((code) =>
            code.toLowerCase().includes(search.toLowerCase())
        );
    })

    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;

    return {
        data: filteredData.slice(startIndex, startIndex + itemsPerPage),
        total: filteredData.length,
    }
}

export default fetchTableData;