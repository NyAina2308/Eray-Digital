import { useId, type ReactNode } from 'react'

/**
 * Écrans de téléphone dessinés (tableaux de bord) pour les maquettes `Phone`.
 * Toutes les dimensions sont en `em`, la taille de base suit la largeur de l'écran (cqw) :
 * le rendu reste identique quelle que soit la taille du téléphone.
 */

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 @container">
      <div className="flex size-full flex-col gap-[.55em] overflow-hidden bg-[linear-gradient(170deg,#0d1240,#080a24_55%,#120a33)] px-[.75em] pt-[.45em] pb-[.5em] font-sans text-[6.2cqw] leading-[1.2] text-white">
        {/* Barre d'état */}
        <div className="flex items-center justify-between text-[.62em] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-[.3em]">
            <span className="flex items-end gap-[.12em]">{[0.35, 0.55, 0.75, 1].map((h, i) => <i key={i} className="block w-[.22em] rounded-[1px] bg-white" style={{ height: `${h * 0.8}em` }} />)}</span>
            <span className="relative h-[.75em] w-[1.5em] rounded-[.2em] border border-white/70 p-[.1em]"><i className="block h-full w-[72%] rounded-[.1em] bg-[#4ade80]" /></span>
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

function Header({ title, sub, initials }: { title: string; sub: string; initials: string }) {
  return (
    <div className="mt-[.5em] flex items-center justify-between">
      <div>
        <p className="text-[.55em] text-[#8fa3ff]">{sub}</p>
        <p className="text-[.95em] font-bold">{title}</p>
      </div>
      <div className="flex items-center gap-[.35em]">
        <span className="relative grid size-[1.5em] place-items-center rounded-full bg-white/10">
          <svg viewBox="0 0 24 24" className="size-[.8em] fill-none stroke-white stroke-2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>
          <i className="absolute top-[.2em] right-[.25em] size-[.35em] rounded-full bg-[#ff4d8d]" />
        </span>
        <span className="grid size-[1.5em] place-items-center rounded-full bg-[linear-gradient(135deg,#2f8bff,#7b3cff)] text-[.6em] font-bold">{initials}</span>
      </div>
    </div>
  )
}

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-[.6em] border border-white/8 bg-white/[.06] p-[.5em] ${className}`}>{children}</div>
)

function BottomNav({ active }: { active: number }) {
  const icons = ['M3 11l9-8 9 8v10h-6v-6H9v6H3z', 'M4 20V10M10 20V4M16 20v-8M22 20H2', 'M12 2a10 10 0 1 0 10 10H12z', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0']
  return (
    <div className="mt-auto flex justify-around rounded-[.8em] bg-white/[.07] py-[.45em]">
      {icons.map((d, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`size-[1em] fill-none stroke-2 ${i === active ? 'stroke-[#5aa8ff]' : 'stroke-white/45'}`}><path d={d} strokeLinecap="round" strokeLinejoin="round" /></svg>
      ))}
    </div>
  )
}

/** Tableau de bord analytique : KPI, courbe de chiffre d'affaires, barres hebdo, commandes récentes. */
export function AnalyticsDashboard() {
  const id = useId()
  const line = [38, 30, 34, 22, 26, 14, 18, 8]
  const pts = line.map((y, i) => `${(i / (line.length - 1)) * 100},${y}`).join(' ')
  return (
    <Shell>
      <Header sub="Bonjour, Eray 👋" title="Tableau de bord" initials="ED" />

      <div className="grid grid-cols-2 gap-[.45em]">
        {[
          { l: 'Revenus', v: '24,8 k€', t: '+12,4 %', c: '#4ade80' },
          { l: 'Visiteurs', v: '18 240', t: '+8,1 %', c: '#4ade80' },
          { l: 'Conversion', v: '3,6 %', t: '+0,4 %', c: '#4ade80' },
          { l: 'Rebond', v: '41 %', t: '−2,3 %', c: '#ff7a9c' },
        ].map((k) => (
          <Card key={k.l}>
            <p className="text-[.5em] text-white/55">{k.l}</p>
            <p className="text-[.85em] font-bold">{k.v}</p>
            <p className="text-[.48em] font-semibold" style={{ color: k.c }}>{k.t}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[.6em] font-semibold">Chiffre d'affaires</p>
          <span className="rounded-full bg-[#2f8bff]/25 px-[.5em] py-[.1em] text-[.45em] text-[#8fc2ff]">7 jours</span>
        </div>
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-[.3em] h-[3.6em] w-full overflow-visible">
          <defs>
            <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5aa8ff" stopOpacity=".55" /><stop offset="1" stopColor="#5aa8ff" stopOpacity="0" /></linearGradient>
            <linearGradient id={`${id}l`} x1="0" x2="1"><stop offset="0" stopColor="#2f8bff" /><stop offset="1" stopColor="#b26bff" /></linearGradient>
          </defs>
          {[11, 22, 33].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#fff" strokeOpacity=".08" strokeWidth=".4" />)}
          <polygon points={`0,44 ${pts} 100,44`} fill={`url(#${id}a)`} />
          <polyline points={pts} fill="none" stroke={`url(#${id}l)`} strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy="8" r="2.2" fill="#fff" stroke="#b26bff" strokeWidth="1.2" />
        </svg>
        <div className="mt-[.2em] flex justify-between text-[.4em] text-white/40">{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <span key={i}>{d}</span>)}</div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[.6em] font-semibold">Trafic par canal</p>
          <p className="text-[.45em] text-white/45">ce mois</p>
        </div>
        <div className="mt-[.4em] flex h-[2.6em] items-end gap-[.3em]">
          {[55, 80, 45, 95, 70, 60, 88, 40].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[.2em] bg-[linear-gradient(#7b3cff,#2f8bff)]" style={{ height: `${h}%`, opacity: i === 3 ? 1 : 0.65 }} />
          ))}
        </div>
      </Card>

      <Card className="space-y-[.4em]">
        <p className="text-[.6em] font-semibold">Commandes récentes</p>
        {[
          { n: 'Site vitrine', s: 'Payé', c: '#4ade80', p: '1 200 €' },
          { n: 'App mobile', s: 'En cours', c: '#fbbf24', p: '3 450 €' },
          { n: 'Logo & charte', s: 'Payé', c: '#4ade80', p: '450 €' },
        ].map((o) => (
          <div key={o.n} className="flex items-center gap-[.4em]">
            <span className="size-[1.2em] shrink-0 rounded-[.3em] bg-[linear-gradient(135deg,#2f8bff,#7b3cff)]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[.5em] font-medium">{o.n}</p>
              <p className="text-[.42em]" style={{ color: o.c }}>● {o.s}</p>
            </div>
            <p className="text-[.5em] font-semibold">{o.p}</p>
          </div>
        ))}
      </Card>

      <BottomNav active={1} />
    </Shell>
  )
}

/** Tableau de bord projets / IoT : jauge de performance, capteurs, avancement des tâches. */
export function ProjectsDashboard() {
  const id = useId()
  const pct = 87
  const C = 2 * Math.PI * 15.9
  return (
    <Shell>
      <Header sub="Suivi en temps réel" title="Mes projets" initials="ED" />

      <Card className="flex items-center gap-[.6em]">
        <svg viewBox="0 0 36 36" className="size-[3.6em] shrink-0 -rotate-90">
          <defs><linearGradient id={`${id}g`} x1="0" x2="1"><stop offset="0" stopColor="#2f8bff" /><stop offset="1" stopColor="#c56bff" /></linearGradient></defs>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="3.4" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={`url(#${id}g)`} strokeWidth="3.4" strokeLinecap="round" strokeDasharray={`${(pct / 100) * C} ${C}`} />
          <text x="18" y="20.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" transform="rotate(90 18 18)">{pct}%</text>
        </svg>
        <div className="min-w-0 space-y-[.25em]">
          <p className="text-[.6em] font-semibold">Performance globale</p>
          <p className="text-[.45em] text-white/55">12 projets actifs · 3 livrés cette semaine</p>
          <p className="text-[.48em] font-semibold text-[#4ade80]">▲ 6 % vs mois dernier</p>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-[.4em]">
        {[
          { l: 'Capteurs', v: '248', c: '#5aa8ff' },
          { l: 'Uptime', v: '99,9%', c: '#4ade80' },
          { l: 'Alertes', v: '2', c: '#ff7a9c' },
        ].map((k) => (
          <Card key={k.l} className="text-center">
            <p className="text-[.75em] font-bold" style={{ color: k.c }}>{k.v}</p>
            <p className="text-[.42em] text-white/55">{k.l}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[.6em] font-semibold">Température · Atelier</p>
          <p className="text-[.55em] font-bold text-[#fbbf24]">23,4 °C</p>
        </div>
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-[.3em] h-[2.4em] w-full">
          <polyline points="0,18 10,15 20,20 30,12 40,16 50,9 60,14 70,11 80,17 90,10 100,13" fill="none" stroke="#fbbf24" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <polyline points="0,24 10,22 20,25 30,21 40,23 50,19 60,22 70,20 80,24 90,19 100,21" fill="none" stroke="#5aa8ff" strokeWidth="1.5" strokeOpacity=".7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        <div className="mt-[.2em] flex gap-[.6em] text-[.42em] text-white/55">
          <span><i className="mr-[.3em] inline-block size-[.6em] rounded-full bg-[#fbbf24]" />Température</span>
          <span><i className="mr-[.3em] inline-block size-[.6em] rounded-full bg-[#5aa8ff]" />Humidité</span>
        </div>
      </Card>

      <Card className="space-y-[.45em]">
        <p className="text-[.6em] font-semibold">Avancement</p>
        {[
          { n: 'Site e-commerce', p: 92, c: 'from-[#2f8bff] to-[#5aa8ff]' },
          { n: 'Application RH', p: 68, c: 'from-[#7b3cff] to-[#c56bff]' },
          { n: 'Domotique IoT', p: 45, c: 'from-[#f59e0b] to-[#fbbf24]' },
          { n: 'Campagne réseaux', p: 30, c: 'from-[#ec4899] to-[#ff7a9c]' },
        ].map((t) => (
          <div key={t.n}>
            <div className="flex justify-between text-[.46em]"><span>{t.n}</span><span className="text-white/55">{t.p}%</span></div>
            <div className="mt-[.15em] h-[.3em] rounded-full bg-white/10"><div className={`h-full rounded-full bg-linear-to-r ${t.c}`} style={{ width: `${t.p}%` }} /></div>
          </div>
        ))}
      </Card>

      <BottomNav active={2} />
    </Shell>
  )
}
