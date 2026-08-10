import type { ReactElement } from 'react'
import Reveal from './Reveal'

type Service = {
  title: string
  description: string
  icon: ReactElement
}

const iconProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const SERVICES: Service[] = [
  {
    title: 'Développement Web',
    description:
      'Sites vitrines et applications web rapides, sécurisées et pensées pour convertir vos visiteurs en clients.',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 4v5" />
      </svg>
    ),
  },
  {
    title: 'Logiciel sur mesure',
    description:
      "Des logiciels métiers conçus autour de vos process réels, pour gagner en efficacité au quotidien.",
    icon: (
      <svg {...iconProps}>
        <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />
      </svg>
    ),
  },
  {
    title: 'Application web sur mesure',
    description:
      'Plateformes et outils métiers évolutifs, du prototype au produit déployé auprès de vos utilisateurs.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h3" />
      </svg>
    ),
  },
  {
    title: 'Branding & Identité',
    description:
      'Logo, charte graphique et supports de communication qui donnent à votre marque une identité forte.',
    icon: (
      <svg {...iconProps}>
        <path d="M4 20c1-4 3-6 6-7l8-8 3 3-8 8c-1 3-3 5-7 6z" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      "Des interfaces claires et centrées sur l'utilisateur, pensées pour guider chaque parcours.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Maintenance & Support',
    description:
      'Corrections, mises à jour et optimisations continues pour que votre solution reste performante.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

function Services() {
  return (
    <section id="services" className="services section">
      <div className="container">
        <Reveal as="div" className="section__head">
          <span className="eyebrow">Nos Services</span>
          <h2 className="section__title">
            Des solutions digitales complètes,
            <br />
            de l&apos;idée à la mise en ligne
          </h2>
          <p className="section__subtitle">
            Un accompagnement unique qui allie développement, logiciel et branding
            pour donner vie à votre projet.
          </p>
        </Reveal>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} as="div" className="service-card" delay={i * 70}>
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
