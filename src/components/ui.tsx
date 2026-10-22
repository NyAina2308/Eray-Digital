import type { ReactNode } from 'react'
export { tw, ic } from './uiData'

export function Arrow({ className = 'size-4 transition group-hover:translate-x-1' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function Icon({ children, className = 'size-6', stroke = 'url(#ui-grad)' }: { children: ReactNode; className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

/** Dégradé bleu → violet utilisé par <Icon /> (à placer une fois par page). */
export function GradDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="ui-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f8bff" />
          <stop offset="1" stopColor="#7b3cff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

