import Reveal from './Reveal'

const TESTIMONIALS = [
  {
    quote:
      "L'équipe a parfaitement compris nos besoins et livré un site à la hauteur de nos attentes, dans les délais annoncés.",
    name: 'Fondateur',
    role: 'Startup Tech',
  },
  {
    quote:
      'Un vrai partenaire digital : réactif, à l’écoute et force de proposition sur toute la durée du projet.',
    name: 'Directrice',
    role: 'Boutique en ligne',
  },
  {
    quote:
      "Notre logiciel métier nous fait gagner un temps précieux au quotidien. Un travail sérieux, du cadrage au support.",
    name: 'Gérant',
    role: 'Cabinet de conseil',
  },
]

function Testimonials() {
  return (
    <section id="temoignages" className="testimonials section">
      <div className="container">
        <Reveal as="div" className="section__head">
          <span className="eyebrow">Témoignages</span>
          <h2 className="section__title">Qu&apos;en pensent nos clients</h2>
          <p className="section__subtitle">
            Notre engagement envers l&apos;excellence se reflète dans chaque projet.
          </p>
        </Reveal>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + t.role} as="figure" className="testimonial-card" delay={i * 90}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="testimonial-card__name">{t.name}</span>
                <span className="testimonial-card__role">{t.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
