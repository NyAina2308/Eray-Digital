import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, type Shape } from '../components/Decor'
import { projects } from '../data/projects'
import portrait from '../assets/photos/woman.webp'
import teamPhoto from '../assets/photos/team.webp'
import roomPhoto from '../assets/photos/room.webp'

/* ------------------------------------------------------------------ */
/* Petits composants                                                  */
/* ------------------------------------------------------------------ */

function Arrow({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function Icon({ children, className = 'size-6', stroke = 'url(#sv-grad)' }: { children: ReactNode; className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

const ic = {
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8a4.5 4.5 0 0 1-.5 10H7z" />,
  box: <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM3 7l9 5 9-5M12 12v10" />,
  pen: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6" />,
  play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5-6-3.5z" /></>,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  rocket: <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a13 13 0 0 1 11-8 13 13 0 0 1-8 11l-3 1-2-2 1-3zM15 9h.01" />,
  user: <><circle cx="10" cy="8" r="4" /><path d="M3 21a7 7 0 0 1 14 0M16 11l2 2 4-4" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>,
  apps: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><path d="M17.5 14v7M14 17.5h7" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM8 11h.01M12 11h.01M16 11h.01" />,
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  atom: <><circle cx="12" cy="12" r="1.5" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z" /></>,
  wifi: <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01" />,
  inbox: <path d="M3 13l3-8h12l3 8v6H3v-6zM3 13h5l1 3h6l1-3h5" />,
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
}

const wrap = 'relative z-[1] mx-auto w-full max-w-[1240px] px-6'
const chip = 'inline-block rounded-full border border-violet/35 bg-white/70 px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.18em] text-[#3a2bd8] uppercase'
const chipDark = 'inline-block rounded-full border border-[#c8beff]/40 bg-white/5 px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-[#d8d2ff] uppercase'
const eyebrow = 'mb-2 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] text-[#3a2bd8] uppercase before:size-1 before:rounded-full before:bg-[#3a2bd8]'
const h2 = 'mb-3 font-sora text-[clamp(22px,2.1vw,28px)] leading-[1.12] font-bold tracking-[-0.03em] text-ink'
const lead = 'mb-2 text-[12.5px] leading-[1.55] font-medium text-ink-2'
const text = 'mb-3.5 text-[11.5px] leading-[1.6] text-body'
const btn = 'btn-blue group inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 font-sora text-[12px] font-semibold transition hover:-translate-y-0.5'
const panel = 'glass relative overflow-hidden rounded-[30px]'
const device = 'absolute overflow-hidden border-[#0d0e24] bg-[#0d0e24] shadow-[0_22px_34px_-14px_rgba(40,30,160,.65)]'
/** Halo lavande translucide derrière les visuels. */
const halo = 'pointer-events-none absolute rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-[radial-gradient(circle_at_50%_50%,rgba(150,120,255,.38),rgba(170,150,255,.18)_50%,transparent_72%)]'

function Checks({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid gap-1.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[11.5px] leading-[1.4] text-body">
          <svg viewBox="0 0 24 24" className="mt-px size-3.5 shrink-0" fill="none" stroke="#3a4bff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg>
          {t}
        </li>
      ))}
    </ul>
  )
}

function Discover({ to }: { to: string }) {
  return <Link to={to} className={btn}>Découvrir ce service <Arrow className="size-3.5 transition group-hover:translate-x-1" /></Link>
}

/** Mini tableau de bord sombre (écrans des ordinateurs et panneaux flottants). */
function MiniDash({ rings = false }: { rings?: boolean }) {
  return (
    <div className="flex h-full overflow-hidden rounded-[6px] bg-[#0f1034]">
      <aside className="grid w-[16%] content-start gap-1.5 bg-[#0a0b2e] px-1.5 py-2.5">
        {Array.from({ length: 6 }, (_, i) => <span key={i} className={`h-1 rounded ${i ? 'bg-white/20' : 'bg-[#6a8bff]'}`} />)}
      </aside>
      <div className="grid flex-1 grid-rows-[auto_1fr] gap-1.5 p-2">
        <div className="grid grid-cols-3 gap-1">
          {rings
            ? [0, 1, 2].map((i) => <span key={i} className="mx-auto aspect-square w-[70%] rounded-full border-[3px] border-[#5a7bff] border-r-[#b07bff] shadow-[0_0_10px_rgba(110,140,255,.7)]" />)
            : ['1 284', '342', '98%'].map((k) => (
                <div key={k} className="rounded bg-white/8 px-1.5 py-1"><small className="block text-[5px] text-white/50">KPI</small><b className="text-[8px] text-white">{k}</b></div>
              ))}
        </div>
        <div className="flex items-end gap-[6%] rounded bg-white/5 p-2">
          {[40, 65, 50, 80, 55, 90, 70].map((h, i) => <i key={i} className="flex-1 rounded-t-sm bg-[linear-gradient(#b07bff,#2f5bff)]" style={{ height: `${h}%` }} />)}
        </div>
      </div>
    </div>
  )
}

/** Écran de téléphone : appli sombre avec anneaux lumineux. */
function PhoneScreen({ image }: { image?: string }) {
  if (image) return <img src={image} alt="" className="size-full object-cover object-top" />
  return (
    <div className="grid h-full content-start gap-2 bg-[radial-gradient(circle_at_60%_30%,#3a2bd8,#141347_55%,#0a0b2e)] p-2.5">
      <i className="h-1 w-1/2 rounded bg-white/25" />
      <span className="mx-auto mt-1 aspect-square w-[62%] rounded-full border-[4px] border-[#5a7bff] border-r-[#c08bff] shadow-[0_0_16px_rgba(120,140,255,.8)]" />
      <div className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => <i key={i} className="aspect-square rounded-md bg-white/10" />)}
      </div>
    </div>
  )
}

/** Petit badge flottant (techno, plateforme…). */
function Badge({ icon, label, className }: { icon: ReactNode; label: string; className: string }) {
  return (
    <div className={`glass absolute z-[3] grid place-items-center gap-1 rounded-2xl px-3.5 py-3 text-[9px] font-medium text-ink-2 ${className}`}>
      <Icon className="size-6">{icon}</Icon>{label}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Données                                                            */
/* ------------------------------------------------------------------ */

const strengths = [
  { icon: ic.bulb, title: 'Innovation', text: 'Des solutions modernes' },
  { icon: ic.user, title: 'Expertise', text: 'Une équipe qualifiée' },
  { icon: ic.target, title: 'Accompagnement', text: 'De la conception au suivi' },
]

const tabs = [
  { id: 'web-mobile', icon: ic.code, label: 'Développement web & mobile' },
  { id: 'design', icon: ic.pen, label: 'Design numérique & UI/UX' },
  { id: 'automatisation', icon: ic.rocket, label: 'Automatisation des processus' },
  { id: 'applications', icon: ic.apps, label: 'Applications web & mobiles' },
  { id: 'iot', icon: ic.bolt, label: 'Électronique & IoT' },
  { id: 'conseil', icon: ic.chat, label: 'Conseil & Accompagnement' },
]

const flow = [
  { icon: ic.inbox, label: 'Collecter' },
  { icon: ic.user, label: 'Traiter' },
  { icon: ic.cog, label: 'Automatiser' },
  { icon: ic.clock, label: 'Gagner du temps' },
]

const heroShapes: Shape[] = [
  { kind: 'orb', pos: { left: '50%', top: '18%' }, size: 14, tone: 'blue' },
  { kind: 'gem', pos: { right: '2%', top: '30%' }, size: 26, rotate: 18, tone: 'violet' },
  { kind: 'spark', pos: { left: '44%', bottom: '10%' }, size: 12, tone: 'violet' },
]

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

function ServicesPage() {
  const [active, setActive] = useState(tabs[0].id)

  // Onglet actif = section de service visible au centre de l'écran
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    tabs.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative overflow-hidden bg-[#fbfbff] font-sora text-ink">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient id="sv-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f8bff" />
            <stop offset="1" stopColor="#7b3cff" />
          </linearGradient>
        </defs>
      </svg>

      {/* ============================== HERO ============================== */}
      <section className="isolate relative pt-[104px] pb-8">
        <Shapes items={heroShapes} />
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="min-w-0">
            <span className={`${chip} mb-3`}>Nos services</span>
            <h1 className="mb-4 font-sora text-[clamp(28px,3vw,40px)] leading-[1.1] font-bold tracking-[-0.035em] text-ink">
              Des solutions digitales<br />sur mesure pour faire<br />grandir <span className="text-grad">votre entreprise</span>
            </h1>
            <p className="mb-8 max-w-[460px] text-[12.5px] leading-[1.6] text-body">
              Chez Eray Digital, nous transformons vos idées en solutions technologiques performantes. Découvrez nos
              services conçus pour accompagner votre transformation digitale, de A à Z.
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {strengths.map((s) => (
                <li key={s.title} className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white shadow-[0_10px_22px_-10px_rgba(90,60,255,.6)]"><Icon className="size-5">{s.icon}</Icon></span>
                  <span><b className="block text-[11.5px] font-semibold text-ink-2">{s.title}</b><small className="text-[9.5px] text-mute">{s.text}</small></span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative h-[340px] min-w-0 sm:h-[440px]" delay={120}>
            {/* Note manuscrite */}
            <span className="absolute top-[2%] left-0 z-[4] hidden -rotate-12 font-script text-[21px] leading-[1.15] text-[#3a2bd8] italic sm:block">Votre vision<br />&nbsp;&nbsp;Notre expertise</span>
            <svg className="absolute top-[17%] left-[13%] z-[4] hidden w-9 sm:block" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <path d="M6 6 C 30 4, 48 18, 46 46" stroke="#3a2bd8" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M38 38 L46 48 L54 37" stroke="#3a2bd8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Bulle de verre */}
            <span className="absolute inset-[4%_0_0_14%] rounded-[48%_52%_40%_60%/52%_44%_56%_48%] border-2 border-white/80 bg-[linear-gradient(140deg,rgba(143,194,255,.45),rgba(150,120,255,.35)_55%,rgba(201,181,255,.5))] shadow-[0_40px_80px_-30px_rgba(70,50,220,.55)]" />
            {/* Portrait */}
            <div className="absolute inset-[8%_14%_4%_22%] z-[1] overflow-hidden rounded-[44%_56%_40%_60%/50%_46%_54%_50%]">
              <img src={portrait} alt="" className="size-full object-cover object-[50%_35%]" />
            </div>
            {/* Panneaux sombres flottants */}
            <div className="absolute top-[6%] right-[2%] z-[2] aspect-[4/3] w-[34%] animate-float rounded-[10px] border-[3px] border-[#1d1e4a] [transform:perspective(900px)_rotateY(-16deg)_rotate(3deg)]">
              <MiniDash rings />
            </div>
            <div className="absolute top-[32%] left-[12%] z-[2] hidden aspect-[3/4] w-[16%] animate-float-slow rounded-[10px] border-[3px] border-[#1d1e4a] sm:block [transform:perspective(900px)_rotateY(18deg)_rotate(-4deg)]">
              <PhoneScreen />
            </div>
            <div className="absolute right-[12%] bottom-[14%] z-[3] w-[24%] animate-float rounded-2xl border border-white/30 bg-[linear-gradient(150deg,rgba(90,110,255,.85),rgba(40,30,160,.9))] p-3.5 text-[clamp(10px,1vw,13px)] leading-[1.3] font-semibold text-white shadow-[0_24px_40px_-14px_rgba(40,30,160,.7)] backdrop-blur [animation-delay:-3s]">
              Transformer<br />Vos idées<br />en solutions
            </div>
            {/* Vague avant */}
            <svg className="pointer-events-none absolute inset-0 z-[3] size-full" viewBox="0 0 600 440" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="hw" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#8fc2ff" stopOpacity=".8" />
                  <stop offset=".5" stopColor="#7b5bff" stopOpacity=".55" />
                  <stop offset="1" stopColor="#c9b5ff" stopOpacity=".7" />
                </linearGradient>
              </defs>
              <path d="M90 410 C 200 360, 330 430, 450 400 S 580 330, 600 300 L600 340 C 560 400, 470 440, 360 438 S 160 420, 90 430 Z" fill="url(#hw)" />
              <path d="M90 410 C 200 360, 330 430, 450 400 S 580 330, 600 300" stroke="#fff" strokeOpacity=".85" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </Reveal>
        </div>
      </section>

      {/* ========================== ONGLETS =============================== */}
      <nav className={`${wrap} mb-6`} aria-label="Nos services">
        <div className="glass grid items-center gap-2 rounded-[26px] px-5 py-3 lg:grid-cols-[190px_1fr]">
          <div className="hidden border-r border-violet/15 pr-4 lg:block">
            <b className="block text-[15px] font-semibold text-ink-2">Nos services</b>
            <small className="text-[9.5px] text-mute">Tout ce dont vous avez besoin</small>
          </div>
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-6">
            {tabs.map((t) => (
              <li key={t.id} className="shrink-0">
                <a
                  href={`#${t.id}`}
                  className={`relative grid min-w-[110px] justify-items-center gap-1.5 px-2 pt-1 pb-2.5 text-center text-[10px] leading-[1.25] transition after:absolute after:inset-x-[18%] after:bottom-0 after:h-[3px] after:rounded-full after:bg-[linear-gradient(90deg,#2f8bff,#7b3cff)] after:transition ${active === t.id ? 'font-semibold text-ink-2 after:opacity-100' : 'text-body after:opacity-0 hover:text-ink-2'}`}
                >
                  <span className="grid size-8 place-items-center rounded-full bg-white shadow-[0_8px_18px_-8px_rgba(90,60,255,.6)]"><Icon className="size-4">{t.icon}</Icon></span>
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={`${wrap} grid gap-5 pb-14`}>
        {/* ===================== 01 · WEB & MOBILE ====================== */}
        <Reveal as="section" id="web-mobile" className="relative grid scroll-mt-28 items-center gap-6 py-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="min-w-0 lg:pl-8">
            <p className={eyebrow}>01 / Service</p>
            <h2 className={h2}>Développement web<br />&amp; mobile</h2>
            <p className={lead}>Des applications performantes, modernes et évolutives pour répondre à vos besoins métiers.</p>
            <p className={text}>Nous concevons des sites web et des applications mobiles sur mesure, optimisés pour la performance, la sécurité et l’expérience utilisateur.</p>
            <Checks className="mb-5" items={['Sites vitrines et e-commerce', 'Applications web sur mesure', 'Applications mobiles (iOS & Android)', 'Maintenance et évolution']} />
            <Discover to="/services/developpement-web" />
          </div>
          <div className="relative h-[300px] min-w-0 sm:h-[340px]">
            <span className={`${halo} inset-[0_0_-4%_6%]`} />
            <Badge icon={ic.atom} label="React" className="top-[12%] left-[2%]" />
            <Badge icon={ic.bolt} label="Flutter" className="top-[50%] left-[0%]" />
            {/* Ordinateur */}
            <div className="absolute top-[8%] left-[24%] z-[1] w-[50%] [transform:perspective(1200px)_rotateY(-14deg)_rotate(-3deg)]">
              <div className="aspect-[16/10.5] rounded-[10px_10px_3px_3px] border-[5px] border-[#0d0e24] shadow-[0_30px_50px_-20px_rgba(40,30,160,.6)]">
                <img src={projects[1].image} alt="" className="size-full rounded-[4px] object-cover object-top" />
              </div>
              <div className="mx-[-8%] h-3 rounded-b-[14px] bg-[linear-gradient(#e6e7f2,#b9bbd0)]" />
            </div>
            {/* Téléphone */}
            <div className={`${device} top-[34%] left-[18%] z-[2] aspect-[9/18] w-[15%] -rotate-[8deg] rounded-[18px] border-[4px]`}><PhoneScreen /></div>
            {/* Compteur */}
            <div className="glass absolute top-[6%] right-[0%] z-[3] rounded-2xl px-5 py-4">
              <Icon className="mb-1 size-5">{ic.code}</Icon>
              <b className="block text-[26px] leading-none font-semibold text-[#3a4bff]">+250</b>
              <small className="text-[10px] text-mute">projets réalisés</small>
            </div>
            <div className="glass absolute right-[4%] bottom-[16%] z-[3] flex items-center gap-2 rounded-full px-4 py-2 text-[9px] text-mute">
              <Icon className="size-4">{ic.phone}</Icon><Icon className="size-4">{ic.atom}</Icon>iOS &amp; Android
            </div>
          </div>
        </Reveal>

        {/* ===================== 02 · DESIGN UI/UX ====================== */}
        <Reveal as="section" id="design" className={`${panel} grid scroll-mt-28 items-center gap-6 p-4 lg:grid-cols-[1.05fr_1fr_0.5fr]`}>
          <div className="relative h-[260px] min-w-0 overflow-hidden rounded-[24px] sm:h-[300px]">
            <img src={teamPhoto} loading="lazy" decoding="async" alt="" className="size-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_40%,rgba(150,120,255,.35))]" />
            <div className={`${device} top-[16%] right-[6%] aspect-[16/11] w-[40%] rotate-[4deg] rounded-[8px] border-[3px]`}><MiniDash /></div>
            <div className={`${device} right-[38%] bottom-[10%] aspect-[9/18] w-[13%] -rotate-[6deg] rounded-[12px] border-[3px]`}><PhoneScreen /></div>
          </div>
          <div className="min-w-0 py-2">
            <p className={eyebrow}>02 / Service</p>
            <h2 className={h2}>Design numérique<br />&amp; UI/UX</h2>
            <p className={lead}>Des interfaces modernes et intuitives pour offrir une expérience utilisateur exceptionnelle.</p>
            <p className={text}>Nous créons des designs qui allient esthétique, ergonomie et performance, pour valoriser votre marque et faciliter l’interaction avec vos utilisateurs.</p>
            <Checks className="mb-5" items={['UX Research & parcours utilisateur', 'UI Design moderne et responsive', 'Identité visuelle digitale', 'Prototypage et tests utilisateurs']} />
            <Discover to="/services/design-graphique" />
          </div>
          <div className="glass relative min-h-[220px] overflow-hidden rounded-[24px] p-5">
            <Icon className="mb-3 size-7">{ic.shield}</Icon>
            <h3 className="mb-2 text-[14px] leading-[1.25] font-semibold text-ink-2">Une expérience<br />qui marque</h3>
            <p className="text-[10.5px] leading-[1.5] text-mute">Parce qu’un bon design ne se voit pas seulement, il se ressent.</p>
            <span className="absolute -right-4 -bottom-4 size-20 rounded-full bg-[radial-gradient(circle_at_32%_28%,#fff_0_8%,#b69cff_30%,#5a2bd8_80%)] shadow-[0_14px_30px_-8px_rgba(90,60,255,.6)]" />
          </div>
        </Reveal>

        {/* =================== 03 · AUTOMATISATION ====================== */}
        <Reveal as="section" id="automatisation" className={`${panel} grid scroll-mt-28 items-center gap-6 p-6 lg:grid-cols-[0.95fr_0.85fr_0.7fr_0.55fr] lg:pl-8`}>
          <div className="min-w-0">
            <p className={eyebrow}>03 / Service</p>
            <h2 className={h2}>Automatisation<br />des processus</h2>
            <p className={lead}>Gagnez en efficacité et en productivité grâce à l’automatisation intelligente.</p>
            <p className={text}>Nous vous aidons à automatiser vos tâches répétitives et à optimiser vos processus métiers avec des solutions sur mesure et évolutives.</p>
            <Checks className="mb-5" items={['Automatisation des workflows', 'Intégration d’outils et API', 'Robotic Process Automation (RPA)', 'Tableaux de bord et suivi']} />
            <Discover to="/services/solutions-digitales" />
          </div>
          {/* Robot + tuiles */}
          <div className="relative h-[240px] min-w-0">
            <span className={`${halo} inset-[4%]`} />
            <div className="absolute top-[14%] left-[30%] z-[2] grid w-[40%] justify-items-center animate-float">
              <div className="grid h-[70px] w-full place-items-center rounded-[40%] bg-[linear-gradient(160deg,#fff,#dcdcf2)] shadow-[0_18px_30px_-12px_rgba(60,50,180,.5)]">
                <div className="flex h-[44px] w-[78%] items-center justify-center gap-4 rounded-[40%] bg-[#0d0e24]">
                  {[0, 1].map((i) => <i key={i} className="size-3.5 rounded-full bg-[#4fa8ff] shadow-[0_0_12px_#4fa8ff]" />)}
                </div>
              </div>
              <div className="-mt-1 h-[60px] w-[78%] rounded-[38%_38%_30%_30%] bg-[linear-gradient(160deg,#fff,#d6d6ee)] shadow-[0_18px_30px_-12px_rgba(60,50,180,.5)]">
                <i className="mx-auto mt-3 block size-4 rounded-full bg-[#5a7bff] shadow-[0_0_10px_#5a7bff]" />
              </div>
            </div>
            {[ic.cloud, ic.cog, ic.code, ic.box, ic.inbox, ic.chip].map((c, i) => (
              <span
                key={i}
                className="glass absolute z-[1] grid size-10 place-items-center rounded-xl"
                style={[{ left: '4%', top: '10%' }, { right: '6%', top: '6%' }, { left: '0%', top: '52%' }, { right: '2%', top: '46%' }, { left: '18%', bottom: '4%' }, { right: '20%', bottom: '2%' }][i]}
              >
                <Icon className="size-5">{c}</Icon>
              </span>
            ))}
          </div>
          {/* Flux */}
          <ol className="relative grid gap-2">
            <span className="absolute top-[12%] right-[6px] bottom-[12%] w-[3px] rounded-full bg-[linear-gradient(#2f8bff,#7b3cff)]" aria-hidden="true" />
            {flow.map((f) => (
              <li key={f.label} className="glass flex items-center gap-2.5 rounded-xl py-2.5 pr-6 pl-3 text-[11px] font-medium text-ink-2">
                <Icon className="size-4">{f.icon}</Icon>{f.label}
              </li>
            ))}
          </ol>
          <div className="glass relative min-h-[200px] overflow-hidden rounded-[24px] p-5">
            <small className="block text-[10px] text-mute">Jusqu’à</small>
            <b className="block text-[30px] leading-none font-semibold text-[#3a4bff]">70%</b>
            <p className="mt-1 mb-4 text-[10.5px] text-body">d’économies de temps</p>
            <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(145deg,#7b5bff,#3a2bd8)] shadow-[0_10px_20px_-8px_rgba(90,60,255,.7)]"><Icon className="size-4" stroke="#fff">{ic.clock}</Icon></span>
            <span className="absolute -right-6 -bottom-8 h-24 w-32 -rotate-[20deg] rounded-[50%] bg-[linear-gradient(135deg,rgba(143,194,255,.6),rgba(150,120,255,.5))]" />
          </div>
        </Reveal>

        {/* ================== 04 · APPLICATIONS ========================= */}
        <Reveal as="section" id="applications" className="relative grid scroll-mt-28 items-center gap-6 py-6 lg:grid-cols-[1fr_0.95fr_0.5fr] lg:pl-8">
          <div className="min-w-0">
            <p className={eyebrow}>04 / Service</p>
            <h2 className={h2}>Applications web &amp; mobiles</h2>
            <p className={lead}>Des applications sur mesure pour répondre à vos besoins spécifiques.</p>
            <p className={text}>Nous développons des solutions robustes, évolutives et sécurisées, qu’il s’agisse d’applications web ou mobiles, pour vous aider à innover et à rester compétitif.</p>
            <Checks className="mb-5" items={['Applications métier sur mesure', 'Solutions SaaS', 'Applications mobiles (iOS & Android)', 'Intégration et interconnexion']} />
            <Discover to="/services/developpement-logiciel" />
          </div>
          <div className="relative h-[260px] min-w-0">
            <span className={`${halo} inset-[0_-6%]`} />
            <div className={`${device} top-[10%] left-[10%] z-[1] aspect-[9/18] w-[24%] -rotate-[14deg] rounded-[22px] border-[5px]`}><PhoneScreen /></div>
            <div className={`${device} top-[4%] left-[36%] z-[2] aspect-[9/18] w-[26%] -rotate-[4deg] rounded-[22px] border-[5px]`}><PhoneScreen image={projects[2]?.image ?? projects[0].image} /></div>
            <div className="glass absolute top-[16%] right-[6%] z-[1] grid aspect-[9/17] w-[24%] rotate-[10deg] place-items-center rounded-[22px]">
              <Icon className="size-9">{ic.rocket}</Icon>
            </div>
          </div>
          <div className="glass min-h-[180px] rounded-[24px] p-5">
            <Icon className="mb-3 size-6">{ic.sparkle}</Icon>
            <h3 className="mb-2 text-[14px] leading-[1.25] font-semibold text-ink-2">Des solutions<br />sur mesure</h3>
            <p className="text-[10.5px] leading-[1.5] text-mute">Chaque projet est unique. Nous créons des applications qui vous ressemblent.</p>
          </div>
        </Reveal>

        {/* ====================== 05 · IOT =============================== */}
        <Reveal as="section" id="iot" className={`${panel} grid scroll-mt-28 items-center gap-6 p-4 lg:grid-cols-[1.05fr_1fr_0.6fr]`}>
          <div className="relative h-[220px] min-w-0 overflow-hidden rounded-[24px] bg-[linear-gradient(140deg,#e9eeff,#dcd4ff)]">
            <svg className="absolute inset-0 size-full opacity-60" viewBox="0 0 400 220" fill="none" aria-hidden="true">
              <path d="M0 160 C 80 120, 160 190, 260 140 S 380 90, 400 100" stroke="#8fc2ff" strokeWidth="2" />
              <path d="M0 60 H120 V110 H220 M260 30 V90 H400" stroke="#b69cff" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
            <span className="absolute top-[10%] left-[6%] z-[2] grid h-10 w-12 place-items-center rounded-xl bg-[linear-gradient(145deg,#7b5bff,#3a2bd8)] text-[15px] font-bold text-white shadow-[0_10px_20px_-8px_rgba(90,60,255,.7)]">IoT</span>
            {/* Carte électronique */}
            <div className="absolute top-[26%] left-[14%] z-[1] h-[56%] w-[52%] rounded-[10px] bg-[linear-gradient(150deg,#1d2a7a,#0a0b2e)] p-3 shadow-[0_24px_40px_-14px_rgba(40,30,160,.7)] [transform:perspective(700px)_rotateX(28deg)_rotate(-6deg)]">
              <div className="grid h-full grid-cols-4 gap-2">
                {Array.from({ length: 8 }, (_, i) => <i key={i} className={`rounded-[3px] ${i === 2 || i === 5 ? 'bg-[#4fa8ff] shadow-[0_0_10px_#4fa8ff]' : 'bg-white/15'}`} />)}
              </div>
            </div>
            <span className="glass absolute top-[18%] left-[42%] z-[2] grid size-8 place-items-center rounded-lg"><Icon className="size-4">{ic.wifi}</Icon></span>
            <div className="glass absolute right-[4%] bottom-[16%] z-[2] rounded-2xl px-4 py-3 text-[10px] leading-[1.4] text-ink-2">
              <Icon className="mb-1 ml-auto size-5">{ic.wifi}</Icon>
              Objets connectés<br />= Plus d’opportunités
            </div>
          </div>
          <div className="min-w-0">
            <p className={eyebrow}>05 / Service</p>
            <h2 className={h2}>Électronique &amp; IoT</h2>
            <p className={lead}>Connectez vos équipements et donnez vie à vos idées.</p>
            <p className={text}>Nous concevons des solutions électroniques et IoT pour rendre vos objets intelligents et connectés.</p>
            <Discover to="/contact" />
          </div>
          <Checks items={['Prototypage électronique', 'Objets connectés (IoT)', 'Systèmes embarqués', 'Suivi et maintenance']} />
        </Reveal>

        {/* ===================== 06 · CONSEIL ============================ */}
        <Reveal as="section" id="conseil" className={`${panel} grid scroll-mt-28 items-center gap-6 p-4 lg:grid-cols-[0.95fr_0.75fr_1fr] lg:pl-8`}>
          <div className="min-w-0 py-2">
            <p className={eyebrow}>06 / Service</p>
            <h2 className={h2}>Conseil &amp; Accompagnement digital</h2>
            <p className={lead}>Un accompagnement stratégique pour réussir votre transformation digitale.</p>
            <p className="text-[11.5px] leading-[1.6] text-body">Nous vous guidons à chaque étape de votre projet, de la réflexion à la mise en œuvre, avec des conseils personnalisés et une expertise ciblée.</p>
          </div>
          <div className="grid gap-5">
            <Checks items={['Audit et stratégie digitale', 'Formation et transfert de compétences', 'Accompagnement de projet', 'Support et maintenance']} />
            <Discover to="/contact" />
          </div>
          <div className="relative h-[220px] min-w-0 overflow-hidden rounded-[24px]">
            <img src={roomPhoto} loading="lazy" decoding="async" alt="" className="size-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(60,40,200,.25),transparent_50%,rgba(60,40,200,.3))]" />
            <div className="absolute top-[10%] left-[5%] rounded-xl border border-white/30 bg-[rgba(40,30,160,.75)] px-3 py-2 text-[10.5px] leading-[1.3] font-semibold text-white backdrop-blur">Votre réussite<br />est notre objectif</div>
            <div className="absolute right-[5%] bottom-[12%] rounded-xl border border-white/30 bg-[rgba(40,30,160,.75)] px-3 py-2 text-[10.5px] leading-[1.3] font-semibold text-white backdrop-blur">Votre réussite<br /><span className="font-normal text-white/80">notre priorité</span></div>
          </div>
        </Reveal>
      </div>

      {/* ============================== CTA =============================== */}
      <section className="relative mt-4 overflow-hidden bg-[linear-gradient(100deg,#15147a,#2a1f9e_50%,#1a1570)] pt-14 pb-12 text-white">
        <svg className="absolute inset-x-0 -top-px h-12 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 0 H1440 V20 C 1200 60, 980 0, 720 30 S 240 60, 0 16 Z" fill="#fbfbff" />
        </svg>
        <span className="absolute top-1/2 left-[4%] size-16 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff_0_6%,#9fc0ff_18%,#3a4bff_55%,#1a1570)] shadow-[0_0_40px_rgba(90,120,255,.7)]" aria-hidden="true" />
        <span className="absolute -right-10 -bottom-16 h-56 w-80 rotate-[-20deg] rounded-[50%] bg-[linear-gradient(135deg,rgba(111,168,255,.6),rgba(123,60,255,.4))] blur-[2px]" aria-hidden="true" />
        <span className="absolute top-0 right-[18%] h-40 w-24 rotate-[30deg] rounded-[50%] bg-[linear-gradient(180deg,rgba(176,123,255,.5),transparent)]" aria-hidden="true" />
        <svg className="pointer-events-none absolute top-0 right-0 h-full w-[46%]" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M120 200 C 220 120, 320 170, 420 90 S 560 10, 600 0 L600 200 Z" fill="rgba(111,168,255,.35)" />
          <path d="M260 200 C 340 150, 430 170, 500 110 S 580 60, 600 50 L600 200 Z" fill="rgba(176,123,255,.35)" />
          <path d="M120 200 C 220 120, 320 170, 420 90 S 560 10, 600 0" stroke="rgba(255,255,255,.6)" strokeWidth="2" />
        </svg>
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[1fr_1fr_auto] lg:pl-24`}>
          <div>
            <span className={`${chipDark} mb-3`}>Prêt à donner vie à votre projet ?</span>
            <h2 className="font-sora text-[clamp(26px,2.6vw,36px)] leading-[1.08] font-bold text-white">
              Votre vision,<br /><span className="bg-[linear-gradient(95deg,#b07bff,#6fa8ff)] bg-clip-text text-transparent">notre expertise.</span>
            </h2>
          </div>
          <p className="text-[12.5px] leading-[1.6] text-white/90">Parlons de votre projet et découvrons ensemble comment nos services peuvent faire la différence.</p>
          <Link to="/contact" className="inline-flex items-center gap-3 justify-self-start rounded-full bg-white px-7 py-4 text-[13px] font-semibold text-[#3a2bd8] shadow-[0_20px_40px_-14px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5">
            Parlons de votre projet <Arrow />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
