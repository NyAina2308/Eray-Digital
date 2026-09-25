import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, type Shape } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import { projects } from '../data/projects'
import portrait from '../assets/photos/woman-Dt2ftJah.png'

/* ------------------------------------------------------------------ */
/* Données                                                            */
/* ------------------------------------------------------------------ */

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const logo = (name: string, variant = 'original') => `${DEVICON}/${name}/${name}-${variant}.svg`

const stats = [
  { icon: ic.users, value: '+20', label: 'développeurs' },
  { icon: ic.cap, value: '100+', label: 'étudiants accompagnés' },
  { icon: ic.box, value: 'Solutions', label: 'sur mesure' },
  { icon: ic.globe, value: 'Madagascar', label: 'International', arrow: true },
]

const expertises = [
  { slug: 'developpement-web', icon: ic.globe, title: <>Développement<br />Web</>, text: 'Des sites modernes, rapides et performants.', shape: 'rounded-[90px_110px_70px_120px/80px_90px_70px_100px]' },
  { slug: 'developpement-logiciel', icon: ic.code, title: <>Développement<br />logiciel</>, text: 'Des solutions sur mesure pour vos besoins spécifiques.', go: true, shape: 'rounded-[110px_80px_120px_70px/90px_80px_100px_70px]' },
  { slug: 'design-graphique', icon: ic.brush, title: 'Design graphique', text: 'Une identité visuelle qui marque les esprits.', shape: 'rounded-[80px_120px_90px_110px/70px_100px_80px_90px]' },
  { slug: 'solutions-digitales', icon: ic.cloud, title: 'Solutions digitales', text: 'Automatisation, intégration, transformation digitale.', go: true, shape: 'rounded-[120px_70px_110px_90px/100px_70px_90px_80px]' },
]

const steps = [
  { icon: ic.search, title: 'Comprendre', text: <>Écouter, analyser,<br />cerner vos besoins.</> },
  { icon: ic.bars, title: 'Analyser', text: <>Étudier, identifier<br />les opportunités.</> },
  { icon: ic.bulb, title: 'Créer', text: <>Concevoir, imaginer,<br />proposer.</> },
  { icon: ic.loop, title: 'Améliorer', text: <>Optimiser, faire évoluer,<br />pour durer.</> },
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

const heroShapes: Shape[] = [
  { kind: 'gem', pos: { left: '47%', top: '30%' }, size: 18, rotate: -20, tone: 'violet' },
  { kind: 'orb', pos: { left: '50%', top: '12%' }, size: 12, tone: 'blue' },
  { kind: 'shard', pos: { right: '1%', top: '44%' }, size: 44, rotate: 150, tone: 'blue' },
  { kind: 'gem', pos: { right: '6%', top: '10%' }, size: 16, rotate: 16, tone: 'pink' },
  { kind: 'spark', pos: { left: '58%', top: '6%' }, size: 12, tone: 'violet' },
]
const servicesShapes: Shape[] = [
  { kind: 'shard', pos: { left: '35%', top: '14%' }, size: 26, rotate: -30, tone: 'violet' },
  { kind: 'gem', pos: { left: '62%', top: '4%' }, size: 20, rotate: 10, tone: 'pink' },
  { kind: 'shard', pos: { right: '2%', top: '40%' }, size: 40, rotate: 140, tone: 'violet' },
  { kind: 'orb', pos: { right: '5%', top: '6%' }, size: 14, tone: 'blue' },
  { kind: 'gem', pos: { left: '37%', bottom: '26%' }, size: 16, rotate: 30, tone: 'violet' },
]
const philoShapes: Shape[] = [
  { kind: 'orb', pos: { right: '2%', top: '46%' }, size: 16, tone: 'blue' },
  { kind: 'orb', pos: { right: '8%', bottom: '4%' }, size: 18, tone: 'violet' },
  { kind: 'spark', pos: { left: '48%', top: '0' }, size: 12, tone: 'violet' },
]
const trustShapes: Shape[] = [
  { kind: 'orb', pos: { left: '44%', top: '0' }, size: 14, tone: 'blue' },
  { kind: 'spark', pos: { right: '3%', top: '6%' }, size: 12, tone: 'violet' },
]

/* ------------------------------------------------------------------ */
/* Visuels                                                            */
/* ------------------------------------------------------------------ */

/** Rubans 3D brillants qui s'enroulent autour de l'ordinateur. */
function Ribbons({ front = false }: { front?: boolean }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 size-full ${front ? 'z-[3]' : 'z-0'}`} viewBox="0 0 640 480" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rb-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3aa0ff" />
          <stop offset=".45" stopColor="#4a4bff" />
          <stop offset="1" stopColor="#9b5cff" />
        </linearGradient>
        <linearGradient id="rb-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7c8ff" />
          <stop offset=".5" stopColor="#8b5cff" />
          <stop offset="1" stopColor="#3a4bff" />
        </linearGradient>
      </defs>
      {front ? (
        <>
          {/* Ruban avant : passe devant le bas de l'ordinateur */}
          <path d="M60 330 C 150 420, 300 440, 420 400 S 600 300, 610 250" stroke="url(#rb-a)" strokeWidth="34" strokeLinecap="round" opacity=".92" />
          <path d="M60 330 C 150 420, 300 440, 420 400 S 600 300, 610 250" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".55" transform="translate(0 -12)" />
          <path d="M470 440 C 520 420, 560 380, 575 340" stroke="url(#rb-b)" strokeWidth="18" strokeLinecap="round" opacity=".8" />
        </>
      ) : (
        <>
          {/* Rubans arrière */}
          <path d="M120 70 C 260 -10, 470 20, 560 120 S 600 300, 520 360" stroke="url(#rb-b)" strokeWidth="40" strokeLinecap="round" opacity=".55" />
          <path d="M120 70 C 260 -10, 470 20, 560 120 S 600 300, 520 360" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".5" transform="translate(-6 -14)" />
          <path d="M40 250 C 20 170, 80 110, 150 100" stroke="url(#rb-a)" strokeWidth="26" strokeLinecap="round" opacity=".75" />
        </>
      )}
    </svg>
  )
}

function HeroVisual() {
  return (
    <div className="relative h-[340px] sm:h-[500px]">
      <span className={`${tw.script} absolute -top-6 right-0 z-[4] hidden -rotate-10 text-[22px] leading-[1.1] text-[#2f2bb8] sm:block`}>Plus qu’un service :<br />une vision.</span>
      <svg className="absolute top-12 right-16 z-[4] hidden w-9 sm:block" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M30 2 C 36 18, 24 30, 6 34" stroke="#2f2bb8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 28 L5 34 L14 37" stroke="#2f2bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Halo + plateau de verre */}
      <span className="absolute inset-[4%_2%_0_4%] rounded-full bg-[radial-gradient(circle,rgba(123,60,255,.28),rgba(47,139,255,.12)_45%,transparent_70%)] blur-xl" />
      <span className="glass absolute inset-[12%_12%_6%_14%] rounded-full opacity-80" />
      <Ribbons />

      {/* Ordinateur */}
      <div className="absolute top-[18%] left-[26%] z-[2] w-[48%] animate-float [transform:perspective(1300px)_rotateY(-18deg)_rotateX(10deg)_rotate(-6deg)]">
        <div className="relative grid aspect-[16/10.5] place-content-center justify-items-center gap-3 overflow-hidden rounded-[14px_14px_4px_4px] border-8 border-[#0d0e24] bg-[radial-gradient(circle_at_50%_35%,#2a2690,#0a0b2e_75%)] shadow-[0_30px_60px_-20px_rgba(40,30,160,.6)]">
          <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.12),transparent_40%)]" />
          <img src="/eray-logo.png" alt="Eray Digital" className="w-[22%] rounded-[10px] bg-white p-[3px]" />
          <span className="-rotate-3 font-sora text-[clamp(10px,1.1vw,15px)] font-semibold text-white">Build. Innovate. Grow.</span>
        </div>
        <div className="mx-[-8%] h-3.5 rounded-b-[18px] bg-[linear-gradient(#e6e7f2,#b9bbd0)]" />
      </div>

      {/* Téléphone */}
      <div className="absolute top-[48%] left-[58%] z-[2] aspect-[9/18] w-[13%] rotate-12 animate-float-slow rounded-[20px] border-[4px] border-[#0d0e24] bg-[linear-gradient(170deg,#1d1f5a,#2f5bff_60%,#8b5cff)] p-2 shadow-[0_24px_40px_-14px_rgba(40,30,160,.6)]">
        <div className="grid h-full content-end gap-1 pb-2">
          {[70, 50, 85].map((w, i) => <i key={i} className="h-1 rounded bg-white/60" style={{ width: `${w}%` }} />)}
        </div>
      </div>

      {/* Carte d'interface gauche */}
      <div className="glass absolute top-[30%] left-[4%] z-[2] w-[24%] -rotate-[10deg] animate-float rounded-2xl p-3 [animation-delay:-2s]">
        <div className="mb-2 flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="h-1 flex-1 rounded bg-violet/20" />)}</div>
        <div className="grid grid-cols-2 gap-2">
          <span className="aspect-square overflow-hidden rounded-lg"><img src={projects[0].image} alt="" className="size-full object-cover" /></span>
          <span className="aspect-square overflow-hidden rounded-lg"><img src={projects[1].image} alt="" className="size-full object-cover" /></span>
        </div>
        <div className="mt-2 grid gap-1"><i className="h-1 w-4/5 rounded bg-violet/20" /><i className="h-1 w-3/5 rounded bg-violet/15" /></div>
      </div>

      {/* Carte d'interface haut droite */}
      <div className="glass absolute top-[6%] right-[14%] z-[2] w-[17%] rotate-8 animate-float rounded-2xl p-2.5 [animation-delay:-4s]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-1.5 flex items-center gap-1.5 last:mb-0">
            <span className="size-4 shrink-0 rounded-md bg-[linear-gradient(145deg,#3aa0ff,#6a3cff)]" />
            <div className="grid flex-1 gap-0.5"><i className="h-1 rounded bg-violet/25" /><i className="h-1 w-2/3 rounded bg-violet/15" /></div>
          </div>
        ))}
      </div>

      {/* Tuile icône bleue */}
      <span className={`${tw.icoBlue} absolute top-[18%] left-[20%] z-[3] size-[58px] -rotate-12 rounded-2xl`}><Icon stroke="#fff">{ic.loop}</Icon></span>

      {/* Menu */}
      <ul className="glass absolute top-[30%] right-0 z-[4] hidden -rotate-6 gap-3 rounded-2xl p-3.5 text-[11px] font-medium text-ink-2 sm:grid">
        {([['Web', ic.globe], ['Software', ic.code], ['App Web', ic.box], ['Design', ic.brush]] as [string, ReactNode][]).map(([l, p]) => (
          <li key={l} className="flex items-center gap-2.5"><span className="grid size-6 place-items-center rounded-full bg-white shadow-sm"><Icon className="size-3.5">{p}</Icon></span>{l}</li>
        ))}
      </ul>

      <Ribbons front />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const goBtn = 'grid size-8 place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#5a3cff)] text-white shadow-[0_8px_18px_-6px_rgba(60,60,255,.6)]'

function Home() {
  return (
    <div className={tw.page}>
      <GradDefs />

      {/* Fond : vagues lavande et fines lignes courbes comme sur la maquette */}
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[3200px] w-full" viewBox="0 0 1440 3200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="hm-w" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#d9d0ff" stopOpacity=".7" />
            <stop offset=".5" stopColor="#e7e3ff" stopOpacity=".35" />
            <stop offset="1" stopColor="#cfe0ff" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <path d="M0 40 C 300 0, 520 160, 820 90 S 1300 -20, 1440 60 L1440 0 L0 0 Z" fill="url(#hm-w)" />
        <path d="M0 620 C 260 520, 520 760, 820 660 S 1260 540, 1440 640 L1440 760 C 1200 680, 980 820, 720 780 S 220 660, 0 740 Z" fill="url(#hm-w)" />
        <path d="M0 1320 C 300 1220, 600 1420, 900 1330 S 1300 1230, 1440 1300 L1440 1420 C 1240 1360, 1000 1500, 760 1460 S 260 1380, 0 1460 Z" fill="url(#hm-w)" />
        <path d="M0 1880 C 320 1800, 640 1980, 960 1900 S 1320 1820, 1440 1880 L1440 1990 C 1200 1930, 980 2060, 700 2020 S 240 1940, 0 2010 Z" fill="url(#hm-w)" />
        <path d="M-20 700 C 120 760, 160 820, 130 900" stroke="#6a3cff" strokeOpacity=".35" strokeWidth="1.2" fill="none" />
        <path d="M1440 900 C 1340 980, 1300 1080, 1360 1180" stroke="#6a3cff" strokeOpacity=".3" strokeWidth="1.2" fill="none" />
        <path d="M1200 0 C 1300 120, 1420 160, 1440 260" stroke="#6a3cff" strokeOpacity=".25" strokeWidth="1.2" fill="none" />
      </svg>

      {/* ============================== HERO ============================== */}
      <section className="relative isolate pt-[110px] pb-4">
        <Shapes items={heroShapes} />
        <div className={`${tw.wrap} grid items-center gap-5 lg:grid-cols-[0.85fr_1.15fr]`}>
          <Reveal className="min-w-0">
            <span className={`${tw.chipSm} mb-5`}>Eray Digital <i className="mx-2 not-italic opacity-60">—</i> Digital solutions</span>
            <h1 className="mb-6 font-sora text-[clamp(40px,4.6vw,64px)] leading-[1.02] font-bold tracking-[-0.045em] text-ink">
              Des idées<br /><span className="text-grad">qui prennent vie</span><br />en ligne.
            </h1>
            <p className="mb-8 text-[15px] leading-[1.6] text-body">Sites web, logiciels sur mesure, applications web,<br className="hidden sm:block" /> solutions digitales et design graphique.</p>
            <div className="mb-10 flex flex-wrap gap-3">
              <Link to="/contact" className={`${tw.btn} px-7 py-3.5 whitespace-nowrap`}>Démarrer un projet <Arrow /></Link>
              <Link to="/projets" className={`${tw.btnGhost} px-6 py-3.5 whitespace-nowrap`}><Icon className="size-4" stroke="#3a4bff">{ic.eye}</Icon> Découvrir nos réalisations</Link>
            </div>
            <a href="#services-home" className="inline-flex items-center gap-3 text-xs text-body"><Icon className="size-5 animate-float" stroke="#3a4bff">{ic.mouse}</Icon> Scroll pour découvrir</a>
          </Reveal>
          <Reveal className="min-w-0" delay={120}><HeroVisual /></Reveal>
        </div>

        {/* Bandeau de chiffres flottant, traversé d'une fine ligne */}
        <div className={`${tw.wrap} mt-6`}>
          <Reveal className="relative">
            <svg className="pointer-events-none absolute -left-16 top-1/2 hidden h-24 w-[calc(100%+8rem)] -translate-y-1/2 lg:block" viewBox="0 0 1400 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M0 80 C 60 20, 100 60, 140 40 M 1280 50 C 1320 30, 1360 40, 1400 20" stroke="#5a4bff" strokeOpacity=".5" strokeWidth="1.3" />
              <path d="M132 34 L141 40 L133 48" stroke="#5a4bff" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="absolute top-1/2 -right-6 hidden size-9 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff_0_8%,#8fc2ff_30%,#2f5bff_80%)] shadow-[0_10px_22px_-6px_rgba(60,40,220,.5)] lg:block" />
            <div className="grid grid-cols-1 gap-y-5 rounded-[26px] bg-white/55 px-2.5 py-5 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:bg-transparent lg:backdrop-blur-none">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex items-center justify-start gap-4 px-4 sm:justify-center ${i ? 'lg:border-l' : ''} ${i % 2 ? 'sm:border-l' : ''} border-violet/20`}>
                  <Icon className="size-[34px]">{s.icon}</Icon>
                  <div>
                    <strong className="flex items-center gap-1.5 text-[19px] font-semibold text-[#2f3bb8]">{s.value} {s.arrow && <Arrow className="size-3.5" />}</strong>
                    <small className="text-[11px] text-body">{s.label}</small>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ EXPERTISES ========================== */}
      <section id="services-home" className="relative isolate pt-16 pb-4">
        <Shapes items={servicesShapes} />
        <div className={`${tw.wrap} grid items-center gap-[50px] lg:grid-cols-[0.72fr_1.28fr]`}>
          <Reveal className="min-w-0">
            <span className={`${tw.chipSm} mb-3`}>Nos services</span>
            <h2 className="mb-[22px] font-sora text-[clamp(28px,2.6vw,36px)] leading-[1.12] font-semibold tracking-[-0.03em] text-ink">
              Des expertises<br />au service de vos<br /><span className="text-grad text-[1.4em] font-bold">ambitions.</span>
            </h2>
            <p className={tw.lead}>Nous combinons technologie, créativité et analyse pour créer des solutions réellement adaptées à votre activité.</p>
            <Link to="/services" className={`${tw.link} border-b border-[#2f3bb8]/30 text-[13px]`}>En savoir plus <Arrow className="size-3.5 transition group-hover:translate-x-1" /></Link>
          </Reveal>
          <div className="relative grid min-w-0 gap-x-6 gap-y-6 sm:grid-cols-2">
            {/* Nappe lavande derrière les bulles */}
            <span className="absolute inset-[-6%_-4%] -z-[1] rounded-[50%] bg-[radial-gradient(ellipse,rgba(170,150,255,.35),transparent_70%)] blur-xl" aria-hidden="true" />
            {expertises.map((e, i) => (
              <Reveal key={e.slug} delay={i * 90} className={i % 2 ? 'sm:translate-y-3' : ''}>
                <Link to={`/services/${e.slug}`} className={`glass group relative flex min-h-[150px] items-start gap-5 px-8 py-8 transition duration-500 hover:-translate-y-1.5 ${e.shape}`}>
                  <span className="pointer-events-none absolute inset-[6px] rounded-[inherit] bg-[linear-gradient(160deg,rgba(255,255,255,.7),transparent_40%)]" aria-hidden="true" />
                  <span className={`${tw.icoBlue} relative size-[60px] shadow-[0_14px_30px_-8px_rgba(60,60,255,.7),inset_0_2px_0_rgba(255,255,255,.45)]`}><Icon className="size-7" stroke="#fff">{e.icon}</Icon></span>
                  <div className="relative">
                    <h3 className="mt-2 mb-2.5 font-sora text-[15.5px] leading-[1.3] font-semibold text-ink">{e.title}</h3>
                    <p className="pr-6 text-xs leading-[1.6] text-mute">{e.text}</p>
                  </div>
                  {e.go && <span className={`${goBtn} absolute right-7 bottom-6`}><Arrow className="size-3.5 transition group-hover:translate-x-0.5" /></span>}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div
          className="relative z-0 -mt-4 overflow-hidden pl-[26%] font-sora text-[clamp(40px,5.4vw,78px)] font-extrabold tracking-[-0.02em] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(123,100,255,.18)] bg-[linear-gradient(90deg,rgba(123,100,255,.16),rgba(123,100,255,.05))] bg-clip-text"
          aria-hidden="true"
        >
          THINK. CREATE. IMPROVE.
        </div>
      </section>

      {/* ============================ PHILOSOPHIE ========================= */}
      <section id="approche" className="relative isolate pb-16">
        <Shapes items={philoShapes} />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
          <Reveal className="relative min-w-0">
            {/* Anneau de verre autour du bloc sombre */}
            <span className="absolute -inset-3 hidden rounded-[38%_62%_58%_42%/48%_42%_58%_52%] bg-[linear-gradient(140deg,rgba(143,194,255,.7),rgba(176,123,255,.5),rgba(255,255,255,.4))] blur-[1px] lg:block" aria-hidden="true" />
            <div className="relative rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,#2f2a9e,#0a0b2e_70%)] px-7 py-9 text-white shadow-[0_40px_80px_-30px_rgba(40,30,200,.7)] lg:-ml-[calc(max(24px,(100vw-1240px)/2+24px))] lg:rounded-[0_62%_58%_0/0_52%_48%_0] lg:py-14 lg:pr-16 lg:pl-[calc(max(24px,(100vw-1240px)/2+48px))]">
              <span className={`${tw.chipDark} mb-[18px]`}>Notre philosophie</span>
              <p className="mb-1.5 text-[19px] leading-[1.25] font-semibold">Nous ne faisons pas<br />simplement ce qui est demandé.</p>
              <p className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em]">
                Nous <span className="bg-[linear-gradient(95deg,#6fa8ff,#9b7bff)] bg-clip-text text-transparent">cherchons ce qui peut<br />être amélioré.</span>
              </p>
            </div>
          </Reveal>
          <div className="relative grid min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <svg className="absolute inset-x-0 top-4 hidden h-24 w-full lg:block" viewBox="0 0 600 90" preserveAspectRatio="none" aria-hidden="true">
              <path d="M-20 60 C 60 10, 120 90, 200 50 S 340 10, 410 55 S 540 80, 620 20" fill="none" stroke="url(#ui-grad)" strokeWidth="1.6" />
              {[[70, 42], [190, 54], [300, 32], [420, 58], [540, 50]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="#5a4bff" />
              ))}
            </svg>
            <span className="absolute top-2 -right-2 hidden size-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff_0_10%,#8fc2ff_35%,#2f5bff)] lg:block" aria-hidden="true" />
            {steps.map((s, i) => (
              <Reveal key={s.title} className={`relative z-[1] text-center ${i % 2 === 0 ? 'lg:mt-10' : ''}`} delay={i * 100}>
                <span className="glass mx-auto mb-3.5 grid size-[70px] place-items-center rounded-full"><Icon className="size-7">{s.icon}</Icon></span>
                <h3 className="mb-2 font-sora text-[14.5px] font-semibold text-ink">{s.title}</h3>
                <p className="text-[11.5px] leading-[1.55] text-mute">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== PROJETS =========================== */}
      <section className="relative isolate py-10">
        <div className={`${tw.wrap} grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.35fr_1fr_1fr]`}>
          <Reveal className="min-w-0 self-center sm:col-span-2 lg:col-span-1">
            <span className={`${tw.chipSm} mb-3`}>Projets récents</span>
            <h2 className="mb-5 font-sora text-[clamp(20px,1.8vw,25px)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink">Des solutions concrètes<br />pour des clients ambitieux.</h2>
            <Link to="/projets" className={tw.btn}>Voir toutes nos réalisations <Arrow /></Link>
          </Reveal>
          {projects.slice(0, 4).map((pr, i) => {
            const main = i === 1
            return (
              <Reveal key={pr.name} className={`glass group relative min-w-0 rounded-[24px] px-3.5 pt-3 ${main ? 'pb-6 lg:-translate-y-5' : 'pb-5'}`} delay={i * 90}>
                <div className={`relative -mx-1 mb-3.5 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_60%_40%,rgba(123,60,255,.35),rgba(47,91,255,.1)_70%)] p-3 ${main ? 'h-[170px]' : 'h-[130px]'}`}>
                  <div className="h-full overflow-hidden rounded-lg border-[4px] border-[#0d0e24] shadow-[0_16px_28px_-12px_rgba(40,30,160,.6)] transition duration-700 [transform:perspective(700px)_rotateY(-10deg)_rotate(-2deg)] group-hover:[transform:perspective(700px)_rotateY(-3deg)]">
                    <img src={pr.image} alt={pr.name} className="size-full object-cover object-top" />
                  </div>
                </div>
                <h3 className="mb-0.5 font-sora text-[13.5px] font-semibold text-ink">{pr.name}</h3>
                <span className="mb-2 block text-[10.5px] font-medium text-[#3a4bff]">{pr.category}</span>
                <p className="line-clamp-2 pr-8 text-[10.5px] leading-[1.5] text-mute">{pr.description}</p>
                <Link to="/projets" className={`${goBtn} absolute right-3.5 bottom-4 size-7`} aria-label={`Voir ${pr.name}`}><Arrow className="size-3.5" /></Link>
              </Reveal>
            )
          })}
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
