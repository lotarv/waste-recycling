import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { loadFkkoOptions } from "../../api/FkkoApi";
import "./WasteProducersForm.css";

function WasteProducersForm({ setAuth }) {
  const [formData, setFormData] = useState({
    location: "",
    name: "",
    fkko: { code: "", name: "" },
    hazardClass: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFkkoChange = (selectedOption) => {
    const hazardClass = selectedOption ? selectedOption.value.code.slice(-1) : "";
    setFormData({
      ...formData,
      fkko: selectedOption ? selectedOption.value : { code: "", name: "" },
      hazardClass,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = "Муниципальное образование обязательно.";
    if (!formData.name.trim()) newErrors.name = "Название организации обязательно.";
    if (!formData.fkko.code) newErrors.fkko = "Выберите код ФККО.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Обновляем глобальный auth с ролью producer
      setAuth((prev) => {
        const updated = {
          ...prev,
          role: "producer",
          producerData: formData,
        };
        localStorage.setItem("auth", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <div className="producers-form">
      <div className="info-block">
        <h1>Стать производителем отходов</h1>
        <p>Заполните форму ниже для регистрации в качестве производителя.</p>
      </div>
      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="location">Муниципальное образование</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Название организации</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="fkko">Код ФККО</label>
          <AsyncSelect
            cacheOptions
            loadOptions={loadFkkoOptions}
            onChange={handleFkkoChange}
            placeholder="Выберите код ФККО"
            isSearchable
          />
          {errors.fkko && <span className="error">{errors.fkko}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hazardClass">Класс опасности</label>
          <input type="text" id="hazardClass" name="hazardClass" value={formData.hazardClass} readOnly />
        </div>

        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default WasteProducersForm;