import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor, type Shape } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import GlassComposition from '../components/GlassComposition'

import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'
import roomPhoto from '../assets/photos/room-D2XCtDIa.png'

import targetGif from '../assets/gif/crosshair.gif'
import rocketGif from '../assets/gif/Rocket.gif'
import eyeGif from '../assets/gif/eye.gif'


/* =========================================================
   STYLES LOCAUX
========================================================= */

const kicker = 'mb-3 block text-[10px] font-bold tracking-[0.28em] text-violet uppercase'
const h2 = 'mb-4 font-sora text-[clamp(24px,2.2vw,30px)] leading-[1.15] font-bold tracking-[-0.03em] text-ink'
const btn = 'btn-blue group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-sora text-[12.5px] font-semibold transition hover:-translate-y-0.5'
/** Pastille blanche ronde qui accueille les icônes en dégradé. */
const icoWhite = 'grid shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#fff,#f0edff)] shadow-[0_10px_24px_-10px_rgba(90,60,255,.55),inset_0_0_0_1px_rgba(106,60,255,.12)]'

const extra = {
  diamond: <path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M9 3l3 18M15 3l-3 18" />,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  pen: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.6 7.6" />,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  play: <path d="M10 8.5v7l6-3.5-6-3.5z" />,
  codeBar: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M12 4v16" />,
}


/* =========================================================
   DONNÉES
========================================================= */

const missionPoints = [
  { icon: ic.bulb, label: 'Innovation\ncontinue' },
  { icon: ic.users, label: 'Accompagnement\npersonnalisé' },
  { icon: ic.target, label: 'Résultats\nconcrets' },
]

const values = [
  { icon: ic.bulb, title: 'Innovation', text: 'Toujours à la pointe\ndes nouvelles technologies.' },
  { icon: extra.diamond, title: 'Excellence', text: 'Nous visons la qualité\ndans chaque détail.' },
  { icon: ic.target, title: 'Engagement', text: 'Votre réussite est notre\nplus grande motivation.' },
  { icon: ic.users, title: 'Esprit d’équipe', text: 'Ensemble, nous allons\nplus loin.' },
]

const stats = [
  { icon: extra.sun, value: '+10', label: 'Projets réalisés' },
  { icon: ic.users, value: '+5', label: 'Clients satisfaits' },
  { icon: ic.code, value: '3', label: 'Domaines d’expertise' },
  { icon: ic.star, value: '100%', label: 'Engagement qualité' },
]

const roles = [
  { icon: ic.code, label: 'Développeurs\nWeb & Mobile' },
  { icon: extra.pen, label: 'Designers UI/UX' },
  { icon: extra.chip, label: 'Ingénieurs en IoT\n& Électronique' },
  { icon: ic.users, label: 'Chefs de projet\n& Consultants' },
]

const orbitIcons = [
  { icon: ic.code, pos: 'top-[9%] left-[17%] -rotate-[10deg]' },
  { icon: extra.codeBar, pos: 'top-[44%] left-[3%] -rotate-[6deg]' },
  { icon: extra.phone, pos: 'bottom-[5%] left-[41%] rotate-[4deg]' },
  { icon: extra.cog, pos: 'bottom-[20%] right-[12%] rotate-[10deg]' },
  { icon: ic.cloud, pos: 'top-[32%] right-[5%] rotate-[8deg]' },
]

/** Contour de Madagascar, tracé d'après une carte réelle (repère 400 × 400, centré sur le globe). */
const madagascar =
  'M176 223.6 L177.7 221.6 L176.6 219.6 L177.7 215.3 L175.1 211.6 L175.4 207.9 L172.8 203.3 L172.8 195.8 L171.7 194.1 L171.7 191.5 L177.4 182.6 L177.4 176.8 L182.3 176.8 L186.6 173.7 L190.4 174 L191.5 171.9 L198.1 171.1 L202.4 167.1 L206.7 165.1 L211.3 159 L212.2 159 L213 161 L214.5 158.7 L213.9 155.9 L215.1 153.9 L216.5 153.6 L216.2 147 L217.1 145.8 L219.1 145.8 L221.1 148.7 L221.1 146.1 L222.2 145.8 L219.6 145.2 L219.4 142.9 L220.5 142.1 L221.9 142.4 L222.5 145.8 L222.8 144.1 L224.5 144.9 L226.3 144.1 L228 138.3 L225.7 133.2 L228 133.5 L230.3 130.9 L229.7 129.4 L231.1 128 L233.1 128.6 L234 131.7 L236 133.7 L236 135.8 L240 140.4 L242.3 149 L243.2 160.2 L246.4 165.9 L245.5 170.8 L242.9 175.1 L240.3 174 L238.3 168.8 L236.9 169.4 L237.7 173.4 L237.2 175.7 L238.9 177.4 L239.2 180.9 L237.7 183.7 L238.9 184.3 L239.8 182.6 L240.9 182.6 L240.9 183.7 L238.6 188 L237.7 188 L238 185.7 L236.6 185.4 L234.3 189.8 L235.4 194.9 L233.4 203.5 L229.7 212.2 L220.5 243.8 L217.6 249.8 L213 269.6 L208.4 281.7 L206.7 283.4 L203.6 284.8 L198.7 284.8 L190.6 289.7 L185.5 290 L181.4 286.6 L176.3 286 L172.5 282.2 L171.7 278.2 L168.5 273.6 L168.2 265.6 L169.4 263.3 L168.2 262.4 L167.9 259.3 L165.4 256.7 L163.6 248.4 L165.1 242.3 L166.8 240.9 L166.8 237.1 L170.5 235.7 L171.4 231.7 Z'

/** Points du réseau lumineux posés sur l'île. */
const nodes: [number, number][] = [
  [225, 150], [228, 172], [192, 194], [212, 212], [189, 230], [202, 246], [183, 262], [198, 276],
]

const rings = [
  { rx: 188, ry: 60, angle: -20, width: 2.2 },
  { rx: 172, ry: 46, angle: 26, width: 1.6 },
  { rx: 150, ry: 34, angle: -6, width: 1.2 },
]

/** Anneau d'orbite coupé en deux : moitié arrière (sous la sphère) ou avant. */
function Ring({ rx, ry, angle, width, side }: { rx: number; ry: number; angle: number; width: number; side: 'back' | 'front' }) {
  return (
    <g transform={`rotate(${angle} 200 205)`} opacity={side === 'back' ? 0.55 : 1}>
      <ellipse cx="200" cy="205" rx={rx} ry={ry} stroke="url(#gl-ring)" strokeWidth={width} clipPath={`url(#gl-${side})`} />
    </g>
  )
}

/** Globe terrestre en verre : sphère, Madagascar néon, orbites et bulle. */
function Globe() {
  return (
    <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="gl-sphere" cx=".36" cy=".3" r=".8">
          <stop offset="0" stopColor="#b9d4ff" />
          <stop offset=".22" stopColor="#6f8dff" />
          <stop offset=".55" stopColor="#3a35d8" />
          <stop offset=".85" stopColor="#1f1590" />
          <stop offset="1" stopColor="#120c5a" />
        </radialGradient>
        <radialGradient id="gl-bubble" cx=".5" cy=".5" r=".5">
          <stop offset=".55" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".82" stopColor="#c9b8ff" stopOpacity=".28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".7" />
        </radialGradient>
        <radialGradient id="gl-halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#7b6bff" stopOpacity=".55" />
          <stop offset=".6" stopColor="#9f8bff" stopOpacity=".18" />
          <stop offset="1" stopColor="#9f8bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gl-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".3" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset=".7" stopColor="#c9b5ff" stopOpacity=".9" />
          <stop offset="1" stopColor="#8fb8ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gl-island" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe4ff" stopOpacity=".75" />
          <stop offset=".5" stopColor="#c08bff" stopOpacity=".55" />
          <stop offset="1" stopColor="#8b5cff" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="gl-wave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".55" />
          <stop offset=".5" stopColor="#b9a8ff" stopOpacity=".35" />
          <stop offset="1" stopColor="#8fb8ff" stopOpacity=".5" />
        </linearGradient>
        <clipPath id="gl-back"><rect x="-200" y="-400" width="800" height="605" /></clipPath>
        <clipPath id="gl-front"><rect x="-200" y="205" width="800" height="600" /></clipPath>
        <clipPath id="gl-clip"><circle cx="200" cy="205" r="100" /></clipPath>
        <filter id="gl-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gl-soft"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>

      {/* Halo et bulle de verre */}
      <circle cx="200" cy="205" r="175" fill="url(#gl-halo)" />
      <circle cx="200" cy="200" r="158" fill="url(#gl-bubble)" stroke="#fff" strokeOpacity=".75" strokeWidth="1.5" />
      <path d="M78 130 A 158 158 0 0 1 200 42" stroke="#fff" strokeOpacity=".9" strokeWidth="3" strokeLinecap="round" />

      {/* Orbites — moitié arrière */}
      {rings.map((r, i) => <Ring key={i} {...r} side="back" />)}

      {/* Vague de verre */}
      <path d="M30 300 C 60 380, 220 400, 330 330 C 380 296, 396 240, 380 200 C 372 250, 330 300, 250 320 C 160 342, 70 330, 30 300 Z" fill="url(#gl-wave)" />
      <path d="M30 300 C 60 380, 220 400, 330 330 C 380 296, 396 240, 380 200" stroke="#fff" strokeOpacity=".8" strokeWidth="1.6" />

      {/* Sphère */}
      <circle cx="200" cy="205" r="112" fill="#7b6bff" opacity=".45" filter="url(#gl-soft)" />
      <circle cx="200" cy="205" r="100" fill="url(#gl-sphere)" />
      <g clipPath="url(#gl-clip)" stroke="#bcd0ff" strokeWidth=".7">
        {[-60, -30, 0, 30, 60].map((d) => (
          <ellipse key={d} cx="200" cy={205 + d} rx={Math.sqrt(100 ** 2 - d ** 2)} ry={6 + Math.abs(d) / 12} strokeOpacity=".22" />
        ))}
        {[16, 40, 66, 90].map((rx) => <ellipse key={rx} cx="200" cy="205" rx={rx} ry="100" strokeOpacity=".18" />)}
        {/* Réseau numérique */}
        <path d="M120 160 L150 150 L170 170 M250 250 L280 236 L300 250 M130 250 L160 262" stroke="#9fc0ff" strokeOpacity=".35" />
      </g>

      {/* Madagascar */}
      <g transform="translate(205 209) scale(1.05) translate(-205 -209)">
        <path d={madagascar} stroke="#c9a8ff" strokeWidth="7" strokeOpacity=".4" strokeLinejoin="round" filter="url(#gl-glow)" />
        <path d={madagascar} fill="url(#gl-island)" stroke="#f3ecff" strokeWidth="1.8" strokeLinejoin="round" filter="url(#gl-glow)" />
        {nodes.slice(1).map(([x, y], i) => (
          <line key={i} x1={nodes[i][0]} y1={nodes[i][1]} x2={x} y2={y} stroke="#f0e6ff" strokeOpacity=".7" strokeWidth=".8" />
        ))}
        {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} fill="#fff" filter="url(#gl-glow)" />)}
      </g>

      {/* Reflets de verre */}
      <ellipse cx="160" cy="150" rx="44" ry="26" transform="rotate(-30 160 150)" fill="#fff" opacity=".22" />
      <path d="M118 250 A 100 100 0 0 0 250 292" stroke="#9fd8ff" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="200" cy="205" r="100" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />

      {/* Orbites — moitié avant (passe devant la sphère) */}
      {rings.map((r, i) => <Ring key={i} {...r} side="front" />)}
      <circle cx="372" cy="150" r="3" fill="#fff" filter="url(#gl-glow)" />
      <circle cx="40" cy="262" r="2.4" fill="#fff" filter="url(#gl-glow)" />
    </svg>
  )
}

const heroShapes: Shape[] = [
  { kind: 'spark', pos: { left: '44%', top: '30%' }, size: 12, tone: 'blue' },
  { kind: 'orb', pos: { left: '3%', bottom: '8%' }, size: 14, tone: 'violet' },
]


/* =========================================================
   ABOUT PAGE
========================================================= */

function AboutPage() {
  return (
    <div className={tw.page}>
      <GradDefs />


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="isolate relative pt-[112px] pb-10">
        <Shapes items={heroShapes} />

        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="min-w-0">
            <span className={kicker}>À propos de nous</span>

            <h1 className="mb-6 font-sora text-[clamp(30px,3.2vw,44px)] leading-[1.1] font-bold tracking-[-0.035em] text-ink">
              Une équipe passionnée
              <br />
              au service de votre
              <br />
              <span className={tw.gradText}>transformation digitale</span>
            </h1>

            <p className="mb-8 max-w-[460px] text-[14px] leading-[1.75] text-body">
              Eray Digital est une entreprise technologique malgache qui
              accompagne les entreprises dans leur digitalisation en proposant
              des solutions innovantes, sur mesure et performantes.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <a href="#histoire" className={btn}>
                Notre histoire
                <Arrow />
              </a>

              <a href="#mission" className="group flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full border-2 border-violet/70 bg-white transition group-hover:scale-105">
                  <Icon className="size-4 translate-x-px" stroke="#6a3cff">{extra.play}</Icon>
                </span>
                <span className="text-[12.5px] leading-[1.3] font-semibold text-ink-2">
                  Découvrir Eray Digital
                  <small className="block font-normal text-mute">(1 min)</small>
                </span>
              </a>
            </div>
          </Reveal>


          <Reveal className="relative aspect-[1268/800] min-w-0" delay={120}>
            {/* Photo au bord gauche arrondi, enveloppée d'un ruban de verre en « C » */}
            <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 1268 800" fill="none" aria-hidden="true">
              <defs>
                <clipPath id="ah-photo">
                  <path d="M760 24 L1130 38 Q1182 38 1182 90 L1182 646 Q1182 690 1138 690 L920 692 C780 696 600 694 430 680 C336 668 272 636 247 590 C227 550 222 505 224 462 L224 440 C207 400 192 360 195 310 C198 250 222 186 294 144 C374 94 540 44 760 24 Z" />
                </clipPath>
                <linearGradient id="ah-shard" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8fe8ff" />
                  <stop offset="1" stopColor="#3f8cff" stopOpacity=".8" />
                </linearGradient>
                <filter id="ah-shadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="30" stdDeviation="30" floodColor="#4632dc" floodOpacity=".35" />
                </filter>
                <linearGradient id="ah-back" x1="0" y1="0" x2="1" y2=".4">
                  <stop offset="0" stopColor="#7fb2ff" stopOpacity=".95" />
                  <stop offset=".35" stopColor="#a9b4ff" stopOpacity=".85" />
                  <stop offset=".7" stopColor="#d4ccff" stopOpacity=".7" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity=".5" />
                </linearGradient>
                <linearGradient id="ah-fold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
                  <stop offset=".6" stopColor="#d9d2ff" stopOpacity=".6" />
                  <stop offset="1" stopColor="#a99bff" stopOpacity=".45" />
                </linearGradient>
                <linearGradient id="ah-wave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#8a4dff" />
                  <stop offset=".3" stopColor="#6a5cff" />
                  <stop offset=".65" stopColor="#3f8cff" />
                  <stop offset=".85" stopColor="#37c8ff" stopOpacity=".8" />
                  <stop offset="1" stopColor="#7fe0ff" stopOpacity=".2" />
                </linearGradient>
                <linearGradient id="ah-gloss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".45" />
                  <stop offset=".4" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset=".85" stopColor="#1d1590" stopOpacity="0" />
                  <stop offset="1" stopColor="#1d1590" stopOpacity=".3" />
                </linearGradient>
                <filter id="ah-soft"><feGaussianBlur stdDeviation="3" /></filter>
                <filter id="ah-blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="14" /></filter>
              </defs>

              {/* Photo de l'équipe */}
              <g filter="url(#ah-shadow)">
                <image href={teamPhoto} x="200" y="30" width="990" height="680" preserveAspectRatio="xMidYMid slice" clipPath="url(#ah-photo)" />
              </g>
              <path d="M760 26 L1130 38 Q1182 38 1182 90 L1182 646" stroke="#fff" strokeOpacity=".8" strokeWidth="3" />

              {/* Ombre portée sous la vague */}
              <path d="M60 640 C200 700 420 720 880 705 L880 722 C420 740 180 720 60 670 Z" fill="#5a3cff" opacity=".28" filter="url(#ah-blur)" />

              {/* Bandeau arrière : passe sur le haut de la photo et descend le long du bord gauche */}
              <path
                d="M760 30 C560 22 330 60 230 123 C150 175 120 260 135 340 C145 395 175 430 205 455 L232 440 C215 400 200 360 203 310 C206 250 230 190 300 150 C380 100 540 52 760 30 Z"
                fill="url(#ah-back)"
              />
              <path d="M760 30 C560 22 330 60 230 123 C150 175 120 260 135 340 C145 395 175 430 205 455" stroke="#fff" strokeOpacity=".95" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M740 32 C540 52 380 100 300 150 C230 190 206 250 203 310 C200 360 215 400 232 440" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" strokeLinecap="round" />
              {/* Reflet qui court au milieu du bandeau */}
              <path d="M600 40 C470 50 320 85 250 140 C180 195 160 270 172 350" stroke="#fff" strokeOpacity=".55" strokeWidth="7" strokeLinecap="round" filter="url(#ah-soft)" />

              {/* Pli intérieur : la face claire du ruban qui se tord */}
              <path d="M135 340 C145 395 175 430 205 455 C238 482 258 532 256 588 C238 550 220 512 194 486 C162 455 140 404 135 340 Z" fill="url(#ah-fold)" />
              <path d="M205 455 C238 482 258 532 256 588" stroke="#fff" strokeOpacity=".85" strokeWidth="1.8" strokeLinecap="round" />

              {/* Vague avant : violet → bleu → cyan, épaisse à gauche et effilée vers la droite */}
              <path
                d="M232 462 C170 470 90 520 45 575 C25 600 45 635 110 652 C200 678 320 694 460 698 C600 702 780 698 920 688 C780 690 600 686 430 672 C340 660 280 630 255 585 C235 548 230 505 232 462 Z"
                fill="url(#ah-wave)"
              />
              {/* Volume : lumière en haut à gauche, ombre en bas */}
              <path
                d="M232 462 C170 470 90 520 45 575 C25 600 45 635 110 652 C200 678 320 694 460 698 C600 702 780 698 920 688 C780 690 600 686 430 672 C340 660 280 630 255 585 C235 548 230 505 232 462 Z"
                fill="url(#ah-gloss)"
              />
              <path d="M232 462 C170 470 90 520 45 575" stroke="#fff" strokeOpacity=".9" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M225 490 C175 500 115 538 80 575" stroke="#fff" strokeOpacity=".5" strokeWidth="8" strokeLinecap="round" filter="url(#ah-soft)" />
              <path d="M45 575 C25 600 45 635 110 652 C200 678 320 694 460 698 C600 702 780 698 920 688" stroke="#2a1fb0" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />

              {/* Éclat cyan à droite */}
              <path d="M1098 285 L1202 322 L1088 388 Z" fill="url(#ah-shard)" opacity=".9" />
            </svg>
            <span className="sr-only">L'équipe Eray Digital au travail</span>

            {/* Logo sur le mur */}
            <div className="absolute top-[14%] right-[10%] z-[2] flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-[0_14px_30px_-12px_rgba(70,50,220,.5)] backdrop-blur">
              <img src="/eray-logo.png" alt="" className="h-8 w-auto" />
            </div>

            {/* Sphère violette */}
            <span className="absolute top-[10%] left-[31%] z-[2] size-[clamp(30px,4vw,48px)] animate-float rounded-full bg-[radial-gradient(circle_at_32%_28%,#fff_0_8%,#b69cff_32%,#5a2bd8_80%)] shadow-[0_14px_28px_-8px_rgba(90,60,255,.65)]" />

            {/* Carte Innover / Créer / Transformer */}
            <div className="absolute right-[5%] bottom-[2%] z-[3] w-[27%] min-w-[150px] animate-float-slow rounded-[24px] border border-white/70 bg-[linear-gradient(150deg,rgba(255,255,255,.75),rgba(205,190,255,.55))] p-5 shadow-[0_30px_50px_-20px_rgba(70,50,220,.6)] backdrop-blur-md">
              <span className="mb-2 block h-1 w-5 rounded-full bg-[linear-gradient(90deg,#2f8bff,#7b3cff)]" />
              <p className="text-[clamp(12px,1.15vw,15px)] leading-[1.4] font-medium text-ink-2">
                Innover
                <br />
                Créer
                <br />
                <span className="inline-flex items-center gap-2">Transformer <Arrow className="size-3.5 text-violet" /></span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* =====================================================
          NOTRE MISSION
      ===================================================== */}

      <section
        id="mission"
        className="isolate relative overflow-hidden bg-[linear-gradient(180deg,#fbfbff,#f1eeff_70%,#fbfbff)] py-[70px]"
      >
        {/* Ruban de verre sur le bord droit */}
        <svg className="pointer-events-none absolute right-0 bottom-[8%] hidden h-[62%] w-[14%] lg:block" viewBox="0 0 160 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="ab-rib" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3ac8ff" />
              <stop offset=".5" stopColor="#5a7bff" />
              <stop offset="1" stopColor="#9b5cff" />
            </linearGradient>
          </defs>
          <path d="M160 0 C 60 30, 10 120, 60 200 C 90 250, 140 270, 160 300 L 160 230 C 120 210, 90 170, 100 120 C 110 70, 140 40, 160 30 Z" fill="url(#ab-rib)" opacity=".9" />
          <path d="M160 0 C 60 30, 10 120, 60 200" stroke="#fff" strokeOpacity=".8" strokeWidth="2.5" />
        </svg>

        <div className={`${tw.wrap} grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]`}>
          {/* Globe */}
          <Reveal className="relative mx-auto aspect-square w-full max-w-[420px] min-w-0">
            <Globe />

            {orbitIcons.map((o, i) => (
              <span
                key={i}
                className={`absolute z-[3] grid size-[52px] animate-float place-items-center overflow-hidden rounded-[15px] border border-white/40 bg-[linear-gradient(150deg,#5a8bff,#3a4bff_45%,#3a1fc9)] shadow-[0_5px_0_#2a1f9e,0_18px_30px_-8px_rgba(50,50,230,.75),inset_0_1px_0_rgba(255,255,255,.55)] before:absolute before:inset-x-1 before:top-0.5 before:h-1/2 before:rounded-[12px] before:bg-[linear-gradient(rgba(255,255,255,.35),transparent)] ${o.pos}`}
                style={{ animationDelay: `${-i * 1.4}s` }}
              >
                <Icon className="relative size-[22px]" stroke="#fff">{o.icon}</Icon>
              </span>
            ))}
          </Reveal>

          <Reveal className="min-w-0" delay={120}>
            <span className={kicker}>Notre mission</span>

            <h2 className={h2}>
              Transformer vos idées
              <br />
              en solutions numériques
              <br />
              performantes
            </h2>

            <p className="mb-8 max-w-[520px] text-[13.5px] leading-[1.75] text-body">
              Nous croyons que chaque entreprise a un potentiel unique. Notre
              mission est de vous accompagner dans cette transformation en vous
              apportant des solutions technologiques adaptées, qui simplifient
              vos processus, améliorent votre productivité et accélèrent votre
              croissance.
            </p>

            <ul className="flex flex-wrap gap-x-10 gap-y-5">
              {missionPoints.map((p) => (
                <li key={p.label} className="flex items-center gap-3">
                  <span className={`${icoWhite} size-11`}>
                    <Icon className="size-5">{p.icon}</Icon>
                  </span>
                  <span className="text-[11.5px] leading-[1.45] whitespace-pre-line text-body">{p.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>


      {/* =====================================================
          NOTRE HISTOIRE
      ===================================================== */}

      <section
        id="histoire"
        className="
          isolate
          relative
          overflow-hidden
          py-[70px]
        "
      >
        <Shapes items={decor.right} />
        <Ribbon />

        <span
          className="
            absolute
            left-[25%]
            top-[-100px]
            -z-[1]
            size-[650px]
            rounded-full
            bg-[radial-gradient(circle,rgba(123,60,255,.10),transparent_65%)]
          "
        />

        <div
          className={`
            ${tw.wrap}
            grid
            items-center
            gap-10
            lg:grid-cols-[.85fr_1.25fr_.85fr]
          `}
        >

          {/* =================================================
              TEXTE HISTOIRE
          ================================================= */}

          <Reveal className="relative z-30 min-w-0">
            <span className={tw.kicker}>
              Notre histoire
            </span>

            <h2 className={tw.h2}>
              Une vision née
              <br />
              d’une passion
            </h2>

            <p className={tw.lead}>
              Eray Digital est née de la volonté de créer une entreprise où
              la technologie rencontre la créativité. Nous croyons qu’un bon
              projet ne se limite pas à ce qui est demandé, mais qu’il doit
              apporter une réelle valeur, innover et évoluer avec le temps.
            </p>

            <blockquote
              className="
                relative
                z-30
                m-0
                mt-8
                flex
                items-center
                gap-4
                rounded-[18px]
                border
                border-[#8877ff]/30
                bg-white/40
                px-5
                py-5
                shadow-[0_20px_50px_-25px_rgba(74,54,220,.4)]
                backdrop-blur-xl
              "
            >
              <img
                src={targetGif}
                alt=""
                className="size-[54px] object-contain"
              />

              <p className="text-sm leading-[1.6] font-medium text-[#3a2d8f] italic">
                “Transformer vos idées en solutions digitales performantes.”
              </p>
            </blockquote>
          </Reveal>


          {/* =================================================
              ORBIT GALLERY
          ================================================= */}

          <Reveal
  className="
    relative
    z-10
    min-w-0
    lg:-mx-10
  "
  delay={100}
>
  <GlassComposition 
    logo="/eray-logo.png" 
    mainImage={roomPhoto} // ou la photo de montagne de ton choix
  />
</Reveal>


          {/* =================================================
              MISSION / VISION
          ================================================= */}

          <div className="relative z-30 grid min-w-0 gap-5">

            {/* MISSION */}

            <Reveal
              className="
                flex
                gap-5
                rounded-[28px]
                border
                border-[#8a79ff]/30
                bg-white/45
                p-6
                shadow-[0_25px_60px_-25px_rgba(75,55,220,.35)]
                backdrop-blur-xl
              "
              delay={150}
            >
              <span
                className="
                  grid
                  size-[58px]
                  shrink-0
                  place-items-center
                  rounded-full
                  bg-white
                  shadow-[0_10px_30px_-10px_rgba(75,55,220,.35)]
                "
              >
                <img
                  src={rocketGif}
                  alt=""
                  className="size-[42px] object-contain"
                />
              </span>

              <div>
                <h3 className="mb-2.5 font-sora text-[18px] font-semibold text-ink">
                  Notre mission
                </h3>

                <p className="text-[13px] leading-[1.7] text-body">
                  Accompagner nos clients dans la réalisation de leurs projets
                  digitaux en apportant notre expertise, notre créativité et
                  notre engagement.
                </p>
              </div>
            </Reveal>


            {/* VISION */}

            <Reveal
              className="
                flex
                gap-5
                rounded-[28px]
                border
                border-[#8a79ff]/30
                bg-white/45
                p-6
                shadow-[0_25px_60px_-25px_rgba(75,55,220,.35)]
                backdrop-blur-xl
              "
              delay={250}
            >
              <span
                className="
                  grid
                  size-[58px]
                  shrink-0
                  place-items-center
                  rounded-full
                  bg-white
                  shadow-[0_10px_30px_-10px_rgba(75,55,220,.35)]
                "
              >
                <img
                  src={eyeGif}
                  alt=""
                  className="size-[42px] object-contain"
                />
              </span>

              <div>
                <h3 className="mb-2.5 font-sora text-[18px] font-semibold text-ink">
                  Notre vision
                </h3>

                <p className="text-[13px] leading-[1.7] text-body">
                  Devenir un acteur de référence dans le domaine du digital,
                  reconnu pour la qualité de nos solutions, notre approche
                  innovante et la confiance de nos clients.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* =====================================================
          VALEURS
      ===================================================== */}

      <section className="isolate relative py-[70px]">
        <Shapes items={decor.soft} />

        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]`}>
          <Reveal className="min-w-0">
            <span className={kicker}>Nos valeurs</span>

            <h2 className={h2}>
              Nos valeurs
              <br />
              nous guident chaque jour
            </h2>

            <p className="mb-8 max-w-[440px] text-[13.5px] leading-[1.75] text-body">
              Chez Eray Digital, nos valeurs sont le fondement de tout ce que
              nous faisons. Elles nous permettent de créer des solutions
              fiables, durables et centrées sur vos besoins.
            </p>

            <Link to="/services" className={btn}>
              En savoir plus
              <Arrow />
            </Link>
          </Reveal>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} className={`${tw.card} min-w-0 px-6 py-6`} delay={i * 90}>
                <span className={`${icoWhite} mb-3 size-11`}>
                  <Icon className="size-[22px]">{v.icon}</Icon>
                </span>

                <h3 className="mb-1.5 font-sora text-[15px] font-semibold text-ink-2">{v.title}</h3>

                <p className="text-[11.5px] leading-[1.6] whitespace-pre-line text-mute">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* =====================================================
          CHIFFRES
      ===================================================== */}

      <section className="relative isolate overflow-hidden bg-[linear-gradient(100deg,#5a3cff,#6a5bff_35%,#7f9bff_70%,#9cc4ff)] py-12 text-white">
        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0 160 C 300 90, 560 210, 860 140 S 1300 60, 1440 110 L1440 220 L0 220 Z" fill="rgba(255,255,255,.08)" />
          <path d="M520 0 C 700 80, 900 20, 1100 70 S 1380 140, 1440 90 L1440 0 Z" fill="rgba(255,255,255,.1)" />
          <path d="M0 160 C 300 90, 560 210, 860 140 S 1300 60, 1440 110" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
        </svg>

        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.95fr_1.6fr]`}>
          <Reveal className="min-w-0">
            <span className="mb-3 block text-[10px] font-bold tracking-[0.28em] text-white/80 uppercase">En quelques chiffres</span>

            <h2 className="mb-3 font-sora text-[clamp(22px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.03em] text-white">
              Une croissance portée
              <br />
              par la confiance
            </h2>

            <p className="max-w-[400px] text-[12.5px] leading-[1.7] text-white/85">
              Depuis notre création, nous avons eu le privilège d’accompagner
              de nombreuses entreprises dans leurs projets digitaux. Et ce
              n’est que le début !
            </p>
          </Reveal>

          <ul className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} className="min-w-0" delay={i * 90}>
                <Icon className="mb-3 size-8" stroke="rgba(255,255,255,.9)">{s.icon}</Icon>
                <strong className="block font-sora text-[clamp(28px,2.6vw,36px)] leading-none font-semibold tracking-[-0.02em] text-white">{s.value}</strong>
                <span className="mt-2 block text-[11.5px] text-white/80">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>


      {/* =====================================================
          ÉQUIPE
      ===================================================== */}

      <section className="isolate relative py-[70px]">
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[1.05fr_1fr_0.6fr]`}>
          <Reveal className="relative min-w-0">
            {/* Vague de verre derrière la photo */}
            <span className="absolute top-[14%] -left-[18%] h-[72%] w-[50%] -rotate-[12deg] rounded-[50%] bg-[linear-gradient(135deg,rgba(143,168,255,.7),rgba(150,100,255,.55))] blur-[1px]" aria-hidden="true" />

            <div className="relative aspect-[1.6] overflow-hidden rounded-[28px] border-[3px] border-white shadow-[0_34px_70px_-28px_rgba(70,50,220,.6)] [transform:perspective(1200px)_rotateY(8deg)]">
              <img src={roomPhoto} alt="Les bureaux d'Eray Digital" className="size-full object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,91,255,.15),rgba(90,40,220,.3))]" />
              <img src="/eray-logo.png" alt="" className="absolute top-[12%] left-1/2 h-10 w-auto -translate-x-1/2 rounded-lg bg-white/90 p-1 shadow-[0_0_24px_rgba(160,140,255,.8)]" />
            </div>
          </Reveal>

          <Reveal className="min-w-0" delay={100}>
            <span className={kicker}>Notre équipe</span>

            <h2 className={h2}>
              Des experts passionnés
              <br />
              et engagés
            </h2>

            <p className="mb-7 text-[13px] leading-[1.75] text-body">
              Notre équipe réunit des développeurs, designers, chefs de projet
              et spécialistes en nouvelles technologies. Ensemble, nous mettons
              notre savoir-faire et notre créativité au service de vos projets.
            </p>

            <Link to="/contact" className={btn}>
              Rencontrer l’équipe
              <Arrow />
            </Link>
          </Reveal>

          <Reveal as="ul" className="grid min-w-0 gap-5 lg:border-l lg:border-violet/15 lg:pl-8" delay={200}>
            {roles.map((r) => (
              <li key={r.label} className="flex items-center gap-3.5">
                <span className={`${icoWhite} size-10`}>
                  <Icon className="size-5">{r.icon}</Icon>
                </span>
                <span className="text-[12px] leading-[1.35] font-medium whitespace-pre-line text-ink-2">{r.label}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="isolate relative pt-2 pb-[70px]">
        <div className={tw.wrap}>
          <Reveal className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(100deg,#2f8bff,#3a6bff_45%,#5a3cff_80%,#8b5cff)] px-8 py-10 text-white shadow-[0_30px_70px_-25px_rgba(60,60,255,.7)] md:px-12">
            {/* Anneau 3D brillant */}
            <svg className="pointer-events-none absolute -right-6 -bottom-10 hidden h-[150%] w-[34%] md:block" viewBox="0 0 300 220" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="ab-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#9be8ff" />
                  <stop offset=".35" stopColor="#3a6bff" />
                  <stop offset=".7" stopColor="#8b3cff" />
                  <stop offset="1" stopColor="#e0b8ff" />
                </linearGradient>
              </defs>
              <ellipse cx="160" cy="120" rx="110" ry="58" transform="rotate(-22 160 120)" stroke="url(#ab-ring)" strokeWidth="26" />
              <ellipse cx="160" cy="120" rx="110" ry="58" transform="rotate(-22 160 120)" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
              <ellipse cx="150" cy="128" rx="80" ry="40" transform="rotate(-8 150 128)" stroke="url(#ab-ring)" strokeWidth="14" opacity=".85" />
            </svg>

            <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:pr-[22%]">
              <div>
                <span className="mb-2.5 block text-[10px] font-bold tracking-[0.28em] text-white/80 uppercase">Prêt à démarrer ?</span>

                <h2 className="mb-3 font-sora text-[clamp(22px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.03em] text-white">
                  Ensemble, donnons vie
                  <br />
                  à vos projets digitaux
                </h2>

                <p className="text-[12px] leading-[1.6] text-white/85">
                  Vous avez une idée ? Un projet ? Une problématique à résoudre ?
                  <br />
                  Notre équipe est là pour vous accompagner.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Link to="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-sora text-[12.5px] font-semibold text-[#3a4bff] shadow-[0_18px_36px_-14px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5">
                  Demander un devis
                  <Arrow />
                </Link>

                <Link to="/contact" className="group inline-flex items-center gap-2.5 text-[12.5px] font-semibold text-white">
                  <span className="grid size-8 place-items-center rounded-full border border-white/80">
                    <Icon className="size-3.5 translate-x-px" stroke="#fff">{extra.play}</Icon>
                  </span>
                  Nous contacter
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}


export default AboutPage
