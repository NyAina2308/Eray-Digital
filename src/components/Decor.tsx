import type { CSSProperties } from 'react'
import type { Shape } from './decorData'

const tones = {
  violet: ['#b69cff', '#5a2bd8'],
  blue: ['#8fc2ff', '#2f5bff'],
  pink: ['#ffb3e0', '#a03cff'],
}

const kinds: Record<Shape['kind'], string> = {
  gem: 'animate-float [clip-path:polygon(50%_0,100%_38%,78%_100%,22%_100%,0_38%)] drop-shadow-[0_10px_14px_rgba(70,40,220,.35)]',
  shard: 'animate-float [clip-path:polygon(0_50%,60%_0,100%_35%,70%_100%)] drop-shadow-[0_12px_18px_rgba(70,40,220,.35)] max-md:opacity-60',
  orb: 'animate-float rounded-full shadow-[0_10px_22px_-6px_rgba(60,40,220,.5)]',
  spark: 'animate-twinkle [clip-path:polygon(50%_0,60%_40%,100%_50%,60%_60%,50%_100%,40%_60%,0_50%,40%_40%)]',
  ring: 'rounded-full border-[1.5px] border-violet/35',
}

function background(kind: Shape['kind'], [a, b]: string[]) {
  switch (kind) {
    case 'gem':
      return `linear-gradient(115deg, rgba(255,255,255,.75) 0 18%, transparent 19%), linear-gradient(160deg, ${a}, ${b})`
    case 'shard':
      return `linear-gradient(100deg, rgba(255,255,255,.6) 0 22%, transparent 23%), linear-gradient(150deg, ${a}, ${b})`
    case 'orb':
      return `radial-gradient(circle at 32% 28%, #fff 0 8%, ${a} 30%, ${b} 80%)`
    case 'spark':
      return `linear-gradient(135deg, ${a}, ${b})`
    default:
      return undefined
  }
}

export function Shapes({ items }: { items: Shape[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {items.map((s, i) => (
        <span
          key={i}
          className={`absolute block motion-reduce:animate-none max-md:scale-70 ${kinds[s.kind]}`}
          style={{
            ...s.pos,
            width: s.size ?? 28,
            height: s.size ?? 28,
            rotate: `${s.rotate ?? 0}deg`,
            background: background(s.kind, tones[s.tone ?? 'violet']),
            animationDelay: `${s.delay ?? -(i * 1.3)}s`,
          }}
        />
      ))}
    </div>
  )
}

/** Grand ruban translucide en arrière-plan d'une section. */
export function Ribbon({ className = 'top-[35%]', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute -left-[5%] z-0 h-[260px] w-[110%] blur-[1px] max-md:opacity-60 ${className}`}
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <linearGradient id="dz-rib" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7b3cff" stopOpacity="0" />
          <stop offset=".35" stopColor="#7b3cff" stopOpacity=".22" />
          <stop offset=".7" stopColor="#2f8bff" stopOpacity=".18" />
          <stop offset="1" stopColor="#2f8bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 200 C 200 60, 420 280, 640 150 S 1000 40, 1200 140 L1200 190 C 1000 100, 860 230, 640 210 S 220 150, 0 250 Z" fill="url(#dz-rib)" />
      <path d="M0 150 C 240 40, 460 240, 700 120 S 1020 60, 1200 90" fill="none" stroke="url(#dz-rib)" strokeWidth="2" />
    </svg>
  )
}

/** Flèche dessinée à la main (comme sous les notes manuscrites des maquettes). */
export function DrawnArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`mt-1 mb-2.5 ml-10 block h-[50px] w-[130px] ${className}`} viewBox="0 0 160 60" fill="none" aria-hidden="true">
      <path d="M4 44 C 40 60, 90 58, 150 18" stroke="url(#dz-arrow-g)" strokeWidth="2" strokeLinecap="round" />
      <path d="M136 14 L151 17 L146 31" stroke="#5a4bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="dz-arrow-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f8bff" />
          <stop offset="1" stopColor="#7b3cff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export { decor } from './decorData'
