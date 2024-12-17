import React, { useState } from "react";
import "./TechnologyForm.css";

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

    const [errors, setErrors] = useState({});

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

    const removeElement = (key, index) => {
        const updatedNestedData = formData[key].filter((_, i) => i !== index);
        setFormData({ ...formData, [key]: updatedNestedData });
    };

    const validateForm = () => {
        const newErrors = {};

        // Основные поля
        if (!formData.name) newErrors.name = "Название технологии обязательно";
        if (!formData.purpose) newErrors.purpose = "Цель обязательна";
        if (!formData.description) newErrors.description = "Описание обязательно";
        if (!formData.productivity || isNaN(formData.productivity))
            newErrors.productivity = "Укажите корректную производительность";

        // Валидация разработчиков
        if (!formData.developerInfo.adress)
            newErrors["developerInfo.adress"] = "Адрес разработчика обязателен";
        if (!/^(\+7|8)\d{10}$/.test(formData.developerInfo.phone))
            newErrors["developerInfo.phone"] = "Некорректный номер телефона разработчика";

        // Валидация потребителей
        if (!formData.userInfo.adress)
            newErrors["userInfo.adress"] = "Адрес потребителя обязателен";
        if (!/^(\+7|8)\d{10}$/.test(formData.userInfo.phone))
            newErrors["userInfo.phone"] = "Некорректный номер телефона потребителя";

        // Валидация кода ФККО
        formData.waste_to_recycle.forEach((item, index) => {
            if (!/^\d{10}[0-5]$/.test(item.fkkoCode)) {
                newErrors[`waste_to_recycle_${index}_fkkoCode`] =
                    "Код ФККО должен быть из 11 символов, последний символ — число от 0 до 5";
            }
        });

        formData.secondaryWaste.forEach((item, index) => {
            if (!/^\d{10}[0-5]$/.test(item.fkkoCode)) {
                newErrors[`secondaryWaste_${index}_fkkoCode`] =
                    "Код ФККО должен быть из 11 символов, последний символ — число от 0 до 5";
            }
        });

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
                    Эта форма позволяет добавлять или редактировать информацию о технологиях переработки отходов, включая данные о ресурсах, перерабатываемых отходах, продуктах переработки и разработчиках технологии.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="technology-form">
                <div className="form-group">
                    <label htmlFor="name">Название технологии</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}

                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="purpose">Цель</label>
                    <input
                        type="text"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}

                    />
                    {errors.purpose && <span className="error">{errors.purpose}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}

                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>
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
                            {errors[`waste_to_recycle_${index}_fkkoCode`] && (
                                <span className="error">
                                    {errors[`waste_to_recycle_${index}_fkkoCode`]}
                                </span>
                            )}
                            <input
                                type="text"
                                placeholder="Название отхода"
                                value={item.fkkoName}
                                onChange={(e) =>
                                    handleNestedChange(index, "fkkoName", e.target.value, "waste_to_recycle")
                                }
                            />
                            <button type="button" onClick={() => removeElement("waste_to_recycle", index)}>
                                Удалить
                            </button>
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
                            <button type="button" onClick={() => removeElement("secondaryWasteOkpd", index)}>
                                Удалить
                            </button>
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
                    <label>Масса, наименование и код по ФККО вторичных отходов, образующихся за год</label>
                    {formData.secondaryWaste.map((item, index) => (
                        <div key={index} className="nested-group">
                            <input
                                type="text"
                                placeholder="Масса"
                                value={item.mass}
                                onChange={(e) =>
                                    handleNestedChange(index, "mass", e.target.value, "secondaryWaste")
                                }
                            />
                            <input
                                type="text"
                                placeholder="Объем"
                                value={item.volume}
                                onChange={(e) =>
                                    handleNestedChange(index, "volume", e.target.value, "secondaryWaste")
                                }
                            />
                            <input
                                type="text"
                                placeholder="код ФККО"
                                value={item.fkkoCode}
                                onChange={(e) =>
                                    handleNestedChange(index, "fkkoCode", e.target.value, "secondaryWaste")
                                }
                            />
                            <input
                                type="text"
                                placeholder="Наименование по ФККО"
                                value={item.fkkoName}
                                onChange={(e) =>
                                    handleNestedChange(index, "fkkoName", e.target.value, "secondaryWaste")
                                }
                            />
                            <button type="button" onClick={() => removeElement("secondaryWaste", index)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            addElement("secondaryWaste", { mass: "", volume: "", fkkoCode: "", fkkoName: "" })
                        }
                    >
                        Добавить вторичный отход
                    </button>
                </div>
                <div className="form-group">
                    <label>Информация о разработчике</label>
                    <input
                        type="text"
                        name="developerInfo.adress"
                        placeholder="Адрес"
                        value={formData.developerInfo.adress}
                        onChange={handleChange}

                    />
                    {errors["developerInfo.adress"] && (
                        <span className="error">{errors["developerInfo.adress"]}</span>
                    )}
                    <input
                        type="text"
                        name="developerInfo.phone"
                        placeholder="Телефон"
                        value={formData.developerInfo.phone}
                        onChange={handleChange}

                    />
                    {errors["developerInfo.phone"] && (
                        <span className="error">{errors["developerInfo.phone"]}</span>
                    )}
                    <input
                        type="url"
                        name="developerInfo.site"
                        placeholder="Сайт"
                        value={formData.developerInfo.site}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Информация о потребителе</label>
                    <input
                        type="text"
                        name="userInfo.adress"
                        placeholder="Адрес"
                        value={formData.userInfo.adress}
                        onChange={handleChange}

                    />
                    {errors["userInfo.adress"] && (
                        <span className="error">{errors["userInfo.adress"]}</span>
                    )}
                    <input
                        type="text"
                        name="userInfo.phone"
                        placeholder="Телефон"
                        value={formData.userInfo.phone}
                        onChange={handleChange}

                    />
                    {errors["userInfo.phone"] && (
                        <span className="error">{errors["userInfo.phone"]}</span>
                    )}
                    <input
                        type="url"
                        name="userInfo.site"
                        placeholder="Сайт"
                        value={formData.userInfo.site}
                        onChange={handleChange}
                    />
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
        </div>
    );
}

export default TechnologyForm;