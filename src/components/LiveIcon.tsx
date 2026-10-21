import type { ReactNode } from 'react'
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from 'framer-motion'

/**
 * Animation en boucle propre à chaque petite icône.
 * Chaque boucle finit exactement sur sa position de départ pour éviter tout saut.
 */
const iconMotion = {
  bob: { animate: { y: [0, -3, 0], rotate: [0, -6, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } },
  swing: { animate: { rotate: [0, 14, -8, 0] }, transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.8 } },
  spin: { animate: { rotate: [0, 360] }, transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.6 } },
  pulse: { animate: { scale: [1, 1.1, 1] }, transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 } },
} satisfies Record<string, { animate: TargetAndTransition; transition: Transition }>

export type LiveKind = keyof typeof iconMotion

/**
 * Icône qui s'anime en continu et réagit au survol.
 * `boxed` ajoute la tuile blanche avec un halo doux derrière.
 */
export default function LiveIcon({ kind, children, delay = 0, boxed = true, size = 'size-11' }: { kind: LiveKind; children: ReactNode; delay?: number; boxed?: boolean; size?: string }) {
  const reduce = useReducedMotion()
  const m = iconMotion[kind]
  const inner = (
    <motion.span
      className="relative grid place-items-center [transform-origin:50%_50%]"
      initial={false}
      animate={reduce ? undefined : m.animate}
      transition={{ ...m.transition, delay }}
    >
      {children}
    </motion.span>
  )
  if (!boxed) return inner
  return (
    <motion.span
      className={`relative isolate grid shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,#fff,#eeeaff)] shadow-[0_10px_24px_-12px_rgba(90,60,255,.55),inset_0_0_0_1px_rgba(106,60,255,.12)] ${size}`}
      whileHover={{ scale: 1.12, rotate: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
    >
      {!reduce && (
        <motion.span
          className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit] bg-violet/20"
          animate={{ scale: [1, 1.3], opacity: [0.45, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5, ease: 'easeOut', delay }}
        />
      )}
      {inner}
    </motion.span>
  )
}
