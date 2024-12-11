import SiteLogo from "../../assets/recycle.png";
import { useLocation } from "react-router-dom";
import './header.css';  

function Header() {
  const location = useLocation();

  function renderLink() {
    if (location.pathname === "/") {
      return <a href="/form" className="link">Перейти в режим заполнения</a>;
    }
    else {
      return <a href="/" className="link">Перейти в режим просмотра</a>;
    }
  }

  return (
    <header className="header">
      <img src={SiteLogo} alt="Логотип" className="logo" />
      <h1 className="title">Отходы и технологии их утилизации </h1>
      {renderLink()}
    </header>
  );
}

export default Header;
