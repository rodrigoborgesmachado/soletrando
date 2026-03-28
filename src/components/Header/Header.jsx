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

        <nav className="site-nav" aria-label="Navegação principal">
          <NavLink to="/instrucoes" className="nav-item">
            Instruções
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
          <a
            className="nav-item nav-item-external"
            href="https://www.tabuadadivertida.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tabuada Divertida
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
