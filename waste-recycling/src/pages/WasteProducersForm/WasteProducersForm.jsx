import React, { useState } from "react";
import "./WasteProducersForm.css";

function WasteProducersForm() {
  const [formData, setFormData] = useState({
    municipality: "",
    fkkoCode: "",
    wasteTypes: [{ type: "" }],
    hazardClass: "",
    organization: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fkkoCode") {
      // Автоматически вычисляем класс опасности
      const hazardClass = value ? value.slice(-1) : "";
      setFormData({ ...formData, [name]: value, hazardClass });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleWasteTypeChange = (index, value) => {
    const updatedWasteTypes = [...formData.wasteTypes];
    updatedWasteTypes[index].type = value;
    setFormData({ ...formData, wasteTypes: updatedWasteTypes });
  };

  const addWasteType = () => {
    setFormData({ ...formData, wasteTypes: [...formData.wasteTypes, { type: "" }] });
  };

  const removeWasteType = (index) => {
    const updatedWasteTypes = formData.wasteTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, wasteTypes: updatedWasteTypes });
  };

  const validateForm = () => {
    const newErrors = {};

    // Валидация кода ФККО
    if (!/^\d{10}[0-5]$/.test(formData.fkkoCode)) {
      newErrors.fkkoCode = "Код ФККО должен состоять из 11 символов, последний символ — число от 0 до 5.";
    }

    if (!formData.municipality.trim()) {
      newErrors.municipality = "Муниципальное образование обязательно.";
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Название организации обязательно.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", formData);
    }
  };

  return (
    <div className="producers-form">
      <div className="info-block">
        <h1>Форма для ввода данных об организациях</h1>
        <p>
            Эта форма предназначена для внесения данных о муниципальных образованиях, организациях, производящих отходы, а также информации о видах отходов и классе их опасности.
        </p>
    </div>
      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="municipality">Муниципальное образование</label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            required
          />
          {errors.municipality && <span className="error">{errors.municipality}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fkkoCode">Код ФККО</label>
          <input
            type="text"
            id="fkkoCode"
            name="fkkoCode"
            value={formData.fkkoCode}
            onChange={handleChange}
            required
          />
          {errors.fkkoCode && <span className="error">{errors.fkkoCode}</span>}
        </div>
        <div className="form-group">
          <label>Вид отходов</label>
          {formData.wasteTypes.map((waste, index) => (
            <div key={index} className="waste-type-item">
              <input
                type="text"
                placeholder={`Вид отхода #${index + 1}`}
                value={waste.type}
                onChange={(e) => handleWasteTypeChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeWasteType(index)}>
                Удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={addWasteType}>
            Добавить вид отхода
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="hazardClass">Класс опасности</label>
          <input
            type="text"
            id="hazardClass"
            name="hazardClass"
            value={formData.hazardClass}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Организация-производитель отходов</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />
          {errors.organization && <span className="error">{errors.organization}</span>}
        </div>
        <button type="submit" className="submit-button">Отправить</button>
      </form>
    </div>
  );
}

export default WasteProducersForm;
