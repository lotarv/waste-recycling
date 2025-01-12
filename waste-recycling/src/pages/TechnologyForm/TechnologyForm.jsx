import React, { useState } from "react";
import Select from "react-select";
import assignments from "../../data/assignments";
import "./TechnologyForm.css";
import fetchFkkos from "../../api/FkkoApi";
import fetchOkpds from "../../api/OkpdApi";
function TechnologyForm() {
    const [formData, setFormData] = useState({
        name: "",
        assignment: "",
        description: "",
        resources: { energy: "", water: "", disposal: "" },
        waste_to_recycle: [{ fkkoCode: "", fkkoName: "" }],
        secondaryWasteOkpd: [{ okpdCode: "", okpdName: "" }],
        productivity: "",
        secondaryWaste: [{ mass: "", volume: "", fkkoCode: "", fkkoName: "" }],
        developerInfo: { address: "", phone: "", site: "", fax: "" },
        userInfo: { address: "", phone: "", site: "", fax: "" },
        expertInfo: { conclusion: "", date: "", name: "", number: "" },
        useCase: "",
    });

    const [errors, setErrors] = useState({});

    const api_url = 'http://localhost:8080/technology'; //Добавить путь к API

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
        if (!formData.assignment) newErrors.assignment = "Цель обязательна";
        if (!formData.description) newErrors.description = "Описание обязательно";
        if (!formData.productivity || isNaN(formData.productivity))
            newErrors.productivity = "Укажите корректную производительность";

        // Валидация разработчиков
        if (!formData.developerInfo.address)
            newErrors["developerInfo.address"] = "Адрес разработчика обязателен";
        if (!/^(\+7|8)\d{10}$/.test(formData.developerInfo.phone))
            newErrors["developerInfo.phone"] = "Некорректный номер телефона разработчика";

        // Валидация потребителей
        if (!formData.userInfo.address)
            newErrors["userInfo.address"] = "Адрес потребителя обязателен";
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

    const structureNewJson = (data) => {
        const dataToPost = {
            name: data.name,
            assignment: data.assignment,
            characteristic: data.description,
            resources: { energy: parseFloat(data.resources.energy), water: parseFloat(data.resources.water), usingPerYear: parseFloat(data.resources.disposal) },
            fkko: data.waste_to_recycle.map(item => (
                {
                    name: item.fkkoName,
                    code: item.fkkoCode,
                }
            )),
            okpd: data.secondaryWasteOkpd.map(item => (
                {
                    name: item.okpdName,
                    code: item.okpdCode,
                }
            )),
            performance: parseFloat(data.productivity),
            secondaryWaste: data.secondaryWaste.map(item => (
                {
                    fkko: {
                        name: item.fkkoName,
                        code: item.fkkoCode,
                    },
                    mass: parseFloat(item.mass),
                    volume: parseFloat(item.volume),
                }
            )),
            developer: data.developerInfo,
            users: [data.userInfo],
            useCase: data.useCase,
            expertInfo: { ...data.expertInfo, date: Math.floor(Date.parse(data.expertInfo.date) / 1000) },
        }

        return dataToPost;
    }

    const handleFkkoChange = (selectedOption, index, key) => {
        const updatedWaste = [...formData[key]];
        updatedWaste[index].fkkoCode = selectedOption.value.code; // Обновляем код
        updatedWaste[index].fkkoName = selectedOption.value.name; // Обновляем наименование
        setFormData({ ...formData, [key]: updatedWaste });
    };

    const handleOkpdChange = (selectedOption, index, key) => {
        const updatedWaste = [...formData[key]];
        updatedWaste[index].okpdCode = selectedOption.value.code; // Обновляем код
        updatedWaste[index].okpdName = selectedOption.value.name; // Обновляем наименование
        setFormData({ ...formData, [key]: updatedWaste });
    };


    const handleSubmit = async (e) => {
        console.log("kek")
        e.preventDefault();
        if (validateForm()){
            const json_to_post = structureNewJson(formData);
            console.log("trying to post data: ", json_to_post);
            try {
                const response = await fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json',
                    },
                    body: JSON.stringify(json_to_post),
                })

                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных')
                }

                console.log('Ответ сервера: ', response.status);
                alert("Данные успешно отправлены!");
            } catch(error) {
                console.error("Ошибка:", error);
                alert('Ошибка при отправке данных. Проверьте соединение с сервером')
            }
        }
        
    };

    // Опции для Select
    const assignmentOptions = assignments.map((item) => ({
        value: item,
        label: item,
    }));

    const fkkoOptions = fetchFkkos().map((item) => ({
        value: {
            name: item.name,
            code: item.code,
        },
        label: `${item.code} - ${item.name}`,
    }));

    const okpdOptions = fetchOkpds().map((item) => ({
        value: {
            name: item.name,
            code: item.code,
        },
        label: `${item.code} - ${item.name}`,
    }));

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
                    <label>Назначение технологии</label>
                    <Select
                        options={assignmentOptions}
                        onChange={(selectedOption) =>
                            setFormData({ ...formData, assignment: selectedOption.value })
                        }
                        placeholder="Выберите цель"
                    />
                    {errors.assignment && <span className="error">{errors.assignment}</span>}
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
                    <label htmlFor="description">Применение технологии</label>
                    <textarea
                        id="useCase"
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleChange}


                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <div className="form-group">
                    <label>Ресурсы</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Энергия"
                        name="resources.energy"
                        value={formData.resources.energy}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Вода"
                        name="resources.water"
                        value={formData.resources.water}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        step="0.01"
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
                        step="0.01"
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
                            <Select
                                options={fkkoOptions}
                                onChange={(selectedOption) =>
                                    handleFkkoChange(selectedOption, index, "waste_to_recycle")
                                }
                                placeholder="Выберите код ФККО"
                                isSearchable
                            />
                            {errors[`waste_to_recycle_${index}_fkkoCode`] && (
                                <span className="error">
                                    {errors[`waste_to_recycle_${index}_fkkoCode`]}
                                </span>
                            )}

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
                            <Select
                                options={okpdOptions}
                                onChange={(selectedOption) =>
                                    handleOkpdChange(selectedOption, index, "secondaryWasteOkpd")
                                }
                                placeholder="Выберите ОКПД"
                                isSearchable
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
                                type="number"
                                step="0.01"
                                placeholder="Масса"
                                value={item.mass}
                                onChange={(e) =>
                                    handleNestedChange(index, "mass", e.target.value, "secondaryWaste")
                                }
                            />
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Объем"
                                value={item.volume}
                                onChange={(e) =>
                                    handleNestedChange(index, "volume", e.target.value, "secondaryWaste")
                                }
                            />
                            <Select
                                options={fkkoOptions}
                                onChange={(selectedOption) =>
                                    handleFkkoChange(selectedOption, index, "secondaryWaste")
                                }
                                placeholder="Выберите код ФККО"
                                isSearchable
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
                        name="developerInfo.address"
                        placeholder="Адрес"
                        value={formData.developerInfo.address}
                        onChange={handleChange}

                    />
                    {errors["developerInfo.address"] && (
                        <span className="error">{errors["developerInfo.address"]}</span>
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
                    <input
                        type="text"
                        name="developerInfo.fax"
                        placeholder="Факс"
                        value={formData.developerInfo.fax}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Информация о потребителе</label>
                    <input
                        type="text"
                        name="userInfo.address"
                        placeholder="Адрес"
                        value={formData.userInfo.address}
                        onChange={handleChange}

                    />
                    {errors["userInfo.address"] && (
                        <span className="error">{errors["userInfo.address"]}</span>
                    )}
                    <input
                        type="phone"
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

                    <input
                        type="text"
                        name="userInfo.fax"
                        placeholder="Факс"
                        value={formData.userInfo.fax}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <h3>Экспертное заключение</h3>
                    <label>Основной вывод экологической организации</label>
                    <textarea
                        id="conclusion"
                        name="expertInfo.conclusion"
                        value={formData.expertInfo.conclusion}
                        onChange={handleChange}
                    />
                    <label>Дата заключения</label>
                    <input
                        type="date"
                        id="conclusion-date"
                        name="expertInfo.date"
                        value={formData.expertInfo.date}
                        onChange={handleChange}

                    />
                    <label>Номер заключения</label>
                    <input
                        type="number"
                        id="conclusion-number"
                        name="expertInfo.number"
                        value={formData.expertInfo.number}
                        onChange={handleChange}
                        placeholder="Введите номер заключения"
                    />
                    <label>Наименование органа, выдавшего заключение</label>

                    <input
                        type="input"
                        id="conclusion-name"
                        name="expertInfo.name"
                        value={formData.expertInfo.name}
                        onChange={handleChange}
                        placeholder="Введите наименование органа..."
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