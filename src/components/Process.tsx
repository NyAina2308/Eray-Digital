import Reveal from './Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Prise de contact & cadrage',
    description:
      'Rencontre avec le client, compréhension de ses besoins et objectifs. Établissement du projet, de ses spécificités et de ses restrictions.',
  },
  {
    number: '02',
    title: 'Proposition & validation',
    description:
      'Élaboration d’une proposition (devis, maquettes, planning). Présentation au client, échanges, et validation finale du projet.',
  },
  {
    number: '03',
    title: 'Réalisation & suivi',
    description:
      'Développement ou design de la solution, avec des points d’étape réguliers pour garder le client impliqué à chaque avancée.',
  },
  {
    number: '04',
    title: 'Livraison & support',
    description:
      'Livraison finale du projet et formation utilisateur si nécessaire. Support technique et maintenance corrective selon les besoins.',
  },
]

function Process() {
  return (
    <section id="process" className="process section">
      <div className="container">
        <Reveal as="div" className="section__head">
          <span className="eyebrow">Comment ça marche</span>
          <h2 className="section__title">
            Du brief au lancement :
            <br />
            comment on construit votre projet
          </h2>
        </Reveal>

        <div className="process__grid">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} as="div" className="process-card" delay={i * 90}>
              <span className="process-card__number">{step.number}</span>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__desc">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
