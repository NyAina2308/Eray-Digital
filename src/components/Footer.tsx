import { useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com', d: 'M5 9h3.5v11H5zM6.8 3.5a2 2 0 110 4 2 2 0 010-4zM10.5 9H14v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.4 2.3 4.4 5.4V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20h-3.5z' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100069619770031', d: 'M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z' },
  { label: 'Instagram', href: 'https://instagram.com', d: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm5.2-3.4a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z' },
  { label: 'GitHub', href: 'https://github.com', d: 'M12 2.5a9.5 9.5 0 00-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.4-1.1-4.4-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 014.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.4 4.7.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0012 2.5z' },
]

const colTitle = 'mb-4 font-sora text-[13px] font-semibold text-white'
const colLink = 'transition-colors hover:text-white'

function Socials({ size = 'size-9' }: { size?: string }) {
  return (
    <div className="flex gap-2.5">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className={`grid ${size} place-items-center rounded-full border border-white/12 bg-white/5 text-white transition duration-300 hover:-translate-y-[3px] hover:border-transparent hover:bg-[linear-gradient(120deg,#7b3cff,#5a4bff_45%,#2f5bff)]`}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
        </a>
      ))}
    </div>
  )
}

function ContactRow({ d, children }: { d: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-[#b9a4ff]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
      <span>{children}</span>
    </li>
  )
}

/** Inscription « Restez informé » : ouvre le client mail du visiteur, pré-rempli. */
function Newsletter() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '')
    const subject = encodeURIComponent('Inscription « Restez informé »')
    const body = encodeURIComponent(`${email} souhaite recevoir les actualités d’Eray Digital.`)
    window.location.href = `mailto:contact@eraydigital.tech?subject=${subject}&body=${body}`
    setState('done')
  }

  if (state === 'done') return <p className="text-[13px] text-[#b9a4ff]">Merci, vous êtes inscrit·e !</p>

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 pl-4 focus-within:border-[#b9a4ff]/60">
        <input
          type="email"
          name="email"
          required
          placeholder="Votre adresse email"
          aria-label="Votre adresse email"
          className="min-w-0 flex-1 border-0 bg-transparent font-sora text-[12.5px] text-white outline-none placeholder:text-white/40"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          aria-label="S'inscrire"
          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-[linear-gradient(135deg,#2f8bff,#7b3cff)] text-white transition hover:scale-105 disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
        </button>
      </div>
      {state === 'error' && <p className="mt-2 text-[12px] text-[#ff9fb4]">Inscription impossible pour le moment, réessayez.</p>}
    </form>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night pt-20 pb-8 font-sora text-[#e1e2ff]/70">
      <div className="pointer-events-none absolute -top-[420px] left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(106,60,255,.35),transparent_65%)]" aria-hidden="true" />
      <svg className="pointer-events-none absolute inset-x-0 bottom-10 h-40 w-full opacity-40" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M0 120 C 300 40, 600 160, 900 90 S 1300 20, 1440 70" stroke="#5a4bff" strokeWidth="1" />
        <path d="M0 140 C 320 70, 640 170, 960 110 S 1320 50, 1440 100" stroke="#2f8bff" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 px-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr_1.2fr] lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 mb-6 max-w-[300px] text-[13px] leading-[1.7]">
            Des solutions digitales innovantes pour les entreprises, les organisations et les particuliers.
            Ensemble, construisons votre avenir digital.
          </p>
          <Socials />
        </div>

        <div>
          <h4 className={colTitle}>Navigation</h4>
          <ul className="grid gap-2.5 text-[13px]">
            <li><Link to="/" className={colLink}>Accueil</Link></li>
            <li><Link to="/a-propos" className={colLink}>À propos</Link></li>
            <li><Link to="/services" className={colLink}>Services</Link></li>
            <li><Link to="/projets" className={colLink}>Réalisations</Link></li>
            <li><Link to="/blog" className={colLink}>Blog</Link></li>
            <li><Link to="/contact" className={colLink}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={colTitle}>Nos services</h4>
          <ul className="grid gap-2.5 text-[13px]">
            <li><Link to="/services/developpement-web" className={colLink}>Développement Web</Link></li>
            <li><Link to="/services/developpement-logiciel" className={colLink}>Développement logiciel</Link></li>
            <li><Link to="/services/design-graphique" className={colLink}>Design graphique</Link></li>
            <li><Link to="/services/solutions-digitales" className={colLink}>Solutions digitales</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={colTitle}>Contact</h4>
          <ul className="grid gap-3 text-[13px]">
            <ContactRow d={<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />}>
              <a href="tel:+261000000000" className={colLink}>+261 00 000 00 00</a>
            </ContactRow>
            <ContactRow d={<path d="M4 6h16v12H4zM4 7l8 6 8-6" />}>
              <a href="mailto:contact@eraydigital.tech" className={colLink}>contact@eraydigital.tech</a>
            </ContactRow>
            <ContactRow d={<><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>}>
              Antananarivo, Madagascar
            </ContactRow>
          </ul>
        </div>

        <div>
          <h4 className={colTitle}>Suivez-nous</h4>
          <Socials size="size-8" />
          <h4 className={`${colTitle} mt-6`}>Restez informé</h4>
          <Newsletter />
        </div>
      </div>

      <div className="relative mx-auto mt-14 flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-white/8 px-6 pt-6 text-[12.5px]">
        <span>© {new Date().getFullYear()} Eray Digital. Tous droits réservés.</span>
        <span className="text-white">
          <em className="bg-[linear-gradient(120deg,#c7b3ff,#9fb4ff)] bg-clip-text font-script text-lg text-transparent italic">Eray Digital — Soyez la différence.</em>
          <span className="ml-1 text-[#b9a4ff]" aria-hidden="true">♡</span>
        </span>
      </div>
    </footer>
  )
}

export default Footer
