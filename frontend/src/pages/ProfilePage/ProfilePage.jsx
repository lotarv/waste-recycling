import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { auth, setAuth, logout } = useContext(AuthContext);
  const [producerForm, setProducerForm] = useState({
    wasteType: auth.producerData?.wasteType || "",
    organization: auth.producerData?.organization || "",
    region: auth.producerData?.region || "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleProducerSubmit = (e) => {
    e.preventDefault();
    const updatedAuth = {
      ...auth,
      role: "producer",
      producerData: producerForm,
    };
    setAuth(updatedAuth);
    localStorage.setItem("auth", JSON.stringify(updatedAuth));
    setSuccessMessage(isEditing ? "Данные обновлены!" : "Вы успешно зарегистрированы как производитель!");
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setProducerForm({ ...producerForm, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage("");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Профиль пользователя</h1>
        <p>Логин: <strong>{auth.user}</strong></p>
        <p>Роль: <strong>{auth.role === "producer" ? "Производитель" : "Пользователь"}</strong></p>

        {auth.role === "producer" && auth.producerData && !isEditing ? (
          <div className="producer-info">
            <h2>Данные производителя</h2>
            <p>Тип отходов: {auth.producerData.wasteType}</p>
            <p>Организация: {auth.producerData.organization}</p>
            <p>Регион: {auth.producerData.region}</p>
            <button onClick={handleEdit} className="edit-button">Редактировать</button>
          </div>
        ) : (
          <div className="producer-form">
            <h2>{isEditing ? "Редактировать данные" : "Стать производителем"}</h2>
            <p>Заполните данные, чтобы {isEditing ? "обновить информацию" : "зарегистрироваться как производитель отходов"}.</p>
            <form onSubmit={handleProducerSubmit} className="form">
              <div className="form-group">
                <label htmlFor="wasteType">Тип производимых отходов</label>
                <input
                  type="text"
                  id="wasteType"
                  name="wasteType"
                  value={producerForm.wasteType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="organization">Наименование организации</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={producerForm.organization}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="region">Регион</label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={producerForm.region}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {successMessage && <p className="success-text">{successMessage}</p>}
              <button type="submit" className="submit-button">
                {isEditing ? "Сохранить" : "Зарегистрироваться"}
              </button>
            </form>
          </div>
        )}
        <button onClick={logout} className="logout-button">Выйти</button>
      </div>
    </div>
  );
}

export default ProfilePage;