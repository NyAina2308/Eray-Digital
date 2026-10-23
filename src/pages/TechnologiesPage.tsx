import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor } from '../components/Decor'
import { tw, Arrow, Icon, ic } from '../components/ui'
import ordiSticker from '../assets/stickers/ordi.png'
import circuitBg from '../assets/backgrounds/circuit.svg'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const logo = (name: string, variant = 'original') => `${DEVICON}/${name}/${name}-${variant}.svg`

function WhiteIcon({ children }: { children: ReactNode }) {
  return <Icon className="size-[26px]" stroke="#fff">{children}</Icon>
}

type Tech = { name: string; src: string }
type Group = { title: string; text: string; color: string; icon: ReactNode; techs: Tech[] }

const groups: Group[] = [
  {
    title: 'Frontend',
    text: 'Des interfaces modernes, rapides et adaptées à tous les écrans.',
    color: 'bg-[linear-gradient(145deg,#8b7bff,#6a3cff)]',
    icon: <WhiteIcon><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></WhiteIcon>,
    techs: [
      { name: 'React', src: logo('react') },
      { name: 'HTML', src: logo('html5') },
      { name: 'CSS', src: logo('css3') },
      { name: 'JavaScript', src: logo('javascript') },
      { name: 'Tailwind CSS', src: logo('tailwindcss') },
    ],
  },
  {
    title: 'Backend',
    text: 'Des systèmes robustes et sécurisés pour vos applications.',
    color: 'bg-[linear-gradient(145deg,#4a7bff,#2f4bff)]',
    icon: <WhiteIcon><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></WhiteIcon>,
    techs: [
      { name: 'Node.js', src: logo('nodejs') },
      { name: 'Express', src: logo('express') },
      { name: 'PHP', src: logo('php') },
      { name: 'Symfony', src: logo('symfony') },
      { name: 'Python', src: logo('python') },
    ],
  },
  {
    title: 'Bases de données',
    text: 'Des données bien organisées pour une meilleure performance.',
    color: 'bg-[linear-gradient(145deg,#7b3cff,#5a2bd8)]',
    icon: <WhiteIcon><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></WhiteIcon>,
    techs: [
      { name: 'MySQL', src: logo('mysql') },
      { name: 'PostgreSQL', src: logo('postgresql') },
      { name: 'MongoDB', src: logo('mongodb') },
    ],
  },
  {
    title: 'Design',
    text: 'Des visuels qui renforcent votre identité et votre message.',
    color: 'bg-[linear-gradient(145deg,#2fd6a8,#11b58a)]',
    icon: <WhiteIcon><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5z" /><path d="M7.5 11h.01M10 7h.01M15 7.5h.01" /></WhiteIcon>,
    techs: [
      { name: 'Figma', src: logo('figma') },
      { name: 'Adobe Illustrator', src: logo('illustrator', 'plain') },
      { name: 'Adobe Photoshop', src: logo('photoshop', 'plain') },
    ],
  },
  {
    title: 'Outils',
    text: 'Pour un développement plus fluide, une meilleure collaboration et un suivi optimal.',
    color: 'bg-[linear-gradient(145deg,#ff6b8a,#f0436b)]',
    icon: <WhiteIcon><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z" /></WhiteIcon>,
    techs: [
      { name: 'Git', src: logo('git') },
      { name: 'GitHub', src: logo('github') },
      { name: 'Docker', src: logo('docker') },
      { name: 'VS Code', src: logo('vscode') },
    ],
  },
  {
    title: 'Autres technologies',
    text: 'Selon les besoins du projet, nous intégrons d’autres outils et solutions.',
    color: 'bg-[linear-gradient(145deg,#8b5cff,#6a3cff)]',
    icon: <WhiteIcon>{ic.cloud}</WhiteIcon>,
    techs: [
      { name: 'Firebase', src: logo('firebase', 'plain') },
      { name: 'Linux', src: logo('linux') },
      { name: 'Elasticsearch', src: logo('elasticsearch') },
      { name: 'Nginx', src: logo('nginx') },
    ],
  },
]

/* Liste de logos qui défile en boucle. On répète les technos pour remplir la largeur,
   puis on double la piste : l'animation la décale de -50 % pour un raccord invisible. */
function TechMarquee({ techs }: { techs: Tech[] }) {
  const lap = Array.from({ length: Math.ceil(6 / techs.length) }, () => techs).flat()
  const box = useRef<HTMLDivElement>(null)

  /* À chaque image, --focus vaut 1 pour le logo au centre du bloc et 0 sur les bords :
     il sert à agrandir et illuminer le logo qui passe au milieu. */
  useEffect(() => {
    const el = box.current
    if (!el) return
    let frame = 0
    const tick = () => {
      const r = el.getBoundingClientRect()
      if (r.bottom > 0 && r.top < window.innerHeight) {
        const mid = r.left + r.width / 2
        for (const li of el.querySelectorAll<HTMLElement>('li')) {
          const b = li.getBoundingClientRect()
          // Zone d'effet ≈ un logo de part et d'autre du centre : seul celui du milieu grossit.
          const t = Math.max(0, 1 - Math.abs(b.left + b.width / 2 - mid) / (b.width * 1.1))
          li.style.setProperty('--focus', (t * t * (3 - 2 * t)).toFixed(3))
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div ref={box} className="marquee -mx-6 -mt-2 overflow-hidden pt-9 pb-3">
      <ul
        className="flex w-max list-none items-end p-0"
        style={{ animation: `marquee ${lap.length * 3.2}s linear infinite reverse` }}
      >
        {/* Le logo grossit par ses vraies dimensions (et non un scale) pour rester net ;
            la largeur du <li> reste fixe pour que la boucle reste parfaitement raccordée. */}
        {[...lap, ...lap].map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= lap.length || undefined}
            className="group grid min-w-[92px] shrink-0 justify-items-center gap-2 px-3 text-center font-medium text-ink"
          >
            <span
              className="icon-glow relative grid size-[calc(48px+var(--focus,0)*20px)] place-items-center rounded-[calc(14px+var(--focus,0)*4px)] bg-[linear-gradient(145deg,#fff,#f1efff)] transition-[translate] duration-300 group-hover:-translate-y-1"
              style={{ animationDelay: `${(i % lap.length) * -0.45}s` }}
            >
              {/* Halo renforcé pour le logo au centre */}
              <span aria-hidden="true" className="absolute -inset-2 -z-10 rounded-[22px] bg-[radial-gradient(circle,rgba(123,92,255,.45),rgba(47,139,255,.2)_55%,transparent_75%)] opacity-[var(--focus,0)] blur-md" />
              <img src={t.src} alt="" loading="lazy" className="size-[calc(28px+var(--focus,0)*12px)] object-contain" />
            </span>
            {/* Copie invisible à la taille maximale : réserve la largeur du nom agrandi
                pour que le <li> ne change jamais de largeur pendant le défilement. */}
            <span className="grid place-items-center whitespace-nowrap">
              <span aria-hidden="true" className="invisible col-start-1 row-start-1 text-[13px]">{t.name}</span>
              <span className="col-start-1 row-start-1 [font-size:calc(11px+var(--focus,0)*2px)]">{t.name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TechnologiesPage() {
  return (
    <div className={tw.page}>
      {/* ============================== HERO ============================== */}
      <section className="isolate relative bg-[linear-gradient(180deg,transparent_70%,rgba(236,234,255,.6))] pt-[110px] pb-10">
        <Shapes items={decor.hero} />
        <Ribbon />
        <div className={`${tw.wrap} grid items-center gap-[30px] lg:grid-cols-[0.95fr_1.05fr]`}>
          <Reveal className="min-w-0">
            <span className="mb-[18px] inline-block rounded-full bg-violet/10 px-3.5 py-1.5 text-xs font-semibold text-[#3a2bd8]">◆ Technologies &amp; outils</span>
            <h1 className="mb-3.5 font-sora text-[clamp(34px,3.8vw,50px)] leading-[1.05] font-bold tracking-[-0.035em] text-ink">
              Les <span className="text-grad">technologies</span><br />que <span className="text-grad">nous utilisons</span>
            </h1>
            <p className="mb-4 text-lg font-semibold text-ink">Des outils modernes pour des solutions durables</p>
            <p className="mb-[26px] max-w-[460px] text-sm leading-[1.7] text-body">
              Nous maîtrisons un ensemble de technologies modernes et fiables pour créer des solutions performantes,
              évolutives et adaptées aux besoins de chaque projet.
            </p>
            <div className="flex max-w-[450px] items-center gap-[18px] rounded-3xl bg-[#e1e6ff]/70 px-6 py-[18px]">
              <Icon className="size-7 shrink-0" stroke="#3a4bff">{ic.bulb}</Icon>
              <p className="text-[12.5px] leading-[1.6] text-ink">Nous choisissons les technologies en fonction des besoins du projet, et non l’inverse.</p>
            </div>
          </Reveal>

          <Reveal
  className="relative h-[340px] min-w-0 sm:h-[410px] lg:h-[430px]"
  delay={120}
>
  {/* =========================================================
      FOND STYLISÉ
      ========================================================= */}

  {/* Grande forme blanche/lavande principale */}
  <span
    aria-hidden="true"
    className="
      absolute
      inset-[2%_-4%_4%_-5%]
      rounded-[50%_46%_42%_58%/48%_52%_45%_55%]
      bg-[linear-gradient(145deg,#f8f8ff_5%,#eef0ff_45%,#f4eaff_100%)]
      opacity-95
    "
  />

  {/* Halo violet derrière l'ordinateur */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[28%]
      top-[18%]
      h-[58%]
      w-[48%]
      rounded-full
      bg-[#a87cff]/30
      blur-[35px]
    "
  />

  {/* Halo bleu */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[7%]
      top-[55%]
      h-[20%]
      w-[28%]
      rounded-full
      bg-[#3288ff]/55
      blur-[2px]
      rotate-[8deg]
    "
  />

  {/* Forme bleue organique gauche-bas */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[4%]
      bottom-[13%]
      h-[48px]
      w-[145px]
      rotate-[8deg]
      rounded-[50%_40%_55%_45%]
      bg-[linear-gradient(100deg,#3b8fff,#5149ff)]
      opacity-90
    "
  />

  {/* Forme violette droite */}
  <span
    aria-hidden="true"
    className="
      absolute
      right-[0%]
      top-[48%]
      h-[70px]
      w-[145px]
      rotate-[-12deg]
      rounded-[55%_45%_48%_52%]
      bg-[linear-gradient(120deg,#b477ff,#a65cf5)]
      opacity-80
    "
  />

  {/* Petite forme bleue verticale */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[57%]
      top-[10%]
      h-[42px]
      w-[11px]
      rotate-[3deg]
      rounded-full
      bg-[linear-gradient(#8c9dff,#4c82ff)]
      opacity-65
      blur-[1px]
    "
  />

  {/* Deuxième petite forme lumineuse */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[60%]
      top-[7%]
      h-[25px]
      w-[8px]
      rounded-full
      bg-[#bcaaff]
      opacity-70
      blur-[2px]
    "
  />

  {/* Halo bleu-violet inférieur */}
  <span
    aria-hidden="true"
    className="
      absolute
      left-[20%]
      bottom-[4%]
      h-[55px]
      w-[65%]
      rounded-full
      bg-[radial-gradient(ellipse,#9b7cff55,transparent_70%)]
      blur-[8px]
    "
  />

  {/* =========================================================
      PETIT MESSAGE MANUSCRIT
      ========================================================= */}

  <span
    className={`
      ${tw.script}
      absolute
      right-[1%]
      top-[1%]
      z-[10]
      hidden
      -rotate-[9deg]
      text-[15px]
      leading-[1.15]
      text-[#20254f]
      sm:block
      lg:text-[17px]
    `}
  >
    Des outils puissants,<br />
    pour vos idées !
  </span>

  {/* Flèche dessinée à la main */}
  <svg
    aria-hidden="true"
    className="
      absolute
      right-[3%]
      top-[10%]
      z-[10]
      hidden
      h-[65px]
      w-[55px]
      rotate-[8deg]
      text-[#20254f]
      sm:block
    "
    viewBox="0 0 60 70"
    fill="none"
  >
    <path
      d="M42 3C45 18 39 30 30 39C23 46 15 49 9 51"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    <path
      d="M9 51L15 48M9 51L14 55"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>

  {/* =========================================================
      ORDINATEUR REALISTE
      ========================================================= */}

  <img
    src={ordiSticker}
    alt="Ordinateur affichant du code"
    className="
      absolute
      left-[7%]
      top-[19%]
      z-[6]
      w-[76%]
      max-w-none
      object-contain
      drop-shadow-[0_25px_30px_rgba(55,45,180,.30)]
      transition-transform
      duration-500
      hover:scale-[1.02]
    "
  />

  {/* =========================================================
      LOGOS FLOTTANTS
      ========================================================= */}

  {/* React */}
  <span
    className="
      absolute
      left-[10%]
      top-[17%]
      z-[8]
      grid
      size-[58px]
      -rotate-[8deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#25296d,#101333)]
      shadow-[0_15px_25px_-10px_rgba(30,30,120,.55)]
      sm:size-[65px]
    "
  >
    <img
      src={logo('react')}
      alt=""
      className="size-[60%] object-contain"
    />
  </span>

  {/* JavaScript */}
  <span
    className="
      absolute
      left-[34%]
      top-[2%]
      z-[8]
      grid
      size-[50px]
      rotate-[7deg]
      place-items-center
      rounded-[9px]
      bg-[#f7df1e]
      shadow-[0_15px_25px_-10px_rgba(30,30,120,.4)]
      sm:size-[57px]
    "
  >
    <img
      src={logo('javascript')}
      alt=""
      className="size-[60%] object-contain"
    />
  </span>

  {/* Git */}
  <span
    className="
      absolute
      left-[3%]
      top-[49%]
      z-[8]
      grid
      size-[52px]
      -rotate-[12deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#ff716b,#dd3f39)]
      shadow-[0_15px_25px_-10px_rgba(150,40,40,.5)]
      sm:size-[58px]
    "
  >
    <img
      src={logo('git')}
      alt=""
      className="size-[62%] object-contain"
    />
  </span>

  {/* TypeScript */}
  <span
    className="
      absolute
      left-[57%]
      top-[6%]
      z-[8]
      grid
      size-[57px]
      rotate-[8deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#6155ff,#382bd5)]
      shadow-[0_15px_25px_-10px_rgba(40,30,160,.55)]
    "
  >
    <img
      src={logo('typescript')}
      alt=""
      className="size-[60%] object-contain"
    />
  </span>

  {/* Figma */}
  <span
    className="
      absolute
      left-[19%]
      top-[55%]
      z-[8]
      grid
      size-[54px]
      -rotate-[6deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#438fff,#1d5bff)]
      shadow-[0_15px_25px_-10px_rgba(30,70,180,.55)]
    "
  >
    <img
      src={logo('figma')}
      alt=""
      className="size-[62%] object-contain"
    />
  </span>

  {/* PostgreSQL */}
  <span
    className="
      absolute
      right-[11%]
      top-[48%]
      z-[8]
      grid
      size-[58px]
      -rotate-[6deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#25296d,#101333)]
      shadow-[0_15px_25px_-10px_rgba(30,30,120,.55)]
    "
  >
    <img
      src={logo('postgresql')}
      alt=""
      className="size-[62%] object-contain"
    />
  </span>

  {/* Python */}
  <span
    className="
      absolute
      left-[57%]
      bottom-[2%]
      z-[8]
      grid
      size-[65px]
      -rotate-[10deg]
      place-items-center
      rounded-[13px]
      bg-[linear-gradient(145deg,#3776ff,#1e42d8)]
      shadow-[0_18px_28px_-12px_rgba(30,50,180,.6)]
    "
  >
    <img
      src={logo('python')}
      alt=""
      className="size-[60%] object-contain"
    />
  </span>

  {/* Node.js */}
  <span
    className="
      absolute
      right-[4%]
      bottom-[2%]
      z-[8]
      grid
      size-[56px]
      rotate-[8deg]
      place-items-center
      rounded-[12px]
      bg-[linear-gradient(145deg,#25296d,#101333)]
      shadow-[0_15px_25px_-10px_rgba(30,30,120,.55)]
    "
  >
    <img
      src={logo('nodejs')}
      alt=""
      className="size-[62%] object-contain"
    />
  </span>
</Reveal>
        </div>
      </section>

      {/* ============================= GROUPES ============================ */}
      <section className="isolate relative overflow-hidden bg-[linear-gradient(180deg,#fff,#f6f4ff_40%,#f1f4ff)] pt-[50px] pb-[60px]">
        {/* Fond : motif de circuit imprimé qui dérive lentement, estompé sur les bords */}
        <span
          aria-hidden="true"
          className="motion-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,#000_30%,transparent)]"
          style={{ backgroundImage: `url(${circuitBg})`, backgroundSize: '240px', animation: 'circuit-drift 40s linear infinite' }}
        />
        {/* Halos lumineux qui respirent */}
        <span aria-hidden="true" className="motion-bg absolute top-[8%] left-[-8%] -z-10 size-[420px] rounded-full bg-[#8b7bff]/25 blur-[90px]" style={{ animation: 'glow-pulse 9s ease-in-out infinite' }} />
        <span aria-hidden="true" className="motion-bg absolute right-[-6%] bottom-[5%] -z-10 size-[460px] rounded-full bg-[#2f8bff]/20 blur-[100px]" style={{ animation: 'glow-pulse 11s ease-in-out -4s infinite' }} />
        <Shapes items={decor.right} />
        <Ribbon />
        <div className={`${tw.wrap} grid gap-7 md:grid-cols-2 lg:grid-cols-[1fr_1.05fr_0.95fr]`}>
          {groups.map((g, i) => (
            <Reveal key={g.title} className="min-w-0 rounded-[20px] border border-violet/12 bg-white/85 px-6 pt-[22px] pb-5 shadow-[0_20px_50px_-34px_rgba(70,50,200,.45)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(70,50,200,.5)]" delay={(i % 3) * 90}>
              <div className="mb-[22px] flex gap-[26px]">
                <span className={`grid size-[52px] shrink-0 place-items-center rounded-[14px] shadow-[0_12px_24px_-10px_rgba(80,60,255,.5)] ${g.color}`}>{g.icon}</span>
                <div>
                  <h2 className="mt-0.5 mb-2 font-sora text-lg font-semibold text-ink">{g.title}</h2>
                  <p className="text-[12.5px] leading-[1.55] text-body">{g.text}</p>
                </div>
              </div>
              <TechMarquee techs={g.techs} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="isolate relative overflow-hidden rounded-t-[60%_30px] bg-[radial-gradient(500px_260px_at_0%_100%,rgba(90,60,255,.7),transparent_70%),radial-gradient(400px_260px_at_100%_100%,rgba(47,139,255,.7),transparent_70%)] bg-night pt-[50px] pb-[60px] text-white">
        <Shapes items={decor.dark} />
        <span className="absolute top-0 right-0 h-full w-[30%] bg-[repeating-linear-gradient(0deg,transparent_0_10px,rgba(111,168,255,.5)_10px_12px)] opacity-25 [mask-image:linear-gradient(90deg,transparent,#000)]" aria-hidden="true" />
        <div className={`${tw.wrap} grid items-center gap-[30px] md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.6fr]`}>
          <div className="md:col-span-2 lg:col-span-1">
            <span className="mb-3.5 block text-[13px] font-medium text-[#7fb0ff]">Prêt à concrétiser votre projet ?</span>
            <h2 className="mb-4 font-sora text-[clamp(26px,2.6vw,34px)] leading-[1.1] font-bold tracking-[-0.02em] text-white">
              La bonne technologie<br />pour <span className="bg-[linear-gradient(95deg,#6fa8ff,#b07bff)] bg-clip-text text-transparent">la bonne solution.</span>
            </h2>
            <p className="text-[13px] leading-[1.65] opacity-90">Que ce soit pour un site web, un logiciel ou une identité visuelle, notre équipe choisit les meilleurs outils pour donner vie à vos idées.</p>
          </div>
          <Link to="/contact" className={`${tw.btnWhite} justify-self-start`}>
            <Icon className="size-4" stroke="currentColor">{ic.send}</Icon> Parler de mon projet <Arrow />
          </Link>
          <span className={`${tw.script} hidden -rotate-8 text-2xl leading-[1.2] md:block`}>De l’idée<br />au produit final</span>
        </div>
      </section>
    </div>
  )
}

export default TechnologiesPage
