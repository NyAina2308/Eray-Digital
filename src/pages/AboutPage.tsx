import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Cta from '../components/Cta'

function AboutPage() {
  return (
    <>
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">À propos</span>
          <h1 className="contact-hero__title">L&apos;équipe derrière ErayDigital</h1>
          <p className="contact-hero__subtitle">
            Qui nous sommes, et pourquoi les entreprises malgaches nous font
            confiance pour leurs projets digitaux.
          </p>
        </div>
      </div>
      <About />
      <Testimonials />
      <Cta />
    </>
  )
}

export default AboutPage
