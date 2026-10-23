import { useMemo, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Laptop, Phone } from '../components/Devices'
import LiveIcon from '../components/LiveIcon'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import { useProjects } from '../hooks/useSiteData'
import roomPhoto from '../assets/photos/room.webp'

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
  const projects = useProjects()
  const [filter, setFilter] = useState('Tous')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => ['Tous', ...new Set(projects.map((p) => p.category))], [projects])

  const shown = projects.filter((p) => {
    const q = query.trim().toLowerCase()
    const okCat = filter === 'Tous' || p.category === filter
    const okQ = !q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)
    return okCat && okQ
  })
  const widths = spans(shown.length)

  const stats = [
    { kind: 'bob' as const, icon: ic.box, value: String(projects.length), label: 'projets réalisés' },
    { kind: 'swing' as const, icon: ic.tag, value: String(categories.length - 1), label: "secteurs d'activité" },
    { kind: 'spin' as const, icon: ic.star, value: '100%', label: 'sur mesure' },
  ]

  // Parallaxe du hero : les appareils suivent légèrement la souris
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
  function onHeroMove(e: MouseEvent<HTMLDivElement>) {
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
            <div className="glass flex w-fit max-w-full flex-wrap items-center gap-y-3.5 rounded-[22px] px-[22px] py-4">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex items-center gap-3 pr-4 md:border-violet/15 ${i < stats.length - 1 ? 'md:border-r' : ''} ${i ? 'md:pl-4' : ''}`}>
                  <LiveIcon kind={s.kind} delay={i * 0.4}><Icon className="size-5">{s.icon}</Icon></LiveIcon>
                  <div><strong className="block text-lg font-bold text-ink">{s.value}</strong><small className="block text-[10.5px] whitespace-nowrap text-mute">{s.label}</small></div>
                </div>
              ))}
              {/* Sous les chiffres : sur une même ligne, la phrase sortait de l'encadré */}
              <p className="basis-full border-t border-violet/15 pt-3 text-[11px] leading-[1.5] text-body">Des solutions digitales qui font la différence.</p>
            </div>
          </Reveal>

          <Reveal className="relative h-[300px] min-w-0 sm:h-[400px]" delay={120}>
            <div className="absolute inset-0" onMouseMove={onHeroMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
              <span className={`${tw.script} absolute -top-6 -right-1.5 z-[3] hidden -rotate-10 text-[22px] leading-[1.1] text-ink-2 sm:block`}>Chaque projet<br />est unique !</span>
              <motion.span
                className="absolute inset-[5%_0_0_5%] rounded-[45%_55%_50%_50%] bg-[radial-gradient(circle_at_50%_50%,rgba(123,60,255,.3),rgba(47,139,255,.14)_50%,transparent_72%)]"
                animate={reduce ? undefined : { scale: [1, 1.06, 1], borderRadius: ['45% 55% 50% 50%', '55% 45% 48% 52%', '45% 55% 50% 50%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* MacBook central, incliné en 3D selon la souris */}
              <motion.div className="group absolute top-[10%] left-[14%] w-[68%]" style={{ x: farX }} {...pop(0.15)}>
                <motion.div style={{ rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}>
                  <div className="animate-float">
                    <Laptop src={projects[5]?.image ?? projects[0].image}>
                      <span className="absolute inset-0 bg-[linear-gradient(110deg,rgba(10,11,46,.88),rgba(30,20,120,.45)_55%,transparent)]" />
                      <motion.span
                        className="absolute top-[32%] left-[8%] z-[1] text-[clamp(13px,1.4vw,19px)] leading-[1.25] font-semibold text-white"
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.7 }}
                      >
                        Votre projet.<br />Notre expertise.
                        <motion.span className="mt-1.5 block h-[3px] rounded-full bg-[linear-gradient(90deg,#2f8bff,#7b3cff)]" initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ delay: 1.5, duration: 0.8 }} />
                      </motion.span>
                    </Laptop>
                  </div>
                </motion.div>
              </motion.div>

              {/* iPhones au premier plan (parallaxe inverse) */}
              {[
                { img: projects[1]?.image ?? projects[0].image, cls: 'left-[3%] top-[34%] -rotate-8', d: 0.45, float: '' },
                { img: projects[4]?.image ?? projects[0].image, cls: 'right-[2%] top-[28%] rotate-8', d: 0.6, float: '[animation-delay:-3s]' },
              ].map((ph, i) => (
                <motion.div key={i} className={`group absolute z-[2] w-[17%] ${ph.cls}`} style={{ x: nearX, y: nearY }} {...pop(ph.d)}>
                  <div className={`animate-float ${ph.float}`}><Phone src={ph.img} /></div>
                </motion.div>
              ))}

              {/* Petites icônes animées */}
              <motion.span
                className={`${tw.icoBlue} absolute top-[6%] right-[10%] z-[3] size-[50px] rounded-[14px]`}
                animate={reduce ? undefined : { rotate: [0, 360], y: [0, -6, 0] }}
                transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
                whileHover={{ scale: 1.2 }}
              >
                <Icon stroke="#fff">{ic.star}</Icon>
              </motion.span>
              {[
                { icon: ic.code, cls: 'left-[10%] top-[4%]', d: 0 },
                { icon: ic.rocket, cls: 'left-[42%] bottom-[2%]', d: 0.8 },
                { icon: ic.brush, cls: 'right-[22%] bottom-[8%]', d: 1.6 },
              ].map((b) => (
                <motion.span
                  key={b.cls}
                  className={`glass absolute z-[3] grid size-10 place-items-center rounded-xl ${b.cls}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
                  transition={{
                    opacity: { delay: 0.8 + b.d / 2 },
                    scale: { delay: 0.8 + b.d / 2, type: 'spring' },
                    y: { duration: 3.4, repeat: Infinity, delay: b.d, ease: 'easeInOut' },
                    rotate: { duration: 5, repeat: Infinity, delay: b.d, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.25 }}
                >
                  <Icon className="size-5">{b.icon}</Icon>
                </motion.span>
              ))}
            </div>
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
                {c !== 'Tous' && (
                  <motion.span className="grid" animate={on && !reduce ? { rotate: [0, 18, -12, 0] } : { rotate: 0 }} transition={{ duration: 0.6 }}>
                    <Icon className="size-3.5" stroke={on ? '#fff' : 'url(#ui-grad)'}>{ic.tag}</Icon>
                  </motion.span>
                )}
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
                  {/* Site en ligne si un lien a été saisi dans le back-office, sinon la capture en grand */}
                  <a href={p.url || p.image} target="_blank" rel="noreferrer" className="btn-blue group/btn inline-flex items-center gap-3.5 rounded-full px-[18px] py-[9px] text-[11.5px] font-semibold transition hover:-translate-y-0.5">
                    {p.url ? 'Voir le site' : 'Voir le projet'} <Arrow className="size-4 transition group-hover/btn:translate-x-1" />
                  </a>
                </div>
                <div className={`relative bg-[radial-gradient(circle_at_70%_60%,rgba(123,60,255,.3),transparent_65%)] px-5 pt-5 ${big ? 'lg:grid lg:h-full lg:place-items-center lg:py-[26px] lg:pr-[22px] lg:pl-0' : ''}`}>
                  <div className="relative w-full pb-2 transition duration-700 [transform:perspective(900px)_rotateY(-10deg)_rotate(-2deg)] group-hover:[transform:perspective(900px)_rotateY(-3deg)_translateY(-4px)]">
                    <Laptop src={p.image} alt={`Aperçu du projet ${p.name}`} className="w-[86%]" />
                    <div className="absolute right-0 bottom-0 w-[20%] transition duration-700 group-hover:-translate-y-2 group-hover:rotate-3">
                      <Phone src={p.image} />
                    </div>
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
        <img src={roomPhoto} loading="lazy" decoding="async" alt="" className="absolute top-0 right-0 h-full w-[45%] object-cover opacity-35 [mask-image:linear-gradient(90deg,transparent,#000_50%)]" />
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
