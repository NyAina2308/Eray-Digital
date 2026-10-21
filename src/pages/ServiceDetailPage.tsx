import type { ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, decor, type Shape } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import { serviceDetails, type ServiceDetail } from '../data/serviceDetails'
import { projects } from '../data/projects'
import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'

const p = {
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  spark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M9 10l2 2 4-4" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  chat: <path d="M4 5h16v11H9l-5 4V5zM8 10h.01M12 10h.01M16 10h.01" />,
  draft: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
}

const blobShapes: Shape[] = [
  { kind: 'orb', pos: { left: '46%', top: '12%' }, size: 14, tone: 'blue' },
  { kind: 'spark', pos: { left: '42%', bottom: '10%' }, size: 12, tone: 'violet' },
  { kind: 'gem', pos: { right: '1%', top: '64%' }, size: 26, rotate: 20, tone: 'blue' },
]

/* ------------------------------------------------------------------ */
/* Visuels                                                            */
/* ------------------------------------------------------------------ */

function CodeScreen() {
  const lines = [30, 62, 48, 70, 36, 58, 44, 66, 28, 54, 72, 40, 60, 34]
  return (
    <div className="flex h-full overflow-hidden rounded-[6px] bg-[#0f1034]">
      <aside className="grid w-[20%] content-start gap-1.5 bg-[#0a0b2e] px-2 py-3">
        {Array.from({ length: 9 }, (_, i) => <i key={i} className={`h-1 rounded ${i === 2 ? 'bg-[#6a8bff]' : 'bg-white/15'}`} />)}
      </aside>
      <div className="grid flex-1 content-start gap-[5px] p-3">
        {lines.map((w, i) => (
          <i key={i} className={`block h-[3px] rounded ${['bg-[#6fa8ff]', 'bg-[#b07bff]', 'bg-[#ff8fb1]', 'bg-[#4ad6c0]'][i % 4]} opacity-80`} style={{ width: `${w}%`, marginLeft: `${(i % 5) * 4}%` }} />
        ))}
      </div>
    </div>
  )
}

function ScreenFor({ d }: { d: ServiceDetail }) {
  if (d.visual === 'code') return <CodeScreen />
  const img = d.visual === 'design' ? projects[4]?.image ?? projects[0].image : d.visual === 'cloud' ? projects[5]?.image ?? projects[0].image : projects[1].image
  return <img src={img} alt="" className="size-full rounded-[6px] object-cover object-top" />
}

const heroTile: Record<ServiceDetail['visual'], ReactNode> = {
  code: ic.code,
  web: ic.globe,
  design: ic.brush,
  cloud: ic.cloud,
}

/** Hero : bulle bleue organique avec photo, ordinateur, téléphone et tuile d'icône. */
function HeroVisual({ d }: { d: ServiceDetail }) {
  return (
    <div className="relative h-[330px] sm:h-[440px]">
      <div className="absolute inset-[2%_0_4%_4%] overflow-hidden rounded-[44%_56%_48%_52%/52%_44%_56%_48%] bg-[linear-gradient(140deg,#1d4bff,#3a2bd8_45%,#8b5cff)] shadow-[0_40px_80px_-30px_rgba(60,50,255,.6)]">
        <img src={teamPhoto} alt="" className="size-full object-cover opacity-35 mix-blend-luminosity" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,.55),transparent_45%)]" />
      </div>
      <div className="absolute top-[18%] left-[10%] w-[64%] animate-float [transform:perspective(1300px)_rotateY(-16deg)_rotateX(6deg)_rotate(-4deg)]">
        <div className="aspect-[16/10.5] rounded-[14px_14px_4px_4px] border-8 border-[#0d0e24] bg-[#0d0e24] shadow-[0_30px_60px_-20px_rgba(20,10,80,.7)]">
          <ScreenFor d={d} />
        </div>
        <div className="mx-[-8%] h-3.5 rounded-b-[18px] bg-[linear-gradient(#e6e7f2,#b9bbd0)] shadow-[0_20px_30px_-10px_rgba(20,10,80,.5)]" />
      </div>
      <div className="absolute top-[30%] right-[8%] grid aspect-[9/18] w-[18%] animate-float-slow content-start gap-2 rounded-[22px] border-[5px] border-[#0d0e24] bg-[radial-gradient(circle_at_50%_20%,#2a2690,#0a0b2e_75%)] p-2.5 shadow-[0_24px_40px_-14px_rgba(20,10,80,.7)]">
        <img src="/eray-logo.png" alt="" className="w-[45%] rounded-md bg-white p-0.5" />
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1, 2, 3].map((i) => <span key={i} className="aspect-square rounded-lg bg-[linear-gradient(145deg,#3a6bff,#5a3cff)]" />)}
        </div>
      </div>
      <span className={`${tw.icoBlue} absolute top-[4%] right-[6%] z-[2] size-[clamp(56px,6vw,84px)] rounded-[22px]`}>
        <Icon className="size-1/2" stroke="#fff">{heroTile[d.visual]}</Icon>
      </span>
      <div className="glass absolute right-[2%] bottom-[8%] z-[2] flex items-center gap-5 rounded-2xl px-6 py-4">
        <span className="font-sora text-[13px] leading-[1.35] font-semibold text-ink-2">{d.heroNote}</span>
        <svg viewBox="0 0 24 24" className="size-6 text-violet" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 18 C 10 16, 14 12, 19 6M13 5h6v6" /></svg>
      </div>
    </div>
  )
}

/** Section méthode : bureau avec moniteur (dashboard) dans une forme de verre bleue. */
function DeskVisual({ d }: { d: ServiceDetail }) {
  return (
    <div className="relative h-[300px] sm:h-[360px]">
      <div className="absolute inset-[4%_6%_4%_2%] -rotate-3 overflow-hidden rounded-[40px_70px_40px_90px] bg-[linear-gradient(140deg,#2f6bff,#6a3cff_60%,#b07bff)] shadow-[0_40px_70px_-30px_rgba(60,50,255,.6)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.5),transparent_50%)]" />
      </div>
      <div className="absolute top-[14%] left-[16%] w-[62%] rounded-xl border-[7px] border-[#0d0e24] bg-[#f4f5ff] shadow-[0_30px_50px_-20px_rgba(20,10,80,.6)]">
        <div className="aspect-[16/10] overflow-hidden">
          {d.visual === 'code' || d.visual === 'cloud' ? (
            <div className="grid h-full grid-rows-[auto_1fr] gap-2 p-3">
              <div className="grid grid-cols-3 gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-5 rounded bg-white shadow-sm" />)}</div>
              <div className="flex items-end gap-[5%] rounded bg-white p-2 shadow-sm">
                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => <i key={i} className="flex-1 rounded-t-sm bg-[linear-gradient(#b07bff,#2f5bff)]" style={{ height: `${h}%` }} />)}
              </div>
            </div>
          ) : (
            <ScreenFor d={d} />
          )}
        </div>
      </div>
      <span className="absolute bottom-[10%] left-[24%] h-3 w-[46%] rounded-b-xl bg-[linear-gradient(#d9dbe8,#b9bbd0)]" />
      <span className={`${tw.icoBlue} absolute top-[10%] right-[10%] size-16 rounded-2xl`}><Icon className="size-8" stroke="#fff">{ic.cloud}</Icon></span>
      <span className={`${tw.icoBlue} absolute bottom-[12%] left-[6%] size-16 rounded-2xl`}><Icon className="size-8" stroke="#fff">{p.cog}</Icon></span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const methodIcons = [ic.bulb, p.spark, p.headset]
const advantageIcons = [p.monitor, ic.users, p.bolt, p.target]
const stepIcons = [p.chat, p.draft, ic.code, ic.rocket]

function ServiceDetailPage() {
  const { slug } = useParams()
  const d = serviceDetails.find((s) => s.slug === slug)
  if (!d) return <Navigate to="/services" replace />

  return (
    <div className={tw.page}>
      <GradDefs />

      {/* ============================== HERO ============================== */}
      <section className="relative isolate pt-[110px] pb-10">
        <Shapes items={blobShapes} />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]`}>
          <Reveal className="min-w-0">
            <Link to="/services" className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#2f3bb8] hover:text-violet">← Tous nos services</Link>
            <br />
            <span className={`${tw.chip} mb-5`}>{d.chip}</span>
            <h1 className="mb-5 font-sora text-[clamp(34px,4vw,54px)] leading-[1.05] font-bold tracking-[-0.04em] text-ink">
              {d.title[0]}<br /><span className="text-grad">{d.title[1]}</span>
            </h1>
            <p className="mb-8 max-w-[440px] text-[14.5px] leading-[1.65] text-body">{d.lead}</p>
            <Link to="/contact" className={tw.btnLg}>Obtenir un devis <Arrow /></Link>
            <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-4">
              {[
                { icon: p.shield, title: 'Solutions fiables', sub: 'et sécurisées' },
                { icon: p.bolt, title: 'Performance', sub: 'et évolutivité' },
                { icon: p.person, title: 'Accompagnement', sub: 'de A à Z' },
              ].map((f, i) => (
                <li key={f.title} className={`flex items-center gap-3 ${i ? 'sm:border-l sm:border-violet/15 sm:pl-4' : ''}`}>
                  <span className={`${tw.icoRound} size-11`}><Icon className="size-5">{f.icon}</Icon></span>
                  <div><b className="block text-[12px] font-semibold text-ink">{f.title}</b><small className="text-[11px] text-mute">{f.sub}</small></div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="min-w-0" delay={120}><HeroVisual d={d} /></Reveal>
        </div>
      </section>

      {/* ============================= MÉTHODE ============================ */}
      <section className="relative isolate py-12">
        <Shapes items={decor.left} />
        <div className={`${tw.wrap} grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]`}>
          <Reveal className="min-w-0"><DeskVisual d={d} /></Reveal>
          <Reveal className="min-w-0" delay={100}>
            <span className={`${tw.chipSm} mb-3`}>Notre méthode</span>
            <h2 className="mb-4 font-sora text-[clamp(26px,2.5vw,34px)] leading-[1.12] font-bold tracking-[-0.03em] text-ink">
              {d.method.title[0]}<br /><span className="text-grad">{d.method.title[1]}</span>
            </h2>
            <p className="mb-8 max-w-[460px] text-[14px] leading-[1.65] text-body">{d.method.text}</p>
            <ul className="grid gap-6 sm:grid-cols-2">
              {d.method.items.map((m, i) => (
                <li key={m.title} className="flex items-center gap-4">
                  <span className={`${tw.icoRound} size-12`}><Icon className="size-6">{methodIcons[i]}</Icon></span>
                  <div><b className="block text-[13px] font-semibold text-ink">{m.title}</b><small className="text-[11.5px] text-mute">{m.text}</small></div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================ AVANTAGES =========================== */}
      <section className="relative isolate py-8">
        <div className={tw.wrap}>
          <Reveal className="glass grid items-center gap-6 rounded-[30px] px-8 py-8 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
            <div className="md:col-span-2 lg:col-span-1">
              <span className={`${tw.chipSm} mb-3`}>Pourquoi nous choisir ?</span>
              <h2 className="font-sora text-[clamp(26px,2.5vw,32px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink">Des avantages<br /><span className="text-grad">concrets.</span></h2>
            </div>
            {d.advantages.map((a, i) => (
              <div key={a.title} className={`grid justify-items-center gap-2 text-center ${i ? 'lg:border-l lg:border-violet/15' : ''}`}>
                <span className={`${tw.icoBlue} mb-2 size-14`}><Icon className="size-7" stroke="#fff">{advantageIcons[i]}</Icon></span>
                <b className="text-[13px] font-semibold text-ink">{a.title}</b>
                <small className="text-[11.5px] text-mute">{a.text}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================ PROCESSUS =========================== */}
      <section className="relative isolate px-3 py-8 md:px-0">
        <div className="relative mx-auto max-w-[1340px] overflow-hidden rounded-[40px] bg-[radial-gradient(500px_300px_at_80%_20%,rgba(47,91,255,.35),transparent_70%),linear-gradient(120deg,#0a0b2e,#12145a_60%,#1a1a8a)] py-12 text-white shadow-[0_40px_80px_-30px_rgba(40,30,200,.6)] md:rounded-[60px_120px_60px_120px/60px_90px_60px_90px]">
          <Shapes items={decor.dark} />
          <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.8fr_2fr]`}>
            <Reveal className="min-w-0">
              <span className="mb-3 inline-block rounded-full bg-[#3a4bff] px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-white uppercase">Notre processus</span>
              <h2 className="mb-3 font-sora text-[clamp(26px,2.5vw,34px)] font-bold text-white">Simple et efficace.</h2>
              <p className="text-[13.5px] leading-[1.6] text-white/80">De l’idée au produit final, nous avançons avec vous, étape par étape.</p>
            </Reveal>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {d.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 90} className="relative rounded-[22px] border border-white/10 bg-white/[0.04] px-5 pt-10 pb-6 backdrop-blur">
                  <span className="absolute -top-6 left-5 grid size-12 place-items-center rounded-full bg-white shadow-[0_10px_24px_-8px_rgba(90,120,255,.8)]">
                    <Icon className="size-5" stroke="#3a4bff">{stepIcons[i]}</Icon>
                  </span>
                  {i < 3 && <span className="absolute top-0 -right-4 z-[1] hidden text-lg text-white/40 lg:block" aria-hidden="true">⇢</span>}
                  <span className="mb-1 block text-[11px] font-semibold text-white/60">{String(i + 1).padStart(2, '0')}</span>
                  <b className="block font-sora text-[15px] font-semibold">{s.title}</b>
                  <small className="text-[12px] text-white/70">{s.text}</small>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="relative isolate pt-6 pb-16">
        <div className={tw.wrap}>
          <Reveal className="relative flex flex-col items-start gap-6 overflow-hidden rounded-[32px] bg-[linear-gradient(100deg,#1d6bff,#3a4bff_45%,#7b3cff_85%)] px-8 py-10 text-white shadow-[0_30px_70px_-25px_rgba(80,50,255,.7)] md:flex-row md:items-center md:rounded-[40px_80px_40px_80px] md:px-14">
            <span className="absolute -right-10 -bottom-16 h-56 w-72 -rotate-20 rounded-[50%] bg-[linear-gradient(135deg,rgba(111,168,255,.7),rgba(176,123,255,.5))]" aria-hidden="true" />
            <div className="relative flex-1">
              <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-[9px] font-semibold tracking-[0.16em] uppercase">Prêt à démarrer ?</span>
              <h2 className="font-sora text-[clamp(22px,2.2vw,28px)] leading-[1.2] font-bold text-white">{d.cta}</h2>
            </div>
            <Link to="/contact" className={`${tw.btnWhite} relative md:mr-[18%]`}>Contactez-nous <Arrow /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage
