import SiteLogo from "../../assets/recycle.png";
import { useNavigate } from "react-router-dom";
import './header.css';

function Header() {
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    const selectedPath = e.target.value;
    if (selectedPath) {
      navigate(selectedPath);
    }
  };

  return (
    <header className="header">
      <img src={SiteLogo} alt="Логотип" className="logo" />
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
          <option value="/">Технологии переработки отходов</option>
          <option value="/wasteProducersView">Организации-производители отходов</option>
          <option value="/technologyForm">Добавить технологию переработки</option>
          <option value="/wasteProducersForm">Добавить производителя отходов</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
