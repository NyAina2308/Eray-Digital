import Projects from '../components/Projects'
import Cta from '../components/Cta'

function ProjectsPage() {
  return (
    <>
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">Projets</span>
          <h1 className="contact-hero__title">Notre travail</h1>
          <p className="contact-hero__subtitle">
            Des sites et plateformes livrés pour des clients variés, à
            Madagascar comme à l&apos;international.
          </p>
        </div>
      </div>
      <Projects />
      <Cta />
    </>
  )
}

export default ProjectsPage
