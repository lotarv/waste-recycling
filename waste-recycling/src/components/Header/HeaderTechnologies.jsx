import SiteLogo from "../../assets/recycle.png";
import { useNavigate } from "react-router-dom";
import './header.css';

function HeaderTechnologies() {
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedPath = e.target.value;
    if (selectedPath) {
      navigate(selectedPath);
    }
  };

  const handleLogoClick = () => {
    navigate("/"); // Перенаправление на HomePage
  };

  return (
    <header className="header">
      <img src={SiteLogo} alt="Логотип" className="logo" onClick={handleLogoClick} style={{cursor:"pointer"}} />
      <h1 className="title">Система учета технологий переработки и утилизации отходов</h1>
      <div className="dropdown">
        <label htmlFor="navigation-select" className="dropdown-label">Навигация:</label>
        <select
          id="navigation-select"
          className="dropdown-select"
          onChange={handleSelectChange}
          defaultValue=""
        >
          <option value="" disabled>Выберите раздел</option>
          <option value="/technologyView">Технологии переработки отходов</option>
          <option value="/technologyForm">Добавить технологию переработки</option>
        </select>
      </div>
    </header>
  );
}

export default HeaderTechnologies;
