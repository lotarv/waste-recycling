import React, { useState } from "react";
import Select from "react-select";
import fkkoData from "../../data/fkkoData";
import purposes from "../../data/purposes";

function TechnologyForm() {
    const [formData, setFormData] = useState({
        name: "",
        purpose: { id: "" },
        description: "",
        resources: { energy: "", water: "", disposal: "" },
        waste_to_recycle: [{ fkkoID: "" }],
        secondaryWasteOkpd: [{ okpdID: "" }],
        productivity: "",
        secondaryWaste: [{ mass: "", volume: "", fkkoID: "" }],
        developerInfo: { id: "", address: "", phone: "", site: "" },
        userInfo: [{ id: "", address: "", phone: "", site: "" }],
        conclusion: { authorityName: "", date: "", conclusion: "" },
    });

    const [errors, setErrors] = useState({});

    // Опции для Select
    const fkkoOptions = fkkoData.map((item) => ({
        value: item.fkkoCode,
        label: `${item.fkkoCode} - ${item.fkkoName}`,
    }));
    const purposeOptions = purposes.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    // Обработчики изменений
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
    const handleNestedChange = (index, key, value, field) => {
        const updatedNested = [...formData[key]];
        updatedNested[index][field] = value;
        setFormData({ ...formData, [key]: updatedNested });
    };

    const handleFkkoChange = (selectedOption, index, key) => {
        const updatedWaste = [...formData[key]];
        updatedWaste[index].fkkoID = selectedOption.value;
        setFormData({ ...formData, [key]: updatedWaste });
    };

    const addElement = (key, newElement) => {
        setFormData({ ...formData, [key]: [...formData[key], newElement] });
    };

    const removeElement = (key, index) => {
        const updated = formData[key].filter((_, i) => i !== index);
        setFormData({ ...formData, [key]: updated });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Название технологии обязательно";
        if (!formData.purpose.id) newErrors.purpose = "Цель обязательна";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log("Отправка данных:", formData);
    };

    return (
        <div className="technologies-form">
            <div className="info-block">
                <h1>Форма для ввода данных о технологиях переработки отходов</h1>
                <p>
                    Эта форма позволяет добавлять или редактировать информацию о технологиях переработки отходов.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="technology-form">
                {/* Название технологии */}
                <div className="form-group">
                    <label>Название технологии</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                {/* Цель */}
                <div className="form-group">
                    <label>Цель технологии</label>
                    <Select
                        options={purposeOptions}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, purpose: { id: selectedOption.value } })
                        }
                        placeholder="Выберите цель"
                    />
                    {errors.purpose && <span className="error">{errors.purpose}</span>}
                </div>

                {/* Отходы для переработки */}
                <div className="form-group">
                    <label>Отходы для переработки</label>
                    {formData.waste_to_recycle.map((_, index) => (
                        <div key={index} className="nested-group">
                            <Select
                                options={fkkoOptions}
                                onChange={(selectedOption) =>
                                    handleFkkoChange(selectedOption, index, "waste_to_recycle")
                                }
                                placeholder="Выберите код ФККО"
                                isSearchable
                            />
                            <button
                                type="button"
                                onClick={() => removeElement("waste_to_recycle", index)}
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            addElement("waste_to_recycle", { fkkoID: "" })
                        }
                    >
                        Добавить отход
                    </button>
                </div>

                {/* Ресурсы */}
                <div className="form-group">
                    <label>Ресурсы</label>
                    <input
                        type="number"
                        placeholder="Энергия"
                        name="resources.energy"
                        value={formData.resources.energy}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Вода"
                        name="resources.water"
                        value={formData.resources.water}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Обезвреживание"
                        name="resources.disposal"
                        value={formData.resources.disposal}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productivity">Производительность (тонн/год)</label>
                    <input
                        type="number"
                        id="productivity"
                        name="productivity"
                        value={formData.productivity}
                        onChange={handleChange}

                    />
                    {errors.productivity && <span className="error">{errors.productivity}</span>}
                </div>
                {/* Информация о разработчике */}
                <div className="form-group">
                    <label>Информация о разработчике</label>
                    <input
                        type="text"
                        name="developerInfo.address"
                        placeholder="Адрес"
                        value={formData.developerInfo.address}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="developerInfo.phone"
                        placeholder="Телефон"
                        value={formData.developerInfo.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="developerInfo.site"
                        placeholder="Сайт"
                        value={formData.developerInfo.site}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default TechnologyForm;
