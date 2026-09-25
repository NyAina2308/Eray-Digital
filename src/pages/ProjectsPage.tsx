import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import { projects } from '../data/projects'
import roomPhoto from '../assets/photos/room-D2XCtDIa.png'

/** Largeur (sur 6 colonnes) de chaque carte : 2 grandes, puis des rangées de 3. */
function spans(count: number) {
  const out: number[] = []
  const big = Math.min(2, count)
  for (let i = 0; i < big; i++) out.push(big === 1 ? 6 : 3)
  // Rangées de 3 ; une carte seule en fin de liste casserait la grille → 2 + 2
  const rest = count - big
  const rows: number[] = []
  for (let left = rest; left > 0; ) {
    const k = left === 4 ? 2 : Math.min(3, left)
    rows.push(k)
    left -= k
  }
  for (const k of rows) for (let j = 0; j < k; j++) out.push(6 / k)
  return out
}

const spanClass: Record<number, string> = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  6: 'sm:col-span-2 lg:col-span-6',
}

function ProjectsPage() {
  const [filter, setFilter] = useState('Tous')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => ['Tous', ...new Set(projects.map((p) => p.category))], [])

  const shown = projects.filter((p) => {
    const q = query.trim().toLowerCase()
    const okCat = filter === 'Tous' || p.category === filter
    const okQ = !q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)
    return okCat && okQ
  })
  const widths = spans(shown.length)

  const stats = [
    { icon: ic.box, value: String(projects.length), label: 'projets réalisés' },
    { icon: ic.tag, value: String(categories.length - 1), label: "secteurs d'activité" },
    { icon: ic.star, value: '100%', label: 'sur mesure' },
  ]

  return (
    <div className={tw.page}>
      <GradDefs />

      {/* ============================== HERO ============================== */}
      <section className="isolate relative pt-[110px] pb-[30px]">
        <Shapes items={decor.hero} />
        <Ribbon />
        <div className={`${tw.wrap} grid items-center gap-[30px] lg:grid-cols-[1.05fr_0.95fr]`}>
          <Reveal className="min-w-0">
            <span className={`${tw.chip} mb-[18px]`}>Nos réalisations</span>
            <h1 className="mb-[22px] font-sora text-[clamp(34px,4vw,54px)] leading-[1.05] font-bold tracking-[-0.04em] text-ink">
              Des projets concrets,<br />des <span className={tw.gradText}>clients satisfaits.</span>
            </h1>
            <p className="mb-7 max-w-[540px] text-sm leading-[1.7] text-body">
              Découvrez une sélection de nos réalisations : sites web, applications, logiciels et identités visuelles
              conçus pour nos clients. Chaque projet est une histoire unique, un défi relevé, une réussite partagée.
            </p>
            <div className="glass flex w-fit max-w-full flex-wrap items-center gap-y-3.5 rounded-[22px] px-[22px] py-4 md:flex-nowrap">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex items-center gap-3 pr-4 md:border-r md:border-violet/15 ${i ? 'md:pl-4' : ''}`}>
                  <Icon>{s.icon}</Icon>
                  <div><strong className="block text-lg font-bold text-ink">{s.value}</strong><small className="block text-[10.5px] whitespace-nowrap text-mute">{s.label}</small></div>
                </div>
              ))}
              <p className="text-[11px] leading-[1.5] text-body md:ml-4 md:whitespace-nowrap">Des solutions digitales<br />qui font la différence.</p>
            </div>
          </Reveal>

          <Reveal className="relative h-[280px] min-w-0 sm:h-[380px]" delay={120}>
            <span className={`${tw.script} absolute -top-6 -right-1.5 z-[2] hidden -rotate-10 text-[22px] leading-[1.1] text-ink-2 sm:block`}>Chaque projet<br />est unique !</span>
            <span className="absolute inset-[5%_0_0_5%] rounded-[45%_55%_50%_50%] bg-[radial-gradient(circle_at_50%_50%,rgba(123,60,255,.28),rgba(47,139,255,.12)_50%,transparent_72%)]" />
            <div className="absolute top-[12%] left-[18%] w-[60%] animate-float [transform:perspective(1200px)_rotateY(-12deg)_rotateX(6deg)_rotate(-5deg)]">
              <div className="relative aspect-[16/10.5] overflow-hidden rounded-[14px_14px_4px_4px] border-8 border-[#0d0e24] shadow-[0_30px_60px_-20px_rgba(40,30,160,.6)]">
                <img src={projects[5]?.image ?? projects[0].image} alt="" className="size-full object-cover" />
                <span className="absolute inset-0 bg-[linear-gradient(110deg,rgba(10,11,46,.9),rgba(30,20,120,.5)_55%,transparent)]" />
                <span className="absolute top-[32%] left-[8%] z-[1] text-[clamp(13px,1.4vw,19px)] leading-[1.25] font-semibold text-white">Votre projet.<br />Notre expertise.</span>
              </div>
              <div className="mx-[-8%] h-[13px] rounded-b-[18px] bg-[linear-gradient(#e6e7f2,#b9bbd0)]" />
            </div>
            {[
              { img: projects[1].image, cls: 'left-[6%] top-[36%] -rotate-8' },
              { img: projects[4]?.image ?? projects[0].image, cls: 'right-[4%] top-[30%] rotate-8 [animation-delay:-3s]' },
            ].map((ph, i) => (
              <div key={i} className={`absolute aspect-[9/18] w-[16%] animate-float rounded-[20px] bg-[#0d0e24] p-[5px] shadow-[0_24px_40px_-14px_rgba(40,30,160,.6)] ${ph.cls}`}>
                <img src={ph.img} alt="" className="size-full rounded-[15px] object-cover" />
              </div>
            ))}
            <span className={`${tw.icoBlue} absolute top-[8%] right-[10%] size-[50px] rounded-[14px]`}><Icon stroke="#fff">{ic.star}</Icon></span>
          </Reveal>
        </div>
      </section>

      {/* ============================= FILTRES ============================ */}
      <section className={`${tw.wrap} flex flex-wrap items-center justify-between gap-4 pt-5 pb-[26px]`}>
        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filtrer par catégorie">
          {categories.map((c) => {
            const on = filter === c
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(c)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border py-2.5 font-sora text-xs font-medium transition ${
                  on
                    ? 'border-transparent bg-[linear-gradient(100deg,#1d8bff,#3a4bff)] px-7 text-white shadow-[0_14px_28px_-12px_rgba(47,91,255,.7)]'
                    : 'border-violet/15 bg-white/85 px-[18px] text-ink shadow-[0_10px_24px_-18px_rgba(70,50,200,.5)] hover:border-violet/40 hover:text-violet'
                }`}
              >
                {c !== 'Tous' && <Icon className="size-3.5">{ic.tag}</Icon>}
                {c}
              </button>
            )
          })}
        </div>
        <label className="flex w-full items-center gap-2.5 rounded-full border border-violet/15 bg-white px-4 py-2.5 focus-within:border-violet/50 sm:w-[260px]">
          <Icon className="size-4" stroke="#3a4bff">{ic.search}</Icon>
          <input type="search" placeholder="Rechercher un projet…" value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 border-0 bg-transparent font-sora text-xs text-ink outline-none" />
        </label>
      </section>

      {/* ============================== GRILLE ============================ */}
      <section className={`${tw.wrap} grid gap-[22px] pb-10 sm:grid-cols-2 lg:grid-cols-6`}>
        {shown.map((p, i) => {
          const big = widths[i] >= 3
          return (
            <Reveal key={p.name} className={`min-w-0 ${spanClass[widths[i]] ?? ''}`} delay={(i % 3) * 80}>
              <div className={`glass group relative flex h-full flex-col-reverse overflow-hidden rounded-[28px] transition duration-500 hover:-translate-y-1.5 ${big ? 'lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center' : ''}`}>
                <div className={`relative z-[1] px-[26px] pt-[22px] pb-[26px] ${big ? 'lg:py-[30px] lg:pr-2.5 lg:pl-[30px]' : ''}`}>
                  <span className="mb-2.5 inline-block rounded-full border border-royal/35 bg-white px-2.5 py-[3px] text-[9.5px] font-semibold text-[#2f3bb8]">{p.category}</span>
                  <h2 className={`mb-2 font-sora font-bold tracking-[-0.02em] text-ink ${big ? 'text-[22px]' : 'text-lg'}`}>{p.name}</h2>
                  <p className="mb-[18px] text-xs leading-[1.6] text-body">{p.description}</p>
                  <a href={p.image} target="_blank" rel="noreferrer" className="btn-blue group/btn inline-flex items-center gap-3.5 rounded-full px-[18px] py-[9px] text-[11.5px] font-semibold transition hover:-translate-y-0.5">
                    Voir le projet <Arrow className="size-4 transition group-hover/btn:translate-x-1" />
                  </a>
                </div>
                <div className={`relative bg-[radial-gradient(circle_at_70%_60%,rgba(123,60,255,.3),transparent_65%)] px-5 pt-5 ${big ? 'lg:grid lg:h-full lg:place-items-center lg:py-[26px] lg:pr-[22px] lg:pl-0' : ''}`}>
                  <div className="overflow-hidden rounded-xl border-[6px] border-[#0d0e24] shadow-[0_24px_40px_-18px_rgba(40,30,160,.6)] transition duration-700 [transform:perspective(900px)_rotateY(-10deg)_rotate(-2deg)] group-hover:[transform:perspective(900px)_rotateY(-4deg)]">
                    <img src={p.image} alt={`Aperçu du projet ${p.name}`} className="block aspect-[16/10] w-full object-cover object-top" />
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
        {shown.length === 0 && <p className="col-span-full py-10 text-center text-mute">Aucun projet ne correspond à votre recherche.</p>}
      </section>

      {/* ============================== CLIENTS =========================== */}
      <section className={tw.wrap}>
        <Reveal className="glass mb-[50px] flex flex-col items-start gap-[30px] rounded-3xl px-[30px] py-[22px] lg:flex-row lg:items-center">
          <div className="lg:w-[240px] lg:flex-none lg:border-r lg:border-violet/15 lg:pr-6">
            <h2 className="mb-1.5 font-sora text-[17px] font-bold text-ink-2">Ils nous font confiance</h2>
            <p className="text-[11px] leading-[1.5] text-mute">Des entreprises, des associations et des marques qui nous ont confié leurs projets.</p>
          </div>
          <ul className="flex flex-1 list-none flex-wrap justify-around gap-x-[26px] gap-y-3.5 p-0">
            {projects.map((p) => <li key={p.name} className="text-[15px] font-bold tracking-[-0.01em] text-[#2a2b44]/80">{p.name}</li>)}
          </ul>
        </Reveal>
      </section>

      {/* ================================ CTA ============================= */}
      <section className="isolate relative overflow-hidden rounded-t-[60px] bg-[linear-gradient(100deg,#0a0b2e,#1f1a8a_50%,#3a2bd8)] py-[70px] text-white">
        <Shapes items={decor.dark} />
        <img src={roomPhoto} alt="" className="absolute top-0 right-0 h-full w-[45%] object-cover opacity-35 [mask-image:linear-gradient(90deg,transparent,#000_50%)]" />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]`}>
          <div>
            <span className={`${tw.chipDark} mb-3`}>Vous avez un projet ?</span>
            <h2 className="mb-3 font-sora text-[clamp(26px,2.6vw,36px)] font-bold tracking-[-0.02em] text-white">Prêt à créer le vôtre ?</h2>
            <p className="mb-[26px] max-w-[480px] text-[13px] leading-[1.6] opacity-85">Discutons ensemble de vos besoins et découvrons comment nous pouvons transformer votre idée en une solution digitale sur mesure.</p>
            <Link to="/contact" className={tw.btnWhite}>Parlons de votre projet <Arrow /></Link>
          </div>
          <div className="flex gap-[30px] lg:justify-self-end">
            {[[String(projects.length), 'projets réalisés'], ['100%', 'sur mesure']].map(([v, l], i) => (
              <div key={l} className={i ? '' : 'border-r border-white/25 pr-[30px]'}>
                <strong className="block text-[30px] font-bold">{v}</strong>
                <small className="text-xs opacity-80">{l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
