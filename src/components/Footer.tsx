import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo variant="light" />
          <p>
            Studio digital basé à Antananarivo. Nous transformons vos idées en
            expériences digitales captivantes et sur mesure.
          </p>
        </div>

        <div className="footer__col">
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/projets">Projets</Link>
            </li>
            <li>
              <Link to="/a-propos">À propos</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li>
              <Link to="/services">Développement Web</Link>
            </li>
            <li>
              <Link to="/services">Logiciel sur mesure</Link>
            </li>
            <li>
              <Link to="/services">Branding &amp; Identité</Link>
            </li>
            <li>
              <Link to="/services">Maintenance &amp; Support</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:contact@eraydigital.tech">contact@eraydigital.tech</a>
            </li>
            <li>Antananarivo, Madagascar</li>
            <li>
              <Link to="/contact">Nous écrire →</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} ErayDigital. All rights reserved</span>
      </div>
    </footer>
  )
}

export default Footer
