import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Shapes, Ribbon, decor } from '../components/Decor'
import { tw, Arrow, Icon, GradDefs, ic } from '../components/ui'
import teamPhoto from '../assets/photos/team-fQBheQQ9.avif'
import roomPhoto from '../assets/photos/room-D2XCtDIa.png'

const values = [
  { icon: ic.bulb, title: 'Créativité', text: 'Chaque projet est une occasion de proposer quelque chose de différent, pertinent et original.' },
  { icon: ic.atom, title: 'Innovation', text: 'Nous cherchons constamment de nouvelles approches, technologies et idées.' },
  { icon: ic.chart, title: 'Performance', text: 'Nous nous assurons que nos solutions fonctionnent réellement et apportent un impact concret.' },
  { icon: ic.loop, title: 'Amélioration continue', text: "Après la réalisation, nous restons attentifs aux possibilités d'évolution et d'optimisation." },
]

const skills = ['Développement web', 'Développement logiciel', 'Design graphique', 'UI/UX Design', 'Gestion de projet', 'Base de données', 'Tests & optimisation']

const stats = [
  { icon: ic.rocket, value: '+10', label: 'Projets réalisés', sub: 'Des idées concrètes et fonctionnelles' },
  { icon: ic.users, value: '+5', label: 'Clients satisfaits', sub: 'Une relation de confiance durable' },
  { icon: ic.code, value: '3', label: "Domaines d'expertise", sub: 'Web · Logiciel · Design' },
  { icon: ic.star, value: '100%', label: 'Engagement', sub: 'À chaque étape de votre projet' },
]

const glassCard = 'absolute overflow-hidden rounded-[22px] border border-white/60'

function AboutPage() {
  return (
    <div className={`${tw.page} bg-[radial-gradient(900px_500px_at_100%_0%,rgba(123,60,255,.08),transparent_60%),radial-gradient(700px_500px_at_0%_40%,rgba(47,91,255,.06),transparent_60%)]`}>
      <GradDefs />

      {/* ============================== HERO ============================== */}
      <section className="isolate relative pt-[120px] pb-16">
        <Shapes items={decor.hero} />
        <Ribbon />
        <div className={`${tw.wrap} grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]`}>
          <Reveal className="min-w-0">
            <span className={tw.kicker}>À propos</span>
            <h1 className={tw.h1}>
              Plus qu’une agence,<br />une <span className={tw.gradText}>équipe passionnée</span>
            </h1>
            <p className="mb-8 max-w-[440px] border-l-2 border-[#5a6bff] pl-4 text-[14.5px] leading-[1.8] text-body">
              Eray Digital est une entreprise spécialisée dans la création de sites web, le développement de
              logiciels et le design graphique. Nous combinons technologie, créativité et analyse pour concevoir
              des solutions adaptées aux besoins réels de chaque client.
            </p>
            <a href="#histoire" className={tw.btnLg}>Découvrir notre mission <Arrow /></a>
          </Reveal>

          <Reveal className="relative min-w-0 lg:-mr-[calc(max(24px,(100vw-1240px)/2+24px))]" delay={120}>
            <span className="absolute top-[4%] -left-[6%] z-[2] size-24 -rotate-[18deg] animate-float rounded-[26px] bg-[linear-gradient(145deg,#3aa0ff,#6a3cff)] shadow-[0_20px_40px_-12px_rgba(80,60,255,.6)]" />
            <div className="relative aspect-[1.55] overflow-hidden rounded-[32px] shadow-[-30px_40px_90px_-30px_rgba(80,50,255,.55),0_0_0_6px_rgba(123,60,255,.15)] lg:rounded-[38%_0_0_46%/44%_0_0_52%]">
              <img src={teamPhoto} alt="L'équipe Eray Digital au travail" className="size-full object-cover saturate-[1.4]" />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(47,91,255,.35),rgba(90,40,220,.35)_55%,rgba(20,10,90,.55))] mix-blend-multiply" />
              <span className={`${tw.script} absolute right-[9%] bottom-[14%] z-[2] -rotate-[8deg] text-right text-[clamp(22px,2.4vw,32px)] leading-[1.1] text-[#e9e3ff] [text-shadow:0_0_10px_#8b5cff,0_0_26px_#6a3cff]`}>
                Une équipe,<br />une vision
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ HISTOIRE ============================ */}
      <section id="histoire" className="isolate relative py-[70px]">
        <Shapes items={decor.right} />
        <Ribbon />
        <span className="absolute top-[-60px] left-[30%] -z-[1] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(123,60,255,.10),transparent_65%)]" />
        <div className={`${tw.wrap} grid items-center gap-9 md:grid-cols-2 lg:grid-cols-3`}>
          <Reveal className="min-w-0">
            <span className={tw.kicker}>Notre histoire</span>
            <h2 className={tw.h2}>Une vision née<br />d’une passion</h2>
            <p className={tw.lead}>
              Eray Digital est née de la volonté de créer une entreprise où la technologie rencontre la créativité.
              Nous croyons qu’un bon projet ne se limite pas à ce qui est demandé, mais qu’il doit apporter une
              réelle valeur, innover et évoluer avec le temps.
            </p>
            <blockquote className="glass m-0 flex items-center gap-4 rounded-[18px] px-6 py-5">
              <Icon>{ic.target}</Icon>
              <p className="text-sm leading-[1.6] font-medium text-[#3a2d8f] italic">“Transformer vos idées en solutions digitales performantes.”</p>
            </blockquote>
          </Reveal>

          <Reveal className="relative h-[360px] min-w-0 [perspective:900px]" delay={100}>
            <span className="absolute top-0 right-[10%] size-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#9f8bff,#3a1fc9_70%)]" />
            <span className="absolute bottom-10 left-[10%] size-[34px] animate-float rounded-full bg-[radial-gradient(circle_at_30%_30%,#9f8bff,#3a1fc9_70%)] shadow-[0_10px_20px_-6px_rgba(60,30,200,.6)]" />
            <span className="absolute inset-[25%_-5%_20%_0] -rotate-[18deg] rounded-full border-[1.5px] border-violet/25" />
            <div className={`${glassCard} top-5 left-[32%] h-[70%] w-[46%] bg-[linear-gradient(145deg,rgba(160,150,255,.5),rgba(210,205,255,.3))] [transform:rotateY(-20deg)_rotateZ(6deg)]`} />
            <div className={`${glassCard} top-[30px] left-[18%] grid h-[72%] w-[46%] animate-float place-items-start justify-center bg-[linear-gradient(160deg,#3a2bd8,#1a1570)] pt-[30px] shadow-[0_30px_60px_-20px_rgba(50,30,200,.7)] [transform:rotateY(-18deg)_rotateZ(-4deg)]`}>
              <img src="/eray-logo.png" alt="Eray Digital" className="w-[64%] rounded-[10px] bg-white p-1" />
            </div>
            <div className={`${glassCard} bottom-[30px] left-[34%] h-[36%] w-[44%] animate-float-slow shadow-[0_24px_50px_-20px_rgba(50,30,200,.6)] [transform:rotateY(-14deg)_rotateZ(-6deg)]`}>
              <img src={roomPhoto} alt="" className="size-full object-cover" />
            </div>
          </Reveal>

          <div className="grid min-w-0 gap-5 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
            {[
              { icon: ic.rocket, title: 'Notre mission', text: 'Accompagner nos clients dans la réalisation de leurs projets digitaux en apportant notre expertise, notre créativité et notre engagement.' },
              { icon: ic.eye, title: 'Notre vision', text: 'Devenir un acteur de référence dans le domaine du digital, reconnu pour la qualité de nos solutions, notre approche innovante et la confiance de nos clients.' },
            ].map((c, i) => (
              <Reveal key={c.title} className={`${tw.card} flex gap-5 p-6`} delay={150 + i * 100}>
                <span className={tw.icoRound}><Icon className="size-7">{c.icon}</Icon></span>
                <div>
                  <h3 className="mb-2.5 font-sora text-[17px] font-semibold text-ink">{c.title}</h3>
                  <p className="text-[13px] leading-[1.7] text-body">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= VALEURS ============================ */}
      <section className="isolate relative py-[70px]">
        <Shapes items={decor.left} />
        <div className={`${tw.wrap} grid items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]`}>
          <Reveal className="min-w-0 self-center pr-5 sm:col-span-2 lg:col-span-1">
            <span className={tw.kicker}>Nos valeurs</span>
            <h2 className={tw.h2}>Ce qui nous guide<br />au quotidien</h2>
            <p className={tw.lead}>Nos valeurs sont le socle de notre travail et de notre engagement envers nos clients.</p>
            <Link to="/services" className={tw.btnGhost}>Nos services <Arrow /></Link>
          </Reveal>
          {values.map((v, i) => (
            <Reveal key={v.title} className={`${tw.card} min-w-0 px-5 pt-6 pb-7`} delay={i * 90}>
              <span className={`${tw.icoRound} mb-5`}><Icon className="size-[30px]">{v.icon}</Icon></span>
              <h3 className="mb-2.5 font-sora text-[17px] font-semibold text-ink">{v.title}</h3>
              <p className="text-[13px] leading-[1.7] text-body">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================= ÉQUIPE ============================= */}
      <section className="isolate relative mx-3 my-8 rounded-[32px] bg-[radial-gradient(600px_300px_at_70%_30%,rgba(106,60,255,.35),transparent_70%),linear-gradient(135deg,#0a0b2e,#15134a_60%,#0a0b2e)] py-16 text-[#d8d6ff] md:mx-0 md:rounded-[60px_0_60px_0] md:py-[90px] md:[clip-path:polygon(0_4%,100%_0,100%_96%,0_100%)]">
        <Shapes items={decor.dark} />
        <div className={`${tw.wrap} grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_0.8fr]`}>
          <Reveal className="min-w-0 md:col-span-2 lg:col-span-1">
            <span className={`${tw.kicker} text-[#b9a8ff]`}>Notre équipe</span>
            <h2 className={`${tw.h2} text-white`}>Des compétences<br />complémentaires</h2>
            <p className="mb-7 text-sm leading-[1.75]">
              Notre équipe réunit des talents aux profils variés : développeurs, designers, graphistes et experts
              en stratégie digitale. Ensemble, nous mettons nos compétences au service de vos projets.
            </p>
            <Link to="/contact" className={tw.btn}>Rejoindre l’équipe <Arrow /></Link>
          </Reveal>
          <Reveal className="relative aspect-[1.35] min-w-0 overflow-hidden rounded-[40%_28px_28px_28px/30%_28px_28px_28px] shadow-[0_30px_70px_-20px_rgba(106,60,255,.6)]" delay={100}>
            <img src={roomPhoto} alt="Nos talents en plein travail" className="size-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,46,.7),rgba(40,20,140,.2)_50%,rgba(10,11,46,.4))]" />
            <span className="absolute top-[26px] left-[16%] z-[1] text-[clamp(18px,1.8vw,24px)] leading-[1.2] text-white/80">Des talents<br />qui construisent<br />vos idées</span>
          </Reveal>
          <Reveal as="ul" className="grid min-w-0 list-none gap-3.5 p-0" delay={200}>
            {skills.map((s) => (
              <li key={s} className="flex items-center gap-3.5 text-[13.5px] font-medium text-white">
                <span className="size-7 rounded-full bg-[radial-gradient(circle,#8b5cff_0_4px,rgba(106,60,255,.25)_5px)] shadow-[inset_0_0_0_1px_rgba(160,140,255,.5)]" />
                {s}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============================= CHIFFRES =========================== */}
      <section className="isolate relative py-[70px]">
        <Shapes items={decor.soft} />
        <div className={`${tw.wrap} grid items-start gap-[18px] sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]`}>
          <Reveal className="min-w-0 self-center pr-6 sm:col-span-2 lg:col-span-1">
            <span className={tw.kicker}>En quelques chiffres</span>
            <h2 className={tw.h2}>Une aventure qui<br />ne fait que commencer</h2>
            <p className={tw.lead}>Chaque projet est une nouvelle histoire, et chaque client une source de motivation. Voici quelques repères qui illustrent notre engagement.</p>
          </Reveal>
          {stats.map((s, i) => (
            <Reveal key={s.label} className={`${tw.card} min-w-0 px-[22px] py-6`} delay={i * 90}>
              <Icon>{s.icon}</Icon>
              <strong className={`${tw.gradText} mt-3 mb-2 block text-[30px] font-semibold tracking-[-0.03em]`}>{s.value}</strong>
              <h3 className="mb-2 font-sora text-[13.5px] font-semibold text-ink">{s.label}</h3>
              <p className="text-[11.5px] leading-[1.6] text-mute">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="isolate relative pt-5 pb-[70px]">
        <Shapes items={decor.soft} />
        <div className={tw.wrap}>
          <Reveal className="flex flex-col items-center gap-5 rounded-[32px] bg-[linear-gradient(100deg,#2f6bff,#5a3cff_55%,#9b5cff)] px-6 py-9 text-center text-white shadow-[0_30px_70px_-25px_rgba(80,50,255,.7)] md:flex-row md:gap-10 md:rounded-full md:px-[50px] md:text-left">
            <img src="/eray-logo.png" alt="" className="w-[90px] rounded-[14px] bg-white p-1" />
            <div className="flex-1">
              <h2 className="mb-1.5 font-sora text-2xl font-semibold tracking-[-0.02em] text-white">Prêt à donner vie à votre projet ?</h2>
              <p className="text-[13.5px] opacity-85">Parlons de vos idées et construisons ensemble des solutions qui vous ressemblent.</p>
            </div>
            <Link to="/contact" className={tw.btnWhite}>Nous contacter <Arrow /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
