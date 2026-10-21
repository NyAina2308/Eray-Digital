import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { Shapes, Ribbon, decor } from './Decor'
import { tw } from './ui'

/** En-tête simple des pages secondaires (Contact, Blog). */
function PageHero({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="isolate relative pt-[130px] pb-12">
      <Shapes items={decor.soft} />
      <Ribbon />
      <Reveal className={`${tw.wrap} text-center`}>
        <span className={`${tw.chip} mb-5`}>{kicker}</span>
        <h1 className="mx-auto mb-4 max-w-[760px] font-sora text-[clamp(32px,4vw,52px)] leading-[1.08] font-bold tracking-[-0.04em] text-ink">{title}</h1>
        {children && <p className="mx-auto max-w-[560px] text-[15px] leading-[1.7] text-body">{children}</p>}
      </Reveal>
    </section>
  )
}

export default PageHero
