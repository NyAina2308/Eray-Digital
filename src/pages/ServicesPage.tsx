import Services from '../components/Services'
import Cta from '../components/Cta'

function ServicesPage() {
  return (
    <>
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">Services</span>
          <h1 className="contact-hero__title">Ce que nous faisons</h1>
          <p className="contact-hero__subtitle">
            Du développement web au branding, une équipe qui couvre tout votre
            besoin digital, de l&apos;idée à la mise en ligne.
          </p>
        </div>
      </div>
      <Services />
      <Cta />
    </>
  )
}

export default ServicesPage
