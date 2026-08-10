import { Link } from 'react-router-dom'
import Reveal from './Reveal'

function Cta() {
  return (
    <section className="cta">
      <div className="cta__glow" aria-hidden="true" />
      <Reveal as="div" className="container cta__inner">
        <h2 className="cta__title">Vous avez un projet en tête ?</h2>
        <p className="cta__subtitle">
          Réservez un appel pour en savoir plus sur la façon dont nous pouvons
          répondre à vos besoins en développement, logiciel ou branding.
        </p>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn-primary">
            Contactez-nous →
          </Link>
          <a href="mailto:contact@eraydigital.tech" className="btn btn-outline-light">
            Nous écrire un e-mail
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default Cta
