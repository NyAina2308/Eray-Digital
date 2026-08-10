import { useEffect, useState } from 'react'
import Reveal from './Reveal'
import { projects as staticProjects, type Project } from '../data/projects'
import { API_URL } from '../lib/api'

type ApiProject = {
  name: string
  category: string
  description: string
  imageUrl: string
}

function Projects() {
  const [items, setItems] = useState<Project[]>(staticProjects)

  useEffect(() => {
    let cancelled = false

    fetch(`${API_URL}/api/projects`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: ApiProject[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return
        setItems(
          data.map((p) => ({
            name: p.name,
            category: p.category,
            description: p.description,
            image: p.imageUrl.startsWith('http') ? p.imageUrl : `${API_URL}${p.imageUrl}`,
          })),
        )
      })
      .catch(() => {
        // Backend unavailable — keep showing the bundled static projects.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="projets" className="projects section">
      <div className="container">
        <Reveal as="div" className="section__head">
          <span className="eyebrow">Projets récents</span>
          <h2 className="section__title">Nos réalisations parlent pour nous</h2>
          <p className="section__subtitle">
            Un aperçu de sites et plateformes livrés récemment pour nos clients.
          </p>
        </Reveal>

        <div className="projects__grid">
          {items.map((project, i) => (
            <Reveal key={project.name} as="article" className="project-card" delay={i * 60}>
              <div className="project-card__image">
                <img src={project.image} alt={`Site web ${project.name} réalisé par Eray Digital`} loading="lazy" />
                <span className="project-card__overlay">{project.description}</span>
              </div>
              <div className="project-card__meta">
                <h3>{project.name}</h3>
                <span>{project.category}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
