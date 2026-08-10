import { useState, type FormEvent } from 'react'
import { API_URL } from '../lib/api'

const SERVICES = [
  'Développement Web',
  'Logiciel sur mesure',
  'Application web sur mesure',
  'Branding & Identité',
  'Autre',
]

const DELAYS = ['Dès que possible', '1 à 4 semaines', '1 à 3 mois', 'Pas encore défini']

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      service: form.get('service'),
      delay: form.get('delay'),
      message: form.get('message'),
    }

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || "Une erreur est survenue, réessayez.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'envoyer le message. Vérifiez votre connexion et réessayez.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow eyebrow--light">Contact</span>
          <h1 className="contact-hero__title">Vous avez un projet en tête ?</h1>
          <p className="contact-hero__subtitle">
            Décrivez-nous votre besoin, nous vous répondrons sous 24h.
          </p>
        </div>
      </div>

      <div className="container contact-page__body">
        <div className="contact-info">
          <h2>Parlons-en</h2>
          <p>
            Que ce soit pour un site vitrine, un logiciel métier ou une refonte
            de votre identité de marque, notre équipe est prête à vous
            accompagner de A à Z.
          </p>

          <ul className="contact-info__list">
            <li>
              <span className="contact-info__label">Email</span>
              <a href="mailto:contact@eraydigital.tech">contact@eraydigital.tech</a>
            </li>
            <li>
              <span className="contact-info__label">Téléphone</span>
              <a href="tel:+261000000000">+261 00 000 00 00</a>
            </li>
            <li>
              <span className="contact-info__label">Localisation</span>
              <span>Antananarivo, Madagascar</span>
            </li>
          </ul>

          <div className="contact-info__socials">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="X (Twitter)">x</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact-form__success">
              <h3>Message envoyé !</h3>
              <p>Merci, nous vous répondrons sous 24h.</p>
            </div>
          ) : (
            <>
              <div className="contact-form__row">
                <label>
                  Nom complet
                  <input type="text" name="name" required placeholder="Votre nom" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required placeholder="vous@exemple.com" />
                </label>
              </div>

              <div className="contact-form__row">
                <label>
                  Service souhaité
                  <select name="service" defaultValue="">
                    <option value="" disabled>
                      Sélectionner...
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Délai souhaité
                  <select name="delay" defaultValue="">
                    <option value="" disabled>
                      Sélectionner...
                    </option>
                    {DELAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Votre projet
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Décrivez votre projet..."
                />
              </label>

              {error && <p className="contact-form__error">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary contact-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer le message →'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
