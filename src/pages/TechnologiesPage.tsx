import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor } from '../components/Decor'
import { tw, Arrow, Icon, ic } from '../components/ui'

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

/** Tuiles de logos flottant autour de l'ordinateur. */
const floating = [
  { src: logo('react'), cls: 'left-[16%] top-[12%] size-[70px] -rotate-8 bg-[linear-gradient(145deg,#1d1f5a,#0d0e2e)]' },
  { src: logo('javascript'), cls: 'left-[36%] top-[2%] size-[60px] rotate-6 bg-[#f7df1e] [animation-delay:-1s]' },
  { src: logo('git'), cls: 'left-[8%] top-[46%] size-[60px] -rotate-12 bg-[linear-gradient(145deg,#ff6b6b,#e0433a)] [animation-delay:-2s]' },
  { src: logo('typescript'), cls: 'left-[64%] top-[6%] size-16 rotate-8 bg-[linear-gradient(145deg,#5a4bff,#3a2bd8)] [animation-delay:-3s]' },
  { src: logo('figma'), cls: 'left-[22%] top-[55%] size-[60px] -rotate-6 bg-[linear-gradient(145deg,#3a8bff,#1d5bff)] [animation-delay:-1.5s]' },
  { src: logo('postgresql'), cls: 'right-[12%] top-[50%] size-[60px] -rotate-6 bg-[linear-gradient(145deg,#1d1f5a,#0d0e2e)] [animation-delay:-2.5s]' },
  { src: logo('python'), cls: 'left-[60%] top-[68%] size-[70px] -rotate-10 bg-[linear-gradient(145deg,#2f6bff,#1d3bd8)] [animation-delay:-.5s]' },
  { src: logo('nodejs'), cls: 'right-[8%] top-[72%] size-[60px] rotate-8 bg-[linear-gradient(145deg,#1d1f5a,#0d0e2e)] [animation-delay:-3.5s]' },
]

const codeLines = [38, 62, 50, 74, 30, 58, 44, 68, 36, 54, 70, 26, 48]

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

          <Reveal className="relative h-[320px] min-w-0 sm:h-[400px]" delay={120}>
            <span className={`${tw.script} absolute -top-5 -right-2.5 z-[2] hidden -rotate-12 text-xl leading-[1.2] text-ink-2 sm:block`}>Des outils puissants,<br />pour vos idées !</span>
            <span className="absolute inset-[4%_0_0_0] rounded-[48%_52%_40%_60%/55%_45%_55%_45%] bg-[radial-gradient(circle_at_55%_45%,rgba(123,60,255,.35),rgba(170,140,255,.2)_50%,rgba(47,139,255,.08)_75%)]" />
            <div className="absolute top-[22%] left-[22%] w-[52%] [transform:perspective(1200px)_rotateX(10deg)_rotate(-4deg)]">
              <div className="grid aspect-[16/10.5] content-start gap-[7px] rounded-[14px_14px_4px_4px] border-8 border-[#0d0e24] bg-[#11122e] px-[18px] py-4 shadow-[0_30px_60px_-20px_rgba(40,30,160,.6)]">
                {codeLines.map((w, i) => (
                  <i
                    key={i}
                    className={`block h-1 rounded opacity-75 ${i % 3 === 2 ? 'bg-[linear-gradient(90deg,#ff8fb1,#9b7bff)]' : 'bg-[linear-gradient(90deg,#6fa8ff,#9b7bff_50%,#4ad6c0)]'}`}
                    style={{ width: `${w}%`, marginLeft: `${(i % 4) * 5}%` }}
                  />
                ))}
              </div>
              <div className="mx-[-8%] h-3.5 rounded-b-[18px] bg-[linear-gradient(#e6e7f2,#b9bbd0)] shadow-[0_20px_30px_-10px_rgba(40,30,120,.4)]" />
            </div>
            {/* Plante */}
            <span className="absolute top-[40%] right-[4%] hidden h-20 w-[70px] rounded-[10px_10px_20px_20px] bg-[linear-gradient(#fff,#e6e7f2)] shadow-[0_16px_30px_-12px_rgba(40,30,120,.4)] sm:block">
              <span className="absolute inset-x-[-14px] bottom-[70%] h-20 bg-[radial-gradient(ellipse_10px_40px_at_30%_100%,#3a9a4a_90%,transparent),radial-gradient(ellipse_10px_46px_at_50%_100%,#2f8a3e_90%,transparent),radial-gradient(ellipse_10px_38px_at_70%_100%,#4aaa55_90%,transparent)]" />
            </span>
            {floating.map((f) => (
              <span key={f.src} className={`absolute grid animate-float place-items-center rounded-2xl shadow-[0_18px_30px_-12px_rgba(40,30,160,.6)] max-sm:scale-75 ${f.cls}`}>
                <img src={f.src} alt="" loading="lazy" className="size-[58%] object-contain" />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================= GROUPES ============================ */}
      <section className="isolate relative bg-white pt-[50px] pb-[60px]">
        <Shapes items={decor.right} />
        <Ribbon />
        <div className={`${tw.wrap} grid gap-7 md:grid-cols-2 lg:grid-cols-[1fr_1.05fr_0.95fr]`}>
          {groups.map((g, i) => (
            <Reveal key={g.title} className="min-w-0 rounded-[20px] border border-violet/12 bg-white px-6 pt-[22px] pb-6 shadow-[0_20px_50px_-34px_rgba(70,50,200,.45)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(70,50,200,.5)]" delay={(i % 3) * 90}>
              <div className="mb-[22px] flex gap-[26px]">
                <span className={`grid size-[52px] shrink-0 place-items-center rounded-[14px] shadow-[0_12px_24px_-10px_rgba(80,60,255,.5)] ${g.color}`}>{g.icon}</span>
                <div>
                  <h2 className="mt-0.5 mb-2 font-sora text-lg font-semibold text-ink">{g.title}</h2>
                  <p className="text-[12.5px] leading-[1.55] text-body">{g.text}</p>
                </div>
              </div>
              <ul className="flex list-none flex-wrap justify-start gap-4 p-0 sm:flex-nowrap sm:justify-around sm:gap-2.5">
                {g.techs.map((t) => (
                  <li key={t.name} className="group grid justify-items-center gap-2.5 text-center text-[11.5px] font-medium text-ink">
                    <img src={t.src} alt="" loading="lazy" className="size-10 object-contain transition duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                    <span>{t.name}</span>
                  </li>
                ))}
              </ul>
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
