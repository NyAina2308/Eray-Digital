import { Link } from 'react-router-dom'
import Typewriter from './Typewriter'
import associationAnalasoa from '../assets/projects/Association-Analasoa-BPdyBL6x.jpg'
import terrela from '../assets/projects/Terrela-D-c9KETz.jpg'
import matezaTole from '../assets/projects/Matezatole-BxF3xFUf.jpg'
import radiataExplorer from '../assets/projects/radiata-explorer-W3y1EQWJ.jpg'

const BADGES = [
  { label: 'Développement Web', icon: 'code' },
  { label: 'Logiciel sur mesure', icon: 'app' },
  { label: 'Branding & Design', icon: 'brush' },
  { label: 'Maintenance & Support', icon: 'support' },
]

const MINI_PROJECTS = [
  { name: 'Association Analasoa', image: associationAnalasoa },
  { name: 'Terrela MDG', image: terrela },
  { name: 'Mateza Tôle', image: matezaTole },
  { name: 'Radiata Explorer', image: radiataExplorer },
]

function Icon({ name }: { name: string }) {
  switch (name) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'app':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 7h6M9 11h6M9 15h3" strokeLinecap="round" />
        </svg>
      )
    case 'brush':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20c1-4 3-6 6-7l8-8 3 3-8 8c-1 3-3 5-7 6z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 1.8-2.4 3.3M12 17.2v.1" strokeLinecap="round" />
        </svg>
      )
  }
}

function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="eyebrow eyebrow--light hero-fade" style={{ animationDelay: '0ms' }}>
          Studio digital · Antananarivo
        </span>

        <h1 className="hero__title hero-fade" style={{ animationDelay: '80ms' }}>
          Créons l&apos;excellence
          <br />
          <Typewriter
            className="hero__title-accent"
            words={['digitale, ensemble', 'qui vous ressemble', 'qui convertit', 'sur mesure']}
          />
        </h1>

        <p className="hero__subtitle hero-fade" style={{ animationDelay: '160ms' }}>
          Chez ErayDigital, nous transformons vos idées en expériences digitales
          captivantes et sur mesure pour votre succès.
        </p>

        <div className="hero__cta hero-fade" style={{ animationDelay: '240ms' }}>
          <Link to="/contact" className="btn btn-primary">
            Démarrer un projet →
          </Link>
          <Link to="/services" className="btn btn-outline-light">
            Voir nos services
          </Link>
        </div>

        <div className="hero__mock hero-fade" style={{ animationDelay: '320ms' }}>
          <div className="device">
            <div className="device__bar">
              <span className="device__dot" />
              <span className="device__dot" />
              <span className="device__dot" />
              <span className="device__url">eraydigital.tech</span>
            </div>
            <div className="device__screen">
              <div className="device__nav">
                <span className="device__brand">ErayDigital</span>
                <span>Accueil</span>
                <span>Services</span>
                <span>Projets</span>
                <span>Contact</span>
                <span className="device__nav-btn">Devis gratuit</span>
              </div>

              <div className="device__hero">
                <div>
                  <p className="device__hero-title">
                    Développez votre
                    <br />
                    présence digitale
                  </p>
                  <p className="device__hero-sub">Sites web, logiciels et identités sur mesure</p>
                  <span className="device__hero-btn">Démarrer →</span>
                </div>
                <div className="device__chart">
                  <span className="device__chart-badge">+128% de trafic</span>
                  <div className="device__bars">
                    <span style={{ height: '30%' }} />
                    <span style={{ height: '45%' }} />
                    <span style={{ height: '38%' }} />
                    <span style={{ height: '60%' }} />
                    <span style={{ height: '52%' }} />
                    <span style={{ height: '78%' }} />
                    <span style={{ height: '95%' }} />
                  </div>
                </div>
              </div>

              <div className="device__row">
                <span className="device__row-label">Nos derniers projets</span>
                <div className="device__thumbs">
                  {MINI_PROJECTS.map((p) => (
                    <img key={p.name} src={p.image} alt={p.name} className="device__thumb" loading="lazy" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__badges">
          {BADGES.map((b, i) => (
            <div key={b.label} className="hero__badge hero__badge--float" style={{ animationDelay: `${i * 0.4}s` }}>
              <Icon name={b.icon} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
