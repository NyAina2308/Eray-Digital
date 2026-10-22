import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
const CONTACT_EMAIL = 'contact@eraydigital.tech'
import Reveal from '../components/Reveal'
import { Phone } from '../components/Devices'
import { ContactScreen } from '../components/PhoneDashboards'
import { Shapes, decor, type Shape } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'
import roomPhoto from '../assets/photos/room-D2XCtDIa.png'
import contactLaptop from '../assets/photos/contact-laptop.webp'

const PROJECT_TYPES = [
  'Développement Web',
  'Logiciel sur mesure',
  'Application web sur mesure',
  'Branding & Identité',
  'Autre',
]

const FAQS = [
  {
    question: 'Combien de temps pour avoir une réponse ?',
    answer: 'Nous revenons vers vous sous 24h pour organiser un premier échange autour de votre projet.',
  },
  {
    question: 'Quels services proposez-vous ?',
    answer: 'Développement web, création de logiciels sur mesure, applications web, ainsi que branding et identité visuelle. Nous couvrons tout le parcours, du design à la mise en ligne.',
  },
  {
    question: 'Quels sont vos délais de réalisation ?',
    answer: 'Cela dépend de la complexité : un site vitrine peut être livré en quelques semaines, un logiciel sur mesure demande davantage de temps. Un planning précis est établi dès le cadrage.',
  },
  {
    question: 'Travaillez-vous avec des entreprises à distance ?',
    answer: "Oui, nous accompagnons des clients à Madagascar comme à l'international, avec des échanges à distance adaptés à chaque fuseau horaire.",
  },
  {
    question: 'Proposez-vous un suivi après livraison ?',
    answer: 'Oui ! Nous offrons un support continu pour les corrections, mises à jour et optimisations afin que votre solution reste performante et à jour.',
  },
]

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100069619770031', d: 'M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/eray-digital/home/', d: 'M5 9h3.5v11H5zM6.8 3.5a2 2 0 110 4 2 2 0 010-4zM10.5 9H14v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.4 2.3 4.4 5.4V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20h-3.5z' },
  { label: 'Instagram', href: 'https://www.instagram.com/eray_digital/', d: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm5.2-3.4a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z' },
]

const p = {
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  medal: <><circle cx="12" cy="10" r="6" /><path d="M9 15.5L8 22l4-2 4 2-1-6.5M12 7.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3z" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
  chat: <path d="M4 5h16v11H9l-5 4V5zM8 10h.01M12 10h.01M16 10h.01" />,
  pin: <><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z" /><path d="M7.5 11h.01M10 7h.01M15 7.5h.01" /></>,
}

const reasons = [
  { icon: ic.bulb, title: <>Conseil &amp;<br />stratégie</>, text: 'On analyse vos besoins' },
  { icon: p.palette, title: <>Création &amp;<br />design</>, text: 'Des visuels qui marquent' },
  { icon: ic.code, title: 'Développement', text: 'Des solutions sur mesure' },
  { icon: ic.bars, title: <>Suivi &amp;<br />accompagnement</>, text: 'Vous ne serez jamais seul' },
]

const heroShapes: Shape[] = [
  { kind: 'orb', pos: { left: '-30px', top: '6%' }, size: 70, tone: 'violet' },
  { kind: 'orb', pos: { right: '-24px', top: '4%' }, size: 60, tone: 'blue' },
  { kind: 'orb', pos: { right: '3%', top: '22%' }, size: 14, tone: 'blue' },
  { kind: 'spark', pos: { left: '44%', top: '70%' }, size: 12, tone: 'violet' },
]

const field =
  'w-full border-0 bg-transparent p-0 font-sora text-[13px] text-ink outline-none placeholder:text-[#a3a5c2]'
const box =
  'flex items-start gap-3 rounded-2xl border border-violet/10 bg-[#f4f3ff]/80 px-4 py-3 transition focus-within:border-violet/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(106,60,255,.08)]'
const boxLabel = 'mb-1 block text-[11.5px] font-semibold text-ink-2'

function Field({ icon, label, required, children }: { icon: ReactNode; label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className={box}>
      <Icon className="mt-0.5 size-4 shrink-0" stroke="#3a4bff">{icon}</Icon>
      <span className="min-w-0 flex-1">
        <span className={boxLabel}>{label}{required && <span className="text-violet"> *</span>}</span>
        {children}
      </span>
    </label>
  )
}

/** Liste « Type de projet » aux couleurs de la page (remplace le <select> natif). */
function ServiceSelect() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  // Fermeture au clic en dehors
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  function choose(t: string) {
    setValue(t)
    setOpen(false)
  }

  function onKey(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Escape') return setOpen(false)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) return setOpen(true)
      const step = e.key === 'ArrowDown' ? 1 : -1
      setActive((a) => (a + step + PROJECT_TYPES.length) % PROJECT_TYPES.length)
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault()
      choose(PROJECT_TYPES[active])
    }
  }

  return (
    <div ref={ref} className={`${box} relative ${open ? 'border-violet/40 bg-white shadow-[0_0_0_4px_rgba(106,60,255,.08)]' : ''}`}>
      <Icon className="mt-0.5 size-4 shrink-0" stroke="#3a4bff">{p.shield}</Icon>
      <span className="min-w-0 flex-1">
        <span id="service-label" className={boxLabel}>Type de projet</span>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby="service-label service-value"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKey}
          className={`${field} flex cursor-pointer items-center justify-between gap-2 text-left`}
        >
          <span id="service-value" className={value ? '' : 'text-[#a3a5c2]'}>{value || 'Sélectionnez'}</span>
          <svg viewBox="0 0 24 24" className={`size-4 shrink-0 text-[#3a4bff] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </span>
      <input type="hidden" name="service" value={value} />

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby="service-label"
            className="absolute inset-x-0 top-[calc(100%+8px)] z-20 grid gap-0.5 rounded-2xl border border-violet/15 bg-white/95 p-1.5 shadow-[0_24px_50px_-20px_rgba(70,50,220,.45)] backdrop-blur-md"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            {PROJECT_TYPES.map((t, i) => (
              <li
                key={t}
                role="option"
                aria-selected={value === t}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(t)}
                className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 font-sora text-[13px] transition-colors ${i === active ? 'bg-violet/8 text-violet' : 'text-ink'} ${value === t ? 'font-semibold' : ''}`}
              >
                {t}
                {value === t && <Icon className="size-4" stroke="#6a3cff">{ic.check}</Icon>}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Note manuscrite + petite flèche dessinée. */
function Note({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`pointer-events-none absolute z-[3] hidden sm:block ${className}`} aria-hidden="true">
      <span className={`${tw.script} block -rotate-12 text-[19px] leading-[1.15] text-[#2f2bb8]`}>{children}</span>
      <svg className="mt-1 ml-auto block h-8 w-10" viewBox="0 0 40 32" fill="none">
        <path d="M34 2 C 38 14, 28 26, 8 28" stroke="#2f2bb8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 23 L7 28 L15 31" stroke="#2f2bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/** Tasse en céramique blanche avec café, ombrée comme la photo du bureau. */
function Mug() {
  return (
    <svg viewBox="0 0 120 120" className="w-full overflow-visible drop-shadow-[0_18px_18px_rgba(40,30,140,.35)]" aria-hidden="true">
      <defs>
        <linearGradient id="mug-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9dbe8" />
          <stop offset=".3" stopColor="#ffffff" />
          <stop offset=".65" stopColor="#f1f1f8" />
          <stop offset="1" stopColor="#b9bccf" />
        </linearGradient>
        <radialGradient id="mug-coffee" cx=".45" cy=".4" r=".6">
          <stop offset="0" stopColor="#6b4630" />
          <stop offset=".7" stopColor="#3b2416" />
          <stop offset="1" stopColor="#24150c" />
        </radialGradient>
        <radialGradient id="mug-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#7b5cff" stopOpacity=".45" />
          <stop offset="1" stopColor="#7b5cff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Reflet violet sur la table */}
      <ellipse cx="54" cy="112" rx="50" ry="9" fill="url(#mug-glow)" />
      {/* Anse */}
      <path d="M86 42 C112 40 114 82 84 84" fill="none" stroke="url(#mug-body)" strokeWidth="10" strokeLinecap="round" />
      <path d="M86 42 C112 40 114 82 84 84" fill="none" stroke="#a9acc2" strokeOpacity=".5" strokeWidth="1.5" />
      {/* Corps */}
      <path d="M14 30 H94 L90 98 C89 106 82 110 74 110 H34 C26 110 19 106 18 98 Z" fill="url(#mug-body)" />
      {/* Bord et café */}
      <ellipse cx="54" cy="30" rx="40" ry="9" fill="#f7f7fc" />
      <ellipse cx="54" cy="31" rx="35" ry="6.5" fill="url(#mug-coffee)" />
      <ellipse cx="46" cy="29.5" rx="10" ry="1.6" fill="#fff" opacity=".25" />
      {/* Logo */}
      <image href="/eray-logo.png" x="40" y="56" width="28" height="28" opacity=".9" />
    </svg>
  )
}

/** Ordinateur, iPhone et tasse de l'accueil : parallaxe 3D selon la souris, flottement. */
function HeroLaptop() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, -6])
  const rotX = useTransform(sy, [-0.5, 0.5], [8, 2])
  const farX = useTransform(sx, [-0.5, 0.5], [10, -10])
  const nearX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const nearY = useTransform(sy, [-0.5, 0.5], [-12, 12])
  const pop = (delay: number) => ({
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  })
  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div className="absolute inset-0" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
      <motion.div
        className="absolute top-[20%] left-[12%] w-[64%]"
        style={{ x: farX }}
        {...pop(0.15)}
      >
        <motion.div style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}>
          <div className="animate-float">
            <img src={contactLaptop} alt="Formulaire de contact Eray Digital affiché sur un ordinateur portable" className="w-full drop-shadow-[0_30px_40px_rgba(40,30,160,.55)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* iPhone au premier plan, à droite (parallaxe inverse) */}
      <motion.div className="group absolute top-[34%] left-[71%] z-[2] w-[14%] rotate-6" style={{ x: nearX, y: nearY }} {...pop(0.45)}>
        <div className="animate-float [animation-delay:-3s]"><Phone><ContactScreen /></Phone></div>
      </motion.div>

      {/* Tasse en céramique posée devant */}
      <motion.div className="absolute right-[2%] bottom-[10%] z-[2] w-[13%]" style={{ x: nearX }} {...pop(0.6)}>
        <Mug />
      </motion.div>
    </div>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [allFaqs, setAllFaqs] = useState(false)
  const formRef = useRef<HTMLElement>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const form = new FormData(event.currentTarget)
    const phone = String(form.get('phone') ?? '').trim()
    const message = String(form.get('message') ?? '')
    const name = String(form.get('name') ?? '')
    const service = String(form.get('service') ?? '')
    const body = [
      `Nom : ${name}`,
      `Email : ${form.get('email') ?? ''}`,
      ...(phone ? [`Téléphone : ${phone}`] : []),
      ...(service ? [`Service : ${service}`] : []),
      '',
      message,
    ].join('\n')

    try {
      // Pas de backend : on ouvre le client mail du visiteur, pré-rempli.
      const subject = `Demande de contact – ${name}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const faqs = allFaqs ? FAQS : FAQS.slice(0, 4)

  return (
    <div className={tw.page}>
      <GradDefs />

      {/* ============================== HERO ============================== */}
      <section className="relative isolate pt-[110px] pb-10">
        <Shapes items={heroShapes} />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]`}>
          <Reveal className="min-w-0">
            <span className={`${tw.chipSm} mb-4 border-0 bg-violet/10`}>Contact</span>
            <h1 className="mb-5 font-sora text-[clamp(32px,3.6vw,48px)] leading-[1.06] font-bold tracking-[-0.035em] text-ink">
              Une question ?<br />Une idée ?<br />
              <span className="text-grad">Écrivons ensemble<br />votre avenir digital.</span>
            </h1>
            <p className="mb-8 max-w-[460px] text-[13.5px] leading-[1.7] text-body">
              Notre équipe est là pour vous écouter, répondre à toutes vos questions et vous accompagner dans la
              réalisation de vos projets. N’hésitez pas à nous contacter, nous serons ravis de vous aider !
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {[
                { icon: p.bolt, title: 'Réponse rapide', sub: 'Sous 24h' },
                { icon: p.headset, title: 'Équipe à l’écoute', sub: 'et disponible' },
                { icon: p.medal, title: 'Accompagnement', sub: 'de A à Z' },
              ].map((f) => (
                <li key={f.title} className="flex items-center gap-3">
                  <Icon className="size-7">{f.icon}</Icon>
                  <div><b className="block text-[12px] font-semibold text-ink">{f.title}</b><small className="text-[11px] text-mute">{f.sub}</small></div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative h-[320px] min-w-0 sm:h-[440px]" delay={120}>
            <Note className="-top-2 right-0">Votre projet<br />commence ici !</Note>
            {/* Blob de verre avec photo de bureau en fond */}
            <div className="absolute inset-[2%_4%_4%_6%] overflow-hidden rounded-[46%_54%_42%_58%/48%_40%_60%_52%] shadow-[0_40px_80px_-30px_rgba(80,50,255,.5),0_0_0_6px_rgba(123,60,255,.12)]">
              <img src={teamPhoto} alt="" className="size-full scale-110 object-cover opacity-80 blur-[2px]" />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.55),rgba(170,150,255,.35)_50%,rgba(47,139,255,.35))]" />
            </div>
            <span className="absolute top-[26%] -left-[2%] h-[46%] w-[26%] rotate-12 rounded-[50%] bg-[linear-gradient(160deg,#3aa0ff,#6a3cff)] opacity-80 blur-[1px]" />
            {/* Ordinateur (même rendu que l'accueil) */}
            <HeroLaptop />
          </Reveal>
        </div>
      </section>

      {/* ======================= FORMULAIRE + COORDONNÉES ================= */}
      <section ref={formRef} className="relative isolate scroll-mt-24 py-10">
        <Shapes items={decor.left} />
        <div className={`${tw.wrap} grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]`}>
          {/* Formulaire */}
          <Reveal className="min-w-0">
            <form onSubmit={handleSubmit} className="glass relative grid gap-4 rounded-[30px] p-7 sm:p-9">
              {submitted ? (
                <div className="py-14 text-center">
                  <span className={`${tw.icoBlue} mx-auto mb-5 size-16`}><Icon className="size-7" stroke="#fff">{ic.check}</Icon></span>
                  <h3 className="mb-2 font-sora text-2xl font-bold text-ink">Message envoyé !</h3>
                  <p className="text-body">Merci, nous vous répondrons sous 24h.</p>
                </div>
              ) : (
                <>
                  <div>
                    <span className={`${tw.chipSm} mb-3 border-0 bg-violet/10`}>Écrivez-nous</span>
                    <h2 className="mb-2 font-sora text-[26px] leading-[1.15] font-bold tracking-[-0.02em] text-ink">Parlons de votre projet.</h2>
                    <p className="mb-2 text-[13px] leading-[1.6] text-body">Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field icon={p.user} label="Votre nom" required><input type="text" name="name" required placeholder="Jean Dupont" className={field} /></Field>
                    <Field icon={p.mail} label="Votre email" required><input type="email" name="email" required placeholder="votre@email.com" className={field} /></Field>
                    <Field icon={p.phone} label="Téléphone"><input type="tel" name="phone" placeholder="+261 ..." className={field} /></Field>
                    <ServiceSelect />
                  </div>
                  <Field icon={p.chat} label="Votre message" required>
                    <textarea name="message" required rows={3} placeholder="Décrivez brièvement votre projet..." className={`${field} resize-y`} />
                  </Field>

                  {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{error}</p>}

                  <div className="relative flex flex-wrap items-center gap-6 pt-2">
                    <button type="submit" disabled={submitting} className={`${tw.btnLg} cursor-pointer border-0 disabled:cursor-wait disabled:opacity-70`}>
                      <Icon className="size-4" stroke="currentColor">{ic.send}</Icon>
                      {submitting ? 'Envoi en cours...' : <>Envoyer le message <Arrow /></>}
                    </button>
                    <span className={`${tw.script} hidden -rotate-8 text-[17px] leading-[1.15] text-[#2f2bb8] sm:block`}>Nous vous répondrons<br />rapidement !</span>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          {/* Coordonnées + photo */}
          <div className="relative grid min-w-0 gap-6 sm:grid-cols-[1fr_0.75fr]">
            <Reveal className="min-w-0" delay={100}>
              <span className={`${tw.chipSm} mb-3 border-0 bg-violet/10`}>Nos coordonnées</span>
              <h2 className="mb-3 font-sora text-[24px] font-bold tracking-[-0.02em] text-ink">Restons connectés !</h2>
              <p className="mb-6 text-[13px] leading-[1.6] text-body">
                Vous pouvez également <b className="font-semibold text-ink">nous contacter</b> directement via les informations ci-dessous. Nous sommes disponibles pour échanger sur votre projet.
              </p>
              <ul className="glass grid gap-1 rounded-[22px] p-2">
                {[
                  { icon: p.phone, title: 'Téléphone', value: <a href="tel:+261388218033" className="hover:text-violet">+261 38 82 180 33</a> },
                  { icon: p.mail, title: 'Email', value: <a href="mailto:contact@eraydigital.tech" className="hover:text-violet">contact@eraydigital.tech</a>, sub: 'On répond sous 24h' },
                  { icon: p.pin, title: 'Adresse', value: 'Antananarivo, Madagascar' },
                ].map((c) => (
                  <li key={c.title} className="flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-white/70">
                    <span className={`${tw.icoBlue} size-11`}><Icon className="size-5" stroke="#fff">{c.icon}</Icon></span>
                    <div className="min-w-0 text-[12.5px]">
                      <b className="block font-semibold text-ink">{c.title}</b>
                      <span className="block break-words text-body">{c.value}</span>
                      {c.sub && <small className="text-[11px] text-mute">{c.sub}</small>}
                    </div>
                  </li>
                ))}
                <li className="flex items-center gap-4 rounded-2xl px-3 py-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(90,60,255,.45)]"><Icon className="size-5">{p.chat}</Icon></span>
                  <div className="text-[12.5px]">
                    <b className="block font-semibold text-ink">Réseaux sociaux</b>
                    <small className="mb-2 block text-[11px] text-mute">Suivez-nous pour rester connecté</small>
                    <div className="flex gap-2">
                      {SOCIALS.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#6a3cff)] text-white transition hover:-translate-y-0.5">
                          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </Reveal>
            <Reveal className="relative hidden min-h-[420px] sm:block" delay={180}>
              <div className="absolute inset-0 overflow-hidden rounded-[45%_45%_40%_40%/30%_30%_25%_25%] shadow-[0_30px_60px_-24px_rgba(60,40,200,.55),0_0_0_6px_rgba(123,60,255,.12)]">
                <img src={roomPhoto} alt="Nos bureaux" className="size-full object-cover" />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,139,255,.15),rgba(106,60,255,.25))]" />
              </div>
              <Note className="-bottom-20 -left-10">Notre équipe<br />vous attend !</Note>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== POURQUOI NOUS CONTACTER =================== */}
      <section className="relative isolate py-14">
        <Shapes items={decor.soft} />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
          <Reveal className="min-w-0">
            <span className={`${tw.chipSm} mb-3 border-0 bg-violet/10`}>Pourquoi nous contacter ?</span>
            <h2 className="mb-4 font-sora text-[clamp(26px,2.4vw,32px)] leading-[1.12] font-bold tracking-[-0.03em] text-ink">Votre projet mérite<br />la bonne équipe.</h2>
            <p className="mb-6 max-w-[420px] text-[13px] leading-[1.65] text-body">Nous mettons notre expertise et notre passion à votre service pour vous offrir des solutions digitales sur mesure, adaptées à vos besoins et à vos objectifs.</p>
            <Link to="/services" className={tw.btn}>Découvrir nos services <Arrow /></Link>
          </Reveal>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={i} delay={i * 90} className="glass grid min-h-[170px] content-center justify-items-center gap-2 rounded-[22px] px-4 py-6 text-center transition duration-500 hover:-translate-y-1.5">
                <Icon className="mb-1 size-9">{r.icon}</Icon>
                <h3 className="font-sora text-[13.5px] leading-[1.3] font-semibold text-ink">{r.title}</h3>
                <p className="text-[11px] text-mute">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== FAQ ============================== */}
      <section className="relative isolate px-3 py-6 md:px-0">
        <div className="relative mx-auto max-w-[1340px] overflow-hidden rounded-[40px] bg-[radial-gradient(500px_300px_at_85%_60%,rgba(106,60,255,.45),transparent_70%),linear-gradient(120deg,#0a0b2e,#15134a_60%,#1a1570)] py-14 text-white shadow-[0_40px_80px_-30px_rgba(40,30,200,.6)] md:rounded-[60px_120px_60px_120px/60px_80px_60px_80px]">
          <Shapes items={decor.dark} />
          <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr_0.5fr]`}>
            <Reveal className="min-w-0">
              <span className="mb-3 inline-block rounded-full bg-[#3a4bff] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.16em] text-white uppercase">FAQ</span>
              <h2 className="mb-3 font-sora text-[clamp(26px,2.4vw,32px)] leading-[1.1] font-bold text-white">Des réponses<br />à vos questions.</h2>
              <p className="mb-6 text-[13px] leading-[1.6] text-white/80">Vous avez des doutes ? Consultez notre FAQ ou contactez-nous directement.</p>
              <button type="button" onClick={() => setAllFaqs((v) => !v)} className={`${tw.btn} cursor-pointer border-0`}>
                {allFaqs ? 'Voir moins de questions' : 'Voir toutes les questions'} <Arrow />
              </button>
            </Reveal>
            <Reveal className="min-w-0" delay={100}>
              <ul className="grid gap-3">
                {faqs.map((f, i) => {
                  const open = openFaq === i
                  return (
                    <li
                      key={f.question}
                      className={`rounded-[20px] border backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-400 ${
                        open
                          ? 'border-[#8fa8ff]/55 bg-[linear-gradient(135deg,rgba(47,139,255,.2),rgba(123,60,255,.32))] text-white shadow-[0_24px_50px_-20px_rgba(90,60,255,.7)]'
                          : 'border-[#8fa8ff]/25 bg-white/[.07] text-white hover:border-[#8fa8ff]/50 hover:bg-white/[.11]'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`faq-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent px-5 py-4 text-left font-sora"
                      >
                        <span className={`text-[11px] font-semibold tracking-[0.12em] transition-colors ${open ? 'text-[#c9b5ff]' : 'text-[#8fb4ff]'}`}>{String(i + 1).padStart(2, '0')}</span>
                        <span className={`flex-1 text-[13.5px] font-semibold transition-colors text-white`}>{f.question}</span>
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full text-white transition duration-300 ${
                            open
                              ? 'rotate-45 bg-[linear-gradient(135deg,#2f8bff,#7b3cff)] shadow-[0_8px_18px_-6px_rgba(90,60,255,.8)]'
                              : 'border border-white/25 bg-white/10'
                          }`}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                        </span>
                      </button>
                      <div id={`faq-${i}`} className={`grid transition-[grid-template-rows,opacity] duration-400 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="mx-5 mb-4 border-l-2 border-[#b9a4ff]/60 pl-4 text-[12.5px] leading-[1.7] text-white/80 sm:ml-[52px]">{f.answer}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
            {/* Casque + bulle */}
            <Reveal className="relative hidden h-[220px] lg:block" delay={200}>
              <span className={`${tw.script} absolute -top-6 right-0 z-[2] rounded-[20px_20px_20px_4px] bg-white px-4 py-2 text-[17px] leading-[1.15] text-ink-2 shadow-[0_14px_30px_-12px_rgba(0,0,0,.4)]`}>Une question ?<br />On est là !</span>
              {/* Casque-micro réaliste : arceau rembourré, glissières métal, coussinets cuir, perche micro */}
              <svg className="absolute bottom-0 left-0 w-[170px] animate-float drop-shadow-[0_24px_30px_rgba(40,20,140,.7)]" viewBox="0 0 160 150" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="hs-band" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b5f73" /><stop offset=".45" stopColor="#2a2c38" /><stop offset="1" stopColor="#15161e" /></linearGradient>
                  <linearGradient id="hs-pad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b3e4e" /><stop offset="1" stopColor="#1a1b24" /></linearGradient>
                  <linearGradient id="hs-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8d91a3" /><stop offset=".5" stopColor="#eef0f6" /><stop offset="1" stopColor="#7c8093" /></linearGradient>
                  <radialGradient id="hs-cup" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#4a4e62" /><stop offset=".55" stopColor="#23252f" /><stop offset="1" stopColor="#0e0f15" /></radialGradient>
                  <radialGradient id="hs-cushion" cx=".5" cy=".4" r=".7"><stop offset="0" stopColor="#2b2d38" /><stop offset=".8" stopColor="#15161d" /><stop offset="1" stopColor="#0a0a0f" /></radialGradient>
                  <linearGradient id="hs-accent" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fa8ff" /><stop offset="1" stopColor="#8b5cff" /></linearGradient>
                </defs>

                {/* Arceau principal */}
                <path d="M26 82 C 22 30, 138 30, 134 82" stroke="url(#hs-band)" strokeWidth="9" strokeLinecap="round" />
                <path d="M28 70 C 30 34, 130 34, 132 70" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" strokeLinecap="round" />
                {/* Coussin de tête (rembourrage cousu) */}
                <path d="M48 42 C 66 28, 94 28, 112 42" stroke="url(#hs-pad)" strokeWidth="11" strokeLinecap="round" />
                <path d="M50 42 C 67 30, 93 30, 110 42" stroke="#000" strokeOpacity=".35" strokeWidth=".8" strokeDasharray="2 2" />

                {/* Glissières métalliques */}
                <rect x="21" y="72" width="7" height="18" rx="2" fill="url(#hs-metal)" />
                <rect x="132" y="72" width="7" height="18" rx="2" fill="url(#hs-metal)" />
                {[76, 80, 84].map((y) => <path key={y} d={`M22 ${y}h5M133 ${y}h5`} stroke="#6a6e80" strokeWidth=".6" />)}

                {/* Oreillette gauche (vue 3/4) */}
                <g>
                  <ellipse cx="30" cy="110" rx="20" ry="26" fill="url(#hs-cushion)" />
                  <ellipse cx="25" cy="110" rx="18" ry="24" fill="url(#hs-cup)" />
                  <ellipse cx="25" cy="110" rx="11" ry="15" stroke="url(#hs-accent)" strokeWidth="2" />
                  <ellipse cx="21" cy="101" rx="4" ry="6" fill="#fff" opacity=".12" />
                  <circle cx="25" cy="110" r="2.2" fill="url(#hs-accent)" />
                </g>
                {/* Oreillette droite */}
                <g>
                  <ellipse cx="130" cy="110" rx="20" ry="26" fill="url(#hs-cushion)" />
                  <ellipse cx="135" cy="110" rx="18" ry="24" fill="url(#hs-cup)" />
                  <ellipse cx="135" cy="110" rx="11" ry="15" stroke="url(#hs-accent)" strokeWidth="2" />
                  <ellipse cx="131" cy="101" rx="4" ry="6" fill="#fff" opacity=".12" />
                  <circle cx="135" cy="110" r="2.2" fill="url(#hs-accent)" />
                </g>

                {/* Perche micro */}
                <path d="M22 124 C 26 142, 52 146, 70 138" stroke="#1c1d26" strokeWidth="4" strokeLinecap="round" />
                <path d="M23 125 C 27 140, 51 144, 69 137" stroke="#fff" strokeOpacity=".15" strokeWidth="1" strokeLinecap="round" />
                <rect x="66" y="131" width="14" height="10" rx="5" fill="#15161d" transform="rotate(-18 73 136)" />
                <rect x="68" y="133" width="9" height="5" rx="2.5" fill="url(#hs-accent)" opacity=".8" transform="rotate(-18 73 136)" />
                {/* Voyant allumé */}
                <circle cx="44" cy="120" r="1.6" fill="#5dffb0" className="animate-twinkle" />
              </svg>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="relative isolate mt-6 overflow-hidden bg-[linear-gradient(100deg,#1d8bff,#3a4bff_45%,#7b3cff_80%,#b07bff)] py-10 text-white">
        <span className="absolute -top-16 -left-10 size-44 rounded-full bg-white/10 blur-sm" aria-hidden="true" />
        <span className="absolute -right-10 -bottom-20 size-56 rounded-full bg-[#b07bff]/40 blur-sm" aria-hidden="true" />
        <div className={`${tw.wrap} flex flex-col items-center gap-6 text-center md:flex-row md:text-left`}>
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Icon className="size-7" stroke="#fff">{p.mail}</Icon></span>
          <div className="flex-1">
            <h2 className="mb-1 font-sora text-[22px] font-semibold text-white">Prêt à donner vie à votre projet ?</h2>
            <p className="text-[13px] text-white/85">Contactez-nous dès maintenant et obtenez un devis personnalisé.</p>
          </div>
          <button type="button" onClick={scrollToForm} className={`${tw.btnWhite} cursor-pointer border-0`}>Nous contacter <Arrow /></button>
        </div>
      </section>
    </div>
  )
}

export default Contact
