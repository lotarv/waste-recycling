import React, { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import WasteProducersForm from "../WasteProducersForm/WasteProducersForm";
import "./ProfilePage.css";

function ProfilePage() {
  const { auth, setAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Профиль пользователя</h1>
        <p>Логин: <strong>{auth.user}</strong></p>
        <p>Роль: <strong>{auth.role === "producer" ? "Производитель" : "Пользователь"}</strong></p>

        {auth.role === "producer" && auth.producerData ? (
          <div className="producer-info">
            <h2>Информация о производителе</h2>
            <p><strong>Муниципальное образование:</strong> {auth.producerData.location}</p>
            <p><strong>Организация:</strong> {auth.producerData.name}</p>
            <p><strong>Код ФККО:</strong> {auth.producerData.fkko?.code}</p>
            <p><strong>Наименование отходов:</strong> {auth.producerData.fkko?.name}</p>
            <p><strong>Класс опасности:</strong> {auth.producerData.hazardClass}</p>
          </div>
        ) : (
          <WasteProducersForm setAuth={setAuth} />
        )}

        <button onClick={handleLogout} className="logout-button">Выйти</button>
      </div>
    </div>
  );
}

export default ProfilePage;