import { Link } from 'react-router-dom'
import CountUp from './CountUp'
import Reveal from './Reveal'

function Stats() {
  return (
    <section className="stats">
      <div className="container stats__inner">
        <div className="stats__grid">
          <Reveal className="stats__item">
            <span className="stats__value">
              <CountUp value={50} suffix="+" />
            </span>
            <span className="stats__label">Projets réalisés</span>
          </Reveal>
          <Reveal className="stats__item" delay={80}>
            <span className="stats__value">
              <CountUp value={98} suffix="%" />
            </span>
            <span className="stats__label">Clients satisfaits</span>
          </Reveal>
          <Reveal className="stats__item" delay={160}>
            <span className="stats__value">24/7</span>
            <span className="stats__label">Support &amp; suivi</span>
          </Reveal>
          <Reveal className="stats__item" delay={240}>
            <span className="stats__value">
              <CountUp value={5} suffix="+" />
            </span>
            <span className="stats__label">Années d&apos;expérience</span>
          </Reveal>
        </div>
        <Link to="/contact" className="btn btn-primary stats__cta">
          Devis gratuit →
        </Link>
      </div>
    </section>
  )
}

export default Stats
