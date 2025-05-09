import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./StatisticsView.css";

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Замоканные данные
const mockData = {
  regionsWithFewestImplementers: [
    { region: "Республика Бурятия", implementers: 2 },
    { region: "Карачаево-Черкесская Республика", implementers: 3 },
    { region: "Сахалинская область", implementers: 4 },
    { region: "Воронежская область", implementers: 5 },
    { region: "Томская область", implementers: 6 },
    { region: "Новосибирская область", implementers: 2 },
    { region: "Ненецкий автономный округ", implementers: 3 },
    { region: "Магаданская область", implementers: 4 },
    { region: "Камчатский край", implementers: 5 },
    { region: "Приморский край", implementers: 6 },
    { region: "Ставропольский край", implementers: 2 },
    { region: "Алтайский край", implementers: 3 },
    { region: "Москва", implementers: 4 },
    { region: "Республика Тыва", implementers: 2 },
    { region: "Тамбовская область", implementers: 5 },
    { region: "Свердловская область", implementers: 6 },
    { region: "Ханты-Мансийский автономный округ - Югра", implementers: 2 },
    { region: "Чукотский автономный округ", implementers: 3 },
    { region: "Тюменская область", implementers: 4 },
    { region: "Владимирская область", implementers: 5 },
    { region: "Московская область", implementers: 6 },
    { region: "Волгоградская область", implementers: 2 },
    { region: "Оренбургская область", implementers: 3 },
    { region: "Самарская область", implementers: 4 },
    { region: "Астраханская область", implementers: 5 },
    { region: "Республика Адыгея", implementers: 6 },
    { region: "Республика Калмыкия", implementers: 2 },
    { region: "Краснодарский край", implementers: 3 },
    { region: "Ростовская область", implementers: 4 },
    { region: "Мурманская область", implementers: 5 },
    { region: "Псковская область", implementers: 6 },
    { region: "Санкт-Петербург", implementers: 2 },
    { region: "Ленинградская область", implementers: 3 },
    { region: "Республика Мордовия", implementers: 4 },
    { region: "Республика Татарстан", implementers: 5 },
    { region: "Кировская область", implementers: 6 },
    { region: "Костромская область", implementers: 2 },
    { region: "Тверская область", implementers: 3 },
    { region: "Тульская область", implementers: 4 },
    { region: "Калужская область", implementers: 5 },
    { region: "Ульяновская область", implementers: 6 },
    { region: "Республика Марий Эл", implementers: 2 },
    { region: "Смоленская область", implementers: 3 },
    { region: "Пермский край", implementers: 4 },
    { region: "Ивановская область", implementers: 5 },
    { region: "Чувашская Республика", implementers: 6 },
    { region: "Республика Северная Осетия - Алания", implementers: 2 },
    { region: "Брянская область", implementers: 3 },
    { region: "Пензенская область", implementers: 4 },
    { region: "Белгородская область", implementers: 5 },
    { region: "Липецкая область", implementers: 6 },
    { region: "Новгородская область", implementers: 2 },
    { region: "Архангельская область", implementers: 3 },
    { region: "Нижегородская область", implementers: 4 },
    { region: "Курганская область", implementers: 5 },
    { region: "Курская область", implementers: 6 },
    { region: "Забайкальский край", implementers: 2 },
    { region: "Республика Алтай", implementers: 3 },
    { region: "Рязанская область", implementers: 4 },
    { region: "Ямало-Ненецкий автономный округ", implementers: 5 },
    { region: "Красноярский край", implementers: 6 },
    { region: "Республика Саха (Якутия)", implementers: 2 },
    { region: "Республика Дагестан", implementers: 3 },
    { region: "Омская область", implementers: 4 },
    { region: "Республика Коми", implementers: 5 },
    { region: "Чеченская Республика", implementers: 6 },
    { region: "Кабардино-Балкарская Республика", implementers: 2 },
    { region: "Саратовская область", implementers: 3 },
    { region: "Калининградская область", implementers: 4 },
    { region: "Орловская область", implementers: 5 },
    { region: "Республика Карелия", implementers: 6 },
    { region: "Иркутская область", implementers: 2 },
    { region: "Амурская область", implementers: 3 },
    { region: "Еврейская автономная область", implementers: 4 },
    { region: "Хабаровский край", implementers: 5 },
    { region: "Кемеровская область", implementers: 6 },
    { region: "Республика Хакасия", implementers: 2 },
    { region: "Ярославская область", implementers: 3 },
    { region: "Удмуртская Республика", implementers: 4 },
    { region: "Вологодская область", implementers: 5 },
    { region: "Республика Ингушетия", implementers: 6 },
    { region: "Челябинская область", implementers: 2 },
    { region: "Республика Башкортостан", implementers: 3 },
  ],
  recyclableWastePercentage: {
    recyclable: 30,
    nonRecyclable: 70,
  },
  missingTechnologiesByRegion: [
    { region: "Республика Алтай", missing: ["Переработка электроники", "Переработка батареек"] },
    { region: "Республика Тыва", missing: ["Переработка пластика", "Переработка стекла"] },
    { region: "Магаданская область", missing: ["Переработка бумаги"] },
    { region: "Чукотский автономный округ", missing: ["Переработка шин"] },
    { region: "Камчатский край", missing: ["Переработка органических отходов"] },
  ],
};

// Маппинг имен регионов
const regionNameMapping = {
  "Бурятия": "Республика Бурятия",
  "Карачаево-Черкесская республика": "Карачаево-Черкесская Республика",
  "Сахалинская область": "Сахалинская область",
  "Воронежская область": "Воронежская область",
  "Томская область": "Томская область",
  "Новосибирская область": "Новосибирская область",
  "Ненецкий автономный округ": "Ненецкий автономный округ",
  "Магаданская область": "Магаданская область",
  "Камчатский край": "Камчатский край",
  "Приморский край": "Приморский край",
  "Ставропольский край": "Ставропольский край",
  "Алтайский край": "Алтайский край",
  "Москва": "Москва",
  "Тыва": "Республика Тыва",
  "Тамбовская область": "Тамбовская область",
  "Свердловская область": "Свердловская область",
  "Ханты-Мансийский автономный округ - Югра": "Ханты-Мансийский автономный округ - Югра",
  "Чукотский автономный округ": "Чукотский автономный округ",
  "Тюменская область": "Тюменская область",
  "Владимирская область": "Владимирская область",
  "Московская область": "Московская область",
  "Волгоградская область": "Волгоградская область",
  "Оренбургская область": "Оренбургская область",
  "Самарская область": "Самарская область",
  "Астраханская область": "Астраханская область",
  "Адыгея": "Республика Адыгея",
  "Республика Калмыкия": "Республика Калмыкия",
  "Краснодарский край": "Краснодарский край",
  "Ростовская область": "Ростовская область",
  "Мурманская область": "Мурманская область",
  "Псковская область": "Псковская область",
  "Санкт-Петербург": "Санкт-Петербург",
  "Ленинградская область": "Ленинградская область",
  "Республика Мордовия": "Республика Мордовия",
  "Татарстан": "Республика Татарстан",
  "Кировская область": "Кировская область",
  "Костромская область": "Костромская область",
  "Тверская область": "Тверская область",
  "Тульская область": "Тульская область",
  "Калужская область": "Калужская область",
  "Ульяновская область": "Ульяновская область",
  "Марий Эл": "Республика Марий Эл",
  "Смоленская область": "Смоленская область",
  "Пермский край": "Пермский край",
  "Ивановская область": "Ивановская область",
  "Чувашия": "Чувашская Республика",
  "Северная Осетия - Алания": "Республика Северная Осетия - Алания",
  "Брянская область": "Брянская область",
  "Пензенская область": "Пензенская область",
  "Белгородская область": "Белгородская область",
  "Липецкая область": "Липецкая область",
  "Новгородская область": "Новгородская область",
  "Архангельская область": "Архангельская область",
  "Нижегородская область": "Нижегородская область",
  "Курганская область": "Курганская область",
  "Курская область": "Курская область",
  "Забайкальский край": "Забайкальский край",
  "Алтай": "Республика Алтай",
  "Рязанская область": "Рязанская область",
  "Ямало-Ненецкий автономный округ": "Ямало-Ненецкий автономный округ",
  "Красноярский край": "Красноярский край",
  "Республика Саха (Якутия)": "Республика Саха (Якутия)",
  "Дагестан": "Республика Дагестан",
  "Омская область": "Омская область",
  "Республика Коми": "Республика Коми",
  "Чеченская республика": "Чеченская Республика",
  "Кабардино-Балкарская республика": "Кабардино-Балкарская Республика",
  "Саратовская область": "Саратовская область",
  "Калининградская область": "Калининградская область",
  "Орловская область": "Орловская область",
  "Республика Карелия": "Республика Карелия",
  "Иркутская область": "Иркутская область",
  "Амурская область": "Амурская область",
  "Еврейская автономная область": "Еврейская автономная область",
  "Хабаровский край": "Хабаровский край",
  "Кемеровская область": "Кемеровская область",
  "Республика Хакасия": "Республика Хакасия",
  "Ярославская область": "Ярославская область",
  "Удмуртская республика": "Удмуртская Республика",
  "Вологодская область": "Вологодская область",
  "Ингушетия": "Республика Ингушетия",
  "Челябинская область": "Челябинская область",
  "Башкортостан": "Республика Башкортостан",
};

function StatisticsView() {
  // Данные для круговой диаграммы
  const pieData = {
    labels: ["Перерабатываемые отходы", "Неперерабатываемые отходы"],
    datasets: [
      {
        data: [mockData.recyclableWastePercentage.recyclable, mockData.recyclableWastePercentage.nonRecyclable],
        backgroundColor: ["#4BC0C0", "#FF6B6B"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Доля перерабатываемых отходов в России" },
    },
  };

  // Маппинг регионов для карты
  const regionColors = mockData.regionsWithFewestImplementers.reduce((acc, { region, implementers }) => {
    if (implementers <= 3) {
      acc[region] = "#FF6B6B"; // Красный для 1-3 реализаторов
    } else if (implementers <= 5) {
      acc[region] = "#FFD166"; // Желтый для 4-5 реализаторов
    } else {
      acc[region] = "#4BC0C0"; // Зеленый для 6 и более реализаторов
    }
    return acc;
  }, {});

  return (
    <div className="statistics-view">
      <h1>Статистика по переработке отходов в России</h1>
      <p>Анализ данных о технологиях переработки отходов, их распространенности и потенциале в регионах РФ.</p>

      {/* Карта РФ */}
      <div className="card">
        <h2>Регионы с наименьшим числом реализаторов технологий</h2>
        <div className="map-container">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 200,
              center: [100, 60], // Центр карты для России
            }}
            height={400}
          >
            <Geographies geography="/russia.json">
              {({ geographies }) => {
                // Вывод имен регионов для отладки
                console.log(
                  "Регионы в GeoJSON:",
                  geographies.map((geo) => geo.properties.name)
                );
                return geographies.map((geo) => {
                  const regionName = regionNameMapping[geo.properties.name] || geo.properties.name;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={regionColors[regionName] || "#E5E7EB"}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#93C5FD", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ComposableMap>
        </div>
        <p className="map-legend">Красным отмечены регионы с 1-3 реализаторами, желтым — с 4-5, зеленым — с 6 и более.</p>
      </div>

      {/* Круговая диаграмма */}
      <div className="card">
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Недостающие технологии */}
      <div className="card">
        <h2>Регионы с недостающими технологиями переработки</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Регион</th>
                <th>Недостающие технологии</th>
              </tr>
            </thead>
            <tbody>
              {mockData.missingTechnologiesByRegion.map((item, index) => (
                <tr key={index}>
                  <td>{item.region}</td>
                  <td>{item.missing.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StatisticsView;