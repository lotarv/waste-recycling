// const testData = [
//     {"name": "Продукция и услуги сельского хозяйства и охоты", "code": "01"},
//     {"name": "Культуры однолетние", "code": "01.1"},
//     {"name": "Культуры зерновые (кроме риса), зернобобовые, семена масличных культур", "code": "01.11"},
//     {"name": "Пшеница", "code": "01.11.1"},
//     {"name": "Пшеница твердая", "code": "01.11.11"},
//     {"name": "Пшеница озимая твердая", "code": "01.11.11.110"},
//     {"name": "Зерно озимой твердой пшеницы", "code": "01.11.11.111"},
//     {"name": "Семена озимой твердой пшеницы", "code": "01.11.11.112"},
//     {"name": "Пшеница яровая твердая", "code": "01.11.11.120"},
//     {"name": "Зерно яровой твердой пшеницы", "code": "01.11.11.121"},
//     {"name": "Семена яровой твердой пшеницы", "code": "01.11.11.122"},
//     {"name": "Зерноотходы твердой пшеницы", "code": "01.11.11.130"},
//     {"name": "Пшеница, кроме твердой пшеницы", "code": "01.11.12"},
//     {"name": "Пшеница озимая мягкая", "code": "01.11.12.110"},
//     {"name": "Зерно озимой мягкой пшеницы", "code": "01.11.12.111"},
//     {"name": "Семена озимой мягкой пшеницы", "code": "01.11.12.112"},
//     {"name": "Пшеница яровая мягкая", "code": "01.11.12.120"},
//     {"name": "Зерно яровой мягкой пшеницы", "code": "01.11.12.121"},
//     {"name": "Семена яровой мягкой пшеницы", "code": "01.11.12.122"},
//     {"name": "Зерноотходы мягкой пшеницы", "code": "01.11.12.130"},
//     {"name": "Меслин (смесь пшеницы и ржи)", "code": "01.11.12.140"},
//     {"name": "Зерно меслина", "code": "01.11.12.141"},
//     {"name": "Семена меслина", "code": "01.11.12.142"},
//     {"name": "Зерноотходы меслина", "code": "01.11.12.143"},
//     {"name": "Кукуруза", "code": "01.11.2"}
// ]


// export default function fetchOkpds(){
//     return testData;
// }


export async function loadOkpdOptions(inputValue) {

    if (!inputValue || inputValue.length < 3) return [];

    const apiUrl = `http://localhost:8080/okpds?filter=${encodeURIComponent(inputValue)}`

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }
        const result = await response.json();
        return result.map((item) => ({
            value: {
                name: item.name,
                code: item.code,
            },
            label: `${item.code} - ${item.name}`,
        }));
    } catch (error) {
        console.error("Ошибка загрузки данных:", error.message);
        return [];
    }
};

