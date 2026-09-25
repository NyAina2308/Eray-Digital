import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, DrawnArrow, type Shape } from '../components/Decor'
import { projects } from '../data/projects'

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
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8a4.5 4.5 0 0 1-.5 10H7z" />,
  box: <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM3 7l9 5 9-5M12 12v10" />,
  pen: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6" />,
  star: <path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9L12 3z" />,
  play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l6-3.5-6-3.5z" /></>,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" /></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 9v12" /></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z" /><path d="M7.5 11h.01M10 7h.01M15 7.5h.01" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  gauge: <><path d="M4 18a9 9 0 1 1 16 0" /><path d="M12 14l4-5" /><circle cx="12" cy="14" r="1.5" /></>,
  rocket: <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 11a13 13 0 0 1 11-8 13 13 0 0 1-8 11l-3 1-2-2 1-3zM15 9h.01" />,
  loop: <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3M18 3v4h-4M6 21v-4h4" />,
  left: <path d="M19 12H5M11 6l-6 6 6 6" />,
}

const wrap = 'relative z-[1] mx-auto w-full max-w-[1240px] px-6'
const chip = 'inline-block rounded-full border border-violet/35 bg-white/70 px-2.5 py-[3px] text-[9px] font-semibold tracking-[0.18em] text-[#3a2bd8] uppercase'
const chipDark = 'inline-block rounded-full border border-[#c8beff]/40 bg-white/5 px-3 py-1 text-[9px] font-semibold tracking-[0.18em] text-[#d8d2ff] uppercase'
const h2 = 'mb-4 font-sora text-[clamp(26px,2.4vw,34px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink'
const btn = 'btn-blue inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5'
const link = 'group inline-flex items-center gap-2 text-[11.5px] font-semibold text-[#2f3bb8]'

/** Écran sombre façon maquette : texte + cubes lumineux. */
function DarkScreen({ children, small = false }: { children?: ReactNode; small?: boolean }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[6px] bg-[radial-gradient(circle_at_75%_65%,#3a2bd8_0,#141347_45%,#0a0b2e_80%)] p-[8%]">
      <div className="mb-[10%] flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1 w-6 rounded bg-white/15" />)}</div>
      <p className={`font-sora leading-[1.15] font-semibold text-white ${small ? 'text-[9px]' : 'text-[clamp(12px,1.35vw,19px)]'}`}>{children}</p>
      <span className="mt-[8%] block h-2 w-[26%] rounded-full bg-[#3a4bff]" />
      <div className="absolute right-[10%] bottom-[14%] grid grid-cols-2 gap-1.5 [transform:rotate(-18deg)]">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} className="size-[clamp(12px,1.6vw,22px)] rounded-[4px] bg-[linear-gradient(145deg,#c9a8ff,#6a3cff_60%,#2f1b9e)] shadow-[0_0_18px_rgba(140,100,255,.8)]" />
        ))}
      </div>
    </div>
  )
}

function MiniDash() {
  return (
    <div className="flex h-full overflow-hidden rounded-[6px] bg-[#0f1034]">
      <aside className="grid w-[18%] content-start gap-1.5 bg-[#0a0b2e] px-1.5 py-2.5">
        {Array.from({ length: 6 }, (_, i) => <span key={i} className={`h-1 rounded ${i ? 'bg-white/20' : 'bg-[#6a8bff]'}`} />)}
      </aside>
      <div className="grid flex-1 grid-rows-[auto_1fr] gap-1.5 p-2">
        <div className="grid grid-cols-3 gap-1">
          {['1 284', '342', '98%'].map((k) => (
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

/** Grandes vagues de verre translucides (bleu → lavande) autour du visuel du hero. */
function GlassWaves({ front = false }: { front?: boolean }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 size-full ${front ? 'z-[3]' : 'z-0'}`} viewBox="0 0 600 460" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gw-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fc2ff" stopOpacity=".75" />
          <stop offset=".5" stopColor="#6a7bff" stopOpacity=".45" />
          <stop offset="1" stopColor="#c9b5ff" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="gw-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset="1" stopColor="#b69cff" stopOpacity=".35" />
        </linearGradient>
      </defs>
      {front ? (
        <>
          <path d="M20 390 C 110 340, 210 410, 330 392 S 520 330, 600 350 L600 380 C 520 368, 430 430, 320 428 S 110 400, 20 420 Z" fill="url(#gw-a)" opacity=".75" />
          <path d="M20 390 C 110 340, 210 410, 330 392 S 520 330, 600 350" stroke="url(#gw-b)" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M150 30 C 260 -20, 380 20, 400 90 C 420 170, 330 190, 300 260 C 270 330, 330 420, 230 450 C 120 480, 40 380, 70 280 C 100 180, 60 80, 150 30 Z" fill="url(#gw-a)" opacity=".55" />
          <path d="M150 30 C 260 -20, 380 20, 400 90" stroke="url(#gw-b)" strokeWidth="3" />
          <path d="M430 60 C 520 40, 600 120, 590 220 C 580 320, 500 330, 470 280 C 440 230, 510 190, 470 130 C 450 100, 400 80, 430 60 Z" fill="url(#gw-a)" opacity=".45" />
          <path d="M430 60 C 520 40, 600 120, 590 220" stroke="url(#gw-b)" strokeWidth="2.5" />
        </>
      )}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Données                                                            */
/* ------------------------------------------------------------------ */

const pillars = [
  { icon: ic.globe, label: 'Web' },
  { icon: ic.box, label: 'Logiciel' },
  { icon: ic.pen, label: 'Design' },
  { icon: ic.cloud, label: 'Digital' },
]

const device = 'absolute overflow-hidden rounded-[10px] border-[4px] border-[#0d0e24] bg-[#0d0e24] shadow-[0_22px_34px_-14px_rgba(40,30,160,.65)]'

const services = [
  {
    num: '01',
    slug: 'developpement-web',
    icon: ic.code,
    title: 'Développement Web',
    text: 'Sites vitrines, e-commerce, portails sur mesure, applications web performantes et évolutives.',
    shape: 'rounded-[70px_40px_60px_90px/60px_50px_70px_80px]',
    visual: (
      <>
        <div className={`${device} top-[6%] left-[2%] h-[62%] w-[74%] -rotate-6`}><img src={projects[1].image} alt="" className="size-full object-cover object-top" /></div>
        <div className={`${device} top-[34%] right-[-6%] h-[50%] w-[52%] rotate-[8deg]`}><img src={projects[0].image} alt="" className="size-full object-cover object-top" /></div>
      </>
    ),
  },
  {
    num: '02',
    slug: 'developpement-logiciel',
    icon: ic.monitor,
    title: 'Développement Logiciel',
    text: 'Logiciels métier, applications sur mesure, maintenance et évolution de vos outils.',
    shape: 'rounded-[40px_80px_70px_50px/50px_70px_60px_60px]',
    visual: <div className={`${device} top-[10%] left-[6%] h-[74%] w-[104%] [transform:perspective(700px)_rotateY(-14deg)_rotate(-4deg)]`}><MiniDash /></div>,
  },
  {
    num: '03',
    slug: 'design-graphique',
    icon: ic.pen,
    title: 'Design Graphique',
    text: 'Identité visuelle, supports de communication, logos, charte graphique, et design UI/UX.',
    shape: 'rounded-[80px_50px_40px_70px/70px_60px_50px_60px]',
    visual: (
      <>
        <div className="absolute top-[2%] left-[6%] grid h-[82%] w-[48%] -rotate-[10deg] place-items-center rounded-[14px] bg-[linear-gradient(160deg,#1a1570,#0a0b2e)] shadow-[0_22px_34px_-14px_rgba(40,30,160,.7)]">
          <img src="/eray-logo.png" alt="" className="w-[70%] rounded-lg bg-white p-[3px]" />
        </div>
        <div className={`${device} top-[36%] right-[-8%] h-[52%] w-[58%] rotate-[10deg]`}><img src={projects[4]?.image ?? projects[0].image} alt="" className="size-full object-cover object-top" /></div>
      </>
    ),
  },
  {
    num: '04',
    slug: 'solutions-digitales',
    icon: ic.cloud,
    title: 'Solutions Digitales',
    text: 'Automatisation, intégration, transformation digitale et conseil stratégique.',
    shape: 'rounded-[50px_90px_60px_40px/60px_80px_50px_60px]',
    visual: (
      <div className="absolute inset-[4%_-8%_6%_4%] grid place-items-center rounded-[46%_54%_40%_60%/55%_45%_55%_45%] bg-[radial-gradient(circle_at_50%_45%,#7a9bff,#3a3ad8_45%,#16136a_80%)] shadow-[0_22px_40px_-14px_rgba(40,30,200,.7)]">
        <span className="drop-shadow-[0_0_14px_rgba(160,200,255,.9)]"><Icon className="size-12" stroke="#fff">{ic.cloud}</Icon></span>
        {[ic.cog, ic.loop, ic.gauge, ic.code, ic.box].map((c, i) => (
          <span
            key={i}
            className="absolute grid size-7 place-items-center rounded-[9px] border border-white/35 bg-white/15"
            style={[{ left: '12%', top: '16%' }, { right: '14%', top: '12%' }, { left: '10%', bottom: '18%' }, { right: '16%', bottom: '16%' }, { left: '46%', top: '4%' }][i]}
          >
            <Icon className="size-3.5" stroke="#fff">{c}</Icon>
          </span>
        ))}
      </div>
    ),
  },
]

const steps = [
  { icon: ic.bulb, title: 'Échange', text: 'Comprendre vos besoins et vos objectifs.' },
  { icon: ic.search, title: 'Analyse', text: 'Étudier et définir la meilleure solution.' },
  { icon: ic.layout, title: 'Maquette', text: 'Concevoir une première version visuelle.' },
  { icon: ic.palette, title: 'Design', text: 'Design & identité visuelle.' },
  { icon: ic.code, title: 'Développement', text: 'Coder et intégrer les fonctionnalités.' },
  { icon: ic.gauge, title: 'Tests & optimisation', text: 'Garantir performance et sécurité.' },
  { icon: ic.rocket, title: 'Livraison', text: 'Mise en ligne et accompagnement.' },
  { icon: ic.loop, title: 'Évolution', text: 'Support et amélioration continue.' },
]
const stepShapes = [
  'rounded-[60px_50px_50px_30px/50px_60px_40px_40px]',
  'rounded-[50px_60px_40px_50px/60px_50px_50px_40px]',
  'rounded-[40px_60px_60px_40px/50px_40px_60px_50px]',
  'rounded-[60px_40px_50px_60px/40px_60px_50px_50px]',
]

const heroShapes: Shape[] = [
  { kind: 'shard', pos: { left: '-26px', top: '52%' }, size: 80, rotate: 18, tone: 'violet' },
  { kind: 'orb', pos: { left: '54%', top: '10%' }, size: 12, tone: 'blue' },
  { kind: 'orb', pos: { left: '46%', bottom: '14%' }, size: 18, tone: 'violet' },
  { kind: 'spark', pos: { right: '34%', bottom: '4%' }, size: 12, tone: 'violet' },
]
const detailShapes: Shape[] = [
  { kind: 'shard', pos: { left: '-30px', top: '8%' }, size: 70, rotate: -12, tone: 'blue' },
  { kind: 'gem', pos: { right: '0', top: '44%' }, size: 30, rotate: 18, tone: 'violet' },
  { kind: 'orb', pos: { left: '36%', bottom: '4%' }, size: 16, tone: 'violet' },
  { kind: 'gem', pos: { left: '30%', top: '12%' }, size: 22, rotate: -20, tone: 'blue' },
]
const methodShapes: Shape[] = [
  { kind: 'orb', pos: { left: '33%', bottom: '10%' }, size: 18, tone: 'violet' },
  { kind: 'gem', pos: { right: '0', top: '8%' }, size: 24, rotate: 24, tone: 'violet' },
  { kind: 'orb', pos: { right: '1%', bottom: '26%' }, size: 14, tone: 'blue' },
]

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

function ServicesPage() {
  const logosRef = useRef<HTMLUListElement>(null)
  const scrollLogos = (dir: number) => logosRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' })

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

      {/* Fond : grandes vagues translucides */}
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[2600px] w-full" viewBox="0 0 1440 2600" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sx-w" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c9c0ff" stopOpacity=".55" />
            <stop offset="1" stopColor="#dfe6ff" stopOpacity=".3" />
          </linearGradient>
        </defs>
        <path d="M0 380 C 300 260, 520 580, 760 480 S 1200 340, 1440 480 L1440 660 C 1180 560, 1000 720, 720 660 S 240 520, 0 600 Z" fill="url(#sx-w)" />
        <path d="M0 1060 C 260 960, 380 1200, 640 1120 S 1100 980, 1440 1100 L1440 1220 C 1160 1120, 900 1280, 640 1240 S 200 1140, 0 1240 Z" fill="url(#sx-w)" />
        <path d="M0 1620 C 300 1540, 600 1760, 900 1660 S 1300 1560, 1440 1640 L1440 1740 C 1240 1680, 1000 1820, 760 1780 S 260 1700, 0 1780 Z" fill="url(#sx-w)" />
      </svg>

      {/* ============================== HERO ============================== */}
      <section className="isolate relative pt-[110px] pb-10">
        <Shapes items={heroShapes} />
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]`}>
          <Reveal className="min-w-0">
            <span className={`${chip} mb-4`}>Nos services</span>
            <h1 className="mb-5 font-sora text-[clamp(30px,3.3vw,44px)] leading-[1.08] font-bold tracking-[-0.035em] text-ink">
              Des solutions digitales<br />sur mesure pour<br />
              <span className="text-grad text-[1.3em]">votre croissance.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-[13.5px] leading-[1.65] text-body">
              Chez Eray Digital, nous transformons vos idées en solutions concrètes à travers des services digitaux
              innovants, créatifs et performants.
            </p>
            <div className="mb-9 flex flex-wrap gap-4">
              <a href="#services-detail" className={btn}>Découvrir nos services <Arrow className="size-4 transition group-hover:translate-x-1" /></a>
              <Link to="/projets" className="glass inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[13px] font-semibold text-[#2f3bb8] transition hover:-translate-y-0.5">
                <Icon className="size-4" stroke="#3a4bff">{ic.play}</Icon> Voir nos réalisations
              </Link>
            </div>
            <ul className="glass flex w-fit max-w-full flex-wrap rounded-2xl px-2 py-3">
              {pillars.map((p, i) => (
                <li key={p.label} className={`flex items-center gap-2.5 px-5 text-xs font-medium text-ink-2 ${i ? 'border-l border-violet/15' : ''}`}>
                  <Icon className="size-5">{p.icon}</Icon>{p.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative h-[330px] min-w-0 sm:h-[460px]" delay={120}>
            {/* Note manuscrite */}
            <span className="absolute -top-3 right-0 z-[3] hidden -rotate-12 font-script text-[22px] leading-[1.1] text-ink-2 italic sm:block">Votre projet,<br />notre expertise.</span>
            <svg className="absolute top-12 right-3 z-[3] hidden w-10 sm:block" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <path d="M50 4 C 56 26, 40 44, 14 50" stroke="#16136a" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M22 42 L13 50 L24 54" stroke="#16136a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Bulle de verre + halo */}
            <span className="absolute inset-[4%_2%_2%_6%] rounded-[42%_58%_46%_54%/50%_44%_56%_50%] bg-[radial-gradient(circle_at_55%_45%,rgba(123,60,255,.32),rgba(170,140,255,.18)_50%,rgba(47,139,255,.06)_75%)]" />
            <GlassWaves />
            {/* Ordinateur */}
            <div className="absolute top-[14%] left-[14%] z-[1] w-[66%] animate-float [transform:perspective(1400px)_rotateY(-18deg)_rotateX(8deg)_rotate(-8deg)]">
              <div className="aspect-[16/10.5] rounded-[14px_14px_4px_4px] border-[7px] border-[#0d0e24] shadow-[0_30px_60px_-20px_rgba(40,30,160,.6)]">
                <DarkScreen>Des idées<br />en solutions<br />durables</DarkScreen>
              </div>
              <div className="mx-[-8%] h-3.5 rounded-b-[18px] bg-[linear-gradient(#e6e7f2,#b9bbd0)]" />
            </div>
            {/* Téléphone */}
            <div className="absolute top-[24%] right-[4%] z-[2] aspect-[9/18] w-[16%] rotate-6 animate-float-slow rounded-[22px] border-[5px] border-[#0d0e24] bg-[#0d0e24] shadow-[0_24px_40px_-14px_rgba(40,30,160,.6)]">
              <DarkScreen small>Eray<br />Digital</DarkScreen>
            </div>
            {/* Cartes d'interface flottantes */}
            <div className="glass absolute top-[28%] left-[1%] w-[24%] -rotate-[8deg] animate-float rounded-2xl p-3 [animation-delay:-2s]">
              <div className="mb-2 flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1 flex-1 rounded bg-violet/20" />)}</div>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((i) => <span key={i} className="grid aspect-square place-items-center rounded-xl bg-[linear-gradient(145deg,#3aa0ff,#5a3cff)]"><Icon className="size-4" stroke="#fff">{i ? ic.cloud : ic.code}</Icon></span>)}
              </div>
            </div>
            <div className="glass absolute top-[3%] right-[20%] flex w-[20%] rotate-6 animate-float items-center gap-2 rounded-2xl p-3 [animation-delay:-4s]">
              <Icon className="size-6">{ic.box}</Icon>
              <div className="grid flex-1 gap-1"><i className="h-1 rounded bg-violet/25" /><i className="h-1 w-2/3 rounded bg-violet/15" /></div>
            </div>
            <GlassWaves front />
            {/* Compteur */}
            <div className="glass absolute right-0 bottom-[20%] z-[4] flex items-center gap-2.5 rounded-2xl px-4 py-3">
              <Icon className="size-7">{ic.star}</Icon>
              <div><b className="block text-base text-ink-2">{projects.length}</b><small className="text-[10px] text-mute">projets réalisés</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================= SERVICES EN DÉTAIL ======================= */}
      <section id="services-detail" className="isolate relative py-14">
        <Shapes items={detailShapes} />
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]`}>
          <Reveal className="min-w-0">
            <span className={`${chip} mb-3`}>Nos services en détail</span>
            <h2 className={h2}>Chaque service<br />est une expertise,<br /><span className="text-grad">chaque projet<br />une aventure.</span></h2>
            <p className="text-[13px] leading-[1.65] text-body">Nous combinons technologie, créativité et analyse pour créer des solutions réellement adaptées à votre activité.</p>
            <DrawnArrow />
            <Link to="/contact" className={btn}>Discutons de votre projet <Arrow /></Link>
          </Reveal>

          <div className="grid min-w-0 gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 90} className={`glass group relative grid min-h-[200px] grid-cols-[1.05fr_0.95fr] items-center py-6 pl-7 transition duration-500 hover:-translate-y-1.5 ${s.shape}`}>
                <span className="absolute top-4 left-1/2 flex gap-1.5" aria-hidden="true">
                  <i className="size-2 rounded-full border border-violet/40" /><i className="size-1.5 rounded-full border border-violet/30" />
                </span>
                <div className="relative z-[1] min-w-0">
                  <span className="mb-3.5 grid size-11 place-items-center rounded-full bg-[linear-gradient(145deg,#3aa0ff,#3a4bff)] shadow-[0_12px_24px_-10px_rgba(47,91,255,.75),inset_0_1px_0_rgba(255,255,255,.4)]">
                    <Icon className="size-[22px]" stroke="#fff">{s.icon}</Icon>
                  </span>
                  <h3 className="mb-2 font-sora text-[14.5px] font-semibold text-ink">{s.title}</h3>
                  <p className="mb-3.5 pr-2 text-[11px] leading-[1.55] text-body">{s.text}</p>
                  <Link to={`/services/${s.slug}`} className={link}>En savoir plus <Arrow className="size-3 transition group-hover:translate-x-1" /></Link>
                </div>
                <div className="relative -mt-14 -mr-6 h-[180px]">{s.visual}</div>
                <span className="absolute right-[46%] bottom-5 grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,#3a4bff,#6a3cff)] text-[10px] font-bold text-white shadow-[0_8px_18px_-6px_rgba(60,60,255,.6)]">{s.num}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ MÉTHODE ============================= */}
      <section className="isolate relative py-12">
        <Shapes items={methodShapes} />
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]`}>
          <Reveal className="min-w-0">
            <span className={`${chip} mb-3`}>Notre méthode</span>
            <h2 className={h2}>Une méthode claire<br />pour <span className="text-grad">des résultats</span><br />durables.</h2>
            <p className="mb-6 text-[13px] leading-[1.65] text-body">De la première idée à l’évolution de votre projet, nous avançons avec vous à chaque étape, avec méthode et transparence.</p>
            <Link to="/contact" className={btn}>Démarrer un projet <Arrow /></Link>
          </Reveal>

          <div className="relative min-w-0 lg:pl-10">
            {/* Flèche d'entrée qui boucle vers la 2e rangée */}
            <svg className="absolute top-[18%] left-0 hidden h-[62%] w-10 lg:block" viewBox="0 0 40 200" fill="none" aria-hidden="true">
              <path d="M34 4 C 0 40, 0 150, 34 190" stroke="#2f5bff" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 186 L35 191 L30 179" stroke="#2f5bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <ol className="grid list-none gap-x-4 p-0 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={(i % 4) * 80}
                  className={`glass relative px-5 pt-4 pb-5 ${stepShapes[i % 4]} ${i >= 4 ? 'lg:translate-x-6' : ''}`}
                >
                  <span className="mb-2 grid size-9 place-items-center rounded-full bg-white shadow-[0_8px_18px_-8px_rgba(90,60,255,.55)]">
                    <Icon className="size-5" stroke="#2f5bff">{s.icon}</Icon>
                  </span>
                  <span className="block text-[11px] font-semibold text-royal">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-0.5 mb-1.5 font-sora text-[13px] font-semibold text-ink">{s.title}</h3>
                  <p className="text-[10.5px] leading-[1.5] text-mute">{s.text}</p>
                  {i % 4 !== 3 && (
                    <span className="absolute top-1/2 -right-[13px] z-[2] hidden size-3 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff_0_10%,#9f8bff_35%,#3a1fc9)] shadow-[0_0_10px_rgba(123,60,255,.6)] lg:block" aria-hidden="true" />
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ========================== RÉALISATIONS ========================== */}
      <section className="relative pt-10 pb-12">
        <div className={`${wrap} grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]`}>
          {/* Bloc sombre organique qui déborde du bord gauche */}
          <Reveal className="relative min-w-0 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,#2a2690,#0a0b2e_70%)] px-8 py-10 text-white shadow-[0_40px_80px_-30px_rgba(40,30,200,.7)] lg:-ml-[calc(max(24px,(100vw-1240px)/2+24px))] lg:rounded-[0_55%_45%_0/0_50%_55%_0] lg:py-14 lg:pr-14 lg:pl-[calc(max(24px,(100vw-1240px)/2+24px))]">
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-8 ring-violet/15" aria-hidden="true" />
            <span className={`${chipDark} mb-4`}>Nos réalisations</span>
            <h2 className="mb-3 font-sora text-[26px] leading-[1.1] font-bold text-white">Visitez nos<br />réalisations</h2>
            <p className="mb-6 text-xs leading-[1.6] text-white/85">
              Découvrez quelques projets <span className="text-[#7fb0ff]">concrets</span> réalisés pour nos clients, dans différents domaines et secteurs <span className="text-[#7fb0ff]">d’activité</span>.
            </p>
            <Link to="/projets" className={btn}>Voir toutes nos réalisations <Arrow /></Link>
          </Reveal>

          <div className="relative grid min-w-0 gap-3.5 pr-0 sm:grid-cols-2 lg:grid-cols-4 lg:pr-10">
            {projects.slice(0, 4).map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 80}
                className={`glass rounded-[22px] px-3 pt-2 pb-4 transition duration-500 hover:-translate-y-1.5 ${['-rotate-2', 'translate-y-4 rotate-2', '-rotate-1', 'translate-y-3 rotate-2'][i]}`}
              >
                <div className="-mx-1 mb-2.5 h-[110px] overflow-hidden rounded-xl"><img src={p.image} alt={p.name} className="size-full object-cover object-top" /></div>
                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                  <h3 className="font-sora text-[12.5px] font-semibold text-ink">{p.name}</h3>
                  <span className="rounded-full border border-royal/35 bg-white px-2 py-px text-[9px] font-semibold text-[#2f3bb8]">{p.category}</span>
                </div>
                <p className="mb-2.5 line-clamp-2 text-[10.5px] leading-[1.5] text-mute">{p.description}</p>
                <Link to="/projets" className={link}>Voir le projet <Arrow className="size-3" /></Link>
              </Reveal>
            ))}
            <div className="absolute top-1/2 right-0 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
              {[0, 1].map((i) => (
                <Link key={i} to="/projets" aria-label="Voir plus de réalisations" className="glass grid size-7 place-items-center rounded-full text-[#3a4bff]"><Arrow className="size-3.5" /></Link>
              ))}
            </div>
          </div>
        </div>

        {/* Clients */}
        <div className={`${wrap} mt-14`}>
          <span className={chip}>Ils nous font confiance</span>
          <div className="mt-3 flex items-center gap-4">
            <button type="button" onClick={() => scrollLogos(-1)} aria-label="Précédent" className="glass grid size-8 shrink-0 cursor-pointer place-items-center rounded-full">
              <Icon className="size-3.5" stroke="#3a4bff">{ic.left}</Icon>
            </button>
            <ul ref={logosRef} className="flex flex-1 snap-x gap-12 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-around">
              {projects.map((p) => <li key={p.name} className="shrink-0 snap-start text-[15px] font-bold whitespace-nowrap text-[#2a2b44]/80">{p.name}</li>)}
            </ul>
            <button type="button" onClick={() => scrollLogos(1)} aria-label="Suivant" className="glass grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-[#3a4bff]">
              <Arrow className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

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
