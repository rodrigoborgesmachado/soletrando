import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-content">
        <NavLink to="/" className="brand">
          <span className="brand-badge" aria-hidden="true">
            S
          </span>
          <span className="brand-text">
            <strong>Soletrando</strong>
            <small>SunSale System</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Navegacao principal">
          <NavLink to="/instrucoes" className="nav-item">
            Instrucoes
          </NavLink>
          <NavLink to="/selecao-nivel" className="nav-item">
            Jogar
          </NavLink>
          <NavLink to="/ranking" className="nav-item">
            Ranking
          </NavLink>
          <NavLink to="/desempenho" className="nav-item">
            Desempenho
          </NavLink>
          <NavLink to="/sobre" className="nav-item">
            Sobre
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
