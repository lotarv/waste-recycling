// ✅ Обновлённый StatisticsView.jsx с фильтрацией по технологии и дополнительными блоками статистики
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Select from "react-select";
import "./StatisticsView.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const allRegions = [
  "Республика Бурятия", "Карачаево-Черкесская Республика", "Сахалинская область", "Воронежская область",
  "Томская область", "Новосибирская область", "Ненецкий автономный округ", "Магаданская область",
  "Камчатский край", "Приморский край", "Ставропольский край", "Алтайский край", "Москва", "Республика Тыва",
  "Тамбовская область", "Свердловская область", "Ханты-Мансийский автономный округ - Югра", "Чукотский автономный округ",
  "Тюменская область", "Владимирская область", "Московская область", "Волгоградская область", "Оренбургская область",
  "Самарская область", "Астраханская область", "Республика Адыгея", "Республика Калмыкия", "Краснодарский край",
  "Ростовская область", "Мурманская область", "Псковская область", "Санкт-Петербург", "Ленинградская область",
  "Республика Мордовия", "Республика Татарстан", "Кировская область", "Костромская область", "Тверская область",
  "Тульская область", "Калужская область", "Ульяновская область", "Республика Марий Эл", "Смоленская область",
  "Пермский край", "Ивановская область", "Чувашская Республика", "Республика Северная Осетия - Алания",
  "Брянская область", "Пензенская область", "Белгородская область", "Липецкая область", "Новгородская область",
  "Архангельская область", "Нижегородская область", "Курганская область", "Курская область", "Забайкальский край",
  "Республика Алтай", "Рязанская область", "Ямало-Ненецкий автономный округ", "Красноярский край",
  "Республика Саха (Якутия)", "Республика Дагестан", "Омская область", "Республика Коми", "Чеченская Республика",
  "Кабардино-Балкарская Республика", "Саратовская область", "Калининградская область", "Орловская область",
  "Республика Карелия", "Иркутская область", "Амурская область", "Еврейская автономная область", "Хабаровский край",
  "Кемеровская область", "Республика Хакасия", "Ярославская область", "Удмуртская Республика",
  "Вологодская область", "Республика Ингушетия", "Челябинская область", "Республика Башкортостан"
];

const mockImplementersByRegion = {};

["Переработка бумаги", "Переработка пластика", "Переработка стекла"].forEach((tech) => {
  mockImplementersByRegion[tech] = {};
  allRegions.forEach((region) => {
    mockImplementersByRegion[tech][region] = Math.floor(Math.random() * 7); // 0–6 реализаторов
  });
});

const regionNameMapping = {};

const technologyOptions = Object.keys(mockImplementersByRegion).map((tech) => ({
  value: tech,
  label: tech,
}));

const missingTechnologiesByRegion = [
  { region: "Республика Алтай", missing: ["Переработка электроники", "Переработка батареек"] },
  { region: "Республика Тыва", missing: ["Переработка пластика", "Переработка стекла"] },
  { region: "Магаданская область", missing: ["Переработка бумаги"] },
  { region: "Чукотский автономный округ", missing: ["Переработка шин"] },
  { region: "Камчатский край", missing: ["Переработка органических отходов"] },
];

function StatisticsView() {
  const [selectedTech, setSelectedTech] = useState(technologyOptions[0]);

  const pieData = {
    labels: ["Перерабатываемые отходы", "Неперерабатываемые отходы"],
    datasets: [
      {
        data: [30, 70],
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

  const regionColors = Object.entries(mockImplementersByRegion[selectedTech.value]).reduce((acc, [region, count]) => {
    if (count <= 1) acc[region] = "#FF6B6B";
    else if (count <= 3) acc[region] = "#FFD166";
    else acc[region] = "#4BC0C0";
    return acc;
  }, {});

  return (
    <div className="statistics-view">
      <h1>Статистика по переработке отходов в России</h1>
      <p>Анализ доступности технологий переработки по регионам РФ.</p>

      <div className="card">
        <h2>Выберите технологию переработки</h2>
        <Select
          options={technologyOptions}
          value={selectedTech}
          onChange={setSelectedTech}
          placeholder="Выберите технологию"
        />

        <h3>Карта реализаторов по регионам</h3>
        <div className="map-container">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 200, center: [100, 60] }}
            height={400}
          >
            <Geographies geography="/russia.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const region = geo.properties.name;
                  const displayRegion = regionNameMapping[region] || region;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={regionColors[displayRegion] || "#E5E7EB"}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#93C5FD", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        <p className="map-legend">Красным — 0–1 реализатор, жёлтым — 2–3, зелёным — более 3.</p>
      </div>

      <div className="card">
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

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
              {missingTechnologiesByRegion.map((item, index) => (
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
