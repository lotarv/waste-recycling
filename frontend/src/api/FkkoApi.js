// const fkkos = [
//     {
//         name: "Пестициды на основе хлорорганических соединений в смеси, содержащие грунт и остатки упаковки",
//         code: "11412881711"
//     },
//     {
//         name: "Отходы средств защиты растений неустановленного состава в смеси, содержащие грунт и остатки упаковки",
//         code: "11412891711"
//     },
//     {
//         name: "Отходы чернил при изготовлении печатной продукции методом ультрафиолетовой печати",
//         code: "30712121301"
//     },
//     {
//         name: "Насадки графитовые электролизеров, отработанные в производстве хлора и каустика ртутным методом",
//         code: "31215241511"
//     },
//     {
//         name: "Ткань полипропиленовая, отработанная при очистке едкого натра от ртути в производстве хлора и каустика ртутным методом",
//         code: "31215242611"
//     },
//     {
//         name: "Смесь осадков механической и физико-химической очистки сточных вод производства хлора и каустика ртутным методом",
//         code: "31215271391"
//     },
//     {
//         name: "Уголь активированный, загрязненный ртутью при очистке сточных вод производства хлора и каустика ртутным методом",
//         code: "31215272201"
//     },
    
// ]

// export default function fetchFkkos(filter=null){
//     // // if (filter.length < 5) return;
//     // const filteredData = fkkos.filter((item) => {
//     //     item.name.toLowerCase().includes(filter.toLowerCase) ||
//     //     item.code.includes(filter)
//     // })

//     return fkkos;
// }


export async function loadFkkoOptions(inputValue){
    if (!inputValue || inputValue.length < 3) return [];
    const apiUrl = `http://localhost:8080/fkkos?filter=${encodeURIComponent(inputValue)}`
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }
        const result = await response.json(); // Ожидаем массив объектов с `name` и `code`
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