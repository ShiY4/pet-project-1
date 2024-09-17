import './Header.css';

function Header() {
  return (
    <div className='header'>
      <div className="header-logo">
        <img src="#" alt="header-logo" className="header-logo__logo" />
      </div>
      <div className="header-menu">
        <nav className="header-menu__menu-buttons">
          <ul className="menu-buttons">
            <li className="menu-buttons__button">Список</li>
            <li className="menu-buttons__button">Добавить</li>
            <li className="menu-buttons__button">Аналитика</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
