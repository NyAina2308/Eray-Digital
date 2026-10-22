import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Laptop, Phone } from '../components/Devices'
import LiveIcon, { type LiveKind } from '../components/LiveIcon'
import Reveal from '../components/Reveal'
import { Shapes, type Shape } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import { projects } from '../data/projects'
import portrait from '../assets/photos/woman-Dt2ftJah.png'
import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'
import deskPhoto from '../assets/photos/services-desk.webp'

/* ------------------------------------------------------------------ */
/* Données                                                            */
/* ------------------------------------------------------------------ */

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const logo = (name: string, variant = 'original') => `${DEVICON}/${name}/${name}-${variant}.svg`

/** Icônes propres à l'accueil. */
const hi = {
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  monitor: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.9 1.4-1.9-.3-.9.3-2.1 1.5-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>,
  heart: <path d="M12 20s-7-4.4-9-9A5 5 0 0 1 12 6a5 5 0 0 1 9 5c-2 4.6-9 9-9 9z" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />,
}

const heroChips: { icon: ReactNode; label: ReactNode; cls: string; d: number }[] = [
  { icon: ic.globe, label: <>Sites web<br />&amp; E-commerce</>, cls: 'left-[2%] top-[4%]', d: 0 },
  { icon: ic.code, label: <>Logiciels<br />sur mesure</>, cls: 'left-[46%] top-0', d: 0.4 },
  { icon: hi.chip, label: <>IoT &amp;<br />Systèmes embarqués</>, cls: 'right-0 top-[14%]', d: 0.8 },
  { icon: ic.brush, label: <>Design<br />graphique</>, cls: '-left-[2%] top-[40%]', d: 1.2 },
  { icon: hi.gear, label: 'Automatisation', cls: 'right-[-2%] top-[42%]', d: 1.6 },
  { icon: ic.users, label: <>Community<br />Management</>, cls: 'right-[4%] bottom-[8%]', d: 2 },
]

const aboutPoints: { icon: ReactNode; label: ReactNode; kind: LiveKind }[] = [
  { icon: ic.users, label: <>Une équipe<br />passionnée</>, kind: 'pulse' },
  { icon: hi.shield, label: <>Des solutions<br />sur mesure</>, kind: 'bob' },
  { icon: ic.atom, label: <>Une expertise<br />pluridisciplinaire</>, kind: 'spin' },
  { icon: ic.target, label: <>Votre succès<br />est notre priorité</>, kind: 'swing' },
]

const services: { icon: ReactNode; title: ReactNode; text: string; to: string; kind: LiveKind }[] = [
  { icon: hi.monitor, title: <>Développement<br />Web</>, text: 'Sites vitrines, e-commerce et plateformes web modernes.', to: '/services/developpement-web', kind: 'bob' },
  { icon: ic.code, title: <>Logiciels<br />sur mesure</>, text: 'Des outils adaptés à vos processus et besoins.', to: '/services/developpement-logiciel', kind: 'pulse' },
  { icon: hi.palette, title: 'Design graphique', text: 'Identité visuelle, supports de communication, visuels publicitaires.', to: '/services/design-graphique', kind: 'swing' },
  { icon: hi.chip, title: <>IoT &amp; Systèmes<br />embarqués</>, text: 'Solutions connectées, objets intelligents, projets électroniques.', to: '/services', kind: 'pulse' },
  { icon: hi.gear, title: 'Automatisation', text: 'Gagnez en efficacité et réduisez les tâches répétitives.', to: '/services/solutions-digitales', kind: 'spin' },
  { icon: ic.users, title: <>Community<br />Management</>, text: 'Une présence en ligne stratégique et engageante.', to: '/services', kind: 'bob' },
]

const values: { icon: ReactNode; title: string; text: string; kind: LiveKind }[] = [
  { icon: hi.heart, title: 'Passion', text: 'Nous nous impliquons réellement dans votre projet. Notre engagement ne s’arrête pas à la livraison : nous vous guidons, vous conseillons et vous accompagnons à chaque étape.', kind: 'pulse' },
  { icon: ic.bulb, title: 'Innovation', text: 'Nous ne nous contentons pas de faire, nous cherchons toujours à progresser, à améliorer nos méthodes et à proposer des solutions plus simples, plus intelligentes et plus efficaces.', kind: 'swing' },
  { icon: hi.trend, title: 'Performance', text: 'Nous créons de la valeur, pas seulement des projets. Notre objectif est que la technologie ait un impact concret sur votre activité : gain de temps, meilleure organisation, croissance.', kind: 'bob' },
]

const tools = [
  { name: 'React', src: logo('react') },
  { name: 'Node.js', src: logo('nodejs') },
  { name: 'Laravel', src: logo('laravel') },
  { name: 'WordPress', src: logo('wordpress', 'plain') },
  { name: 'Figma', src: logo('figma') },
  { name: 'Photoshop', src: logo('photoshop', 'plain') },
]

const promises = [
  { icon: ic.ear, label: 'Écoute & conseil' },
  { icon: ic.hand, label: 'Accompagnement personnalisé' },
  { icon: ic.clock, label: 'Livraison dans les délais' },
  { icon: ic.loop, label: 'Support continu' },
]

const aboutShapes: Shape[] = [
  { kind: 'orb', pos: { left: '46%', top: '6%' }, size: 12, tone: 'blue' },
  { kind: 'gem', pos: { right: '3%', top: '40%' }, size: 18, rotate: 20, tone: 'violet' },
]
const trustShapes: Shape[] = [
  { kind: 'orb', pos: { left: '44%', top: '0' }, size: 14, tone: 'blue' },
  { kind: 'spark', pos: { right: '3%', top: '6%' }, size: 12, tone: 'violet' },
]

/* ------------------------------------------------------------------ */
/* Visuels                                                            */
/* ------------------------------------------------------------------ */

/** Pastille de section claire (« À propos », « Nos services »). */
const pill = 'mb-3 inline-block rounded-full border border-[#2f8bff]/30 bg-[#e8f1ff] px-3 py-1 text-[11px] font-semibold text-[#2f5bff]'

/** Plante en pot (SVG). */
function Plant({ className = '' }: { className?: string }) {
  const leaves = [
    { d: 'M60 120 C 30 100, 14 70, 20 40 C 44 58, 58 86, 60 120', c: '#2f7d4f' },
    { d: 'M60 120 C 90 100, 108 72, 102 38 C 78 58, 62 86, 60 120', c: '#3a9460' },
    { d: 'M60 120 C 46 90, 44 50, 60 12 C 76 50, 74 90, 60 120', c: '#2a6e46' },
    { d: 'M60 122 C 30 116, 6 100, 0 78 C 28 80, 50 98, 60 122', c: '#3f9c66' },
    { d: 'M60 122 C 90 116, 114 100, 120 78 C 92 80, 70 98, 60 122', c: '#2f7d4f' },
  ]
  return (
    <svg className={className} viewBox="0 0 120 190" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pl-pot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1d2a5c" /><stop offset=".5" stopColor="#34478f" /><stop offset="1" stopColor="#18224d" /></linearGradient>
      </defs>
      {leaves.map((l, i) => (
        <g key={i}>
          <path d={l.d} fill={l.c} />
        </g>
      ))}
      <path d="M32 124 H88 L82 182 C 81 186, 78 188, 74 188 H46 C 42 188, 39 186, 38 182 Z" fill="url(#pl-pot)" />
      <rect x="28" y="118" width="64" height="10" rx="4" fill="#26357a" />
    </svg>
  )
}

/** Ordinateur + deux téléphones entourés des pastilles de services, avec parallaxe. */
function HeroVisual() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 18 })
  const sy = useSpring(my, { stiffness: 80, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, -6])
  const rotX = useTransform(sy, [-0.5, 0.5], [8, 2])
  const nearX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const nearY = useTransform(sy, [-0.5, 0.5], [-12, 12])
  const farX = useTransform(sx, [-0.5, 0.5], [10, -10])
  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const pop = (delay: number) => ({
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className="relative h-[340px] sm:h-[460px]" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
      {/* Lueur sous les appareils */}
      <span className="absolute inset-[18%_12%_6%_14%] rounded-full bg-[radial-gradient(circle,rgba(90,110,255,.55),rgba(123,60,255,.25)_45%,transparent_70%)] blur-2xl" />
      <span className="absolute bottom-[8%] left-[20%] h-[10%] w-[60%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(120,150,255,.6),transparent_70%)] blur-md" />

      {/* MacBook central, incliné en 3D selon la souris */}
      <motion.div className="group absolute top-[12%] left-[12%] z-[2] w-[62%]" style={{ x: farX }} {...pop(0.15)}>
        <motion.div style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}>
          <div className="animate-float">
            <Laptop keyboard src={projects[5]?.image ?? projects[0].image}>
              <span className="absolute inset-0 bg-[linear-gradient(110deg,rgba(10,11,46,.88),rgba(30,20,120,.45)_55%,transparent)]" />
              <motion.span
                className="absolute top-[32%] left-[8%] z-[1] text-[clamp(13px,1.4vw,19px)] leading-[1.25] font-semibold text-white"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
              >
                Des solutions<br />qui font la différence
                <motion.span className="mt-1.5 block h-[3px] rounded-full bg-[linear-gradient(90deg,#2f8bff,#7b3cff)]" initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ delay: 1.5, duration: 0.8 }} />
              </motion.span>
            </Laptop>
          </div>
        </motion.div>
      </motion.div>

      {/* iPhones au premier plan, à droite (parallaxe inverse) */}
      {[
        { img: projects[1].image, cls: 'left-[70%] top-[24%] w-[14%] rotate-8', d: 0.45, float: '' },
        { img: projects[4]?.image ?? projects[0].image, cls: 'left-[59%] top-[42%] w-[15%] rotate-4', d: 0.6, float: '[animation-delay:-3s]' },
      ].map((ph, i) => (
        <motion.div key={i} className={`group absolute z-[3] ${ph.cls}`} style={{ x: nearX, y: nearY }} {...pop(ph.d)}>
          <div className={`animate-float ${ph.float}`}><Phone src={ph.img} /></div>
        </motion.div>
      ))}

      {/* Pastilles de services flottantes */}
      {heroChips.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute z-[4] hidden items-center gap-2.5 rounded-xl border border-[#8fa8ff]/35 bg-[#141660]/55 px-3 py-2 text-[10.5px] leading-[1.25] font-medium text-white shadow-[0_0_24px_-6px_rgba(90,120,255,.7)] backdrop-blur-md sm:flex ${c.cls}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { delay: 0.9 + c.d / 3 },
            scale: { delay: 0.9 + c.d / 3, type: 'spring', stiffness: 200, damping: 14 },
            y: { duration: 4, repeat: Infinity, delay: c.d, ease: 'easeInOut' },
          }}
          whileHover={{ scale: 1.08 }}
        >
          <span className="grid size-7 place-items-center rounded-lg border border-white/20 bg-white/5">
            <LiveIcon kind={(['pulse', 'bob', 'swing', 'spin'] as LiveKind[])[i % 4]} boxed={false} delay={c.d}>
              <Icon className="size-4" stroke="#cfd8ff">{c.icon}</Icon>
            </LiveIcon>
          </span>
          <span>{c.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

/** Projets de l'accueil : même taille, décalages variés pour rythmer la ligne. */
const projectCards: { lift: string; featured?: boolean; tone: string }[] = [
  { lift: 'lg:-translate-y-2', tone: 'bg-[radial-gradient(circle_at_60%_40%,rgba(47,139,255,.35),rgba(123,60,255,.08)_70%)]' },
  { lift: 'lg:-translate-y-8', featured: true, tone: 'bg-[radial-gradient(circle_at_55%_40%,rgba(123,60,255,.4),rgba(47,91,255,.1)_70%)]' },
  { lift: '', tone: 'bg-[radial-gradient(circle_at_50%_45%,rgba(90,200,255,.35),rgba(60,90,255,.08)_70%)]' },
  { lift: 'lg:-translate-y-4', tone: 'bg-[radial-gradient(circle_at_45%_40%,rgba(176,123,255,.38),rgba(47,91,255,.08)_70%)]' },
]

/** Carte projet blanche, dans le style des cartes services. */
function ProjectCard({ project: pr, index }: { project: (typeof projects)[number]; index: number }) {
  const c = projectCards[index]
  return (
    <Link
      to="/projets"
      aria-label={`Voir le projet ${pr.name}`}
      className={`group relative flex h-full flex-col rounded-2xl border bg-white px-3.5 pt-3.5 pb-5 shadow-[0_18px_40px_-26px_rgba(40,30,160,.45)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_56px_-24px_rgba(60,40,220,.55)] ${c.featured ? 'border-[#7b3cff]/30' : 'border-violet/10'}`}
    >
      <div className={`relative mb-4 overflow-hidden rounded-xl px-3.5 py-5 ${c.tone}`}>
        <span className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle,rgba(90,110,255,.55),transparent_70%)] opacity-0 blur-xl transition duration-700 group-hover:opacity-100" aria-hidden="true" />
        {c.featured && <span className="absolute top-2.5 right-2.5 z-[2] rounded-full bg-[linear-gradient(100deg,#2f8bff,#7b3cff)] px-2.5 py-0.5 text-[9.5px] font-semibold text-white shadow-[0_8px_18px_-6px_rgba(60,60,255,.7)]">Projet phare</span>}
        <div className="relative transition duration-700 [transform:perspective(700px)_rotateY(-10deg)_rotate(-2deg)] group-hover:[transform:perspective(700px)_rotateY(-3deg)_translateY(-4px)_scale(1.04)]">
          <Laptop src={pr.image} alt={pr.name} className="w-full" />
        </div>
      </div>
      <span className="mb-1.5 self-start rounded-full bg-[#e8f1ff] px-2 py-0.5 text-[9.5px] font-semibold text-[#2f5bff]">{pr.category}</span>
      <h3 className={`mb-1 font-sora font-semibold text-[#141660] transition-colors group-hover:text-[#3a4bff] text-[14px]`}>{pr.name}</h3>
      <p className="line-clamp-2 min-h-[3.2em] pr-9 text-[11px] leading-[1.6] text-mute">{pr.description}</p>
      <span className={`${goBtn} absolute right-3.5 bottom-4 transition duration-500 group-hover:scale-110`}>
        <Arrow className="size-3.5 -rotate-45 transition duration-500 group-hover:rotate-0" />
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const goBtn = 'grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#5a3cff)] text-white shadow-[0_8px_18px_-6px_rgba(60,60,255,.6)]'
const darkBg = 'bg-[radial-gradient(600px_380px_at_8%_20%,rgba(60,90,255,.35),transparent_70%),radial-gradient(700px_420px_at_92%_70%,rgba(123,60,255,.45),transparent_70%),linear-gradient(120deg,#070a2e,#14136b_55%,#1d1580)]'

function Home() {
  const reduce = useReducedMotion()

  return (
    <div className={tw.page}>
      <GradDefs />

      {/* ============================== HERO ============================== */}
      <section className={`relative isolate overflow-hidden pt-[110px] pb-24 text-white ${darkBg}`}>
        {/* Voiles violets ondulés */}
        <svg className="pointer-events-none absolute inset-0 -z-[1] size-full" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hh-veil" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6a5cff" stopOpacity=".35" />
              <stop offset="1" stopColor="#2f8bff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M-40 120 C 120 260, 60 480, 260 700 L -40 700 Z" fill="url(#hh-veil)" />
          <path d="M1480 -20 C 1260 120, 1420 360, 1220 520 S 1300 700, 1480 720 Z" fill="url(#hh-veil)" />
          <path d="M0 560 C 300 640, 520 520, 760 600" stroke="#8fa8ff" strokeOpacity=".25" strokeWidth="1.2" fill="none" />
        </svg>
        {/* Bas en vague blanche */}
        <svg className="absolute inset-x-0 -bottom-px h-16 w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 64 V40 C 360 0, 760 60, 1080 30 S 1380 10, 1440 20 V64 Z" fill="#fbfbff" />
        </svg>

        <div className={`${tw.wrap} grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="min-w-0">
            <p className="mb-2 font-sora text-[clamp(16px,1.5vw,20px)] font-medium text-[#5aa8ff]">Bienvenue chez</p>
            <h1 className="mb-4 font-sora text-[clamp(42px,5vw,68px)] leading-[1] font-bold tracking-[-0.04em]">
              Eray <span className="bg-[linear-gradient(100deg,#2f9bff,#4a7bff)] bg-clip-text text-transparent">Digital</span>
            </h1>
            <motion.span className="mb-6 block h-1 rounded-full bg-[linear-gradient(90deg,#2f8bff,#7b3cff)]" initial={{ width: 0 }} animate={{ width: 44 }} transition={{ delay: 0.6, duration: 0.6 }} />
            <p className="mb-3 text-[clamp(16px,1.4vw,19px)] leading-[1.4] font-semibold">Nous transformons vos idées en solutions<br className="hidden sm:block" /> numériques concrètes.</p>
            <p className="mb-8 max-w-[520px] text-[13.5px] leading-[1.7] text-white/75">
              Spécialisés dans le développement de sites web, logiciels sur mesure, design graphique, systèmes embarqués &amp; IoT, automatisation et community management.
            </p>
            <div className="mb-7 flex flex-wrap gap-3">
              <Link to="/contact" className={`${tw.btn} px-7 py-3.5 whitespace-nowrap`}>Parlons de votre projet <Arrow /></Link>
              <Link to="/services" className="group inline-flex items-center gap-2.5 rounded-full border border-white/40 px-7 py-3.5 font-sora text-[13px] font-semibold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:bg-white/10">Découvrir nos services</Link>
            </div>
            <p className="text-xs text-white/70">Votre besoin. Notre expertise. Une solution pensée pour vous.</p>
          </Reveal>
          <Reveal className="min-w-0" delay={120}><HeroVisual /></Reveal>
        </div>
      </section>

      {/* ============================ À PROPOS ============================ */}
      <section className="relative isolate pt-14 pb-10">
        <Shapes items={aboutShapes} />
        <Plant className="absolute top-[22%] left-[-10px] hidden w-[70px] -rotate-6 xl:block" />
        <Plant className="absolute top-[8%] right-[-6px] hidden w-[110px] xl:block" />
        <span className="absolute top-[48%] right-[7%] hidden h-24 w-10 rotate-[20deg] rounded-[50%_50%_50%_50%/70%_70%_30%_30%] bg-[linear-gradient(180deg,#b07bff,#6a3cff)] opacity-70 xl:block" aria-hidden="true" />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr_0.7fr]`}>
          {/* Photo d'équipe dans une forme organique */}
          <Reveal className="relative aspect-[1020/690] min-w-0">
            <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 1020 690" aria-hidden="true">
              <defs>
                <linearGradient id="ab-blue" x1="0" y1="0" x2=".35" y2="1">
                  <stop offset="0" stopColor="#c4e2ff" />
                  <stop offset=".45" stopColor="#6aa6ff" />
                  <stop offset="1" stopColor="#3f63ff" />
                </linearGradient>
                <linearGradient id="ab-violet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a58cff" />
                  <stop offset=".5" stopColor="#6c4bff" />
                  <stop offset="1" stopColor="#8a6dff" stopOpacity=".6" />
                </linearGradient>
                <linearGradient id="ab-drop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a9d0ff" />
                  <stop offset="1" stopColor="#4a7bff" stopOpacity=".75" />
                </linearGradient>
                <clipPath id="ab-photo">
                  <path d="M260 104 L836 66 Q886 63 870 112 L740 470 Q728 500 690 500 L690 585 L262 590 Q222 590 222 550 L222 144 Q222 107 260 104 Z" />
                </clipPath>
              </defs>
              {/* Point décoratif */}
              <circle cx="30" cy="172" r="7" fill="#c9cfff" />
              {/* Forme bleue organique, liserée de blanc */}
              <path d="M250 75 C330 30 470 38 530 78 L560 640 C470 670 330 690 230 650 C120 610 50 520 60 400 C70 300 150 140 250 75 Z" fill="url(#ab-blue)" />
              <path d="M252 92 C330 50 460 56 515 92 L540 625 C460 652 330 670 238 634 C135 596 72 512 80 400 C88 305 160 155 252 92 Z" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="3" />
              {/* Ruban violet le long du bord droit */}
              <path d="M860 60 C905 52 940 85 922 132 L792 432 C782 452 760 458 748 442 L872 120 C880 96 874 74 860 60 Z" fill="url(#ab-violet)" />
              {/* Photo découpée en biais, bord blanc */}
              <image href={teamPhoto} x="222" y="60" width="660" height="540" preserveAspectRatio="xMidYMid slice" clipPath="url(#ab-photo)" />
              <path d="M260 104 L836 66 Q886 63 870 112 L740 470 Q728 500 690 500 L690 585 L262 590 Q222 590 222 550 L222 144 Q222 107 260 104 Z" fill="none" stroke="#fff" strokeWidth="5" />
              {/* Goutte bleue */}
              <path d="M862 345 C898 338 918 378 900 412 L810 495 C830 440 822 382 862 345 Z" fill="url(#ab-drop)" />
            </svg>
            <span className="sr-only">L'équipe Eray Digital au travail</span>
            <Link
              to="/a-propos"
              className="group absolute top-[63.8%] left-[33.3%] flex h-[25.4%] w-[42.6%] items-center justify-between rounded-[22px] border border-white border-r-[#8a6dff]/70 bg-white/85 px-[5%] shadow-[0_24px_40px_-18px_rgba(40,30,160,.45)] backdrop-blur-md transition hover:-translate-y-1"
            >
              <span className="font-sora text-[clamp(12px,1.2vw,16px)] leading-[1.3] font-semibold text-[#3b32c8]">Des idées<br />aux solutions</span>
              <span className="grid size-[clamp(28px,2.6vw,38px)] shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7a5cff,#4a2fe0)] text-white shadow-[0_8px_18px_-6px_rgba(80,50,255,.7)]">
                <Arrow className="size-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <Reveal className="min-w-0" delay={100}>
            <span className={pill}>À propos</span>
            <h2 className="mb-5 font-sora text-[clamp(24px,2.3vw,32px)] leading-[1.15] font-bold tracking-[-0.02em] text-[#141660]">
              Plus qu’un prestataire,<br />un partenaire pour vos projets numériques.
            </h2>
            <p className="mb-3 text-[13px] leading-[1.7] text-body">
              Eray Digital accompagne les entreprises, organisations et entrepreneurs dans leur transformation numérique grâce à des solutions adaptées à leurs réalités et à leurs objectifs.
            </p>
            <p className="mb-5 text-[13px] leading-[1.7] text-body">
              De la conception d’un site web au développement d’un logiciel, en passant par le design, l’automatisation ou les systèmes connectés, nous réunissons plusieurs compétences technologiques pour répondre à vos besoins.
            </p>
            <div className="glass flex gap-3 rounded-2xl px-5 py-4">
              <span className="font-script text-[40px] leading-[.8] text-[#3a4bff]">“</span>
              <div>
                <b className="mb-1 block text-[13px] text-[#141660]">Comprendre avant de créer.</b>
                <p className="text-[12px] leading-[1.6] text-mute">Notre objectif n’est pas seulement de livrer un projet, mais de créer quelque chose qui vous soit réellement utile.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="glass min-w-0 rounded-[24px] px-6 py-6" delay={200}>
            <ul className="grid gap-5">
              {aboutPoints.map((a, i) => (
                <li key={i} className="flex items-center gap-4 text-[12.5px] leading-[1.35] font-medium text-[#141660]">
                  <LiveIcon kind={a.kind} delay={i * 0.5} size="size-10"><Icon className="size-5">{a.icon}</Icon></LiveIcon>
                  <span>{a.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================ SERVICES ============================ */}
      <section className="relative isolate overflow-x-clip pt-10 pb-16">
        <span className="absolute inset-x-0 top-0 -z-[1] h-full bg-[linear-gradient(180deg,transparent,rgba(236,234,255,.6)_40%,transparent)]" aria-hidden="true" />
        {/* Lignes ondulées discrètes du fond */}
        <svg className="pointer-events-none absolute inset-x-0 top-0 -z-[1] h-40 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0 70 C 320 20, 640 110, 960 60 S 1320 10, 1440 30" stroke="#d9d6ff" strokeOpacity=".7" strokeWidth="1.2" />
          <path d="M0 100 C 360 50, 700 140, 1020 90 S 1340 40, 1440 60" stroke="#e4e2ff" strokeOpacity=".8" strokeWidth="1" />
        </svg>
        {/* Forme bleue en bas à gauche */}
        <span className="absolute bottom-[14%] -left-12 -z-[1] h-40 w-28 rotate-[25deg] rounded-[50%] bg-[linear-gradient(180deg,#a9d0ff,#4a7bff)] opacity-80" aria-hidden="true" />
        {/* Bureau : photo découpée en biais, qui déborde à droite et passe sous les cartes */}
        <Reveal className="absolute top-[-80px] right-0 hidden w-[min(46vw,720px)] lg:block" delay={120}>
          <svg className="block w-full overflow-visible" viewBox="0 0 1000 680" aria-hidden="true">
            <defs>
              {/* Bord haut en légère oblique, grand arc à gauche, bas coupé en biais par le ruban */}
              <clipPath id="sv-desk">
                <path d="M170 110 C420 70 700 40 1000 0 L1000 480 L720 650 L110 650 C55 490 80 250 170 110 Z" />
              </clipPath>
              <radialGradient id="sv-disc" cx=".5" cy=".5" r=".5">
                <stop offset="0" stopColor="#e4e0ff" />
                <stop offset="1" stopColor="#f1efff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sv-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#bcd2ff" stopOpacity="0" />
                <stop offset=".35" stopColor="#7fa4ff" />
                <stop offset="1" stopColor="#6a3cff" />
              </linearGradient>
              <linearGradient id="sv-band" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#9cc0ff" />
                <stop offset=".5" stopColor="#6f7dff" />
                <stop offset="1" stopColor="#6a3cff" />
              </linearGradient>
            </defs>
            {/* Disque lavande derrière l'arc */}
            <circle cx="290" cy="390" r="300" fill="url(#sv-disc)" />
            {/* Ruban qui part du bas et monte en oblique vers la droite */}
            <path d="M660 680 L1000 465 L1000 610 L800 680 Z" fill="url(#sv-band)" />
            <image href={deskPhoto} x="40" y="0" width="900" height="500" preserveAspectRatio="xMidYMid slice" clipPath="url(#sv-desk)" />
            <path d="M170 110 C420 70 700 40 1000 0" fill="none" stroke="url(#sv-edge)" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </Reveal>
        <div className={`${tw.wrap} mb-8 grid items-end gap-6 lg:grid-cols-[1fr_auto]`}>
          <Reveal className="min-w-0">
            <span className={pill}>Nos services</span>
            <h2 className="font-sora text-[clamp(24px,2.3vw,32px)] leading-[1.15] font-bold tracking-[-0.02em] text-[#141660]">
              Des solutions numériques<br />pour faire avancer votre activité
            </h2>
          </Reveal>
        </div>

        <div className={`${tw.wrap} relative z-[1] grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`}>
          {services.map((s, i) => (
            <Reveal key={s.to + i} delay={i * 70} className="min-w-0">
              <Link to={s.to} className="group flex h-full flex-col rounded-2xl border border-violet/10 bg-white px-5 py-6 shadow-[0_18px_40px_-26px_rgba(40,30,160,.45)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-24px_rgba(60,40,220,.55)]">
                <span className="mb-4 transition duration-500 group-hover:scale-110">
                  <LiveIcon kind={s.kind} boxed={false} delay={i * 0.4}><Icon className="size-8">{s.icon}</Icon></LiveIcon>
                </span>
                <h3 className="mb-2 font-sora text-[14px] leading-[1.25] font-semibold text-[#141660]">{s.title}</h3>
                <p className="text-[11.5px] leading-[1.6] text-mute">{s.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link to="/services" className={`${tw.btn} px-8 py-3.5`}>Découvrir tous nos services <Arrow /></Link>
        </div>
      </section>

      {/* ============================= VALEURS ============================ */}
      <section className={`relative isolate overflow-hidden py-16 text-white ${darkBg}`}>
        <svg className="absolute inset-x-0 -top-px h-12 w-full" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H1440 V12 C 1100 48, 800 4, 480 30 S 120 30, 0 10 Z" fill="#fbfbff" />
        </svg>
        <div className={`${tw.wrap} grid gap-10 lg:grid-cols-[0.8fr_2.2fr]`}>
          <Reveal className="min-w-0 self-center">
            <span className="mb-3 inline-block rounded-full bg-[linear-gradient(100deg,#2f8bff,#3a4bff)] px-3 py-1 text-[11px] font-semibold">Nos valeurs</span>
            <h2 className="font-sora text-[clamp(22px,2vw,28px)] leading-[1.2] font-bold">Ce qui guide notre<br />manière de travailler</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} className={`min-w-0 md:px-7 ${i ? 'md:border-l md:border-white/15' : ''}`}>
                <motion.span
                  className="mb-4 grid size-12 place-items-center rounded-full bg-[linear-gradient(145deg,#3aa0ff,#6a3cff)] shadow-[0_0_30px_-4px_rgba(90,120,255,.8)]"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                >
                  <LiveIcon kind={v.kind} boxed={false} delay={i * 0.6}><Icon className="size-6" stroke="#fff">{v.icon}</Icon></LiveIcon>
                </motion.span>
                <h3 className="mb-3 font-sora text-[17px] font-semibold">{v.title}</h3>
                <p className="text-[12.5px] leading-[1.7] text-white/75">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link to="/a-propos" className={`${tw.btn} px-8 py-3.5`}>Découvrir qui nous sommes <Arrow /></Link>
        </div>
      </section>

      {/* ============================== PROJETS =========================== */}
      <section id="projets" className="relative isolate pt-16 pb-14">
        <div className={`${tw.wrap} grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]`}>
          <Reveal className="min-w-0 self-center sm:col-span-2 lg:col-span-1">
            <span className={pill}>Nos réalisations</span>
            <h2 className="mb-3 font-sora text-[clamp(22px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.02em] text-[#141660]">Des solutions concrètes<br />pour des clients ambitieux.</h2>
            <p className="mb-6 text-[12.5px] leading-[1.7] text-body">Chaque projet est pensé pour l’activité de nos clients.</p>
            <Link to="/projets" className={`${tw.btn} px-7 py-3.5`}>Voir toutes nos réalisations <Arrow /></Link>
          </Reveal>
          {projects.slice(0, projectCards.length).map((pr, i) => (
            <Reveal key={pr.name} className={`min-w-0 ${projectCards[i].lift}`} delay={i * 90}>
              <ProjectCard project={pr} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================= CONFIANCE ========================== */}
      <section id="technologies" className="relative isolate pt-8 pb-16">
        <Shapes items={trustShapes} />
        <div className={`${tw.wrap} grid items-center gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.9fr_0.65fr]`}>
          <Reveal className="min-w-0 sm:col-span-2 lg:col-span-1">
            <span className={`${tw.chipSm} mb-3`}>Nos technologies</span>
            <h2 className="mb-3 font-sora text-[clamp(20px,1.8vw,26px)] leading-[1.2] font-semibold text-ink">Ils nous font confiance</h2>
            <p className="mb-6 text-[12.5px] leading-[1.7] text-body">Des outils éprouvés pour des collaborations durables avec des entreprises et organisations qui partagent notre vision.</p>
            <ul className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              {tools.map((t) => (
                <li key={t.name} className="flex items-center gap-2 text-[13px] font-semibold text-[#2a2b44]">
                  <img src={t.src} alt="" loading="lazy" className="size-5 object-contain" />{t.name}
                </li>
              ))}
            </ul>
            <Link to="/technologies" className={`${tw.link} border-b border-[#2f3bb8]/30`}>Voir toutes nos technologies <Arrow className="size-3.5 transition group-hover:translate-x-1" /></Link>
          </Reveal>
          <Reveal className="glass relative min-w-0 rounded-[26px] px-7 py-7" delay={100}>
            <span className="block h-6 font-script text-[48px] leading-none text-[#3a2bd8]">“</span>
            <p className="mt-2 mb-5 text-[12.5px] leading-[1.75] text-ink">“L’équipe d’Eray Digital a su transformer notre idée en une solution digitale performante. Professionnalisme, réactivité et créativité au top !”</p>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(120deg,#7b3cff,#5a4bff_45%,#2f5bff)] font-semibold text-white">M</span>
              <div><b className="block text-xs">Miora R.</b><small className="text-[10px] text-mute">Cliente</small></div>
            </div>
          </Reveal>
          <Reveal className="relative h-[270px] min-w-0" delay={200}>
            <span className="absolute inset-[14%_4%_0_4%] rounded-[50%_50%_40%_40%] bg-[linear-gradient(160deg,#8fc2ff,#7b3cff)] opacity-70" />
            <img src={portrait} alt="" className="relative size-full rounded-[50%_50%_28px_28px] object-contain object-bottom [mask-image:linear-gradient(#000_78%,transparent)]" />
            <span className={`${tw.script} absolute top-2 -right-3 -rotate-12 text-lg leading-[1.1] text-[#2f2bb8]`}>Des projets<br />d’exception !</span>
          </Reveal>
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="relative isolate overflow-hidden bg-[radial-gradient(420px_220px_at_4%_40%,rgba(90,120,255,.55),transparent_70%),radial-gradient(420px_240px_at_96%_60%,rgba(123,60,255,.55),transparent_70%),linear-gradient(100deg,#15147a,#26209e_50%,#1a1570)] pt-20 pb-14 text-white">
        <svg className="absolute inset-x-0 -top-px h-14 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H1440 V14 C 1180 60, 900 0, 640 34 S 200 56, 0 18 Z" fill="#fbfbff" />
        </svg>
        <span className="absolute -top-10 -left-16 h-64 w-48 rotate-[30deg] rounded-[50%] bg-[linear-gradient(180deg,rgba(143,194,255,.55),rgba(90,60,255,.2))] blur-[2px]" aria-hidden="true" />
        <span className="absolute -right-12 -bottom-20 h-72 w-60 -rotate-[25deg] rounded-[50%] bg-[linear-gradient(180deg,rgba(176,123,255,.6),rgba(47,139,255,.25))] blur-[2px]" aria-hidden="true" />
        <div className={`${tw.wrap} grid items-center gap-8 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr]`}>
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="mb-3 font-sora text-[clamp(24px,2.4vw,32px)] leading-[1.15] font-semibold text-white">Prêt à donner vie<br />à votre projet ?</h2>
            <p className="text-[13px] leading-[1.6] opacity-85">Discutons ensemble de vos idées et trouvons<br className="hidden sm:block" /> la meilleure solution pour les concrétiser.</p>
          </div>
          <Link to="/contact" className={`${tw.btnWhite} justify-self-start px-10 py-5 text-[14px] text-[#1a1570] md:justify-self-center`}>Parlons de votre projet <Arrow /></Link>
          <ul className="grid gap-3 text-[12.5px]">
            {promises.map((pr) => (
              <li key={pr.label} className="flex items-center gap-3">
                <span className="grid size-7 place-items-center rounded-full border border-[#c8beff]/40"><Icon className="size-4" stroke="#c9c2ff">{pr.icon}</Icon></span>
                {pr.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Home
