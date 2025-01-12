import React, { useState } from "react";
import Select from "react-select";
import fetchFkkos from "../../api/FkkoApi";
import "./WasteProducersForm.css";

function WasteProducersForm() {
  const [formData, setFormData] = useState({
    location: "",
    name: "",
    fkko: { code: "", name: "" },
    hazardClass: "",
  });

  const [errors, setErrors] = useState({});

  const api_url = "http://localhost:8080/producer"; //Указать путь к API

  // Преобразование данных ФККО в формат для Select
  const fkkoOptions = fetchFkkos().map((item) => ({
    value: {
        name: item.name,
        code: item.code,
    },
    label: `${item.code} - ${item.name}`,
}));

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

    if (!formData.location.trim()) {
      newErrors.location = "Муниципальное образование обязательно.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Название организации обязательно.";
    }

    if (!formData.fkko.code) {
      newErrors.fkko = "Выберите код ФККО.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Submitted Data:", formData);
      try {
        const response = await fetch(api_url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok){
          throw new Error('Ошибка при отправке данных');
        }

        console.log('Ответ сервера: ', response.status);

        alert('Данные успешно отправлены');
      } catch(error) {
        console.error('Ошибка: ', error);
        alert('Ошибка при отправке данных. Проверьте соединение с сервером')
      }
    }
  };

  return (
    <div className="producers-form">
      <div className="info-block">
        <h1>Форма для ввода данных об организациях</h1>
        <p>
          Эта форма предназначена для внесения данных о муниципальных образованиях, организациях, производящих отходы, а также информации о коде ФККО и классе опасности.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="location">Муниципальное образование</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Название организации</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="fkko">Код ФККО</label>
          <Select
            options={fkkoOptions}
            onChange={handleFkkoChange}
            placeholder="Выберите код ФККО"
            isSearchable
          />
          {errors.fkko && <span className="error">{errors.fkko}</span>}
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

        <button type="submit" className="submit-button">Отправить</button>
      </form>
    </div>
  );
}

export default WasteProducersForm;
