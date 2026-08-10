import { useState } from 'react'
import Reveal from './Reveal'

const FAQS = [
  {
    question: 'Quels services proposez-vous ?',
    answer:
      'Développement web, création de logiciels sur mesure, applications web, ainsi que branding et identité visuelle. Nous couvrons tout le parcours, du design à la mise en ligne.',
  },
  {
    question: 'Quel est votre délai moyen pour un projet ?',
    answer:
      "Cela dépend de la complexité : un site vitrine peut être livré en quelques semaines, un logiciel sur mesure demande davantage de temps. Un planning précis est établi dès le cadrage.",
  },
  {
    question: 'Proposez-vous un suivi après livraison ?',
    answer:
      'Oui ! Nous offrons un support continu pour les corrections, mises à jour et optimisations afin que votre solution reste performante et à jour.',
  },
  {
    question: 'Travaillez-vous avec des clients à l’international ?',
    answer:
      "Oui, nous accompagnons des clients à Madagascar comme à l'international, avec des échanges à distance adaptés à chaque fuseau horaire.",
  },
  {
    question: 'Comment démarrer un projet avec vous ?',
    answer:
      'Il suffit de nous contacter avec une brève description de votre projet. Nous revenons vers vous sous 24h pour organiser un premier échange.',
  },
]

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-item__question" onClick={onToggle}>
        {question}
        <span className="faq-item__icon">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="faq-item__answer">{answer}</p>}
    </div>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq section">
      <div className="container faq__inner">
        <Reveal as="div" className="section__head faq__head">
          <span className="eyebrow">FAQ</span>
          <h2 className="section__title">Plus de questions ?</h2>
          <p className="section__subtitle">
            Tout ce que vous devez savoir avant de collaborer avec nous.
          </p>
        </Reveal>

        <div className="faq__list">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} as="div" delay={index * 60}>
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
