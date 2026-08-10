import Reveal from './Reveal'
import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'
import roomPhoto from '../assets/photos/room-D2XCtDIa.png'
import womanPhoto from '../assets/photos/woman-Dt2ftJah.png'

function About() {
  return (
    <section id="apropos" className="about section">
      <div className="container about__inner">
        <Reveal as="div" className="about__gallery">
          <img src={teamPhoto} alt="Équipe ErayDigital au travail" className="about__img about__img--main" loading="lazy" />
          <img src={roomPhoto} alt="Rencontre client chez ErayDigital" className="about__img about__img--small about__img--one" loading="lazy" />
          <img src={womanPhoto} alt="Collaboratrice ErayDigital travaillant sur un projet web" className="about__img about__img--small about__img--two" loading="lazy" />
        </Reveal>

        <Reveal as="div" className="about__content" delay={120}>
          <span className="eyebrow">À propos de nous</span>
          <h2 className="section__title about__title">
            Un groupe diversifié de créateurs,
            <br />
            de stratèges et de programmeurs
          </h2>
          <p className="about__text">
            Liés par une passion commune pour la création d&apos;expériences
            numériques percutantes. Une équipe jeune, passionnée et
            constamment à la pointe, qui valorise la curiosité, la
            collaboration et l&apos;esprit d&apos;initiative.
          </p>

          <div className="about__stats">
            <div>
              <strong>5+</strong>
              <span>Années d&apos;expérience</span>
            </div>
            <div>
              <strong>50+</strong>
              <span>Projets livrés</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Local, à Antananarivo</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About
