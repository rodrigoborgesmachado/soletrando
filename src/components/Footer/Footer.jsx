import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <p>
          Soletrando • Produto educacional da <strong>SunSale System</strong>.
        </p>

        <nav className="footer-links" aria-label="Links institucionais">
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/politica-privacidade">Política de Privacidade</Link>
        </nav>

        <small>© {new Date().getFullYear()} SunSale System. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}

export default Footer;
