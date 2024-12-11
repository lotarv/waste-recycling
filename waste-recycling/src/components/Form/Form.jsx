import React, { useState } from "react";
import "./Form.css";

function TechnologyForm() {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    description: "",
    resources: { energy: "", water: "", disposal: "" },
    waste_to_recycle: [{ fkkoCode: "", fkkoName: "" }],
    secondaryWasteOkpd: [{ okpdCode: "", okpdName: "" }],
    productivity: "",
    secondaryWaste: [{ mass: "", volume: "", fkkoCode: "", fkkoName: "" }],
    developerInfo: { adress: "", phone: "", site: "" },
    userInfo: { adress: "", phone: "", site: "" },
    conclusion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({
        ...formData,
        [keys[0]]: { ...formData[keys[0]], [keys[1]]: value },
      });
    }
  };

  const handleNestedChange = (index, field, value, key) => {
    const updatedNestedData = [...formData[key]];
    updatedNestedData[index][field] = value;
    setFormData({ ...formData, [key]: updatedNestedData });
  };

  const addElement = (key, newElement) => {
    setFormData({ ...formData, [key]: [...formData[key], newElement] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка данных:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="technology-form">
      <div className="form-group">
        <label htmlFor="name">Название технологии</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="purpose">Цель</label>
        <input
          type="text"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Ресурсы</label>
        <div className="nested-group">
          <label>
            Энергия:
            <input
              type="number"
              name="resources.energy"
              value={formData.resources.energy}
              onChange={handleChange}
            />
          </label>
          <label>
            Вода:
            <input
              type="number"
              name="resources.water"
              value={formData.resources.water}
              onChange={handleChange}
            />
          </label>
          <label>
            Утилизация:
            <input
              type="number"
              name="resources.disposal"
              value={formData.resources.disposal}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Отходы для переработки</label>
        {formData.waste_to_recycle.map((item, index) => (
          <div key={index} className="nested-group">
            <input
              type="text"
              placeholder="Код ФККО"
              value={item.fkkoCode}
              onChange={(e) =>
                handleNestedChange(index, "fkkoCode", e.target.value, "waste_to_recycle")
              }
            />
            <input
              type="text"
              placeholder="Название отхода"
              value={item.fkkoName}
              onChange={(e) =>
                handleNestedChange(index, "fkkoName", e.target.value, "waste_to_recycle")
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addElement("waste_to_recycle", { fkkoCode: "", fkkoName: "" })
          }
        >
          Добавить отход
        </button>
      </div>

      <div className="form-group">
        <label>Продукты переработки (ОКПД)</label>
        {formData.secondaryWasteOkpd.map((item, index) => (
          <div key={index} className="nested-group">
            <input
              type="text"
              placeholder="Код ОКПД"
              value={item.okpdCode}
              onChange={(e) =>
                handleNestedChange(index, "okpdCode", e.target.value, "secondaryWasteOkpd")
              }
            />
            <input
              type="text"
              placeholder="Название"
              value={item.okpdName}
              onChange={(e) =>
                handleNestedChange(index, "okpdName", e.target.value, "secondaryWasteOkpd")
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addElement("secondaryWasteOkpd", { okpdCode: "", okpdName: "" })
          }
        >
          Добавить продукт
        </button>
      </div>


      <div className="form-group">
        <label>Заключение</label>
        <textarea
          id="conclusion"
          name="conclusion"
          value={formData.conclusion}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Отправить
      </button>
    </form>
  );
}

export default TechnologyForm;
